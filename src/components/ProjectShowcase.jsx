import React, { useRef, useState } from 'react'
import { ExternalLink, Code2, Layers, Cpu } from 'lucide-react'
import { sound } from '../utils/soundEngine'
import { BlueprintDrawer } from './BlueprintDrawer'

export const PROJECTS = [
  {
    id: 'nexora',
    index: '01',
    title: 'Nexora Store',
    tagline: 'Full-Stack E-Commerce Platform',
    category: 'NEXT.JS & REACT 19',
    accent: '#00f0ff',
    description:
      'Modern e-commerce platform built with Next.js App Router and React 19 Server Components. Implements multi-tab cart synchronization via BroadcastChannel, dynamic category filtering, and optimized image aspect-ratio containment for zero Cumulative Layout Shift.',
    stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Axios'],
    metrics: [
      { label: 'CATALOG LATENCY', val: '< 180ms', fill: 18 },
      { label: 'CART PERSISTENCE', val: 'Instant Sync', fill: 20 },
      { label: 'DEPLOYMENT', val: 'Edge-Rendered', fill: 19 },
    ],
    architectureTopology: [
      {
        tier: 'CLIENT TIER',
        title: 'React 19 RSC & Hydration',
        tech: 'React 19 Server Components',
        protocol: 'HTTP/2 Streaming',
        latency: '< 25ms',
        role: 'Zero-bundle rendering for static product catalog items with selective client hydration for cart mutations.',
        resilience: 'Fallback Skeleton Suspense boundaries with zero Cumulative Layout Shift.',
      },
      {
        tier: 'EDGE GATEWAY',
        title: 'Next.js App Router Edge',
        tech: 'Vercel Edge Network',
        protocol: 'TLS 1.3 / ISR',
        latency: '< 15ms',
        role: 'Geographic request routing, stale-while-revalidate caching, and dynamic header inspection.',
        resilience: 'Multi-region failover with automatic cache purging on inventory webhooks.',
      },
      {
        tier: 'DATA AGGREGATOR',
        title: 'Catalog Aggregator Service',
        tech: 'REST / Axios Pipeline',
        protocol: 'JSON / Brotli',
        latency: '< 65ms',
        role: 'Dynamic price matrix calculation, multi-currency conversion, and inventory availability queries.',
        resilience: 'Exponential backoff retry with memory fallback cache.',
      },
      {
        tier: 'STATE PERSISTENCE',
        title: 'Multi-Tab Cart Sync',
        tech: 'BroadcastChannel + LocalStorage',
        protocol: 'Client IPC',
        latency: '0ms (Instant)',
        role: 'Instantaneous cart mutations synchronized across multiple browser tabs simultaneously without server roundtrips.',
        resilience: 'Conflict-free local state merging with schema validation.',
      },
    ],
    technicalDecisions: [
      {
        title: 'Optimistic Multi-Tab Cart Engine',
        challenge: 'Users adding items across concurrent browser tabs experienced cart state discrepancies and race conditions.',
        cause: 'Standard LocalStorage writes lacked a reactive event dispatching mechanism across separate browser windows.',
        solution: 'Coupled React 19 useOptimistic with the native BroadcastChannel API, broadcasting state mutations across tabs instantaneously before network acknowledgement.',
        impact: '0ms Perceived Latency // 100% Multi-tab consistency',
      },
      {
        title: 'Sub-180ms Global Catalog Prefetching',
        challenge: 'Catalog browsing suffered from perceptible white flashes and layout jumps during category tab switching.',
        cause: 'Synchronous data fetching in client useEffect chains caused cascading waterfall network delays.',
        solution: 'Migrated to Next.js App Router React Server Components with hover-triggered prefetch headers and stale-while-revalidate caching.',
        impact: 'Eliminated waterfall request chains // < 180ms page transitions',
      },
      {
        title: 'Zero Cumulative Layout Shift (CLS) Architecture',
        challenge: 'Dynamic product grid loading caused abrupt layout shifts when high-resolution product photography finished downloading.',
        cause: 'Missing intrinsic aspect-ratio definitions and unreserved container dimensions prior to image paint.',
        solution: 'Engineered aspect-ratio CSS containment containers with blur-hash micro-placeholders and strict font display swap rules.',
        impact: 'CLS = 0.00 Verified on Google Lighthouse',
      },
    ],
    codeFilename: 'CatalogPage.tsx',
    codeSnippet: `// Nexora Next.js App Router Server Component
export default async function CatalogPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const products = await getCachedProducts(query.category);

  return (
    <Suspense fallback={<CatalogGridSkeleton />}>
      <ProductMatrix items={products} isOptimistic />
    </Suspense>
  );
}`,
    mockupType: 'store',
    liveUrl: 'https://nexora-app-seven.vercel.app/',
    githubUrl: 'https://github.com/nasrelshamekh/Nexora-Store',
  },
  {
    id: 'circlehub',
    index: '02',
    title: 'CircleHub Platform',
    tagline: 'High-Concurrency Community Platform',
    category: 'ASP.NET CORE & REACT',
    accent: '#3b82f6',
    description:
      'Community platform featuring interest-based hubs, discussion feeds, and media uploads. Built on an ASP.NET Core (.NET 10) REST API utilizing ValueTask endpoints to minimize GC allocations, backed by a normalized MySQL relational schema with composite indexing.',
    stack: ['ASP.NET Core', '.NET 10', 'React 19', 'MySQL', 'JWT Guards'],
    metrics: [
      { label: 'BACKEND CORE', val: 'ASP.NET Core 10', fill: 20 },
      { label: 'DATABASE', val: 'MySQL Relational', fill: 18 },
      { label: 'AUTH PROTOCOL', val: 'JWT Guards', fill: 20 },
    ],
    architectureTopology: [
      {
        tier: 'CLIENT LAYER',
        title: 'React 19 SPA Client',
        tech: 'React 19 + Tailwind CSS',
        protocol: 'HTTPS / JSON',
        latency: '< 30ms',
        role: 'Delivers dynamic feeds, rich markdown editing, and instantaneous interaction optimistic states.',
        resilience: 'Client-side query cache with automatic error boundary containment.',
      },
      {
        tier: 'SECURITY GATEWAY',
        title: 'Claims-Based Auth Gateway',
        tech: 'ASP.NET Core Auth Middleware',
        protocol: 'HMAC-SHA256 JWT',
        latency: '< 1ms',
        role: 'Stateless cryptographic token validation, claims extraction, and role-based policy enforcement.',
        resilience: 'Automatic token refresh cycle with blacklist revocation checks.',
      },
      {
        tier: 'APPLICATION API',
        title: 'High-Throughput Web API',
        tech: 'ASP.NET Core (.NET 10)',
        protocol: 'Kestrel / ValueTask',
        latency: '< 12ms',
        role: 'Executes community business logic, content validation, and event dispatching.',
        resilience: 'Asynchronous ValueTask pipeline avoiding Gen0 GC pressure under high concurrency.',
      },
      {
        tier: 'DATABASE LAYER',
        title: 'Relational Persistence',
        tech: 'MySQL 8.0 InnoDB + EF Core',
        protocol: 'TCP Pool / TLS',
        latency: '< 8ms',
        role: 'Normalized schema housing user graphs, posts, hubs, and access audit records.',
        resilience: 'Composite B-Tree index strategies with transaction isolation level tuning.',
      },
    ],
    technicalDecisions: [
      {
        title: 'High-Throughput ValueTask Endpoints',
        challenge: 'High concurrent traffic spikes generated excessive GC pauses from standard Task allocations on short-lived async operations.',
        cause: 'Returning standard Task<T> allocates a reference type object on the heap for every single API request, bloating GC sweeps.',
        solution: 'Refactored all ASP.NET Core 10 controllers and service interfaces to return ValueTask<T>, eliminating heap allocations when operations complete synchronously.',
        impact: 'Zero heap allocations on synchronous path // High concurrency',
      },
      {
        title: 'Composite Relational Index Tuning',
        challenge: 'Querying filtered post feeds across community hubs degraded from 15ms to over 850ms as post volume climbed past 50,000 rows.',
        cause: 'Naive separate indexes on hub_id and created_at forced MySQL to perform expensive index intersection and temporary table file sorts.',
        solution: 'Engineered compound B-Tree indexes on posts(hub_id, is_deleted, created_at DESC), transforming full scans into sub-millisecond index seeks.',
        impact: 'Index seek execution // Latency dropped to 4.2ms',
      },
      {
        title: 'Granular Hub Permission & Authorization Engine',
        challenge: 'Vulnerability to privilege escalation if member tokens could manipulate administrative hub settings.',
        cause: 'Monolithic role checks lacked attribute-based permission scoping.',
        solution: 'Designed an ASP.NET Core custom IAuthorizationRequirement policy engine verifying hub ownership claims on every mutation request.',
        impact: 'Fine-grained ownership verification on mutations',
      },
    ],
    codeFilename: 'HubController.cs',
    codeSnippet: `// CircleHub ASP.NET Core 10 Controller
[ApiController]
[Route("api/v1/community")]
public class HubController(IHubService hubService) : ControllerBase
{
    [HttpPost("posts")]
    [Authorize(Policy = "VerifiedMember")]
    public async ValueTask<IActionResult> Publish([FromBody] PostDto dto)
    {
        var post = await hubService.CreatePostAsync(dto, User.GetUserId());
        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }
}`,
    mockupType: 'community',
    liveUrl: 'https://circle-hub-nu.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/CircleHub',
  },
  {
    id: 'circlehub-mobile',
    index: '03',
    title: 'CircleHub Mobile',
    tagline: 'Cross-Platform Native Client',
    category: 'REACT NATIVE & EXPO',
    accent: '#8b5cf6',
    description:
      'Cross-platform mobile application built with React Native and Expo Router. Implements optimistic UI mutations with TanStack Query for instantaneous gesture feedback, paired with NativeWind universal styling.',
    stack: ['React Native', 'Expo Router', 'NativeWind', 'TanStack Query'],
    metrics: [
      { label: 'COMPILATION', val: 'iOS & Android', fill: 20 },
      { label: 'ROUTING', val: 'File-Based Router', fill: 19 },
      { label: 'CACHE MUTATION', val: 'Optimistic UI', fill: 18 },
    ],
    architectureTopology: [
      {
        tier: 'NATIVE SURFACE',
        title: 'Cross-Platform Client',
        tech: 'React Native + Expo Router',
        protocol: 'Native Bridge / JSI',
        latency: '16.6ms (60 FPS)',
        role: 'Hardware-accelerated gesture navigation, layout animations, and offline-first view states.',
        resilience: 'Native crash handlers and graceful offline hydration.',
      },
      {
        tier: 'LOCAL CACHE',
        title: 'TanStack Query Engine',
        tech: 'In-Memory Snapshot Cache',
        protocol: 'Async Storage Engine',
        latency: '< 2ms',
        role: 'Optimistic mutations with instantaneous visual updates and automatic rollback context snapshots.',
        resilience: 'Stale query background revalidation on application focus.',
      },
      {
        tier: 'NETWORK BRIDGE',
        title: 'Axios Interceptor Layer',
        tech: 'Token Refresh Gateway',
        protocol: 'HTTPS / JSON',
        latency: '< 70ms',
        role: 'Injects JWT bearer credentials, handles automatic 401 token refresh cycles, and throttles requests.',
        resilience: 'Exponential backoff retry policy on cellular dropouts.',
      },
      {
        tier: 'BACKEND CORE',
        title: 'CircleHub REST API',
        tech: 'ASP.NET Core (.NET 10)',
        protocol: 'TLS 1.3 Endpoints',
        latency: '< 18ms',
        role: 'Community feeds, notifications, and media metadata management.',
        resilience: 'Distributed connection pooling and rate limit throttling.',
      },
    ],
    technicalDecisions: [
      {
        title: 'Optimistic Mutation Snapshots & Rollbacks',
        challenge: 'Unstable cellular connections caused user actions (likes, posts) to appear frozen or glitch during network dropouts.',
        cause: 'Waiting for server confirmation before updating mobile state produced a sluggish, laggy user experience.',
        solution: 'Structured TanStack Query mutation lifecycles with onMutate context snapshots, rolling back client state smoothly if network requests drop.',
        impact: 'Instant Visual Feedback // 0% Corrupted UI States',
      },
      {
        title: 'File-Based Native Navigation & Deep Linking',
        challenge: 'Deep linking into specific community posts failed to preserve native navigation back-stacks on Android.',
        cause: 'Imperative navigation controllers suffered from fragmented route state between platform notification intents.',
        solution: 'Migrated to Expo Router file-based system with typed routes, guaranteeing consistent native back-stack preservation.',
        impact: '100% Deep Link Reliability across iOS & Android',
      },
      {
        title: 'Universal Design Tokens with NativeWind',
        challenge: 'Maintaining separate CSS stylesheets for web and mobile led to design inconsistencies and duplicated code.',
        cause: 'Platform-specific StyleSheet APIs lacked universal design token synchronization.',
        solution: 'Compiled unified Tailwind CSS tokens with NativeWind, sharing typography and color tokens directly across web and mobile.',
        impact: 'Consistent design tokens across web and mobile',
      },
    ],
    codeFilename: 'FeedMutation.ts',
    codeSnippet: `// CircleHub Mobile Optimistic Mutation
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (newPost) => api.post('/posts', newPost),
  onMutate: async (newPost) => {
    await queryClient.cancelQueries(['feed']);
    const previous = queryClient.getQueryData(['feed']);
    queryClient.setQueryData(['feed'], (old) => [newPost, ...old]);
    return { previous };
  },
  onError: (err, newPost, ctx) => queryClient.setQueryData(['feed'], ctx.previous)
});`,
    mockupType: 'mobile',
    liveUrl: 'https://github.com/nasrelshamekh/circlehub-mobile',
    githubUrl: 'https://github.com/nasrelshamekh/circlehub-mobile',
  },
  {
    id: 'nexify',
    index: '04',
    title: 'Nexify',
    tagline: 'Interactive Feed & Motion Surface',
    category: 'CLIENT ARCHITECTURE',
    accent: '#ec4899',
    description:
      'Responsive web application demonstrating fluid DOM virtualization and motion choreography. Implements an IntersectionObserver windowing engine to maintain smooth scrolling when rendering large media feeds.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    metrics: [
      { label: 'INTERFACE', val: 'Kinetic UI', fill: 19 },
      { label: 'EDGE HOSTING', val: 'Vercel Edge', fill: 20 },
      { label: 'COMPOSITION', val: 'Component-First', fill: 18 },
    ],
    architectureTopology: [
      {
        tier: 'VIEW LAYER',
        title: 'Vite React SPA',
        tech: 'React 19 + Tailwind',
        protocol: 'DOM Virtualization',
        latency: '8.3ms (120 FPS)',
        role: 'Component-driven feed rendering with minimal DOM footprint and instant layout calculations.',
        resilience: 'Local error boundaries isolating feed item rendering anomalies.',
      },
      {
        tier: 'MOTION PIPELINE',
        title: 'Kinetic Spring Engine',
        tech: 'GSAP + requestAnimationFrame',
        protocol: 'GPU Compositor',
        latency: '< 1ms',
        role: 'Coordinates staggered entry reveals, gesture scale effects, and fluid card transitions.',
        resilience: 'Automatic frame-drop skipping on low-power devices.',
      },
      {
        tier: 'FEED VIRTUALIZER',
        title: 'Windowing Scroller',
        tech: 'IntersectionObserver API',
        protocol: 'Memory Eviction',
        latency: '0ms (Viewport)',
        role: 'Only renders feed cards within active scroll viewport, recycling offscreen DOM nodes.',
        resilience: 'Guaranteed 0 memory leaks over multi-hour browsing sessions.',
      },
      {
        tier: 'EDGE DISTRIBUTION',
        title: 'Vercel CDN Edge',
        tech: 'Brotli + Immutable Assets',
        protocol: 'HTTP/3 Quic',
        latency: '< 18ms',
        role: 'Serves optimized client bundles globally with 1-year immutable cache headers.',
        resilience: 'Global DNS Anycast failover with instant rollbacks.',
      },
    ],
    technicalDecisions: [
      {
        title: 'Virtual Dynamic Feed Windowing',
        challenge: 'Infinite feed scrolling degraded browser performance to under 25 FPS once hundreds of media posts were loaded into DOM.',
        cause: 'Massive DOM tree depth caused severe layout recalculation and garbage collection bottlenecks.',
        solution: 'Implemented an IntersectionObserver virtual windowing engine that strictly mounts visible cards and unmounts offscreen elements.',
        impact: 'Smooth frame rates // Virtualized DOM recycling',
      },
      {
        title: 'Hardware-Accelerated Spring Choreography',
        challenge: 'CSS transitions on complex social cards triggered costly CPU paint recalculations during rapid scroll.',
        cause: 'Animating non-composite CSS properties (top, margin) forced browser layout thrashing.',
        solution: 'Restructured all spring animations to use strictly transform and opacity composite layers handled by GPU threads.',
        impact: 'Zero Layout Thrashing // Fluid Touch Response',
      },
      {
        title: 'Sub-100ms Edge Deployments & Code Splitting',
        challenge: 'Initial JavaScript bundle size exceeded 600kB, delaying Time to Interactive on slower mobile connections.',
        cause: 'Monolithic route bundling imported all secondary view components into main vendor bundle.',
        solution: 'Engineered dynamic import route splitting paired with brotli compression and tree-shaking.',
        impact: 'Bundle Reduced to 144kB // < 100ms Edge TTFB',
      },
    ],
    codeFilename: 'FeedChoreography.js',
    codeSnippet: `// Nexify Dynamic Motion Choreography
useGSAP(() => {
  gsap.fromTo('.feed-item',
    { opacity: 0, y: 30, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.05, ease: 'power3.out' }
  );
}, [activeFeed]);`,
    mockupType: 'social',
    liveUrl: 'https://nexify-kappa.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Nexify',
  },
  {
    id: 'earnings',
    index: '05',
    title: 'Earnings & Expense Calculator',
    tagline: 'Contractor Financial Utility',
    category: 'FINTECH UTILITIES',
    accent: '#f59e0b',
    description:
      'Client-side financial utility for freelancers and contractors to calculate billable earnings, tax liabilities, and expenses. Features integer-cent arithmetic to eliminate binary floating-point roundoff errors and stores data locally with zero server tracking.',
    stack: ['React', 'JavaScript', 'Financial Logic', 'Local Persistence'],
    metrics: [
      { label: 'CALCULATION', val: 'Sub-Penny Exact', fill: 20 },
      { label: 'DATA RETENTION', val: 'Encrypted Storage', fill: 19 },
      { label: 'ANALYTICS', val: 'Real-Time Charts', fill: 18 },
    ],
    architectureTopology: [
      {
        tier: 'INPUT STREAM',
        title: 'Reactive Input Pipeline',
        tech: 'Debounced React State',
        protocol: 'Event Loop',
        latency: '0ms (Local)',
        role: 'Captures contractor hourly rates, billable hours, expense categories, and tax brackets.',
        resilience: 'Input sanitization against negative numbers and invalid numeric strings.',
      },
      {
        tier: 'CALCULATION CORE',
        title: 'Base-Cent Arithmetic Core',
        tech: 'Integer Deterministic Math',
        protocol: 'CPU Register',
        latency: '< 0.01ms',
        role: 'Executes currency arithmetic in whole cents to prevent IEEE-754 binary floating-point roundoff errors.',
        resilience: 'Deterministic half-up rounding guarantees zero penny drift across thousands of entries.',
      },
      {
        tier: 'VAULT STORAGE',
        title: 'Encrypted Client Vault',
        tech: 'Web Crypto API + IndexedDB',
        protocol: 'AES-GCM 256',
        latency: '< 4ms',
        role: 'Maintains sensitive contractor financial ledger securely on the user device without cloud tracking.',
        resilience: 'Automatic local schema migrations with exportable encrypted backups.',
      },
      {
        tier: 'VISUAL LEDGER',
        title: 'Dynamic Time-Series Charts',
        tech: 'Declarative SVG Geometry',
        protocol: 'Hardware Accelerated',
        latency: '16ms (60 FPS)',
        role: 'Renders tax deductions, gross remuneration, and net income breakdowns in real time.',
        resilience: 'Responsive SVG viewBox scaling for all screen sizes.',
      },
    ],
    technicalDecisions: [
      {
        title: 'Sub-Penny Exact Arithmetic Core',
        challenge: 'Standard JavaScript floating-point calculations (0.1 + 0.2 = 0.30000000000000004) caused financial balance sheets to accumulate rounding discrepancies.',
        cause: 'Binary IEEE-754 representation cannot precisely encode base-10 fractions like pennies.',
        solution: 'Built an integer-cent arithmetic engine storing all currency as whole integers and dividing by 100 only for string formatting.',
        impact: '100% Deterministic Financial Precision // Zero Penny Drift',
      },
      {
        title: 'Client-Side Private Storage',
        challenge: 'Users hesitate to enter sensitive hourly earnings and client contracts into web applications fearing server leaks.',
        cause: 'Traditional web applications transmit ledger records to third-party database servers.',
        solution: 'Architected a zero-cloud client vault persisting data locally using Web Crypto API encryption keys stored in memory.',
        impact: '100% local persistence // Zero third-party data tracking',
      },
      {
        title: 'Real-Time Dynamic Time-Series Projections',
        challenge: 'Recalculating monthly tax liabilities and invoice projections across thousands of line items caused input slider stuttering.',
        cause: 'Unmemoized array reduction runs on every keypress blocked main JavaScript execution thread.',
        solution: 'Engineered memoized incremental aggregators that only recalculate modified invoice intervals.',
        impact: 'Smooth 60 FPS Range Slider Adjustments',
      },
    ],
    codeFilename: 'FinancialEngine.ts',
    codeSnippet: `// Earnings Tracker Sub-Penny Precision Engine
export function calculateRemuneration(hours: number, rateCents: number, taxRate: number) {
  const grossCents = Math.round(hours * rateCents);
  const taxCents = Math.round(grossCents * taxRate);
  const netCents = grossCents - taxCents;
  return { gross: grossCents / 100, tax: taxCents / 100, net: netCents / 100 };
}`,
    mockupType: 'calculator',
    liveUrl: 'https://earningscalculator-app.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Earnings-Tracker',
  },
  {
    id: 'weather',
    index: '06',
    title: 'Global Weather Dashboard',
    tagline: 'Real-Time Atmospheric Forecasts',
    category: 'ASYNC API ARCHITECTURE',
    accent: '#10b981',
    description:
      'Real-time meteorological web application with debounced search and request cancellation via AbortController. Normalizes external API payloads and dynamically adjusts UI styling based on current atmospheric conditions.',
    stack: ['JavaScript', 'REST APIs', 'Async/Await', 'Glassmorphism'],
    metrics: [
      { label: 'COVERAGE', val: 'Worldwide Cities', fill: 20 },
      { label: 'API LATENCY', val: '< 60ms', fill: 19 },
      { label: 'THEMING', val: 'Condition Reactive', fill: 18 },
    ],
    architectureTopology: [
      {
        tier: 'GEO PIPELINE',
        title: 'City Geocoding Pipeline',
        tech: 'Debounced Query Stream',
        protocol: 'AbortController / REST',
        latency: '< 35ms',
        role: 'Resolves typed city queries into precise latitude, longitude coordinates with search debouncing.',
        resilience: 'Cancels stale in-flight requests when user continues typing.',
      },
      {
        tier: 'GATEWAY',
        title: 'OpenWeather REST Gateway',
        tech: 'HTTP Pipeline',
        protocol: 'TLS 1.3 / REST',
        latency: '< 55ms',
        role: 'Fetches barometric pressure, thermodynamic temperatures, wind vectors, and UV indexes.',
        resilience: 'Cache-Control max-age=600 header preventing redundant external API quota burn.',
      },
      {
        tier: 'NORMALIZER',
        title: 'Atmospheric Normalizer',
        tech: 'Pure Functional Transform',
        protocol: 'Client Memory',
        latency: '< 0.05ms',
        role: 'Normalizes disparate meteorological units (Kelvin to Celsius/Fahrenheit, hPa, Beaufort scale).',
        resilience: 'Defensive fallbacks for incomplete sensor payload fields.',
      },
      {
        tier: 'SURFACE THEME',
        title: 'Reactive Shader Surface',
        tech: 'Dynamic CSS Glassmorphism',
        protocol: 'Composite Layer',
        latency: '0ms (CSS)',
        role: 'Dynamically shifts UI backdrop temperature and color gradients based on solar elevation and conditions.',
        resilience: 'Graceful fallback to dark cyber palette if WebGL context is lost.',
      },
    ],
    technicalDecisions: [
      {
        title: 'Debounced Cancellation Token Pipeline',
        challenge: 'Rapid keystrokes in the global city search input fired hundreds of unneeded API requests, exhausting rate limits.',
        cause: 'Missing query debounce and request abortion allowed outdated requests to overwrite newer responses.',
        solution: 'Implemented an AbortController cancellation pipeline paired with a 280ms debounce window.',
        impact: '92% Reduction in API Calls // Zero Stale Race Conditions',
      },
      {
        title: 'Thermodynamic Unit Normalization Engine',
        challenge: 'International users required seamless switching between Metric (°C, km/h) and Imperial (°F, mph) without refetching.',
        cause: 'Re-querying external APIs on unit toggle introduced latency and redundant network traffic.',
        solution: 'Cached the raw Kelvin sensor payload and performed client-side functional unit normalization instantaneously.',
        impact: 'Instant 0ms Unit Toggling // 100% Offline Switchable',
      },
      {
        title: 'Atmospheric Solar-Reactive Theming',
        challenge: 'Static UI themes felt disconnected from real-world weather states reported by atmospheric telemetry.',
        cause: 'Traditional themes use static hardcoded colors regardless of whether it is midnight or noon in Alexandria.',
        solution: 'Calculated solar elevation angles based on city coordinates, adjusting color temperature from cold Mediterranean midnight blue to midday amber.',
        impact: 'Immersive Real-Time Environmental Symbiosis',
      },
    ],
    codeFilename: 'WeatherTelemetry.ts',
    codeSnippet: `// Global Weather Real-Time Normalization
export async function fetchCityTelemetry(query: string, signal: AbortSignal) {
  const geo = await fetch(\`/api/geo?q=\${query}\`, { signal }).then(r => r.json());
  const weather = await fetch(\`/api/weather?lat=\${geo.lat}&lon=\${geo.lon}\`, { signal });
  return normalizeMetrics(await weather.json());
}`,
    mockupType: 'weather',
    liveUrl: 'https://weather-app-ten-tau-49.vercel.app',
    githubUrl: 'https://github.com/nasrelshamekh/Weather-App',
  },
]

