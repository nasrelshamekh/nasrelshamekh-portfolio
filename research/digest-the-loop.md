# The Loop: technique digest

2026-10-07 · for concept A "The Loop" (`docs/concepts/2026-10-07-osloop-concepts.md`) · phase 1 = entrance + landing page

**Colour ("we need the same royal blue").** Ink = **`#0B3CB7`**, checked against the file: it is the colour of 237,038 opaque pixels in `docs/audit/raw/images/Osloop---LOGO-01-01-1.png`. The fold shadow where the logo's ∞ passes under itself is about `#0A36A4`. Rough blue = `color-mix(in srgb, #0B3CB7 35%, white)` = **`#AABBE6`**, which is exactly the value in the concept (a 35 % tint). Every recipe below uses these two. Red pencil is only for annotations.

**How this was made, so you know what to trust**
- 15 Codrops articles from `arva-references/codrops-clusters.json`, read in full in real Chrome. WebFetch and curl both get a Cloudflare 403. One of them (noisy strokes) is only a video stream, so its idea is reconstructed here, not quoted.
- 8 Made With GSAP previews, watched as 30-frame sheets in `mwg/sheets/NNN.jpg`. MWG code is members-only. What's free is the title, the intro and the HTML markup, so the MWG "recipes" here are rebuilt from preview + intro + markup, not copied.
- 2 demo captures with the peek tool. itomdev.com worked. luminhands.netlify.app timed out (unreachable from here).
- **All costs are estimates, not profiled.** Every moment still has to pass the M1 Pro gate: ≤ 2 full-screen raster layers, no full-screen filter/blend, ≤ 2 videos playing, p95 frame ≤ 16 ms at 4× CPU throttle.
- Five things the brief asked for have **no article in the list**: pencil boil, variable-width strokes, flipbook/page curl, zoetrope strobe, and capturing a pointer drawing. Those recipes are marked **(first-principles)**.

---

## 0. Foundations every moment uses

### F1. One clock, two frame rates
- **One requestAnimationFrame runs everything.** GSAP's ticker advances Lenis, then ScrollTrigger, then the drawn layers, then R3F (`<Canvas frameloop="never">` + `advance()`). HAOQI found that running Lenis and R3F on separate loops puts WebGL one frame behind the DOM on fast scrolls. On our site that frame is exactly the seam between the SVG O and the 3D O.
- **Drawn things run "on twos"**: a 12 fps clock (`twos.frame`). Their timelines are paused and get their time set to the stepped clock. Camera, UI, 3D and scroll stay at 60/120 fps. This is the concept's Spider-Verse rule, built in.
- **Chasing a target uses `k = 1 − e^(−damping·dt)`**, so it feels the same at 60 Hz and 120 Hz (from Drawing With Light). A plain lerp factor is visibly faster on a 120 Hz screen.

```js
// clock.js: one loop. Lenis → ScrollTrigger → drawn layers (12 fps) → R3F. Use <Canvas frameloop="never">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { advance } from '@react-three/fiber'
gsap.registerPlugin(ScrollTrigger)
export const lenis = new Lenis({ autoRaf: false })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.lagSmoothing(0)
export const twos = { frame: 0 }                       // the "drawn" clock: 12 drawings per second
const drawn = new Map()                                // paused timeline -> start time (s)
export const onTwos = (tl) => { tl.pause(); drawn.set(tl, gsap.ticker.time); return tl }
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)                               // 1. scroll
  const f = Math.floor(time * 12)
  if (f !== twos.frame) {                              // 2. drawn layers step only when a new drawing is due
    twos.frame = f
    drawn.forEach((t0, tl) => { tl.time(Math.max(0, f / 12 - t0)); if (tl.progress() === 1) drawn.delete(tl) })
  }
  advance(time * 1000)                                 // 3. WebGL last: it reads this frame's scroll and O
})
export const follow = (cur, target, damping, dt) => cur + (target - cur) * (1 - Math.exp(-damping * dt))
```

### F2. The pencil line: variable width and boil, no filters (first-principles)
- **An SVG stroke has one width. A pencil line is a filled outline around a centre line.** perfect-freehand's `getStroke()` turns points (with real or simulated pressure) into that outline polygon.
- **Draw-on** = rebuild the outline from the first *n* points on each drawing (`upTo`). The growing end tapers like a real pencil tip. DrawSVG can't do this (it animates strokes, not fills), and a mask would cost more.
- **Boil** = re-run with tiny seeded offsets (0.6–1.2 px) and cycle 3 seeds on twos. For a line that's finished, cache the 3 strings once and just swap `d`. **No `feTurbulence`/`feDisplacementMap`.** The gate bans full-screen filters, and filters on big areas are the slowest thing SVG does.
- **Grain**: two overlapping strokes at about 0.55 opacity with different seeds read as graphite (darker where they overlap). A paper-tooth pattern fill is optional; measure it before keeping it.
- **What makes it not look generated:** record the input points from Osloop's own animators drawing on a pen tablet (the capture code is in moment 8) and replay them with their real timing and pressure. Hand-drawing is one of their services; the site should run on their actual hands.

