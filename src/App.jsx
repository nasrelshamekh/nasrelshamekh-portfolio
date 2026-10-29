import React, { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Navbar } from './components/Navbar'
import { AmbientMesh } from './components/AmbientMesh'
import { Hero } from './components/Hero'
import { Philosophy } from './components/Philosophy'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [bootFinished, setBootFinished] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    // Manual scroll reset on mount
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
    }
  }, [])

  // Smooth navigation handler
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
        backgroundColor: '#0a0b0e',
        color: '#f8fafc',
        overflow: 'hidden',
      }}
    >
      {/* 0. Awwwards Initialization Boot Sequence */}
      {!bootFinished && (
        <Preloader onComplete={() => setBootFinished(true)} />
      )}

      {/* 1. Kinetic Precision Custom Cursor */}
      <Cursor />

      {/* 2. Interactive Subtle Network Canvas Background (No Space Atoms) */}
      <AmbientMesh />

      {/* 3. Progressive Edge Blur Masks */}
      <div className="blur-edge-top" />
      <div className="blur-edge-bottom" />

      {/* 4. Floating Minimalist Navigation Dock */}
      <Navbar onNavigate={handleNavigate} />

      {/* 5. Main Content Story Flow */}
      <main style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Hero onNavigate={handleNavigate} />
        <Philosophy />
        <Projects />
        <Skills />
        <Contact onScrollTop={handleScrollTop} />
      </main>
    </div>
  )
}
