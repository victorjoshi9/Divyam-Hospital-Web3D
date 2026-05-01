import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp, Star } from 'lucide-react';

export default function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Bottom-right stack: WhatsApp → Call → ScrollTop ── */}
      <div className="fixed bottom-8 right-6 z-[9000] flex flex-col gap-3 items-end">

        {/* Scroll to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scroll-top"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-11 h-11 nm-flat rounded-2xl flex items-center justify-center text-gray-400 border border-white/10 hover:text-hospital-green transition-colors"
              title="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp — green gradient */}
        <motion.a
          href="https://wa.me/919413912974?text=Hello%2C%20I%20need%20an%20appointment%20at%20Divyam%20Hospital"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border border-white/10"
          style={{
            background: 'linear-gradient(145deg, #34d399, #064e3b)',
            boxShadow: '0 4px 20px rgba(52,211,153,0.4), inset 0 1px rgba(255,255,255,0.15)'
          }}
          title="Chat on WhatsApp"
        >
          {/* Pulse ring */}
          <motion.span
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'rgba(52,211,153,0.3)' }}
          />
          <MessageCircle size={24} className="text-white relative z-10" />
        </motion.a>

        {/* Call — green neumorphic (not red) */}
        <motion.a
          href="tel:+919413912974"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border border-white/10"
          style={{
            background: 'linear-gradient(145deg, #10b981, #064e3b)',
            boxShadow: '0 4px 20px rgba(16,185,129,0.45), inset 0 1px rgba(255,255,255,0.15)'
          }}
          title="Call Emergency"
        >
          <motion.div
            animate={{ rotate: [0, 12, -12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Phone size={22} className="text-white" />
          </motion.div>
        </motion.a>
      </div>

      {/* ── Bottom-left: JustDial Rating Badge ── */}
      <motion.a
        href="https://www.justdial.com/Bikaner/Divyam-Hospital-Divyam-Hospital-Gangashahar/9999PX151-X151-240713111612-H9B1_BZDET"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05, x: 4 }}
        className="fixed bottom-8 left-6 z-[9000] nm-flat px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-3 backdrop-blur-xl cursor-pointer"
        title="View on JustDial"
      >
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={11}
              className="text-glossy-gold"
              fill={i < 4 ? 'currentColor' : 'none'}
            />
          ))}
        </div>
        <div>
          <p className="text-white font-black text-sm leading-none">4.4</p>
          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-0.5">JustDial</p>
        </div>
      </motion.a>
    </>
  );
}
