// Capture how a live site moves: intro filmstrip, wheel-driven scroll, library detection, frame sheets.
// Usage: node peek-site.mjs <url> <outDir> [--mobile] [--steps=16] [--intro=9000]
// Writes: <outDir>/intro-sheet.jpg, scroll-sheet.jpg, motion-sheet.jpg (from recorded video), report.json
import { chromium } from 'playwright'
import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const [url, outDir, ...flags] = process.argv.slice(2)
if (!url || !outDir) { console.error('usage: node peek-site.mjs <url> <outDir> [--mobile] [--steps=16] [--intro=9000]'); process.exit(2) }
const mobile = flags.includes('--mobile')
const steps = +(flags.find((f) => f.startsWith('--steps='))?.split('=')[1] ?? 16)
const introMs = +(flags.find((f) => f.startsWith('--intro='))?.split('=')[1] ?? 9000)
mkdirSync(outDir, { recursive: true })
const vid = join(outDir, 'vid'); mkdirSync(vid, { recursive: true })
const vp = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] })
const ctx = await browser.newContext({
  viewport: vp, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile,
  userAgent: mobile ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' : undefined,
  recordVideo: { dir: vid, size: { width: Math.round(vp.width / 1.5), height: Math.round(vp.height / 1.5) } },
})
const page = await ctx.newPage()
const consoleErrors = []
page.on('pageerror', (e) => consoleErrors.push(String(e).slice(0, 200)))
const shots = []
const snap = async (name) => { const p = join(outDir, name); try { await page.screenshot({ path: p, timeout: 8000 }); shots.push(p) } catch {} }

const t0 = Date.now()
try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }) } catch (e) { console.log('goto warn', String(e).slice(0, 120)) }
// Intro filmstrip: preloaders and openings live in the first seconds
const introAt = [150, 500, 1000, 1600, 2400, 3300, 4400, 5800, 7400, introMs]
let i = 0
for (const at of introAt) { const wait = at - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait); await snap(`intro-${String(i++).padStart(2, '0')}.png`) }

