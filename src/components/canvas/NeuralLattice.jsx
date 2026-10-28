import React, { useRef, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { pointer } from '../../core/clock'

const COUNT = 1000

export function NeuralLattice() {
  const meshRef = useRef()
  const dummy = useRef(new THREE.Object3D())

  // Generate deterministic points in a spherical 3D volume
  const particles = useRef([])

  useLayoutEffect(() => {
    particles.current = Array.from({ length: COUNT }, (_, i) => {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = Math.cbrt(Math.random()) * 8 + 1.5

      const sinPhi = Math.sin(phi)
      const x = r * sinPhi * Math.cos(theta)
      const y = r * sinPhi * Math.sin(theta)
      const z = r * Math.cos(phi)

      return {
        origin: new THREE.Vector3(x, y, z),
        pos: new THREE.Vector3(x, y, z),
        // Ultra-slow harmonic drift (barely perceptible cosmic drift)
        speed: 0.015 + Math.random() * 0.025,
        offset: Math.random() * Math.PI * 2,
        scale: 0.018 + Math.random() * 0.03,
      }
    })

    const mesh = meshRef.current
    if (!mesh) return

    particles.current.forEach((p, i) => {
      dummy.current.position.copy(p.pos)
      dummy.current.scale.setScalar(p.scale)
      dummy.current.updateMatrix()
      mesh.setMatrixAt(i, dummy.current.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [])

  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const t = state.clock.getElapsedTime()
    const d = dummy.current

    // Ultra-slow cosmic rotation (almost static, very peaceful)
    mesh.rotation.y = t * 0.002
    mesh.rotation.x = Math.sin(t * 0.001) * 0.01

    // Soft cursor repulsion
    const mouseX = pointer.ndcX * 3
    const mouseY = pointer.ndcY * 2

    particles.current.forEach((p, i) => {
      // Extremely gentle micro-oscillation
      const py = p.origin.y + Math.sin(t * p.speed + p.offset) * 0.06
      const px = p.origin.x + Math.cos(t * p.speed + p.offset) * 0.04
      const pz = p.origin.z

      // Distance to cursor
      const dx = px - mouseX
      const dy = py - mouseY
      const distSq = dx * dx + dy * dy

      let scale = p.scale
      if (distSq < 2.0) {
        scale *= 1.3
      }

      d.position.set(px, py, pz)
      d.scale.setScalar(scale)
      d.updateMatrix()
      mesh.setMatrixAt(i, d.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#8da4c4"
        transparent
        opacity={0.45}
      />
    </instancedMesh>
  )
}
