---
name: divyam-hospital-master
version: 2.0.0
description: >
  AntiGravity skill for building the complete Divyam Hospital platform.
  Triggers on any task involving divyamhospital.online, Divyam Hospital,
  hospital website migration, or the three-app platform (desktop web,
  mobile native web app, admin dashboard). Handles full-stack TypeScript,
  React, Supabase, 3D Spline integration, and content migration from
  legacy HTML/JS site.
trigger_keywords:
  - divyam hospital
  - divyamhospital.online
  - hospital website
  - migrate hospital
  - desktop web app hospital
  - mobile hospital app
  - hospital dashboard
author: AntiGravity Auto-Installer
license: MIT
---

# DIVYAM HOSPITAL — ANTIGRAVITY MASTER SKILL

## OVERVIEW

This skill instructs AntiGravity to build the complete **Divyam Hospital** digital platform:

1. **Desktop Web App** — Public website (React + TypeScript + Spline 3D)
2. **Mobile Native Web App** — Android-feel PWA (React + Capacitor)
3. **Admin Dashboard** — Hospital management backend (React + Supabase)

All three apps share a monorepo with common packages.

---

## MANDATORY FIRST STEPS (READ BEFORE ANY TASK)

```
STEP 0: Load the PRD
Read PRD_DIVYAM_HOSPITAL.md completely before writing any code.
The PRD contains all content, design tokens, DB schema, and architecture decisions.

STEP 1: Load brand config
const BRAND = require('./packages/config/site-config.ts');
// hospitalName, colors, phones, address, stats, etc.

STEP 2: Check existing files
List current directory structure before creating files.
Never overwrite existing migrations or .env files.

STEP 3: Confirm task scope
State which phase/section you are building before starting.
```

---

## MONOREPO STRUCTURE

```
divyam-hospital/
├── apps/
│   ├── web/                 # Desktop Web App
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── layout/  Header.tsx, Footer.tsx, Navigation.tsx
│   │   │   │   ├── sections/ Hero, About, Services, Doctors, Stats,
│   │   │   │   │            WhyChoose, Reviews, Blog, Contact
│   │   │   │   ├── 3d/      SplineScene.tsx, ThreeCanvas.tsx, Particles.tsx
│   │   │   │   ├── widgets/ AppointmentWidget.tsx, WhatsAppBtn.tsx,
│   │   │   │   │            JDRatingBadge.tsx, ScrollTop.tsx
│   │   │   │   └── ui/      (imported from packages/ui)
│   │   │   ├── pages/       Home, Doctor, Service, Blog, Appointment
│   │   │   ├── hooks/       useScrollSpy, useAppointment, useReviews
│   │   │   ├── lib/         supabase.ts, api.ts, utils.ts
│   │   │   └── styles/      globals.css, variables.css
│   │   ├── index.html
│   │   └── vite.config.ts
│   │
│   ├── mobile/              # Mobile Native Web App
│   │   ├── src/
│   │   │   ├── navigation/  BottomNav.tsx, TabBar.tsx
│   │   │   ├── screens/     Home, Services, Doctors, MyHealth, Profile
│   │   │   ├── components/  AppHeader.tsx, SearchBar.tsx, FAB.tsx
│   │   │   └── native/      haptics.ts, storage.ts, notifications.ts
│   │   └── capacitor.config.ts
│   │
│   └── dashboard/           # Admin Dashboard
│       ├── src/
│       │   ├── layout/      DashSidebar.tsx, DashHeader.tsx
│       │   ├── pages/       Overview, Appointments, Doctors, Services,
│       │   │               CMS, Reviews, Blog, Analytics, Settings
│       │   └── components/  KPICard.tsx, DataTable.tsx, Charts, AIPanel
│       └── vite.config.ts
│
├── packages/
│   ├── config/
│   │   └── site-config.ts   # Single source of truth for brand config
│   ├── types/
│   │   └── index.ts         # Shared TypeScript interfaces
│   ├── ui/
│   │   └── components/      # Shared UI components
│   └── api/
│       └── client.ts        # Supabase + API client
│
├── supabase/
│   └── migrations/          # SQL migration files
│
├── workers/
│   └── rating-worker.js     # Cloudflare Worker (from old site)
│
└── package.json             # pnpm workspaces root
```