const report = await page.evaluate(() => {
  const w = window
  const has = (k) => typeof w[k] !== 'undefined'
  const scripts = Array.from(document.scripts).map((s) => s.src).filter(Boolean)
  const canv = Array.from(document.querySelectorAll('canvas')).map((c) => {
    let ctx = 'unknown'
    try { ctx = c.getContext('webgl2') ? 'webgl2?' : c.getContext('webgl') ? 'webgl?' : '2d?' } catch {}
    const r = c.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), ctx }
  })
  const fonts = new Set(); try { document.fonts.forEach((f) => fonts.add(f.family.replace(/"/g, '') + ' ' + f.weight + ' ' + f.style)) } catch {}
  const gen = document.querySelector('meta[name="generator"]')?.content
  return {
    title: document.title,
    generator: gen || null,
    frameworks: { next: has('__NEXT_DATA__') || !!document.querySelector('#__next, [data-nextjs-scroll-focus-boundary]') || scripts.some((s) => s.includes('/_next/')), nuxt: has('__NUXT__') || has('$nuxt') || scripts.some((s) => s.includes('/_nuxt/')), astro: !!document.querySelector('astro-island, [data-astro-cid], [data-astro-transition-scope]'), sveltekit: scripts.some((s) => s.includes('/_app/immutable/')), webflow: !!document.querySelector('html[data-wf-site]'), framer: !!document.querySelector('[data-framer-name], #__framer-badge-container') || scripts.some((s) => s.includes('framer')), gatsby: !!document.querySelector('#___gatsby'), react: !!document.querySelector('[data-reactroot], #root') },
    libs: {
      gsap: w.gsap?.version || null,
      scrollTrigger: !!(w.ScrollTrigger || w.gsap?.plugins?.scrollTrigger),
      splitText: !!w.SplitText, flip: !!w.Flip, draggable: !!w.Draggable, observer: !!w.Observer, scrollSmoother: !!w.ScrollSmoother,
      three: w.THREE?.REVISION || (w.__THREE__ ?? null),
      lenis: has('lenis') || has('Lenis') || !!document.querySelector('html.lenis, html.lenis-smooth'),
      locomotive: !!document.querySelector('[data-scroll-container], html.has-scroll-smooth'),
      barba: has('barba'), swup: has('swup'), pixi: has('PIXI'), ogl: has('OGL'), babylon: has('BABYLON'),
      lottie: has('lottie') || has('bodymovin') || !!document.querySelector('lottie-player, dotlottie-player'),
      rive: has('rive') || scripts.some((s) => s.includes('rive')), spline: !!document.querySelector('spline-viewer') || scripts.some((s) => s.includes('spline')),
      howler: has('Howl') || has('Howler'), theatre: scripts.some((s) => s.includes('theatre')),
      viewTransitions: !!document.startViewTransition,
    },
    scripts: scripts.slice(0, 40),
    canvases: canv,
    videos: Array.from(document.querySelectorAll('video')).map((v) => ({ src: (v.currentSrc || v.src || '').slice(0, 160), w: v.videoWidth, h: v.videoHeight, autoplay: v.autoplay, loop: v.loop, muted: v.muted })).slice(0, 12),
    svgPaths: document.querySelectorAll('svg path').length,
    svgCount: document.querySelectorAll('svg').length,
    fonts: Array.from(fonts).slice(0, 20),
    scrollHeight: document.documentElement.scrollHeight,
    bodyTextSample: (document.body?.innerText || '').replace(/\s+/g, ' ').slice(0, 900),
    cssVarsSample: (() => { try { const cs = getComputedStyle(document.documentElement); const out = {}; for (let k = 0; k < cs.length && Object.keys(out).length < 30; k++) { const n = cs[k]; if (n.startsWith('--')) out[n] = cs.getPropertyValue(n).trim().slice(0, 40) } return out } catch { return {} } })(),
    bg: getComputedStyle(document.body).backgroundColor,
  }
})
report.url = url
report.mobile = mobile
report.pageErrors = consoleErrors

// Move the pointer around (cursor-reactive sites), then wheel-scroll through the page (works with Lenis/virtual scroll)
await page.mouse.move(vp.width * 0.3, vp.height * 0.4); await page.waitForTimeout(300)
await page.mouse.move(vp.width * 0.7, vp.height * 0.6, { steps: 12 }); await page.waitForTimeout(400)
const H = Math.max(report.scrollHeight, vp.height * 4)
const perStep = Math.max(300, Math.round((Math.min(H, vp.height * 40) - vp.height) / steps))
for (let s = 0; s < steps; s++) {
  if (mobile) { await page.evaluate((d) => window.scrollBy(0, d), perStep) } else {
    const chunks = 6; for (let c = 0; c < chunks; c++) { await page.mouse.wheel(0, perStep / chunks); await page.waitForTimeout(60) }
  }
  await page.waitForTimeout(900)
  await snap(`scroll-${String(s).padStart(2, '0')}.png`)
}
report.finalScrollY = await page.evaluate(() => window.scrollY)
report.totalSeconds = Math.round((Date.now() - t0) / 1000)
await ctx.close(); await browser.close()

// Sheets
const tile = (pattern, out, cols) => {
  const n = readdirSync(outDir).filter((f) => f.startsWith(pattern + '-') && f.endsWith('.png')).length
  if (!n) return
  execSync(`ffmpeg -loglevel error -y -i "${join(outDir, pattern)}-%02d.png" -vf "scale=480:-1,tile=${cols}x${Math.ceil(n / cols)}:padding=4:color=white" -frames:v 1 -q:v 4 "${out}"`)
}
tile('intro', join(outDir, 'intro-sheet.jpg'), 5)
tile('scroll', join(outDir, 'scroll-sheet.jpg'), 4)
const v = readdirSync(vid).find((f) => f.endsWith('.webm'))
if (v) {
  renameSync(join(vid, v), join(outDir, 'session.webm'))
  try { execSync(`ffmpeg -loglevel error -y -i "${join(outDir, 'session.webm')}" -vf "fps=1,scale=320:-1,tile=6x8:padding=3:color=white" -frames:v 1 -q:v 4 "${join(outDir, 'motion-sheet.jpg')}"`) } catch {}
}
rmSync(vid, { recursive: true, force: true })
if (!flags.includes('--keep-video')) rmSync(join(outDir, 'session.webm'), { force: true })
for (const f of readdirSync(outDir)) if (/^(intro|scroll)-\d\d\.png$/.test(f)) rmSync(join(outDir, f))
writeFileSync(join(outDir, 'report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify({ url, libs: report.libs, frameworks: report.frameworks, canvases: report.canvases.length, videos: report.videos.length, svgPaths: report.svgPaths, fonts: report.fonts.slice(0, 6), sheets: ['intro-sheet.jpg', 'scroll-sheet.jpg', 'motion-sheet.jpg'].map((s) => join(outDir, s)) }, null, 1))
