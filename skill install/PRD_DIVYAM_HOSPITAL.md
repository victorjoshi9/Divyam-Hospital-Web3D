# 🏥 DIVYAM HOSPITAL — COMPLETE PLATFORM PRD
## Product Requirements Document v2.0
**Prepared for:** AntiGravity AI · Claude Opus 4.6 · Sonnet 4.6 · Gemini 2.5 Pro · Windsurf · Cursor  
**Domain:** divyamhospital.online  
**Stack:** TypeScript · React · Vite · Supabase · Firebase · MongoDB · Cloudflare Workers  
**Date:** 2026-05-05

---

## 📋 TABLE OF CONTENTS
1. [Project Overview](#1-project-overview)
2. [Brand & Content Identity](#2-brand--content-identity)
3. [Platform Architecture](#3-platform-architecture)
4. [Desktop Web App PRD](#4-desktop-web-app-prd)
5. [Mobile Native Web App PRD](#5-mobile-native-web-app-prd)
6. [Backend Admin Dashboard PRD](#6-backend-admin-dashboard-prd)
7. [3D & Animation System](#7-3d--animation-system)
8. [Content Migration Map](#8-content-migration-map)
9. [Database Schema](#9-database-schema)
10. [API & Integrations](#10-api--integrations)
11. [SEO & Performance](#11-seo--performance)
12. [Deployment Pipeline](#12-deployment-pipeline)
13. [Task List & Workflow](#13-task-list--workflow)

---

## 1. PROJECT OVERVIEW

### Vision
Build a world-class, **3D-first hospital digital platform** for Divyam Hospital — a premium multi-specialty hospital in Gangashahar, Bikaner. The platform comprises three interconnected products:

| Product | Tech | Purpose |
|---|---|---|
| **Desktop Web App** | React + TypeScript + Vite + Spline | Public-facing website for patient acquisition |
| **Mobile Native Web App** | React + TypeScript + Capacitor (Android-like) | Native-feel mobile app for patient engagement |
| **Admin Dashboard** | React + Supabase + MongoDB + Firebase | Hospital staff management backend |

### Core Goals
- Migrate all content from legacy HTML/CSS/JS site to modern React TypeScript
- Implement full 3D experience using Spline + Three.js
- Build CMS-driven content (all sections editable from dashboard)
- Enable appointment booking, reviews, blog, and patient portal
- Achieve 95+ Lighthouse score
- All three apps bundled as one deployable ZIP for AntiGravity installation

---

## 2. BRAND & CONTENT IDENTITY

### Hospital Details
```
Name:     Divyam Hospital
Tagline:  Multi-Specialty Healthcare | Gangashahar's Pride
Phone 1:  +91 94139 12974
Phone 2:  +91 81973 53157
Email:    info@divyamhospital.online
WhatsApp: 919413912974
Address:  10-A Mahabalipuram, Nokha Road, Gangashahar, Bikaner – 334401
Domain:   divyamhospital.online
JustDial: 4.4★ (500+ ratings)
Founded:  Est. Gangashahar, Bikaner
```

### Color System
```css
--primary:       #FF6B6B;   /* Coral Red — CTAs, highlights */
--primary-dark:  #E05555;
--teal:          #4ECDC4;   /* Teal — accents, badges */
--gold:          #FFD700;   /* Gold — premium elements */
--dark-bg:       #0A0E1A;   /* Deep navy background */
--card-bg:       #111827;
--card-border:   rgba(255,255,255,0.08);
--text-primary:  #FFFFFF;
--text-muted:    rgba(255,255,255,0.6);
--gradient-hero: linear-gradient(135deg, #FF6B6B 0%, #FFD700 50%, #4ECDC4 100%);
--gradient-card: linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1));
```

### Typography
```
Display:  "Clash Display" or "Syne" — headings, hero text
Body:     "DM Sans" — paragraphs, UI text
Mono:     "JetBrains Mono" — stats, numbers
Icon:     Lucide React + custom SVG
```

### Stats (Animated Counters)
- 5,000+ Patients Treated
- 7 Expert Specialists
- 24/7 Emergency Care
- 8 Min Avg Ambulance Response

---

## 3. PLATFORM ARCHITECTURE

```
divyam-hospital/
├── apps/
│   ├── web/              # Desktop Web App (React + Vite)
│   ├── mobile/           # Mobile Web App (React + Capacitor)
│   └── dashboard/        # Admin Dashboard (React + Supabase)
├── packages/
│   ├── ui/               # Shared component library
│   ├── config/           # Shared config (SITE_CONFIG)
│   ├── types/            # Shared TypeScript types
│   └── api/              # Shared API client
├── workers/
│   ├── rating-worker.js  # Cloudflare Worker — JustDial rating proxy
│   └── edge-functions/   # Supabase edge functions
├── public/
│   ├── spline/           # .splinecode files
│   ├── models/           # GLTF/GLB 3D models
│   └── images/
├── supabase/
│   ├── migrations/
│   └── functions/
├── INSTALL.md
├── DEPLOY.md
└── package.json          # Monorepo root (pnpm workspaces)
```

---

## 4. DESKTOP WEB APP PRD

### 4.1 Tech Stack
```
Framework:    React 18 + TypeScript 5
Build:        Vite 5
Styling:      Tailwind CSS v4 + CSS Variables
3D:           Spline (React) + Three.js (r160)
Animation:    Framer Motion 11 + GSAP 3
State:        Zustand + React Query
Forms:        React Hook Form + Zod
Routing:      React Router v6
SEO:          React Helmet Async
Deploy:       Cloudflare Pages / Vercel
```

### 4.2 Pages & Sections

#### `/` — Home Page
All sections are **CMS-driven** (editable from dashboard):

| Section ID | Component | Description |
|---|---|---|
| `#home` | `<HeroSection>` | 3D Spline scene + tagline + CTA |
| `#about` | `<AboutSection>` | Hospital story, mission, 3D building model |
| `#services` | `<ServicesSection>` | 6 specialty cards with modal detail |
| `#doctors` | `<DoctorsSection>` | Doctor cards with 3D avatar hover |
| `#facilities` | `<FacilitiesSection>` | 3D equipment showcase |
| `#stats` | `<StatsSection>` | Animated counters |
| `#why-us` | `<WhyChooseSection>` | Comparison table (generic "other hospitals") |
| `#reviews` | `<ReviewsSection>` | Testimonial carousel + live JD rating |
| `#blog` | `<BlogSection>` | Health tips blog cards |
| `#contact` | `<ContactSection>` | Map + contact form + appointment widget |

#### Additional Pages
- `/doctors/[slug]` — Doctor profile page
- `/services/[slug]` — Service detail page
- `/blog/[slug]` — Blog post page
- `/appointments` — Booking page
- `/patient-login` — Patient portal login
- `/404` — Custom error page

### 4.3 Header Component
```tsx
// Sticky glassmorphism navbar
<Header>
  <Logo>           // 🏥 Divyam Hospital + tagline
  <DesktopNav>     // Home · About · Services · Doctors · Facilities · Reviews · Contact
  <MobileMenuBtn>  // Hamburger toggle
  <EmergencyBtn>   // 🚨 Emergency Call → tel:+919413912974 (always visible, pulsing)
  <AppointmentBtn> // 📅 Book Appointment → floating form
</Header>
```

**Behavior:**
- Transparent on top, glassmorphism blur on scroll (scrollY > 50)
- Emergency button: red gradient, pulse animation, never hidden
- Active link highlighted with underline gradient
- Mobile: full-screen overlay nav with smooth slide animation

### 4.4 Footer Component
```tsx
<Footer>
  <FooterBrand>      // Logo + tagline + social links
  <FooterLinks>      // Quick links (all sections)
  <FooterServices>   // Services list
  <FooterContact>    // Address, phones, email, map embed
  <FooterRating>     // Live JustDial rating badge
  <FooterBottom>     // Copyright + Privacy + Terms
</Footer>
```

### 4.5 Floating Widgets (Always Visible)
```
Bottom-right stack:
1. 💬 WhatsApp Chat Button (green, pulsing)
2. 📞 Call Now Button (teal)
3. 📅 Book Appointment (expandable form panel)
4. ⬆️ Scroll to Top

Bottom-left:
5. JustDial Rating Float Badge (★ 4.4)
```

### 4.6 Hero Section (3D)
- **Spline scene:** 3D hospital building or DNA helix background
- Animated text: "Your Health, Our Priority" with typewriter effect
- Sub-headline: "Multi-Specialty Healthcare in Gangashahar, Bikaner"
- Two CTAs: [📅 Book Appointment] [📞 Emergency: 9413912974]
- Floating stat cards with glassmorphism (parallax on mouse move)
- Particle field background

### 4.7 Services Section
Six specialty cards with:
- 3D icon (Spline embed per card, fallback emoji)
- Title, doctor name, brief description
- On hover: 3D tilt + glow border
- On click: Full modal with services list, doctor info, timings, CTA buttons

**Specialties:**
1. 🧒 Pediatrics & Child Care — Dr. MG Choudhary (MBBS, MD) · 15+ yrs
2. 🤰 Gynecology & Obstetrics — Dr. Shahana Chandad (MBBS, MS OBG) · 12+ yrs
3. 🦷 Advanced Dentistry — Dr. Nisha Choudhary & Dr. Rahul Gahlot
4. ❤️ Cardiology & Heart Care — Specialist Cardiac Team
5. 🔬 Diagnostics & Imaging — Expert Radiology & Pathology Team
6. 🚑 24/7 Emergency Care — Dedicated Emergency Medical Team

### 4.8 Doctors Section
Doctor card grid with:
- Professional photo (placeholder 3D avatar if no photo)
- Name, qualification, specialty, experience
- Hover: 3D card flip showing availability schedule
- CTA: [Book with this Doctor]

### 4.9 Reviews Section
- Carousel with auto-scroll (4s interval)
- Live JustDial rating integration via Cloudflare Worker
- Google review link
- Star ratings with animated fill
- Patient name, initials avatar, review text, date

### 4.10 Appointment Widget
```
Floating expandable form:
- Patient Name (required)
- Phone Number (required, +91 format)
- Department (select: all 6 specialties)
- Preferred Date (date picker)
- Preferred Time (time slots)
- Message (optional)
- [Submit] → Supabase insert + WhatsApp notification
```

---

## 5. MOBILE NATIVE WEB APP PRD

### 5.1 Philosophy
**"Android App Feel, Web Technology"** — The mobile experience must feel indistinguishable from a native Kotlin Android app, using React + TypeScript + Capacitor.

### 5.2 Tech Stack
```
Framework:    React 18 + TypeScript 5
Build:        Vite 5
Mobile Shell: Capacitor 6 (Android APK buildable)
Styling:      Tailwind CSS + Material You design tokens
Navigation:   React Router v6 (history mode)
Animation:    Framer Motion (page transitions)
Haptics:      @capacitor/haptics
Storage:      @capacitor/preferences
Push:         @capacitor/push-notifications (Firebase FCM)
Deploy:       PWA (installable) + Capacitor APK
```

### 5.3 Navigation Architecture
```
Bottom Navigation Bar (Android Material 3 style):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏠 Home  |  🏥 Services  |  👨‍⚕️ Doctors  |  📋 My Health  |  👤 Profile
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each tab with:
- Active state: filled icon + label + indicator pill
- Inactive state: outline icon + no label
- Transition: shared element transitions between tabs
- Badge: notification count on "My Health" tab
```

### 5.4 Screen Inventory

#### Tab 1: Home
- Hero banner (Spline 3D, reduced for mobile)
- Quick action chips: [🚨 Emergency] [📅 Book] [💊 Medicine] [🔬 Lab]
- Specialty cards (horizontal scroll)
- Doctor spotlight (horizontal scroll)
- Live JD rating widget
- Health tips (vertical cards)

#### Tab 2: Services
- Search bar at top
- Category filter chips
- Service cards (full-width, expandable)
- Book appointment FAB (floating action button)

#### Tab 3: Doctors
- Search + filter (specialty, availability)
- Doctor card list with profile photo
- Tap → Doctor profile screen (push navigation)
- Doctor profile: bio, qualifications, schedule, reviews, [Book Now]

#### Tab 4: My Health
- Login/Register wall (if not authenticated)
- Appointment history
- Upcoming appointments with countdown
- Health records (upload/view)
- Medication reminders

#### Tab 5: Profile
- Patient profile management
- Settings (notifications, language, theme)
- Contact us
- Rate the app
- Logout

### 5.5 Mobile-Specific UX Patterns
```
- Status bar: transparent, dark icons
- Safe area insets respected
- Swipe back gesture (iOS-style)
- Pull-to-refresh on list screens
- Skeleton loading states
- Haptic feedback on CTAs
- Bottom sheet modals (not full-screen dialogs)
- Android-style back button handling
- Splash screen: Divyam Hospital logo + brand colors
- App icon: Hospital cross on gradient background
```

### 5.6 PWA Manifest
```json
{
  "name": "Divyam Hospital",
  "short_name": "Divyam",
  "theme_color": "#FF6B6B",
  "background_color": "#0A0E1A",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/",
  "icons": [/* 72, 96, 128, 144, 152, 192, 384, 512 */]
}
```

---

## 6. BACKEND ADMIN DASHBOARD PRD

### 6.1 Tech Stack
```
Framework:    React 18 + TypeScript 5
UI Library:   shadcn/ui + Radix UI
Charts:       Recharts + D3
Database:     Supabase (primary) + MongoDB (analytics)
Auth:         Supabase Auth (email + OTP)
Realtime:     Supabase Realtime
File Storage: Supabase Storage + Firebase Storage
AI:           OpenRouter API (Claude/Gemini via unified API)
Build:        Vite 5
Deploy:       Supabase hosted / Vercel
```

### 6.2 Dashboard Sections

#### 📊 Overview Dashboard
- KPI cards: Today's appointments, Total patients, Revenue, Avg rating
- Appointment trend chart (7/30/90 days)
- Department-wise patient distribution (donut chart)
- Recent activity feed (realtime)
- Quick actions panel

#### 📅 Appointments Management
- Calendar view (day/week/month)
- List view with filters (doctor, department, status, date)
- Appointment detail drawer
- Status workflow: Pending → Confirmed → Completed / Cancelled
- Bulk actions
- Export to CSV/PDF
- WhatsApp notification trigger per appointment

#### 👨‍⚕️ Doctors Management
- Doctor profiles CRUD
- Photo upload (Supabase Storage)
- Schedule management (weekly availability grid)
- Qualification/experience editor
- Doctor-specific appointment view

#### 🏥 Services Management
- Service cards CRUD (matches website services section)
- Toggle active/inactive (reflects on website instantly)
- Edit: icon, title, description, doctor, timings, service list
- Reorder services (drag & drop)

#### 🌐 Website CMS
**Full control of every frontend section:**
- Hero: headline, subtext, CTA labels/links
- About: story text, mission, values, photos
- Doctors: add/remove/edit doctor cards
- Facilities: add/edit facility items with 3D model URLs
- Why Choose Us: edit comparison points
- Blog: create/edit/publish posts (rich text editor)
- Contact: update address, phones, map embed URL
- Header nav: add/remove/reorder nav items
- Footer: edit all columns
- SEO: per-page title, description, keywords, OG image
- **Toggle any section ON/OFF** — instantly hides from frontend

#### ⭐ Reviews Management
- View all reviews (JustDial + Google + direct)
- Manual review entry
- Approve/hide reviews shown on website
- Reply to reviews
- Rating analytics

#### 📝 Blog / Health Tips
- Rich text editor (TipTap)
- Categories, tags, featured image
- SEO fields per post
- Schedule publish
- Draft / Published / Archived states

#### 📞 Inquiries & Contact
- All contact form submissions
- Status: New / In Progress / Resolved
- Reply via email (SMTP/SendGrid)
- Filter by type, date, status

#### 📊 Analytics
- Google Analytics 4 embed
- Custom event tracking (appointments, calls, WhatsApp clicks)
- Heatmaps integration (Hotjar/Microsoft Clarity)
- MongoDB aggregated analytics (custom queries)

#### ⚙️ Settings
- Hospital info editor (maps to SITE_CONFIG)
- Theme/color customization
- API key management (JustDial, Google, WhatsApp, OpenRouter)
- User management (admin accounts with roles)
- Notification settings (WhatsApp, Email, SMS templates)
- Backup & export

### 6.3 AI Assistant (OpenRouter + Gemini 2.5 Pro)
Embedded AI panel in dashboard:
```
Capabilities:
- "Summarize today's appointments"
- "Draft a WhatsApp message for patient [name]"
- "Generate a health tip blog post about [topic]"
- "Analyze patient trends this month"
- "Suggest SEO improvements for homepage"
- "Create social media post for [service]"

Provider: OpenRouter → claude-opus-4-6 / gemini-2.5-pro (switchable)
```

---

## 7. 3D & ANIMATION SYSTEM

### 7.1 Spline Integration
```typescript
// Primary 3D framework: Spline (easiest to maintain)
import Spline from '@splinetool/react-spline';

// Hero Scene
<Spline scene="https://prod.spline.design/[HOSPITAL-SCENE-ID]/scene.splinecode" />

// Service Icons (one per specialty)  
// Facilities showcase
// Anatomical models (heart, tooth, baby)
```

### 7.2 Three.js Scenes (Fallbacks + Custom)
```typescript
// Used where Spline is too heavy or needs custom logic
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';

// Particle background system
// DNA helix animation
// Hospital building flythrough (GLTF model)
// Medical equipment showcase
```

### 7.3 Spline Scenes Required
| Scene | Usage | Content |
|---|---|---|
| `hero-scene` | Hero section background | Hospital building 3D, floating crosses |
| `anatomy-heart` | Cardiology card | Beating heart 3D |
| `anatomy-tooth` | Dentistry card | Rotating tooth 3D |
| `anatomy-baby` | Pediatrics card | Baby/cradle 3D |
| `medical-equipment` | Facilities section | ECG machine, ultrasound 3D |
| `dna-helix` | About section | DNA strand animation |
| `ambulance` | Emergency card | Ambulance 3D |

### 7.4 21st.dev Components
```
Install: npx shadcn@latest add "https://21st.dev/r/[component]"

Components to use:
- Bento grid cards (services layout)
- Animated beam (connecting elements)  
- Globe (facilities/reach visualization)
- Marquee (doctor logos, certifications)
- Morphing text (hero tagline animation)
- Shimmer button (primary CTAs)
- Sparkles (premium elements)
- Magic card (doctor cards hover effect)
- Animated gradient (hero background)
- Particles (background field)
- Word rotate (alternating taglines)
- Number ticker (stats counters)
- Scroll-based reveal
- Confetti (appointment booked success)
```

### 7.5 Animation Standards
```typescript
// Page enter (Framer Motion)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Stagger children
const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// Card hover
const cardHover = {
  scale: 1.03,
  rotateX: 5,
  rotateY: 5,
  transition: { type: "spring", stiffness: 400 }
};
```

---

## 8. CONTENT MIGRATION MAP

### Old → New Section Mapping
| Old Section | Old Element | New Component | CMS Field |
|---|---|---|---|
| Header logo | `.logo-name` text | `<Logo>` | `hospitalName` |
| Header nav | `#navLinks` | `<DesktopNav>` | `navItems[]` |
| Emergency btn | `tel:+919413912974` | `<EmergencyBtn>` | `phone1` |
| Hero title | "Healing Beyond Expectations" | `hero.headline` | CMS |
| Stats | `data-target` attrs | `<StatsSection>` | `stats[]` |
| Services | `serviceData` JS object | `services` table (DB) | Supabase |
| Doctors | Inline HTML | `doctors` table (DB) | Supabase |
| Testimonials | `#testimonialsTrack` | `reviews` table (DB) | Supabase |
| Contact form | `submitContact()` | `inquiries` table (DB) | Supabase |
| Appt form | `submitAppt()` | `appointments` table (DB) | Supabase |
| JD Rating | `rating-worker.js` | Cloudflare Worker (keep) | Auto |
| Footer | Inline HTML | `<Footer>` | `footerConfig` |
| Particles | `initParticles()` | `<ParticlesBackground>` | Settings |

### Content to Preserve Exactly
```
✅ Phone numbers: 9413912974, 8197353157
✅ Email: info@divyamhospital.online
✅ Address: 10-A Mahabalipuram, Nokha Road, Gangashahar, Bikaner - 334401
✅ WhatsApp: 919413912974
✅ JustDial URL (for rating worker)
✅ Google Maps URL
✅ All 6 doctor/specialty entries with services lists
✅ All testimonials text
✅ JD Rating: 4.4 (live via worker)
✅ Stats: 5000 patients, 7 specialists, 24/7, 8 min
```

---

## 9. DATABASE SCHEMA

### Supabase Tables

```sql
-- appointments
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  phone text NOT NULL,
  department text,
  preferred_date date,
  preferred_time text,
  message text,
  status text DEFAULT 'pending', -- pending|confirmed|completed|cancelled
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- doctors
CREATE TABLE doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  specialty text NOT NULL,
  qualification text,
  experience_years int,
  bio text,
  photo_url text,
  schedule jsonb, -- {mon: ["9:00","10:00",...], tue: [...]}
  is_active boolean DEFAULT true,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- services
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL, -- pediatrics, gynecology, etc.
  icon text,
  title text NOT NULL,
  description text,
  doctor_id uuid REFERENCES doctors(id),
  services_list jsonb, -- string[]
  timings text,
  spline_url text,
  is_active boolean DEFAULT true,
  display_order int DEFAULT 0
);

-- reviews
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  rating int CHECK (rating BETWEEN 1 AND 5),
  review_text text,
  source text DEFAULT 'direct', -- direct|justdial|google
  is_approved boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- blog_posts
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  featured_image text,
  category text,
  tags text[],
  status text DEFAULT 'draft', -- draft|published|archived
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now()
);

-- inquiries
CREATE TABLE inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  message text,
  status text DEFAULT 'new', -- new|in_progress|resolved
  created_at timestamptz DEFAULT now()
);

-- site_config
CREATE TABLE site_config (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- patients (for patient portal)
CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text,
  phone text UNIQUE,
  date_of_birth date,
  gender text,
  blood_group text,
  address text,
  emergency_contact text,
  created_at timestamptz DEFAULT now()
);
```

---

## 10. API & INTEGRATIONS

### 10.1 External APIs
| Service | Purpose | Config |
|---|---|---|
| Supabase | Primary DB, Auth, Realtime, Storage | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
| Firebase | Push notifications, FCM | `VITE_FIREBASE_CONFIG` |
| MongoDB Atlas | Analytics, logs | `MONGODB_URI` |
| OpenRouter | AI assistant in dashboard | `OPENROUTER_API_KEY` |
| Cloudflare Workers | JD rating proxy, edge cache | `CF_WORKER_URL` |
| WhatsApp Business API | Appointment notifications | `WA_API_KEY` |
| Google Maps Embed | Contact section map | `GOOGLE_MAPS_EMBED_URL` |
| JustDial | Live rating fetch | Via Cloudflare Worker |

### 10.2 WhatsApp Notification Template
```
On appointment submission:
"Hello {patient_name} 👋
Your appointment at *Divyam Hospital* has been received!

📅 Date: {date}
🕐 Time: {time}
🏥 Department: {department}

Our team will confirm shortly.
For urgent care: 9413912974"
```

### 10.3 Environment Variables
```env
# .env.local (desktop web + mobile)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_FIREBASE_CONFIG={}
VITE_CF_RATING_WORKER=https://jd-rating.xxx.workers.dev
VITE_GOOGLE_MAPS_KEY=xxx
VITE_APP_ENV=production

# .env.local (dashboard only)
VITE_OPENROUTER_API_KEY=xxx
VITE_MONGODB_URI=mongodb+srv://...
VITE_WHATSAPP_API_KEY=xxx
VITE_SENDGRID_KEY=xxx
```

---

## 11. SEO & PERFORMANCE

### 11.1 SEO Requirements
```html
<!-- Per-page meta (React Helmet) -->
<title>Divyam Hospital | Best Multi-Specialty Hospital in Bikaner, Gangashahar</title>
<meta name="description" content="Divyam Hospital offers expert pediatrics, gynecology, dentistry, cardiology, diagnostics & 24/7 emergency care in Gangashahar, Bikaner. 5000+ satisfied patients. Book appointment: 9413912974" />
<meta name="keywords" content="hospital Bikaner, hospital Gangashahar, pediatrics Bikaner, gynecology Bikaner, dentist Bikaner, 24/7 emergency Bikaner, Divyam Hospital" />

<!-- Schema.org -->
<script type="application/ld+json">
{
  "@type": "Hospital",
  "name": "Divyam Hospital",
  "telephone": "+919413912974",
  "address": { ... },
  "aggregateRating": { "ratingValue": "4.4", "ratingCount": "500" }
}
</script>
```

### 11.2 Performance Budget
- FCP (First Contentful Paint): < 1.2s
- LCP (Largest Contentful Paint): < 2.5s
- CLS: < 0.1
- TTI: < 3.5s
- Lighthouse score: ≥ 95

### 11.3 Performance Strategies
- Spline scenes: lazy loaded, skeleton placeholder
- Images: WebP, lazy loading, srcset
- Fonts: preloaded, font-display: swap
- Code splitting: per route
- Service Worker: offline capability
- CDN: Cloudflare Pages edge deployment

---

## 12. DEPLOYMENT PIPELINE

```
Local Development:
pnpm dev                    # All apps in parallel

Build:
pnpm build:web              # Desktop app → dist/web
pnpm build:mobile           # Mobile app → dist/mobile
pnpm build:dashboard        # Dashboard → dist/dashboard

Mobile APK:
cd apps/mobile && npx cap sync android
npx cap open android        # Opens Android Studio

Deploy:
./deploy.sh                 # Builds + deploys all to Cloudflare Pages + Supabase
```

---

## 13. TASK LIST & WORKFLOW

### Phase 1: Foundation (Day 1-2)
- [ ] Initialize monorepo with pnpm workspaces
- [ ] Setup Supabase project + run migrations
- [ ] Configure Firebase project (FCM)
- [ ] Create shared `packages/` (ui, config, types, api)
- [ ] Deploy Cloudflare Worker (rating proxy)
- [ ] Seed database with all existing content

### Phase 2: Desktop Web App (Day 3-5)
- [ ] Scaffold React + Vite + TypeScript + Tailwind
- [ ] Build Header + Footer components
- [ ] Implement all 10 home page sections
- [ ] Add Spline 3D hero scene
- [ ] Integrate 21st.dev components
- [ ] Appointment booking widget + Supabase integration
- [ ] Contact form + WhatsApp notification
- [ ] SEO + Schema.org markup
- [ ] Lighthouse optimization

### Phase 3: Mobile App (Day 6-8)
- [ ] Scaffold mobile app
- [ ] Build bottom navigation (Android Material 3)
- [ ] Implement all 5 tabs
- [ ] Patient auth (Supabase Auth OTP)
- [ ] PWA manifest + service worker
- [ ] Capacitor setup for APK build
- [ ] Push notifications (Firebase FCM)

### Phase 4: Admin Dashboard (Day 9-12)
- [ ] Build dashboard shell + sidebar nav
- [ ] Overview KPI cards + charts
- [ ] Appointments management (CRUD + calendar)
- [ ] Doctors management (CRUD + photo upload)
- [ ] Website CMS (all sections)
- [ ] Reviews moderation
- [ ] Blog editor (TipTap)
- [ ] AI assistant panel (OpenRouter)
- [ ] Settings panel

### Phase 5: Integration & QA (Day 13-14)
- [ ] End-to-end testing (Cypress/Playwright)
- [ ] Mobile responsive testing
- [ ] Performance audit (Lighthouse)
- [ ] SEO audit (Screaming Frog)
- [ ] Security audit (Supabase RLS policies)
- [ ] Create INSTALL.md + DEPLOY.md
- [ ] Package as ZIP for AntiGravity deployment

---

*PRD Version 2.0 | Divyam Hospital | divyamhospital.online*
*For AntiGravity auto-installation with Claude Opus 4.6*
