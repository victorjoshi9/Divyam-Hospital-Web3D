import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ClipboardList, User, Menu, Bell, Search,
  HeartPulse, LucideIcon, ChevronRight, Pill, Map,
  Phone, Star, Zap, Users, Microscope, Quote, Award,
  Baby, MessageCircle, Calendar, CheckCircle, Loader2, X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SITE_CONFIG } from '@pkg/config/site-config';
import { supabase } from '@pkg/api/client';
import StoryPlayer from '../components/StoryPlayer';
import SpecialtyScene3D from '../components/SpecialtyScene3D';
import Gallery from '../components/Gallery';

/* ── Nav Item ── */
const NavItem = ({ icon: Icon, label, isActive, onClick }: {
  icon: LucideIcon; label: string; isActive: boolean; onClick: () => void;
}) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center flex-1 h-full gap-1">
    <div className={cn('p-2 rounded-2xl transition-all duration-300',
      isActive ? 'nm-btn-cta text-white' : 'text-slate-400')}>
      <Icon size={20} />
    </div>
    <span className={cn('text-[9px] font-bold tracking-tight transition-all duration-300',
      isActive ? 'text-hospital-green' : 'text-transparent')}>{label}</span>
  </button>
);

/* ── Section Heading ── */
const SH = ({ title, more = false }: { title: string; more?: boolean }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
    {more && <span className="text-[10px] font-bold text-hospital-green uppercase tracking-wider flex items-center gap-1">All <ChevronRight size={11} /></span>}
  </div>
);

/* ── Appointment Sheet ── */
const TIME_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
const INIT = { patient_name: '', phone: '', department: '', preferred_date: '', preferred_time: '' };

