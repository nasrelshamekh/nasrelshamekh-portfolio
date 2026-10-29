import React, { useEffect, useRef } from 'react'

export function AmbientMesh() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Handle high DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', handleResize)

    // Tech node grid
    const nodeCount = Math.floor(Math.min(width, 1440) / 32)
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        color: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#06b6d4' : '#38bdf8',
      })
    }

    const mouse = { x: -1000, y: -1000, radius: 180 }
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Gentle drift
        node.x += node.vx
        node.y += node.vy

        // Screen wrap
        if (node.x < 0) node.x = width
        if (node.x > width) node.x = 0
        if (node.y < 0) node.y = height
        if (node.y > height) node.y = 0

        // Mouse interaction: soft repulsion
        const dx = node.x - mouse.x
        const dy = node.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          node.x += (dx / dist) * force * 2.2
          node.y += (dy / dist) * force * 2.2
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.globalAlpha = node.baseAlpha
        ctx.fill()

        // Subtle network connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j]
          const ndx = node.x - nodeB.x
          const ndy = node.y - nodeB.y
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy)

          if (nDist < 120) {
            const alpha = (1 - nDist / 120) * 0.12
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.strokeStyle = '#a855f7'
            ctx.globalAlpha = alpha
            ctx.lineWidth = 0.65
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
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
        opacity: 0.65,
      }}
    />
  )
}
