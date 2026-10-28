import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { pointer, twos } from '../../core/clock'

gsap.registerPlugin(ScrollTrigger)

export function NeuralCore() {
  const choreoGroup = useRef()
  const outerGroup = useRef()
  const coreMesh = useRef()
  const innerMesh = useRef()
  const ringsRef = useRef()

  // 3D Choreography coordinates across the scroll journey (Research Moment 4 & F3)
  const scrollTransform = useRef({
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotZ: 0,
  })

  useGSAP(() => {
    // Master scroll scrub timeline orchestrating the 3D core's position per chapter seamlessly without overlaps
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    // Chapter 01: Projects (Core gracefully glides to the right to frame cards)
    tl.to(scrollTransform.current, {
      x: 2.3,
      y: -0.3,
      z: -1.0,
      scale: 0.85,
      rotZ: 0.1,
      ease: 'sine.inOut',
      duration: 1,
    })
    // Rest framing cards during project scroll
    .to(scrollTransform.current, { duration: 0.4 })
    // Chapter 02: Manifesto (Core glides to the left behind the manifesto points)
    .to(scrollTransform.current, {
      x: -2.1,
      y: 0.4,
      z: -1.3,
      scale: 0.78,
      rotZ: -0.08,
      ease: 'sine.inOut',
      duration: 1,
    })
    // Rest behind manifesto
    .to(scrollTransform.current, { duration: 0.4 })
    // Chapter 03: Latent Playground (Core centers above the drawing pad)
    .to(scrollTransform.current, {
      x: 0,
      y: 1.5,
      z: -0.7,
      scale: 0.82,
      rotZ: 0,
      ease: 'sine.inOut',
      duration: 1,
    })
    // Rest above drawing pad
    .to(scrollTransform.current, { duration: 0.4 })
    // Chapter 04 & 05: Matrix, Terminal & Footer (Core recedes into subtle deep space)
    .to(scrollTransform.current, {
      x: 0,
      y: -0.7,
      z: -2.2,
      scale: 0.6,
      rotZ: 0.05,
      ease: 'sine.inOut',
      duration: 1,
    })
  })

  useFrame((state, delta) => {
    // 1. Update Scroll Choreography Group with frame-rate independent smooth damping
    if (choreoGroup.current) {
      const choreo = choreoGroup.current
      const lerp = 1 - Math.exp(-6 * delta)
      choreo.position.x += (scrollTransform.current.x - choreo.position.x) * lerp
      choreo.position.y += (scrollTransform.current.y - choreo.position.y) * lerp
      choreo.position.z += (scrollTransform.current.z - choreo.position.z) * lerp
      const curScale = choreo.scale.x
      choreo.scale.setScalar(curScale + (scrollTransform.current.scale - curScale) * lerp)
      choreo.rotation.z += (scrollTransform.current.rotZ - choreo.rotation.z) * lerp
    }

    if (!outerGroup.current) return

    // 2. Subtle, gentle cursor parallax offset
    const targetX = pointer.ndcX * 0.3
    const targetY = pointer.ndcY * 0.2

    const cursorLerp = 1 - Math.exp(-4 * delta)
    outerGroup.current.position.x += (targetX - outerGroup.current.position.x) * cursorLerp
    outerGroup.current.position.y += (targetY - outerGroup.current.position.y) * cursorLerp

    // 3. Majestic, cinematic slow rotation (~35s per full revolution)
    outerGroup.current.rotation.y += delta * 0.18
    outerGroup.current.rotation.x += delta * 0.08

    // 4. Spider-verse dual clock: inner core breathes gently on twos (12 fps)
    if (innerMesh.current) {
      const stepTime = twos.frame / 12
      const pulse = 1 + Math.sin(stepTime * 0.6) * 0.02
      innerMesh.current.scale.set(pulse, pulse, pulse)
      innerMesh.current.rotation.z = stepTime * 0.04
    }

    // 5. Subtle core counter-rotation
    if (coreMesh.current) {
      coreMesh.current.rotation.y -= delta * 0.12
    }

    // 6. Gentle orbital ring precession
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.14
      ringsRef.current.rotation.z += delta * 0.07
    }
  })

  return (
    <group ref={choreoGroup} position={[0, 0, 0]}>
      <group ref={outerGroup} position={[0, 0, 0]}>
        {/* Serene zero-g ambient float */}
        <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.1}>
          
          {/* Outer Organic Neural Core - slow, liquid morph */}
          <mesh ref={coreMesh} scale={1.4}>
            <icosahedronGeometry args={[1.2, 8]} />
            <MeshDistortMaterial
              color="#2a45ff"
              emissive="#0d1f73"
              distort={0.14}
              speed={0.8}
              roughness={0.15}
              metalness={0.9}
              clearcoat={1}
              clearcoatRoughness={0.1}
              wireframe={false}
            />
          </mesh>

          {/* Inner Geometric Latent Kernel (Stepped on twos) */}
          <mesh ref={innerMesh} scale={0.75}>
            <octahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial
              color="#00f3ff"
              emissive="#00b4d8"
              emissiveIntensity={0.8}
              wireframe={true}
              roughness={0.3}
            />
          </mesh>

          {/* Quantum Orbital Halo Rings */}
          <group ref={ringsRef}>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[2.2, 0.015, 16, 100]} />
              <meshBasicMaterial color="#5078ff" transparent opacity={0.6} />
            </mesh>
            <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
              <torusGeometry args={[2.5, 0.012, 16, 100]} />
              <meshBasicMaterial color="#00ffcc" transparent opacity={0.4} />
            </mesh>
            <mesh rotation={[Math.PI / 2.2, -Math.PI / 5, 0]}>
              <torusGeometry args={[2.8, 0.01, 16, 100]} />
              <meshBasicMaterial color="#b5179e" transparent opacity={0.3} />
            </mesh>
          </group>

        </Float>
      </group>
    </group>
  )
}
