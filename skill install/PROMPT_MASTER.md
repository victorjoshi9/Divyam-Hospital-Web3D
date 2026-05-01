# 🚀 ANTIGRAVITY MASTER PROMPT — DIVYAM HOSPITAL PLATFORM
## Send this entire file as your first message to AntiGravity with Claude Opus 4.6

---

## INSTRUCTION TO ANTIGRAVITY

You are AntiGravity Claude Opus 4.6. I am sending you a complete project bundle for **Divyam Hospital** (divyamhospital.online). 

**DO NOT ASK ANY QUESTIONS. Execute the full workflow automatically.**

Read all attached skill files and the PRD, then build the complete platform from scratch in my open project folder.

---

## ATTACHED SKILLS (Install these first)
1. `SKILL_ANTIGRAVITY_MASTER.md` — Master project skill (READ THIS FIRST)
2. `SKILL_SPLINE_3D.md` — 3D scene integration
3. `SKILL_21STDEV.md` — Premium UI components

---

## WHAT TO BUILD

Build THREE interconnected apps in a **pnpm monorepo**:

### App 1: Desktop Web App (`apps/web/`)
A premium 3D-first hospital website with:
- Dark theme (#0A0E1A background)
- Spline 3D hero section (hospital scene or DNA helix)
- 21st.dev magic UI components throughout
- Framer Motion page animations
- All 10 homepage sections (Hero, About, Services, Doctors, Stats, WhyChoose, Reviews, Blog, Contact)
- Sticky glassmorphism header with emergency button (always pulsing)
- Floating widgets: WhatsApp, Call, Book Appointment, JD Rating badge
- Appointment booking form → Supabase
- Contact form → Supabase + WhatsApp notification
- Full SEO (React Helmet + Schema.org JSON-LD)
- Lighthouse score ≥ 95

### App 2: Mobile Native Web App (`apps/mobile/`)
An Android-feel PWA that looks like a Kotlin native app:
- Bottom navigation bar (Material 3, 5 tabs)
- Page transitions (shared element style)
- Pull to refresh
- Haptic feedback on buttons
- Safe area insets (notch/gesture bar aware)
- PWA installable (manifest + service worker)
- Capacitor setup ready for APK build
- Patient auth (Supabase OTP login)
- Appointment history, upcoming appointments
- Smooth Android-style animations throughout

### App 3: Admin Dashboard (`apps/dashboard/`)
Full hospital management backend:
- Supabase Auth (admin login)
- Overview KPIs + charts (Recharts)
- Appointments calendar + CRUD
- Doctors CRUD + photo upload
- Website CMS (edit ALL frontend sections from dashboard)
- Reviews moderation
- Blog post editor (TipTap rich text)
- AI assistant panel (OpenRouter → Claude/Gemini)
- Settings + site config editor
- Export appointments to PDF/CSV

---

## HOSPITAL CONTENT (Use exactly as provided)

```
Hospital Name:  Divyam Hospital
Tagline:        Multi-Specialty Healthcare | Gangashahar's Pride
Phone 1:        +91 94139 12974 (emergency)
Phone 2:        +91 81973 53157
Email:          info@divyamhospital.online
WhatsApp:       919413912974
Address:        10-A Mahabalipuram, Nokha Road, Gangashahar, Bikaner – 334401
Domain:         divyamhospital.online
JustDial:       4.4★ (500+ ratings)
Stats:          5000+ patients | 7 specialists | 24/7 emergency | 8 min ambulance
```

**Header Navigation:** Home · About · Services · Doctors · Facilities · Reviews · Contact + 🚨 Emergency Call button

**6 Specialties:**
1. 🧒 Pediatrics — Dr. MG Choudhary (MBBS MD, 15+ yrs)
   Services: Newborn Care, NICU, Vaccination, Growth Monitoring, Pediatric Emergency, Nutrition Counseling
   Hours: Mon–Sat 9AM–8PM | Emergency 24/7

2. 🤰 Gynecology & Obstetrics — Dr. Shahana Chandad (MBBS MS OBG, 12+ yrs)
   Services: Prenatal Care, Normal/Cesarean Delivery, High-Risk Pregnancy, Fertility, Gynecological Surgery, Family Planning
   Hours: Mon–Sat 10AM–6PM | Emergency 24/7

3. 🦷 Advanced Dentistry — Dr. Nisha Choudhary & Dr. Rahul Gahlot
   Services: Root Canal, Implants, Orthodontics, Braces, Cosmetic, Teeth Whitening, Wisdom Tooth
   Hours: Mon–Sat 9AM–8PM | By Appointment

4. ❤️ Cardiology — Specialist Cardiac Team
   Services: ECG, Echo, Holter Monitoring, TMT Stress Test, Cardiac Consult, Hypertension, Heart Failure
   Hours: Mon–Sat 10AM–7PM | Emergency 24/7

5. 🔬 Diagnostics & Imaging — Expert Radiology & Pathology Team
   Services: Ultrasound, X-Ray Digital, CT Scan, Blood Tests, Urine/Stool, Culture & Sensitivity
   Hours: Mon–Sat 8AM–9PM | Emergency 24/7

6. 🚑 24/7 Emergency — Dedicated Emergency Medical Team
   Services: Trauma & Accident, Cardiac Emergency, Stroke, Pediatric Emergency, Ambulance, ICU
   Hours: OPEN 24 HOURS · 7 DAYS A WEEK

**"Why Choose Us" section:** Compare against generic "Other Hospitals" — DO NOT name specific competitors.
Points: 24/7 availability | Modern equipment | Experienced specialists | Quick ambulance response | Affordable pricing | Compassionate care | Bilingual staff (Hindi/English)

**Testimonials (use these):**
- Ravi Sharma ★★★★★ — "Excellent care for my child. Dr. Choudhary is very knowledgeable and kind."
- Priya Singh ★★★★★ — "Safe delivery experience. The staff was incredibly supportive throughout my pregnancy."
- Mahesh Kumar ★★★★★ — "Best dental treatment in Bikaner. Completely painless and very professional."
- Sunita Devi ★★★★ — "Good facilities and experienced doctors. Highly recommended to all families."
- Anil Gupta ★★★★★ — "Emergency team responded in minutes. Truly saved my father's life."

**Health Tips Blog (create 3 starter posts):**
1. "5 Warning Signs You Should Visit a Cardiologist" — category: Heart Health
2. "When Should You Take Your Child to a Pediatrician?" — category: Child Health  
3. "Complete Guide to a Healthy Pregnancy" — category: Women's Health

---

## TECH STACK (Exact versions)

```json
{
  "react": "^18.3.1",
  "typescript": "^5.5.3",
  "vite": "^5.4.1",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^11.3.0",
  "@splinetool/react-spline": "^4.0.0",
  "@react-three/fiber": "^8.17.0",
  "@react-three/drei": "^9.108.0",
  "three": "^0.167.0",
  "@supabase/supabase-js": "^2.45.0",
  "@tanstack/react-query": "^5.52.0",
  "react-router-dom": "^6.26.0",
  "react-hook-form": "^7.53.0",
  "zod": "^3.23.8",
  "lucide-react": "^0.436.0",
  "recharts": "^2.12.7",
  "@capacitor/core": "^6.1.0",
  "gsap": "^3.12.5",
  "canvas-confetti": "^1.9.3"
}
```

---

## DATABASE (Run these Supabase migrations first)

```sql
-- Run in Supabase SQL editor in this order:

-- 1. Services
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  icon text, title text NOT NULL, description text,
  doctor_name text, qualification text, experience text,
  services_list jsonb, timings text, spline_url text,
  is_active boolean DEFAULT true, display_order int DEFAULT 0
);

-- 2. Doctors  
CREATE TABLE doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, slug text UNIQUE NOT NULL,
  specialty text, qualification text, experience_years int,
  bio text, photo_url text, schedule jsonb,
  is_active boolean DEFAULT true, display_order int DEFAULT 0
);

-- 3. Appointments
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL, phone text NOT NULL,
  department text, preferred_date date, preferred_time text,
  message text, status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now()
);
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can read" ON appointments FOR SELECT USING (auth.role() = 'authenticated');

-- 4. Reviews
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL, rating int CHECK (rating BETWEEN 1 AND 5),
  review_text text, source text DEFAULT 'direct',
  is_approved boolean DEFAULT true, is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 5. Blog Posts
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, slug text UNIQUE NOT NULL, excerpt text,
  content text, featured_image text, category text, tags text[],
  status text DEFAULT 'published', published_at timestamptz DEFAULT now(),
  seo_title text, seo_description text, created_at timestamptz DEFAULT now()
);

-- 6. Inquiries
CREATE TABLE inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, phone text, email text, message text,
  status text DEFAULT 'new', created_at timestamptz DEFAULT now()
);
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert" ON inquiries FOR INSERT WITH CHECK (true);

-- 7. Site Config
CREATE TABLE site_config (key text PRIMARY KEY, value jsonb NOT NULL, updated_at timestamptz DEFAULT now());

-- SEED DATA
INSERT INTO services (key, icon, title, description, doctor_name, qualification, experience, services_list, timings, display_order) VALUES
('pediatrics','🧒','Pediatrics & Child Care','Comprehensive child healthcare from newborn to teenager.','Dr. MG Choudhary','MBBS, MD (Pediatrics)','15+ yrs','["Newborn Care & NICU","Vaccination Programs","Growth & Development Monitoring","Pediatric Emergencies","Child Nutrition Counseling","Fever & Infection Management"]','Mon–Sat: 9AM–8PM | Emergency: 24/7',1),
('gynecology','🤰','Gynecology & Obstetrics','Complete women''s healthcare with experienced gynecologists.','Dr. Shahana Chandad','MBBS, MS (OBG)','12+ yrs','["Prenatal & Antenatal Care","Normal & Cesarean Delivery","High-Risk Pregnancy Management","Fertility Consultations","Gynecological Surgeries","Family Planning"]','Mon–Sat: 10AM–6PM | Emergency: 24/7',2),
('dentistry','🦷','Advanced Dentistry','Painless, modern dentistry with latest equipment.','Dr. Nisha Choudhary & Dr. Rahul Gahlot','BDS, MDS','10+ yrs','["Painless Root Canal Treatment","Dental Implants","Orthodontics & Braces","Cosmetic Dentistry","Teeth Whitening","Wisdom Tooth Extraction"]','Mon–Sat: 9AM–8PM | By Appointment',3),
('cardiology','❤️','Cardiology & Heart Care','Comprehensive cardiac care with modern diagnostic tools.','Specialist Cardiac Team','MD (Cardiology)','Expert team','["ECG & Echo Cardiography","Holter Monitoring","Stress Test (TMT)","Cardiac Consultations","Hypertension Management","Heart Failure Care"]','Mon–Sat: 10AM–7PM | Emergency: 24/7',4),
('diagnostics','🔬','Diagnostics & Imaging','State-of-the-art diagnostic centre with same-day reports.','Expert Radiology & Pathology Team','DMRD, MD','In-house lab','["Ultrasound & Sonography","X-Ray (Digital)","CT Scan","Full Blood Count & Chemistry","Urine & Stool Analysis","Culture & Sensitivity Tests"]','Mon–Sat: 8AM–9PM | Emergency: 24/7',5),
('emergency','🚑','24/7 Emergency Care','Round-the-clock emergency. 8-minute average ambulance response.','Dedicated Emergency Medical Team','Emergency Medicine','24/7','["Trauma & Accident Care","Cardiac Emergencies","Stroke Management","Pediatric Emergencies","Ambulance Services","Critical Care ICU"]','OPEN 24 HOURS • 7 DAYS A WEEK',6);

INSERT INTO reviews (patient_name, rating, review_text, is_approved, is_featured) VALUES
('Ravi Sharma', 5, 'Excellent care for my child. Dr. Choudhary is very knowledgeable and kind.', true, true),
('Priya Singh', 5, 'Safe delivery experience. The staff was incredibly supportive throughout my pregnancy.', true, true),
('Mahesh Kumar', 5, 'Best dental treatment in Bikaner. Completely painless and very professional.', true, true),
('Sunita Devi', 4, 'Good facilities and experienced doctors. Highly recommended to all families.', true, true),
('Anil Gupta', 5, 'Emergency team responded in minutes. Truly saved my father''s life.', true, true);
```

---

## AUTO WORKFLOW (Execute in this exact order)

```
PHASE 1 — FOUNDATION
□ Create monorepo structure (pnpm workspaces)
□ Create packages/config/site-config.ts with ALL brand data
□ Create packages/types/index.ts with all TypeScript interfaces
□ Create packages/api/client.ts (Supabase client)
□ Create shared packages/ui/ components
□ Run DB migrations (provided above)
□ Seed initial data
□ Deploy/update Cloudflare Worker (copy from workers/rating-worker.js, update WORKER_URL)
□ Create .env.example for all three apps

PHASE 2 — DESKTOP WEB APP
□ Scaffold apps/web/ with Vite + React + TypeScript + Tailwind
□ Install all dependencies (see tech stack above)
□ Install 21st.dev components via shadcn CLI
□ Build globals.css with all CSS variables
□ Build Header.tsx (glassmorphism, sticky, emergency btn)
□ Build Footer.tsx (4-column, brand info, JD rating)
□ Build HeroSection.tsx (Spline + MorphingText + ShimmerButtons + Particles)
□ Build AboutSection.tsx (story + DNA helix 3D + stats)
□ Build ServicesSection.tsx (BentoGrid + MagicCard + modal)
□ Build DoctorsSection.tsx (cards + 3D hover)
□ Build StatsSection.tsx (NumberTicker with Sparkles)
□ Build WhyChooseSection.tsx (comparison table, no competitor names)
□ Build ReviewsSection.tsx (carousel + live JD rating)
□ Build BlogSection.tsx (3 health tip cards)
□ Build ContactSection.tsx (form + map embed + address)
□ Build AppointmentWidget.tsx (floating form → Supabase)
□ Build WhatsAppBtn.tsx (green floating button)
□ Build JDRatingBadge.tsx (float bottom-left, live rating)
□ Implement React Router pages
□ Add React Helmet SEO + Schema.org JSON-LD
□ Run Lighthouse audit, fix to ≥ 90

PHASE 3 — MOBILE APP
□ Scaffold apps/mobile/ with Vite + React + TypeScript
□ Copy shared packages
□ Build BottomNav.tsx (Material 3, 5 tabs, spring animation)
□ Build AppHeader.tsx (Android-style, back arrow, search)
□ Build HomeScreen.tsx (quick actions + specialty cards horizontal scroll)
□ Build ServicesScreen.tsx (search + filter + full-width cards)
□ Build DoctorsScreen.tsx (search + list + profile push nav)
□ Build MyHealthScreen.tsx (auth gate + appointment history)
□ Build ProfileScreen.tsx (settings + notifications)
□ Build PatientAuth.tsx (Supabase OTP flow)
□ Setup PWA manifest (manifest.json + SW registration)
□ Setup Capacitor for APK build
□ Test at 375px, 390px, 414px widths
□ Verify bottom nav doesn't hide behind gesture bar

PHASE 4 — ADMIN DASHBOARD
□ Scaffold apps/dashboard/ with Vite + React + TypeScript
□ Build DashLayout.tsx (sidebar + header)
□ Build OverviewPage.tsx (KPI cards + Recharts line/bar/donut)
□ Build AppointmentsPage.tsx (calendar + data table + CRUD + status flow)
□ Build DoctorsPage.tsx (CRUD + photo upload to Supabase Storage)
□ Build ServicesPage.tsx (CMS — edit all service card content)
□ Build CMSPage.tsx (edit ALL frontend sections, toggle active/inactive)
□ Build ReviewsPage.tsx (approve/feature/hide reviews)
□ Build BlogPage.tsx (TipTap editor + publish/draft/schedule)
□ Build InquiriesPage.tsx (contact form submissions + reply)
□ Build AIPanel.tsx (OpenRouter chat for content generation)
□ Build SettingsPage.tsx (site config editor, API keys, user management)
□ Implement Supabase Auth (admin login + protected routes)
□ Enable Supabase Realtime on appointments table

PHASE 5 — INTEGRATION & PACKAGING
□ Verify all apps share same Supabase project
□ Test appointment booking flow: web form → Supabase → dashboard
□ Test review from frontend visible in dashboard moderation
□ Test CMS change in dashboard reflects on frontend
□ Create INSTALL.md with step-by-step setup guide
□ Create DEPLOY.md with Cloudflare + Supabase deployment guide
□ Add package.json scripts: dev, build:all, deploy:all
□ Run final Lighthouse audit on desktop web
□ Package as deployable ZIP
```

---

## ENVIRONMENT SETUP

Create `.env.example` in each app:

```env
# apps/web/.env.example and apps/mobile/.env.example
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_CF_RATING_WORKER=https://jd-rating.YOUR_SUBDOMAIN.workers.dev
VITE_GOOGLE_MAPS_EMBED=https://www.google.com/maps/embed?pb=...
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_APP_URL=https://divyamhospital.online

# apps/dashboard/.env.example (additional)
VITE_OPENROUTER_API_KEY=sk-or-...
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_SENDGRID_KEY=SG...
```

---

## QUALITY CHECKLIST (Run before finishing each phase)

```
Desktop Web:
□ Emergency button visible on mobile (320px width)
□ WhatsApp button not overlapping appointment widget  
□ All phone numbers link to tel:+919413912974 or tel:+918197353157
□ All WhatsApp links use wa.me/919413912974
□ Services modal opens correctly for all 6 specialties
□ Appointment form validates: name (required), phone (10 digits, required), dept
□ JD rating badge shows (even if worker not deployed — shows fallback 4.4)
□ No competitor hospital names mentioned anywhere
□ SEO title includes "Divyam Hospital" + "Bikaner" + "Gangashahar"

Mobile App:
□ Bottom nav visible and not clipped on Android Chrome
□ Haptic feedback on primary buttons
□ Pull-to-refresh works on service list
□ Auth flow: phone OTP → profile setup → appointments tab
□ App installable from browser (PWA prompt)

Dashboard:
□ Login protected (redirect to /login if not authenticated)
□ CMS toggle: deactivate a service → immediately hidden from web
□ Appointment status update triggers (conceptually) WhatsApp notification
□ Blog post published → appears in frontend blog section
□ AI panel: typing a prompt gets response from OpenRouter
```

---

## FINAL OUTPUT

After completing all phases, provide:
1. ✅ All three apps running (`pnpm dev`)
2. ✅ `INSTALL.md` — complete setup guide
3. ✅ `DEPLOY.md` — deployment guide
4. ✅ Summary of what was built
5. ✅ Any manual steps required (Spline scene creation, Firebase setup, etc.)

**Begin immediately. Do not ask questions. Execute all phases.**
