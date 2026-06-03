# Galleria Vittorio Emanuele II — Luxury Digital Experience

> **"Where Luxury Was Born"**  
> An immersive, browser-based exploration of the world's most prestigious mall, built as a personal passion project.

---

## Live Demo

🔗 **[View Live Demo →](https://galleria-deck.vercel.app)**

---

## About This Project

This project is a personal exploration into high-end, luxury web design and advanced frontend animation. I built this interactive platform to capture the prestige of **Galleria Vittorio Emanuele II** (Milan, 1877) — the world's oldest active shopping gallery. 

My goal was to break away from standard corporate templates and create a digital experience that feels like a cinematic journey. By combining rich typography, smooth GSAP scroll animations, and a moody, atmospheric color palette, this project serves as a technical playground for crafting premium digital experiences.

### Design Philosophy

The aesthetic is built to feel like an editorial piece or a high-end fashion campaign:
> _The structure of a digital deck + the polish of luxury retail + the energy of a world-class destination_

- **Cinematic storytelling** — rich imagery over traditional layouts
- **Luxury UI** — Cormorant Garamond serif paired with Inter sans, using a warm gold and deep obsidian palette
- **GSAP-powered animations** — ScrollTrigger parallax, staggered reveals, and silky-smooth transitions
- **Atmospheric effects** — Subtle film grain texture and a classic gold cursor for an authentic, premium feel

---

## Tech Stack

This project was built from the ground up focusing on performance and precise animation control:

| Layer | Technology |
|-------|------------|
| Build | **Vite** (Vanilla JS, ES Modules for blazing fast HMR) |
| Styling | **Vanilla CSS** with a robust token system |
| Animations | **GSAP 3 + ScrollTrigger** (for complex, scroll-linked sequencing) |
| Typography | **Google Fonts** (Cormorant Garamond + Inter) |
| Deployment | **Vercel** / GitHub Pages |

---

## Technical Highlights

### Visual & UX Design
- Cinematic loading screen with an animated SVG progress ring
- GSAP ScrollTrigger parallax applied to hero and luxury sections
- Atmospheric film grain texture overlay for cinematic depth
- Custom SVG cursor matching the luxury aesthetic
- Gold shimmer gradients and animated borders on interactive elements

### Performance & Execution
- Zero-framework overhead (Vanilla JS + Vite) for maximum Lighthouse scores
- Complex staggered section entrances triggered precisely on scroll
- Horizontal scrolling tenant gallery matching exact flexbox heights
- CLS prevention with explicit image dimensions and `fetchpriority="high"` on hero assets
- Fully responsive across desktop, tablet, and mobile breakpoints

---

## Getting Started

If you'd like to run this project locally and explore the code:

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Saketh-0/Galleria-deck.git
cd Galleria-deck

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at **http://localhost:3000**

---

## Why I Built This

I've always been fascinated by how digital design can evoke the same emotions as physical architecture. The Galleria is the world's most culturally loaded retail address; it invented the concept of covered luxury retail in 1877. 

This project was my way of challenging myself to translate that physical prestige into code. It allowed me to deeply explore GSAP's ScrollTrigger, push the boundaries of Vanilla CSS layout, and experiment with how color, typography, and motion language can create a feeling of exclusivity and heritage on the web.

---

*© 2026 · Built with precision, ambition, and a deep respect for digital craftsmanship.*
