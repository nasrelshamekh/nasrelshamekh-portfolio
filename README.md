# Nasr Elshamekh — Flagship Portfolio

> **Full-Stack Software Architect & Creative Developer**  
> Fusing robust enterprise architectures (**C# / ASP.NET Core .NET 10, React 19, PostgreSQL**) with Awwwards-tier creative web experiences (**Three.js, R3F, GSAP, Lenis, Web Audio API**).

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=flat&logo=greensock&logoColor=white)](https://greensock.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌐 Live Deployments & Ecosystem

- **Portfolio**: [nasrelshamekh.vercel.app](https://github.com/nasrelshamekh/Portfolio)
- **CircleHub**: [circle-hub-nu.vercel.app](https://circle-hub-nu.vercel.app) — *React + ASP.NET Core (.NET 10) + MySQL*
- **Nexora Store**: [nexora-app-seven.vercel.app](https://nexora-app-seven.vercel.app/) — *TypeScript + React E-Commerce Engine*
- **CircleHub Mobile**: [github.com/nasrelshamekh/circlehub-mobile](https://github.com/nasrelshamekh/circlehub-mobile) — *Expo Router + NativeWind*
- **Nexify**: [nexify-kappa.vercel.app](https://nexify-kappa.vercel.app) — *Social Media Application*
- **Earnings & Spendings Suite**: [earningscalculator-app.vercel.app](https://earningscalculator-app.vercel.app) — *Fintech Utilities*
- **Global Weather App**: [weather-app-ten-tau-49.vercel.app](https://weather-app-ten-tau-49.vercel.app) — *Meteorological REST Client*

---

## ⚡ Architectural Core

### 1. Unified Master Clock (`src/core/clock.js`)
Coordinates all renderers, physics, and input buses through a single deterministic `gsap.ticker` RAF:
- **Lenis Smooth Scroll** (`autoRaf: false` synchronized directly with GSAP ticker)
- **ScrollTrigger** updates tied directly to smooth scroll progression
- **Spider-Verse Dual Clock**: 12 fps stepped clock (`twos`) driving organic pencil boil & core harmonic pulses
- **Frameloop="never" R3F WebGL Draw Call**: Eliminates visual shearing between DOM and WebGL layers
- **Frame-Rate-Independent Damping**: Smooth exponential decay ($k = 1 - e^{-\text{damping} \cdot dt}$) across all refresh rates (60Hz, 120Hz ProMotion, 144Hz)

### 2. Zero-Asset Web Audio Synthesizer (`src/core/audio.js`)
Procedurally synthesized audio effects generated in real-time via the Web Audio API without downloading external audio files:
- Micro-tonal hover ticks & resonant magnetic snap feedback
- 4-voice quantum harmonic chimes & neural bass sweeps
- Continuous scroll-velocity friction synthesizer with dynamic volume attenuation

### 3. Kinetic 3D Canvas Stage (`src/components/canvas/`)
- **Neural Core**: 3D morphing liquid mesh with orbiting precession halo rings choreographed along a scrubbed scroll path across every chapter.
- **Neural Lattice**: 1,000 instanced particle points drifting in serene cosmic micro-harmonics.
- **Interactive Ribbon**: Parametric 3D Catmull-Rom tube wrapping the core.

### 4. Interactive Chapters
- **Chapter 01 — Featured Software Architectures**: 3D tilt cards with live demo links, metrics, and architecture dossiers.
- **Chapter 02 — Engineering Philosophy**: Split-row manifesto with progressive disclosure.
- **Chapter 03 — Creative Motion & Gesture Lab**: Tactile drawing pad with variable-width pressure curves (`perfect-freehand`) and hyperparameter tuning.
- **Chapter 04 — Architectural Matrix**: Categorized technical capabilities breakdown.
- **Chapter 05 — Full-Stack Interactive Terminal**: Command-line REPL (`/about`, `/projects`, `/skills`, `/github`, `/synth`, `/rewind`).
- **Chapter 06 — Contact Dispatch**: Direct contact form and smooth reverse scrub rewind.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/nasrelshamekh/nasrelshamekh-portfolio.git

# Navigate into the project
cd nasrelshamekh-portfolio

# Install dependencies
npm install

# Start the local development server
npm run dev

# Build for production
npm run build
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Next.js, Vite, Tailwind CSS, Space Grotesk, Syne, JetBrains Mono
- **Motion & 3D**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`, GSAP (`gsap-trial`, `SplitText`, `ScrollTrigger`), Lenis
- **Backend & APIs**: C#, ASP.NET Core (.NET 10), Node.js, Express, RESTful APIs, JWT Authentication
- **Databases & ORMs**: PostgreSQL, MySQL, Entity Framework Core, Prisma ORM
- **Mobile**: React Native, Expo Router, NativeWind

---

Designed & engineered by **Nasr Elshamekh**.
