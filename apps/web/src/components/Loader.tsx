import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, HeartPulse, Pill, Activity } from 'lucide-react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] bg-nm-bg flex flex-col items-center justify-center pointer-events-none">
      <div className="relative">
        {/* Outer Pulsing Rings */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 w-64 h-64 -m-12 border-2 border-hospital-green/20 rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute inset-0 w-80 h-80 -m-20 border border-hospital-green/10 rounded-full"
        />

        {/* Central Core */}
        <div className="w-40 h-40 nm-flat rounded-[40px] flex items-center justify-center relative z-10 border border-white/5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border-2 border-dashed border-hospital-green/30 rounded-full"
          />
          
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                color: ['#10b981', '#34d399', '#10b981']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HeartPulse size={48} className="text-hospital-green shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
            </motion.div>
            <span className="text-[10px] font-black tracking-[0.4em] text-hospital-green uppercase mt-4 animate-pulse">
              System Ready
            </span>
          </div>
        </div>

        {/* Orbiting Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <motion.div className="absolute -top-6 left-1/2 -translate-x-1/2 p-3 nm-flat rounded-xl text-glossy-blue border border-white/10">
              <Stethoscope size={20} />
            </motion.div>
            <motion.div className="absolute top-1/2 -right-6 -translate-y-1/2 p-3 nm-flat rounded-xl text-glossy-gold border border-white/10">
              <Pill size={20} />
            </motion.div>
            <motion.div className="absolute bottom-1/2 -left-6 translate-y-1/2 p-3 nm-flat rounded-xl text-glossy-red border border-white/10">
              <Activity size={20} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-black italic text-glossy tracking-tighter">Divyam Hospital</h2>
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.8em] mt-2">Launching Healthcare 3.0</p>
      </motion.div>
    </div>
  );
}
