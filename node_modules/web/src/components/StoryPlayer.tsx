import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, ChevronRight, Mic } from 'lucide-react';
import * as THREE from 'three';
import {
  HospitalBuilding, PatientFigure, DoctorFigure,
  HeatSun, MedicalParticles, NewsReporterScene
} from './StoryScenes3D';
import { getDailyStory, type DailyStory, type StoryBeat } from './storyEngine';

// ── Camera positions per scene ─────────────────────────────────────────────
const CAMERA_CONFIGS: Record<string, { pos: [number,number,number]; fov: number }> = {
  road:             { pos: [4, 2, 6],   fov: 65 },
  vomiting:         { pos: [1.5, 0.5, 3], fov: 55 },
  hospital_exterior:{ pos: [0, 1, 8],   fov: 60 },
  entrance:         { pos: [-1, 0, 4],  fov: 50 },
  reception:        { pos: [0, 0.5, 3], fov: 45 },
  doctor:           { pos: [0, 0.3, 2.5], fov: 40 },
  treatment:        { pos: [0.5, 0.5, 3], fov: 45 },
  recovery:         { pos: [0, 1, 4],   fov: 55 },
  exit_interview:   { pos: [0, 0.5, 5], fov: 60 },
};

// ── 3D Scene per beat ──────────────────────────────────────────────────────
function BeatScene({ beat }: { beat: StoryBeat }) {
  const cam = CAMERA_CONFIGS[beat.scene] || CAMERA_CONFIGS.road;

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: false }}
    >
      <PerspectiveCamera makeDefault position={cam.pos} fov={cam.fov} />
      <color attach="background" args={[beat.bgColor]} />
      <fog attach="fog" args={[beat.bgColor, 8, 25]} />

      <ambientLight intensity={0.3} color={beat.ambientColor} />
      <pointLight position={[5, 5, 5]} intensity={2} color={beat.ambientColor} castShadow />
      <pointLight position={[-5, 3, -3]} intensity={1} color="#3b82f6" />
      <spotLight position={[0, 8, 0]} angle={0.4} penumbra={1} intensity={3} color="#fff" castShadow />

      <Stars radius={30} depth={10} count={300} factor={2} fade speed={0.5} />
      <MedicalParticles color={beat.ambientColor} count={30} />

      {/* Road / outdoor scenes */}
      {(beat.scene === 'road' || beat.scene === 'vomiting') && (
        <>
          <HeatSun />
          <PatientFigure position={[-1, -1.2, 0]} wobble={beat.scene === 'vomiting'} />
          {/* Road */}
          <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[20, 6]} />
            <meshStandardMaterial color="#1a1a1a" roughness={1} />
          </mesh>
          {/* Heat shimmer */}
          <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 6]} />
            <meshStandardMaterial color="#ff6600" transparent opacity={0.04} />
          </mesh>
        </>
      )}

      {/* Hospital exterior — building visible, patient walking toward it */}
      {(beat.scene === 'hospital_exterior' || beat.scene === 'entrance') && (
        <>
          <HospitalBuilding animate />
          <PatientFigure position={[beat.scene === 'entrance' ? -0.5 : -3, -1.2, 1]} />
        </>
      )}

      {/* Reception */}
      {beat.scene === 'reception' && (
        <>
          <HospitalBuilding />
          <PatientFigure position={[-0.8, -1.2, 1.5]} sitting />
          <DoctorFigure position={[0.8, -1.2, 1.5]} />
          {/* Reception desk */}
          <mesh position={[0, -1.5, 1]}>
            <boxGeometry args={[2, 0.3, 0.6]} />
            <meshStandardMaterial color="#1a2a1a" roughness={0.5} />
          </mesh>
        </>
      )}

      {/* Doctor consultation */}
      {beat.scene === 'doctor' && (
        <>
          <DoctorFigure position={[0.8, -1.2, 0]} />
          <PatientFigure position={[-0.8, -1.2, 0]} sitting />
          {/* Examination table */}
          <mesh position={[-0.8, -1.6, 0]}>
            <boxGeometry args={[1.2, 0.15, 0.6]} />
            <meshStandardMaterial color="#2a3a2a" roughness={0.6} />
          </mesh>
          {/* Medical cross on wall */}
          <mesh position={[0, 1.5, -1.5]}>
            <planeGeometry args={[0.8, 0.8]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.6} />
          </mesh>
        </>
      )}

      {/* Treatment */}
      {beat.scene === 'treatment' && (
        <>
          <DoctorFigure position={[0.5, -1.2, 0]} />
          <PatientFigure position={[-0.5, -1.5, 0]} sitting />
          {/* IV drip stand */}
          <mesh position={[-0.5, 0.5, 0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 2.5, 6]} />
            <meshStandardMaterial color="#888" metalness={0.9} />
          </mesh>
          <mesh position={[-0.5, 1.5, 0.3]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.8} emissive="#3b82f6" emissiveIntensity={0.3} />
          </mesh>
          {/* Healing particles */}
          <MedicalParticles color="#34d399" count={20} />
        </>
      )}

      {/* Recovery */}
      {beat.scene === 'recovery' && (
        <>
          <PatientFigure position={[0, -1.2, 0]} />
          <MedicalParticles color="#fbbf24" count={25} />
          {/* Happy glow */}
          <pointLight position={[0, 1, 1]} intensity={3} color="#fbbf24" />
        </>
      )}

      {/* Exit interview */}
      {beat.scene === 'exit_interview' && (
        <>
          <HospitalBuilding />
          <NewsReporterScene />
          <MedicalParticles color="#fbbf24" count={20} />
          <pointLight position={[0, 2, 2]} intensity={2} color="#fbbf24" />
        </>
      )}
    </Canvas>
  );
}

