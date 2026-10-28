import React, { useRef, useState, useEffect } from 'react'
import { getStroke } from 'perfect-freehand'
import { playHoverTick, playMagneticSnap, playQuantumChime } from '../../core/audio'
import { synthesizeManifold, resetManifold } from '../../core/manifold'

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
  const [synthesisState, setSynthesisState] = useState('idle') // 'idle' | 'synthesizing' | 'success' | 'warning'
  const [stats, setStats] = useState({
    points: 0,
    complexity: 'NORMAL',
    topology: 'DEFAULT TORUS KNOT',
    curvature: '0.00',
  })
  const pointsRef = useRef([])

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDrawing(true)
    if (synthesisState === 'success' || synthesisState === 'warning') {
      setSynthesisState('idle')
    }
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
    setStats((prev) => ({
      ...prev,
      points: pointsRef.current.length,
      complexity: pointsRef.current.length > 50 ? 'HIGH' : 'OPTIMAL',
    }))
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }

  const handleClear = () => {
    playMagneticSnap()
    pointsRef.current = []
    setStrokeD('')
    setSynthesisState('idle')
    resetManifold()
    setStats({
      points: 0,
      complexity: 'EMPTY',
      topology: 'DEFAULT TORUS KNOT',
      curvature: '0.00',
    })
  }

  const handleSynthesize = () => {
    if (!pointsRef.current || pointsRef.current.length < 4) {
      playMagneticSnap()
      setSynthesisState('warning')
      setTimeout(() => {
        setSynthesisState('idle')
      }, 1400)
      return
    }

    setSynthesisState('synthesizing')
    playQuantumChime()

    const rect = padRef.current?.getBoundingClientRect() || { width: 500, height: 380 }
    const result = synthesizeManifold(pointsRef.current, rect, { temperature, latentDims })

    setTimeout(() => {
      setSynthesisState('success')
      if (result) {
        setStats((prev) => ({
          ...prev,
          topology: result.topology,
          curvature: result.curvature,
        }))
      }
    }, 650)
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
          Draw a continuous vector path below. Click <strong>Synthesize 3D Manifold</strong> to project
          your 2D gesture directly into the floating 3D ribbon in real-time space.
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
            border: synthesisState === 'synthesizing'
              ? '2px solid #00f5d4'
              : synthesisState === 'success'
              ? '2px solid rgba(0, 245, 212, 0.4)'
              : '2px dashed rgba(255, 255, 255, 0.15)',
            background: 'rgba(5, 7, 15, 0.8)',
            position: 'relative',
            touchAction: 'none',
            cursor: 'crosshair',
            overflow: 'hidden',
            transition: 'border 0.3s ease',
          }}
        >
          {/* Holographic Laser Scanline on Synthesis */}
          {synthesisState === 'synthesizing' && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #00f5d4 25%, #ffffff 50%, #00bbf9 75%, transparent)',
                boxShadow: '0 0 16px #00f5d4, 0 0 32px #00bbf9',
                animation: 'scanbeam 0.65s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
          )}

          {/* Active Status Badge in Top-Right */}
          {synthesisState === 'success' && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '4px 10px',
                borderRadius: '9999px',
                background: 'rgba(0, 245, 212, 0.12)',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.68rem',
                color: '#00f5d4',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#00f5d4',
                  boxShadow: '0 0 8px #00f5d4',
                  display: 'inline-block',
                }}
              />
              3D MANIFOLD ACTIVE
            </div>
          )}

          <svg
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          >
            {strokeD && (
              <path
                d={strokeD}
                fill="#00f5d4"
                style={{
                  filter:
                    synthesisState === 'synthesizing'
                      ? 'drop-shadow(0 0 24px #00f5d4) drop-shadow(0 0 45px #00bbf9)'
                      : synthesisState === 'success'
                      ? 'drop-shadow(0 0 16px rgba(0, 245, 212, 0.8))'
                      : 'drop-shadow(0 0 12px rgba(0, 245, 212, 0.6))',
                  transition: 'filter 0.3s ease',
                }}
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

            {/* Live Stats HUD */}
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
              <div>
                <span style={{ color: '#64748b' }}>TOPOLOGY: </span>
                <span style={{ color: '#cbd5e1', fontSize: '0.72rem' }}>{stats.topology}</span>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>CURVATURE: </span>
                <span style={{ color: '#00bbf9' }}>{stats.curvature} rad</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
            <button
              onClick={handleSynthesize}
              onMouseEnter={playHoverTick}
              disabled={synthesisState === 'synthesizing'}
              className={synthesisState === 'warning' ? 'shake-warn' : ''}
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: '9999px',
                background:
                  synthesisState === 'warning'
                    ? '#f43f5e'
                    : synthesisState === 'synthesizing'
                    ? 'linear-gradient(90deg, #00f5d4, #00bbf9, #7928ca, #00f5d4)'
                    : synthesisState === 'success'
                    ? 'linear-gradient(135deg, #00f5d4 0%, #059669 100%)'
                    : '#00f5d4',
                backgroundSize: synthesisState === 'synthesizing' ? '250% 100%' : 'auto',
                animation: synthesisState === 'synthesizing' ? 'synthPulse 1.2s ease infinite' : 'none',
                color: synthesisState === 'warning' ? '#ffffff' : '#05070f',
                border: 'none',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: synthesisState === 'synthesizing' ? 'wait' : 'pointer',
                boxShadow:
                  synthesisState === 'warning'
                    ? '0 0 24px rgba(244, 63, 94, 0.5)'
                    : synthesisState === 'synthesizing'
                    ? '0 0 30px rgba(0, 245, 212, 0.7)'
                    : synthesisState === 'success'
                    ? '0 0 25px rgba(0, 245, 212, 0.5)'
                    : '0 0 20px rgba(0, 245, 212, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
              }}
            >
              {synthesisState === 'synthesizing' ? (
                <>
                  <svg
                    style={{
                      width: '18px',
                      height: '18px',
                      animation: 'spin 1s linear infinite',
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                  </svg>
                  <span>SYNTHESIZING 3D MANIFOLD...</span>
                </>
              ) : synthesisState === 'success' ? (
                <span>✓ 3D MANIFOLD ACTIVE (RE-SYNTHESIZE)</span>
              ) : synthesisState === 'warning' ? (
                <span>⚠ DRAW A GESTURE FIRST</span>
              ) : (
                <span>SYNTHESIZE 3D MANIFOLD</span>
              )}
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
                transition: 'all 0.2s ease',
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
