import { motion } from 'framer-motion';
import { Heart, Pill, Stethoscope, ShieldPlus, Cross, Activity } from 'lucide-react';

const floatVariant = (delay: number, dur: number) => ({
  animate: { y: [0, -14, 0], rotate: [0, 5, -5, 0] },
  transition: { duration: dur, repeat: Infinity, delay, ease: 'easeInOut' },
});

export default function HeroMedical3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Glow orbs */}
      <div className="absolute w-72 h-72 bg-red-500/10 rounded-full blur-[100px] top-10 left-10" />
      <div className="absolute w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] bottom-10 right-10" />

      {/* Central Red Cross */}
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="relative z-10"
        style={{ perspective: '600px' }}
      >
        <div className="w-40 h-40 rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl">
          <Cross size={72} className="text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]" strokeWidth={3} />
        </div>
      </motion.div>

      {/* Floating pill top-left */}
      <motion.div {...floatVariant(0, 4)} className="absolute top-8 left-8 z-20">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/20 flex items-center justify-center backdrop-blur-sm">
          <Pill size={28} className="text-orange-400" />
        </div>
      </motion.div>

      {/* Floating heart top-right */}
      <motion.div {...floatVariant(0.5, 3.5)} className="absolute top-12 right-12 z-20">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/20 flex items-center justify-center backdrop-blur-sm">
          <Heart size={24} className="text-red-400 fill-red-400/30" />
        </div>
      </motion.div>

      {/* Floating stethoscope bottom-left */}
      <motion.div {...floatVariant(1, 5)} className="absolute bottom-16 left-16 z-20">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 flex items-center justify-center backdrop-blur-sm">
          <Stethoscope size={24} className="text-blue-400" />
        </div>
      </motion.div>

      {/* Floating shield bottom-right */}
      <motion.div {...floatVariant(1.5, 4.5)} className="absolute bottom-8 right-8 z-20">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
          <ShieldPlus size={28} className="text-emerald-400" />
        </div>
      </motion.div>

      {/* Floating pulse mid-left */}
      <motion.div {...floatVariant(2, 3)} className="absolute top-1/2 left-2 z-20">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center backdrop-blur-sm">
          <Activity size={20} className="text-purple-400" />
        </div>
      </motion.div>

      {/* Orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-72 h-72 border border-dashed border-white/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-96 h-96 border border-dashed border-white/[0.03] rounded-full"
      />

      {/* Small floating dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
          className="absolute w-1.5 h-1.5 bg-red-400/40 rounded-full"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}
    </div>
  );
}
