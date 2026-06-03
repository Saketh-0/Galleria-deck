# Galleria Vittorio Emanuele II — Interactive Sales Deck

> **"Where Luxury Was Born"**  
> An immersive, browser-based commercial sales platform for the world's most prestigious mall.

---

## Live Demo

🔗 **[View Live →](#)**  
📁 **[GitHub Repository →](#)**

---

## About

This is a fully interactive, luxury-grade commercial sales deck built for **Galleria Vittorio Emanuele II** (Milan, 1877) — one of the world's oldest and most prestigious shopping galleries. The tool serves as a commercial pitch platform for prospective:

- **Retail Tenants** (luxury brands, flagship stores, pop-ups)
- **Corporate Sponsors** (brand activations, fashion week partners)
- **Event Promoters** (concerts, product launches, fashion shows)

### Design Philosophy

The deck is built to feel like:
> _The structure of a DigiDeck + the polish of Hermès + the energy of a world-class destination_

- **Non-linear navigation** — viewers control their journey
- **Video-first storytelling** — cinematic imagery over slides
- **Luxury UI** — Cormorant Garamond serif + Inter sans, warm gold palette
- **GSAP-powered animations** — ScrollTrigger parallax, staggered reveals, cursor glow
- **AI-generated imagery** — 8 custom images via Antigravity AI (Gemini)
- **Expandable architecture** — Phase 2 modules are pre-built and expandable

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Build | Vite 8 (Vanilla JS, ES Modules) |
| Styling | Vanilla CSS with design tokens (1900+ lines) |
| Animations | GSAP 3 + ScrollTrigger, CSS @keyframes, Canvas API |
| Fonts | Google Fonts (Cormorant Garamond + Inter) |
| Images | AI-generated via Antigravity AI (Gemini) — 8 custom renders |
| Effects | Particle canvas, cursor glow, film grain, Ken Burns, parallax |
| Deployment | Vercel / GitHub Pages |

---

## Features

### Visual & UX Design
- ✅ Cinematic loading screen with animated SVG progress ring
- ✅ Ken Burns animation on hero with gold particle canvas overlay
- ✅ GSAP ScrollTrigger parallax on hero, luxury, and platform backgrounds
- ✅ Cursor glow effect that follows mouse movement (desktop)
- ✅ Film grain texture overlay for cinematic depth
- ✅ Gold shimmer gradient on section titles
- ✅ Animated gradient border on featured contact card
- ✅ Premium scrollbar styling

### Technical Execution
- ✅ GSAP-powered staggered section entrances (every section)
- ✅ Scroll-triggered stat counters with GSAP number tweening
- ✅ Horizontal scrolling tenant gallery with GSAP-animated transitions
- ✅ Expandable accordion modules with GSAP max-height animation
- ✅ Contact modal with GSAP scale/opacity entrance
- ✅ CLS prevention with explicit width/height on all images
- ✅ Hero image preloaded with `fetchpriority="high"`
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Accessible (ARIA labels, keyboard navigation, focus management)
- ✅ SEO-optimized (meta tags, semantic HTML, single H1)

### AI Integration
- ✅ 8 unique AI-generated images via Antigravity AI (Gemini)
- ✅ AI used for all property imagery — dome interior, mosaic floor, retail gallery, dining, fashion events, night exterior, sponsorship activations, leasing spaces
- ✅ Consistent warm gold/amber cinematic grading across all renders
- ✅ AI-assisted code generation for GSAP animation patterns

### Storytelling & Strategy
- ✅ Luxury comparison table (GVE vs 5th Avenue vs Bond Street)
- ✅ Data-driven stats (15M visitors, 180 countries, 147 years, 12K m²)
- ✅ Three-path contact flow (Leasing, Sponsorship, Events)
- ✅ Emotional narrative arc from heritage → exclusivity → action

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd galleria-deck

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at **http://localhost:3000**

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
galleria-deck/
├── index.html              # Main HTML — 8 semantic sections
├── vite.config.js          # Vite build configuration
├── package.json            # Dependencies: Vite + GSAP
├── README.md
├── public/
│   ├── favicon.svg         # Custom SVG favicon
│   ├── icons.svg           # Icon sprite sheet
│   ├── logo.svg            # GVE brand logo
│   └── assets/
│       └── images/         # 8 AI-generated images (~1MB each)
│           ├── hero_dome.png
│           ├── night_exterior.png
│           ├── retail_gallery.png
│           ├── mosaic_floor.png
│           ├── dining_savini.png
│           ├── fashion_event.png
│           ├── sponsorship.png
│           └── leasing_space.png
└── src/
    ├── main.js             # Application logic (GSAP, particles, nav, modules)
    └── style.css           # Complete design system (1900+ lines)
```

---

## Section Architecture

| Section | Story Beat | Business Goal |
|---------|-----------|---------------|
| Hero | Cinematic intro with Ken Burns + particles | Immediate emotional buy-in |
| Why Galleria | Property data with animated counters | Credibility & scale |
| Retail | Tenant carousel showcase | Drive leasing enquiries |
| Luxury | Quote + comparison table | Brand partnership value |
| Dining | F&B lifestyle timeline | Lifestyle tenant interest |
| Attractions | Visual grid gallery | Event promoter interest |
| Platform | Events/Sponsorship/Leasing accordions | All business objectives |
| Contact | Three-path CTAs + modal | Direct commercial action |

---

## Phase 2 Expandable Modules

The platform architecture is designed for modular expansion:

- **Events Module** — detailed capacity specs, booking flow *(pre-built)*
- **Sponsorship Module** — tier cards, audience data, activation examples *(pre-built)*
- **Leasing Paths** — segmented by category (luxury, F&B, pop-up) *(pre-built)*
- **Venue Modules** — dedicated pages for performing arts, expo halls *(scaffolded)*

Each module is pre-scaffolded within the accordion system and expandable into standalone routes without rewriting core architecture.

---

## AI Integration Details

### Image Generation
All 8 section images were generated using **Antigravity AI (Gemini)** with detailed prompts:

| Image | Prompt Focus | Section |
|-------|-------------|---------|
| `hero_dome.png` | Galleria GVE interior dome, golden hour, cinematic wide | Hero, Dome Experience |
| `night_exterior.png` | Galleria exterior at night, Milan Duomo visible, warm glow | Property, Platform BG |
| `retail_gallery.png` | Luxury retail arcade, marble, designer storefronts | Retail (Prada, Versace) |
| `mosaic_floor.png` | Taurus bull mosaic, ornate floor detail, tourists | Luxury BG, Bull Tradition |
| `dining_savini.png` | Fine dining interior, candlelight, Italian ambiance | Dining |
| `fashion_event.png` | Fashion week runway under glass dome | Attractions, Events |
| `sponsorship.png` | Luxury brand activation, premium event space | Retail (Ferrari), Brand Launches |
| `leasing_space.png` | Available premium retail space, elegant interiors | Retail (LV), Leasing |

### Code Assistance
- GSAP ScrollTrigger animation patterns and sequencing
- CSS design system architecture and token structure
- Responsive breakpoint strategies
- Accessibility (ARIA) implementation

---

## Performance

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Performance | 90+ | ✅ Optimized |
| Lazy Loading | All below-fold images | ✅ `loading="lazy"` |
| CLS Prevention | Width/height on all images | ✅ Explicit dimensions |
| Hero Preload | `<link rel="preload">` | ✅ `fetchpriority="high"` |
| Build Size | < 500KB JS | ✅ Vite tree-shaking + GSAP |
| Animations | GPU-accelerated | ✅ `will-change`, `transform` |

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages

```bash
npm run build
# Upload /dist folder to gh-pages branch
```

---

## Design Rationale

### Why Galleria Vittorio Emanuele II?

The Galleria is the world's most culturally loaded retail address. Unlike modern luxury malls that _aspire_ to prestige, the Galleria _is_ prestige — it invented the concept of covered luxury retail in 1877. This narrative advantage shapes every design decision:

- **Color palette**: Warm near-black (#0A0804) + aged gold (#C9A84C) — channels Italian marble, candlelight, heritage
- **Typography**: Cormorant Garamond (stately European serif) paired with Inter (modern precision) — tradition meets technology
- **Motion language**: GSAP-powered slow, deliberate reveals — luxury never rushes
- **Content hierarchy**: Story-driven, not data-driven — emotional connection first, business case second
- **Visual effects**: Cursor glow, film grain, Ken Burns — cinematic, not corporate

### Why Vanilla JS + GSAP + Vite?

- Zero framework overhead (no React/Vue runtime ~30KB+)
- GSAP provides professional-grade animation with ScrollTrigger scrubbing
- Vite delivers instant HMR and optimized production builds
- Maximum Lighthouse scores with minimal bundle
- Full control over animation timing and interaction design
- Simpler for Phase 2 modular expansion pattern

---

## Contact & Submission

Built for **LIAT AI Screening Assignment**  
Email: medi@liat.ai

---

*© 2026 · Built with precision, ambition, and a deep respect for 147 years of Italian excellence.*
