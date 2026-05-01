// Story data engine — Gemini generates fresh Hindi stories every 24 hours
// Falls back to built-in stories if API unavailable

import { GoogleGenAI } from '@google/genai';

export interface StoryBeat {
  id: number;
  scene: 'road' | 'vomiting' | 'hospital_exterior' | 'entrance' | 'reception' | 'doctor' | 'treatment' | 'recovery' | 'exit_interview';
  hindiText: string;       // subtitle shown on screen
  hindiAudio: string;      // text sent to Web Speech API
  duration: number;        // ms this beat plays
  cameraAngle: 'wide' | 'medium' | 'close' | 'overhead' | 'tracking';
  bgColor: string;
  ambientColor: string;
}

export interface DailyStory {
  id: string;
  specialty: string;
  doctorName: string;
  titleHindi: string;
  beats: StoryBeat[];
  generatedAt: number;
}

// ── Built-in fallback stories (one per specialty) ──────────────────────────
const FALLBACK_STORIES: DailyStory[] = [
  {
    id: 'dehydration-story',
    specialty: 'emergency',
    doctorName: 'Dr. Emergency Team',
    titleHindi: 'एक मरीज़ की कहानी — दिव्यम अस्पताल',
    generatedAt: Date.now(),
    beats: [
      {
        id: 1, scene: 'road', cameraAngle: 'wide',
        hindiText: 'गर्मी की दोपहर... राजेश सड़क पर चल रहा था।',
        hindiAudio: 'गर्मी की दोपहर थी। राजेश सड़क पर चल रहा था। धूप बहुत तेज़ थी।',
        duration: 4000, bgColor: '#1a0a00', ambientColor: '#ff6600'
      },
      {
        id: 2, scene: 'vomiting', cameraAngle: 'medium',
        hindiText: 'अचानक चक्कर आया... उल्टी होने लगी।',
        hindiAudio: 'अचानक राजेश को चक्कर आया। तेज़ धूप और पानी की कमी से उसे उल्टी होने लगी।',
        duration: 4500, bgColor: '#1a0500', ambientColor: '#ff4400'
      },
      {
        id: 3, scene: 'hospital_exterior', cameraAngle: 'tracking',
        hindiText: 'सामने दिखा — दिव्यम अस्पताल का 5 मंज़िला भवन।',
        hindiAudio: 'तभी उसकी नज़र पड़ी। सामने दिव्यम अस्पताल का पाँच मंज़िला भवन था।',
        duration: 5000, bgColor: '#0a0f0a', ambientColor: '#10b981'
      },
      {
        id: 4, scene: 'entrance', cameraAngle: 'tracking',
        hindiText: 'कैमरा मरीज़ के साथ चला... अस्पताल के अंदर।',
        hindiAudio: 'राजेश अस्पताल की तरफ बढ़ा। दरवाज़ा खुला और स्टाफ ने तुरंत मदद की।',
        duration: 4000, bgColor: '#0a0f0a', ambientColor: '#34d399'
      },
      {
        id: 5, scene: 'reception', cameraAngle: 'medium',
        hindiText: 'रिसेप्शन पर मिली तुरंत मदद।',
        hindiAudio: 'रिसेप्शन पर नर्स ने तुरंत व्हीलचेयर लाई। डॉक्टर को बुलाया गया।',
        duration: 3500, bgColor: '#0a0f0a', ambientColor: '#10b981'
      },
      {
        id: 6, scene: 'doctor', cameraAngle: 'close',
        hindiText: 'डॉक्टर ने जाँच की — डिहाइड्रेशन था।',
        hindiAudio: 'डॉक्टर ने जाँच की। डिहाइड्रेशन था। तुरंत IV ड्रिप लगाई गई।',
        duration: 4000, bgColor: '#0a0f0a', ambientColor: '#3b82f6'
      },
      {
        id: 7, scene: 'treatment', cameraAngle: 'medium',
        hindiText: 'इलाज हुआ — कम खर्च में, बेहतरीन देखभाल।',
        hindiAudio: 'कम खर्च में बेहतरीन इलाज हुआ। लैब टेस्ट, दवाई — सब एक ही छत के नीचे।',
        duration: 4500, bgColor: '#0a0f0a', ambientColor: '#10b981'
      },
      {
        id: 8, scene: 'exit_interview', cameraAngle: 'medium',
        hindiText: 'राजेश ठीक हुआ — न्यूज़ रिपोर्टर से बोला...',
        hindiAudio: 'राजेश बाहर आया। न्यूज़ रिपोर्टर ने पूछा — कैसा लगा? राजेश बोला — दिव्यम अस्पताल सबसे अच्छा है। डॉक्टर दोस्त जैसे हैं, खर्च कम है, सब सुविधाएँ एक जगह हैं।',
        duration: 6000, bgColor: '#0a0f0a', ambientColor: '#fbbf24'
      }
    ]
  },
  {
    id: 'child-fever-story',
    specialty: 'pediatrics',
    doctorName: 'Dr. MG Choudhary',
    titleHindi: 'बच्चे की बुखार — Dr. MG Choudhary',
    generatedAt: Date.now(),
    beats: [
      { id: 1, scene: 'road', cameraAngle: 'wide', hindiText: 'रात के 2 बजे... बच्चे को तेज़ बुखार।', hindiAudio: 'रात के दो बजे थे। सुनीता की बेटी को 104 डिग्री बुखार था। वो घबरा गई।', duration: 4000, bgColor: '#000510', ambientColor: '#3b82f6' },
      { id: 2, scene: 'hospital_exterior', cameraAngle: 'tracking', hindiText: 'दिव्यम अस्पताल — 24/7 खुला।', hindiAudio: 'दिव्यम अस्पताल 24 घंटे खुला था। सुनीता बच्चे को लेकर दौड़ी।', duration: 4000, bgColor: '#0a0f0a', ambientColor: '#10b981' },
      { id: 3, scene: 'doctor', cameraAngle: 'close', hindiText: 'Dr. MG Choudhary ने तुरंत देखा।', hindiAudio: 'डॉक्टर एम जी चौधरी ने तुरंत बच्चे को देखा। बहुत प्यार से जाँच की।', duration: 4500, bgColor: '#0a0f0a', ambientColor: '#10b981' },
      { id: 4, scene: 'treatment', cameraAngle: 'medium', hindiText: 'इलाज शुरू — बच्चा मुस्कुराया।', hindiAudio: 'दवाई दी गई। थोड़ी देर में बच्चे का बुखार उतरा। वो मुस्कुराने लगी।', duration: 4000, bgColor: '#0a0f0a', ambientColor: '#34d399' },
      { id: 5, scene: 'exit_interview', cameraAngle: 'medium', hindiText: 'माँ बोली — भगवान जैसे डॉक्टर हैं।', hindiAudio: 'सुनीता ने कहा — दिव्यम अस्पताल में डॉक्टर भगवान जैसे हैं। रात को भी मदद मिली। खर्च भी कम था।', duration: 5500, bgColor: '#0a0f0a', ambientColor: '#fbbf24' }
    ]
  },
  {
    id: 'dental-story',
    specialty: 'dentistry',
    doctorName: 'Dr. Nisha Choudhary',
    titleHindi: 'दाँत का दर्द — Dr. Nisha Choudhary',
    generatedAt: Date.now(),
    beats: [
      { id: 1, scene: 'road', cameraAngle: 'wide', hindiText: 'मोहन को 3 दिन से दाँत में दर्द था।', hindiAudio: 'मोहन को तीन दिनों से दाँत में असहनीय दर्द था। खाना नहीं खा पा रहा था।', duration: 4000, bgColor: '#0a0005', ambientColor: '#ef4444' },
      { id: 2, scene: 'hospital_exterior', cameraAngle: 'tracking', hindiText: 'दिव्यम डेंटल हब — आधुनिक उपकरण।', hindiAudio: 'दिव्यम अस्पताल के डेंटल हब में आधुनिक उपकरण थे।', duration: 4000, bgColor: '#0a0f0a', ambientColor: '#10b981' },
      { id: 3, scene: 'doctor', cameraAngle: 'close', hindiText: 'Dr. Nisha ने दर्द रहित इलाज किया।', hindiAudio: 'डॉक्टर निशा चौधरी ने बिना दर्द के रूट कैनाल किया। मोहन को कुछ महसूस नहीं हुआ।', duration: 5000, bgColor: '#0a0f0a', ambientColor: '#10b981' },
      { id: 4, scene: 'exit_interview', cameraAngle: 'medium', hindiText: 'मोहन बोला — बिल्कुल दर्द नहीं हुआ!', hindiAudio: 'मोहन ने कहा — मुझे डर था लेकिन बिल्कुल दर्द नहीं हुआ। दिव्यम का डेंटल हब बेस्ट है।', duration: 5000, bgColor: '#0a0f0a', ambientColor: '#fbbf24' }
    ]
  }
];

