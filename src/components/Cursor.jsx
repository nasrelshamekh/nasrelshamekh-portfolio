import React, { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const textRef = useRef(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const vel = useRef({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState({
    hovered: false,
    text: '',
    isProject: false,
    active: false,
    visible: false,
  })

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!cursorState.visible) {
        setCursorState((prev) => ({ ...prev, visible: true }))
      }
    }

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, active: true }))
    }

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, active: false }))
    }

    const handleMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, visible: false }))
    }

    const handleMouseEnter = () => {
      setCursorState((prev) => ({ ...prev, visible: true }))
    }

    // Interactive target detection
    const handleMouseOver = (e) => {
      const target = e.target
      const interactiveEl = target.closest('a, button, input, textarea, [role="button"]')
      const workRow = target.closest('.work-row')
      const card = target.closest('.glass-panel')

      if (workRow) {
        setCursorState((prev) => ({
          ...prev,
          hovered: true,
          isProject: true,
          text: 'VIEW ↗',
        }))
      } else if (interactiveEl) {
        setCursorState((prev) => ({
          ...prev,
          hovered: true,
          isProject: false,
          text: '',
        }))
      } else if (card) {
        setCursorState((prev) => ({
          ...prev,
          hovered: false,
          isProject: false,
          text: '',
        }))
      } else {
        setCursorState((prev) => ({
          ...prev,
          hovered: false,
          isProject: false,
          text: '',
        }))
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)

    // Animation ticker for fluid trailing physics
    let animId
    const loop = () => {
      // Lerp for outer ring
      const dx = mousePos.current.x - ringPos.current.x
      const dy = mousePos.current.y - ringPos.current.y
      
      vel.current.x = dx * 0.18
      vel.current.y = dy * 0.18

      ringPos.current.x += vel.current.x
      ringPos.current.y += vel.current.y

      // Calculate speed for dynamic velocity stretch
      const speed = Math.sqrt(vel.current.x * vel.current.x + vel.current.y * vel.current.y)
      const maxStretch = 0.25
      const stretch = Math.min(speed * 0.015, maxStretch)
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch})`
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorState.visible])

  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const { hovered, isProject, text, active, visible } = cursorState

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          borderRadius: '50%',
          backgroundColor: isProject ? '#a855f7' : '#ffffff',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? (hovered ? 0.4 : 1) : 0,
          transition: 'opacity 0.2s ease, background-color 0.2s ease, transform 0.05s ease',
          mixBlendMode: isProject ? 'normal' : 'difference',
          boxShadow: isProject ? '0 0 12px #a855f7' : 'none',
        }}
      />

      {/* Trailing Organic Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isProject ? '64px' : hovered ? '52px' : '36px',
          height: isProject ? '64px' : hovered ? '52px' : '36px',
          marginLeft: isProject ? '-32px' : hovered ? '-26px' : '-18px',
          marginTop: isProject ? '-32px' : hovered ? '-26px' : '-18px',
          borderRadius: '50%',
          border: isProject
            ? '1.5px solid rgba(168, 85, 247, 0.85)'
            : hovered
            ? '1.5px solid rgba(255, 255, 255, 0.9)'
            : '1px solid rgba(255, 255, 255, 0.3)',
          backgroundColor: isProject
            ? 'rgba(168, 85, 247, 0.15)'
            : hovered
            ? 'rgba(255, 255, 255, 0.1)'
            : 'transparent',
          backdropFilter: hovered ? 'blur(2px)' : 'none',
          boxShadow: isProject ? '0 0 25px rgba(168, 85, 247, 0.4)' : 'none',
          pointerEvents: 'none',
          zIndex: 99997,
          opacity: visible ? (active ? 0.6 : 1) : 0,
          transition: 'width 0.22s ease-out, height 0.22s ease-out, margin 0.22s ease-out, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.25s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {text && (
          <span
            ref={textRef}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.08em',
              userSelect: 'none',
            }}
          >
            {text}
          </span>
        )}
      </div>
    </>
  )
}
