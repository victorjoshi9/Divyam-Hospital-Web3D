---
name: 21stdev-components-hospital
version: 1.0.0
description: >
  21st.dev magic UI component integration skill for Divyam Hospital.
  Use when building premium animated UI components: bento grids, shimmer
  buttons, morphing text, particles, magic cards, animated beams, marquees,
  globes, confetti, sparkles, and number tickers. All components adapted
  to hospital brand colors and dark theme.
trigger_keywords:
  - 21st.dev
  - magic ui
  - animated component
  - shimmer button
  - morphing text
  - bento grid
  - magic card
  - number ticker
  - animated beam
  - marquee
  - sparkles
  - confetti
---

# 21ST.DEV COMPONENTS SKILL — DIVYAM HOSPITAL

## SETUP

```bash
# Install shadcn CLI (required for 21st.dev components)
pnpm dlx shadcn@latest init

# Install components via CLI
npx shadcn@latest add "https://21st.dev/r/aceternity/shimmer-button"
npx shadcn@latest add "https://21st.dev/r/aceternity/magic-card"
npx shadcn@latest add "https://21st.dev/r/aceternity/number-ticker"
npx shadcn@latest add "https://21st.dev/r/aceternity/morphing-text"
npx shadcn@latest add "https://21st.dev/r/aceternity/particles"
npx shadcn@latest add "https://21st.dev/r/aceternity/animated-beam"
npx shadcn@latest add "https://21st.dev/r/aceternity/marquee"
npx shadcn@latest add "https://21st.dev/r/aceternity/confetti"
npx shadcn@latest add "https://21st.dev/r/aceternity/sparkles"
npx shadcn@latest add "https://21st.dev/r/aceternity/word-rotate"
npx shadcn@latest add "https://21st.dev/r/aceternity/bento-grid"
npx shadcn@latest add "https://21st.dev/r/aceternity/globe"

# Framer Motion (required by most components)
pnpm add framer-motion

# GSAP (for scroll animations)
pnpm add gsap
```

---

## COMPONENT USAGE GUIDE

### 1. ShimmerButton — Primary CTAs
```tsx
import { ShimmerButton } from "@/components/ui/shimmer-button";

// Book Appointment CTA
<ShimmerButton
  shimmerColor="#FFD700"
  background="linear-gradient(135deg, #FF6B6B, #E05555)"
  className="px-8 py-4 text-white font-bold rounded-full text-lg"
  onClick={toggleAppt}
>
  📅 Book Appointment
</ShimmerButton>

// Emergency Call CTA (always red pulse)
<ShimmerButton
  shimmerColor="#ffffff"
  background="#DC2626"
  className="px-6 py-3 font-bold rounded-full animate-pulse"
  onClick={() => window.location.href = 'tel:+919413912974'}
>
  🚨 Emergency: 9413912974
</ShimmerButton>
```

### 2. MagicCard — Service & Doctor Cards
```tsx
import { MagicCard } from "@/components/ui/magic-card";

function ServiceCard({ service }: { service: ServiceData }) {
  return (
    <MagicCard
      className="cursor-pointer rounded-2xl p-6 bg-[var(--card-bg)]"
      gradientColor="#FF6B6B"     // primary color border glow
      gradientSize={200}
      gradientOpacity={0.15}
      onClick={() => openService(service.key)}
    >
      <div className="text-5xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
      <p className="text-[var(--text-muted)] text-sm">{service.doctor}</p>
      <p className="text-[var(--teal)] text-xs mt-1">{service.experience}</p>
    </MagicCard>
  );
}
```

### 3. NumberTicker — Stats Section
```tsx
import NumberTicker from "@/components/ui/number-ticker";

function StatsSection() {
  const stats = [
    { value: 5000, suffix: "+", label: "Patients Treated" },
    { value: 7, suffix: "", label: "Expert Specialists" },
    { value: 24, suffix: "/7", label: "Emergency Care" },
    { value: 8, suffix: " Min", label: "Ambulance Response" },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-4xl md:text-6xl font-black text-[var(--primary)]">
            <NumberTicker value={stat.value} />
            <span>{stat.suffix}</span>
          </div>
          <p className="text-[var(--text-muted)] mt-2 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
```

### 4. MorphingText — Hero Tagline
```tsx
import { MorphingText } from "@/components/ui/morphing-text";

// Alternating hero taglines
const TAGLINES = [
  "Healing Beyond Expectations",
  "Your Health, Our Priority",
  "Expert Care, Always Near",
  "Gangashahar's Premier Hospital",
];

<MorphingText 
  texts={TAGLINES}
  className="text-5xl md:text-7xl font-black bg-gradient-to-r 
    from-white via-[var(--gold)] to-[var(--teal)] bg-clip-text text-transparent"
/>
```

### 5. WordRotate — Specialty Tagline
```tsx
import WordRotate from "@/components/ui/word-rotate";

<p className="text-xl text-[var(--text-muted)]">
  Expert care for{" "}
  <WordRotate
    words={["Children", "Women", "Your Heart", "Your Smile", "Emergencies"]}
    className="text-[var(--primary)] font-bold"
  />
</p>
```

