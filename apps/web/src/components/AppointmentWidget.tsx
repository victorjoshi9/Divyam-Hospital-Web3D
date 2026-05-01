import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@pkg/api/client';
import { SITE_CONFIG } from '@pkg/config/site-config';

interface FormData {
  patient_name: string;
  phone: string;
  department: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
}

const INITIAL: FormData = {
  patient_name: '', phone: '', department: '', preferred_date: '', preferred_time: '', message: ''
};

const TIME_SLOTS = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'];

export default function AppointmentWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.patient_name || !form.phone || !form.department) {
      setError('Please fill Name, Phone and Department.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { error: err } = await supabase.from('appointments').insert([{
        ...form,
        status: 'pending'
      }]);
      if (err) throw err;
      setSuccess(true);
      setForm(INITIAL);
      setTimeout(() => { setSuccess(false); setOpen(false); }, 3000);
    } catch {
      setError('Submission failed. Please call us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-28 right-6 z-[8999]">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="nm-btn-green px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl"
      >
        <Calendar size={16} />
        Book Appointment
      </motion.button>

      {/* Expandable Form Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-14 right-0 w-[360px] nm-flat rounded-[32px] border border-white/10 p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white italic">Book Appointment</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <CheckCircle size={56} className="text-hospital-green" />
                <p className="text-white font-black text-center italic">Appointment Received!</p>
                <p className="text-gray-500 text-xs text-center font-bold">Our team will confirm shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Patient Name *"
                  value={form.patient_name}
                  onChange={e => set('patient_name', e.target.value)}
                  className="w-full nm-inset rounded-xl px-5 py-3 bg-transparent text-white text-sm font-bold placeholder:text-gray-600 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone (+91) *"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  className="w-full nm-inset rounded-xl px-5 py-3 bg-transparent text-white text-sm font-bold placeholder:text-gray-600 outline-none"
                />
                <select
                  value={form.department}
                  onChange={e => set('department', e.target.value)}
                  className="w-full nm-inset rounded-xl px-5 py-3 bg-nm-bg text-white text-sm font-bold outline-none"
                >
                  <option value="">Select Department *</option>
                  {SITE_CONFIG.services.map(s => (
                    <option key={s.key} value={s.title}>{s.title}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={form.preferred_date}
                    onChange={e => set('preferred_date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="nm-inset rounded-xl px-4 py-3 bg-nm-bg text-white text-sm font-bold outline-none"
                  />
                  <select
                    value={form.preferred_time}
                    onChange={e => set('preferred_time', e.target.value)}
                    className="nm-inset rounded-xl px-4 py-3 bg-nm-bg text-white text-sm font-bold outline-none"
                  >
                    <option value="">Time</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <textarea
                  placeholder="Message (optional)"
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  rows={2}
                  className="w-full nm-inset rounded-xl px-5 py-3 bg-transparent text-white text-sm font-bold placeholder:text-gray-600 outline-none resize-none"
                />
                {error && <p className="text-red-400 text-xs font-bold">{error}</p>}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full nm-btn-green py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : 'Confirm Appointment'}
                </motion.button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