---

## SHARED SITE CONFIG (packages/config/site-config.ts)

```typescript
export const SITE_CONFIG = {
  hospitalName: "Divyam Hospital",
  tagline: "Multi-Specialty Healthcare",
  subTagline: "Gangashahar's Pride",
  phone1: "9413912974",
  phone2: "8197353157",
  phoneFormatted: "+91 94139 12974",
  email: "info@divyamhospital.online",
  address: "10-A Mahabalipuram, Nokha Road, Gangashahar, Bikaner – 334401",
  whatsapp: "919413912974",
  domain: "divyamhospital.online",
  justdialUrl: "https://www.justdial.com/Bikaner/Divyam-Hospital-Divyam-Hospital-Gangashahar/9999PX151-X151-240713111612-H9B1_BZDET",
  googleUrl: "https://share.google/1Xzd4bQzfyhGDRlgs",
  
  colors: {
    primary: "#FF6B6B",
    primaryDark: "#E05555",
    teal: "#4ECDC4",
    gold: "#FFD700",
    darkBg: "#0A0E1A",
    cardBg: "#111827",
  },
  
  stats: [
    { value: 5000, suffix: "+", label: "Patients Treated" },
    { value: 7, suffix: "", label: "Expert Specialists" },
    { value: 24, suffix: "/7", label: "Emergency Care" },
    { value: 8, suffix: " Min", label: "Ambulance Response" },
  ],
  
  services: [
    {
      key: "pediatrics",
      icon: "🧒",
      title: "Pediatrics & Child Care",
      doctor: "Dr. MG Choudhary",
      qualification: "MBBS, MD (Pediatrics)",
      experience: "15+ yrs",
      description: "Comprehensive child healthcare from newborn to teenager.",
      servicesList: ["Newborn Care & NICU","Vaccination Programs","Growth & Development Monitoring","Pediatric Emergencies","Child Nutrition Counseling","Fever & Infection Management"],
      timings: "Mon–Sat: 9AM–8PM | Emergency: 24/7",
      splineUrl: null, // replace with Spline URL
    },
    {
      key: "gynecology",
      icon: "🤰",
      title: "Gynecology & Obstetrics",
      doctor: "Dr. Shahana Chandad",
      qualification: "MBBS, MS (OBG)",
      experience: "12+ yrs",
      description: "Complete women's healthcare with experienced gynecologists.",
      servicesList: ["Prenatal & Antenatal Care","Normal & Cesarean Delivery","High-Risk Pregnancy Management","Fertility Consultations","Gynecological Surgeries","Family Planning"],
      timings: "Mon–Sat: 10AM–6PM | Emergency: 24/7",
      splineUrl: null,
    },
    {
      key: "dentistry",
      icon: "🦷",
      title: "Advanced Dentistry",
      doctor: "Dr. Nisha Choudhary & Dr. Rahul Gahlot",
      qualification: "BDS, MDS",
      experience: "10+ yrs",
      description: "Painless, modern dentistry with the latest equipment.",
      servicesList: ["Painless Root Canal Treatment","Dental Implants","Orthodontics & Braces","Cosmetic Dentistry","Teeth Whitening","Wisdom Tooth Extraction"],
      timings: "Mon–Sat: 9AM–8PM | By Appointment",
      splineUrl: null,
    },
    {
      key: "cardiology",
      icon: "❤️",
      title: "Cardiology & Heart Care",
      doctor: "Specialist Cardiac Team",
      qualification: "MD (Cardiology)",
      experience: "Expert team",
      description: "Comprehensive cardiac care with modern diagnostic tools.",
      servicesList: ["ECG & Echo Cardiography","Holter Monitoring","Stress Test (TMT)","Cardiac Consultations","Hypertension Management","Heart Failure Care"],
      timings: "Mon–Sat: 10AM–7PM | Emergency: 24/7",
      splineUrl: null,
    },
    {
      key: "diagnostics",
      icon: "🔬",
      title: "Diagnostics & Imaging",
      doctor: "Expert Radiology & Pathology Team",
      qualification: "DMRD, MD",
      experience: "In-house lab",
      description: "State-of-the-art diagnostic centre with same-day reports.",
      servicesList: ["Ultrasound & Sonography","X-Ray (Digital)","CT Scan","Full Blood Count & Chemistry","Urine & Stool Analysis","Culture & Sensitivity Tests"],
      timings: "Mon–Sat: 8AM–9PM | Emergency: 24/7",
      splineUrl: null,
    },
    {
      key: "emergency",
      icon: "🚑",
      title: "24/7 Emergency Care",
      doctor: "Dedicated Emergency Medical Team",
      qualification: "Emergency Medicine",
      experience: "Round-the-clock",
      description: "Round-the-clock emergency services. 8-minute avg ambulance response.",
      servicesList: ["Trauma & Accident Care","Cardiac Emergencies","Stroke Management","Pediatric Emergencies","Ambulance Services","Critical Care ICU"],
      timings: "OPEN 24 HOURS • 7 DAYS A WEEK",
      splineUrl: null,
    },
  ],
  
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Doctors", href: "#doctors" },
    { label: "Facilities", href: "#facilities" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],
  
  testimonials: [
    { name: "Ravi Sharma", rating: 5, text: "Excellent care for my child. Dr. Choudhary is very knowledgeable and kind." },
    { name: "Priya Singh", rating: 5, text: "Safe delivery experience. The staff was supportive throughout." },
    { name: "Mahesh Kumar", rating: 5, text: "Best dental treatment in Bikaner. Painless and professional." },
    { name: "Sunita Devi", rating: 4, text: "Good facilities and experienced doctors. Highly recommended." },
    { name: "Anil Gupta", rating: 5, text: "Emergency team responded in minutes. Saved my father's life." },
  ],
} as const;
```