### 6. Marquee — Certifications / Partners
```tsx
import { Marquee } from "@/components/ui/marquee";

const CERTIFICATIONS = [
  "✅ NABH Compliant",
  "🏆 Best Hospital Bikaner",
  "⭐ JustDial 4.4 Rating",
  "🚑 24/7 Emergency",
  "🔬 ISO Lab Certified",
  "👨‍⚕️ 7 Expert Specialists",
];

<div className="py-8 bg-[var(--card-bg)] border-y border-[var(--card-border)]">
  <Marquee className="gap-8" pauseOnHover>
    {CERTIFICATIONS.map((cert) => (
      <div key={cert} className="px-6 py-2 text-[var(--teal)] font-semibold text-sm">
        {cert}
      </div>
    ))}
  </Marquee>
</div>
```

### 7. AnimatedBeam — Doctor → Specialty Connection
```tsx
import { AnimatedBeam } from "@/components/ui/animated-beam";

// Use in "About" or "Why Choose Us" to show doctor→specialty connections
// Shows animated beam lines connecting doctor icons to specialty icons
```

### 8. Particles — Hero Background
```tsx
import Particles from "@/components/ui/particles";

<Particles
  className="absolute inset-0 z-0"
  quantity={80}
  color="#4ECDC4"
  ease={80}
  size={0.4}
  refresh={false}
/>
```

### 9. Sparkles — Premium / Highlight Elements
```tsx
import { SparklesCore } from "@/components/ui/sparkles";

// Around "5000+ Patients" stat or "Why Choose Us" heading
<div className="relative">
  <SparklesCore
    background="transparent"
    minSize={0.4}
    maxSize={1}
    particleDensity={60}
    className="absolute inset-0"
    particleColor="#FFD700"
  />
  <h2 className="relative z-10">Trusted by 5,000+ Families</h2>
</div>
```

### 10. Confetti — Appointment Success
```tsx
import confetti from 'canvas-confetti';

function onAppointmentSuccess() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF6B6B', '#4ECDC4', '#FFD700', '#ffffff'],
  });
}

// Trigger after Supabase insert success
await supabase.from('appointments').insert(data);
onAppointmentSuccess();
alert('✅ Appointment booked! We will call you shortly.');
```

### 11. BentoGrid — Services Layout (Desktop)
```tsx
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

// Services in bento layout — first card large (emergency), rest normal
<BentoGrid>
  <BentoCard
    name="24/7 Emergency Care"
    description="Round-the-clock emergency with 8-min ambulance response"
    className="col-span-2 row-span-2 bg-red-950/50 border-red-800/30"
    Icon={() => <span className="text-5xl">🚑</span>}
    href="#services"
    cta="Learn More"
  />
  {services.slice(0, 5).map((s) => (
    <BentoCard
      key={s.key}
      name={s.title}
      description={s.description}
      className="bg-[var(--card-bg)]"
      Icon={() => <span className="text-3xl">{s.icon}</span>}
      href="#services"
      cta="Book Now"
    />
  ))}
</BentoGrid>
```

### 12. Globe — Reach Visualization
```tsx
import { Globe } from "@/components/ui/globe";

// In About or Footer section
// Show globe with marker on Bikaner, Rajasthan
<Globe
  className="w-full h-64"
  config={{
    markers: [
      { location: [28.0229, 73.3119], size: 0.1 }, // Bikaner
    ],
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.42, 0.42],  // #FF6B6B
    glowColor: [0.3, 0.8, 0.78],  // #4ECDC4
  }}
/>
```

---

## COMPONENT MAPPING — WHERE EACH GOES

| Component | Section | Purpose |
|---|---|---|
| `MorphingText` | Hero | Rotating taglines |
| `Particles` | Hero | Background field |
| `ShimmerButton` | Hero, all CTAs | Primary action buttons |
| `NumberTicker` | Stats | Animated counters |
| `BentoGrid` | Services (desktop) | Premium card layout |
| `MagicCard` | Services, Doctors | Hover glow effect |
| `WordRotate` | Hero subtitle | Specialty rotation |
| `Marquee` | Below hero | Certifications ticker |
| `AnimatedBeam` | About/Why | Team connections |
| `SparklesCore` | Stats, Why Choose | Premium highlights |
| `Globe` | About/Footer | Location visualization |
| `Confetti` | Appointment success | Celebration feedback |

---

## TAILWIND CONFIG ADDITIONS

```js
// tailwind.config.ts additions needed for 21st.dev components
module.exports = {
  theme: {
    extend: {
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'marquee': 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## DARK THEME OVERRIDES

All 21st.dev components need these CSS variable overrides for dark hospital theme:

```css
/* globals.css */
.magic-card { --card-background: #111827; }
.bento-card { background: #111827; border-color: rgba(255,255,255,0.08); }

/* Override any white backgrounds to dark */
[data-theme="dark"] .shimmer-button-bg { background: #FF6B6B; }
```
