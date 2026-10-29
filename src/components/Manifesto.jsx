import React from 'react'
import { ShieldCheck, Zap, Award } from 'lucide-react'

const PILLARS = [
  {
    num: '01',
    label: 'RESILIENT ARCHITECTURE',
    title: 'Clean Architecture & Microservices',
    accent: '#3b82f6',
    icon: ShieldCheck,
    metric: 'ARCHITECTURE // .NET 10',
    metricVal: 'HIGH-CONCURRENCY',
    barsFilled: 19,
    desc: 'Software should fail gracefully, not silently. I build modular services in ASP.NET Core (.NET 10) with structured dependency injection, strict boundary validation, and role-based policies to ensure reliability under load.',
  },
  {
    num: '02',
    label: 'FLUID USER EXPERIENCE',
    title: 'Motion Design & Hardware Acceleration',
    accent: '#00f0ff',
    icon: Zap,
    metric: 'TARGET FRAME BUDGET',
    metricVal: '60–120 HZ FLUID',
    barsFilled: 20,
    desc: 'Interfaces should feel natural and responsive. By coordinating animations through hardware-accelerated composite layers and unified frame clocks, transitions guide the user without inducing layout thrashing.',
  },
  {
    num: '03',
    label: 'PRODUCTION RIGOR',
    title: 'Strict Type Boundaries & Persistence',
    accent: '#10b981',
    icon: Award,
    metric: 'TYPE SYSTEM DISCIPLINE',
    metricVal: 'STRONG TYPE SAFETY',
    barsFilled: 20,
    desc: 'Great code is code that ships cleanly and remains maintainable. I prioritize strong type safety, normalized relational schemas with Entity Framework Core migrations, and automated edge deployments.',
  },
]

export function Manifesto() {
  return (
    <section
      id="manifesto"
      style={{
        position: 'relative',
        padding: '120px 0 100px',
        zIndex: 2,
      }}
    >
      <div className="grid-widescreen">
        {/* Section Header */}
        <div style={{ marginBottom: '56px' }}>
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
            <span>SECTION 04 // ENGINEERING STANDARDS &amp; ETHOS</span>
          </div>

          <h2
            className="text-h1"
            style={{
              textTransform: 'uppercase',
            }}
          >
            HOW I CONSTRUCT SOFTWARE
          </h2>
        </div>

        {/* 3 Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
          }}
        >
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.num}
                className="hud-card"
                style={{
                  padding: 'clamp(24px, 4vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'rgba(6, 9, 15, 0.88)',
                  border: '1px solid var(--color-border-subtle)',
                  position: 'relative',
                }}
              >
                {/* Crosshairs */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '12px',
                    fontSize: '0.65rem',
                    color: 'rgba(255, 255, 255, 0.2)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  +
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <span
                        className="text-h2"
                        style={{
                          color: p.accent,
                        }}
                      >
                        [0{p.num}]
                      </span>
                      <Icon size={16} color={p.accent} />
                    </div>

                    <span
                      className="text-mono-micro"
                      style={{
                        color: p.accent,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        background: `${p.accent}15`,
                        border: `1px solid ${p.accent}33`,
                        fontWeight: 700,
                      }}
                    >
                      {p.label}
                    </span>
                  </div>

                  <h3
                    className="text-h3"
                    style={{
                      marginBottom: '12px',
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    className="text-body"
                    style={{
                      marginBottom: '24px',
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                {/* Micro Segmented Telemetry Bar */}
                <div
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <div
                    className="text-mono-micro"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}
                  >
                    <span>{p.metric}</span>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>
                      {p.metricVal}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(20, 1fr)',
                      gap: '2px',
                      height: '6px',
                    }}
                  >
                    {Array.from({ length: 20 }).map((_, barIdx) => (
                      <div
                        key={barIdx}
                        style={{
                          backgroundColor:
                            barIdx < p.barsFilled
                              ? p.accent
                              : 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '1px',
                          boxShadow:
                            barIdx < p.barsFilled
                              ? `0 0 4px ${p.accent}`
                              : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