// ── Hindi Speech ───────────────────────────────────────────────────────────
function speakHindi(text: string, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) { onEnd?.(); return; }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'hi-IN';
  utt.rate = 0.88;
  utt.pitch = 1.05;
  utt.volume = 1;
  // Try to find a Hindi voice
  const voices = window.speechSynthesis.getVoices();
  const hindi = voices.find(v => v.lang.startsWith('hi')) || voices.find(v => v.lang.startsWith('en-IN'));
  if (hindi) utt.voice = hindi;
  utt.onend = () => onEnd?.();
  utt.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utt);
}

// ── Main StoryPlayer ───────────────────────────────────────────────────────
export default function StoryPlayer() {
  const [story, setStory] = useState<DailyStory | null>(null);
  const [beatIdx, setBeatIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastScrollY = useRef<number>(0);
  const isScrollingRef = useRef(false);

  // Load story on mount
  useEffect(() => {
    getDailyStory().then(s => { setStory(s); setLoading(false); });
  }, []);

  // Scroll detection — pause when scrolling, resume when stopped
  useEffect(() => {
    const onScroll = () => {
      isScrollingRef.current = true;
      if (playing) setPlaying(false);
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        // Resume only if container is in viewport
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
          if (inView) setPlaying(true);
        }
      }, 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [playing]);

  // Intersection observer — auto-play when section enters viewport
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isScrollingRef.current) {
          setVisible(true);
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [story]);

  // Beat progression + audio
  const currentBeat = story?.beats[beatIdx];

  const advanceBeat = useCallback(() => {
    if (!story) return;
    setBeatIdx(i => {
      const next = i + 1;
      if (next >= story.beats.length) {
        setPlaying(false);
        return 0; // loop
      }
      return next;
    });
  }, [story]);

  useEffect(() => {
    if (!playing || !currentBeat || !story) return;
    clearTimeout(timerRef.current);

    // Speak Hindi audio
    if (!muted) {
      speakHindi(currentBeat.hindiAudio);
    }

    // Advance after beat duration
    timerRef.current = setTimeout(advanceBeat, currentBeat.duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.speechSynthesis?.cancel();
    };
  }, [playing, beatIdx, muted, story]);

  const togglePlay = () => {
    if (playing) {
      window.speechSynthesis?.cancel();
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    setMuted(m => {
      if (!m) window.speechSynthesis?.cancel();
      return !m;
    });
  };

  if (loading || !story) return (
    <div className="w-full h-[500px] nm-flat rounded-[48px] flex items-center justify-center border border-white/5">
      <div className="flex flex-col items-center gap-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-2 border-hospital-green border-t-transparent rounded-full" />
        <p className="text-hospital-green font-black text-sm uppercase tracking-widest">कहानी लोड हो रही है...</p>
      </div>
    </div>
  );

  const beat = story.beats[beatIdx];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Story Container */}
      <motion.div
        className={`relative overflow-hidden nm-flat border border-white/10 ${fullscreen ? 'fixed inset-4 z-[9800] rounded-[32px]' : 'rounded-[48px] h-[520px]'}`}
        style={{ boxShadow: `0 0 60px ${beat.ambientColor}22` }}
      >
        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <BeatScene beat={beat} />
        </div>

        {/* Gradient overlay — bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

        {/* Top bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="nm-flat px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-hospital-green" />
            <span className="text-[10px] font-black text-hospital-green uppercase tracking-widest">AI Story • Hindi</span>
          </div>
          <div className="flex gap-2">
            <button onClick={toggleMute}
              className="w-9 h-9 nm-flat rounded-xl flex items-center justify-center text-gray-400 hover:text-hospital-green transition-colors border border-white/10">
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button onClick={() => setFullscreen(f => !f)}
              className="w-9 h-9 nm-flat rounded-xl flex items-center justify-center text-gray-400 hover:text-hospital-green transition-colors border border-white/10">
              <ChevronRight size={15} className={fullscreen ? 'rotate-180' : ''} />
            </button>
            {fullscreen && (
              <button onClick={() => setFullscreen(false)}
                className="w-9 h-9 nm-flat rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10">
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Beat progress dots */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {story.beats.map((_, i) => (
            <button key={i} onClick={() => { setBeatIdx(i); setPlaying(true); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === beatIdx ? 'w-8 bg-hospital-green' : i < beatIdx ? 'w-3 bg-hospital-green/50' : 'w-3 bg-white/20'}`} />
          ))}
        </div>

        {/* Hindi subtitle */}
        <AnimatePresence mode="wait">
          <motion.div key={beatIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-20 left-6 right-6 z-10 text-center"
          >
            <p className="text-white font-black text-xl md:text-2xl leading-snug drop-shadow-2xl"
              style={{ textShadow: `0 0 20px ${beat.ambientColor}` }}>
              {beat.hindiText}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Controls bar */}
        <div className="absolute bottom-4 left-6 right-6 flex items-center gap-4 z-10">
          {/* Play/Pause */}
          <motion.button whileTap={{ scale: 0.9 }} onClick={togglePlay}
            className="w-12 h-12 nm-btn-green rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
            {playing ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          {/* Progress bar */}
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-hospital-green rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: playing ? '100%' : `${(beatIdx / story.beats.length) * 100}%` }}
              transition={playing ? { duration: beat.duration / 1000, ease: 'linear' } : { duration: 0.3 }}
            />
          </div>

          {/* Story title */}
          <div className="text-right flex-shrink-0">
            <p className="text-[9px] font-black text-hospital-green uppercase tracking-widest">
              {beatIdx + 1}/{story.beats.length}
            </p>
          </div>
        </div>

        {/* Paused overlay */}
        <AnimatePresence>
          {!playing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 nm-flat rounded-full flex items-center justify-center border border-hospital-green/30">
                <Play size={32} className="text-hospital-green ml-1" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Story title below */}
      <div className="mt-6 text-center">
        <p className="text-hospital-green text-xs font-black uppercase tracking-widest mb-1">आज की कहानी</p>
        <h3 className="text-white font-black text-lg italic">{story.titleHindi}</h3>
        <p className="text-gray-500 text-xs font-bold mt-1">हर 24 घंटे में नई कहानी • AI द्वारा निर्मित</p>
      </div>
    </div>
  );
}