```js
// pencil.js: variable-width pencil line with boil. No SVG filters, no masks.
import { getStroke } from 'perfect-freehand'
const rnd = (n) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s) } // seeded 0..1
export function pencilPath(points, { size = 3.2, boil = 0.8, seed = 0, upTo = 1, closed = false } = {}) {
  const src = closed ? [...points, ...points.slice(1, 5)] : points             // loops: overlap the seam so no cap bulges
  const n = Math.max(2, Math.ceil(src.length * upTo))                          // progressive draw-on
  const pts = src.slice(0, n).map(([x, y, p], i) => [
    x + (rnd(seed * 131 + i) - 0.5) * boil,                                    // boil = the line re-drawn;
    y + (rnd(seed * 173 + i * 1.7) - 0.5) * boil, p ?? 0.5])                   // seeded, so 3 seeds = 3 drawings
  const outline = getStroke(pts, {
    size, thinning: 0.6, smoothing: 0.6, streamline: 0.35,
    simulatePressure: points[0][2] == null,                                    // real pen pressure when recorded
    start: { taper: closed ? 0 : size * 4 }, end: { taper: closed ? 0 : size * 8 }, last: upTo >= 1,
  })
  return toSvgPath(outline)
}
export function toSvgPath(o) {                                                 // README's midpoint-quadratic helper
  if (o.length < 4) return ''
  const f = (v) => v.toFixed(1), mid = (a, b) => `${f((a[0] + b[0]) / 2)},${f((a[1] + b[1]) / 2)}`
  let d = `M${f(o[0][0])},${f(o[0][1])} Q`
  for (let i = 0; i < o.length; i++) d += `${f(o[i][0])},${f(o[i][1])} ${mid(o[i], o[(i + 1) % o.length])} `
  return d + 'Z'
}
// finished lines: cache the 3 seeds once, then on twos: path.setAttribute('d', cached[twos.frame % 3])
```
- **Fill rule:** keep the default `nonzero`. The outline crosses itself wherever the line does (the ∞ crossover), and `evenodd` would punch holes there.
- **Cost (est.):** well under 1 ms for about 200 points, 12 times a second. A `d` change repaints only that path's box.
- **Mobile:** the same code; drop points closer than 3 px.
- **Sources:** perfect-freehand README (github.com/steveruizok/perfect-freehand); Codrops *Kinetic SVG Typography* (single-stroke paths, drawing order, three passes); Codrops *SplitText to MorphSVG* (scribbles drawn with Figma's pencil in the order they should animate).

### F3. The O has one owner per frame
- **One plain object `O = { x, y, r, sx, sy, rot }` in CSS pixels is the truth.** GSAP animates it. Every medium that can draw the O (SVG, WebGL, an overlay on video) reads it every frame, and only the current `owner` is visible.
- **Swap owners only on a frame where both media draw the O identically** (same rect, same silhouette, same colour). That is a match cut. *Persistent Page Transitions* states the same rule for its image planes: a rect is owned by DOM tracking or by a tween, never both at once.
- **Measure targets with `getBoundingClientRect`; never hardcode them** (*Persistent Page Transitions*, *Curved Path Animations*). HAOQI keeps this cheap: cache the rects, shift them by the scroll delta, and re-measure only items near the viewport each frame (far ones every 12 frames, staggered).
- **drei `<View>`** renders a 3D scene into a DOM element's rect on the one shared canvas. Use it whenever a 3D thing has to sit in the page layout.

```js
// o.js: one O, one owner per frame. GSAP animates O; renderers only read it.
export const O = { x: 0, y: 0, r: 40, sx: 1, sy: 1, rot: 0, owner: 'svg' }  // CSS px, viewport space
export const handOff = (to) => { O.owner = to }                             // only on a match-cut frame
export function drawSvgO(el) {                                              // call from the clock, before advance()
  el.style.visibility = O.owner === 'svg' ? 'visible' : 'hidden'
  if (O.owner === 'svg') el.setAttribute('transform',
    `translate(${O.x} ${O.y}) rotate(${O.rot}) scale(${(O.sx * O.r) / 40} ${(O.sy * O.r) / 40})`)
}
export function placeGlO(mesh, camera, size, depth = 10) {                  // in useFrame; camera looks down -Z
  mesh.visible = O.owner === 'gl'
  const k = (2 * Math.tan((camera.fov * Math.PI) / 360) * depth) / size.height   // world units per CSS px
  mesh.position.set(camera.position.x + (O.x - size.width / 2) * k,
    camera.position.y + (size.height / 2 - O.y) * k, camera.position.z - depth)
  mesh.scale.set(O.r * O.sx * k, O.r * O.sy * k, O.r * k)                  // unit sphere → r px on screen
  mesh.rotation.z = (-O.rot * Math.PI) / 180
}
```
- **Risk:** a single frame where the two media disagree shows as a pop. F1's single loop is what prevents it.

### F4. Warm up while the pencil draws; sort devices into tiers
- **Shaders compile on first use**, which would cause a hitch exactly when the zoetrope appears. Mount the 3D beats **visible but out of shot** during 0–2 s of Frame zero (Itom parked its rooms 500 units below the scene). Then call `gl.compileAsync(scene, camera)` and push textures with `gl.initTexture(t)`. Don't rely on `visible={false}`: three.js may skip invisible objects when compiling. Itom's warm-up removed every entry stutter on desktop; on weak devices they skip it to avoid losing the WebGL context.
- **No real-time shadows.** Itom's site "ran like a slideshow" until two shadow-casting lights were removed. Bake the shading into toon ramps or textures instead.
- **KTX2 broke hand-drawn textures** for Itom (shifted colours, softer lines). WebP kept them crisp. Test KTX2 on line art before committing to it.
- **Tiers:** decide at load from `deviceMemory`, `hardwareConcurrency` and viewport. Add drei `PerformanceMonitor` to drop DPR when frames slip, with `dpr={[1, 1.5]}`. Anything expensive stops when it's off-screen (HAOQI pauses its star pass out of view and renders it at half resolution every other frame).

```jsx
// WarmUp.jsx: compile shaders and upload textures for the 3D beats while the pencil is still drawing.
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
export function WarmUp({ textures = [], onReady }) {
  const { gl, scene, camera } = useThree()
  useEffect(() => {
    let alive = true
    textures.forEach((t) => gl.initTexture(t))                         // GPU upload now, not on first view
    const job = gl.compileAsync ? gl.compileAsync(scene, camera) : Promise.resolve(gl.compile(scene, camera))
    job.then(() => alive && onReady())
    return () => { alive = false }
  }, [])
  return null
}
// <Canvas frameloop="never" dpr={dpr}> <PerformanceMonitor onDecline={() => setDpr(1)} />
//   <group position={[0, -500, 0]}><Zoetrope /><ServicesProps /></group>   ← mounted out of shot
//   <WarmUp textures={[paperTex, toonRamp]} onReady={() => (ready.gl = true)} /> </Canvas>
```

### F5. Budget sheet (estimates)
| Moment | Canvas | Videos playing | Full-screen layers | Filters / blends |
|---|---|---|---|---|
| 1 Frame zero | 3.6–6.6 s only | 1 (5.6–6.6 s) | **2 at the slit→film beat** (canvas + video), otherwise ≤ 1 | none |
| 2 Hero ∞ | none | 0 | 0 | none |
| 3 أسلوب | none | 0 | 0 | one bounded SVG mask |
| 4 Ten media | shared canvas (3D stops only) | ≤ 1 scrubbed | ≤ 2 | one composite pass only during a transition |
| 5 Flipbooks | small 2D canvases | 0, then 1 when a book opens | 0 → 1 | none |
| 6 Storyboard | none | ≤ 1 scrubbed | ≤ 1 | none |
| 7 1.67M | 1 | 0 | 1 | none (alpha-test, no blending) |
| 8 Finale | 1 (in a film-frame rect via drei `View`) | 0 | 0–1 | none |

**Hard rule:** the paper tooth is a tiled `body` background, never a full-screen overlay with `mix-blend-mode`. That one overlay alone would break the gate. The WebGL canvas is transparent, so the DOM paper shows through and the two always match.

---

## 1. Frame zero: the entrance (three recipes)
Cost, mobile, cliché risk and sources for 1A–1C are combined at the end of 1C.

### 1A. Roughs, then the clean-up of the logo's ∞ (0–2.0 s)
- **Mechanism.**
  - Three rough gestures in rough blue: animator-recorded strokes (points, pressure and timing in JSON), replayed with `pencilPath(…, { upTo })` on twos and boiling.
  - The clean-up: the logo's ∞ as one centre line (from the SVG redraw of the logo, with path direction = drawing direction), drawn **twice with an offset**: graphite first, royal blue on top about 0.22 s later. That's the Kinetic SVG Typography trick (each path drawn in 3 colours with a small delay).
  - The contrast does the storytelling: the roughs are variable-width and boiling, the clean line is even and still. That *is* the clean-up pass.
  - The roughs step out on twos (opacity 0.6 → 0.3 → 0). A drawn erase, not a smooth fade.
- **The crossover.** Draw the under-strand with a 10–12 px paper-coloured gap where the over-strand crosses, the way an animator breaks a line. It mirrors the logo's fold shadow, and in moment 2 it lets the headline pass "under".
- **If loading runs long**, the O keeps hopping round the ∞ (1B loops). Never a number, never a bar.

```js
// Frame zero 0–2 s: roughs replayed from recorded animator strokes, then the ∞ cleaned up in two passes.
import { pencilPath } from './pencil'
import { onTwos } from './clock'
const roughs = await (await fetch('/strokes/infinity-roughs.json')).json()   // 3 strokes of [x, y, p, tMs]
const tl = gsap.timeline()
roughs.forEach((pts, i) => {
  const el = document.getElementById(`rough-${i}`), s = { k: 0 }
  tl.to(s, { k: 1, duration: pts.at(-1)[3] / 1000, ease: 'none',            // the animator's own timing
    onUpdate: () => el.setAttribute('d',
      pencilPath(pts, { upTo: s.k, seed: Math.floor(tl.time() * 12 + i) % 3, size: 2.6 })) }, i * 0.35)
})
tl.addLabel('clean', 1.2)
  .fromTo('#inf-graphite', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, ease: 'power2.inOut' }, 'clean')
  .fromTo('#inf-ink', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, ease: 'power2.inOut' }, 'clean+=0.22')
  .to('.rough', { opacity: 0.3, duration: 0.17, ease: 'steps(1)' }, 'clean+=0.5')
  .to('.rough', { opacity: 0, duration: 0.17, ease: 'steps(1)' })
onTwos(tl)                                                                    // the whole beat steps at 12 fps
```

### 1B. The bounce and its onion skins (2.0–3.6 s)
- **Mechanism.**
  - The O hops round the ∞: 6 hops, 6 drawings per hop (0.5 s per hop on twos).
  - Gravity is screen-down, and the lift is a parabola, so it travels in arcs, never straight.
  - Contact drawings **squash** (1.35 × 0.7, rotated to the line's tangent). The drawings either side of contact **stretch** (0.86 × 1.18). The apex drawings are round. That's the classic bouncing-ball chart.
  - **Every drawing is stamped as an onion skin**: a `<use>` clone in rough blue at that drawing's exact transform, with older stamps fading each drawing (× 0.82). A ring buffer of 24 keeps the DOM bounded and needs no canvas.
  - This is Codrops' *Animating in Frames* (N "movers" stepping along a path), except the movers stay behind instead of leaving.
- **Position** comes from `MotionPathPlugin.getPositionOnPath(raw, p, true)` on the same centre line. Measurements must be cached first; the GSAP docs say so explicitly.

```js
// Frame zero 2.0–3.6 s: the O hops round the ∞ on twos; every drawing stays behind as a blue onion skin.
const raw = MotionPathPlugin.getRawPath('#inf-centre')
MotionPathPlugin.cacheRawPathMeasurements(raw)                    // required before getPositionOnPath
const HOPS = 6, PER_HOP = 6, H = 48                               // 6 drawings per hop = 0.5 s at 12 fps
const skins = Array.from({ length: 24 }, () => svg.appendChild(skinTemplate.cloneNode()))
let n = 0
export function drawBounce(k) {                                   // k = drawing number since the bounce began
  const hop = Math.floor(k / PER_HOP), u = (k % PER_HOP) / PER_HOP
  const { x, y, angle } = MotionPathPlugin.getPositionOnPath(raw, ((hop + u) / HOPS) % 1, true)
  const contact = u === 0, near = u < 0.25 || u > 0.75
  const [sx, sy] = contact ? [1.35, 0.7] : near ? [0.86, 1.18] : [1, 1]   // squash / stretch / round
  const lift = 4 * H * u * (1 - u)                                // parabola: arcs, never straight
  Object.assign(O, { x, y: y - lift - O.r * sy, sx, sy, rot: contact ? angle : 0 })
  skins.forEach((s) => (s.style.opacity = (parseFloat(s.style.opacity) || 0) * 0.82))
  const s = skins[n++ % skins.length]
  s.setAttribute('transform', `translate(${O.x} ${O.y}) rotate(${O.rot}) scale(${sx} ${sy})`)
  s.style.opacity = 0.5
}
```

### 1C. Ghosts lift into a 3D zoetrope, then film, then the freeze (3.6–7 s)
- **Handoff (3.6 s).** Put 12 WebGL spheres at exactly the pixels of the latest 12 skins (F3's px→world maths; positions come from the stored transforms, no DOM reads). Flatten them (`scale.z ≈ 0.02`), make them unlit and rough blue, so they're identical to the SVG skins. Swap the owner in the same frame (skins hidden, spheres shown). The paper behind is the same DOM paper, because the canvas is transparent.
- **"The paper tilts away."** At the swap, a paper-textured plane in 3D lines up with the screen. Then the camera pitches back while the spheres fly to the drum slots along arcs (staggered). `scale.z` goes 0.02 → 1 and a uniform blends flat colour into toon light, so they literally gain volume.
- **The zoetrope (4.6–5.6 s).**
  - 12 drawings of one bounce sit in 12 slots of a slotted drum.
  - The spin-up is smooth, so you see a blur of balls. Then it **locks**: the drum rotates exactly one slot per drawing on the 12 fps clock.
  - Now the front slot shows drawing 1, 2, 3… and the ball bounces in place. No flashing light is needed; the stepping is the strobe.
  - On lock, set the base angle to the nearest slot multiple so it doesn't jump.
- **Film (5.6–6.6 s).**
  - A plane behind a slit carries a `VideoTexture` of the reel. The video is muted and `playsinline`, started about 5.2 s so frames are ready, and kept in the DOM at `opacity: 0` (not `display: none`).
  - The camera dollies through the slit until the plane exactly fills the viewport. On that frame the same `<video>` element becomes visible full-screen and the canvas stops rendering (F3 rule).
- **Freeze (6.6 s).**
  - Pause on a chosen frame (`requestVideoFrameCallback` tells you which frame is actually shown) and swap to an `<img>` of that exact frame (pre-extracted, crisp).
  - Then use `Flip` to turn its edges into the hero layout: frame border → nav rule, timecode → scroll progress.
- **Cut the "∞ slides in as the oo" beat.** It's "logo flying into the nav", which is on the user's list of generic patterns. The ∞ is already on screen at hero size. Leave it where it is as the hero's track (moment 2), and ink "os" and "p" around it in place (two-pass draw). The small nav logo simply appears on the freeze cut.

```jsx
// Zoetrope: 12 drawings of one bounce on a slotted drum. Stepping one slot per drawing makes them animate.
const N = 12, SLOT = (Math.PI * 2) / N, R = 2.2
export function Zoetrope({ locked, geometry }) {                 // locked: ref(bool) set by the Frame-zero timeline
  const drum = useRef(), balls = useRef(), m = new THREE.Matrix4()
  useLayoutEffect(() => {
    for (let i = 0; i < N; i++) {
      const u = i / N, h = 4 * u * (1 - u)                     // bounce height of drawing i
      const sq = u === 0 ? 0.7 : u < 0.2 || u > 0.8 ? 1.15 : 1   // squash on contact, stretch either side
      m.compose(new THREE.Vector3(Math.sin(i * SLOT) * R, 0.3 + h, Math.cos(i * SLOT) * R),
        new THREE.Quaternion(), new THREE.Vector3(0.3 / Math.sqrt(sq), 0.3 * sq, 0.3 / Math.sqrt(sq)))
      balls.current.setMatrixAt(i, m)
    }
    balls.current.instanceMatrix.needsUpdate = true
  }, [])
  useFrame((_, dt) => {
    const d = drum.current
    if (!locked.current) d.rotation.y += dt * 5                  // spin-up: smooth = blur
    else d.rotation.y = d.userData.base + twos.frame * SLOT      // locked: one slot per drawing = a 12 fps bounce
  })                                                             // on lock: base = nearest slot multiple (no jump)
  return (<group ref={drum} userData={{ base: 0 }}>
    <instancedMesh ref={balls} args={[geometry, null, N]}><meshToonMaterial color="#0B3CB7" gradientMap={toonRamp} /></instancedMesh>
    <SlottedDrum radius={R + 0.45} slots={N} /></group>)
}
```
- **Cost (est.).**
  - 0–3.6 s: SVG only, repainting small rects 12 times a second.
  - 3.6–6.6 s: one transparent full-screen canvas at DPR ≤ 1.5, about 5 draw calls (drum, 1 instanced draw for the balls, 1 outline hull, paper plane, film plane).
  - 5.6–6.6 s: canvas + video = **2 layers, exactly at the cap**. Stop rendering the canvas the moment the DOM video owns the screen.
  - Shaders must be warm by 2.0 s (F4).
- **Mobile.** DPR 1, 8 drum slots, no outline hull on the low tier, 720p H.264 reel. On a weak GPU, play a pre-rendered 24-frame WebP atlas of the 3.6–6.6 s beat instead. That's honest: a zoetrope is a loop of frames.
- **Cliché risk: medium.**
  - Zoetropes appeared in a 2013 Chrome experiment (the concept already notes this).
  - Igloo Inc's wireframe→solid opening is the near neighbour. Ours has to read as *animation being made* (bounce, onion skins, strobe), not "lines become geometry".
  - The logo-into-nav beat is cut (above).
- **Sources.** Codrops *Kinetic SVG Typography* (multi-pass draw); *Animating in Frames* (stepped movers along a path); *Scroll-Driven SVG Map* (dot riding the same path); *Sketching the Impossible* (warm-up, tiers, no shadows); *Persistent Page Transitions* + *HAOQI* (one owner, one loop). MWG **091** is a ring of planes spinning, built from nested DOM wrappers. That's the shape of a no-WebGL zoetrope fallback, as long as it steps instead of gliding.

---

## 2. The headline riding the ∞, bending to the cursor
- **Mechanism.**
  - The ∞ is 160 points sampled once from the logo's centre line (re-sampled on resize).
  - **The bend runs at full frame rate.** A damped spring follows the pointer, slightly under-damped (ζ ≈ 0.6) so it overshoots: follow-through. Each point is pulled toward the spring with a Gaussian falloff (σ ≈ 90 px, at most 35 % of the gap). Anticipation: when the pointer arrives fast, the line leans away for one drawing first.
  - **Boil runs on twos and gets harder near the pointer** (0.6 → about 2.2 px with the local bend). This is the Spider-Verse split: the drawing boils at 12, the physics moves at 60.
  - **Headline:** one span per glyph, placed by arc length on the bent polyline each frame and rotated to the local tangent. Keep the glyph train **shorter than half the loop**, and two glyphs can never be at the crossover at once. Glyphs on the under-strand slip under the over-strand's gap (the same break as 1A).
  - `<textPath>` (how MWG 032 and 059 do it) is fine for a static curve. It can't hide glyphs at the crossing, though, and it re-lays-out the text every frame once the path bends.
  - **Train speed** = base + scroll speed. MWG 104 bends its line with scroll speed; MWG 032 drives a sentence along an arc with scroll.
- **CTA "Start a project".** Press = squash (1.12 × 0.88 for 2 drawings), release = stretch, then an elastic settle.

```js
// Hero: the ∞ bends to the pointer (60 fps spring), boils on twos (harder near the pointer), carries the headline.
const base = sampleInfinity('#inf-centre', 160)                       // [[x, y], …] CSS px from the logo's ∞
const sp = { x: -1e4, y: 0, vx: 0, vy: 0 }, ptr = { x: -1e4, y: 0 }
const heroBox = () => { const r = hero.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY } }
let head = 0, hb = heroBox(); addEventListener('resize', () => (hb = heroBox()))   // hero's page offset
hero.addEventListener('pointermove', (e) => { ptr.x = e.pageX - hb.x; ptr.y = e.pageY - hb.y }) // not offsetX: target can be a glyph
gsap.ticker.add((t, dtMs) => {
  const dt = Math.min(dtMs / 1000, 1 / 30)
  sp.vx += ((ptr.x - sp.x) * 140 - sp.vx * 14) * dt; sp.x += sp.vx * dt   // ζ ≈ 0.6: overshoots a little
  sp.vy += ((ptr.y - sp.y) * 140 - sp.vy * 14) * dt; sp.y += sp.vy * dt
  let bend = 0
  const pts = base.map(([x, y]) => {
    const dx = sp.x - x, dy = sp.y - y, f = 0.35 * Math.exp(-(dx * dx + dy * dy) / 16200)  // σ = 90 px
    bend = Math.max(bend, f); return [x + dx * f, y + dy * f]
  })
  line.setAttribute('d', pencilPath(pts, { seed: twos.frame % 3, boil: 0.6 + 4.6 * bend, closed: true }))
  const L = [0]; for (let i = 1; i < pts.length; i++) L[i] = L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
  head = (head + (60 + Math.abs(lenis.velocity) * 30) * dt) % L.at(-1)    // px along the loop
  glyphs.forEach((g) => {                                                 // g.offset = sum of advances (< half the loop)
    const s = (((head - g.offset) % L.at(-1)) + L.at(-1)) % L.at(-1)
    let j = 1; while (L[j] < s) j++
    const a = Math.atan2(pts[j][1] - pts[j - 1][1], pts[j][0] - pts[j - 1][0])
    g.el.style.transform = `translate(${pts[j - 1][0]}px,${pts[j - 1][1]}px) rotate(${a}rad)`
  })
})
```
- **Cost (est.).** Per frame: 160-point map, arc-length table and about 40 glyph transforms, roughly 0.3–0.6 ms. Plus perfect-freehand on 160 points. At 4× throttle that's about 1–2 ms. To save it, skip the rebuild when the spring is at rest and reuse the 3 cached boil strings. The ∞'s box repaints while bending. No canvas, no video.
- **Mobile.** Use `touch-action: pan-y` on the hero so vertical scroll still works; a horizontal drag or press-and-hold bends the line. Train speed comes from scroll. At most 24 glyphs, set larger.
- **Cliché risk: medium.** Text-on-a-path marquees are stock (MWG 032, 059 and 098 are all templates of it), and "elastic line follows the cursor" is a known demo. What makes it ours: the track is the logo's ∞ with an animator's line break at the crossing, the line boils on twos, and the timing follows animation principles. **No mouse parallax in the hero.** Keep the red-pencil cursor tiny and functional (it's what the line reacts to), or drop it; custom cursors are on most award sites.
- **Sources.** MWG **032** (sentence on a curved path via `<textPath startOffset>`), **104** (straight line morphs toward a hidden sine path with scroll speed), **089** (headline bends into an arc with scroll velocity and springs back), **059**. Codrops *Curved Path Animations* (curves from measured positions, MotionPath + scrub, `invalidateOnRefresh`). *HAOQI* (one pointer source feeds every effect). *Drawing With Light* (frame-rate-independent damping).

---

## 3. أسلوب writes itself, morphs into osLoop, then cycles styles
- **The writing.**
  - **Assets:** (a) the calligraphy as filled outlines, hand-built by a calligrapher; (b) for each stroke, a **centre line in true pen order** (right to left, dots and hamza last) with the path direction matching the writing direction. Reverse paths in Illustrator with *Object → Path → Reverse Path Direction*.
  - **Writing = mask reveal.** The filled glyphs sit under a `<mask>` made of those centre lines, stroked wider than the widest calligraphic stroke. DrawSVG draws each one in sequence, so ink appears where the qalam passes.
  - **Don't DrawSVG the outlines.** That looks like tracing, not writing.
  - **The camera follows the nib.** A dot rides the active centre line (MotionPath), and the group moves by its inverse position through `gsap.quickTo`. This is the Codrops map recipe; MWG 059 shows the same idea with text. The ink steps on twos while the camera glides at 60 fps.
- **The morph.**
  - Use **explicit pairs** (split both sides into matching pieces: ا → the L stem, س → s, the loop of و → the ∞, ب → p). Dots and hamza shrink to points while the first "o" grows out of the O.
  - MorphSVG's docs don't say what happens when subpath counts differ, so don't rely on that.
  - Use `type: "rotational"` for the curly pairs and tune `shapeIndex`.
  - Step the morph (`ease: "steps(8)"`) so the in-betweens read as drawn, not vector-tweened.
- **The style loop (the graft from B).** Six treatments of the same wordmark `<symbol>` via `<use>`, swapped on twos while you scrub:
  - marker (stroke only, round caps, boiling);
  - flat 2D (royal-blue fill);
  - cartoon (fill + thick outline + hard offset shadow, which is a translated `<use>`);
  - extruded 3D (12 stacked `<use>` copies offset 1.5 px and darkening; fake but free);
  - VFX glitch (3 clip-path slices shifted for 2 drawings; no filters);
  - UI component (inside a rounded button with a pressed state).
- **Stats.** Single-stroke numerals (Inkscape's *Hershey Text* extension) drawn rough blue → graphite → royal blue, then inked into the heavy display face by a weight front travelling through them (MWG 079).

```js
// أسلوب: filled calligraphy revealed through a mask of pen-order centre lines; the view follows the nib.
// markup: <mask id="pen" maskUnits="userSpaceOnUse"><path class="pen" d="…"/>…(RTL, dots last)</mask>
//         <g class="world"><path d="…filled calligraphy…" mask="url(#pen)" fill="#0B3CB7"/><circle class="nib" r="5"/></g>
gsap.set('.pen', { fill: 'none', stroke: '#fff', strokeWidth: 46, strokeLinecap: 'round', drawSVG: '0%' })
const camX = gsap.quickTo('.world', 'x', { duration: 0.6, ease: 'power3' })   // camera on ones (smooth)
const camY = gsap.quickTo('.world', 'y', { duration: 0.6, ease: 'power3' })
const write = gsap.timeline({ paused: true, onUpdate: () => {
  camX(600 - gsap.getProperty('.nib', 'x')); camY(240 - gsap.getProperty('.nib', 'y')) } })
gsap.utils.toArray('.pen').forEach((pen) => {
  const d = pen.getTotalLength() / 900                                         // ≈ 900 px of ink per second
  write.to(pen, { drawSVG: '100%', duration: d, ease: 'power1.inOut' })
    .to('.nib', { motionPath: { path: pen.getAttribute('d') }, duration: d, ease: 'power1.inOut' }, '<') // raw d, no align:
    // pen paths sit in <mask> (not rendered, no CTM); userSpaceOnUse keeps them in .world's space; nib at cx=cy=0
    .to('.nib', { scale: 0.6, duration: 0.08, yoyo: true, repeat: 1 })         // pen lift between strokes
})
ScrollTrigger.create({ trigger: '.osloob', start: 'top 60%', once: true, onEnter: () => onTwos(write) })
// morph, one explicit pair at a time, stepped like drawings:
// gsap.to('#seen', { morphSVG: { shape: '#wm-s', type: 'rotational' }, duration: 0.67, ease: 'steps(8)' })
```
- **Cost (est.).** One SVG mask over a bounded box (about 1200 × 480 px). Masks re-rasterise the masked group on every repaint, so when the writing ends, swap the masked group for the plain filled path. Morphs change `d` 12 times a second. No canvas, no video.
- **Mobile.** Same, at 0.7 scale; camera follow at 1.2 × (less travel); 4 style treatments; shorter pin.
- **Cliché risk: medium–high if done lazily.**
  - "SVG text drawing itself" (DrawSVG on outlines) has been everywhere since about 2013, and it reads as tracing. Pen-order centre lines, calligraphic width and ink on twos are what make it writing.
  - Letter morphs look like vector tweens unless stepped and paired.
  - The style roulette can slide into an effects catalogue. Each style must be one of Osloop's services, in the services' order.
  - **A calligrapher must sign off the Arabic** (stroke order, joins, dots). Arabic readers, including the 1.67M channel's audience, will spot mistakes instantly.
- **Sources.** Codrops *Kinetic SVG Typography* (single-stroke fonts, path direction, multi-pass draw); Codrops *SplitText to MorphSVG* (`type: "rotational"` and `map: "complexity"` on stroked paths; draw paths in the order they should animate); Codrops *Scroll-Driven SVG Map* (DrawSVG + a dot on the same path + `quickTo` camera); *Green Stack* (variable fonts as motion). MWG **059** (the view follows the writing point; an oversized SVG + textPath), **098** (letters type along arcs that straighten), **079** (weight front = ink pass).

---

## 4. One ball, ten media (services)
- **Mechanism.**
  - One pinned, scrubbed timeline. Every stop names **who draws the O** (`svg`, `gl` or `video`, per F3), and every stop starts with a **medium-specific entrance**. The transition is the content.
  - The owner is derived from `currentLabel()` in `onUpdate`, so scrubbing backwards hands the O back correctly. Design each entrance so its first frame is the match-cut frame.
- **What each stop uses.**
  - **Whiteboard / pencil / VFX:** scrubbed clips. KAI's encode makes `video.currentTime` scrub smoothly: `-c:v libx264 -profile:v baseline -g 12 -keyint_min 12 -sc_threshold 0 -bf 0 -refs 1 -tune fastdecode -an -movflags +faststart`. For Firefox, KAI decodes frames with WebCodecs (mediabunny `VideoSampleSink.getSample(sec)` → canvas → texture). The O follows **pre-tracked positions exported as JSON**, the way KAI synced its 3D lines to footage from Blender.
  - **Cartoon (ink & paint):** Itom's PaintRevealMaterial (extend `MeshBasicMaterial` with `onBeforeCompile`, then a noise-thresholded reveal from a sketch texture to a painted one), or in SVG a clip-path circle with a wobbly edge growing from the brush point.
  - **3D / product:** the shared canvas, mounted lazily. Tripo.ai models need clean-up first: decimate, use one 1–2k texture, bake lighting.
  - **Two scenes mixing:** if a stop needs two scenes blended (for example, a marker wipe from video into 3D), use one composite pass at reduced resolution **only during the transition** (Composite Rendering), then go back to rendering directly.

```js
// Services: one pinned, scrubbed timeline. Each stop names who draws the O; its entrance IS the transition.
const ALL = [
  ['whiteboard', 'video', markerWipe], ['pencil', 'video', redraw],  ['cartoon', 'svg', inkAndPaint],
  ['motion', 'svg', geometrySnap],     ['3d', 'gl', extrude],         ['product', 'gl', turntable],
  ['vfx', 'video', composite],         ['ui', 'svg', becomeButton],   ['web', 'svg', rollIntoBrowser],
  ['back', 'svg', markerWipe],
]
const small = matchMedia('(max-width: 700px)').matches
const stops = small ? ALL.filter((_, i) => [0, 2, 4, 6, 8].includes(i)) : ALL
const tl = gsap.timeline({
  scrollTrigger: { trigger: '#services', pin: true, scrub: 0.5, end: () => `+=${innerHeight * stops.length * 0.55}` },
  onUpdate() { handOff(stops.find(([id]) => id === this.currentLabel())?.[1] ?? 'svg') },   // safe in both directions
})
stops.forEach(([id, , enter]) => {
  tl.addLabel(id)
  tl.add(enter(O), id)                                   // returns a timeline: the medium change, drives O + layers
  tl.to(O, { ...pose[id], duration: 1, ease: 'none' })   // the O's small performance at this stop
})
// video stops: clip.currentTime = localProgress * clip.duration (short-GOP encode above)
```
- **Cost (est.).** At any moment: at most one WebGL canvas (the persistent one from Frame zero) **or** one scrubbed video, plus small SVG. Load clips one stop ahead (≤ about 3 MB each at 720p). Scroll length: 10 stops × 0.55 viewports ≈ 5.5 viewports. Longer than that and it tires.
- **Mobile.** 5 stops (whiteboard, cartoon, 3D, VFX, web), scrub 0.3, clips at 540p, 3D at DPR 1.
- **Cliché risk: medium.** A pinned scroll-scrubbed sequence is the Apple-product-page pattern. It's justified only because every stop is a different medium and the O carries the eye. The chapter's own entrance and exit must also be medium changes ("sections without transitions" is on the user's list).
- **Sources.** *Persistent Page Transitions* (one owner; keep/remove/add; measured rects; a lock during transitions); *HAOQI* (one loop, rect sampler); *KAI* (scrub encode, WebCodecs fallback, Blender-exported tracks); *Sketching the Impossible* (`onBeforeCompile` paint reveal); *Composite Rendering* (one composite pass with a mask uniform); *Drawing With Light* (extrude/reveal by radius). MWG **059** (camera follows a path), **104** (velocity bend).

---

## 5. Thumbing a flipbook of real work (first-principles + MWG)
- **Mechanism.**
  - A book is **one sprite atlas plus one small `<canvas>`** (for example 48 frames, 6 × 8, 320 × 180 each). No video until it's opened.
  - **Drag speed is playback speed.** Observer's `velocityX` (px/s) maps to frames/s. On release, the speed decays like a thumb letting go (`vel *= e^(−2.5·dt)`).
  - Only draw when the page actually changes, and only while on screen.
  - **Page riffle:** a CSS variable `--riffle` (0–1) fans 3 page-edge divs and lifts the corner. For slow thumbing, one "turning page" div hinges on its bound edge with CSS 3D (the MWG 074 hinge; front/back faces).
  - **Hover:** the book lifts a few px with anticipation (dips first) and the pages ruffle by overlap (stagger), then settle.
  - **Open:** 8 page snapshots fly up along 2-point MotionPath arcs with a little overshoot (*Thumbnail Flow*: a waypoint plus `curviness` ≈ 0.45) into the player rect measured with `Flip.fit`. The last page becomes the video poster and the film plays (one video).

```js
// Flipbook: one sprite atlas + one small <canvas>. Thumb speed = playback speed; let go and it coasts to a stop.
export async function flipbook(canvas, url, { cols = 6, rows = 8, frames = 48 } = {}) {
  const img = await createImageBitmap(await (await fetch(url)).blob())      // decoded off the main thread
  const fw = img.width / cols, fh = img.height / rows, ctx = canvas.getContext('2d')
  let pos = 0, vel = 0, shown = -1, held = false, onScreen = false
  new IntersectionObserver(([e]) => (onScreen = e.isIntersecting)).observe(canvas)
  Observer.create({ target: canvas, type: 'pointer,touch', dragMinimum: 2,
    onPress: () => (held = true), onRelease: () => (held = false),
    onDrag: (self) => (vel = -self.velocityX / 50) })                        // drag toward the spine = forward
  gsap.ticker.add((t, dtMs) => {
    if (!onScreen) return
    const dt = dtMs / 1000
    if (!held) vel *= Math.exp(-2.5 * dt)                                    // released thumb: pages slow down
    pos = (((pos + vel * dt) % frames) + frames) % frames
    canvas.style.setProperty('--riffle', Math.min(Math.abs(vel) / 30, 1).toFixed(2))  // CSS fans the page edges
    const f = Math.floor(pos)
    if (f === shown) return                                                  // draw only when the page changes
    shown = f
    ctx.drawImage(img, (f % cols) * fw, Math.floor(f / cols) * fh, fw, fh, 0, 0, canvas.width, canvas.height)
  })
}
```
- **Cost (est.).** Per book: a 1920 × 1440 WebP atlas, about 150–350 KB to download and **about 11 MB decoded**. Keep ≤ 6 decoded; the others show a static cover until they're near the viewport. One `drawImage` per page change. No WebGL (the shared canvas sleeps), 0 videos until a book opens, then 1.
- **Mobile.** Swipe on the book = thumb; tap = open; press-and-hold = ruffle. 24-frame atlases at 256 × 144, two books per row.
- **Cliché risk: medium.** Drag-to-scrub thumbnails exist widely. **Books you can drag around the desk = the "plain draggable deck" the user rejected**, so the drag must change *time*, never *position*. The hover lift must not become a tilt-to-cursor (that's mouse parallax). If you use the MWG 074 hinge, use it only for a page turn, never for a pinned stack of cards.
- **Sources.** *KAI* (scrubbing; if a book uses video instead of an atlas, use their encode; WebCodecs fallback); *HAOQI* (atlas + per-instance `uvRect` pattern; stop work off-screen); *Thumbnail Flow* (2-point MotionPath arcs for pages flying up); *Persistent Page Transitions* (book rect → player rect, never hardcoded). MWG **038** (image swaps per scroll step "like a flick book"), **074** (bottom-edge hinge, back face takes over), **110** (double-sided flip).

---

## 6. Storyboard to final shot, with sound
- **Mechanism.**
  - **One pinned stage, not a sideways gallery.** A strip of 7 panels lies in frame. As you scroll, each panel *develops into the next stage in place* while the strip slides to the next panel. The transformation carries the eye, not the sideways movement.
  - **The panels:** typed script (SplitText chars, on twos) → blue-pencil board (`pencilPath` growing, rough blue) → inked frame (graphite + royal-blue double pass) → the voice-over **waveform drawn as the same pencil line** (peaks precomputed to JSON → points → `pencilPath` with `upTo`) → the animated shot (a scrubbed short-GOP clip inside the panel) → the VFX pass (the comp revealed over the plate along a **drawn** wipe line using a clip-path polygon, not a before/after slider, no blend modes) → sound.
- **Sound** (opt-in, never autoplay): one `AudioContext` created on the user's click; 5 one-shots on timeline labels (forward scroll only). A pencil-scratch loop's volume follows scroll speed with a fast attack and slow release, the same smoothing HAOQI uses for velocity. A visible mute toggle.

```js
// Opt-in Foley. One AudioContext after a click; one-shots on labels (forward only); scratch loop follows scroll speed.
let ac, out, scratchGain
const buf = {}
export async function enableSound() {
  ac = new AudioContext(); out = ac.createGain(); out.connect(ac.destination)
  await Promise.all(['pencil', 'paper', 'whoosh', 'boing', 'scratch'].map(async (n) =>
    (buf[n] = await ac.decodeAudioData(await (await fetch(`/sfx/${n}.m4a`)).arrayBuffer()))))
  const loop = ac.createBufferSource(); loop.buffer = buf.scratch; loop.loop = true
  scratchGain = ac.createGain(); scratchGain.gain.value = 0
  loop.connect(scratchGain).connect(out); loop.start()
}
const play = (n) => { if (!ac) return; const s = ac.createBufferSource(); s.buffer = buf[n]; s.connect(out); s.start() }
story.eventCallback('onUpdate', () => {
  if (!ac) return
  const v = Math.min(Math.abs(lenis.velocity) / 30, 1), g = scratchGain.gain
  g.setTargetAtTime(v * 0.4, ac.currentTime, v > g.value ? 0.02 : 0.3)     // fast attack, slow release
})
const cue = (label, n) => story.call(() => story.scrollTrigger.direction > 0 && play(n), null, label)
cue('boards', 'paper'); cue('ink', 'pencil'); cue('shot', 'boing'); cue('vfx', 'whoosh')
```
- **Cost (est.).** One scrubbed video only while the shot panel is live. Small SVG paths. Audio buffers around 200–300 KB in total. No canvas.
- **Mobile.** Vertical: the panels stack and develop in place as you scroll. The sound toggle sits within thumb reach.
- **Cliché risk: high as written.** The concept calls this "a horizontal moment", and a pinned horizontal strip is the user's "plain horizontal strip". Drop "horizontal" as the idea and keep the strip as the object. A before/after VFX slider is also stock; use the drawn wipe.
- **Sources.** Codrops *Kinetic SVG Typography* (multi-pass draw); *Scroll-Driven SVG Map* (a line drawn by scroll with the camera following); *KAI* (scrub encode); *HAOQI* (fast-attack/slow-release smoothing). MWG **038** (an image swap per scroll step; take only the swap, not its horizontal list).

---

## 7. 1.67M drawn viewers → particles → client words
- **Mechanism.**
  - "1.67M" is drawn as single-stroke numerals, then inked (moment 3's stats recipe).
  - **The crowd is one `InstancedBufferGeometry` quad drawn about 4,000 times** (not 1.67M; the number tells the scale). Each viewer samples **one of ≥ 64 hand-drawn faces** from a 2048² atlas through a per-instance rect (HAOQI's sticker-atlas pattern). Draw the faces in the channel's style; don't generate them.
  - **Three positions per instance:** seats (theatre rows) → scattered (noise drift in the shader) → words (positions sampled from the quote drawn to an offscreen canvas with `getImageData`, threshold, every nth pixel; the Codrops particles recipe). The shader mixes them by `uProgress` with a per-instance delay.
  - **Use alpha-test, not blending**: no sorting, no transparency overdraw.
- **Blunt alternative (recommended): don't re-form into words.** "Particles become text" is the most generic beat in the concept (it's the 2019 Codrops demo look). Let the crowd stay a crowd. Specific viewers raise **speech balloons** with the Upwork quotes: a DOM balloon at that instance's projected screen position, outline drawn with DrawSVG, text by SplitText. It's cheaper, has more character, and it's on brand: Osloop makes characters talk.

```glsl
// crowd.vert: one draw call. Seat → scatter → word target; each sprite shows one hand-drawn face.
attribute vec3 aSeat;    // theatre-row position
attribute vec3 aWord;    // sampled from the quote drawn into an offscreen canvas (getImageData + threshold)
attribute vec4 aRect;    // this viewer's face in the atlas: uv offset (xy) + size (zw)
attribute float aDelay;  // 0..0.4 stagger
uniform float uProgress; // 0 = crowd, 1 = scattered, 2 = words
uniform float uTime;
varying vec2 vUv;
vec3 drift(vec3 p) { return p + vec3(sin(p.y * 1.7 + uTime), cos(p.x * 1.3 - uTime), sin(p.x + p.y)) * 1.6; }
void main() {
  float a = smoothstep(0.0, 1.0, clamp(uProgress - aDelay, 0.0, 1.0));         // slow-in / slow-out
  float b = smoothstep(0.0, 1.0, clamp(uProgress - 1.0 - aDelay, 0.0, 1.0));
  vec3 p = mix(mix(aSeat, drift(aSeat), a), aWord, b);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  mv.xy += position.xy * mix(0.12, 0.04, b);      // camera-facing quad; faces shrink to ink dots inside the words
  gl_Position = projectionMatrix * mv;
  vUv = aRect.xy + uv * aRect.zw;
}
// frag: vec4 c = texture2D(uAtlas, vUv); if (c.a < 0.5) discard; gl_FragColor = c;   // alpha-test: no sorting
```
- **Cost (est.).** 1 draw call for about 4k quads; the limit is fill rate, so keep sprites small. One full-screen canvas while the chapter is on screen. No video. The atlas is about 16 MB decoded.
- **Mobile.** About 1,500 instances at DPR 1. Skip the scatter: crowd → balloons only.
- **Cliché risk: high** for particles-to-text (see above). Also, the crowd looks repetitive if the atlas is small, so use ≥ 64 faces with random tint and accessories.
- **Sources.** Codrops *Interactive Particles* (instanced quads from image pixels; drop dark pixels to cut the count; a "touch texture" for cheap interaction); *HAOQI* (one CanvasTexture atlas + one instanced draw + per-instance `uvRect`; a fixed instance budget). MWG **112** (letters fly out and snap back: a DOM alternative for short quotes).

---

## 8. The visitor's drawing, animated, extruded and filmed; then the rewind
- **Mechanism.**
  - **Capture:** pointer events with `setPointerCapture`, `getCoalescedEvents()` for dense samples, real pressure only when `pointerType === 'pen'`, and the time of each point. Use `touch-action: none` on the pad only.
  - **Draw it live** with F2's `pencilPath` (variable width, boiling), rebuilt once per frame, not once per event.
  - **The loop round their line:**
    1. It boils (F2).
    2. It bounces as one object along an arc with squash on contact (1B maths, on twos).
    3. It **extrudes**: the points (decimated) become a `CatmullRomCurve3` and then a `TubeGeometry` with a clay toon material and a boiling outline hull. It grows along its length with `setDrawRange` in whole rings, the same "reveal is the radius/length, not an opacity fade" idea as Drawing With Light, so there's no blending cost.
    4. It goes into the **same zoetrope** (12 instanced copies of their tube, each at a bounce phase).
    5. It lands in a film frame (drei `View` renders the drum into a DOM film-frame rect).
  - **Optional and memorable:** `canvas.captureStream(30)` → `MediaRecorder` → the visitor downloads their 3-second film.
- **Rewind.** "Back to top" scrolls up with Lenis over about 4.5 s. Every scrubbed chapter plays backwards as it's passed, and Frame zero reverses last. During the rewind, run everything on twos and **don't seek videos** (show posters or atlas frames instead), or the rewind blows the frame budget.

```js
// Finale: record the stroke (pressure + timing), draw it live, then hand it to 3D as a tube that grows.
const pts = []; let t0 = 0, dirty = false
pad.style.touchAction = 'none'
pad.addEventListener('pointerdown', (e) => { pad.setPointerCapture(e.pointerId); pts.length = 0; t0 = e.timeStamp; add(e) })
pad.addEventListener('pointermove', (e) => { if (e.buttons & 1) (e.getCoalescedEvents?.() ?? [e]).forEach(add) })
pad.addEventListener('pointerup', () => runTheLoop(pts))          // boil → bounce → extrude → zoetrope → film
function add(e) {
  const r = pad.getBoundingClientRect()
  pts.push([e.clientX - r.left, e.clientY - r.top, e.pointerType === 'pen' ? e.pressure : undefined, e.timeStamp - t0])
  dirty = true
}
gsap.ticker.add(() => { if (dirty) { ink.setAttribute('d', pencilPath(pts, { seed: twos.frame % 3 })); dirty = false } })
export function strokeToTube(points, px = 0.01) {                 // CSS px → world units on the z = 0 plane
  const v = points.filter((_, i) => i % 3 === 0).map(([x, y]) => new THREE.Vector3(x * px, -y * px, 0))
  const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(v), v.length * 4, 0.06, 8, false)
  geo.setDrawRange(0, 0)                                         // grows along its length: no fade, no blending
  return geo
}
// grow:   gsap.to(s, { n: v.length * 4, onUpdate: () => geo.setDrawRange(0, Math.floor(s.n) * 8 * 6) }) // whole rings
// rewind: lenis.scrollTo(0, { duration: 4.5, onComplete: () => intro.reverse() })
```
- **Cost (est.).** perfect-freehand once per frame while drawing. TubeGeometry built once (a few ms for about 200 segments × 8 sides). The zoetrope reuses Frame zero's shaders, which are already warm. One canvas inside a film-frame rect (not full-screen).
- **Mobile.** Finger drawing, 8 zoetrope copies, DPR 1. Feature-detect `MediaRecorder` before offering the download.
- **Cliché risk: medium.** "Draw something and it comes alive" echoes *Draw a Stickman* (2009) and many toys. It's only ours if the scribble visibly runs round the studio's loop (the same drum, the same film frame as the entrance). Scroll-to-top is not a rewind unless it really plays the page backwards, on twos, with a rewind sound.
- **Sources.** perfect-freehand README (pointer capture, pressure, options); *Drawing With Light* (tube from a curve; reveal by radius/length, not fade; damping); *Sketching the Impossible* (shader warm-up so the finale's 3D doesn't hitch).

---

## Clichés inside concept A: the blunt list
1. **Frame zero step 7, "∞ sliding in as the oo"** = logo flying into the nav. Cut it. The ∞ stays put as the hero's track, "os" and "p" ink in place around it, and the nav logo appears on a cut.
2. **Process as "a horizontal moment"** = plain horizontal strip. Make the panels transform in place; the strip is an object, not a scroll direction.
3. **Proof: particles re-forming into words** = the 2019-era WebGL demo. Use drawn viewers with speech balloons instead.
4. **Work: books you can drag around** = plain draggable deck. Drag changes time, never position. No tilt-to-cursor on hover.
5. **Hero: text-on-a-path marquee + elastic line** = stock effects. The ∞ (with its line break), the boil and the timing make it ours. No mouse parallax; a tiny cursor or none.
6. **Annotations "in animator's handwriting"**: never handwriting fonts. Itomdev.com uses Caveat and Gloria Hallelujah, and that's exactly the cheap look to avoid. Trace real handwriting as single-stroke paths.
7. **Preloader:** Itom's opening is a % counter in a dashed circle while one pencil line draws, then the paper tears open onto a grey hatched sketch. The counter is the pattern the user rejected. Ours never shows a number: if loading runs long, the O keeps hopping on the ∞.
8. **Chapter boundaries** must all be changes of medium, including the entrances and exits of the pinned chapters ("sections without transitions").
9. **Style roulette** (B graft) can become an effects catalogue. Only Osloop's services, in their order.
10. **Zoetrope** prior art (2013) and **"draw something"** prior art (2009). Both only work as the studio's own loop.

---

## MWG numbers worth knowing (MWG = DOM/SVG + GSAP; ✓ = watched, sheet in `mwg/sheets/`)
**Use (reinterpret, never as templates)**
- **032** ✓ Circular sentence: a big headline on a gentle arc via `<textPath startOffset>`, driven by scroll. Base for text on the ∞.
- **059** ✓ Path text camera: text writes along an S-path inside an oversized SVG while the view pans and turns to keep the writing point centred. Base for the أسلوب nib-follow.
- **104** ✓ Wave Bend Content: type and image chips ride one path that morphs from straight toward a hidden sine path with scroll speed. The ∞'s velocity bend.
- **089** ✓ Jelly headline motion: per-letter spans bend into an arc with scroll velocity and spring back. Squash and stretch for type.
- **079** ✓ Weight-Shift Marquee: a heavier weight front travels through a variable-font sentence. The pencil→ink pass for headlines and stats.
- **038** ✓ Dynamic list scrolling: a horizontal list of thin columns where one image swaps per step "like a flick book". Take the swap, not the strip.
- **074** ✓ Pinned bottom hinge: a card with front/back faces swings on its bottom edge and its back becomes the floor. The flipbook page turn, never a stack section.
- **091** ✓ 3D wheel gallery: nested DOM wrappers push tiles onto a spinning cylinder; pointer tilts it, wheel speeds it up. The no-WebGL zoetrope shape (make it step).
- **098** Curved scroll reveal: letters type along stacked arcs that straighten. A headline settling out of the ∞ into the layout.
- **112** Explosive list: letters fly out at the centre and snap back on scroll up. Cheap DOM scatter for short quotes.
- **118** Floaty Letters Reveal: letters tumble in with bounce and twist. Follow-through on titles.
- **049** Defying gravity: letters arrive at different speeds to compose a title. Overlapping action.
- **013** Infinite scrolling movement: a marquee that speeds up or rewinds with scroll direction. The ∞ train's speed rule.
- **023** Infinite circular movement: images orbit a large circle by scroll; fast scroll flings some off orbit.
- **110** 3D Flip Cards: double-sided cards flip while travelling. A page with a front and a back.
- **115** 3D Text Roll: lines wrapped on an invisible cylinder.
- **120** Undulating lines: letters drift, line up when motion slows, peel apart on the way out.
- **090** Scrubbed random reveal: letters appear in random order per line while scrolling.
- **Codrops × MWG free 002** Gravity Mouse Trail: images fall, bounce and fade. Use the gravity-bounce timing only, never as a cursor trail.

**Avoid (on the user's generic list)**
- **002** Images following cursor, **030** Images on hover, **044** Mask effect: cursor-following mask reveals.
- **014** Infinite Stacking Images, **042** Smooth stacking images, **075** Pinned scroll fan: stacking cards and decks.
- **062** Inertia trail burst, **092** Vanishing mouse trail, **080** Matter cursor swarm: cursor trails.
- **065** Triple marquee parallax: plain strips.
- **039** Image with perspective, **077** Depth Card Interaction: mouse-tilt parallax.

---

## Sources read
**Codrops (15, all from `codrops-clusters.json`)**
1. https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model: hand-drawn textures on flat planes in R3F; PaintRevealMaterial via `onBeforeCompile`; `compileAsync` warm-up; device tiers; removing shadows; KTX2 failing on line art.
2. https://tympanus.net/codrops/2021/05/10/noisy-strokes-texture-with-three-js-and-glsl: a video stream with no text (the gist is the author's setup list). Used only for the idea of noise strokes as pencil hatching.
3. https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins: DrawSVG scribbles (Figma pencil paths in drawing order; erase with `"100% 100%"`); MorphSVG `rotational` + `complexity` on stroked icons.
4. https://tympanus.net/codrops/2023/01/31/bringing-letters-to-life-coding-a-kinetic-svg-typography-animation: single-stroke fonts (Hershey, single-line tools), path direction, every path drawn three times in three colours.
5. https://tympanus.net/codrops/2025/12/17/building-responsive-scroll-triggered-curved-path-animations-with-gsap: curves built from measured DOM positions; MotionPath + scrub; `invalidateOnRefresh`; MotionPathHelper.
6. https://tympanus.net/codrops/2026/06/04/creating-a-thumbnail-flow-animation-with-gsap-motionpath: 2-point MotionPath arrays (carrying `scale`) + `curviness` give organic arcs with overshoot.
7. https://tympanus.net/codrops/2026/05/21/creating-scroll-driven-svg-map-animations-with-gsap: `drawSVG` + a dot on the same path + `quickTo` camera following its inverse position.
8. https://tympanus.net/codrops/2025/04/28/animating-in-frames-repeating-image-transition: N stepped "movers" along a path (steps, step interval, wobble, sine path). The onion-skin mechanic.
9. https://tympanus.net/codrops/2026/09/07/drawing-with-light-an-exploration-of-lit-gpu-tubes-with-tsl-and-webgpu: a tube as a parameter grid + a curve function in the vertex shader; reveal by radius; one instanced draw per strand family; frame-rate-independent damping; pointer in screen space.
10. https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js: instanced quads from image pixels; drop dark pixels; a canvas "touch texture".
11. https://tympanus.net/codrops/2026/06/30/building-persistent-page-transitions-with-webgpu-and-vanilla-javascript: one owner per plane rect; keep/remove/add; a lock; measured slots.
12. https://tympanus.net/codrops/2026/08/15/inside-haoqi-design-letting-dom-and-webgl-share-a-retro-futurist-stage: one frame loop (Lenis `autoRaf: false` inside R3F); ScrollBus/PointerBus; rect cache; atlas + one InstancedMesh; passes stop off-screen.
13. https://tympanus.net/codrops/2026/02/23/composite-rendering-the-brilliance-behind-inspiring-webgl-transitions: scenes to render targets, one clip-space composite pass with mask uniforms, post folded into it.
14. https://tympanus.net/codrops/2025/11/20/behind-the-kai-design-dept-experience-webgl-line-blur-video-scrubbing-and-3d-animation: scrubbable H.264 encode; WebCodecs fallback (mediabunny); Blender-exported line paths as JSON, synced to video.
15. https://tympanus.net/codrops/2025/03/26/design-in-motion-the-animation-principles-behind-green-stack: fix 3 motion principles first and judge every effect against them; variable fonts in motion; clip-path flips.

**Other:** perfect-freehand README (`getStroke` options: size, thinning, smoothing, streamline, simulatePressure, easing, start/end taper and cap, last). GSAP docs: `MotionPathPlugin.getPositionOnPath` (needs `cacheRawPathMeasurements` first; returns x, y and angle); MorphSVGPlugin options (shape, type, map, shapeIndex, origin, smooth, curveMode, precision, precompile, render). The docs say nothing about mismatched subpath counts.

**Captures (peek tool, 2):**
- itomdev.com: paper texture; one pencil line drawn top to bottom while a % counter runs; the paper tears along the line onto a grey pencil-hatched scene; fonts Caveat, Gloria Hallelujah, Inter; three.js r182, one canvas.
- luminhands.netlify.app: unreachable (connection timed out).

**MWG sheets (8):** `mwg/sheets/032.jpg`, `038.jpg`, `059.jpg`, `074.jpg`, `079.jpg`, `089.jpg`, `091.jpg`, `104.jpg` (30 frames each, 6 × 5).
