import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, Award, CheckCircle, Phone, Calendar } from 'lucide-react';

interface Service {
  key: string;
  icon: string;
  title: string;
  description: string;
  doctor: string;
  qualification: string;
  experience: string;
  servicesList: string[];
  timings: string;
}

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onBook: () => void;
}

export default function ServiceModal({ service, onClose, onBook }: ServiceModalProps) {
  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9500]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto nm-flat rounded-[48px] border border-white/10 p-10 z-[9600] max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 nm-inset rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 nm-inset rounded-[28px] flex items-center justify-center text-5xl">
                {service.icon}
              </div>
              <div>
                <h2 className="text-3xl font-black text-white italic leading-tight">{service.title}</h2>
                <p className="text-hospital-green text-xs font-black uppercase tracking-widest mt-1">
                  Divyam Hospital
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 font-bold leading-relaxed mb-8">{service.description}</p>

            {/* Doctor Info */}
            <div className="nm-inset rounded-[28px] p-6 mb-8 border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <User size={20} className="text-hospital-green" />
                <span className="text-white font-black italic">{service.doctor}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <Award size={20} className="text-glossy-gold" />
                <span className="text-gray-400 font-bold text-sm">{service.qualification}</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-glossy-blue" />
                <span className="text-gray-400 font-bold text-sm">{service.timings}</span>
              </div>
            </div>

            {/* Services List */}
            <div className="mb-8">
              <h3 className="text-white font-black italic mb-4 text-lg">Services Offered</h3>
              <div className="grid grid-cols-2 gap-3">
                {service.servicesList.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 nm-inset-sm p-4 rounded-2xl border border-white/5">
                    <CheckCircle size={16} className="text-hospital-green flex-shrink-0" />
                    <span className="text-gray-300 font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { onClose(); onBook(); }}
                className="flex-1 nm-btn-green py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                Book Appointment
              </motion.button>
              <motion.a
                href="tel:+919413912974"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 nm-flat py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 text-white border border-white/10"
              >
                <Phone size={16} />
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
