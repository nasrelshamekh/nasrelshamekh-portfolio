import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DataFlowVisualizer } from './DataFlowVisualizer'
import { Terminal, Shield, Cpu, Smartphone } from 'lucide-react'
import { sound } from '../utils/soundEngine'

gsap.registerPlugin(ScrollTrigger)

const SYSTEM_TABS = [
  {
    id: 'backend',
    num: '01',
    label: 'BACKEND ARCHITECTURE',
    title: 'ASP.NET Core (.NET 10) & C# Microservices',
    accent: '#3b82f6',
    icon: Cpu,
    summary:
      'Engineered for high request throughput and low latency. Utilizes clean architecture, dependency injection, and ASP.NET Core (.NET 10) endpoints with JWT bearer authentication policies.',
    benchmarks: [
      { key: 'ARCHITECTURE', val: 'Clean CQRS', fill: 18 },
      { key: 'AVG LATENCY', val: '< 20 ms', fill: 19 },
      { key: 'AUTH SECURITY', val: 'HMAC-SHA256 JWT', fill: 20 },
      { key: 'PIPELINE', val: 'Kestrel / ValueTask', fill: 18 },
    ],
    codeSnippet: `// ASP.NET Core 10 High-Throughput Endpoint
[ApiController]
[Route("api/v1/store")]
public class CatalogController : ControllerBase 
{
    private readonly ICatalogService _catalog;
    public CatalogController(ICatalogService catalog) => _catalog = catalog;

    [HttpGet("products")]
    [Authorize(Policy = "StoreAccess")]
    public async Task<IActionResult> GetIndex([FromQuery] FilterQuery query)
    {
        var result = await _catalog.GetIndexedAsync(query);
        return Ok(result); // Sub-20ms execution
    }
}`,
  },
  {
    id: 'frontend',
    num: '02',
    label: 'RESPONSIVE CLIENT CRAFT',
    title: 'React 19, Next.js App Router & Hardware-Accelerated UI',
    accent: '#00f0ff',
    icon: Terminal,
    summary:
      'Client applications structured with React 19 Server Components and TypeScript, coordinating smooth animations via hardware-accelerated composite layers and requestAnimationFrame.',
    benchmarks: [
      { key: 'RENDER CLOCK', val: '60–120Hz Fluid', fill: 20 },
      { key: 'HYDRATION', val: 'Selective Streaming', fill: 19 },
      { key: 'TYPE SAFETY', val: 'Strict TypeScript', fill: 20 },
      { key: 'LAYOUT STABILITY', val: 'Zero CLS (0.00)', fill: 20 },
    ],
    codeSnippet: `// React 19 Concurrent Client Composition
export default function WorkShowcase({ projects }) {
  const [active, setActive] = useState(null)
  const lenis = useLenis()

  // Coordinated GSAP ScrollTrigger ticker
  useGSAP(() => {
    ScrollTrigger.batch('.project-card', {
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1 }),
      start: 'top 85%'
    })
  })

  return <section className="widescreen-grid">{/* 120 FPS UI */}</section>
}`,
  },
  {
    id: 'database',
    num: '03',
    label: 'DATA PERSISTENCE',
    title: 'PostgreSQL & MySQL Relational Schemas',
    accent: '#10b981',
    icon: Shield,
    summary:
      'Relational schema design with normalized tables, composite indices, and automated migrations via Entity Framework Core and Prisma ORM. Optimized for fast reads and ACID transaction integrity.',
    benchmarks: [
      { key: 'TRANSACTIONS', val: 'ACID Guaranteed', fill: 20 },
      { key: 'INDEXING', val: 'B-Tree Composite', fill: 19 },
      { key: 'ORM PIPELINE', val: 'EF Core 10 / Prisma', fill: 18 },
      { key: 'MIGRATIONS', val: 'Automated CI/CD', fill: 19 },
    ],
    codeSnippet: `-- MySQL / PostgreSQL Normalized Relational Schema
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    total_cents INT NOT NULL,
    status VARCHAR(32) NOT NULL,
    INDEX idx_user_orders (user_id, status)
);`,
  },
  {
    id: 'mobile',
    num: '04',
    label: 'CROSS-PLATFORM MOBILE',
    title: 'React Native & Expo Router Mobile Client',
    accent: '#8b5cf6',
    icon: Smartphone,
    summary:
      'Cross-platform iOS and Android architecture featuring file-based routing with Expo Router, NativeWind styling, and optimistic network mutation caching via TanStack Query.',
    benchmarks: [
      { key: 'TARGETS', val: 'iOS & Android', fill: 20 },
      { key: 'ROUTING', val: 'File-Based Router', fill: 19 },
      { key: 'MUTATIONS', val: 'Optimistic UI', fill: 18 },
      { key: 'GESTURES', val: 'Reanimated 3', fill: 19 },
    ],
    codeSnippet: `// CircleHub Mobile Expo File-Based Route
import { Stack } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

export default function FeedScreen() {
  const { data: posts, isPending } = useQuery({
    queryKey: ['feed'],
    queryFn: fetchCommunityFeed
  })

  return (
    <View className="flex-1 bg-neutral-950 px-4">
      <FeedList posts={posts} refreshing={isPending} />
    </View>
  )
}`,
  },
]

