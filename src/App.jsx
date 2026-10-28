import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { startMasterClock, lenis } from './core/clock'

gsap.registerPlugin(ScrollTrigger)
import { CanvasStage } from './components/canvas/CanvasStage'
import { NeuralPreloader } from './components/ui/NeuralPreloader'
import { CustomCursor } from './components/ui/CustomCursor'
import { Header } from './components/ui/Header'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ManifestoSection } from './components/sections/ManifestoSection'
import { PlaygroundSection } from './components/sections/PlaygroundSection'
import { ArchitectureMatrix } from './components/sections/ArchitectureMatrix'
import { TerminalSection } from './components/sections/TerminalSection'
import { FooterSection } from './components/sections/FooterSection'

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false)

  useEffect(() => {
    // Force browser to start at top on reload
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
      window.scrollTo(0, 0)
      lenis.scrollTo(0, { immediate: true })
    }

    // Start unified GSAP ticker (Lenis -> ScrollTrigger -> Twos -> R3F Advance)
    startMasterClock()
  }, [])

  useEffect(() => {
    if (preloaderFinished) {
      // Ensure we remain firmly at origin and refresh triggers
      window.scrollTo(0, 0)
      lenis.scrollTo(0, { immediate: true })
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }
  }, [preloaderFinished])

  return (
    <div className="app-root" style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#05070f' }}>
      {/* 0. Research F2 / F4 Preloader (Frame zero on twos) */}
      <NeuralPreloader
        onComplete={() => setPreloaderFinished(true)}
      />

      {/* 1. Precision Crosshair Cursor */}
      <CustomCursor />

      {/* 2. Floating Dynamic Island Header */}
      <Header />

      {/* Skiper 41: Progressive Blur Masks for Cinematic Dissolve */}
      <div className="progressive-blur-top" />
      <div className="progressive-blur-bottom" />

      {/* 3. Research F1 / F4 Background Canvas (Single RAF clock, frameloop="never") */}
      <CanvasStage />

      {/* 4. DOM Kinetic Typography & Layout Flow */}
      <main style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <HeroSection />
        <ProjectsSection />
        <ManifestoSection />
        <PlaygroundSection />
        <ArchitectureMatrix />
        <TerminalSection />
        <FooterSection />
      </main>
    </div>
  )
}