const CACHE_KEY = 'divyam_daily_story';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function getDailyStory(): Promise<DailyStory> {
  // Check cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: DailyStory = JSON.parse(cached);
      if (Date.now() - parsed.generatedAt < CACHE_TTL) return parsed;
    }
  } catch { /* ignore */ }

  // Try Gemini
  const apiKey = (window as any).__GEMINI_KEY__ || import.meta.env?.VITE_GEMINI_API_KEY || '';
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const specialties = ['emergency', 'pediatrics', 'dentistry', 'gynecology', 'cardiology', 'diagnostics'];
      const today = new Date().getDay();
      const specialty = specialties[today % specialties.length];

      const prompt = `You are a Hindi story writer for Divyam Hospital website. 
Create a short cinematic patient story in Hindi for specialty: ${specialty}.
Story must have exactly 5 beats. Each beat has: hindiText (max 8 words subtitle), hindiAudio (1-2 sentences narration), scene (one of: road/hospital_exterior/doctor/treatment/exit_interview), duration (3500-5500 ms).
Story arc: patient has problem → comes to Divyam Hospital → doctor treats with care → patient recovers → happy patient gives interview saying "best hospital, low cost, friendly doctors, all facilities under one roof".
Return ONLY valid JSON array of 5 beat objects. No markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt
      });

      const text = response.text?.trim() || '';
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;
      if (jsonStart >= 0 && jsonEnd > jsonStart) {
        const beats: StoryBeat[] = JSON.parse(text.slice(jsonStart, jsonEnd));
        const story: DailyStory = {
          id: `ai-${Date.now()}`,
          specialty,
          doctorName: 'Divyam Hospital Team',
          titleHindi: 'आज की कहानी — दिव्यम अस्पताल',
          beats: beats.map((b, i) => ({
            ...b, id: i + 1,
            cameraAngle: b.cameraAngle || 'medium',
            bgColor: '#0a0f0a',
            ambientColor: '#10b981'
          })),
          generatedAt: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(story));
        return story;
      }
    } catch { /* fall through to fallback */ }
  }

  // Rotate fallback by day
  const idx = new Date().getDay() % FALLBACK_STORIES.length;
  return FALLBACK_STORIES[idx];
}