export function SystemInspector() {
  const [activeTab, setActiveTab] = useState(SYSTEM_TABS[0])
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.inspector-header', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="system"
      style={{
        position: 'relative',
        padding: '120px 0 100px',
        zIndex: 2,
      }}
    >
      <div className="grid-widescreen">
        {/* Section Header */}
        <div className="inspector-header" style={{ marginBottom: '48px' }}>
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
            <span>SECTION 02 // ARCHITECTURE &amp; REQUEST LIFECYCLE</span>
          </div>

          <h2
            className="text-h1"
            style={{
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            THE SYSTEM INSPECTOR
          </h2>

          <p
            className="text-body-lg"
            style={{
              maxWidth: '680px',
            }}
          >
            Explore the request lifecycle and architecture patterns powering my software—from ASP.NET Core (.NET 10) microservices to responsive React 19 client interfaces.
          </p>
        </div>

        {/* Live Architectural Simulation */}
        <DataFlowVisualizer />

        {/* Tab Selection Row */}
        <div
          className="system-inspector-tabs"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {SYSTEM_TABS.map((tab) => {
            const isSelected = activeTab.id === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab)
                  sound.play('click')
                }}
                onMouseEnter={() => sound.play('hover')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  background: isSelected
                    ? 'rgba(0, 240, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isSelected
                    ? `1.5px solid ${tab.accent}`
                    : '1px solid rgba(255, 255, 255, 0.07)',
                  textAlign: 'left',
                  transition: 'all 0.22s ease',
                  boxShadow: isSelected
                    ? `0 0 20px ${tab.accent}20`
                    : 'none',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: isSelected
                      ? tab.accent
                      : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    size={14}
                    color={isSelected ? '#05070c' : tab.accent}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.62rem',
                      color: tab.accent,
                      fontWeight: 700,
                    }}
                  >
                    MODULE [{tab.num}]
                  </div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: isSelected ? '#ffffff' : '#94a3b8',
                    }}
                  >
                    {tab.label}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Interactive Console Workstation */}
        <div
          className="hud-card contact-col-grid"
          style={{
            padding: ' clamp(24px, 4vw, 40px)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '40px',
            alignItems: 'start',
            border: `1px solid ${activeTab.accent}33`,
            backgroundColor: 'rgba(6, 9, 15, 0.88)',
          }}
        >
          {/* Left: Summary & Benchmarks with Segmented Bars */}
          <div>
            <div
              className="text-mono-label"
              style={{
                color: activeTab.accent,
                marginBottom: '10px',
              }}
            >
              MODULE SPECIFICATION // 0x0{activeTab.num}
            </div>

            <h3
              className="text-h2"
              style={{
                marginBottom: '16px',
              }}
            >
              {activeTab.title}
            </h3>

            <p
              className="text-body"
              style={{
                marginBottom: '32px',
              }}
            >
              {activeTab.summary}
            </p>

            {/* Benchmark Matrix with Segmented Telemetry Bars */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
              }}
            >
              {activeTab.benchmarks.map((b) => (
                <div
                  key={b.key}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.64rem',
                      color: '#64748b',
                      marginBottom: '4px',
                    }}
                  >
                    {b.key}
                  </div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '8px',
                    }}
                  >
                    {b.val}
                  </div>

                  {/* Segmented Micro Bar */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(20, 1fr)',
                      gap: '1.5px',
                      height: '5px',
                    }}
                  >
                    {Array.from({ length: 20 }).map((_, barIdx) => (
                      <div
                        key={barIdx}
                        style={{
                          backgroundColor:
                            barIdx < b.fill
                              ? activeTab.accent
                              : 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '1px',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Interactive Code Pane */}
          <div
            style={{
              borderRadius: '10px',
              background: '#030508',
              border: `1px solid ${activeTab.accent}44`,
              overflow: 'hidden',
              boxShadow: `0 15px 35px -10px ${activeTab.accent}22`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                color: '#94a3b8',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#ff5f56',
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#ffbd2e',
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#27c93f',
                    display: 'inline-block',
                  }}
                />
              </div>

              <span style={{ color: activeTab.accent, fontWeight: 700 }}>
                // {activeTab.id}.spec.cs
              </span>
            </div>

            <pre
              style={{
                margin: 0,
                padding: '20px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.76rem',
                lineHeight: 1.6,
                color: '#cbd5e1',
                overflowX: 'auto',
              }}
            >
              <code>{activeTab.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