---

## DESIGN SYSTEM RULES

### CSS Variables (globals.css)
```css
:root {
  --primary: #FF6B6B;
  --primary-dark: #E05555;
  --teal: #4ECDC4;
  --gold: #FFD700;
  --dark-bg: #0A0E1A;
  --card-bg: #111827;
  --card-border: rgba(255,255,255,0.08);
  --text-primary: #FFFFFF;
  --text-muted: rgba(255,255,255,0.65);
  --gradient-hero: linear-gradient(135deg, #FF6B6B 0%, #FFD700 50%, #4ECDC4 100%);
  --gradient-card: linear-gradient(135deg, rgba(255,107,107,0.08), rgba(78,205,196,0.08));
  --shadow-card: 0 8px 32px rgba(0,0,0,0.4);
  --blur-glass: blur(20px);
  --border-glass: 1px solid rgba(255,255,255,0.1);
}
```

### Component Patterns

#### Card Base
```tsx
<div className="relative bg-[var(--card-bg)] border border-[var(--card-border)] 
  rounded-2xl p-6 backdrop-blur-sm overflow-hidden
  hover:border-[rgba(255,107,107,0.4)] transition-all duration-300
  hover:shadow-[0_8px_32px_rgba(255,107,107,0.15)]">
```

#### Section Wrapper
```tsx
<section id={id} className="relative py-20 px-4 overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <SectionHeader title={title} subtitle={subtitle} />
    {children}
  </div>
</section>
```

#### Section Header
```tsx
<div className="text-center mb-16">
  <span className="text-[var(--teal)] text-sm font-semibold tracking-widest uppercase">
    {badge}
  </span>
  <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4 bg-gradient-to-r 
    from-white to-[rgba(255,255,255,0.7)] bg-clip-text text-transparent">
    {title}
  </h2>
  <p className="text-[var(--text-muted)] max-w-2xl mx-auto">{subtitle}</p>
</div>
```

#### Primary Button
```tsx
<button className="px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--gold)]
  text-white font-bold rounded-full hover:scale-105 hover:shadow-[0_8px_24px_rgba(255,107,107,0.4)]
  transition-all duration-300 active:scale-95">
  {children}
</button>
```

