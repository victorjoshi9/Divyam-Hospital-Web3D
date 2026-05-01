import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Activity,
  Map, Phone, Pill, Clock,
  Star, Stethoscope, Microscope, ShieldCheck,
  Smartphone, Award, Zap, HeartPulse,
  Baby, Smile, Syringe, Building2, Quote,
  X, CheckCircle, Calendar, MessageCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import HeroMedical3D from '../components/HeroMedical3D';
import FloatingShapes from '../components/FloatingShapes';
import StoryPlayer from '../components/StoryPlayer';
import SpecialtyScene3D from '../components/SpecialtyScene3D';
import Gallery from '../components/Gallery';
import { SITE_CONFIG } from '@pkg/config/site-config';

const NavLink = ({ label, href, active }: { label: string; href: string; active?: boolean }) => (
  <motion.a
    href={href}
    whileHover={{ y: -1 }}
    className={cn(
      "font-medium text-sm px-4 py-2 transition-colors",
      active ? "text-hospital-green" : "text-slate-600 hover:text-hospital-green"
    )}
  >
    {label}
  </motion.a>
);

const SectionTitle = ({ children, subtitle, center = true, dark = false }: { children: React.ReactNode; subtitle?: string; center?: boolean; dark?: boolean }) => (
  <div className={cn("mb-14 px-4", center ? "text-center" : "text-left")}>
    {subtitle && (
      <span className={cn("text-xs font-semibold uppercase tracking-widest mb-3 block", dark ? "text-cyan-400" : "text-hospital-green")}>
        {subtitle}
      </span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("text-4xl md:text-5xl font-extrabold leading-tight tracking-tight", dark ? "text-white" : "text-slate-900")}
    >
      {children}
    </motion.h2>
  </div>
);

// Service card — neumorphic raised card
const ServiceCard = ({ svc, onOpen }: { svc: typeof SITE_CONFIG.services[0]; onOpen: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    onClick={onOpen}
    className="nm-raised p-7 cursor-pointer group"
  >
    {/* 3D specialty scene */}
    <div className="mb-5 flex justify-center">
      <div className="nm-pressed rounded-2xl p-4">
        <SpecialtyScene3D specialty={svc.key} size={100} />
      </div>
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-1.5">{svc.title}</h3>
    <p className="text-hospital-green text-[11px] font-semibold uppercase tracking-wider mb-2">{svc.doctor}</p>
    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{svc.description}</p>
    <div className="mt-4">
      <span className="nm-btn-cta px-5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-2">
        View Details <span>→</span>
      </span>
    </div>
  </motion.div>
);

// Service detail modal — neumorphic
const ServiceModal = ({ svc, onClose, onBook }: { svc: typeof SITE_CONFIG.services[0] | null; onClose: () => void; onBook: () => void }) => (
  <AnimatePresence>
    {svc && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9500]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto nm-raised p-8 z-[9600] max-h-[88vh] overflow-y-auto"
        >
          <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 nm-pressed rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800">
            <X size={16} />
          </button>
          <div className="flex items-center gap-5 mb-5">
            <div className="nm-pressed rounded-2xl p-3">
              <SpecialtyScene3D specialty={svc.key} size={80} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">{svc.title}</h2>
              <p className="text-hospital-green text-xs font-bold uppercase tracking-wider mt-1">{svc.doctor} • {svc.qualification}</p>
              <p className="text-slate-400 text-xs font-medium mt-1">{svc.experience} • {svc.timings}</p>
            </div>
          </div>
          <p className="text-slate-500 leading-relaxed mb-5 text-sm">{svc.description}</p>
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            {svc.servicesList.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 nm-pressed p-3 rounded-xl">
                <CheckCircle size={14} className="text-hospital-green flex-shrink-0" />
                <span className="text-slate-700 font-medium text-xs">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => { onClose(); onBook(); }}
              className="flex-1 nm-btn-cta py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
              <Calendar size={14} /> Book Appointment
            </motion.button>
            <motion.a href="tel:+919413912974" whileTap={{ scale: 0.97 }}
              className="flex-1 nm-btn py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-slate-700">
              <Phone size={14} /> Call Now
            </motion.a>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const DoctorCard = ({ name, role, spec, image, dept, rating = 5 }: any) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="nm-raised p-5 group cursor-pointer"
    >
      {/* Photo in pressed well */}
      <div className="relative nm-pressed rounded-2xl overflow-hidden mb-4">
        <div className="aspect-[3/4]">
          <motion.img 
            src={image} 
            alt={name}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        
        {/* Department badge — neumorphic pill */}
        {dept && (
          <div className="absolute top-3 left-3 nm-badge">
            {dept}
          </div>
        )}
        
        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex gap-0.5">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>

      {/* Info */}
      <h4 className="text-base font-bold text-slate-900 leading-tight">{name}</h4>
      <p className="text-hospital-green text-[11px] font-semibold uppercase tracking-wider mt-1">{role}</p>
      <p className="text-slate-400 text-xs mt-2 leading-relaxed line-clamp-2">{spec}</p>
      
      {/* Hover-reveal button */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="mt-3 w-full py-2.5 nm-btn-cta rounded-xl font-semibold text-xs"
        >
          Book Consultation →
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const ReviewCard = ({ name, comment, rating, date }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="nm-raised p-7"
    style={{ background: 'linear-gradient(135deg, #e0f2fe, #f0f4f8)' }}
  >
    <div className="flex items-center gap-4 mb-5">
      <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-hospital-green">
        <Quote size={22} />
      </div>
      <div>
        <p className="text-slate-900 font-bold">{name}</p>
        <div className="flex gap-0.5 text-amber-400">
          {[...Array(rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
        </div>
      </div>
    </div>
    <p className="text-slate-500 text-sm leading-relaxed">"{comment}"</p>
    <p className="text-xs text-slate-400 font-medium mt-5">{date}</p>
  </motion.div>
);

const StatCard = ({ icon: Icon, value, label, color }: any) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -4 }}
    className="nm-raised p-6 flex flex-col items-center text-center"
  >
    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", color)}>
      <Icon size={28} />
    </div>
    <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{value}</h3>
    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
  </motion.div>
);

export default function DesktopApp() {
  const [selectedService, setSelectedService] = useState<typeof SITE_CONFIG.services[0] | null>(null);
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 font-sans">
      <ServiceModal svc={selectedService} onClose={() => setSelectedService(null)} onBook={() => setBookOpen(true)} />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto bg-[#f0f4f8] h-16 rounded-2xl px-6 lg:px-10 flex items-center justify-between" style={{ boxShadow: '6px 6px 16px rgba(163,177,198,0.4), -6px -6px 16px rgba(255,255,255,0.8)' }}>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg btn-primary flex items-center justify-center font-bold text-sm">
              D
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 leading-none">Divyam Hospital</span>
              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">Multi-Specialty</span>
            </div>
          </div>
          
          <div className="hidden xl:flex items-center gap-4">
            <NavLink label="About" href="#about" />
            <NavLink label="Specialists" href="#team" />
            <NavLink label="Services" href="#services" />
            <NavLink label="Gallery" href="#gallery" />
            <NavLink label="Pharmacy" href="#pharmacy" />
            <NavLink label="Reviews" href="#reviews" />
            <NavLink label="Contact" href="#contact" />
          </div>

          <div className="flex items-center gap-6">
            <motion.a 
              href="tel:9413912974"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-5 py-2.5 btn-primary rounded-xl font-semibold text-xs"
            >
              <Phone size={14} />
              94139-12974
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 lg:px-10 relative overflow-hidden">
        <FloatingShapes />
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center relative z-10">
          <div className="col-span-12 lg:col-span-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-cyan-50 border border-cyan-100"
            >
              <HeartPulse size={14} className="text-hospital-green" />
              <span className="text-xs font-medium text-hospital-green-dark">Bikaner's Premier Healthcare</span>
            </motion.div>
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-slate-900"
            >
              Creative <span className="underline decoration-hospital-green decoration-4 underline-offset-4">healthcare</span> for a bright future
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base text-slate-500 leading-relaxed max-w-md mb-8"
            >
              Combining elite medical expertise with cutting-edge diagnostic technology for world-class patient care in Bikaner.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-8 py-3.5 rounded-full font-semibold text-sm"
              >
                Book Appointment
              </motion.button>
              <motion.a 
                href="#services"
                whileHover={{ scale: 1.05 }}
                className="btn-outline px-8 py-3.5 rounded-full text-sm inline-flex items-center gap-2"
              >
                Read More <span>→</span>
              </motion.a>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="col-span-12 lg:col-span-6 h-[380px] lg:h-[480px] relative"
          >
            <HeroMedical3D />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={HeartPulse} value="5,000+" label="Happy Patients" color="text-hospital-green bg-cyan-50" />
          <StatCard icon={Stethoscope} value="7+" label="Expert Specialists" color="text-blue-500 bg-blue-50" />
          <StatCard icon={Activity} value="24/7" label="Emergency" color="text-emerald-500 bg-emerald-50" />
          <StatCard icon={Clock} value="8min" label="Avg Response" color="text-amber-500 bg-amber-50" />
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6 lg:px-10" id="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden relative group shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                alt="Hospital" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 nm-raised rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 size={48} className="text-hospital-green" />
            </div>
          </div>
          <div>
            <SectionTitle subtitle="Our Vision" center={false}>The Hub of <br />Precision Medicine</SectionTitle>
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              Divyam Hospital is more than a clinical facility; it's a sanctuary of health driven by innovation. We bring together world-class specialists and futuristic technology.
            </p>
            <div className="space-y-3">
              {['Elite Infrastructure', 'Advanced Diagnostics', '24/7 Emergency', 'Dedicated Care'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 nm-raised p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-hospital-green">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="font-medium text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 lg:px-10" id="services">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Our Services">World Class Services</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITE_CONFIG.services.map(svc => (
              <ServiceCard key={svc.key} svc={svc} onOpen={() => setSelectedService(svc)} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Story Section */}
      <section className="py-20 px-10" id="story">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="AI Cinematic Story">मरीज़ की कहानी</SectionTitle>
          <StoryPlayer />
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-32 px-6 lg:px-10" id="team">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Our Expert Team">Meet the Specialists</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            <DoctorCard 
              name="Dr. MG Choudhary" 
              role="MD (Pediatrics)" 
              dept="Pediatrics"
              spec="Top Child Specialist in Bikaner with 15+ years of clinical excellence." 
              image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400" 
            />
            <DoctorCard 
              name="Dr. Shahana Chandad" 
              role="MS (OBG)" 
              dept="Gynecology"
              spec="Maternity & High-risk Pregnancy specialist in elite women care." 
              image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" 
            />
            <DoctorCard 
              name="Dr. Nisha Choudhary" 
              role="MDS (Prosthodontics)" 
              dept="Dental"
              spec="Expert in aesthetic dentistry and advanced prosthetic oral solutions." 
              image="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400" 
            />
            <DoctorCard 
              name="Dr. Rahul Gahlot" 
              dept="Surgery" 
              role="MDS (Oral & Maxillofacial)" 
              spec="Precision Surgeon for complex facial traumas and oral surgeries." 
              image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400" 
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <DoctorCard 
              name="Sister Sunita" 
              dept="Nursing" 
              role="Head Nurse (ICU)" 
              spec="Friendly & compassionate nursing care. 10+ years dedicated to patient recovery." 
              image="https://images.unsplash.com/photo-1582750433449-648ed127c09e?auto=format&fit=crop&q=80&w=400" 
            />
            <DoctorCard 
              name="Priya Sharma" 
              dept="Front Desk" 
              role="Patient Coordinator" 
              spec="Ensuring a smooth, welcoming experience for all patients at front desk." 
              image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400" 
            />
            <DoctorCard 
              name="Rajesh Kumar" 
              dept="Emergency" 
              role="Emergency Responder" 
              spec="Always alert, friendly and fast during emergency critical situations." 
              image="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400" 
            />
            <DoctorCard 
              name="Anita Desai" 
              dept="Child Care" 
              role="Pediatric Nurse" 
              spec="Specialized in child care, making the environment playful and safe." 
              image="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400" 
            />
          </div>
        </div>
      </section>

      {/* Pharmacy */}
      <section className="py-24 px-6 lg:px-10" id="pharmacy">
        <div className="max-w-7xl mx-auto nm-raised rounded-3xl p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-hospital-green mb-6">
              <Pill size={32} />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Shubhman <br />Pharmacy</h2>
            <p className="text-slate-500 mb-8 leading-relaxed max-w-md">
              A premium in-house pharmacy serving authentic medical supplies 24/7.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="nm-raised p-5 rounded-2xl">
                <ShieldCheck className="text-hospital-green mb-3" size={24} />
                <p className="font-semibold text-slate-800 text-sm">Certified Drugs</p>
                <p className="text-xs text-slate-400 mt-1">100% Authenticity</p>
              </div>
              <div className="nm-raised p-5 rounded-2xl">
                <Clock className="text-blue-500 mb-3" size={24} />
                <p className="font-semibold text-slate-800 text-sm">Instant Supply</p>
                <p className="text-xs text-slate-400 mt-1">24/7 Availability</p>
              </div>
            </div>
          </div>
          <div className="flex-1 aspect-square rounded-3xl overflow-hidden relative group shadow-lg">
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" alt="Pharmacy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 lg:px-10" id="reviews">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Patient Feedback">Voice of Trust</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard 
              name="Aryan Sharma" 
              comment="The diagnostic facility is futuristic. Got my 3D reports the same day. Dr. MG is exceptionally child-friendly." 
              rating={5} 
              date="2 weeks ago" 
            />
            <ReviewCard 
              name="Priya Solanki" 
              comment="Premium experience. The AC ICU facilities and staff care rivals the best hospitals in Jaipur or Delhi." 
              rating={5} 
              date="1 month ago" 
            />
            <ReviewCard 
              name="Rajesh Goyal" 
              comment="Best dental surgery in Bikaner. The infrastructure is top-notch and the pharmacy is 24/7 reliable." 
              rating={4} 
              date="3 months ago" 
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 lg:px-10" id="gallery">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Visual Journey">Our Hospital Gallery</SectionTitle>
          <Gallery />
        </div>
      </section>

      {/* 360° Virtual Metaverse Tour */}
      <section className="py-24 px-6 lg:px-10" id="tour">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Virtual Tour">360° Hospital View</SectionTitle>
          <div className="rounded-3xl h-[500px] relative overflow-hidden group shadow-xl">
            <div className="w-full h-full overflow-hidden relative">
              <div className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold text-hospital-green flex items-center gap-2">
                  <Activity size={12} className="animate-pulse" /> Live 360°
                </p>
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.5!2d73.3119!3d28.0076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA0JzI3LjQiTiA3M8KwMTgnNDIuOCJF!5e0!3m2!1sen!2sin" 
                className="w-full h-full group-hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6 lg:px-10" id="contact">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5">
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-8">Get in <br />Touch.</h2>
            <div className="space-y-4">
              <div className="nm-raised p-6 rounded-2xl flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-hospital-green">
                  <Map size={24} />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Mahabalipuram</p>
                  <p className="text-xs text-slate-400 mt-1">Nokha Road, Bikaner</p>
                </div>
              </div>
              <div className="nm-raised p-6 rounded-2xl flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <Smartphone size={24} />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">94139-12974</p>
                  <p className="text-xs text-slate-400 mt-1">Direct Line</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7">
            <div className="nm-raised p-10 rounded-3xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Send Inquiry</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" placeholder="Your Name" className="input-inset rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder:text-slate-400" />
                <input type="tel" placeholder="Mobile" className="input-inset rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder:text-slate-400" />
              </div>
              <textarea placeholder="Your message..." className="w-full input-inset rounded-xl px-5 py-3.5 text-sm h-32 text-slate-800 placeholder:text-slate-400 mb-4" />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full nm-btn-cta py-3.5 rounded-xl font-semibold text-sm">
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 px-6 lg:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Quick Actions">Connect With Us</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a href="https://wa.me/919413912974?text=Hello%2C%20I%20need%20an%20appointment%20at%20Divyam%20Hospital" target="_blank" rel="noopener noreferrer" whileHover={{ y: -6 }} className="nm-raised p-8 rounded-2xl text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}><MessageCircle size={28} className="text-white" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">WhatsApp Chat</h3>
              <p className="text-slate-500 text-sm mb-3">Instant messaging 24/7</p>
              <span className="text-hospital-green text-xs font-semibold">Start Chat →</span>
            </motion.a>
            <motion.button onClick={() => setBookOpen(true)} whileHover={{ y: -6 }} className="nm-raised p-8 rounded-2xl text-center">
              <div className="w-14 h-14 mx-auto mb-4 btn-primary rounded-xl flex items-center justify-center"><Calendar size={28} className="text-white" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Book Appointment</h3>
              <p className="text-slate-500 text-sm mb-3">Schedule your visit online</p>
              <span className="text-hospital-green text-xs font-semibold">Book Now →</span>
            </motion.button>
            <motion.a href="tel:+919413912974" whileHover={{ y: -6 }} className="nm-raised p-8 rounded-2xl text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}><Phone size={28} className="text-white" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Emergency Call</h3>
              <p className="text-slate-500 text-sm mb-3">Available 24/7</p>
              <span className="text-hospital-green text-xs font-semibold">94139-12974 →</span>
            </motion.a>
          </div>
          <motion.a href="https://www.justdial.com/Bikaner/Divyam-Hospital-Divyam-Hospital-Gangashahar/9999PX151-X151-240713111612-H9B1_BZDET" target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} className="mt-6 nm-raised p-6 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center"><Star size={24} className="text-amber-500 fill-amber-500" /></div>
              <div>
                <h4 className="font-bold text-slate-900">Rated 4.4★ on JustDial</h4>
                <p className="text-slate-400 text-sm">500+ verified reviews</p>
              </div>
            </div>
            <span className="text-hospital-green text-xs font-semibold">View →</span>
          </motion.a>
        </div>
      </section>

      {/* Appointment Modal */}
      <AnimatePresence>
        {bookOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setBookOpen(false)} className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9500]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 z-[9600] max-h-[88vh] overflow-y-auto"
            >
              <button onClick={() => setBookOpen(false)} className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800">
                <X size={16} />
              </button>
              <h3 className="text-xl font-bold text-slate-900 mb-6">Book Appointment</h3>
              <form className="space-y-3">
                <input type="text" placeholder="Patient Name *" className="w-full input-inset rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder:text-slate-400" />
                <input type="tel" placeholder="Phone (+91) *" className="w-full input-inset rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder:text-slate-400" />
                <select className="w-full input-inset rounded-xl px-5 py-3.5 text-sm text-slate-800">
                  <option value="">Select Department *</option>
                  {SITE_CONFIG.services.map(s => <option key={s.key} value={s.title}>{s.title}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input type="date" min={new Date().toISOString().split('T')[0]} className="input-inset rounded-xl px-4 py-3.5 text-sm text-slate-800" />
                  <select className="input-inset rounded-xl px-4 py-3.5 text-sm text-slate-800">
                    <option value="">Time</option>
                    {['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <textarea placeholder="Message (optional)" rows={3} className="w-full input-inset rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 resize-none" />
                <motion.button type="submit" whileTap={{ scale: 0.97 }}
                  className="w-full btn-primary py-3.5 rounded-xl font-semibold text-sm">
                  Confirm Appointment
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-8 mb-8 text-slate-400">
            <div className="flex items-center gap-2"><ShieldCheck size={18} /><span className="text-xs font-medium">ISO 9001:2015</span></div>
            <div className="flex items-center gap-2"><Award size={18} /><span className="text-xs font-medium">Premium Quality</span></div>
            <div className="flex items-center gap-2"><Users size={18} /><span className="text-xs font-medium">NABH Certified</span></div>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Divyam Hospital Group</h4>
            <p className="text-slate-400 text-xs">Premium Healthcare • Bikaner • Rajasthan</p>
            <p className="text-slate-300 text-xs mt-2">www.divyamhospital.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
