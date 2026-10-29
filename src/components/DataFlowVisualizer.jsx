import React, { useState, useEffect } from 'react'
import { sound } from '../utils/soundEngine'

const PIPELINE_STEPS = [
  {
    id: 'client',
    stageNum: '01',
    tag: 'STAGE 01 // CLIENT DISPATCH',
    title: 'React 19 & Next.js',
    protocol: 'HTTP/2 • TLS 1.3',
    latency: '0.4ms',
    status: 'DISPATCHED',
    color: '#00f0ff',
    metrics: {
      payload: 'JSON 14KB',
      cache: 'Cache-Control: private',
      state: 'Streaming SSR',
    },
    code: `// Client Dispatches Request
const res = await fetch('/api/v1/orders', {
  method: 'POST',
  headers: { 'Authorization': \`Bearer \${jwtToken}\` },
  body: JSON.stringify(orderPayload)
})`,
  },
  {
    id: 'gateway',
    stageNum: '02',
    tag: 'STAGE 02 // AUTH & AUTHORIZATION',
    title: 'JWT Bearer Guard',
    protocol: 'HMAC-SHA256 • RBAC',
    latency: '1.2ms',
    status: 'AUTHORIZED',
    color: '#8b5cf6',
    metrics: {
      algorithm: 'HS256',
      claims: 'Role=Admin,Exp=3600',
      validation: 'ClaimsPrincipal OK',
    },
    code: `// JWT Authentication Middleware
app.UseAuthentication();
app.UseAuthorization();
builder.Services.AddAuthorizationBuilder()
  .AddPolicy("StoreAccess", policy => policy.RequireRole("Admin", "Customer"));`,
  },
  {
    id: 'engine',
    stageNum: '03',
    tag: 'STAGE 03 // SERVICE EXECUTION',
    title: 'ASP.NET Core (.NET 10)',
    protocol: 'C# 13 • Kestrel Server',
    latency: '8.4ms',
    status: '200 OK',
    color: '#3b82f6',
    metrics: {
      threads: 'ThreadPool Optimized',
      throughput: 'High-Concurrency',
      mem: 'Gen0 GC = 0.02ms',
    },
    code: `// .NET 10 Minimal API Pipeline
app.MapPost("/api/v1/orders", async (OrderRequest req, IOrderService orders) => {
    var order = await orders.ProcessAsync(req);
    return Results.Ok(order); // High-throughput sub-15ms execution
}).RequireAuthorization("StoreAccess");`,
  },
  {
    id: 'database',
    stageNum: '04',
    tag: 'STAGE 04 // DATA PERSISTENCE',
    title: 'PostgreSQL & MySQL',
    protocol: 'EF Core 10 • ACID',
    latency: '4.2ms',
    status: 'COMMITTED',
    color: '#10b981',
    metrics: {
      isolation: 'ReadCommitted',
      index: 'B-Tree Composite',
      plan: 'Index Scan 0.04ms',
    },
    code: `// Entity Framework Core Optimized LINQ
await using var tx = await _db.Database.BeginTransactionAsync();
_db.Orders.Add(newOrder);
await _db.SaveChangesAsync();
await tx.CommitAsync();`,
  },
]

