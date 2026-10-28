// Core 3D Manifold Synthesis Engine
// Bridges 2D gestural vector strokes into parametric 3D Catmull-Rom splines

export const NUM_KNOTS = 48

export function getDefaultKnotPoints() {
  const pts = []
  for (let i = 0; i < NUM_KNOTS; i++) {
    const u = (i / NUM_KNOTS) * Math.PI * 2
    const x = Math.sin(u) * 2.8 + Math.sin(u * 2) * 0.5
    const y = Math.cos(u * 2) * 1.2
    const z = Math.cos(u) * 2.2
    pts.push({ x, y, z })
  }
  return pts
}

// Current reactive state
let currentKnots = getDefaultKnotPoints()
let isSynthesized = false
let currentMetadata = {
  samples: 0,
  isClosed: true,
  curvature: '0.00',
  topology: 'DEFAULT TORUS KNOT',
  dimensions: 4096,
  tubeRadius: 0.035,
}

const subscribers = new Set()

export function subscribeManifold(fn) {
  subscribers.add(fn)
  // Immediately send initial state
  fn({
    knots: currentKnots,
    isClosed: currentMetadata.isClosed,
    isSynthesized,
    metadata: currentMetadata,
    immediate: true,
  })
  return () => subscribers.delete(fn)
}

function notifySubscribers(payload) {
  subscribers.forEach((fn) => {
    try {
      fn(payload)
    } catch (err) {
      console.warn('Manifold subscriber error:', err)
    }
  })
}

/**
 * Resamples discrete 2D points into NUM_KNOTS 3D points
 * and projects depth via harmonic manifolds & stochastic temperature.
 */
export function synthesizeManifold(rawPoints, bounds, { temperature = 0.7, latentDims = 4096 } = {}) {
  if (!rawPoints || rawPoints.length < 4) return null

  // 1. Calculate cumulative path distance
  const dists = [0]
  for (let i = 1; i < rawPoints.length; i++) {
    const dx = rawPoints[i][0] - rawPoints[i - 1][0]
    const dy = rawPoints[i][1] - rawPoints[i - 1][1]
    dists.push(dists[i - 1] + Math.hypot(dx, dy))
  }
  const totalDist = dists[dists.length - 1]
  if (totalDist < 8) return null

  // 2. Uniformly resample to fixed NUM_KNOTS for smooth morphing
  const sampled = []
  let segIdx = 0
  for (let i = 0; i < NUM_KNOTS; i++) {
    const targetDist = (i / (NUM_KNOTS - 1)) * totalDist
    while (segIdx < dists.length - 2 && dists[segIdx + 1] < targetDist) {
      segIdx++
    }
    const segStart = dists[segIdx]
    const segEnd = dists[segIdx + 1]
    const segLen = segEnd - segStart || 1
    const t = Math.max(0, Math.min(1, (targetDist - segStart) / segLen))

    const p0 = rawPoints[segIdx]
    const p1 = rawPoints[segIdx + 1]
    const x = p0[0] + (p1[0] - p0[0]) * t
    const y = p0[1] + (p1[1] - p0[1]) * t
    const pr = (p0[2] || 0.5) + ((p1[2] || 0.5) - (p0[2] || 0.5)) * t
    sampled.push([x, y, pr])
  }

  // 3. Coordinate normalization relative to drawing pad
  const width = bounds?.width || 500
  const height = bounds?.height || 380
  const cx = width / 2
  const cy = height / 2
  const hw = width / 2
  const hh = height / 2

  // Determine if path forms a closed loop or open stream
  const firstPt = sampled[0]
  const lastPt = sampled[sampled.length - 1]
  const endDist = Math.hypot((lastPt[0] - firstPt[0]) / hw, (lastPt[1] - firstPt[1]) / hh)
  const isClosed = endDist < 0.38

  if (isClosed) {
    sampled[sampled.length - 1] = [firstPt[0], firstPt[1], firstPt[2]]
  }

  // 4. Project into 3D Cartesian coordinates
  const knots3d = []
  let totalCurvature = 0

  for (let i = 0; i < NUM_KNOTS; i++) {
    const [px, py, pr] = sampled[i]
    const nx = (px - cx) / hw
    const ny = -(py - cy) / hh
    const u = i / (NUM_KNOTS - 1)

    // Spatial dimensions framing the scene
    const x3 = nx * 3.4
    const y3 = ny * 2.3

    // Synthesized depth wave from harmonic harmonics and temperature
    const freq1 = 1.0 + temperature * 2.2
    const freq2 = 2.0 + temperature * 3.5
    const amp1 = 0.85 + temperature * 0.95
    const amp2 = 0.35 * temperature

    const waveZ = Math.sin(u * Math.PI * 2 * freq1) * amp1 + Math.cos(u * Math.PI * 2 * freq2) * amp2
    const pressureDepth = (pr - 0.5) * 1.3
    const z3 = waveZ + pressureDepth

    knots3d.push({ x: x3, y: y3, z: z3 })

    if (i > 1) {
      const prev = knots3d[i - 1]
      const prevPrev = knots3d[i - 2]
      const dx1 = prev.x - prevPrev.x
      const dy1 = prev.y - prevPrev.y
      const dx2 = x3 - prev.x
      const dy2 = y3 - prev.y
      totalCurvature += Math.abs(Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1))
    }
  }

  const avgCurvature = (totalCurvature / (NUM_KNOTS - 2)).toFixed(2)
  const tubeRadius = 0.03 + (latentDims / 8192) * 0.025

  currentKnots = knots3d
  isSynthesized = true
  currentMetadata = {
    samples: rawPoints.length,
    isClosed,
    curvature: avgCurvature,
    topology: isClosed ? 'CLOSED 3D TORUS' : 'OPEN STREAM MANIFOLD',
    dimensions: latentDims,
    tubeRadius,
  }

  notifySubscribers({
    knots: currentKnots,
    isClosed,
    isSynthesized: true,
    metadata: currentMetadata,
    immediate: false,
  })

  return currentMetadata
}

export function resetManifold() {
  currentKnots = getDefaultKnotPoints()
  isSynthesized = false
  currentMetadata = {
    samples: 0,
    isClosed: true,
    curvature: '0.00',
    topology: 'DEFAULT TORUS KNOT',
    dimensions: 4096,
    tubeRadius: 0.035,
  }

  notifySubscribers({
    knots: currentKnots,
    isClosed: true,
    isSynthesized: false,
    metadata: currentMetadata,
    immediate: false,
  })

  return currentMetadata
}

export function getManifoldState() {
  return {
    knots: currentKnots,
    isSynthesized,
    metadata: currentMetadata,
  }
}
