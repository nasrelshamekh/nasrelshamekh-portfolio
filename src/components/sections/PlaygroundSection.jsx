import React, { useRef, useState, useEffect } from 'react'
import { getStroke } from 'perfect-freehand'
import { playHoverTick, playMagneticSnap, playQuantumChime } from '../../core/audio'

function toSvgPath(points) {
  if (!points || points.length < 4) return ''
  const f = (n) => Number(n).toFixed(1)
  const mid = (a, b) => `${f((a[0] + b[0]) / 2)},${f((a[1] + b[1]) / 2)}`
  let d = `M ${f(points[0][0])} ${f(points[0][1])} Q `
  for (let i = 0; i < points.length; i++) {
    const next = points[(i + 1) % points.length]
    d += `${f(points[i][0])} ${f(points[i][1])} ${mid(points[i], next)} `
  }
  return d + ' Z'
}

export function PlaygroundSection() {
  const padRef = useRef()
  const [strokeD, setStrokeD] = useState('')
  const [temperature, setTemperature] = useState(0.7)
  const [latentDims, setLatentDims] = useState(4096)
  const [isDrawing, setIsDrawing] = useState(false)
  const [stats, setStats] = useState({ points: 0, complexity: 'NORMAL' })
  const pointsRef = useRef([])

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDrawing(true)
    const rect = e.currentTarget.getBoundingClientRect()
    pointsRef.current = [[e.clientX - rect.left, e.clientY - rect.top, e.pressure || 0.5]]
  }

  const handlePointerMove = (e) => {
    if (!isDrawing) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    pointsRef.current.push([x, y, e.pressure || 0.5])

    const stroke = getStroke(pointsRef.current, {
      size: 4 + temperature * 6,
      thinning: 0.6,
      smoothing: 0.5,
      streamline: 0.35,
    })
    setStrokeD(toSvgPath(stroke))
    setStats({
      points: pointsRef.current.length,
      complexity: pointsRef.current.length > 50 ? 'HIGH' : 'OPTIMAL',
    })
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }

  const handleClear = () => {
    playMagneticSnap()
    pointsRef.current = []
    setStrokeD('')
    setStats({ points: 0, complexity: 'EMPTY' })
  }

  const handleSynthesize = () => {
    playQuantumChime()
  }

  return (
    <section
      id="playground"
      style={{
        position: 'relative',
        padding: '120px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        zIndex: 2,
      }}
    >
      <div style={{ marginBottom: '48px' }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            color: '#00f5d4',
            marginBottom: '12px',
          }}
        >
          // CHAPTER 03 — CREATIVE MOTION & GESTURE LAB
        </div>
        <h2
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          INTERACTIVE GESTURAL CANVAS
        </h2>
        <p
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1rem',
            color: '#94a3b8',
            maxWidth: '640px',
            marginTop: '12px',
          }}
        >
          Draw a continuous vector path below. Our variable-width pencil algorithm
          renders your physical touch with organic pressure curves and real-time GPU feedback.
        </p>
      </div>

      {/* Main Sandbox Card */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          background: 'rgba(10, 15, 30, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '28px',
          padding: '36px',
          boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Left: SVG Drawing Pad */}
        <div
          ref={padRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            height: '380px',
            borderRadius: '18px',
            border: '2px dashed rgba(255, 255, 255, 0.15)',
            background: 'rgba(5, 7, 15, 0.8)',
            position: 'relative',
            touchAction: 'none',
            cursor: 'crosshair',
            overflow: 'hidden',
          }}
        >
          <svg
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          >
            {strokeD && (
              <path
                d={strokeD}
                fill="#00f5d4"
                style={{ filter: 'drop-shadow(0 0 12px rgba(0, 245, 212, 0.6))' }}
              />
            )}
          </svg>

          {/* Guide Overlay when empty */}
          {!strokeD && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                color: '#64748b',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                gap: '8px',
              }}
            >
              <span>+ CLICK & DRAG TO MAP LATENT PATH +</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>VARIABLE WIDTH // REAL-TIME EVAL</span>
            </div>
          )}
        </div>

        {/* Right: Hyperparameter Telemetry Controls */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '24px',
              }}
            >
              MODEL HYPERPARAMETERS
            </h3>

            {/* Slider 1: Temperature */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.82rem',
                  color: '#cbd5e1',
                  marginBottom: '8px',
                }}
              >
                <span>TEMPERATURE (STOCHASTICITY)</span>
                <span style={{ color: '#00f5d4' }}>{temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#00f5d4', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 2: Latent Dimensions */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.82rem',
                  color: '#cbd5e1',
                  marginBottom: '8px',
                }}
              >
                <span>MANIFOLD DIMS</span>
                <span style={{ color: '#00bbf9' }}>{latentDims}</span>
              </div>
              <input
                type="range"
                min="1024"
                max="8192"
                step="1024"
                value={latentDims}
                onChange={(e) => setLatentDims(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#00bbf9', cursor: 'pointer' }}
              />
            </div>

            {/* Live Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.78rem',
              }}
            >
              <div>
                <span style={{ color: '#64748b' }}>SAMPLES: </span>
                <span style={{ color: '#f8fafc' }}>{stats.points} pts</span>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>ENTROPY: </span>
                <span style={{ color: '#00f5d4' }}>{stats.complexity}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
            <button
              onClick={handleSynthesize}
              onMouseEnter={playHoverTick}
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: '9999px',
                background: '#00f5d4',
                color: '#05070f',
                border: 'none',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(0, 245, 212, 0.35)',
              }}
            >
              SYNTHESIZE 3D MANIFOLD
            </button>
            <button
              onClick={handleClear}
              onMouseEnter={playHoverTick}
              style={{
                padding: '14px 24px',
                borderRadius: '9999px',
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              CLEAR
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
