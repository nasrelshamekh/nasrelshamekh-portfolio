import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { subscribeManifold, getDefaultKnotPoints, NUM_KNOTS } from '../../core/manifold'

gsap.registerPlugin(ScrollTrigger)

export function InteractiveRibbon() {
  const choreoGroup = useRef()
  const meshRef = useRef()
  const materialRef = useRef()

  // Dynamic Knots State for 60fps Morphing
  const activeKnotsRef = useRef(getDefaultKnotPoints().map((p) => new THREE.Vector3(p.x, p.y, p.z)))
  const fromKnotsRef = useRef(getDefaultKnotPoints().map((p) => new THREE.Vector3(p.x, p.y, p.z)))
  const toKnotsRef = useRef(getDefaultKnotPoints().map((p) => new THREE.Vector3(p.x, p.y, p.z)))

  const isMorphingRef = useRef(false)
  const morphProgressRef = useRef(1)
  const isClosedRef = useRef(true)
  const currentRadiusRef = useRef(0.035)
  const targetRadiusRef = useRef(0.035)
  const emissivePulseRef = useRef(0.6)
  const targetEmissiveRef = useRef(0.6)
  const spinBoostRef = useRef(0)

  // 3D Choreography coordinates across chapters (aligned with NeuralCore)
  const scrollTransform = useRef({
    x: 0,
    y: 0,
    z: -1,
    scale: 1,
    rotZ: 0,
  })

  // Initial curve construction
  const initialCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3(activeKnotsRef.current, true)
  }, [])

  // Subscribe to manifold engine updates
  useEffect(() => {
    const unsubscribe = subscribeManifold(({ knots, isClosed, isSynthesized, metadata, immediate }) => {
      const targetVecs = knots.map((p) => new THREE.Vector3(p.x, p.y, p.z))
      targetRadiusRef.current = metadata?.tubeRadius || 0.035

      if (immediate) {
        activeKnotsRef.current = targetVecs
        isClosedRef.current = isClosed
        return
      }

      // Snapshot current positions to start smooth interpolation
      fromKnotsRef.current = activeKnotsRef.current.map((p) => p.clone())
      toKnotsRef.current = targetVecs
      isClosedRef.current = isClosed
      morphProgressRef.current = 0
      isMorphingRef.current = true

      // Trigger luminous reaction on synthesis
      if (isSynthesized) {
        emissivePulseRef.current = 1.9
        targetEmissiveRef.current = 0.85
        spinBoostRef.current = 0.35
      } else {
        emissivePulseRef.current = 1.2
        targetEmissiveRef.current = 0.6
        spinBoostRef.current = 0.15
      }
    })

    return unsubscribe
  }, [])

  // Master scroll scrub timeline
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    // Chapter 01: Projects (frames cards)
    tl.to(scrollTransform.current, {
      x: 2.1,
      y: -0.3,
      z: -1.2,
      scale: 0.9,
      rotZ: 0.1,
      ease: 'sine.inOut',
      duration: 1,
    })
      .to(scrollTransform.current, { duration: 0.4 })
      // Chapter 02: Manifesto (weaves behind text)
      .to(scrollTransform.current, {
        x: -2.0,
        y: 0.4,
        z: -1.4,
        scale: 0.82,
        rotZ: -0.08,
        ease: 'sine.inOut',
        duration: 1,
      })
      .to(scrollTransform.current, { duration: 0.4 })
      // Chapter 03: Latent Playground (Elevates to frame gesture lab)
      .to(scrollTransform.current, {
        x: 0,
        y: 1.1,
        z: -0.5,
        scale: 1.15,
        rotZ: 0,
        ease: 'sine.inOut',
        duration: 1,
      })
      .to(scrollTransform.current, { duration: 0.4 })
      // Chapter 04 & 05: Terminal & Footer (Recedes smoothly)
      .to(scrollTransform.current, {
        x: 0,
        y: -0.7,
        z: -2.2,
        scale: 0.65,
        rotZ: 0.05,
        ease: 'sine.inOut',
        duration: 1,
      })
  })

  useFrame((state, delta) => {
    // 1. Frame-rate independent scroll damping
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

    if (!meshRef.current) return

    // 2. Smooth 60fps Morphing Interpolation
    if (isMorphingRef.current) {
      morphProgressRef.current += delta * 1.6 // ~0.62s transition
      const rawP = Math.min(morphProgressRef.current, 1)
      // Smooth cosine ease
      const ease = 0.5 - 0.5 * Math.cos(rawP * Math.PI)

      for (let i = 0; i < NUM_KNOTS; i++) {
        activeKnotsRef.current[i].lerpVectors(fromKnotsRef.current[i], toKnotsRef.current[i], ease)
      }

      currentRadiusRef.current += (targetRadiusRef.current - currentRadiusRef.current) * ease

      // Rebuild geometry with active knot positions
      try {
        const curve = new THREE.CatmullRomCurve3(activeKnotsRef.current, isClosedRef.current)
        meshRef.current.geometry.dispose()
        meshRef.current.geometry = new THREE.TubeGeometry(
          curve,
          84,
          currentRadiusRef.current,
          8,
          isClosedRef.current
        )
      } catch (err) {
        console.warn('Tube update error:', err)
      }

      if (rawP >= 1) {
        isMorphingRef.current = false
      }
    }

    // 3. Majestic 3D Orbit & Harmonic Rotation
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y += delta * (0.07 + spinBoostRef.current)
    meshRef.current.rotation.x = Math.sin(t * 0.04) * 0.12
    meshRef.current.rotation.z = Math.cos(t * 0.03) * 0.08

    // Decay spin boost
    if (spinBoostRef.current > 0.001) {
      spinBoostRef.current *= Math.exp(-2.5 * delta)
    } else {
      spinBoostRef.current = 0
    }

    // 4. Luminous Emissive Reaction Damping
    if (materialRef.current) {
      const eLerp = 1 - Math.exp(-4 * delta)
      emissivePulseRef.current += (targetEmissiveRef.current - emissivePulseRef.current) * eLerp
      materialRef.current.emissiveIntensity = emissivePulseRef.current
    }
  })

  return (
    <group ref={choreoGroup} position={[0, 0, -1]}>
      <mesh ref={meshRef}>
        <tubeGeometry args={[initialCurve, 84, 0.035, 8, true]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#00f5d4"
          emissive="#00bbf9"
          emissiveIntensity={0.6}
          roughness={0.18}
          metalness={0.82}
        />
      </mesh>
    </group>
  )
}
