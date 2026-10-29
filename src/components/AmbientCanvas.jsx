import React, { useEffect, useRef } from 'react'

const TELEMETRY_LABELS = [
  'ALX', '31.20°N', '29.91°E', 'FLUID', '.NET10', 'REACT19',
  'SYNC', 'CQRS', '0.04MS', 'ACID', 'SYS_OK', 'TLS1.3'
]

export function AmbientCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', onResize)

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Grid configuration
    const SPACING = 36
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 }

    // Sporadic pulsing telemetry nodes
    const nodeCount = prefersReducedMotion ? 0 : 8
    const telemetryNodes = []
    for (let i = 0; i < nodeCount; i++) {
      telemetryNodes.push({
        x: Math.floor((Math.random() * width) / SPACING) * SPACING,
        y: Math.floor((Math.random() * height) / SPACING) * SPACING,
        label: TELEMETRY_LABELS[Math.floor(Math.random() * TELEMETRY_LABELS.length)],
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.02,
      })
    }

    const onMouseMove = (e) => {
      if (prefersReducedMotion) return
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
    }

    const onMouseLeave = () => {
      mouse.targetX = -1000
      mouse.targetY = -1000
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    let frameId
    let isTabVisible = true

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden
      if (isTabVisible && !frameId) {
        frameId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const render = () => {
      if (!isTabVisible) {
        frameId = null
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.15
      mouse.y += (mouse.targetY - mouse.y) * 0.15

      const cols = Math.ceil(width / SPACING)
      const rows = Math.ceil(height / SPACING)

      // 1. Precision Halftone Dot Matrix
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const px = c * SPACING + (SPACING / 2)
          const py = r * SPACING + (SPACING / 2)

          const dx = px - mouse.x
          const dy = py - mouse.y
          const distSq = dx * dx + dy * dy
          const radiusSq = 22500 // 150px radius squared

          let alpha = 0.06
          let radius = 1.0
          let isHovered = false

          if (distSq < radiusSq) {
            const factor = 1 - Math.sqrt(distSq) / 150
            alpha = 0.06 + factor * 0.32
            radius = 1.0 + factor * 1.4
            isHovered = true
          }

          ctx.beginPath()
          ctx.arc(px, py, radius, 0, Math.PI * 2)
          ctx.fillStyle = isHovered
            ? `rgba(0, 240, 255, ${alpha})`
            : `rgba(242, 242, 238, ${alpha})`
          ctx.fill()
        }
      }

      // 2. Subtle Technical Micro-Telemetry Nodes
      if (!prefersReducedMotion) {
        ctx.font = '9px "JetBrains Mono", monospace'
        ctx.textBaseline = 'middle'

        for (let i = 0; i < telemetryNodes.length; i++) {
          const node = telemetryNodes[i]
          node.phase += node.speed
          const alpha = 0.08 + Math.sin(node.phase) * 0.08

          if (alpha > 0.02) {
            ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`
            ctx.fillText(node.label, node.x + 6, node.y + 6)

            // Accent crosshair tick
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.7})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(node.x - 3, node.y)
            ctx.lineTo(node.x + 3, node.y)
            ctx.moveTo(node.x, node.y - 3)
            ctx.lineTo(node.x, node.y + 3)
            ctx.stroke()
          }
        }
      }

      frameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
