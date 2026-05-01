import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Users, Calendar, Building2, Stethoscope, Smile, Maximize2, X } from 'lucide-react';
import { cn } from '../lib/utils';

const CATEGORIES = [
  { id: 'all', label: 'All Images', icon: ImageIcon },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'amenities', label: 'Amenities', icon: Smile },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope },
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'events', label: 'Events', icon: Calendar },
];

const GALLERY_DATA = [
  { id: 1, category: 'departments', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', title: 'Advanced ICU' },
  { id: 2, category: 'doctors', url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800', title: 'Expert Consultation' },
  { id: 3, category: 'amenities', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800', title: 'Premium Waiting Lounge' },
  { id: 4, category: 'staff', url: 'https://images.unsplash.com/photo-1582750433449-648ed127c09e?auto=format&fit=crop&q=80&w=800', title: 'Friendly Nursing Staff' },
  { id: 5, category: 'events', url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', title: 'Health Awareness Camp' },
  { id: 6, category: 'departments', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800', title: 'High-Tech OT' },
  { id: 7, category: 'amenities', url: 'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&q=80&w=800', title: '24/7 Pharmacy' },
  { id: 8, category: 'doctors', url: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800', title: 'Surgical Excellence' },
  { id: 9, category: 'events', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', title: 'Annual Foundation Day' },
];

export default function Gallery({ isMobile = false }: { isMobile?: boolean }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_DATA[0] | null>(null);

  const filteredImages = GALLERY_DATA.filter(item => activeTab === 'all' || item.category === activeTab);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className={cn(
        "flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide",
        isMobile ? "px-1" : "justify-center px-4"
      )}>
        {CATEGORIES.map(cat => {
          const isActive = activeTab === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap text-sm font-medium",
                isActive 
                  ? "nm-btn-cta text-white" 
                  : "nm-raised text-slate-500 hover:text-slate-800"
              )}
              style={!isActive ? { borderRadius: 999, boxShadow: '4px 4px 10px rgba(163,177,198,0.4), -4px -4px 10px rgba(255,255,255,0.8)' } : { borderRadius: 999 }}
            >
              <cat.icon size={14} />
              <span>{cat.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Grid — always grid, never horizontal scroll */}
      <motion.div 
        layout
        className={cn(
          "grid gap-3",
          isMobile ? "grid-cols-2" : "grid-cols-3 gap-5"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img) => (
            <motion.div
              layout
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="group relative aspect-square nm-raised overflow-hidden cursor-pointer"
              style={{ borderRadius: isMobile ? 16 : 24 }}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-hospital-green text-[9px] font-bold uppercase tracking-wider mb-0.5">{
                  CATEGORIES.find(c => c.id === img.category)?.label
                }</p>
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  {img.title}
                  <Maximize2 size={12} className="text-white/60" />
                </h4>
              </div>
              {/* Always show title on mobile */}
              {isMobile && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/70 to-transparent p-3 pt-6">
                  <p className="text-white text-xs font-semibold leading-tight">{img.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[85vh] nm-raised p-3 flex flex-col"
              style={{ borderRadius: 28 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 w-10 h-10 nm-btn-cta rounded-full flex items-center justify-center text-white shadow-xl z-10"
              >
                <X size={18} />
              </button>
              <div className="w-full rounded-2xl overflow-hidden bg-slate-200 flex-1 min-h-0">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="pt-4 pb-1 px-3 text-center">
                <span className="nm-badge mb-2 inline-block">
                  {CATEGORIES.find(c => c.id === selectedImage.category)?.label}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