function AppointmentSheet({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: keyof typeof INIT, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.patient_name || !form.phone || !form.department) { setErr('Name, Phone & Department required'); return; }
    setErr(''); setLoading(true);
    try {
      await supabase.from('appointments').insert([{ ...form, status: 'pending' }]);
      setDone(true);
      setTimeout(() => { setDone(false); onClose(); }, 2500);
    } catch { setErr('Failed. Call: 94139-12974'); }
    finally { setLoading(false); }
  }

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      className="fixed inset-x-0 bottom-0 z-[200] nm-raised rounded-t-3xl p-5 pb-8"
      style={{ maxHeight: '85vh', overflowY: 'auto' }}>
      <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-4" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Book Appointment</h3>
        <button onClick={onClose} className="w-8 h-8 nm-pressed rounded-xl flex items-center justify-center text-slate-400"><X size={16} /></button>
      </div>
      {done ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <CheckCircle size={44} className="text-hospital-green" />
          <p className="text-slate-900 font-bold">Appointment Received!</p>
          <p className="text-slate-400 text-xs">Our team will confirm shortly.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input type="text" placeholder="Patient Name *" value={form.patient_name} onChange={e => set('patient_name', e.target.value)}
            className="w-full nm-pressed rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none" />
          <input type="tel" placeholder="Phone (+91) *" value={form.phone} onChange={e => set('phone', e.target.value)}
            className="w-full nm-pressed rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none" />
          <select value={form.department} onChange={e => set('department', e.target.value)}
            className="w-full nm-pressed rounded-xl px-4 py-3 text-sm text-slate-800 outline-none bg-[#f0f4f8]">
            <option value="">Select Department *</option>
            {SITE_CONFIG.services.map(s => <option key={s.key} value={s.title}>{s.title}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={form.preferred_date} min={new Date().toISOString().split('T')[0]}
              onChange={e => set('preferred_date', e.target.value)}
              className="nm-pressed rounded-xl px-3 py-3 text-sm text-slate-800 outline-none bg-[#f0f4f8]" />
            <select value={form.preferred_time} onChange={e => set('preferred_time', e.target.value)}
              className="nm-pressed rounded-xl px-3 py-3 text-sm text-slate-800 outline-none bg-[#f0f4f8]">
              <option value="">Time</option>
              {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          {err && <p className="text-red-500 text-xs font-medium">{err}</p>}
          <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
            className="w-full nm-btn-cta py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <Loader2 size={16} className="animate-spin" /> : 'Confirm Appointment'}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}

/* ── Gradient accent colors for cards ── */
const GRADIENTS = [
  'linear-gradient(135deg, #e0f2fe, #f0f9ff)',
  'linear-gradient(135deg, #fce7f3, #fdf2f8)',
  'linear-gradient(135deg, #d1fae5, #ecfdf5)',
  'linear-gradient(135deg, #fef3c7, #fffbeb)',
  'linear-gradient(135deg, #ede9fe, #f5f3ff)',
];

/* ── Main ── */
export default function MobileApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAppt, setShowAppt] = useState(false);

  return (
    <div className="max-w-[430px] mx-auto min-h-screen flex flex-col font-sans bg-[#f0f4f8]">

      {/* Header */}
      <header className="px-4 pt-10 pb-4 flex items-center justify-between sticky top-0 bg-[#f0f4f8]/95 backdrop-blur-xl z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 nm-btn-cta rounded-xl flex items-center justify-center text-white font-bold text-sm">D</div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 leading-none">Divyam</h1>
            <span className="text-[8px] font-bold text-hospital-green uppercase tracking-[0.3em]">Multi-Specialty Hub</span>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.9 }} className="w-9 h-9 nm-raised rounded-xl flex items-center justify-center text-slate-500" style={{ borderRadius: 14, boxShadow: '4px 4px 10px rgba(163,177,198,0.4), -4px -4px 10px rgba(255,255,255,0.8)' }}><Search size={16} /></motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="w-9 h-9 nm-raised rounded-xl flex items-center justify-center text-slate-500 relative" style={{ borderRadius: 14, boxShadow: '4px 4px 10px rgba(163,177,198,0.4), -4px -4px 10px rgba(255,255,255,0.8)' }}>
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 px-4 pt-4 overflow-y-auto pb-[88px]">

        {/* Hero Banner */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="nm-raised p-6 mb-6" style={{ borderRadius: 28, background: 'linear-gradient(135deg, #e0f7fa, #f0f4f8)' }}>
          <div className="relative z-10">
            <span className="inline-block bg-hospital-green/10 text-hospital-green px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider mb-3">Elite Healthcare</span>
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">Healthcare <br /><span className="text-hospital-green">Evolved.</span></h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-4 max-w-[200px]">Premium care with advanced 3D diagnostics.</p>
            <motion.a href="tel:9413912974" whileTap={{ scale: 0.95 }}
              className="nm-btn-cta inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold">
              <Phone size={12} /> Call Specialist
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="nm-raised p-5 text-center" style={{ borderRadius: 20, background: 'linear-gradient(135deg, #e0f2fe, #f0f4f8)' }}>
            <Users size={22} className="mx-auto mb-2 text-hospital-green" />
            <h4 className="text-xl font-extrabold text-slate-900">5k+</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Patients</p>
          </div>
          <div className="nm-raised p-5 text-center" style={{ borderRadius: 20, background: 'linear-gradient(135deg, #fef3c7, #f0f4f8)' }}>
            <Award size={22} className="mx-auto mb-2 text-amber-500" />
            <h4 className="text-xl font-extrabold text-slate-900">4.4★</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">JustDial</p>
          </div>
        </div>

        {/* 3D Specialty Quick Access */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {SITE_CONFIG.services.map(svc => (
            <div key={svc.key} className="flex flex-col items-center gap-1.5 min-w-[72px]">
              <motion.div whileTap={{ scale: 0.9 }} className="nm-raised overflow-hidden" style={{ borderRadius: 18, padding: 2 }}>
                <SpecialtyScene3D specialty={svc.key} size={64} />
              </motion.div>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tight text-center leading-tight w-16">{svc.title.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        {/* AI Story */}
        <div className="mb-6">
          <SH title="आज की कहानी" />
          <StoryPlayer />
        </div>

        {/* Contact Actions */}
        <div className="mb-6">
          <SH title="संपर्क करें" />
          <div className="grid grid-cols-3 gap-3 mb-3">
            <motion.a href="https://wa.me/919413912974?text=Hello%2C%20I%20need%20an%20appointment%20at%20Divyam%20Hospital"
              target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.93 }}
              className="nm-raised p-4 flex flex-col items-center gap-2 text-center" style={{ borderRadius: 22 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#25d366,#128c7e)' }}>
                <MessageCircle size={18} className="text-white" />
              </div>
              <span className="text-[9px] font-bold text-slate-700">WhatsApp</span>
            </motion.a>

            <motion.button onClick={() => setShowAppt(true)} whileTap={{ scale: 0.93 }}
              className="nm-raised p-4 flex flex-col items-center gap-2 text-center" style={{ borderRadius: 22 }}>
              <div className="w-10 h-10 nm-btn-cta rounded-xl flex items-center justify-center">
                <Calendar size={18} className="text-white" />
              </div>
              <span className="text-[9px] font-bold text-slate-700">Book Appt</span>
            </motion.button>

            <motion.a href="tel:+919413912974" whileTap={{ scale: 0.93 }}
              className="nm-raised p-4 flex flex-col items-center gap-2 text-center" style={{ borderRadius: 22 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#ef4444,#b91c1c)' }}>
                <Phone size={18} className="text-white" />
              </div>
              <span className="text-[9px] font-bold text-slate-700">Call Now</span>
            </motion.a>
          </div>

          <motion.a href="https://www.justdial.com/Bikaner/Divyam-Hospital-Divyam-Hospital-Gangashahar/9999PX151-X151-240713111612-H9B1_BZDET"
            target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.97 }}
            className="nm-raised p-4 flex items-center gap-3" style={{ borderRadius: 20, background: 'linear-gradient(135deg, #fef3c7, #f0f4f8)' }}>
            <div className="w-10 h-10 nm-pressed rounded-xl flex items-center justify-center flex-shrink-0">
              <Star size={18} className="text-amber-500 fill-amber-500" />
            </div>
            <div className="flex-1">
              <p className="text-slate-900 font-bold text-sm">Rated 4.4★ on JustDial</p>
              <p className="text-slate-400 text-[9px] font-medium mt-0.5">500+ verified reviews</p>
            </div>
            <span className="text-hospital-green text-sm font-bold">→</span>
          </motion.a>
        </div>

        {/* Services */}
        <div className="mb-6">
          <SH title="Elite Services" more />
          <div className="space-y-3">
            {[
              { icon: Pill, label: 'Shubhman Pharmacy', desc: 'Premium 24/7 authentic medicines.', grad: GRADIENTS[0] },
              { icon: Map, label: '360° Virtual Tour', desc: 'Immersive 4K 3D facility view.', grad: GRADIENTS[2] },
              { icon: HeartPulse, label: 'Cardiology', desc: 'ECG, Echo, TMT & cardiac care.', grad: GRADIENTS[3] },
            ].map((s, i) => (
              <motion.div key={i} whileTap={{ scale: 0.98 }}
                className="nm-raised p-5 flex gap-4 items-center" style={{ borderRadius: 22, background: s.grad }}>
                <div className="w-12 h-12 nm-pressed rounded-2xl flex items-center justify-center flex-shrink-0 text-hospital-green">
                  <s.icon size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{s.label}</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Specialists & Staff */}
        <div className="mb-6">
          <SH title="Experts & Staff" />
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { name: 'Dr. MG Choudhary', role: 'Child Specialist', seed: 'MG', grad: GRADIENTS[0] },
              { name: 'Dr. Shahana Chandad', role: 'Gynecologist', seed: 'Shahana', grad: GRADIENTS[1] },
              { name: 'Dr. Nisha Choudhary', role: 'Dental Surgeon', seed: 'Nisha', grad: GRADIENTS[4] },
              { name: 'Sister Sunita', role: 'Head Nurse', seed: 'Sunita', grad: GRADIENTS[2] },
              { name: 'Priya Sharma', role: 'Coordinator', seed: 'Priya', grad: GRADIENTS[3] },
            ].map((doc, i) => (
              <motion.div key={i} whileTap={{ scale: 0.97 }}
                className="nm-raised min-w-[145px] p-4 text-center flex-shrink-0" style={{ borderRadius: 22, background: doc.grad }}>
                <div className="w-14 h-14 nm-pressed rounded-2xl p-1 mb-2.5 mx-auto">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doc.seed}`} alt={doc.name} className="w-full h-full rounded-xl" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">{doc.name}</h4>
                <p className="text-[8px] font-bold text-hospital-green uppercase tracking-wider mt-1">{doc.role}</p>
                <div className="flex justify-center gap-0.5 mt-1.5 text-amber-400">
                  {[...Array(5)].map((_, j) => <Star key={j} size={8} fill="currentColor" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency */}
        <div className="mb-6">
          <div className="nm-raised p-6" style={{ borderRadius: 24, background: 'linear-gradient(135deg, #fef2f2, #f0f4f8)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg,#ef4444,#b91c1c)' }}><Zap size={20} /></div>
              <div className="text-right">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Rapid Force</p>
                <p className="text-lg font-extrabold text-slate-900">8min Response</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">Global-standard critical care with prioritized ambulance reach.</p>
            <motion.a href="tel:9413912974" whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white" style={{ background: 'linear-gradient(135deg,#ef4444,#b91c1c)' }}>
              <Phone size={14} /> EMERGENCY: 94139-12974
            </motion.a>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <SH title="Real Voices" />
          {[
            { name: 'Aryan Sharma', text: 'Futuristic diagnostics and exceptionally friendly specialists. Best in Rajasthan.', rating: 5, grad: GRADIENTS[0] },
            { name: 'Priya Solanki', text: 'AC ICU facilities and staff care rivals the best hospitals in Jaipur or Delhi.', rating: 5, grad: GRADIENTS[1] },
          ].map((r, i) => (
            <motion.div key={i} className="nm-raised p-5 mb-3" style={{ borderRadius: 22, background: r.grad }}>
              <div className="flex gap-3 items-center mb-3">
                <div className="w-9 h-9 nm-pressed rounded-xl flex items-center justify-center text-hospital-green"><Quote size={14} /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{r.name}</p>
                  <div className="flex gap-0.5 text-amber-400">{[...Array(r.rating)].map((_, j) => <Star key={j} size={8} fill="currentColor" />)}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">"{r.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Gallery */}
        <div className="mb-4">
          <SH title="Hospital Gallery" />
          <Gallery isMobile />
        </div>

      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto z-[100]">
        <div className="mx-3 mb-3">
          <div className="h-[68px] rounded-[22px] flex items-center justify-around bg-[#f0f4f8]" style={{ boxShadow: '8px 8px 20px rgba(163,177,198,0.5), -8px -8px 20px rgba(255,255,255,0.9)' }}>
            <NavItem icon={Home} label="Home" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
            <NavItem icon={ClipboardList} label="OPD" isActive={activeTab === 'opd'} onClick={() => setActiveTab('opd')} />
            <NavItem icon={User} label="Patient" isActive={activeTab === 'patient'} onClick={() => setActiveTab('patient')} />
            <NavItem icon={Menu} label="More" isActive={activeTab === 'menu'} onClick={() => setActiveTab('menu')} />
          </div>
        </div>
      </div>

      {/* Appointment Sheet */}
      <AnimatePresence>
        {showAppt && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAppt(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[190]" />
            <AppointmentSheet onClose={() => setShowAppt(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