#### Emergency Button (always pulsing)
```tsx
<a href="tel:+919413912974" className="inline-flex items-center gap-2 px-5 py-2.5
  bg-red-600 text-white font-bold rounded-full animate-pulse
  hover:bg-red-500 transition-colors">
  🚨 Emergency
</a>
```

---

## 3D INTEGRATION RULES

### Spline Usage
```tsx
import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';

// Always wrap in Suspense with skeleton fallback
function SplineScene({ url, className }: { url: string, className?: string }) {
  return (
    <Suspense fallback={<SplineSkeleton />}>
      <Spline scene={url} className={className} />
    </Suspense>
  );
}

// Skeleton placeholder during load
function SplineSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[var(--card-bg)] to-[var(--dark-bg)] 
      rounded-2xl animate-pulse flex items-center justify-center">
      <div className="text-6xl opacity-20">🏥</div>
    </div>
  );
}
```

### Three.js Canvas
```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

// Standard canvas setup
<Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} color="#FF6B6B" />
  <pointLight position={[-10, -10, -10]} color="#4ECDC4" />
  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
  <Float speed={2} rotationIntensity={0.5}>
    {/* 3D object */}
  </Float>
</Canvas>
```

---

## MOBILE BOTTOM NAV SPEC

```tsx
// Bottom Navigation — Android Material 3 style
const BOTTOM_TABS = [
  { id: 'home',     icon: Home,    label: 'Home',     path: '/' },
  { id: 'services', icon: Grid,    label: 'Services', path: '/services' },
  { id: 'doctors',  icon: Users,   label: 'Doctors',  path: '/doctors' },
  { id: 'health',   icon: Heart,   label: 'My Health',path: '/my-health' },
  { id: 'profile',  icon: User,    label: 'Profile',  path: '/profile' },
];

// Styling rules:
// - Background: rgba(17,24,39,0.95) backdrop-blur-xl
// - Active: filled icon + colored pill indicator + label
// - Inactive: outline icon only (no label)
// - Height: 64px + safe area bottom
// - Transition: spring animation on tab change
// - Active color: var(--primary) #FF6B6B
```

---

## SUPABASE RULES

```typescript
// Always use Row Level Security
// Default: authenticated users can read, only service_role can write
// Exception: appointments + inquiries — public can insert

// Client setup (packages/api/client.ts)
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Always handle loading, error, and empty states
// Use React Query for data fetching with caching
// Enable Realtime only on appointments table (dashboard uses live updates)
```

---

## INSTALL SEQUENCE (Auto-Executed by AntiGravity)

```bash
# 1. Initialize monorepo
pnpm init
pnpm add -w -D typescript vite @types/node

# 2. Create workspace packages
mkdir -p apps/web apps/mobile apps/dashboard packages/{config,types,ui,api}

# 3. Install dependencies per app
cd apps/web && pnpm add react react-dom react-router-dom framer-motion \
  @splinetool/react-spline @react-three/fiber @react-three/drei three \
  @supabase/supabase-js @tanstack/react-query react-hook-form zod \
  react-helmet-async lucide-react tailwindcss clsx

cd apps/mobile && pnpm add @capacitor/core @capacitor/cli @capacitor/app \
  @capacitor/haptics @capacitor/push-notifications @capacitor/preferences

cd apps/dashboard && pnpm add @supabase/supabase-js recharts \
  @tiptap/react @tiptap/starter-kit shadcn-ui radix-ui

# 4. Run DB migrations
supabase db push

# 5. Seed initial data from SITE_CONFIG
pnpm run seed

# 6. Start development
pnpm dev
```

---

## QUALITY GATES

Before marking any task complete:
- [ ] TypeScript: zero errors (`pnpm tsc --noEmit`)
- [ ] Mobile: tested at 375px, 390px, 414px widths
- [ ] 3D scenes: skeleton shown during load
- [ ] All CTAs: correct phone/WA links from SITE_CONFIG
- [ ] Forms: validation with zod, error messages shown
- [ ] Supabase: RLS policies applied to all tables
- [ ] Lighthouse: run audit, score ≥ 90
- [ ] Emergency button: visible on all breakpoints
