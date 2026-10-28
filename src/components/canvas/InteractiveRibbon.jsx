import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { pointer } from '../../core/clock'

export function InteractiveRibbon() {
  const curvePoints = useRef([])
  const meshRef = useRef()

  // Initialize a smooth 3D bezier knot as default latent stream
  const initialCurve = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 30; i++) {
      const u = (i / 30) * Math.PI * 2
      const x = Math.sin(u) * 2.8 + Math.sin(u * 2) * 0.5
      const y = Math.cos(u * 2) * 1.2
      const z = Math.cos(u) * 2.2
      pts.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(pts, true)
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.003
    meshRef.current.rotation.z = Math.sin(t * 0.002) * 0.008
  })

  return (
    <group position={[0, 0, -1]}>
      <mesh ref={meshRef}>
        <tubeGeometry args={[initialCurve, 80, 0.035, 8, true]} />
        <meshStandardMaterial
          color="#00f5d4"
          emissive="#00bbf9"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}