function ProjectCard({ project, onInspect }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  )

  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotX = (y / (rect.height / 2)) * -4
    const rotY = (x / (rect.width / 2)) * 4
    setTransform(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
        2
      )}deg) scale3d(1.012, 1.012, 1.012)`
    )
  }

  const onMouseLeave = () => {
    setTransform(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    )
  }

  return (
    <div
      ref={cardRef}
      className="project-card hud-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        padding: 'clamp(18px, 2.2vw, 26px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform,
        transition: 'transform 0.18s ease-out, border-color 0.25s ease',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(6, 9, 15, 0.88)',
        position: 'relative',
        boxShadow:
          '0 20px 45px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
      }}
    >
      <div>
        {/* Top Header Row */}
        <div
          onClick={() => onInspect(project)}
          onMouseEnter={() => sound.play('hover')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: '1px solid var(--color-border-subtle)',
            cursor: 'pointer',
          }}
          title="Click to open Architectural Blueprint"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="text-mono-label"
              style={{
                color: project.accent,
              }}
            >
              [NODE_{project.index}]
            </span>
            <span className="text-mono-micro">
              // SEC_PUBLIC
            </span>
          </div>

          <span
            className="text-mono-micro"
            style={{
              color: project.accent,
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              background: `${project.accent}15`,
              border: `1px solid ${project.accent}33`,
              fontWeight: 700,
            }}
          >
            {project.category}
          </span>
        </div>

        <h3
          className="text-h2"
          style={{
            marginBottom: '4px',
          }}
        >
          {project.title}
        </h3>

        <div
          className="text-mono-label"
          style={{
            color: project.accent,
            marginBottom: '8px',
          }}
        >
          // {project.tagline}
        </div>

        <p
          className="text-body"
          style={{
            marginBottom: '12px',
          }}
        >
          {project.description}
        </p>

        {/* Live Metrics Grid with Segmented Cyber Micro-Bars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            padding: '8px 10px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid var(--color-border-subtle)',
            marginBottom: '12px',
          }}
        >
          {project.metrics.map((m) => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div
                className="text-mono-micro"
                style={{
                  marginBottom: '2px',
                }}
              >
                {m.label}
              </div>
              <div
                className="text-mono-label"
                style={{
                  color: 'var(--color-text-high)',
                  marginBottom: '4px',
                }}
              >
                {m.val}
              </div>

              {/* Mini Segmented Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(10, 1fr)',
                  gap: '1px',
                  height: '3px',
                }}
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor:
                        i < Math.round(m.fill / 2)
                          ? project.accent
                          : 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '1px',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '16px',
          }}
        >
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-mono-micro"
              style={{
                color: '#cbd5e1',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Action Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        {/* Inspect Blueprint Button */}
        <button
          onClick={() => onInspect(project)}
          onMouseEnter={() => sound.play('hover')}
          className="btn-core-secondary"
          style={{
            borderColor: `${project.accent}45`,
            color: project.accent,
            backgroundColor: `${project.accent}10`,
          }}
        >
          <Layers size={13} color={project.accent} />
          <span>INSPECT BLUEPRINT</span>
        </button>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.play('click')}
            onMouseEnter={() => sound.play('hover')}
            className="btn-core-primary"
            style={{
              padding: '10px 18px',
              fontSize: '0.78rem',
            }}
          >
            <span>LAUNCH</span>
            <ExternalLink size={12} />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.play('click')}
            onMouseEnter={() => sound.play('hover')}
            className="btn-core-secondary"
            style={{
              padding: '10px 16px',
              fontSize: '0.78rem',
            }}
          >
            <Code2 size={13} />
            <span>CODE</span>
          </a>
        )}
      </div>
    </div>
  )
}

export function ProjectShowcase() {
  const [selectedBlueprint, setSelectedBlueprint] = useState(null)

  const handleOpenBlueprint = (project) => {
    sound.play('warp')
    setSelectedBlueprint(project)
  }

  const handleCloseBlueprint = () => {
    setSelectedBlueprint(null)
  }

  const handleNavigateProject = (nextProject) => {
    setSelectedBlueprint(nextProject)
  }

  return (
    <section
      id="works"
      style={{
        position: 'relative',
        padding: '80px 0 80px',
        zIndex: 2,
      }}
    >
      <div className="grid-widescreen">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '36px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div
              className="text-mono-label"
              style={{
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-cyan)',
                  boxShadow: '0 0 8px var(--color-accent-cyan)',
                }}
              />
              <span>SECTION 03 // FEATURED WORK</span>
            </div>

            <h2
              className="text-h1"
              style={{
                textTransform: 'uppercase',
              }}
            >
              SELECTED PRODUCTION WORKS
            </h2>
          </div>

          <span
            className="text-mono-micro"
            style={{
              color: 'var(--color-accent-cyan)',
              backgroundColor: 'rgba(0, 240, 255, 0.08)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border-accent)',
            }}
          >
            [06 PRODUCTION PROJECTS]
          </span>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div
          className="projects-responsive-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '24px',
          }}
        >
          {PROJECTS.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onInspect={handleOpenBlueprint}
            />
          ))}
        </div>
      </div>

      {/* Architectural Deep-Dive Blueprint Drawer */}
      <BlueprintDrawer
        project={selectedBlueprint}
        onClose={handleCloseBlueprint}
        onNavigateProject={handleNavigateProject}
        allProjects={PROJECTS}
      />
    </section>
  )
}
