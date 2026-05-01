import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large teal sphere top-right */}
      <motion.div
        animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] right-[8%]"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.15),8px_8px_30px_rgba(6,182,212,0.3)]" />
      </motion.div>

      {/* Pink sphere bottom-left */}
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[15%] left-[12%]"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.15),6px_6px_20px_rgba(244,114,182,0.3)] blur-[0.5px]" />
      </motion.div>

      {/* Purple torus top-left */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[5%] left-[5%]"
      >
        <div className="w-24 h-24 rounded-full border-[10px] border-purple-400/40" />
      </motion.div>

      {/* Small cyan torus bottom-right */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[8%] right-[5%]"
      >
        <div className="w-16 h-16 rounded-full border-[6px] border-cyan-400/30" />
      </motion.div>

      {/* Gradient cube mid-right */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [15, 20, 15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[40%] right-[3%]"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-200/40 to-purple-200/40 border border-cyan-300/30 rotate-12" />
      </motion.div>

      {/* Tiny dots scattered */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/50"
          style={{
            top: `${20 + i * 12}%`,
            left: `${15 + (i % 3) * 30}%`,
          }}
        />
      ))}

      {/* Wavy line decorations */}
      <svg className="absolute bottom-[20%] left-[20%] w-64 opacity-10" viewBox="0 0 200 40" fill="none">
        <path d="M0 20 Q25 0 50 20 Q75 40 100 20 Q125 0 150 20 Q175 40 200 20" stroke="#0891b2" strokeWidth="1.5" />
        <path d="M0 30 Q25 10 50 30 Q75 50 100 30 Q125 10 150 30 Q175 50 200 30" stroke="#7c3aed" strokeWidth="1" />
      </svg>
    </div>
  );
}
