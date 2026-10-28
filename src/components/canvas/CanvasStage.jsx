import React, { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { NeuralCore } from './NeuralCore'
import { NeuralLattice } from './NeuralLattice'
import { InteractiveRibbon } from './InteractiveRibbon'

function WarmUp() {
  const { gl, scene, camera } = useThree()
  useEffect(() => {
    try {
      if (gl.compileAsync) {
        gl.compileAsync(scene, camera).catch(() => {})
      } else {
        gl.compile(scene, camera)
      }
    } catch {}
  }, [gl, scene, camera])
  return null
}

export function CanvasStage() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        frameloop="never"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -3, 2]} intensity={2.0} color="#7928ca" />
        <pointLight position={[3, -2, 3]} intensity={1.8} color="#00f3ff" />

        <NeuralLattice />
        <InteractiveRibbon />
        <NeuralCore />

        <WarmUp />
      </Canvas>
    </div>
  )
}