export function DataFlowVisualizer() {
  const [activeStepIndex, setActiveStepIndex] = useState(2)
  const [packetPos, setPacketPos] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPacketPos((prev) => {
        const next = (prev + 1) % PIPELINE_STEPS.length
        sound.play('packet')
        return next
      })
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  const activeStep = PIPELINE_STEPS[activeStepIndex]

  return (
    <div
      className="hud-card"
      style={{
        padding: 'clamp(24px, 4vw, 36px)',
        marginBottom: '64px',
        border: '1px solid rgba(0, 240, 255, 0.22)',
        background: 'rgba(5, 8, 14, 0.88)',
        position: 'relative',
        boxShadow:
          '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.05)',
      }}
    >
      {/* Corner Cyber Reticles */}
      <span
        style={{
          position: 'absolute',
          top: '10px',
          left: '12px',
          fontSize: '0.65rem',
          color: 'rgba(0, 240, 255, 0.35)',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        +
      </span>
      <span
        style={{
          position: 'absolute',
          top: '10px',
          right: '12px',
          fontSize: '0.65rem',
          color: 'rgba(0, 240, 255, 0.35)',
          fontFamily: 'JetBrains Mono, monospace',
        }}
      >
        +
      </span>

      {/* Header Telemetry Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.68rem',
              color: '#00f0ff',
              letterSpacing: '0.14em',
              fontWeight: 700,
              marginBottom: '4px',
            }}
          >
            REQUEST LIFECYCLE TELEMETRY // PIPELINE INSPECTION
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            End-to-End Request Pipeline
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.68rem',
              color: '#00f0ff',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#00f0ff',
                boxShadow: '0 0 6px #00f0ff',
              }}
            />
            <span>PACKET: ACTIVE</span>
          </div>

          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.68rem',
              color: '#64748b',
            }}
          >
            CYCLE: {packetPos + 1}/4
          </div>
        </div>
      </div>

      {/* 4 Pipeline Stage Nodes with Glowing Conduits */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          position: 'relative',
          marginBottom: '28px',
        }}
      >
        {PIPELINE_STEPS.map((step, idx) => {
          const isSelected = activeStepIndex === idx
          const isPacketHere = packetPos === idx

          return (
            <div
              key={step.id}
              onClick={() => {
                setActiveStepIndex(idx)
                sound.play('click')
              }}
              onMouseEnter={() => sound.play('hover')}
              style={{
                cursor: 'pointer',
                borderRadius: '10px',
                padding: '16px',
                backgroundColor: isSelected
                  ? 'rgba(8, 14, 24, 0.95)'
                  : 'rgba(255, 255, 255, 0.02)',
                border: isSelected
                  ? `1.5px solid ${step.color}`
                  : isPacketHere
                  ? '1px solid rgba(0, 240, 255, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: isSelected
                  ? `0 0 20px ${step.color}25`
                  : isPacketHere
                  ? '0 0 15px rgba(0, 240, 255, 0.2)'
                  : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
              }}
            >
              {/* Packet Beacon Indicator */}
              {isPacketHere && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '12px',
                    backgroundColor: '#00f0ff',
                    color: '#05070c',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.55rem',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '2px',
                    boxShadow: '0 0 8px #00f0ff',
                  }}
                >
                  PACKET
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.64rem',
                  color: isSelected ? step.color : '#64748b',
                  marginBottom: '8px',
                  fontWeight: 700,
                }}
              >
                <span>{step.tag}</span>
                <span
                  style={{
                    color: isSelected ? '#ffffff' : '#64748b',
                    fontSize: '0.62rem',
                  }}
                >
                  {step.latency}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '6px',
                }}
              >
                {step.title}
              </div>

              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: step.color,
                  }}
                />
                <span>{step.protocol}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active Stage Terminal Inspection Console */}
      <div
        style={{
          borderRadius: '10px',
          backgroundColor: '#030508',
          border: `1px solid ${activeStep.color}35`,
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)',
        }}
        className="contact-col-grid"
      >
        {/* Left: Code Snippet */}
        <div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.66rem',
              color: activeStep.color,
              marginBottom: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            ACTIVE STAGE IMPLEMENTATION //
          </div>
          <pre
            style={{
              margin: 0,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.74rem',
              lineHeight: 1.55,
              color: '#cbd5e1',
              whiteSpace: 'pre-wrap',
            }}
          >
            <code>{activeStep.code}</code>
          </pre>
        </div>

        {/* Right: Stage Micro-Metrics & Telemetry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.66rem',
              color: '#64748b',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            TELEMETRY REGISTERS //
          </div>

          {Object.entries(activeStep.metrics).map(([key, val]) => (
            <div
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
              }}
            >
              <span style={{ color: '#64748b', textTransform: 'uppercase' }}>
                {key}
              </span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>{val}</span>
            </div>
          ))}

          {/* Micro Segmented Latency Bar */}
          <div
            style={{
              marginTop: '4px',
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '6px',
              border: `1px solid ${activeStep.color}25`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.64rem',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#64748b',
                marginBottom: '6px',
              }}
            >
              <span>STATUS: {activeStep.status}</span>
              <span style={{ color: activeStep.color, fontWeight: 700 }}>
                EXEC: {activeStep.latency}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(16, 1fr)',
                gap: '2px',
                height: '8px',
              }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor:
                      i < 13 ? activeStep.color : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '1px',
                    boxShadow:
                      i < 13 ? `0 0 4px ${activeStep.color}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
