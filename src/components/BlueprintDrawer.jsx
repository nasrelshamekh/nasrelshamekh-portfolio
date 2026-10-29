import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ExternalLink,
  Code2,
  Layers,
  ShieldCheck,
  Cpu,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react'
import { sound } from '../utils/soundEngine'

// --- Interactive Mini-Mockups for Each Project Type ---

function StoreMockup({ accent }) {
  const [cart, setCart] = useState([])
  const [filter, setFilter] = useState('ALL')

  const items = [
    { id: 1, name: 'Neural Core v4', category: 'CHIPS', price: 840, tag: 'IN STOCK' },
    { id: 2, name: 'HoloHUD Visor', category: 'OPTICS', price: 420, tag: 'HOT' },
    { id: 3, name: 'CyberDeck Chassis', category: 'HARDWARE', price: 1150, tag: 'LIMITED' },
  ]

  const filtered = filter === 'ALL' ? items : items.filter((i) => i.category === filter)
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)

  const handleAddToCart = (item) => {
    sound.play('click')
    setCart((prev) => [...prev, item])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Mini Store Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'CHIPS', 'OPTICS', 'HARDWARE'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.play('hover')
                setFilter(cat)
              }}
              style={{
                fontSize: '0.64rem',
                padding: '3px 8px',
                borderRadius: '4px',
                background: filter === cat ? `${accent}25` : 'transparent',
                border: filter === cat ? `1px solid ${accent}` : '1px solid transparent',
                color: filter === cat ? accent : '#94a3b8',
                fontWeight: 700,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{
            fontSize: '0.68rem',
            color: accent,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>CART [{cart.length}]</span>
          <span>${cartTotal}</span>
        </div>
      </div>

      {/* Mini Product Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '12px',
              borderRadius: '6px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.58rem', color: '#64748b' }}>{item.category}</span>
                <span style={{ fontSize: '0.58rem', color: accent }}>{item.tag}</span>
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '0.88rem', color: accent, fontWeight: 800, marginBottom: '10px' }}>
                ${item.price}
              </div>
            </div>

            <button
              onClick={() => handleAddToCart(item)}
              style={{
                padding: '6px 10px',
                fontSize: '0.66rem',
                fontWeight: 700,
                borderRadius: '4px',
                background: `${accent}20`,
                border: `1px solid ${accent}60`,
                color: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              + ADD TO CART
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div
          style={{
            fontSize: '0.68rem',
            color: '#10b981',
            padding: '6px 10px',
            borderRadius: '4px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>✓ OPTIMISTIC CACHE SYNC: {cart.length} item(s) staged in BroadcastChannel</span>
          <button
            onClick={() => {
              sound.play('click')
              setCart([])
            }}
            style={{
              fontSize: '0.6rem',
              color: '#94a3b8',
              background: 'transparent',
              border: 'none',
              textDecoration: 'underline',
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  )
}

function CommunityMockup({ accent }) {
  const [upvotes, setUpvotes] = useState(142)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [comments, setComments] = useState([
    { author: 'tariq.dev', text: 'Clean architecture! ASP.NET Core 10 ValueTask endpoints hit sub-5ms latency.' },
    { author: 'layla.eg', text: 'The compound B-Tree indexes on MySQL completely fixed our feed sorting.' },
  ])
  const [newComment, setNewComment] = useState('')

  const handleUpvote = () => {
    sound.play('click')
    if (hasUpvoted) {
      setUpvotes((v) => v - 1)
      setHasUpvoted(false)
    } else {
      setUpvotes((v) => v + 1)
      setHasUpvoted(true)
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    sound.play('packet')
    setComments((prev) => [...prev, { author: 'you (guest)', text: newComment.trim() }])
    setNewComment('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div
        style={{
          padding: '14px',
          borderRadius: '8px',
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: `${accent}30`,
              border: `1px solid ${accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: accent,
            }}
          >
            NE
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#ffffff' }}>
              Nasr Elshamekh <span style={{ color: accent, fontSize: '0.64rem' }}>// CORE MAINTAINER</span>
            </div>
            <div style={{ fontSize: '0.62rem', color: '#64748b' }}>Alexandria Hub • 14 mins ago</div>
          </div>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '12px' }}>
          Deployed CircleHub service update. Benchmarked ASP.NET Core (.NET 10) JWT authentication policy handlers under high concurrency. Minimized GC heap allocations on authenticated reads using ValueTask.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
          <button
            onClick={handleUpvote}
            style={{
              padding: '4px 10px',
              fontSize: '0.68rem',
              fontWeight: 700,
              borderRadius: '4px',
              background: hasUpvoted ? `${accent}30` : 'rgba(255, 255, 255, 0.04)',
              border: hasUpvoted ? `1px solid ${accent}` : '1px solid rgba(255, 255, 255, 0.08)',
              color: hasUpvoted ? accent : '#cbd5e1',
            }}
          >
            ▲ UPVOTE [{upvotes}]
          </button>
          <span style={{ fontSize: '0.68rem', color: '#64748b' }}>💬 {comments.length} Comments</span>
        </div>
      </div>

      {/* Comment List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {comments.map((c, i) => (
          <div
            key={i}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              fontSize: '0.72rem',
            }}
          >
            <span style={{ color: accent, fontWeight: 700, marginRight: '6px' }}>@{c.author}:</span>
            <span style={{ color: '#94a3b8' }}>{c.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Test live optimistic comment post..."
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '0.72rem',
            background: 'rgba(0, 0, 0, 0.6)',
            border: `1px solid ${accent}40`,
            borderRadius: '4px',
            color: '#ffffff',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 14px',
            fontSize: '0.7rem',
            fontWeight: 700,
            background: accent,
            color: '#040508',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          POST
        </button>
      </form>
    </div>
  )
}

function MobileMockup({ accent }) {
  const [activeTab, setActiveTab] = useState('feed')

  return (
    <div
      style={{
        maxWidth: '340px',
        margin: '0 auto',
        borderRadius: '24px',
        border: `2px solid ${accent}60`,
        background: '#030509',
        overflow: 'hidden',
        boxShadow: `0 0 30px ${accent}20`,
      }}
    >
      {/* Mobile Top Bar */}
      <div
        style={{
          padding: '10px 16px',
          background: 'rgba(255, 255, 255, 0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.6rem',
          color: '#64748b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <span>12:00 UTC+3</span>
        <div style={{ width: '48px', height: '10px', background: '#0a0d14', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }} />
        <span style={{ color: accent }}>5G // 99%</span>
      </div>

      {/* Screen Body */}
      <div style={{ padding: '16px', minHeight: '220px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff' }}>CircleHub Native</span>
          <span style={{ fontSize: '0.58rem', color: accent, border: `1px solid ${accent}`, padding: '2px 6px', borderRadius: '4px' }}>
            60 FPS
          </span>
        </div>

        {activeTab === 'feed' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.64rem', color: accent, marginBottom: '2px' }}>#announcements</div>
              <div style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: 600 }}>TanStack Query optimistic rollbacks active.</div>
            </div>
            <div style={{ padding: '10px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.64rem', color: '#3b82f6', marginBottom: '2px' }}>#dev-chat</div>
              <div style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: 600 }}>Zero layout shifts during cross-screen gesture transitions.</div>
            </div>
          </div>
        )}

        {activeTab === 'hubs' && (
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textAlign: 'center', padding: '30px 0' }}>
            Alexandria Node // 8 active local hubs connected.
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', textAlign: 'center', padding: '30px 0' }}>
            Nasr Elshamekh // Alexandria, Egypt
          </div>
        )}
      </div>

      {/* Mobile Tab Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        {['feed', 'hubs', 'profile'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              sound.play('hover')
              setActiveTab(tab)
            }}
            style={{
              padding: '10px 0',
              fontSize: '0.62rem',
              fontWeight: 700,
              color: activeTab === tab ? accent : '#64748b',
              background: 'transparent',
              border: 'none',
              textTransform: 'uppercase',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

function CalculatorMockup({ accent }) {
  const [rate, setRate] = useState(85)
  const [hours, setHours] = useState(40)
  const taxPercent = 20

  const gross = Math.round(hours * rate * 100) / 100
  const tax = Math.round(gross * (taxPercent / 100) * 100) / 100
  const net = Math.round((gross - tax) * 100) / 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94a3b8', marginBottom: '6px' }}>
            <span>HOURLY RATE</span>
            <span style={{ color: accent, fontWeight: 700 }}>${rate} / hr</span>
          </div>
          <input
            type="range"
            min="20"
            max="250"
            value={rate}
            onChange={(e) => {
              sound.play('hover')
              setRate(Number(e.target.value))
            }}
            style={{ width: '100%', accentColor: accent }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94a3b8', marginBottom: '6px' }}>
            <span>WEEKLY HOURS</span>
            <span style={{ color: accent, fontWeight: 700 }}>{hours} hrs</span>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            value={hours}
            onChange={(e) => {
              sound.play('hover')
              setHours(Number(e.target.value))
            }}
            style={{ width: '100%', accentColor: accent }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          padding: '14px',
          borderRadius: '8px',
          background: 'rgba(0, 0, 0, 0.55)',
          border: `1px solid ${accent}30`,
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '0.6rem', color: '#64748b' }}>GROSS PAY</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>${gross.toFixed(2)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.6rem', color: '#ef4444' }}>TAX ESTIMATE ({taxPercent}%)</div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ef4444' }}>-${tax.toFixed(2)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.6rem', color: accent }}>NET REMUNERATION</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: accent }}>${net.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ fontSize: '0.64rem', color: '#64748b', textAlign: 'center' }}>
        // IEEE-754 Integer Cents Arithmetic: Exact decimal rounding with zero cumulative drift
      </div>
    </div>
  )
}

function WeatherMockup({ accent }) {
  const [city, setCity] = useState('Alexandria')
  const [unit, setUnit] = useState('C')

  const cities = {
    Alexandria: { tempC: 22, condition: 'Clear Mediterranean Breeze', wind: '14 km/h NW', humidity: '58%', coord: '31.2001° N, 29.9187° E' },
    Cairo: { tempC: 27, condition: 'Sunny & Dry', wind: '9 km/h N', humidity: '42%', coord: '30.0444° N, 31.2357° E' },
    Tokyo: { tempC: 16, condition: 'Light Rain', wind: '18 km/h E', humidity: '76%', coord: '35.6762° N, 139.6503° E' },
  }

  const current = cities[city]
  const displayTemp = unit === 'C' ? `${current.tempC}°C` : `${Math.round((current.tempC * 9) / 5 + 32)}°F`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {Object.keys(cities).map((name) => (
            <button
              key={name}
              onClick={() => {
                sound.play('hover')
                setCity(name)
              }}
              style={{
                fontSize: '0.66rem',
                padding: '4px 10px',
                borderRadius: '4px',
                background: city === name ? `${accent}25` : 'transparent',
                border: city === name ? `1px solid ${accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                color: city === name ? accent : '#94a3b8',
                fontWeight: 700,
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            sound.play('click')
            setUnit((u) => (u === 'C' ? 'F' : 'C'))
          }}
          style={{
            fontSize: '0.64rem',
            padding: '4px 8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '4px',
            color: '#ffffff',
            fontWeight: 700,
          }}
        >
          TOGGLE °{unit === 'C' ? 'F' : 'C'}
        </button>
      </div>

      <div
        style={{
          padding: '16px',
          borderRadius: '8px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: `1px solid ${accent}35`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '0.64rem', color: '#64748b', marginBottom: '2px' }}>{current.coord}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{city}</div>
          <div style={{ fontSize: '0.74rem', color: accent }}>{current.condition}</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>{displayTemp}</div>
          <div style={{ fontSize: '0.62rem', color: '#64748b', marginTop: '4px' }}>
            WIND: {current.wind} • HUM: {current.humidity}
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialMockup({ accent }) {
  const [likes, setLikes] = useState(1480)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = () => {
    sound.play('click')
    setLikes((l) => (hasLiked ? l - 1 : l + 1))
    setHasLiked(!hasLiked)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        style={{
          padding: '14px',
          borderRadius: '8px',
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: `${accent}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: accent,
            }}
          >
            NX
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#ffffff' }}>Nexify Kinetic Stream</div>
            <div style={{ fontSize: '0.6rem', color: '#64748b' }}>Fluid Spring Choreography • 120 FPS</div>
          </div>
        </div>

        <div
          style={{
            height: '110px',
            borderRadius: '6px',
            background: `linear-gradient(135deg, ${accent}20 0%, rgba(0, 0, 0, 0.8) 100%)`,
            border: `1px solid ${accent}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accent,
            fontSize: '0.76rem',
            fontWeight: 700,
            marginBottom: '10px',
          }}
        >
          // KINETIC MOTION SURFACE //
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handleLike}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              background: hasLiked ? `${accent}30` : 'rgba(255, 255, 255, 0.04)',
              border: hasLiked ? `1px solid ${accent}` : '1px solid rgba(255, 255, 255, 0.08)',
              color: hasLiked ? accent : '#cbd5e1',
              fontSize: '0.68rem',
              fontWeight: 700,
            }}
          >
            ♥ {hasLiked ? 'LIKED' : 'LIKE'} [{likes}]
          </button>
          <span style={{ fontSize: '0.64rem', color: '#64748b' }}>Virtual DOM Windowing Enabled</span>
        </div>
      </div>
    </div>
  )
}

// --- BlueprintDrawer Inner Modal (Mounts ONLY when project is active) ---

function BlueprintDrawerModal({ project, onClose, onNavigateProject, allProjects }) {
  const [activeTab, setActiveTab] = useState('topology') // 'topology' | 'challenges' | 'preview'
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0)
  const [codeCopied, setCodeCopied] = useState(false)
  const [previewSubTab, setPreviewSubTab] = useState('mockup') // 'mockup' | 'code'

  const drawerRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    // 1. Completely pause Lenis smooth scroll while the drawer is open
    window.__lenis?.stop()

    // 2. Lock background document scroll
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // 3. Prevent scroll chaining when reaching the top or bottom of the drawer
    const drawerEl = drawerRef.current
    const overlayEl = overlayRef.current

    const handleDrawerWheel = (e) => {
      // Isolate wheel event from Lenis and parent document
      e.stopPropagation()

      if (!drawerEl) return
      const { scrollTop, scrollHeight, clientHeight } = drawerEl
      const isDown = e.deltaY > 0
      const isUp = e.deltaY < 0

      // If at bottom and scrolling down, lock default so background page never moves
      if (isDown && scrollTop + clientHeight >= scrollHeight - 2) {
        e.preventDefault()
      }
      // If at top and scrolling up, lock default so background page never moves
      else if (isUp && scrollTop <= 0) {
        e.preventDefault()
      }
    }

    const handleOverlayWheel = (e) => {
      // Disallow any wheel action on the backdrop
      e.preventDefault()
      e.stopPropagation()
    }

    drawerEl?.addEventListener('wheel', handleDrawerWheel, { passive: false })
    overlayEl?.addEventListener('wheel', handleOverlayWheel, { passive: false })

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sound.play('click')
        onClose()
      } else if (e.key === 'ArrowRight' && onNavigateProject) {
        handleNextProject()
      } else if (e.key === 'ArrowLeft' && onNavigateProject) {
        handlePrevProject()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      drawerEl?.removeEventListener('wheel', handleDrawerWheel)
      overlayEl?.removeEventListener('wheel', handleOverlayWheel)
      window.removeEventListener('keydown', handleKeyDown)

      document.body.style.overflow = originalBodyOverflow || ''
      document.documentElement.style.overflow = originalHtmlOverflow || ''

      // Resume Lenis smooth scroll once drawer is closed
      window.__lenis?.start()
    }
  }, [onClose])

  const currentIndex = allProjects?.findIndex((p) => p.id === project.id) ?? -1
  const prevProject = allProjects && currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject =
    allProjects && currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null

  const handlePrevProject = () => {
    if (prevProject) {
      sound.play('warp')
      onNavigateProject(prevProject)
      setSelectedNodeIndex(0)
    }
  }

  const handleNextProject = () => {
    if (nextProject) {
      sound.play('warp')
      onNavigateProject(nextProject)
      setSelectedNodeIndex(0)
    }
  }

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet)
      sound.play('click')
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    }
  }

  const selectedNode = project.architectureTopology?.[selectedNodeIndex]

  return (
    <div
      ref={overlayRef}
      data-lenis-prevent
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(2, 4, 8, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'fadeInHUD 0.25s ease-out',
        overscrollBehavior: 'none',
        WebkitOverscrollBehavior: 'none',
        touchAction: 'none',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.play('click')
          onClose()
        }
      }}
    >
      {/* Sliding Cyberdeck Blueprint Drawer */}
      <div
        ref={drawerRef}
        data-lenis-prevent
        className="blueprint-drawer-panel"
        style={{
          width: '100%',
          maxWidth: '840px',
          height: '100%',
          backgroundColor: '#05070d',
          background: '#05070d',
          opacity: 1,
          borderLeft: `1px solid ${project.accent}45`,
          boxShadow: `-25px 0 70px rgba(0, 0, 0, 0.95), 0 0 50px ${project.accent}20`,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          WebkitOverscrollBehavior: 'contain',
          position: 'relative',
          padding: 'clamp(24px, 4vw, 42px)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {/* Reticles */}
        <span style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.68rem', color: `${project.accent}60` }}>+</span>
        <span style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '0.68rem', color: `${project.accent}60` }}>+</span>

        {/* --- Top Header Navigation & ESC Close --- */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '18px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '22px',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: project.accent,
                boxShadow: `0 0 10px ${project.accent}`,
              }}
            />
            <span
              style={{
                fontSize: '0.74rem',
                color: project.accent,
                fontWeight: 700,
                letterSpacing: '0.14em',
              }}
            >
              ARCHITECTURAL BLUEPRINT // [PROJECT_{project.index}]
            </span>
            <span
              style={{
                fontSize: '0.64rem',
                color: '#64748b',
                padding: '2px 6px',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.04)',
              }}
            >
              SPEC.VERIFIED
            </span>
          </div>

          <button
            onClick={() => {
              sound.play('click')
              onClose()
            }}
            onMouseEnter={() => sound.play('hover')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              padding: '6px 14px',
              color: '#ffffff',
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span>ESC / CLOSE</span>
            <X size={14} />
          </button>
        </div>

        {/* --- Project Identity Headline --- */}
        <div style={{ marginBottom: '24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.7rem',
                color: project.accent,
                padding: '3px 8px',
                borderRadius: '4px',
                background: `${project.accent}15`,
                border: `1px solid ${project.accent}35`,
                fontWeight: 700,
              }}
            >
              {project.category}
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>
              SYSTEM_ID: {project.id} // PRODUCTION
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
              fontWeight: 800,
              color: 'var(--color-text-high)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              lineHeight: 1.05,
              marginBottom: '6px',
            }}
          >
            {project.title}
          </h2>

          <div
            style={{
              fontSize: '0.84rem',
              color: project.accent,
              marginBottom: '12px',
              fontWeight: 600,
            }}
          >
            // {project.tagline}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.94rem',
              color: 'var(--color-text-body)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {project.description}
          </p>
        </div>

        {/* --- Multi-View Navigation Tabs --- */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '26px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            flexShrink: 0,
            minHeight: 'fit-content',
          }}
        >
          {[
            { id: 'topology', label: '[01 // TOPOLOGY]', icon: Layers },
            { id: 'challenges', label: '[02 // CHALLENGES]', icon: ShieldCheck },
            { id: 'preview', label: '[03 // LIVE PREVIEW]', icon: Monitor },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.play('hover')
                  setActiveTab(tab.id)
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  background: isActive ? `${project.accent}20` : 'rgba(255, 255, 255, 0.03)',
                  border: isActive ? `1px solid ${project.accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? project.accent : '#94a3b8',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={13} color={isActive ? project.accent : '#94a3b8'} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ======================================================== */}
        {/* VIEW 01: SYSTEM TOPOLOGY & SERVICE MESH                  */}
        {/* ======================================================== */}
        {activeTab === 'topology' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '0.12em', fontWeight: 700 }}>
                INTERACTIVE DATA FLOW PIPELINE // (CLICK TO INSPECT)
              </div>
              <span style={{ fontSize: '0.64rem', color: project.accent }}>
                SLA: HIGH AVAILABILITY
              </span>
            </div>

            {/* Visual Node Flow Strip with Connectors */}
            <div
              className="blueprint-topology-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
                gap: '8px',
                position: 'relative',
              }}
            >
              {project.architectureTopology?.map((node, idx) => {
                const isSelected = selectedNodeIndex === idx
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      sound.play('click')
                      setSelectedNodeIndex(idx)
                    }}
                    onMouseEnter={() => sound.play('hover')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '8px',
                      background: isSelected ? `${project.accent}18` : 'rgba(0, 0, 0, 0.45)',
                      border: isSelected ? `1px solid ${project.accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      position: 'relative',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? `0 0 20px ${project.accent}25` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.58rem', color: isSelected ? project.accent : '#64748b', fontWeight: 700 }}>
                        {node.tier}
                      </span>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? project.accent : 'rgba(255, 255, 255, 0.2)',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.25 }}>
                      {node.title}
                    </div>
                    <div style={{ fontSize: '0.62rem', color: project.accent, marginTop: '2px' }}>
                      {node.protocol}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Selected Node Deep-Dive Dossier */}
            {selectedNode && (
              <div
                style={{
                  padding: '20px',
                  borderRadius: '8px',
                  background: 'rgba(10, 14, 24, 0.85)',
                  border: `1px solid ${project.accent}40`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.64rem', color: project.accent, fontWeight: 700 }}>
                      SELECTED NODE // {selectedNode.tier}
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                      {selectedNode.title}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748b' }}>LATENCY BUDGET</div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: project.accent }}>
                      {selectedNode.latency}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div style={{ padding: '10px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', marginBottom: '2px' }}>PRIMARY TECHNOLOGY</div>
                    <div style={{ fontSize: '0.76rem', color: '#ffffff', fontWeight: 700 }}>{selectedNode.tech}</div>
                  </div>
                  <div style={{ padding: '10px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', marginBottom: '2px' }}>COMMUNICATION PROTOCOL</div>
                    <div style={{ fontSize: '0.76rem', color: project.accent, fontWeight: 700 }}>{selectedNode.protocol}</div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.64rem', color: '#64748b', marginBottom: '4px', fontWeight: 700 }}>
                    ENGINEERING ROLE &amp; DATA RESPONSIBILITY //
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'var(--color-text-high)', lineHeight: 1.55, margin: 0 }}>
                    {selectedNode.role}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '0.64rem', color: 'var(--color-text-muted)', marginBottom: '4px', fontWeight: 700 }}>
                    FAULT TOLERANCE &amp; RESILIENCE POLICY //
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: 'var(--color-text-body)', lineHeight: 1.55, margin: 0 }}>
                    {selectedNode.resilience}
                  </p>
                </div>
              </div>
            )}

            {/* Production Verification Benchmarks */}
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '10px' }}>
                VERIFIED TELEMETRY BENCHMARKS //
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                  gap: '10px',
                }}
              >
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      padding: '12px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '0.62rem', color: '#64748b', marginBottom: '4px' }}>{m.label}</div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>{m.val}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '1.5px', height: '4px' }}>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: i < Math.round(m.fill / 2) ? project.accent : 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '1px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 02: RESOLVED ENGINEERING CHALLENGES                 */}
        {/* ======================================================== */}
        {activeTab === 'challenges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '4px' }}>
              CRITICAL BOTTLENECKS, ROOT CAUSES &amp; IMPLEMENTED ARCHITECTURAL FIXES //
            </div>

            {project.technicalDecisions?.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '18px 20px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(10, 14, 22, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: project.accent, fontSize: '0.76rem', fontWeight: 800 }}>
                      [CHALLENGE 0{idx + 1}]
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>
                      {item.title}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '0.64rem',
                      color: '#10b981',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      fontWeight: 700,
                    }}
                  >
                    ✓ {item.impact}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                  <div>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.72rem', marginRight: '6px' }}>
                      BOTTLENECK / PROBLEM:
                    </span>
                    <span style={{ color: 'var(--color-text-body)', fontFamily: 'var(--font-body)' }}>
                      {item.challenge}
                    </span>
                  </div>

                  <div>
                    <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.72rem', marginRight: '6px' }}>
                      ROOT CAUSE ANALYSIS:
                    </span>
                    <span style={{ color: 'var(--color-text-body)', fontFamily: 'var(--font-body)' }}>
                      {item.cause}
                    </span>
                  </div>

                  <div>
                    <span style={{ color: project.accent, fontWeight: 700, fontSize: '0.72rem', marginRight: '6px' }}>
                      ARCHITECTURAL FIX:
                    </span>
                    <span style={{ color: 'var(--color-text-high)', fontFamily: 'var(--font-body)' }}>
                      {item.solution}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 03: LIVE UI MOCKUP & SOURCE CODE VIEW               */}
        {/* ======================================================== */}
        {activeTab === 'preview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* View Sub-Toggle (Live Mockup vs Source Code) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    sound.play('hover')
                    setPreviewSubTab('mockup')
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: previewSubTab === 'mockup' ? `${project.accent}25` : 'rgba(255, 255, 255, 0.04)',
                    border: previewSubTab === 'mockup' ? `1px solid ${project.accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                    color: previewSubTab === 'mockup' ? project.accent : '#94a3b8',
                  }}
                >
                  <Monitor size={12} style={{ display: 'inline', marginRight: '6px' }} />
                  <span>INTERACTIVE UI MOCKUP</span>
                </button>

                <button
                  onClick={() => {
                    sound.play('hover')
                    setPreviewSubTab('code')
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: previewSubTab === 'code' ? `${project.accent}25` : 'rgba(255, 255, 255, 0.04)',
                    border: previewSubTab === 'code' ? `1px solid ${project.accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                    color: previewSubTab === 'code' ? project.accent : '#94a3b8',
                  }}
                >
                  <Code2 size={12} style={{ display: 'inline', marginRight: '6px' }} />
                  <span>PRODUCTION CODE SNIPPET</span>
                </button>
              </div>

              {previewSubTab === 'code' && (
                <button
                  onClick={handleCopyCode}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: codeCopied ? '#10b981' : '#cbd5e1',
                    fontSize: '0.68rem',
                  }}
                >
                  {codeCopied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{codeCopied ? 'COPIED!' : 'COPY CODE'}</span>
                </button>
              )}
            </div>

            {/* Desktop Frame Wrapper */}
            <div
              style={{
                borderRadius: '10px',
                backgroundColor: '#020306',
                border: `1px solid ${project.accent}35`,
                overflow: 'hidden',
                boxShadow: `0 10px 40px rgba(0, 0, 0, 0.8)`,
              }}
            >
              {/* Browser / Shell Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
                </div>

                <div
                  style={{
                    fontSize: '0.66rem',
                    color: '#64748b',
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '4px 14px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  🔒 https://nasrelshamekh.io/{project.id}
                </div>

                <span style={{ fontSize: '0.62rem', color: project.accent }}>
                  {previewSubTab === 'code' ? project.codeFilename : 'LIVE_FRAME'}
                </span>
              </div>

              {/* View Sub-Tab 1: Interactive Mini Mockup */}
              {previewSubTab === 'mockup' && (
                <div style={{ padding: '20px' }}>
                  {project.mockupType === 'store' && <StoreMockup accent={project.accent} />}
                  {project.mockupType === 'community' && <CommunityMockup accent={project.accent} />}
                  {project.mockupType === 'mobile' && <MobileMockup accent={project.accent} />}
                  {project.mockupType === 'social' && <SocialMockup accent={project.accent} />}
                  {project.mockupType === 'calculator' && <CalculatorMockup accent={project.accent} />}
                  {project.mockupType === 'weather' && <WeatherMockup accent={project.accent} />}
                </div>
              )}

              {/* View Sub-Tab 2: Production Code Snippet */}
              {previewSubTab === 'code' && (
                <pre
                  style={{
                    margin: 0,
                    padding: '20px',
                    fontSize: '0.74rem',
                    lineHeight: 1.6,
                    color: '#cbd5e1',
                    overflowX: 'auto',
                    background: '#020306',
                  }}
                >
                  <code>{project.codeSnippet}</code>
                </pre>
              )}
            </div>
          </div>
        )}

        {/* --- Multi-Project Drawer Navigator Footer --- */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            flexShrink: 0,
          }}
        >
          {/* Node Prev / Next Switcher */}
          {allProjects && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={handlePrevProject}
                disabled={!prevProject}
                onMouseEnter={() => sound.play('hover')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'transparent',
                  border: 'none',
                  color: prevProject ? '#cbd5e1' : '#334155',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: prevProject ? 'pointer' : 'default',
                }}
              >
                <ChevronLeft size={14} />
                <span>PREV NODE {prevProject ? `[${prevProject.index}]` : ''}</span>
              </button>

              <span style={{ fontSize: '0.64rem', color: '#64748b' }}>
                NODE [{project.index} / {String(allProjects.length).padStart(2, '0')}]
              </span>

              <button
                onClick={handleNextProject}
                disabled={!nextProject}
                onMouseEnter={() => sound.play('hover')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'transparent',
                  border: 'none',
                  color: nextProject ? '#cbd5e1' : '#334155',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: nextProject ? 'pointer' : 'default',
                }}
              >
                <span>NEXT NODE {nextProject ? `[${nextProject.index}]` : ''}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Direct External Launch Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                onMouseEnter={() => sound.play('hover')}
                className="btn-core-primary"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${project.accent} 0%, #3b82f6 100%)`,
                  color: '#05070c',
                  fontSize: '0.78rem',
                  border: 'none',
                  minWidth: '180px',
                }}
              >
                <span>LAUNCH LIVE INSTANCE</span>
                <ExternalLink size={14} />
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
                  flex: 1,
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  minWidth: '160px',
                }}
              >
                <Code2 size={14} />
                <span>SOURCE REPO</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Exported BlueprintDrawer Component ---
export function BlueprintDrawer({ project, onClose, onNavigateProject, allProjects }) {
  if (!project) return null

  if (typeof document === 'undefined') return null

  return createPortal(
    <BlueprintDrawerModal
      project={project}
      onClose={onClose}
      onNavigateProject={onNavigateProject}
      allProjects={allProjects}
    />,
    document.body
  )
}
