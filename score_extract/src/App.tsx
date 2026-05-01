import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Loader2, Music, Film, AlertCircle, Key, RefreshCw, Volume2, Download, Video, SlidersHorizontal, ChevronDown, Sun, Moon } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// Initialize the SDK lazily to handle missing keys gracefully
let ai: GoogleGenAI | null = null;

function getAIClient() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

type AppState = 'idle' | 'analyzing' | 'composing' | 'ready' | 'error';

function App() {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<AppState>('idle');
  const [musicPrompt, setMusicPrompt] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Volume controls
  const [videoVolume, setVideoVolume] = useState(0.5);
  const [audioVolume, setAudioVolume] = useState(1.0);

  // Export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // User direction
  const [userDirection, setUserDirection] = useState('');
  const [isDirectionExpanded, setIsDirectionExpanded] = useState(false);

  // Theme
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light';
    }
    return false;
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio && window.aistudio.hasSelectedApiKey) {
          // Add a timeout in case hasSelectedApiKey hangs
          const timeoutPromise = new Promise<boolean>((_, reject) => 
            setTimeout(() => reject(new Error("Timeout checking API key")), 3000)
          );
          const hasSelected = await Promise.race([
            window.aistudio.hasSelectedApiKey(),
            timeoutPromise
          ]);
          setHasKey(hasSelected);
        } else {
          setHasKey(true);
        }
      } catch (err) {
        console.error("Error checking API key:", err);
        setHasKey(true); // Fallback to true so the app can load
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
      ai = null;
    }
  };

  // Sync volumes when they change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = videoVolume;
    }
  }, [videoVolume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume;
    }
  }, [audioVolume]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg("Video file is too large. Please upload a file under 20MB.");
      return;
    }

    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setStatus('idle');
    setMusicPrompt(null);
    setAudioUrl(null);
    setErrorMsg(null);
    setIsPlaying(false);
    setVideoVolume(0.5);
    setAudioVolume(1.0);
    setIsExporting(false);
    setExportProgress(0);
    setUserDirection('');
    setIsDirectionExpanded(false);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  const generateScore = async () => {
    if (!videoFile) return;
    
    try {
      setStatus('analyzing');
      setErrorMsg(null);
      const client = getAIClient();
      
      const base64Data = await fileToBase64(videoFile);
      
      const analysisPromise = client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: videoFile.type
              }
            },
            {
              text: `Analyze this video's mood, pacing, lighting, and action. Write a detailed, 2-3 sentence prompt for a music generation AI to create an instrumental musical bed that perfectly matches the tone of this video. Do not include lyrics. Focus on instrumentation, tempo, and emotional resonance. Crucially, specify that the track must maintain a consistent energy level throughout without building to a climax or featuring distracting dynamic shifts, so it functions perfectly as background music.${userDirection ? `\n\nAdditionally, incorporate the following creative direction into the music prompt: "${userDirection}"` : ''}`
            }
          ]
        }
      });

      let analysisResponse;
      try {
        analysisResponse = await analysisPromise;
      } catch (err: any) {
        let errMsg = err.message || String(err);
        try {
          const parsed = JSON.parse(errMsg);
          if (parsed.error?.message) errMsg = parsed.error.message;
          else if (parsed.error?.status) errMsg = parsed.error.status;
        } catch (e) {}
        throw new Error(`Video analysis failed: ${errMsg}`);
      }

      const prompt = analysisResponse.text;
      if (!prompt) throw new Error("Failed to generate music prompt from video analysis.");
      
      setMusicPrompt(prompt);
      setStatus('composing');

      const musicPromise = client.models.generateContent({
        model: 'lyria-3-pro-preview',
        contents: prompt,
      });

      let musicResponse;
      try {
        musicResponse = await musicPromise;
      } catch (err: any) {
        let errMsg = err.message || String(err);
        try {
          const parsed = JSON.parse(errMsg);
          if (parsed.error?.message) errMsg = parsed.error.message;
          else if (parsed.error?.status) errMsg = parsed.error.status;
        } catch (e) {}
        throw new Error(`Music generation failed: ${errMsg}`);
      }

      let audioBase64 = null;
      if (musicResponse.candidates && musicResponse.candidates[0].content.parts) {
        for (const part of musicResponse.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.mimeType.startsWith('audio/')) {
            audioBase64 = part.inlineData.data;
            break;
          }
        }
      }

      if (!audioBase64) {
        throw new Error("No audio data returned from the model.");
      }

      const audioBlob = new Blob([Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))], { type: 'audio/wav' });
      const newAudioUrl = URL.createObjectURL(audioBlob);
      
      setAudioUrl(newAudioUrl);
      setStatus('ready');

    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('PERMISSION_DENIED') || err.status === 'PERMISSION_DENIED') {
        setHasKey(false);
      } else {
        setErrorMsg(err.message || "An error occurred during generation.");
        setStatus('error');
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current || !audioRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      audioRef.current.pause();
    } else {
      videoRef.current.currentTime = 0;
      audioRef.current.currentTime = 0;
      videoRef.current.play();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'generated-score.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const exportMixedVideo = async () => {
    if (!videoUrl || !audioUrl || !videoRef.current || !audioRef.current) return;
    
    setIsExporting(true);
    setExportProgress(0);
    
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const dest = audioCtx.createMediaStreamDestination();

      const exportVideo = document.createElement('video');
      exportVideo.src = videoUrl;
      exportVideo.crossOrigin = "anonymous";
      exportVideo.muted = false;

      const exportAudio = new Audio(audioUrl);
      exportAudio.crossOrigin = "anonymous";

      await new Promise((resolve) => {
        let loaded = 0;
        const checkLoad = () => {
          loaded++;
          if (loaded === 2) resolve(true);
        };
        
        if (exportVideo.readyState >= 2) {
          checkLoad();
        } else {
          exportVideo.onloadeddata = checkLoad;
        }
        
        if (exportAudio.readyState >= 2) {
          checkLoad();
        } else {
          exportAudio.onloadeddata = checkLoad;
        }
      });

      const videoSource = audioCtx.createMediaElementSource(exportVideo);
      const videoGain = audioCtx.createGain();
      videoGain.gain.value = videoVolume;
      videoSource.connect(videoGain);
      videoGain.connect(dest);

      const audioSource = audioCtx.createMediaElementSource(exportAudio);
      const audioGain = audioCtx.createGain();
      audioGain.gain.value = audioVolume;
      audioSource.connect(audioGain);
      audioGain.connect(dest);

      const canvas = document.createElement('canvas');
      canvas.width = exportVideo.videoWidth;
      canvas.height = exportVideo.videoHeight;
      const ctx = canvas.getContext('2d');

      const videoStream = canvas.captureStream(30);
      const mixedAudioStream = dest.stream;

      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...mixedAudioStream.getAudioTracks()
      ]);

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9,opus'
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mixed-video.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setIsExporting(false);
        setExportProgress(100);
      };

      const duration = exportVideo.duration;
      
      const drawFrame = () => {
        if (exportVideo.paused || exportVideo.ended) return;
        ctx?.drawImage(exportVideo, 0, 0, canvas.width, canvas.height);
        
        const progress = (exportVideo.currentTime / duration) * 100;
        setExportProgress(progress);
        
        requestAnimationFrame(drawFrame);
      };

      exportVideo.onplay = () => {
        drawFrame();
      };

      exportVideo.onended = () => {
        recorder.stop();
        exportAudio.pause();
        audioCtx.close();
      };

      recorder.start();
      exportVideo.play();
      exportAudio.play();

    } catch (err) {
      console.error(err);
      alert("Failed to export video. Your browser might not support this feature.");
      setIsExporting(false);
    }
  };

  if (hasKey === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  }

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans relative">
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
          aria-label="Toggle theme"
        >
          {isLightMode ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-white" />}
        </button>
        <div className="max-w-md w-full bg-black p-8 border border-zinc-800 text-center space-y-8">
          <div className="w-16 h-16 bg-zinc-950 flex items-center justify-center mx-auto border border-zinc-800">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xs font-bold mb-4 uppercase tracking-widest">API Key Required</h2>
            <p className="text-zinc-500 text-xs leading-relaxed uppercase tracking-widest">
              Generating music with the Lyria model requires a paid Google Cloud API key.
            </p>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noreferrer"
              className="text-zinc-400 text-xs hover:text-white mt-6 inline-block transition-colors uppercase tracking-widest border-b border-zinc-800 hover:border-white pb-0.5"
            >
              Learn more
            </a>
          </div>
          <button
            onClick={handleSelectKey}
            className="w-full py-4 px-4 bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-colors uppercase tracking-widest"
          >
            Select API Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-zinc-800">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-black sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <Music className="w-3 h-3 text-black" />
            </div>
            <h1 className="text-xs font-bold tracking-widest uppercase">Score your video with Lyria</h1>
          </div>
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className="w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isLightMode ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-white" />}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {!videoUrl ? (
          <div className="max-w-2xl mx-auto mt-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-light tracking-wide mb-4 uppercase">Score your video with Lyria</h2>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">Upload a video for visual tone analysis and custom audio generation.</p>
            </div>
            
            <label className={`block w-full aspect-video border border-zinc-800 hover:border-zinc-500 bg-black hover:bg-zinc-900/30 transition-all cursor-pointer group flex flex-col items-center justify-center gap-6 mb-8`}>
              <>
                <div className="w-12 h-12 bg-zinc-950 group-hover:bg-zinc-900 flex items-center justify-center transition-colors border border-zinc-800">
                  <Upload className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Select Video</p>
                  <p className="text-xs text-zinc-600 mt-2 uppercase tracking-widest">MP4, WebM, MOV (Max 20MB)</p>
                </div>
                <input type="file" accept="video/mp4,video/webm,video/quicktime" className="hidden" onChange={handleFileUpload} />
              </>
            </label>

            {errorMsg && (
              <div className="mb-8 p-4 bg-black border border-red-900 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400 leading-relaxed uppercase tracking-widest">{errorMsg}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Video Player */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="relative bg-[#000] aspect-video border border-zinc-800">
                <video 
                  ref={videoRef}
                  src={videoUrl} 
                  className="w-full h-full object-contain"
                  onEnded={handleEnded}
                  playsInline
                />
                
                {/* Export Overlay */}
                {isExporting && (
                  <div className="absolute inset-0 bg-[#000]/90 flex flex-col items-center justify-center z-20">
                    <Loader2 className="w-8 h-8 text-[#fff] animate-spin mb-6" />
                    <p className="text-xs font-bold text-[#fff] mb-4 uppercase tracking-widest">Mixing Audio</p>
                    <div className="w-64 h-1 bg-[#18181b] overflow-hidden">
                      <div 
                        className="h-full bg-[#fff] transition-all duration-300 ease-out"
                        style={{ width: `${exportProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#71717a] mt-4 font-mono">{Math.round(exportProgress)}%</p>
                  </div>
                )}
                
                {/* Play Overlay */}
                {status === 'ready' && !isPlaying && !isExporting && (
                  <div className="absolute inset-0 bg-[#000]/50 flex items-center justify-center backdrop-blur-sm">
                    <button 
                      onClick={togglePlay}
                      className="w-16 h-16 bg-[#fff]/10 hover:bg-[#fff]/20 flex items-center justify-center transition-all border border-[#fff]/20"
                    >
                      <Play className="w-6 h-6 text-[#fff] ml-1" />
                    </button>
                  </div>
                )}
              </div>
              
              {status === 'ready' && (
                <div className="flex items-center justify-between bg-black border border-zinc-800 p-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={togglePlay}
                      className="w-10 h-10 bg-white hover:bg-zinc-200 flex items-center justify-center text-black transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
                    </button>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-widest">Generated Score</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Sync Active</p>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-zinc-600" />
                </div>
              )}
            </div>

            {/* Right: Controls & Status */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-black border border-zinc-800 p-6 flex-1">
                <h3 className="text-xs font-bold mb-8 flex items-center gap-3 uppercase tracking-widest text-zinc-400">
                  <Film className="w-4 h-4" />
                  Process Log
                </h3>
                
                <div className="space-y-8">
                  {/* Step 1: Upload */}
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      <div className="w-4 h-4 bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-widest">Video Uploaded</p>
                      <p className="text-xs text-zinc-500 mt-2 truncate max-w-[200px]">{videoFile?.name}</p>
                    </div>
                  </div>

                  {/* Step 2: Analysis */}
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      {status === 'idle' ? (
                        <div className="w-4 h-4 bg-black border border-zinc-800 flex items-center justify-center" />
                      ) : status === 'analyzing' ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      ) : (
                        <div className="w-4 h-4 bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-bold uppercase tracking-widest ${status === 'idle' ? 'text-zinc-600' : 'text-white'}`}>Visual Analysis</p>
                      {status === 'analyzing' && <p className="text-xs text-zinc-400 mt-2 uppercase tracking-widest">Extracting mood...</p>}
                      {musicPrompt && (
                        <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 leading-relaxed max-h-32 overflow-y-auto font-mono">
                          {musicPrompt}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step 3: Generation */}
                  <div className="flex gap-4">
                    <div className="mt-0.5">
                      {['idle', 'analyzing'].includes(status) ? (
                        <div className="w-4 h-4 bg-black border border-zinc-800 flex items-center justify-center" />
                      ) : status === 'composing' ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      ) : status === 'ready' ? (
                        <div className="w-4 h-4 bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white" />
                        </div>
                      ) : status === 'error' ? (
                        <div className="w-4 h-4 bg-black border border-red-900 flex items-center justify-center">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${['idle', 'analyzing'].includes(status) ? 'text-zinc-600' : 'text-white'}`}>Composition</p>
                      {status === 'composing' && <p className="text-xs text-zinc-400 mt-2 uppercase tracking-widest">Generating audio bed...</p>}
                      {status === 'ready' && <p className="text-xs text-zinc-400 mt-2 uppercase tracking-widest">Score generated</p>}
                    </div>
                  </div>
                </div>

                {status === 'ready' && (
                  <div className="mt-10 space-y-6 pt-8 border-t border-zinc-800">
                    <h4 className="text-xs font-bold text-zinc-400 flex items-center gap-3 uppercase tracking-widest">
                      <SlidersHorizontal className="w-4 h-4" />
                      Mix Levels
                    </h4>
                    
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between text-xs mb-2 uppercase tracking-widest">
                          <span className="text-zinc-400">Original Video</span>
                          <span className="text-zinc-500 font-mono">{Math.round(videoVolume * 100)}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="1" step="0.05" 
                          value={videoVolume} 
                          onChange={(e) => setVideoVolume(parseFloat(e.target.value))}
                          className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-2 uppercase tracking-widest">
                          <span className="text-zinc-400">Generated Score</span>
                          <span className="text-zinc-500 font-mono">{Math.round(audioVolume * 100)}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="1" step="0.05" 
                          value={audioVolume} 
                          onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                          className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-6 space-y-3">
                      <button 
                        onClick={exportMixedVideo}
                        disabled={isExporting}
                        className="w-full py-3 px-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                      >
                        <Video className="w-4 h-4" />
                        Export Mix
                      </button>
                      <button 
                        onClick={downloadAudio}
                        className="w-full py-3 px-4 bg-black border border-zinc-800 hover:bg-zinc-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-3 uppercase tracking-widest"
                      >
                        <Download className="w-4 h-4" />
                        Audio Only
                      </button>
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="mt-8 p-4 bg-black border border-red-900 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-400 leading-relaxed uppercase tracking-widest">{errorMsg}</p>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col gap-3">
                  {status === 'idle' && (
                    <div className="flex flex-col gap-2 mb-4">
                      <button
                        type="button"
                        onClick={() => setIsDirectionExpanded(!isDirectionExpanded)}
                        className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest text-left focus:outline-none group"
                      >
                        <span>Creative Direction (Optional)</span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isDirectionExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isDirectionExpanded && (
                        <textarea
                          id="userDirection"
                          value={userDirection}
                          onChange={(e) => setUserDirection(e.target.value)}
                          placeholder="E.g., Make it sound like an 80s synthwave track, or use a lot of acoustic guitar..."
                          className="w-full bg-zinc-900 border border-zinc-800 text-white p-4 text-sm focus:outline-none focus:border-white transition-colors resize-none h-24 placeholder:text-zinc-600 mt-2"
                        />
                      )}
                    </div>
                  )}

                  {status === 'idle' && (
                    <button 
                      onClick={generateScore}
                      className="w-full py-4 px-4 bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-colors flex items-center justify-center gap-3 uppercase tracking-widest"
                    >
                      <Music className="w-4 h-4" />
                      Generate Score
                    </button>
                  )}
                  
                  <button 
                    onClick={() => {
                      setVideoFile(null);
                      setVideoUrl(null);
                      setStatus('idle');
                      setMusicPrompt(null);
                      setAudioUrl(null);
                      setIsPlaying(false);
                      setVideoVolume(0.5);
                      setAudioVolume(1.0);
                      setIsExporting(false);
                      setExportProgress(0);
                      setUserDirection('');
                      setIsDirectionExpanded(false);
                    }}
                    className="w-full py-4 px-4 bg-black border border-zinc-800 hover:bg-zinc-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-3 uppercase tracking-widest"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Hidden Audio Element */}
        {audioUrl && (
          <audio 
            ref={audioRef} 
            src={audioUrl} 
            onEnded={handleEnded}
          />
        )}
      </main>
    </div>
  );
}

export default App;
