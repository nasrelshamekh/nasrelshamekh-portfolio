import React, { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const vel = useRef({ x: 0, y: 0 })

  const [state, setState] = useState({
    hovered: false,
    text: '',
    visible: false,
  })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!state.visible) setState((s) => ({ ...s, visible: true }))
    }

    const onOver = (e) => {
      const target = e.target
      const card = target.closest('.project-card')
      const clickable = target.closest('a, button, input, textarea, [role="button"]')

      if (card) {
        setState((s) => ({ ...s, hovered: true, text: 'VIEW ↗' }))
      } else if (clickable) {
        setState((s) => ({ ...s, hovered: true, text: '' }))
      } else {
        setState((s) => ({ ...s, hovered: false, text: '' }))
      }
    }

    const onLeave = () => setState((s) => ({ ...s, visible: false }))
    const onEnter = () => setState((s) => ({ ...s, visible: true }))

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    let reqId
    const tick = () => {
      const dx = mousePos.current.x - ringPos.current.x
      const dy = mousePos.current.y - ringPos.current.y

      vel.current.x = dx * 0.18
      vel.current.y = dy * 0.18

      ringPos.current.x += vel.current.x
      ringPos.current.y += vel.current.y

      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2)
      const stretch = Math.min(speed * 0.015, 0.3)
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch})`
      }

      reqId = requestAnimationFrame(tick)
    }

    reqId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(reqId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [state.visible])

  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const { hovered, text, visible } = state

  return (
    <>
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
          backgroundColor: text ? '#3b82f6' : '#ffffff',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: visible ? (hovered ? 0.35 : 1) : 0,
          transition: 'opacity 0.2s ease, background-color 0.2s ease',
          mixBlendMode: text ? 'normal' : 'difference',
          boxShadow: text ? '0 0 12px #3b82f6' : 'none',
        }}
      />

      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: text ? '68px' : hovered ? '52px' : '36px',
          height: text ? '68px' : hovered ? '52px' : '36px',
          marginLeft: text ? '-34px' : hovered ? '-26px' : '-18px',
          marginTop: text ? '-34px' : hovered ? '-26px' : '-18px',
          borderRadius: '50%',
          border: text
            ? '1.5px solid rgba(59, 130, 246, 0.85)'
            : hovered
            ? '1.5px solid rgba(255, 255, 255, 0.9)'
            : '1px solid rgba(255, 255, 255, 0.3)',
          backgroundColor: text
            ? 'rgba(59, 130, 246, 0.16)'
            : hovered
            ? 'rgba(255, 255, 255, 0.08)'
            : 'transparent',
          boxShadow: text ? '0 0 25px rgba(59, 130, 246, 0.45)' : 'none',
          pointerEvents: 'none',
          zIndex: 99997,
          opacity: visible ? 1 : 0,
          transition: 'width 0.22s ease-out, height 0.22s ease-out, margin 0.22s ease-out, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {text && (
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.64rem',
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
