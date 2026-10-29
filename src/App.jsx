import React, { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Preloader } from './components/Preloader'
import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { AmbientCanvas } from './components/AmbientCanvas'
import { ScrollHUD } from './components/ScrollHUD'
import { NarrativeInterlude } from './components/NarrativeInterlude'
import { Hero } from './components/Hero'
import { SystemInspector } from './components/SystemInspector'
import { ProjectShowcase } from './components/ProjectShowcase'
import { Manifesto } from './components/Manifesto'
import { TerminalHUD } from './components/TerminalHUD'
import { ContactSection } from './components/ContactSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [bootFinished, setBootFinished] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    // 0. Ensure browser never restores previous scroll position on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    // 1. Initialize Lenis Inertial Smooth Scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    lenisRef.current = lenis
    window.__lenis = lenis
    lenis.scrollTo(0, { immediate: true })

    // Keep Lenis halted while initial preloader boot screen plays
    lenis.stop()

    // 2. Synchronize with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.__lenis = null
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  const handleStartReveal = () => {
    setIsRevealing(true)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    lenisRef.current?.scrollTo(0, { immediate: true })
  }

  const handleBootComplete = () => {
    setBootFinished(true)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    lenisRef.current?.scrollTo(0, { immediate: true })
    lenisRef.current?.start()
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      lenisRef.current?.scrollTo(0, { immediate: true })
      ScrollTrigger.refresh()
    })
  }

  const handleNavigate = (targetId) => {
    if (targetId === 'hero') {
      lenisRef.current?.scrollTo(0, { duration: 1.2 })
      return
    }
    const element = document.getElementById(targetId)
    if (element) {
      lenisRef.current?.scrollTo(element, { offset: -60, duration: 1.4 })
    }
  }

  const handleScrollTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.5 })
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#040508',
        color: '#f8fafc',
        overflow: 'hidden',
      }}
    >
      {/* 0. Hollywood Hacker Initialization Boot Screen */}
      {!bootFinished && (
        <Preloader
          onStartReveal={handleStartReveal}
          onComplete={handleBootComplete}
        />
      )}

      {/* 1. Velocity Responsive Spring Cursor */}
      <Cursor />

      {/* 2. Interactive Code Stream Ambient Canvas */}
      <AmbientCanvas />

      {/* 3. Edge Blur Overlays & Architectural Viewport Frame */}
      <div className="mask-blur-top" />
      <div className="mask-blur-bottom" />
      <div className="viewport-frame" />

      {/* 4. Hollywood Cyber HUD Navbar */}
      <Navbar onNavigate={handleNavigate} />

      {/* 5. Circular Telemetry Progress Scroll HUD & Warp Navigator */}
      <ScrollHUD onNavigate={handleNavigate} />

      {/* 6. Unfolding Narrative Acts (The Full Story) */}
      <main style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {/* ============================================================== */}
        {/* ACT 01: THE DUAL-DISCIPLINE ORIGIN (HERO)                     */}
        {/* ============================================================== */}
        <Hero
          onNavigate={handleNavigate}
          isRevealing={isRevealing}
        />

        {/* --- NARRATIVE GATEWAY 02: Architectural Foundation --- */}
        <NarrativeInterlude
          actLabel="02 // ARCHITECTURAL FOUNDATION"
          lead="CODE THAT RUNS IS NOT ENOUGH"
          punchline="ARCHITECTURE MUST BE RESILIENT UNDER LOAD"
          subtext="Before a single pixel renders, backend services must handle concurrency gracefully, isolate failures, and maintain sub-millisecond execution."
          accent="var(--color-accent-cyan)"
          telemetry="HIGH CONCURRENCY // .NET 10 ARCHITECTURE"
        />

        {/* ============================================================== */}
        {/* SECTION 02: ARCHITECTURE & REQUEST LIFECYCLE                  */}
        {/* ============================================================== */}
        <SystemInspector />

        {/* --- NARRATIVE GATEWAY 03: Production Work --- */}
        <NarrativeInterlude
          actLabel="03 // PRODUCTION WORK"
          lead="THEORY IS VALIDATED BY PRODUCTION"
          punchline="ENGINEERED PRODUCTS BUILT TO SCALE"
          subtext="Six production applications spanning modern e-commerce architectures, community platforms, and cross-platform native clients."
          accent="#3b82f6"
          telemetry="06 FEATURED PROJECTS // REACT 19 + .NET 10"
        />

        {/* ============================================================== */}
        {/* SECTION 03: FEATURED PROJECTS                                 */}
        {/* ============================================================== */}
        <ProjectShowcase />

        {/* --- NARRATIVE GATEWAY 04: Engineering Rigor --- */}
        <NarrativeInterlude
          actLabel="04 // ENGINEERING RIGOR"
          lead="PERFORMANCE IS A FEATURE, NOT AN AFTERTHOUGHT"
          punchline="STRICT BOUNDARIES. DETERMINISTIC RENDERING"
          subtext="Combining type-safe system boundaries with hardware-accelerated animations to deliver responsive, predictable software."
          accent="var(--color-accent-emerald)"
          telemetry="TYPE SAFETY // HARDWARE ACCELERATION"
        />

        {/* ============================================================== */}
        {/* SECTION 04: ENGINEERING ETHOS & INTERACTIVE CLI               */}
        {/* ============================================================== */}
        <Manifesto />
        <TerminalHUD />

        {/* --- NARRATIVE GATEWAY 05: Direct Inquiry --- */}
        <NarrativeInterlude
          actLabel="05 // DIRECT INQUIRY"
          lead="HAVE A COMPLEX SYSTEM TO BUILD?"
          punchline="LET'S DISCUSS YOUR ARCHITECTURE"
          subtext="Based in Alexandria, Egypt. Open to senior full-stack roles, architectural consulting, and technical contract engagements."
          accent="var(--color-accent-cyan)"
          telemetry="DIRECT INQUIRIES // ALEXANDRIA, EGYPT"
        />

        {/* ============================================================== */}
        {/* ACT 05: THE DIRECT ENCRYPTED UPLINK                           */}
        {/* ============================================================== */}
        <ContactSection onScrollTop={handleScrollTop} />
      </main>
    </div>
  )
}
