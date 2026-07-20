import React, { useState } from 'react'

// ─── Design Tokens ──────────────────────────────────────────────────────────

const COLORS = {
  green:  '#4FD37A', greenDark:  '#35B862',
  blue:   '#6BCBFF', blueDark:   '#3BAEE5',
  yellow: '#FFD54A', yellowDark: '#E6BB2A',
  orange: '#FFB347', orangeDark: '#E8953A',
  purple: '#A78BFA', purpleDark: '#8B5CF6',
  coral:  '#FF7B7B', coralDark:  '#E85A5A',
  neutral: '#F6F7FB',
  white: '#FFFFFF',
  dark: '#1A1A2E',
  text: '#2D2D44',
  textMid: '#6B7280',
  textLight: '#9CA3AF',
} as const

type BlockColor = 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'coral'

const BLOCK_PALETTE: Record<BlockColor, { bg: string; dark: string; light: string; text: string }> = {
  green:  { bg: COLORS.green,  dark: COLORS.greenDark,  light: '#80E8A2', text: '#1A6B3A' },
  blue:   { bg: COLORS.blue,   dark: COLORS.blueDark,   light: '#9BDBFF', text: '#1A5A7A' },
  yellow: { bg: COLORS.yellow, dark: COLORS.yellowDark, light: '#FFE27A', text: '#7A5A00' },
  orange: { bg: COLORS.orange, dark: COLORS.orangeDark, light: '#FFC870', text: '#7A3A00' },
  purple: { bg: COLORS.purple, dark: COLORS.purpleDark, light: '#C4ADFC', text: '#3A1A7A' },
  coral:  { bg: COLORS.coral,  dark: COLORS.coralDark,  light: '#FF9E9E', text: '#7A1A1A' },
}

// ─── Primitives ─────────────────────────────────────────────────────────────

function StarIcon({ size = 20, filled = true, color = '#FFD54A' }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={filled ? 0 : 2}
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CoinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FFD54A" />
      <circle cx="12" cy="12" r="7" fill="#FFC107" />
      <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="900" fill="#7A5A00" fontFamily="Nunito">$</text>
    </svg>
  )
}

function LightningIcon({ size = 16, color = '#FFB347' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M13 2L4.09 12.97H12L11 22L19.91 11.03H13L13 2Z" />
    </svg>
  )
}

function FireIcon({ size = 16, color = '#FF7B7B' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 23C8.13 23 5 19.87 5 16c0-3.12 2.1-5.57 3.25-6.75.5-.5 1.25-.14 1.25.56v.44C9.5 12 11 13.5 12 12c1.5-2 1-5 .5-7 2.5 1 6 4.5 6 8.5 0 4.42-3.13 9.5-6.5 9.5z" />
    </svg>
  )
}

function CheckIcon({ size = 16, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function LockIcon({ size = 16, color = '#9CA3AF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="3" ry="3" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function PlayIcon({ size = 16, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

function TrophyIcon({ size = 20, color = '#FFD54A' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M6 2h12v8a6 6 0 0 1-12 0V2zm-2 2H2v3a3 3 0 0 0 2 2.83V4zm14 0v5.83A3 3 0 0 0 20 7V4h-2zM9 18v1H7v2h10v-2h-2v-1a6 6 0 0 1-6 0z" />
    </svg>
  )
}

function HomeIcon({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <polyline points="9,21 9,12 15,12 15,21" />
    </svg>
  )
}

function BookIcon({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function GameIcon({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <path d="M7 12h4M9 10v4" />
      <circle cx="16" cy="11" r="1" fill={color} stroke="none" />
      <circle cx="15" cy="13" r="1" fill={color} stroke="none" />
    </svg>
  )
}

function ProfileIcon({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function SearchIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function BellIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function ArrowRightIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// ─── Number Block ────────────────────────────────────────────────────────────

const NUM_COLORS: BlockColor[] = ['green', 'blue', 'yellow', 'orange', 'purple', 'coral']

function NumberBlock({
  value,
  color,
  size = 'md',
  animate = false,
}: {
  value: number | string
  color?: BlockColor
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
}) {
  const [popped, setPopped] = useState(false)
  const c = color ?? NUM_COLORS[Number(value) % 6]
  const pal = BLOCK_PALETTE[c]

  const dims: Record<string, { wh: number; font: number; studSize: number; studGap: number }> = {
    sm: { wh: 36,  font: 16, studSize: 7,  studGap: 3  },
    md: { wh: 56,  font: 24, studSize: 10, studGap: 4  },
    lg: { wh: 72,  font: 32, studSize: 13, studGap: 5  },
    xl: { wh: 96,  font: 44, studSize: 17, studGap: 6  },
  }
  const d = dims[size]
  const radius = d.wh * 0.27
  const ledge = Math.round(d.wh * 0.11)

  const handleClick = () => {
    setPopped(true)
    setTimeout(() => setPopped(false), 300)
  }

  return (
    <div
      onClick={handleClick}
      className={`select-none cursor-pointer relative inline-flex items-center justify-center ${animate ? 'animate-float' : ''} ${popped ? 'animate-pop' : ''}`}
      style={{
        width: d.wh,
        height: d.wh,
        borderRadius: radius,
        // 3-stop gradient: light highlight → brand → dark (glossy plastic feel)
        background: `linear-gradient(145deg, ${pal.light} 0%, ${pal.bg} 48%, ${pal.dark} 100%)`,
        // Bottom ledge (3D extrusion) + ambient shadow
        boxShadow: `0 ${ledge}px 0 0 ${pal.dark}, 0 ${ledge + 4}px ${Math.round(d.wh * 0.45)}px rgba(0,0,0,0.18)`,
        transition: 'transform 0.12s ease',
        userSelect: 'none',
      }}
    >
      {/* LEGO-style studs */}
      <div style={{
        position: 'absolute',
        top: -d.studSize * 0.52,
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: d.studGap,
      }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            position: 'relative',
            width: d.studSize, height: d.studSize,
            borderRadius: '50%',
            background: `linear-gradient(145deg, ${pal.light} 0%, ${pal.bg} 55%, ${pal.dark} 100%)`,
            boxShadow: `0 ${Math.round(d.studSize * 0.3)}px 0 0 ${pal.dark}, inset 0 1px 2px rgba(255,255,255,0.28)`,
          }}>
            {/* Stud top specular */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(ellipse at 32% 28%, rgba(255,255,255,0.55) 0%, transparent 62%)',
            }} />
          </div>
        ))}
      </div>

      {/* Layer 1 — top-left corner specular (gloss) */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: radius,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.14) 35%, transparent 52%)',
        pointerEvents: 'none',
      }} />

      {/* Layer 2 — inner bevel shadow (bottom-right depth) */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: radius,
        boxShadow: 'inset -2px -3px 6px rgba(0,0,0,0.16), inset 1px 2px 4px rgba(255,255,255,0.22)',
        pointerEvents: 'none',
      }} />

      {/* Layer 3 — subtle rim reflection (thin bright top edge) */}
      <div style={{
        position: 'absolute', top: 0, left: '12%', right: '12%', height: 2,
        borderRadius: '0 0 4px 4px',
        background: 'rgba(255,255,255,0.45)',
        pointerEvents: 'none',
      }} />

      {/* Number */}
      <span style={{
        fontFamily: 'Nunito', fontWeight: 900, fontSize: d.font, color: '#fff',
        textShadow: '0 1px 0 rgba(0,0,0,0.28), 0 2px 10px rgba(0,0,0,0.16)',
        lineHeight: 1, position: 'relative', zIndex: 1,
        letterSpacing: '-0.5px',
      }}>
        {value}
      </span>
    </div>
  )
}

// ─── Operator Block ──────────────────────────────────────────────────────────

const OP_MAP: Record<string, { label: string; color: BlockColor }> = {
  '+': { label: '+', color: 'green'  },
  '−': { label: '−', color: 'coral'  },
  '×': { label: '×', color: 'orange' },
  '÷': { label: '÷', color: 'blue'   },
  '=': { label: '=', color: 'purple' },
  '?': { label: '?', color: 'yellow' },
}

function OperatorBlock({ op, size = 'md', animate = false }: { op: string; size?: 'sm' | 'md' | 'lg' | 'xl'; animate?: boolean }) {
  const info = OP_MAP[op] ?? { label: op, color: 'purple' as BlockColor }
  return <NumberBlock value={info.label} color={info.color} size={size} animate={animate} />
}

// ─── Button ──────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'yellow'

const BTN_VARIANTS: Record<ButtonVariant, { bg: string; dark: string; text: string; shadow: string }> = {
  primary:   { bg: '#4FD37A', dark: '#35B862', text: '#fff', shadow: 'rgba(79,211,122,0.35)' },
  secondary: { bg: '#6BCBFF', dark: '#3BAEE5', text: '#fff', shadow: 'rgba(107,203,255,0.35)' },
  yellow:    { bg: '#FFD54A', dark: '#E6BB2A', text: '#7A5A00', shadow: 'rgba(255,213,74,0.35)' },
  danger:    { bg: '#FF7B7B', dark: '#E85A5A', text: '#fff', shadow: 'rgba(255,123,123,0.35)' },
  ghost:     { bg: '#F6F7FB', dark: '#E0E2EA', text: '#2D2D44', shadow: 'rgba(0,0,0,0.08)' },
}

function Button({
  children, variant = 'primary', size = 'md', fullWidth = false, icon, disabled = false, onClick,
}: {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}) {
  const [pressed, setPressed] = useState(false)
  const v = BTN_VARIANTS[variant]
  const pad: Record<string, string> = { sm: '8px 18px', md: '13px 28px', lg: '17px 36px' }
  const fSize: Record<string, number> = { sm: 14, md: 16, lg: 18 }

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: pad[size],
        width: fullWidth ? '100%' : undefined,
        background: disabled ? '#E0E2EA' : `linear-gradient(160deg, ${v.bg} 0%, ${v.dark} 100%)`,
        color: disabled ? '#9CA3AF' : v.text,
        fontFamily: 'Nunito', fontWeight: 800, fontSize: fSize[size],
        border: 'none', borderRadius: 16, cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : `0 5px 0 0 ${v.dark}, 0 8px 20px ${v.shadow}`,
        transform: pressed ? 'translateY(3px)' : 'translateY(0)',
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
        outline: 'none',
        userSelect: 'none',
      }}
    >
      {icon && icon}
      {children}
    </button>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────

function Card({ children, style, className = '' }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={`card-shadow ${className}`} style={{
      background: '#fff',
      borderRadius: 24,
      padding: 20,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value, max = 100, color = 'green', label, showPercent = true }: {
  value: number; max?: number; color?: BlockColor; label?: string; showPercent?: boolean
}) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const pal = BLOCK_PALETTE[color]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {(label || showPercent) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 13, color: COLORS.textMid }}>{label}</span>}
          {showPercent && <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13, color: pal.text }}>{pct}%</span>}
        </div>
      )}
      <div style={{ height: 12, background: COLORS.neutral, borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${pal.bg} 0%, ${pal.dark} 100%)`,
          transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: `0 2px 8px ${pal.bg}88`,
        }} />
      </div>
    </div>
  )
}

// ─── Stars Row ───────────────────────────────────────────────────────────────

function StarsRow({ count, total = 3, size = 24 }: { count: number; total?: number; size?: number }) {
  const [animated, setAnimated] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 4, cursor: 'pointer' }} onClick={() => setAnimated(a => !a)}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={i < count && animated ? 'animate-star-spin' : ''}>
          <StarIcon size={size} filled={i < count} color={i < count ? '#FFD54A' : '#E0E2EA'} />
        </span>
      ))}
    </div>
  )
}

// ─── Coin Display ─────────────────────────────────────────────────────────────

function CoinDisplay({ amount, size = 'md' }: { amount: number; size?: 'sm' | 'md' | 'lg' }) {
  const coinSize: Record<string, number> = { sm: 16, md: 22, lg: 30 }
  const fSize: Record<string, number> = { sm: 13, md: 16, lg: 22 }
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: 'linear-gradient(135deg, #FFF8E1 0%, #FFF3CD 100%)',
      borderRadius: 999, padding: '5px 12px',
      border: '2px solid #FFE082',
    }}>
      <CoinIcon size={coinSize[size]} />
      <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: fSize[size], color: '#7A5A00' }}>{amount}</span>
    </div>
  )
}

// ─── Achievement Badge ────────────────────────────────────────────────────────

type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond'

const BADGE_TIERS: Record<BadgeTier, { bg: string; border: string; glow: string; label: string }> = {
  bronze:  { bg: 'linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)', border: '#CD7F32', glow: '#CD7F3255', label: 'Bronze' },
  silver:  { bg: 'linear-gradient(135deg, #C0C0C0 0%, #909090 100%)', border: '#C0C0C0', glow: '#C0C0C055', label: 'Silver' },
  gold:    { bg: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', border: '#FFD700', glow: '#FFD70055', label: 'Gold'   },
  diamond: { bg: 'linear-gradient(135deg, #6BCBFF 0%, #A78BFA 100%)', border: '#A78BFA', glow: '#A78BFA55', label: 'Diamond'},
}

function AchievementBadge({ icon, label, tier, size = 'md', locked = false }: {
  icon: React.ReactNode; label: string; tier: BadgeTier; size?: 'sm' | 'md' | 'lg'; locked?: boolean
}) {
  const [hover, setHover] = useState(false)
  const t = BADGE_TIERS[tier]
  const dims: Record<string, number> = { sm: 56, md: 72, lg: 96 }
  const d = dims[size]
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        cursor: 'pointer',
        transform: hover ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      <div style={{
        width: d, height: d, borderRadius: '50%',
        background: locked ? '#E0E2EA' : t.bg,
        border: `3px solid ${locked ? '#C0C5CF' : t.border}`,
        boxShadow: locked ? 'none' : `0 4px 16px ${t.glow}, 0 2px 6px rgba(0,0,0,0.1)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: locked ? 0.5 : 1,
        position: 'relative', overflow: 'hidden',
      }}>
        {!locked && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)',
            borderRadius: '50% 50% 0 0 / 60% 60% 0 0',
          }} />
        )}
        {locked ? <LockIcon size={d * 0.38} color="#9CA3AF" /> : icon}
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13, color: COLORS.text, lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 11, color: COLORS.textMid }}>{locked ? 'Locked' : t.label}</div>
      </div>
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AVATAR_ANIMALS = ['🦊', '🐻', '🐼', '🦁', '🐸', '🐧', '🦄', '🐯']

function Avatar({ name, color = 'purple', size = 'md', level }: {
  name: string; color?: BlockColor; size?: 'sm' | 'md' | 'lg' | 'xl'; level?: number
}) {
  const emoji = AVATAR_ANIMALS[name.charCodeAt(0) % AVATAR_ANIMALS.length]
  const dims: Record<string, number> = { sm: 36, md: 52, lg: 72, xl: 96 }
  const fSize: Record<string, number> = { sm: 16, md: 24, lg: 34, xl: 44 }
  const d = dims[size]
  const pal = BLOCK_PALETTE[color]
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: d, height: d, borderRadius: '50%',
        background: `linear-gradient(135deg, ${pal.bg} 0%, ${pal.dark} 100%)`,
        border: '3px solid #fff',
        boxShadow: `0 4px 16px ${pal.bg}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: fSize[size], lineHeight: 1,
      }}>
        {emoji}
      </div>
      {level !== undefined && (
        <div style={{
          position: 'absolute', bottom: -2, right: -4,
          background: 'linear-gradient(135deg, #FFD54A 0%, #FFB347 100%)',
          borderRadius: 999, border: '2px solid #fff',
          padding: '1px 5px',
          fontFamily: 'Nunito', fontWeight: 900, fontSize: 10, color: '#7A5A00',
          lineHeight: 1.4,
        }}>
          Lv{level}
        </div>
      )}
    </div>
  )
}

// ─── Top Navigation Bar ───────────────────────────────────────────────────────

function TopNavBar({ title, coins = 0, onBack }: { title: string; coins?: number; onBack?: () => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px',
      background: '#fff',
      borderBottom: '1px solid #F0F1F5',
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: COLORS.neutral, border: 'none', borderRadius: 12,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 20, color: COLORS.text }}>{title}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <CoinDisplay amount={coins} size="sm" />
        <button style={{
          background: COLORS.neutral, border: 'none', borderRadius: 12,
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative',
        }}>
          <BellIcon size={18} color={COLORS.text} />
          <span style={{
            position: 'absolute', top: 5, right: 5,
            width: 8, height: 8, borderRadius: '50%',
            background: COLORS.coral, border: '2px solid #fff',
          }} />
        </button>
      </div>
    </div>
  )
}

// ─── Bottom Navigation Bar ─────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'home',   label: 'Home',   Icon: HomeIcon    },
  { id: 'learn',  label: 'Learn',  Icon: BookIcon    },
  { id: 'play',   label: 'Play',   Icon: GameIcon    },
  { id: 'me',     label: 'Me',     Icon: ProfileIcon },
]

function BottomNavBar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      background: '#fff',
      borderTop: '1px solid #F0F1F5',
      padding: '8px 0 16px',
      position: 'sticky', bottom: 0,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
    }}>
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button key={id} onClick={() => onSelect(id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 0',
            color: isActive ? COLORS.purple : COLORS.textLight,
            transition: 'color 0.2s',
          }}>
            <div style={{
              width: 44, height: 32, borderRadius: 16,
              background: isActive ? `${COLORS.purple}18` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
              <Icon size={22} color={isActive ? COLORS.purple : COLORS.textLight} />
            </div>
            <span style={{ fontFamily: 'Nunito', fontWeight: isActive ? 800 : 600, fontSize: 11 }}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

// ─── Profile Card ─────────────────────────────────────────────────────────────

function ProfileCard({ name, level, xp, coins, streak }: {
  name: string; level: number; xp: number; coins: number; streak: number
}) {
  return (
    <Card style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #6BCBFF 100%)', padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar name={name} color="yellow" size="lg" level={level} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 22, color: '#fff', lineHeight: 1.1 }}>{name}</div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Level {level} Math Explorer</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <CoinDisplay amount={coins} size="sm" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '4px 10px' }}>
                <FireIcon size={14} color="#FF7B7B" />
                <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13, color: '#fff' }}>{streak} day streak</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>XP to next level</span>
            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13, color: '#fff' }}>{xp} / 1000</span>
          </div>
          <div style={{ height: 10, background: 'rgba(255,255,255,0.25)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${xp / 10}%`, background: 'rgba(255,255,255,0.9)', borderRadius: 999, transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)' }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        {[{ label: 'Lessons Done', val: 48 }, { label: 'Badges', val: 12 }, { label: 'Best Rank', val: '#3' }].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: '12px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
            <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 18, color: '#fff' }}>{s.val}</div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCard({ title, description, progress, color, lessons, icon, locked = false }: {
  title: string; description: string; progress: number; color: BlockColor; lessons: number; icon: string; locked?: boolean
}) {
  const [hover, setHover] = useState(false)
  const pal = BLOCK_PALETTE[color]
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="card-shadow"
      style={{
        background: '#fff', borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
        boxShadow: hover ? `0 16px 48px ${pal.bg}33, 0 4px 12px rgba(0,0,0,0.08)` : undefined,
        opacity: locked ? 0.65 : 1,
      }}
    >
      <div style={{
        background: `linear-gradient(135deg, ${pal.bg} 0%, ${pal.dark} 100%)`,
        padding: '20px 20px 16px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -12, top: -12, fontSize: 72, opacity: 0.18, lineHeight: 1 }}>{icon}</div>
        <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 8 }}>{icon}</div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 19, color: '#fff', lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{description}</div>
      </div>
      <div style={{ padding: '14px 20px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 13, color: COLORS.textMid }}>{lessons} lessons</span>
          {locked ? <LockIcon size={16} /> : <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13, color: pal.text }}>{progress}%</span>}
        </div>
        {!locked && <ProgressBar value={progress} color={color} showPercent={false} />}
        {locked && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <LockIcon size={14} color={COLORS.textLight} />
            <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 13, color: COLORS.textLight }}>Complete previous course to unlock</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Lesson Card ──────────────────────────────────────────────────────────────

function LessonCard({ number, title, duration, stars, coins, status, color, onClick }: {
  number: number; title: string; duration: string; stars: number; coins: number;
  status: 'done' | 'active' | 'locked'; color: BlockColor; onClick?: () => void
}) {
  const pal = BLOCK_PALETTE[color]
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={status !== 'locked' ? onClick : undefined}
      className="card-shadow"
      style={{
        background: '#fff', borderRadius: 20,
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: status === 'locked' ? 'default' : 'pointer',
        opacity: status === 'locked' ? 0.55 : 1,
        transform: hover && status !== 'locked' ? 'translateX(4px)' : 'translateX(0)',
        transition: 'transform 0.2s ease',
        border: status === 'active' ? `2px solid ${pal.bg}` : '2px solid transparent',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 14, flexShrink: 0,
        background: status === 'done' ? `linear-gradient(135deg, ${pal.bg} 0%, ${pal.dark} 100%)` :
          status === 'active' ? `${pal.bg}22` : '#F0F1F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {status === 'done' ? <CheckIcon size={20} color="#fff" /> :
          status === 'locked' ? <LockIcon size={18} /> :
          <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: pal.text }}>{number}</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 15, color: COLORS.text, lineHeight: 1.2 }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
          <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 12, color: COLORS.textMid }}>{duration}</span>
          {status !== 'locked' && <StarsRow count={stars} total={3} size={14} />}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
        {status !== 'locked' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <CoinIcon size={14} />
            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 12, color: '#7A5A00' }}>+{coins}</span>
          </div>
        )}
        {status === 'active' && (
          <div style={{
            background: `linear-gradient(135deg, ${pal.bg} 0%, ${pal.dark} 100%)`,
            borderRadius: 12, width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PlayIcon size={14} color="#fff" />
          </div>
        )}
        {status === 'done' && <ArrowRightIcon size={16} color={COLORS.textLight} />}
      </div>
    </div>
  )
}

// ─── Mission Card ──────────────────────────────────────────────────────────────

function MissionCard({ title, description, progress, max, reward, color, icon }: {
  title: string; description: string; progress: number; max: number; reward: number; color: BlockColor; icon: string
}) {
  const pal = BLOCK_PALETTE[color]
  const pct = Math.min(100, Math.round((progress / max) * 100))
  const done = progress >= max
  return (
    <div className="card-shadow" style={{
      background: '#fff', borderRadius: 20, padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      border: done ? `2px solid ${pal.bg}` : '2px solid transparent',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 16, flexShrink: 0,
        background: done ? `linear-gradient(135deg, ${pal.bg} 0%, ${pal.dark} 100%)` : `${pal.bg}22`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24,
      }}>
        {done ? <CheckIcon size={22} color="#fff" /> : icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, color: COLORS.text }}>{title}</div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 12, color: COLORS.textMid, marginBottom: 6 }}>{description}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 8, background: COLORS.neutral, borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${pal.bg} 0%, ${pal.dark} 100%)`, borderRadius: 999 }} />
          </div>
          <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 12, color: pal.text, flexShrink: 0 }}>{progress}/{max}</span>
        </div>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <CoinIcon size={22} />
        <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 13, color: '#7A5A00' }}>+{reward}</span>
      </div>
    </div>
  )
}

// ─── Reward Card ──────────────────────────────────────────────────────────────

function RewardCard({ title, subtitle, icon, color }: { title: string; subtitle: string; icon: string; color: BlockColor }) {
  const [hover, setHover] = useState(false)
  const pal = BLOCK_PALETTE[color]
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="card-shadow"
      style={{
        background: `linear-gradient(135deg, ${pal.bg} 0%, ${pal.dark} 100%)`,
        borderRadius: 24, padding: '18px 16px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        cursor: 'pointer',
        transform: hover ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', bottom: -16, right: -16, fontSize: 72, opacity: 0.15, lineHeight: 1 }}>{icon}</div>
      <span style={{ fontSize: 40, lineHeight: 1 }}>{icon}</span>
      <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>{title}</div>
      <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>{subtitle}</div>
    </div>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
      <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 20, color: COLORS.text }}>{title}</span>
      {action && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: COLORS.purple,
        }}>{action}</button>
      )}
    </div>
  )
}

// ─── Stat Pill ────────────────────────────────────────────────────────────────

function StatPill({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: BlockColor }) {
  const pal = BLOCK_PALETTE[color]
  return (
    <div className="card-shadow" style={{
      background: '#fff', borderRadius: 20, padding: '12px 14px',
      display: 'flex', flexDirection: 'column', gap: 4, flex: 1,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 10,
          background: `${pal.bg}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
      </div>
      <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 22, color: pal.text, lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 12, color: COLORS.textMid }}>{label}</div>
    </div>
  )
}

// ─── Number Block Showcase ─────────────────────────────────────────────────────

function BlockShowcase() {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: COLORS.text }}>Number Blocks</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-start' }}>
        {[0,1,2,3,4,5,6,7,8,9].map(n => (
          <NumberBlock key={n} value={n} size="md" />
        ))}
      </div>
      <div style={{ marginTop: 20, marginBottom: 12 }}>
        <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: COLORS.text }}>Operator Blocks</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {['+','−','×','÷','=','?'].map(op => (
          <OperatorBlock key={op} op={op} size="md" />
        ))}
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

const TABS = ['home', 'learn', 'play', 'me'] as const
type Tab = typeof TABS[number]

interface ResultData {
  xp: number; coins: number; stars: number; starsTotal: number
  correct: number; total: number; mistakes: number; combo: number
  timeSec: number; lessonName: string
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [showAdventureMap, setShowAdventureMap] = useState(false)
  const [showPractice, setShowPractice] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [resultData, setResultData] = useState<ResultData | null>(null)

  const handleNavSelect = (id: string) => {
    setShowAdventureMap(false)
    setShowPractice(false)
    setShowResult(false)
    setTab(id as Tab)
  }
  const openPractice = () => { setShowResult(false); setShowPractice(true) }
  const openResult = (data: ResultData) => { setShowPractice(false); setResultData(data); setShowResult(true) }

  return (
    <div style={{ minHeight: '100vh', background: COLORS.neutral, fontFamily: 'Nunito, system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 430, minHeight: '100vh', background: COLORS.neutral, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {showResult && resultData ? (
          <ResultScreen data={resultData} onPlayAgain={openPractice} onContinue={() => { setShowResult(false); setShowPractice(false); setTab('home') }} onNavSelect={handleNavSelect} />
        ) : showPractice ? (
          <PracticeScreen onBack={() => setShowPractice(false)} onComplete={openResult} onNavSelect={handleNavSelect} />
        ) : showAdventureMap ? (
          <AdventureMapScreen onBack={() => setShowAdventureMap(false)} onNavSelect={handleNavSelect} />
        ) : (
          <>
            <TopNavBar title={tab === 'home' ? '✦ MathBlocks' : tab === 'learn' ? '📚 Learn' : tab === 'play' ? '🎮 Play' : '🦊 Profile'} coins={1240} />
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 80px' }}>
              {tab === 'home' && <HomeTab onOpenAdventureMap={() => setShowAdventureMap(true)} onOpenPractice={openPractice} />}
              {tab === 'learn' && <LearnTab onStartLesson={openPractice} />}
              {tab === 'play' && <PlayTab onStartPractice={openPractice} />}
              {tab === 'me' && <MeTab />}
            </div>
            <BottomNavBar active={tab} onSelect={handleNavSelect} />
          </>
        )}
      </div>
    </div>
  )
}

// ─── Mascot (Blox) ────────────────────────────────────────────────────────────

function Mascot({ size = 110 }: { size?: number }) {
  const h = Math.round(size * 1.18)
  return (
    <svg width={size} height={h} viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="55" cy="124" rx="34" ry="7" fill="rgba(0,0,0,0.08)" />
      {/* Body block */}
      <rect x="10" y="33" width="90" height="82" rx="22" fill="url(#blox-body)" />
      {/* Bottom ledge — 3D depth */}
      <rect x="12" y="106" width="86" height="12" rx="11" fill="url(#blox-ledge)" />
      {/* Left stud */}
      <ellipse cx="37" cy="29" rx="10" ry="10" fill="url(#blox-stud)" />
      <ellipse cx="37" cy="26.5" rx="6.5" ry="3" fill="rgba(255,255,255,0.28)" />
      {/* Right stud */}
      <ellipse cx="73" cy="29" rx="10" ry="10" fill="url(#blox-stud)" />
      <ellipse cx="73" cy="26.5" rx="6.5" ry="3" fill="rgba(255,255,255,0.28)" />
      {/* Face bg glow */}
      <ellipse cx="55" cy="73" rx="32" ry="30" fill="rgba(255,255,255,0.13)" />
      {/* Left eye */}
      <circle cx="38" cy="68" r="13.5" fill="white" />
      <circle cx="40.5" cy="70" r="7.5" fill="#1A1A2E" />
      <circle cx="43.5" cy="65.5" r="3" fill="white" />
      <circle cx="38.5" cy="73.5" r="1.5" fill="rgba(255,255,255,0.65)" />
      {/* Right eye */}
      <circle cx="72" cy="68" r="13.5" fill="white" />
      <circle cx="74.5" cy="70" r="7.5" fill="#1A1A2E" />
      <circle cx="77.5" cy="65.5" r="3" fill="white" />
      <circle cx="72.5" cy="73.5" r="1.5" fill="rgba(255,255,255,0.65)" />
      {/* Smile */}
      <path d="M42 86 Q55 98 68 86" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Rosy cheeks */}
      <ellipse cx="24" cy="78" rx="8" ry="5" fill="#FF7B7B" opacity="0.38" />
      <ellipse cx="86" cy="78" rx="8" ry="5" fill="#FF7B7B" opacity="0.38" />
      {/* Graduation cap brim */}
      <rect x="20" y="19" width="70" height="9" rx="4.5" fill="#1E1B4B" />
      {/* Cap top */}
      <rect x="40" y="7" width="30" height="14" rx="5" fill="#1E1B4B" />
      {/* Tassel ball */}
      <circle cx="87" cy="19" r="5" fill="#FFD54A" />
      <path d="M87 24 L93 34" stroke="#FFD54A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="93" cy="36.5" r="3.5" fill="#FFD54A" />
      {/* Arms */}
      <rect x="1" y="57" width="12" height="22" rx="6" fill="url(#blox-arm)" transform="rotate(-18 7 68)" />
      <rect x="97" y="57" width="12" height="22" rx="6" fill="url(#blox-arm)" transform="rotate(18 103 68)" />
      {/* Gloss highlight */}
      <ellipse cx="33" cy="45" rx="19" ry="9" fill="rgba(255,255,255,0.22)" transform="rotate(-18 33 45)" />
      <defs>
        <linearGradient id="blox-body" x1="10" y1="33" x2="100" y2="115" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="blox-ledge" x1="12" y1="106" x2="98" y2="118" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B21B6" />
          <stop offset="1" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient id="blox-stud" x1="27" y1="19" x2="47" y2="39" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EDE9FE" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="blox-arm" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// ─── Hero Decoration Helpers ──────────────────────────────────────────────────

function CloudBlob({ style, w = 130 }: { style: React.CSSProperties; w?: number }) {
  const h = Math.round(w * 0.43)
  return (
    <div style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <svg viewBox="0 0 130 56" fill="none" width={w} height={h}>
        <ellipse cx="65" cy="42" rx="62" ry="17" fill="white" opacity="0.82" />
        <ellipse cx="44" cy="33" rx="30" ry="25" fill="white" opacity="0.82" />
        <ellipse cx="87" cy="30" rx="26" ry="22" fill="white" opacity="0.82" />
        <ellipse cx="65" cy="26" rx="36" ry="23" fill="white" opacity="0.82" />
        {/* Underside shadow */}
        <ellipse cx="65" cy="50" rx="55" ry="8" fill="rgba(160,190,240,0.2)" />
      </svg>
    </div>
  )
}

function Sparkle({ top, left, right, bottom, size, opacity, delay, color = '#FFD54A' }: {
  top?: string; left?: string; right?: string; bottom?: string
  size: number; opacity: number; delay: string; color?: string
}) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom,
      width: size, height: size, opacity,
      animation: `sparkle-twinkle 2.5s ${delay} ease-in-out infinite`,
      pointerEvents: 'none',
    }}>
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
        <path d="M6 0 L6.9 5 L12 6 L6.9 7 L6 12 L5.1 7 L0 6 L5.1 5 Z" fill={color} />
      </svg>
    </div>
  )
}

// ─── World Island Terrain SVGs (square, for circle-clip) ─────────────────────

function ForestTerrain() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
      {/* Ground */}
      <ellipse cx="60" cy="100" rx="65" ry="28" fill="#059669" />
      <ellipse cx="60" cy="92" rx="55" ry="22" fill="#10B981" />
      {/* Tree left */}
      <polygon points="26,62 38,90 14,90" fill="#065F46" />
      <polygon points="26,72 36,90 16,90" fill="#047857" />
      <rect x="23" y="90" width="6" height="10" rx="2" fill="#064E3B" />
      {/* Tree center */}
      <polygon points="60,52 74,86 46,86" fill="#065F46" />
      <polygon points="60,64 72,86 48,86" fill="#047857" />
      <rect x="57" y="86" width="6" height="10" rx="2" fill="#064E3B" />
      {/* Tree right */}
      <polygon points="94,60 106,88 82,88" fill="#065F46" />
      <polygon points="94,70 104,88 84,88" fill="#047857" />
      <rect x="91" y="88" width="6" height="10" rx="2" fill="#064E3B" />
      {/* Small details */}
      <circle cx="42" cy="92" r="4" fill="#6EE7B7" opacity="0.6" />
      <circle cx="78" cy="91" r="3" fill="#6EE7B7" opacity="0.6" />
      {/* Path */}
      <path d="M60 120 Q60 105 58 95" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeDasharray="3,3" fill="none" />
    </svg>
  )
}

function ValleyTerrain() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
      {/* Water / river base */}
      <path d="M0 86 Q30 72 60 80 Q90 88 120 74 L120 120 L0 120Z" fill="#0284C7" />
      <path d="M0 96 Q35 84 60 92 Q88 100 120 86 L120 120 L0 120Z" fill="#0EA5E9" />
      {/* Mountain left */}
      <path d="M15 86 Q28 52 42 60 Q52 66 55 86" fill="#0369A1" opacity="0.65" />
      <path d="M22 86 Q32 58 42 60 Q50 63 53 86" fill="#0284C7" opacity="0.45" />
      {/* Mountain right */}
      <path d="M75 80 Q88 46 103 54 Q113 60 115 80" fill="#0369A1" opacity="0.65" />
      <path d="M82 80 Q92 50 103 54 Q112 58 113 80" fill="#0284C7" opacity="0.45" />
      {/* Snow caps */}
      <path d="M38 60 Q42 52 46 60" fill="white" opacity="0.6" />
      <path d="M100 54 Q104 46 108 54" fill="white" opacity="0.6" />
      {/* Water ripples */}
      <path d="M20 100 Q35 95 50 100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
      <path d="M70 96 Q85 91 100 96" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
      {/* Valley floor */}
      <ellipse cx="60" cy="112" rx="52" ry="14" fill="#0891B2" />
    </svg>
  )
}

function CastleTerrain() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
      {/* Ground plateau */}
      <ellipse cx="60" cy="108" rx="58" ry="18" fill="#5B21B6" />
      <ellipse cx="60" cy="100" rx="50" ry="14" fill="#6D28D9" />
      {/* Main keep */}
      <rect x="38" y="60" width="44" height="46" rx="3" fill="#6D28D9" />
      {/* Left tower */}
      <rect x="26" y="52" width="16" height="48" rx="3" fill="#7C3AED" />
      {/* Right tower */}
      <rect x="78" y="52" width="16" height="48" rx="3" fill="#7C3AED" />
      {/* Battlements — left tower */}
      <rect x="24" y="46" width="5" height="9" rx="2" fill="#6D28D9" />
      <rect x="31" y="46" width="5" height="9" rx="2" fill="#6D28D9" />
      <rect x="38" y="46" width="5" height="9" rx="2" fill="#6D28D9" />
      {/* Battlements — right tower */}
      <rect x="77" y="46" width="5" height="9" rx="2" fill="#6D28D9" />
      <rect x="84" y="46" width="5" height="9" rx="2" fill="#6D28D9" />
      <rect x="91" y="46" width="5" height="9" rx="2" fill="#6D28D9" />
      {/* Battlements — keep */}
      <rect x="47" y="54" width="6" height="8" rx="2" fill="#5B21B6" />
      <rect x="57" y="54" width="6" height="8" rx="2" fill="#5B21B6" />
      <rect x="67" y="54" width="6" height="8" rx="2" fill="#5B21B6" />
      {/* Door */}
      <rect x="50" y="80" width="20" height="26" rx="10" fill="#3B0764" />
      {/* Windows */}
      <circle cx="60" cy="70" r="5" fill="#4C1D95" />
      <circle cx="60" cy="70" r="3" fill="#1E1B4B" />
      <circle cx="34" cy="68" r="4" fill="#4C1D95" />
      <circle cx="86" cy="68" r="4" fill="#4C1D95" />
      {/* Flag */}
      <line x1="60" y1="24" x2="60" y2="54" stroke="#DDD6FE" strokeWidth="1.5" />
      <polygon points="60,24 76,30 60,36" fill="#FF7B7B" />
      {/* Gloss on towers */}
      <rect x="27" y="53" width="4" height="20" rx="2" fill="rgba(255,255,255,0.12)" />
      <rect x="79" y="53" width="4" height="20" rx="2" fill="rgba(255,255,255,0.12)" />
    </svg>
  )
}

function VolcanoTerrain() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
      {/* Base lava ground */}
      <ellipse cx="60" cy="108" rx="60" ry="18" fill="#92400E" />
      <ellipse cx="60" cy="100" rx="52" ry="14" fill="#B45309" />
      {/* Volcano body */}
      <path d="M60 18 L98 98 L22 98 Z" fill="#C2410C" />
      <path d="M60 18 L92 92 L28 92 Z" fill="#DC2626" />
      {/* Light face */}
      <path d="M60 18 L78 80 L42 80 Z" fill="#EF4444" opacity="0.4" />
      {/* Crater */}
      <path d="M48 18 Q60 8 72 18 Q75 32 60 35 Q45 32 48 18Z" fill="#F97316" />
      <ellipse cx="60" cy="24" rx="8" ry="6" fill="#FCA5A5" opacity="0.55" />
      {/* Lava glow at base */}
      <path d="M40 92 Q50 80 60 88 Q70 96 80 84 Q88 76 96 92" stroke="#F97316" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M32 98 Q44 88 52 94" stroke="#FB923C" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round" />
      {/* Smoke puffs */}
      <ellipse cx="52" cy="8" rx="7" ry="9" fill="rgba(229,231,235,0.45)" transform="rotate(-18 52 8)" />
      <ellipse cx="68" cy="5" rx="6" ry="8" fill="rgba(229,231,235,0.38)" transform="rotate(14 68 5)" />
      <ellipse cx="60" cy="2" rx="5" ry="7" fill="rgba(255,255,255,0.3)" />
      {/* Rocks at base */}
      <ellipse cx="30" cy="96" rx="7" ry="4" fill="#7F1D1D" opacity="0.6" />
      <ellipse cx="90" cy="94" rx="6" ry="4" fill="#7F1D1D" opacity="0.6" />
    </svg>
  )
}

function GalaxyTerrain() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
      style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
      {/* Space ground */}
      <ellipse cx="60" cy="108" rx="60" ry="18" fill="#1E1B4B" />
      <ellipse cx="60" cy="100" rx="50" ry="13" fill="#312E81" />
      {/* Planet */}
      <circle cx="60" cy="60" r="24" fill="#4338CA" />
      <circle cx="60" cy="60" r="24" fill="url(#planet-grad)" />
      {/* Planet rings */}
      <ellipse cx="60" cy="60" rx="38" ry="10" fill="none" stroke="#818CF8" strokeWidth="4" opacity="0.8" />
      <ellipse cx="60" cy="60" rx="32" ry="8" fill="none" stroke="#A5B4FC" strokeWidth="2" opacity="0.5" />
      {/* Planet surface detail */}
      <ellipse cx="50" cy="55" rx="8" ry="5" fill="#6366F1" opacity="0.5" transform="rotate(-20 50 55)" />
      <ellipse cx="70" cy="65" rx="6" ry="4" fill="#6366F1" opacity="0.4" transform="rotate(15 70 65)" />
      {/* Stars */}
      <circle cx="16" cy="22" r="2.5" fill="white" opacity="0.85" />
      <circle cx="100" cy="18" r="2" fill="white" opacity="0.75" />
      <circle cx="108" cy="38" r="1.5" fill="#C7D2FE" opacity="0.9" />
      <circle cx="12" cy="44" r="1.5" fill="white" opacity="0.7" />
      <circle cx="24" cy="68" r="1.5" fill="white" opacity="0.55" />
      <circle cx="96" cy="72" r="2" fill="#A5B4FC" opacity="0.8" />
      <circle cx="88" cy="24" r="1.5" fill="white" opacity="0.6" />
      <circle cx="36" cy="14" r="1" fill="white" opacity="0.65" />
      <circle cx="72" cy="10" r="1" fill="white" opacity="0.5" />
      {/* Comet */}
      <circle cx="95" cy="28" r="2" fill="white" opacity="0.9" />
      <path d="M97 26 L108 18" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <radialGradient id="planet-grad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  )
}

// ─── World Island Card ────────────────────────────────────────────────────────

interface WorldData {
  name: string
  emoji: string
  bg: string
  ringColor: string
  stars: number
  totalStars: number
  progress: number
  lessons: number
  unlocked: boolean
  Terrain: () => React.ReactElement
}

const WORLDS: WorldData[] = [
  { name: 'Number Forest',         emoji: '🌳', bg: 'linear-gradient(160deg,#6EE7B7 0%,#34D399 50%,#059669 100%)', ringColor: '#4FD37A', stars: 9, totalStars: 9,  progress: 100, lessons: 8,  unlocked: true,  Terrain: ForestTerrain  },
  { name: 'Addition Valley',       emoji: '⛰',  bg: 'linear-gradient(160deg,#7DD3FC 0%,#38BDF8 50%,#0284C7 100%)', ringColor: '#6BCBFF', stars: 6, totalStars: 9,  progress: 65,  lessons: 10, unlocked: true,  Terrain: ValleyTerrain  },
  { name: 'Multiplication Castle', emoji: '🏰', bg: 'linear-gradient(160deg,#DDD6FE 0%,#A78BFA 50%,#7C3AED 100%)', ringColor: '#A78BFA', stars: 3, totalStars: 9,  progress: 30,  lessons: 12, unlocked: true,  Terrain: CastleTerrain  },
  { name: 'Division Volcano',      emoji: '🌋', bg: 'linear-gradient(160deg,#FED7AA 0%,#FB923C 50%,#DC2626 100%)', ringColor: '#FFB347', stars: 0, totalStars: 9,  progress: 0,   lessons: 10, unlocked: false, Terrain: VolcanoTerrain },
  { name: 'Galaxy Challenge',      emoji: '🌌', bg: 'linear-gradient(160deg,#A5B4FC 0%,#6366F1 50%,#1E1B4B 100%)', ringColor: '#6366F1', stars: 0, totalStars: 9,  progress: 0,   lessons: 15, unlocked: false, Terrain: GalaxyTerrain  },
]

function WorldIslandCard({ world, index }: { world: WorldData; index: number }) {
  const [hover, setHover] = useState(false)
  const size = 112
  const r = 50
  const circ = 2 * Math.PI * r
  const filled = circ * (1 - world.progress / 100)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="animate-bounce-in"
      style={{
        flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 8, width: size + 12,
        animationDelay: `${index * 0.09}s`,
        cursor: world.unlocked ? 'pointer' : 'default',
      }}
    >
      {/* Floating island circle */}
      <div style={{
        position: 'relative', width: size, height: size,
        animation: world.unlocked ? `island-hover-bob ${3.5 + index * 0.4}s ease-in-out infinite` : 'none',
        animationDelay: `${index * 0.55}s`,
      }}>
        {/* Progress ring SVG */}
        <svg
          width={size} height={size}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none' }}
        >
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={5}
          />
          {/* Progress arc */}
          {world.unlocked && world.progress > 0 && (
            <circle
              cx={size / 2} cy={size / 2} r={r}
              fill="none"
              stroke={world.ringColor}
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={filled}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{
                filter: `drop-shadow(0 0 5px ${world.ringColor}88)`,
                transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            />
          )}
          {/* Completion checkmark dot */}
          {world.progress === 100 && (
            <circle cx={size / 2} cy={8} r={9} fill="#FFD54A" stroke="#fff" strokeWidth={2} />
          )}
        </svg>

        {/* Island face — circular clipped */}
        <div style={{
          position: 'absolute', inset: 7,
          borderRadius: '50%', overflow: 'hidden',
          background: world.bg,
          boxShadow: hover && world.unlocked
            ? `0 14px 40px rgba(0,0,0,0.24), 0 0 0 2px ${world.ringColor}55`
            : '0 8px 28px rgba(0,0,0,0.18)',
          transform: hover && world.unlocked ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
        }}>
          {/* Sky dots */}
          {[12, 72, 38, 56, 88].map((lft, i) => (
            <div key={i} style={{
              position: 'absolute', borderRadius: '50%',
              width: 2 + (i % 2), height: 2 + (i % 2),
              background: 'rgba(255,255,255,0.5)',
              top: `${8 + i * 8}%`, left: `${lft}%`,
            }} />
          ))}
          {/* Terrain SVG */}
          <world.Terrain />

          {/* Lock overlay */}
          {!world.unlocked && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.52)',
              backdropFilter: 'blur(5px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.15)', borderRadius: '50%',
                width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <LockIcon size={16} color="rgba(255,255,255,0.9)" />
              </div>
            </div>
          )}
        </div>

        {/* Stars badge at bottom-right */}
        {world.unlocked && (
          <div style={{
            position: 'absolute', bottom: 4, right: 2, zIndex: 3,
            background: 'rgba(255,255,255,0.95)', borderRadius: 999,
            padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          }}>
            <StarIcon size={10} filled color="#FFD54A" />
            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 10, color: COLORS.text }}>
              {world.stars}/{world.totalStars}
            </span>
          </div>
        )}

        {/* Completion checkmark text */}
        {world.progress === 100 && (
          <div style={{
            position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
            zIndex: 4, fontFamily: 'Nunito', fontWeight: 900, fontSize: 11, color: '#7A3A00',
          }}>✓</div>
        )}
      </div>

      {/* World label */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Nunito', fontWeight: 900, fontSize: 12,
          color: world.unlocked ? COLORS.text : COLORS.textLight,
          lineHeight: 1.2, maxWidth: size + 12,
        }}>
          {world.name}
        </div>
        {world.unlocked && (
          <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 11, color: COLORS.textMid, marginTop: 2 }}>
            {world.progress}% done
          </div>
        )}
      </div>
    </div>
  )
}

function WorldPathConnector({ from, to }: { from: WorldData; to: WorldData }) {
  const unlocked = from.unlocked && to.unlocked
  return (
    <div style={{
      flexShrink: 0, alignSelf: 'center', width: 36, height: 24,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginTop: -28,
    }}>
      <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
        <path d="M2 12 C8 4, 28 20, 34 12" stroke={unlocked ? '#FFD54A' : '#D1D5DB'}
          strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" fill="none" />
        {unlocked && (
          <circle cx="18" cy="12" r="4" fill="#FFD54A" stroke="#fff" strokeWidth="1.5" />
        )}
      </svg>
    </div>
  )
}

function MathAdventureMap({ onOpenMap }: { onOpenMap?: () => void }) {
  return (
    <div>
      <SectionHeader title="🗺 Math Adventure" action="Full map" onAction={onOpenMap} />
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 0,
        overflowX: 'auto',
        margin: '0 -16px',
        padding: '8px 16px 16px',
      }}>
        {WORLDS.map((w, i) => (
          <React.Fragment key={w.name}>
            <WorldIslandCard world={w} index={i} />
            {i < WORLDS.length - 1 && (
              <WorldPathConnector from={w} to={WORLDS[i + 1]} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// ─── Daily Challenge Card ─────────────────────────────────────────────────────

const CHALLENGES = [
  { a: 4,  op: '+', b: 7,  answer: 11, choices: [9, 10, 11, 12] },
  { a: 8,  op: '−', b: 3,  answer: 5,  choices: [4, 5, 6, 7]    },
  { a: 3,  op: '×', b: 4,  answer: 12, choices: [10, 11, 12, 13] },
  { a: 15, op: '÷', b: 3,  answer: 5,  choices: [3, 4, 5, 6]    },
]

const CONFETTI_SPEC = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  color: ['#FFD54A','#4FD37A','#6BCBFF','#FF7B7B','#A78BFA','#FFB347'][i % 6],
  left: 8 + (i * 22) % 284,
  delay: i * 0.055,
  size: 7 + (i % 3) * 4,
  round: i % 3 === 0,
}))

function DailyChallengeCard() {
  const [cIdx, setCIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [gameState, setGameState] = useState<'idle' | 'correct' | 'wrong'>('idle')

  const challenge = CHALLENGES[cIdx]

  const handleSelect = (val: number) => {
    if (gameState !== 'idle') return
    setSelected(val)
    if (val === challenge.answer) {
      setGameState('correct')
      setTimeout(() => {
        setGameState('idle')
        setSelected(null)
        setCIdx(c => (c + 1) % CHALLENGES.length)
      }, 2400)
    } else {
      setGameState('wrong')
      setTimeout(() => {
        setGameState('idle')
        setSelected(null)
      }, 900)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={gameState === 'wrong' ? 'animate-wiggle' : ''}
        style={{
          background: 'linear-gradient(145deg, #2D1B69 0%, #1E1B4B 45%, #312563 100%)',
          borderRadius: 28,
          padding: '22px 20px 26px',
          overflow: 'hidden',
          border: gameState === 'correct' ? '1.5px solid rgba(79,211,122,0.6)'
            : gameState === 'wrong'   ? '1.5px solid rgba(255,123,123,0.6)'
            : '1.5px solid rgba(167,139,250,0.25)',
          boxShadow: gameState === 'correct'
            ? '0 16px 56px rgba(79,211,122,0.22), 0 4px 16px rgba(0,0,0,0.3)'
            : gameState === 'wrong'
            ? '0 16px 56px rgba(255,123,123,0.22), 0 4px 16px rgba(0,0,0,0.3)'
            : '0 16px 56px rgba(45,27,105,0.38), 0 4px 16px rgba(0,0,0,0.25)',
          transition: 'border-color 0.2s, box-shadow 0.25s',
          position: 'relative',
        }}
      >
        {/* Background sparkles decoration */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[
            { top: '8%',  left: '5%',  size: 6,  delay: 0 },
            { top: '14%', right: '8%', size: 5,  delay: 0.6 },
            { top: '55%', left: '3%',  size: 4,  delay: 1.2 },
            { top: '70%', right: '5%', size: 7,  delay: 0.3 },
            { top: '35%', right: '3%', size: 5,  delay: 1.8 },
          ].map((s, i) => (
            <div key={i} className="animate-sparkle" style={{
              position: 'absolute', ...(s as Record<string,unknown>),
              width: s.size, height: s.size,
              background: '#A78BFA', borderRadius: '50%',
              opacity: 0.5, animationDelay: `${s.delay}s`,
            }} />
          ))}
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              background: 'linear-gradient(135deg,#FFD54A 0%,#FFB347 100%)',
              borderRadius: 14, width: 42, height: 42,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 0 0 #E8953A, 0 6px 20px rgba(255,179,71,0.45)',
            }}>
              <span style={{ fontSize: 20 }}>🧩</span>
            </div>
            <div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 17, color: '#fff', letterSpacing: '-0.2px' }}>
                {"Today's Puzzle"}
              </div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 12, color: 'rgba(167,139,250,0.9)', marginTop: 1 }}>
                Solve to earn rewards
              </div>
            </div>
          </div>
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {CHALLENGES.map((_, i) => (
              <div key={i} style={{
                width: i === cIdx ? 18 : 7, height: 7, borderRadius: 999,
                background: i < cIdx ? '#4FD37A' : i === cIdx ? '#A78BFA' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: i === cIdx ? '0 0 8px rgba(167,139,250,0.8)' : 'none',
              }} />
            ))}
          </div>
        </div>

        {/* Reward chips row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[
            { icon: '⚡', label: '+120 XP', bg: 'rgba(167,139,250,0.2)', color: '#C4ADFC', border: 'rgba(167,139,250,0.35)' },
            { icon: '🪙', label: '+75 coins', bg: 'rgba(255,213,74,0.15)', color: '#FFD54A', border: 'rgba(255,213,74,0.35)' },
            { icon: '🎁', label: 'Surprise Box', bg: 'rgba(107,203,255,0.15)', color: '#6BCBFF', border: 'rgba(107,203,255,0.35)' },
          ].map(chip => (
            <div key={chip.label} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: chip.bg, borderRadius: 999, padding: '5px 11px',
              border: `1px solid ${chip.border}`,
            }}>
              <span style={{ fontSize: 13 }}>{chip.icon}</span>
              <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 12, color: chip.color }}>
                {chip.label}
              </span>
            </div>
          ))}
        </div>

        {/* Frosted equation zone */}
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          borderRadius: 22, padding: '20px 12px 22px',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10,
          marginBottom: 18, flexWrap: 'wrap',
          minHeight: 108,
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <NumberBlock value={challenge.a} size="lg" />
          <OperatorBlock op={challenge.op} size="lg" />
          <NumberBlock value={challenge.b} size="lg" />
          <OperatorBlock op="=" size="lg" />
          {selected !== null && gameState === 'correct'
            ? <div className="animate-bounce-in"><NumberBlock value={selected} color="green" size="lg" /></div>
            : selected !== null && gameState === 'wrong'
            ? <div className="animate-wiggle"><NumberBlock value={selected} color="coral" size="lg" /></div>
            : <OperatorBlock op="?" size="lg" animate />
          }
        </div>

        {/* Instruction */}
        <div style={{
          fontFamily: 'Nunito', fontWeight: 700, fontSize: 13,
          color: gameState === 'correct' ? '#4FD37A' : gameState === 'wrong' ? '#FF7B7B' : 'rgba(167,139,250,0.85)',
          textAlign: 'center', marginBottom: 18,
          transition: 'color 0.2s',
        }}>
          {gameState === 'wrong' ? '❌ Not quite — try again!' : gameState === 'correct' ? '🎉 Brilliant! Keep going!' : 'Pick the missing number →'}
        </div>

        {/* Answer choices */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {challenge.choices.map(val => (
            <div
              key={val}
              onClick={() => handleSelect(val)}
              style={{
                cursor: gameState !== 'idle' ? 'default' : 'pointer',
                opacity: gameState !== 'idle' && selected !== val ? 0.3 : 1,
                transform: selected === val ? 'scale(0.9)' : 'scale(1)',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
            >
              <NumberBlock
                value={val}
                size="lg"
                color={
                  selected === val && gameState === 'correct' ? 'green'
                  : selected === val && gameState === 'wrong' ? 'coral'
                  : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reward burst */}
      {gameState === 'correct' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 28, zIndex: 20 }}>
          {CONFETTI_SPEC.map(p => (
            <div
              key={p.id}
              className="animate-confetti-fly"
              style={{
                position: 'absolute', bottom: '42%', left: p.left,
                width: p.size, height: p.size,
                borderRadius: p.round ? '50%' : '3px',
                background: p.color,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          <div
            className="animate-reward-pop"
            style={{
              position: 'absolute', top: '14%', left: '50%',
              background: 'linear-gradient(135deg,#4FD37A 0%,#35B862 100%)',
              borderRadius: 22, padding: '14px 28px',
              boxShadow: '0 12px 44px rgba(79,211,122,0.55)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              whiteSpace: 'nowrap',
              transform: 'translateX(-50%)',
            }}
          >
            <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 30, color: '#fff', lineHeight: 1 }}>
              +120 XP 🚀
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <CoinIcon size={20} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#fff' }}>+75</span>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                <StarIcon size={20} filled color="#FFD54A" />
                <StarIcon size={20} filled color="#FFD54A" />
                <StarIcon size={20} filled color="#FFD54A" />
              </div>
              <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#fff' }}>🎁</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  // Platform block sequence under mascot
  const platformBlocks: Array<{ v: number; c: BlockColor }> = [
    { v: 1, c: 'coral' }, { v: 2, c: 'orange' }, { v: 3, c: 'yellow' },
    { v: 4, c: 'green' }, { v: 5, c: 'blue' }, { v: 6, c: 'purple' },
  ]

  return (
    <div style={{
      margin: '-16px -16px 0',
      background: 'linear-gradient(180deg, #9DC8F5 0%, #B8D8FF 25%, #CCCAFF 60%, #DDD5FF 85%, #C8E8C8 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 340,
    }}>
      {/* Sky clouds */}
      <CloudBlob w={160} style={{ top: 10, left: -30, animation: 'cloud-drift 9s ease-in-out infinite', opacity: 0.88 }} />
      <CloudBlob w={120} style={{ top: 4, right: -20, transform: 'scaleX(-1)', animation: 'cloud-drift 11s 2s ease-in-out infinite', opacity: 0.7 }} />
      <CloudBlob w={90} style={{ top: 80, left: -10, opacity: 0.38, transform: 'scale(0.75)', animation: 'cloud-drift 13s 4s ease-in-out infinite' }} />
      <CloudBlob w={80} style={{ top: 60, right: 10, opacity: 0.32, transform: 'scaleX(-1) scale(0.7)', animation: 'cloud-drift 15s 6s ease-in-out infinite' }} />

      {/* Floating math symbols — left side */}
      <div className="animate-float" style={{ position: 'absolute', top: 22, left: '4%', animationDuration: '3.3s', animationDelay: '0.1s', zIndex: 1 }}>
        <OperatorBlock op="+" size="sm" />
      </div>
      <div className="animate-float" style={{ position: 'absolute', top: 68, left: '3%', animationDuration: '4.1s', animationDelay: '0.9s', zIndex: 1 }}>
        <NumberBlock value={8} color="blue" size="sm" />
      </div>
      <div className="animate-float" style={{ position: 'absolute', top: 118, left: '5%', animationDuration: '3.7s', animationDelay: '1.6s', zIndex: 1 }}>
        <OperatorBlock op="×" size="sm" />
      </div>

      {/* Floating math symbols — right side */}
      <div className="animate-float" style={{ position: 'absolute', top: 18, right: '5%', animationDuration: '4.2s', animationDelay: '0.5s', zIndex: 1 }}>
        <NumberBlock value={3} color="yellow" size="sm" />
      </div>
      <div className="animate-float" style={{ position: 'absolute', top: 72, right: '3%', animationDuration: '3.5s', animationDelay: '1.2s', zIndex: 1 }}>
        <OperatorBlock op="=" size="sm" />
      </div>
      <div className="animate-float" style={{ position: 'absolute', top: 124, right: '4%', animationDuration: '4.6s', animationDelay: '0.3s', zIndex: 1 }}>
        <NumberBlock value={7} color="coral" size="sm" />
      </div>

      {/* Sparkles */}
      <Sparkle top="8%"  left="18%"  size={9}  opacity={0.8}  delay="0s"    color="#FFD54A" />
      <Sparkle top="6%"  right="20%" size={7}  opacity={0.65} delay="0.7s"  color="#A78BFA" />
      <Sparkle top="28%" left="12%"  size={6}  opacity={0.5}  delay="1.2s"  color="#6BCBFF" />
      <Sparkle top="24%" right="13%" size={8}  opacity={0.7}  delay="0.4s"  color="#4FD37A" />
      <Sparkle top="50%" left="16%"  size={5}  opacity={0.4}  delay="2.0s"  color="#FFD54A" />
      <Sparkle top="48%" right="16%" size={6}  opacity={0.45} delay="1.5s"  color="#FF7B7B" />

      {/* Content area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, paddingTop: 28 }}>
        {/* Greeting text — above mascot */}
        <div style={{ textAlign: 'center', marginBottom: 10, padding: '0 20px' }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 24, color: '#1E1B4B', lineHeight: 1.2, letterSpacing: '-0.3px' }}>
            Good morning, Maya! ✨
          </div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 13.5, color: '#4C1D95', marginTop: 3, opacity: 0.8 }}>
            Ready to explore Math Land?
          </div>
        </div>

        {/* Mascot floating above block platform */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Mascot shadow */}
          <div style={{
            position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
            width: 70, height: 14, borderRadius: '50%',
            background: 'rgba(76,29,149,0.22)',
            filter: 'blur(6px)',
            zIndex: 0,
          }} />

          {/* Mascot */}
          <div
            className="animate-float"
            style={{ animationDuration: '4s', filter: 'drop-shadow(0 12px 28px rgba(124,58,237,0.3))', zIndex: 1, position: 'relative' }}
          >
            <Mascot size={108} />
          </div>

          {/* Block platform row */}
          <div style={{
            display: 'flex', gap: 3, alignItems: 'flex-end',
            marginTop: -8, position: 'relative', zIndex: 2,
          }}>
            {platformBlocks.map((b, i) => (
              <div
                key={i}
                className="animate-bounce-in"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <NumberBlock value={b.v} color={b.c} size="md" />
              </div>
            ))}
          </div>

          {/* Grass strip under platform */}
          <div style={{
            width: '100%', height: 18,
            background: 'linear-gradient(180deg, #5DBE5A 0%, #4AA847 100%)',
            borderRadius: '0 0 8px 8px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Grass blade hints */}
            {[6, 18, 32, 48, 62, 76, 90].map((lft, i) => (
              <div key={i} style={{
                position: 'absolute', bottom: 0, left: `${lft}%`,
                width: 3, height: 8 + (i % 3) * 3,
                background: '#6DD46A',
                borderRadius: '3px 3px 0 0',
                transform: `rotate(${(i % 2 === 0 ? -8 : 8)}deg)`,
                transformOrigin: 'bottom center',
              }} />
            ))}
          </div>
        </div>

        {/* Stat pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', padding: '0 20px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.82)', borderRadius: 999, padding: '7px 14px',
            backdropFilter: 'blur(10px)', boxShadow: '0 2px 14px rgba(0,0,0,0.08)',
          }}>
            <span style={{ fontSize: 15 }}>🔥</span>
            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13.5, color: '#7A3A00' }}>7-day streak</span>
          </div>
          <CoinDisplay amount={1240} size="sm" />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.82)', borderRadius: 999, padding: '7px 13px',
            backdropFilter: 'blur(10px)', boxShadow: '0 2px 14px rgba(0,0,0,0.08)',
          }}>
            <LightningIcon size={14} color="#A78BFA" />
            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13.5, color: '#4C1D95' }}>Lv 12</span>
          </div>
        </div>

        {/* XP bar */}
        <div style={{ width: '100%', padding: '14px 20px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 12, color: '#4C1D95', opacity: 0.85 }}>XP to Level 13</span>
            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 12, color: '#1E1B4B' }}>680 / 1000</span>
          </div>
          <div style={{ height: 12, background: 'rgba(255,255,255,0.45)', borderRadius: 999, overflow: 'hidden', backdropFilter: 'blur(4px)' }}>
            <div style={{
              height: '100%', width: '68%',
              background: 'linear-gradient(90deg,#A78BFA 0%,#6BCBFF 100%)',
              borderRadius: 999,
              boxShadow: '0 0 16px rgba(167,139,250,0.6)',
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Home Tab ─────────────────────────────────────────────────────────────────

function HomeTab({ onOpenAdventureMap, onOpenPractice }: { onOpenAdventureMap?: () => void; onOpenPractice?: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <HeroSection />

      {/* Quick stats */}
      <div style={{ display: 'flex', gap: 12 }}>
        <StatPill icon={<TrophyIcon size={16} color="#FFB347" />} label="Trophies"  value={8}     color="orange" />
        <StatPill icon={<StarIcon size={16} color="#FFD54A" />}   label="Stars"     value={142}   color="yellow" />
        <StatPill icon={<LightningIcon size={16} color="#A78BFA" />} label="Speed" value="94%"   color="purple" />
      </div>

      {/* World map */}
      <MathAdventureMap onOpenMap={onOpenAdventureMap} />

      {/* Today's Puzzle */}
      <div>
        <SectionHeader title="🧩 Today's Puzzle" action="Practice →" onAction={onOpenPractice} />
        <DailyChallengeCard />
      </div>

      {/* Missions */}
      <div>
        <SectionHeader title="Daily Missions" action="All" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <MissionCard title="Speed Runner"  description="Finish 3 lessons today"    progress={2} max={3} reward={100} color="green"  icon="⚡" />
          <MissionCard title="Star Collector" description="Earn 5 stars in total"    progress={5} max={5} reward={75}  color="yellow" icon="⭐" />
          <MissionCard title="Perfect Score" description="Get 100% on any lesson"    progress={0} max={1} reward={150} color="purple" icon="🎯" />
        </div>
      </div>

      {/* Number blocks tray */}
      <div>
        <SectionHeader title="Number Blocks" action="Play →" />
        <Card>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
            {[0,1,2,3,4,5,6,7,8,9].map(n => (
              <div key={n} style={{ flexShrink: 0 }}>
                <NumberBlock value={n} size="md" />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            {['+','−','×','÷','=','?'].map(op => (
              <OperatorBlock key={op} op={op} size="sm" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ─── Learn Tab ─────────────────────────────────────────────────────────────────

function LearnTab({ onStartLesson }: { onStartLesson?: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#fff', borderRadius: 16, padding: '10px 14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <SearchIcon size={18} color={COLORS.textLight} />
          <span style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 15, color: COLORS.textLight }}>Search lessons, topics...</span>
        </div>
      </div>

      <SectionHeader title="Your Courses" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <CourseCard title="Counting Fun" description="Numbers 1–20" progress={85} color="green" lessons={12} icon="🔢" />
        <CourseCard title="Add it Up" description="Addition basics" progress={60} color="blue" lessons={15} icon="➕" />
        <CourseCard title="Take Away" description="Subtraction" progress={30} color="coral" lessons={14} icon="➖" />
        <CourseCard title="Times Tables" description="Multiplication" progress={0} color="orange" lessons={20} icon="✖️" locked />
      </div>

      <SectionHeader title="Lesson Path — Add it Up" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <LessonCard number={1} title="What is Addition?" duration="5 min" stars={3} coins={30} status="done" color="blue" onClick={onStartLesson} />
        <LessonCard number={2} title="Adding with Blocks" duration="7 min" stars={3} coins={35} status="done" color="blue" onClick={onStartLesson} />
        <LessonCard number={3} title="Numbers up to 10" duration="8 min" stars={2} coins={40} status="done" color="blue" onClick={onStartLesson} />
        <LessonCard number={4} title="Word Problems" duration="10 min" stars={0} coins={50} status="active" color="blue" onClick={onStartLesson} />
        <LessonCard number={5} title="Adding Tens" duration="9 min" stars={0} coins={45} status="locked" color="blue" />
        <LessonCard number={6} title="Mixed Practice" duration="12 min" stars={0} coins={60} status="locked" color="blue" />
      </div>
    </div>
  )
}

// ─── Play Tab ──────────────────────────────────────────────────────────────────

function PlayTab({ onStartPractice }: { onStartPractice?: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Card style={{ background: 'linear-gradient(135deg, #4FD37A 0%, #6BCBFF 100%)', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', right: 16, top: 16, fontSize: 64, opacity: 0.2 }}>🎮</div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 22, color: '#fff', marginBottom: 6 }}>Math Blitz!</div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 600, fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>Answer as many as you can in 60 seconds</div>
          <Button variant="yellow" size="md" icon={<PlayIcon size={16} color="#7A5A00" />} onClick={onStartPractice}>Start Game</Button>
        </div>
      </Card>

      <SectionHeader title="Block Builder" />
      <Card>
        <BlockShowcase />
      </Card>

      <SectionHeader title="Game Modes" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { title: 'Speed Math', icon: '⚡', color: 'yellow' as BlockColor, desc: 'Race the clock' },
          { title: 'Block Puzzle', icon: '🧩', color: 'purple' as BlockColor, desc: 'Build equations' },
          { title: 'Number Hunt', icon: '🔍', color: 'blue' as BlockColor, desc: 'Find the answer' },
          { title: 'Memory Match', icon: '🃏', color: 'coral' as BlockColor, desc: 'Flip and match' },
        ].map(g => (
          <RewardCard key={g.title} title={g.title} subtitle={g.desc} icon={g.icon} color={g.color} />
        ))}
      </div>

      <SectionHeader title="Leaderboard" />
      <Card>
        {[
          { rank: 1, name: 'Alex K.', score: 4820, color: 'yellow' as BlockColor },
          { rank: 2, name: 'Sofia M.', score: 4310, color: 'green' as BlockColor },
          { rank: 3, name: 'Maya J.', score: 4100, color: 'purple' as BlockColor },
          { rank: 4, name: 'Liam P.', score: 3890, color: 'blue' as BlockColor },
          { rank: 5, name: 'Zoe R.', score: 3500, color: 'orange' as BlockColor },
        ].map((p, i) => (
          <div key={p.rank} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0',
            borderBottom: i < 4 ? '1px solid #F0F1F5' : 'none',
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 10, flexShrink: 0,
              background: p.rank <= 3 ? `linear-gradient(135deg, ${BLOCK_PALETTE[p.color].bg} 0%, ${BLOCK_PALETTE[p.color].dark} 100%)` : '#F0F1F5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Nunito', fontWeight: 900, fontSize: 13,
              color: p.rank <= 3 ? '#fff' : COLORS.textMid,
            }}>
              {p.rank <= 3 ? ['🥇','🥈','🥉'][p.rank - 1] : p.rank}
            </div>
            <Avatar name={p.name} color={p.color} size="sm" />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, color: p.rank === 3 ? COLORS.purple : COLORS.text }}>{p.name} {p.rank === 3 ? '← You' : ''}</div>
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 15, color: BLOCK_PALETTE[p.color].text }}>{p.score.toLocaleString()}</div>
          </div>
        ))}
      </Card>
    </div>
  )
}

// ─── Me Tab ───────────────────────────────────────────────────────────────────

function MeTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <ProfileCard name="Maya J." level={12} xp={680} coins={1240} streak={7} />

      <SectionHeader title="Achievements" action="View all" />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <AchievementBadge icon={<TrophyIcon size={28} color="#fff" />} label="First Win" tier="gold" />
        <AchievementBadge icon={<span style={{ fontSize: 28 }}>🔥</span>} label="7 Day Streak" tier="silver" />
        <AchievementBadge icon={<StarIcon size={28} color="#fff" filled />} label="Star Gazer" tier="diamond" />
        <AchievementBadge icon={<span style={{ fontSize: 28 }}>⚡</span>} label="Speed Master" tier="bronze" />
        <AchievementBadge icon={<span style={{ fontSize: 28 }}>📚</span>} label="Book Worm" tier="gold" locked />
        <AchievementBadge icon={<span style={{ fontSize: 28 }}>🏆</span>} label="Champion" tier="diamond" locked />
      </div>

      <SectionHeader title="My Progress" />
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ProgressBar value={85} color="green" label="Addition" />
          <ProgressBar value={60} color="blue" label="Subtraction" />
          <ProgressBar value={30} color="orange" label="Multiplication" />
          <ProgressBar value={10} color="purple" label="Division" />
        </div>
      </Card>

      <SectionHeader title="Button Variants" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button variant="primary" fullWidth icon={<PlayIcon size={16} />}>Start Lesson</Button>
        <Button variant="secondary" fullWidth icon={<BookIcon size={16} color="#fff" />}>Browse Courses</Button>
        <Button variant="yellow" fullWidth icon={<TrophyIcon size={16} color="#7A5A00" />}>Claim Reward</Button>
        <Button variant="danger" fullWidth icon={<span>🗑</span>}>Delete Progress</Button>
        <Button variant="ghost" fullWidth>Cancel</Button>
        <Button variant="primary" fullWidth disabled>Coming Soon</Button>
      </div>

      <SectionHeader title="Stars & Coins" />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <StarsRow count={0} />
        <StarsRow count={1} />
        <StarsRow count={2} />
        <StarsRow count={3} />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <CoinDisplay amount={50} size="sm" />
        <CoinDisplay amount={250} size="md" />
        <CoinDisplay amount={1240} size="lg" />
      </div>
    </div>
  )
}

// ─── Adventure Map Screen ──────────────────────────────────────────────────────

type MapNodeStatus = 'done' | 'active' | 'locked'

interface MapNode {
  id: number
  level: number
  title: string
  stars: number
  coins: number
  xp: number
  status: MapNodeStatus
  side: 'left' | 'right'
  isBoss?: boolean
}

interface MapWorldConfig {
  id: string
  name: string
  emoji: string
  levelRange: string
  bgTop: string
  bgBottom: string
  accent: string
  accentDark: string
  accentLight: string
  textOnAccent: string
  unlocked: boolean
  starsEarned: number
  starsTotal: number
  nodes: MapNode[]
}

const ACTIVE_NODE_ID = 15

const ADVENTURE_DATA: MapWorldConfig[] = [
  {
    id: 'forest', name: 'Number Forest', emoji: '🌳', levelRange: 'Levels 1–10',
    bgTop: '#C5EEB5', bgBottom: '#7EC87A',
    accent: '#4FD37A', accentDark: '#35B862', accentLight: '#A0EAB8', textOnAccent: '#1A6B3A',
    unlocked: true, starsEarned: 9, starsTotal: 9,
    nodes: [
      { id: 1,  level: 1,  title: 'Count to 5',      stars: 3, coins: 25, xp: 50,  status: 'done',   side: 'right' },
      { id: 2,  level: 2,  title: 'Count to 10',     stars: 3, coins: 30, xp: 60,  status: 'done',   side: 'left'  },
      { id: 3,  level: 3,  title: 'Numbers to 20',   stars: 3, coins: 35, xp: 65,  status: 'done',   side: 'right' },
      { id: 4,  level: 4,  title: 'Compare Numbers', stars: 3, coins: 35, xp: 70,  status: 'done',   side: 'left'  },
      { id: 5,  level: 5,  title: 'Order Numbers',   stars: 3, coins: 40, xp: 75,  status: 'done',   side: 'right' },
      { id: 6,  level: 6,  title: 'Forest Boss ⚔️',  stars: 3, coins: 80, xp: 150, status: 'done',   side: 'left',  isBoss: true },
    ],
  },
  {
    id: 'valley', name: 'Addition Valley', emoji: '⛰️', levelRange: 'Levels 11–20',
    bgTop: '#B8E8FF', bgBottom: '#65AADD',
    accent: '#6BCBFF', accentDark: '#3BAEE5', accentLight: '#A0D8F8', textOnAccent: '#1A5A7A',
    unlocked: true, starsEarned: 6, starsTotal: 9,
    nodes: [
      { id: 7,  level: 11, title: 'Add to 5',        stars: 3, coins: 40,  xp: 80,  status: 'done',   side: 'right' },
      { id: 8,  level: 12, title: 'Add to 10',       stars: 3, coins: 45,  xp: 85,  status: 'done',   side: 'left'  },
      { id: 9,  level: 13, title: 'Add to 20',       stars: 3, coins: 50,  xp: 90,  status: 'done',   side: 'right' },
      { id: 10, level: 14, title: 'Word Problems',   stars: 2, coins: 50,  xp: 90,  status: 'done',   side: 'left'  },
      { id: 11, level: 15, title: 'Double Digits',   stars: 0, coins: 55,  xp: 100, status: 'locked', side: 'right' },
      { id: 12, level: 16, title: 'Valley Boss ⚔️',  stars: 0, coins: 100, xp: 200, status: 'locked', side: 'left',  isBoss: true },
    ],
  },
  {
    id: 'castle', name: 'Multiplication Castle', emoji: '🏰', levelRange: 'Levels 21–35',
    bgTop: '#E5DEFF', bgBottom: '#A693F0',
    accent: '#A78BFA', accentDark: '#8B5CF6', accentLight: '#C4ADFC', textOnAccent: '#3A1A7A',
    unlocked: true, starsEarned: 3, starsTotal: 9,
    nodes: [
      { id: 13, level: 21, title: 'Times 2',          stars: 3, coins: 55,  xp: 110, status: 'done',   side: 'right' },
      { id: 14, level: 22, title: 'Times 3',          stars: 3, coins: 55,  xp: 110, status: 'done',   side: 'left'  },
      { id: 15, level: 23, title: 'Times 4',          stars: 0, coins: 60,  xp: 120, status: 'active', side: 'right' },
      { id: 16, level: 24, title: 'Times 5',          stars: 0, coins: 60,  xp: 120, status: 'locked', side: 'left'  },
      { id: 17, level: 25, title: 'Mixed Tables',     stars: 0, coins: 65,  xp: 130, status: 'locked', side: 'right' },
      { id: 18, level: 26, title: 'Castle Boss ⚔️',   stars: 0, coins: 120, xp: 250, status: 'locked', side: 'left',  isBoss: true },
    ],
  },
  {
    id: 'volcano', name: 'Division Volcano', emoji: '🌋', levelRange: 'Levels 36–50',
    bgTop: '#FFE2BE', bgBottom: '#D96B2A',
    accent: '#FFB347', accentDark: '#E8953A', accentLight: '#FFCF84', textOnAccent: '#7A3A00',
    unlocked: false, starsEarned: 0, starsTotal: 9,
    nodes: [
      { id: 19, level: 36, title: 'Divide by 2',     stars: 0, coins: 70,  xp: 140, status: 'locked', side: 'right' },
      { id: 20, level: 37, title: 'Divide by 3',     stars: 0, coins: 70,  xp: 140, status: 'locked', side: 'left'  },
      { id: 21, level: 38, title: 'Divide by 4',     stars: 0, coins: 75,  xp: 150, status: 'locked', side: 'right' },
      { id: 22, level: 39, title: 'Remainders',      stars: 0, coins: 80,  xp: 160, status: 'locked', side: 'left'  },
      { id: 23, level: 40, title: 'Long Division',   stars: 0, coins: 85,  xp: 170, status: 'locked', side: 'right' },
      { id: 24, level: 41, title: 'Volcano Boss ⚔️', stars: 0, coins: 150, xp: 300, status: 'locked', side: 'left',  isBoss: true },
    ],
  },
  {
    id: 'galaxy', name: 'Galaxy Challenge', emoji: '🌌', levelRange: 'Level 51+',
    bgTop: '#2B1F78', bgBottom: '#0C0A28',
    accent: '#818CF8', accentDark: '#4338CA', accentLight: '#A5B4FC', textOnAccent: '#ffffff',
    unlocked: false, starsEarned: 0, starsTotal: 9,
    nodes: [
      { id: 25, level: 51, title: 'Cosmic Math',      stars: 0, coins: 100, xp: 200, status: 'locked', side: 'right' },
      { id: 26, level: 52, title: 'Star Equations',   stars: 0, coins: 100, xp: 200, status: 'locked', side: 'left'  },
      { id: 27, level: 53, title: 'Black Hole',       stars: 0, coins: 110, xp: 220, status: 'locked', side: 'right' },
      { id: 28, level: 54, title: 'Nebula Numbers',   stars: 0, coins: 110, xp: 220, status: 'locked', side: 'left'  },
      { id: 29, level: 55, title: 'Galaxy Gauntlet',  stars: 0, coins: 120, xp: 240, status: 'locked', side: 'right' },
      { id: 30, level: 56, title: 'Galaxy Boss ⭐',   stars: 0, coins: 200, xp: 400, status: 'locked', side: 'left',  isBoss: true },
    ],
  },
]

// Map zone layout constants
const MZ = {
  hdrH: 100,    // world banner height
  firstY: 80,   // y of first node center from zone top (within background, after header)
  step: 110,    // vertical step between node centers
  leftX: 88,    // x center of left-side nodes
  rightX: 298,  // x center of right-side nodes
  botPad: 80,   // space below last node
}
const ZONE_H = MZ.hdrH + MZ.firstY + 5 * MZ.step + MZ.botPad // ~810px

function mapNodePos(idx: number, side: 'left' | 'right') {
  return {
    x: side === 'left' ? MZ.leftX : MZ.rightX,
    y: MZ.hdrH + MZ.firstY + idx * MZ.step,
  }
}

// ─── Zone Decoration Layers ───────────────────────────────────────────────────

function ForestDecos() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox={`0 0 390 ${ZONE_H}`} preserveAspectRatio="none">
      {/* Trees — left column */}
      {[[20, 160], [14, 310], [22, 480], [16, 630]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <rect x="-5" y="-12" width="10" height="18" rx="3" fill="#7B4F2A" opacity="0.65" />
          <ellipse cx="0" cy="-24" rx="18" ry="22" fill="#4FD37A" opacity="0.4" />
          <ellipse cx="0" cy="-34" rx="12" ry="14" fill="#6EE7B7" opacity="0.35" />
        </g>
      ))}
      {/* Trees — right column */}
      {[[370, 200], [362, 380], [368, 540], [374, 700]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <rect x="-4" y="-10" width="8" height="15" rx="2" fill="#7B4F2A" opacity="0.6" />
          <ellipse cx="0" cy="-20" rx="14" ry="17" fill="#35B862" opacity="0.38" />
          <ellipse cx="0" cy="-30" rx="9" ry="11" fill="#6EE7B7" opacity="0.3" />
        </g>
      ))}
      {/* Flowers scattered */}
      {[[50, 240], [150, 420], [240, 560], [320, 350], [180, 700]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <circle cx="0" cy="0" r="5" fill={['#FF7B7B','#FFD54A','#6BCBFF','#A78BFA','#FFB347'][i]} opacity="0.5" />
          {[0, 72, 144, 216, 288].map(a => (
            <ellipse key={a} cx={Math.cos(a * Math.PI / 180) * 7} cy={Math.sin(a * Math.PI / 180) * 7} rx="4" ry="6"
              fill={['#FF9E9E','#FFE27A','#9BDBFF','#C4ADFC','#FFC870'][i]} opacity="0.35"
              transform={`rotate(${a} ${Math.cos(a * Math.PI / 180) * 7} ${Math.sin(a * Math.PI / 180) * 7})`}
            />
          ))}
        </g>
      ))}
      {/* Mushrooms */}
      {[[60, 530], [330, 250]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <rect x="-3" y="0" width="6" height="10" rx="1" fill="#E8D4B8" opacity="0.5" />
          <ellipse cx="0" cy="0" rx="10" ry="8" fill="#FF7B7B" opacity="0.45" />
          {[[-4,-3],[2,-5],[5,-1]].map(([dx,dy], j) => (
            <circle key={j} cx={dx} cy={dy} r="2" fill="white" opacity="0.5" />
          ))}
        </g>
      ))}
    </svg>
  )
}

function ValleyDecos() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox={`0 0 390 ${ZONE_H}`} preserveAspectRatio="none">
      {/* Mountains left */}
      <polygon points="0,400 70,250 130,400" fill="#5B8EBF" opacity="0.22" />
      <polygon points="0,500 60,340 110,500" fill="#4A7AAA" opacity="0.18" />
      {/* Snow caps */}
      <polygon points="70,250 55,290 85,290" fill="white" opacity="0.35" />
      <polygon points="60,340 47,373 73,373" fill="white" opacity="0.28" />
      {/* Mountains right */}
      <polygon points="260,320 330,160 390,320" fill="#5B8EBF" opacity="0.2" />
      <polygon points="270,480 345,300 390,480" fill="#4A7AAA" opacity="0.16" />
      <polygon points="330,160 315,200 345,200" fill="white" opacity="0.32" />
      {/* Water / river hints */}
      {[200, 350, 500, 650, 750].map((y, i) => (
        <path key={i} d={`M ${30 + i * 5} ${y} Q ${100 + i * 8} ${y - 8} ${170 + i * 5} ${y} Q ${240} ${y + 8} ${310} ${y}`}
          fill="none" stroke="#6BCBFF" strokeWidth="2.5" opacity={0.18 + i * 0.02} strokeLinecap="round" />
      ))}
      {/* Water droplets */}
      {[[55, 430], [175, 600], [350, 380], [305, 580]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <path d="M0,-8 C-6,0 -6,6 0,8 C6,6 6,0 0,-8Z" fill="#6BCBFF" opacity="0.3" />
        </g>
      ))}
    </svg>
  )
}

function CastleDecos() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox={`0 0 390 ${ZONE_H}`} preserveAspectRatio="none">
      {/* Left tower */}
      <rect x="0" y="220" width="38" height="200" fill="#8B7BB0" opacity="0.2" />
      <rect x="-2" y="208" width="42" height="24" fill="#8B7BB0" opacity="0.22" />
      {[0,14,28].map(i => <rect key={i} x={i} y="200" width="10" height="16" rx="1" fill="#8B7BB0" opacity="0.2" />)}
      {/* Right tower */}
      <rect x="352" y="300" width="38" height="180" fill="#6B5BA0" opacity="0.18" />
      <rect x="350" y="288" width="42" height="22" fill="#6B5BA0" opacity="0.2" />
      {[352,366,380].map(i => <rect key={i} x={i} y="280" width="10" height="15" rx="1" fill="#6B5BA0" opacity="0.18" />)}
      {/* Flags */}
      <line x1="19" y1="200" x2="19" y2="168" stroke="#A78BFA" strokeWidth="2" opacity="0.4" />
      <polygon points="19,168 34,175 19,182" fill="#FFD54A" opacity="0.5" />
      <line x1="371" y1="288" x2="371" y2="258" stroke="#A78BFA" strokeWidth="2" opacity="0.35" />
      <polygon points="371,258 386,265 371,272" fill="#FF7B7B" opacity="0.45" />
      {/* Stone bricks hint */}
      {[[30,400],[80,420],[130,405],[50,440],[100,455]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width={18+i*2} height={8} rx="2" fill="#B8A8D8" opacity="0.14" />
      ))}
      {/* Stars/magic sparkles */}
      {[[200,180],[280,320],[160,490],[320,600]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#FFD54A" strokeWidth="1.5" opacity="0.35" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="#FFD54A" strokeWidth="1.5" opacity="0.35" />
          <line x1="-5.5" y1="-5.5" x2="5.5" y2="5.5" stroke="#FFD54A" strokeWidth="1" opacity="0.25" />
          <line x1="5.5" y1="-5.5" x2="-5.5" y2="5.5" stroke="#FFD54A" strokeWidth="1" opacity="0.25" />
        </g>
      ))}
    </svg>
  )
}

function VolcanoDecos() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox={`0 0 390 ${ZONE_H}`} preserveAspectRatio="none">
      {/* Volcano silhouette left edge */}
      <polygon points="0,500 55,300 100,500" fill="#C45A1A" opacity="0.22" />
      <polygon points="0,650 40,480 75,650" fill="#9B3E10" opacity="0.18" />
      {/* Lava glow at base */}
      <ellipse cx="55" cy="500" rx="55" ry="12" fill="#FF7B7B" opacity="0.12" />
      {/* Smoke puffs */}
      {[[55,290],[42,265],[68,250]].map(([x,y],i) => (
        <ellipse key={i} cx={x} cy={y} rx={10+i*3} ry={7+i*2} fill="#888" opacity={0.12-i*0.02} />
      ))}
      {/* Right lava rocks */}
      <polygon points="320,450 365,380 390,450" fill="#B04A18" opacity="0.2" />
      <ellipse cx="355" cy="450" rx="38" ry="10" fill="#FF6B35" opacity="0.1" />
      {/* Lava drips */}
      {[[40,330],[340,420],[200,600],[100,680]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <path d="M0,0 C-3,8 -2,14 0,18 C2,14 3,8 0,0Z" fill="#FF7B7B" opacity={0.28+i*0.04} />
        </g>
      ))}
      {/* Lava sparks */}
      {[[80,280],[360,350],[150,420],[290,490]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <circle cx="0" cy="0" r={2+i%2} fill="#FFB347" opacity="0.45" />
          <line x1="0" y1="0" x2={[-3,4,-2,5][i]} y2={[-6,-5,7,-4][i]} stroke="#FFD54A" strokeWidth="1.5" opacity="0.35" />
        </g>
      ))}
    </svg>
  )
}

function GalaxyDecos() {
  const stars = Array.from({ length: 28 }, (_, i) => ({
    x: (i * 127 + 30) % 360 + 15,
    y: (i * 93 + 50) % (ZONE_H - 50) + 30,
    r: 1 + (i % 3),
  }))
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox={`0 0 390 ${ZONE_H}`} preserveAspectRatio="none">
      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={0.15 + (i % 4) * 0.08} />
      ))}
      {/* Nebula clouds */}
      <ellipse cx="80" cy="320" rx="60" ry="35" fill="#6366F1" opacity="0.08" />
      <ellipse cx="300" cy="500" rx="55" ry="30" fill="#A78BFA" opacity="0.07" />
      <ellipse cx="180" cy="650" rx="70" ry="40" fill="#6366F1" opacity="0.07" />
      {/* Planet */}
      <circle cx="340" cy="220" r="28" fill="#4338CA" opacity="0.22" />
      <ellipse cx="340" cy="220" rx="42" ry="10" fill="none" stroke="#818CF8" strokeWidth="3" opacity="0.18" />
      {/* Comet */}
      <circle cx="70" cy="140" r="4" fill="white" opacity="0.3" />
      <path d="M74 136 L92 120" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ─── Map Lesson Node ──────────────────────────────────────────────────────────

function MapLessonNode({
  node, world, position, activeRef,
}: {
  node: MapNode
  world: MapWorldConfig
  position: { x: number; y: number }
  activeRef?: React.RefObject<HTMLDivElement>
}) {
  const isActive = node.status === 'active'
  const isDone = node.status === 'done'
  const isLocked = node.status === 'locked'
  const isBoss = node.isBoss

  const nodeSize = isActive ? 66 : isBoss && isDone ? 62 : 54
  const isDark = world.id === 'galaxy'

  return (
    <div
      ref={isActive ? activeRef : undefined}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
        zIndex: isActive ? 4 : 2,
      }}
    >
      {/* Mascot above active node */}
      {isActive && (
        <div
          className="animate-float"
          style={{ marginBottom: -16, animationDuration: '4s', filter: 'drop-shadow(0 8px 20px rgba(124,58,237,0.3))' }}
        >
          <Mascot size={52} />
        </div>
      )}

      {/* Glow ring for active (pulsing) */}
      {isActive && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: nodeSize + 28, height: nodeSize + 28,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: `${world.accent}20`,
          border: `3px solid ${world.accent}60`,
          animation: 'float 2.5s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: -1,
        }} />
      )}

      {/* Done glow */}
      {isDone && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: nodeSize + 14, height: nodeSize + 14,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          boxShadow: `0 0 18px ${world.accent}55`,
          pointerEvents: 'none', zIndex: -1,
        }} />
      )}

      {/* Node circle */}
      <div style={{
        width: nodeSize, height: nodeSize, borderRadius: '50%',
        background: isLocked
          ? 'rgba(180,180,200,0.35)'
          : isActive
          ? `linear-gradient(135deg, ${world.accentLight} 0%, ${world.accent} 55%, ${world.accentDark} 100%)`
          : isDone
          ? `linear-gradient(135deg, ${world.accentLight} 0%, ${world.accent} 100%)`
          : 'rgba(160,160,180,0.3)',
        border: isActive
          ? `3px solid rgba(255,255,255,0.9)`
          : isDone
          ? `2.5px solid rgba(255,255,255,0.65)`
          : `2px solid rgba(255,255,255,${isDark ? '0.15' : '0.3'})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: isActive
          ? `0 0 0 5px ${world.accent}28, 0 8px 24px ${world.accent}55, 0 2px 8px rgba(0,0,0,0.22)`
          : isDone
          ? `0 4px 16px ${world.accent}44, 0 1px 4px rgba(0,0,0,0.15)`
          : `0 2px 8px rgba(0,0,0,0.12)`,
        backdropFilter: isLocked ? 'blur(2px)' : 'none',
        flexShrink: 0,
      }}>
        {isDone && <CheckIcon size={Math.round(nodeSize * 0.38)} color="#fff" />}
        {isActive && <PlayIcon size={Math.round(nodeSize * 0.30)} color="#fff" />}
        {isLocked && <LockIcon size={Math.round(nodeSize * 0.30)} color={isDark ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.5)'} />}
      </div>

      {/* Stars row (non-locked) */}
      {!isLocked && (
        <div style={{ display: 'flex', gap: 2, marginTop: 1 }}>
          {[0, 1, 2].map(i => (
            <StarIcon key={i} size={11} filled={i < node.stars} color="#FFD54A" />
          ))}
        </div>
      )}

      {/* Level label */}
      <div style={{
        fontFamily: 'Nunito', fontWeight: 800, fontSize: 10.5,
        color: isLocked
          ? `rgba(255,255,255,${isDark ? '0.3' : '0.5'})`
          : 'rgba(255,255,255,0.92)',
        textShadow: '0 1px 4px rgba(0,0,0,0.4)',
        lineHeight: 1,
      }}>
        Lv {node.level}
      </div>

      {/* Active node: info card */}
      {isActive && (
        <div style={{
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 20, padding: '12px 16px 14px',
          boxShadow: `0 8px 28px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)`,
          textAlign: 'center',
          minWidth: 160, maxWidth: 195,
          border: `1.5px solid ${world.accent}30`,
          marginTop: 4,
        }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 13.5, color: COLORS.text, lineHeight: 1.2 }}>
            {node.title}
          </div>
          <div style={{
            fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, color: COLORS.textMid,
            marginTop: 4, display: 'flex', gap: 10, justifyContent: 'center',
          }}>
            <span>⚡ +{node.xp} XP</span>
            <span>🪙 +{node.coins}</span>
          </div>
          <div style={{ marginTop: 9 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: `linear-gradient(135deg, ${world.accent} 0%, ${world.accentDark} 100%)`,
              borderRadius: 999, padding: '6px 18px',
              fontFamily: 'Nunito', fontWeight: 900, fontSize: 13, color: '#fff',
              boxShadow: `0 3px 0 0 ${world.accentDark}, 0 5px 14px ${world.accent}44`,
              cursor: 'pointer',
            }}>
              <PlayIcon size={12} color="#fff" />
              Play!
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── World Zone ───────────────────────────────────────────────────────────────

function WorldZoneSection({
  world, activeRef,
}: {
  world: MapWorldConfig
  activeRef?: React.RefObject<HTMLDivElement>
}) {
  const isDark = world.id === 'galaxy'
  const isLocked = !world.unlocked

  const progressPercent = world.starsTotal > 0 ? Math.round((world.starsEarned / world.starsTotal) * 100) : 0

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: ZONE_H,
      background: `linear-gradient(180deg, ${world.bgTop} 0%, ${world.bgBottom} 100%)`,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Decoration layer */}
      {world.id === 'forest'  && <ForestDecos />}
      {world.id === 'valley'  && <ValleyDecos />}
      {world.id === 'castle'  && <CastleDecos />}
      {world.id === 'volcano' && <VolcanoDecos />}
      {world.id === 'galaxy'  && <GalaxyDecos />}

      {/* Locked world fog overlay */}
      {isLocked && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.36)',
          backdropFilter: 'blur(2px)',
          zIndex: 1, pointerEvents: 'none',
        }} />
      )}

      {/* World banner */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: MZ.hdrH,
        display: 'flex', alignItems: 'center',
        padding: '0 20px',
        background: isDark
          ? 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(0,0,0,0.14) 0%, transparent 100%)',
      }}>
        {/* World emoji */}
        <div style={{ fontSize: 38, lineHeight: 1, filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.25))', marginRight: 14 }}>
          {world.emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'Nunito', fontWeight: 900, fontSize: 18,
            color: 'rgba(255,255,255,0.97)',
            textShadow: '0 2px 8px rgba(0,0,0,0.35)',
            lineHeight: 1.1,
          }}>
            {world.name}
          </div>
          <div style={{
            fontFamily: 'Nunito', fontWeight: 700, fontSize: 12,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 2,
          }}>
            {world.levelRange}
          </div>
        </div>
        {/* Stars + progress */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <StarIcon size={14} filled color="#FFD54A" />
            <span style={{
              fontFamily: 'Nunito', fontWeight: 900, fontSize: 13,
              color: 'rgba(255,255,255,0.95)',
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}>
              {world.starsEarned}/{world.starsTotal}
            </span>
          </div>
          {!isLocked && progressPercent > 0 && (
            <div style={{ width: 72, height: 6, background: 'rgba(255,255,255,0.3)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${progressPercent}%`,
                background: world.accent, borderRadius: 999,
                boxShadow: `0 0 8px ${world.accent}88`,
              }} />
            </div>
          )}
          {isLocked && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'rgba(255,255,255,0.15)', borderRadius: 999, padding: '3px 8px',
            }}>
              <LockIcon size={11} color="rgba(255,255,255,0.8)" />
              <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
                Locked
              </span>
            </div>
          )}
        </div>
      </div>

      {/* SVG path layer (drawn between nodes, under nodes) */}
      <svg style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1,
      }}>
        {world.nodes.slice(0, -1).map((node, i) => {
          const next = world.nodes[i + 1]
          const start = mapNodePos(i, node.side)
          const end = mapNodePos(i + 1, next.side)
          const cp1 = { x: start.x, y: start.y + MZ.step * 0.42 }
          const cp2 = { x: end.x, y: end.y - MZ.step * 0.42 }
          const isComplete = node.status === 'done' && (next.status === 'done' || next.status === 'active')
          const pathColor = isComplete ? world.accent : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.4)'
          return (
            <path
              key={i}
              d={`M ${start.x} ${start.y} C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${end.x} ${end.y}`}
              fill="none"
              stroke={pathColor}
              strokeWidth={isComplete ? 5 : 4}
              strokeLinecap="round"
              strokeDasharray={isComplete ? 'none' : '7 6'}
              opacity={isComplete ? 0.75 : 0.55}
            />
          )
        })}
      </svg>

      {/* Lesson nodes */}
      {world.nodes.map((node, i) => (
        <MapLessonNode
          key={node.id}
          node={node}
          world={world}
          position={mapNodePos(i, node.side)}
          activeRef={node.id === ACTIVE_NODE_ID ? activeRef : undefined}
        />
      ))}

      {/* Locked world center message */}
      {isLocked && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3, textAlign: 'center',
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          borderRadius: 20, padding: '16px 24px',
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🔒</div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 15, color: 'rgba(255,255,255,0.95)' }}>
            {world.name}
          </div>
          <div style={{
            fontFamily: 'Nunito', fontWeight: 700, fontSize: 12,
            color: 'rgba(255,255,255,0.6)', marginTop: 4, lineHeight: 1.4,
          }}>
            Complete the previous world<br />to unlock this adventure!
          </div>
        </div>
      )}
    </div>
  )
}

// ─── World Gate (transition between zones) ────────────────────────────────────

function WorldGate({ fromWorld, toWorld }: { fromWorld: MapWorldConfig; toWorld: MapWorldConfig }) {
  const unlocked = toWorld.unlocked
  return (
    <div style={{
      position: 'relative', width: '100%', height: 56, flexShrink: 0,
      background: `linear-gradient(180deg, ${fromWorld.bgBottom} 0%, ${toWorld.bgTop} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Path continuation line */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 390 56" preserveAspectRatio="none">
        <line
          x1="195" y1="0" x2="195" y2="56"
          stroke={unlocked ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}
          strokeWidth="4" strokeDasharray="6 5"
        />
      </svg>
      {/* Gate icon */}
      <div style={{
        background: unlocked ? fromWorld.accent : 'rgba(150,150,180,0.5)',
        borderRadius: '50%', width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2.5px solid rgba(255,255,255,0.7)',
        boxShadow: unlocked ? `0 0 16px ${fromWorld.accent}66` : '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1,
      }}>
        {unlocked
          ? <ArrowRightIcon size={14} color="#fff" />
          : <LockIcon size={13} color="rgba(255,255,255,0.7)" />
        }
      </div>
    </div>
  )
}

// ─── Adventure Map Screen ─────────────────────────────────────────────────────

function AdventureMapScreen({
  onBack, onNavSelect,
}: {
  onBack: () => void
  onNavSelect: (id: string) => void
}) {
  const activeNodeRef = React.useRef<HTMLDivElement>(null!)
  const scrollRef = React.useRef<HTMLDivElement>(null!)

  React.useEffect(() => {
    if (activeNodeRef.current && scrollRef.current) {
      const node = activeNodeRef.current
      const container = scrollRef.current
      const nodeTop = node.offsetTop + (node.closest('[data-zone]') as HTMLElement | null)?.offsetTop! || node.offsetTop
      const offset = nodeTop - container.clientHeight / 2 + 60
      container.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' })
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Custom top nav */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #F0F1F5',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
        gap: 12,
      }}>
        {/* Back button */}
        <button onClick={onBack} style={{
          background: COLORS.neutral, border: 'none', borderRadius: 13,
          width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Title */}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 18, color: COLORS.text, lineHeight: 1.1 }}>
            🗺 Math Adventure
          </div>
          <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11.5, color: COLORS.textMid, marginTop: 1 }}>
            5 worlds · 30 lessons
          </div>
        </div>

        {/* Coins */}
        <CoinDisplay amount={1240} size="sm" />

        {/* XP pill */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: `${COLORS.purple}15`, borderRadius: 999, padding: '6px 12px',
          border: `1px solid ${COLORS.purple}30`,
        }}>
          <LightningIcon size={13} color={COLORS.purple} />
          <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 12.5, color: COLORS.purpleDark }}>
            680 XP
          </span>
        </div>
      </div>

      {/* World progress summary strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        background: '#fff',
        borderBottom: '1px solid #F0F1F5',
        overflowX: 'auto',
        padding: '10px 16px',
        flexShrink: 0,
      }}>
        {ADVENTURE_DATA.map((w, i) => (
          <React.Fragment key={w.id}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              minWidth: 52,
              opacity: w.unlocked ? 1 : 0.45,
            }}>
              <div style={{ fontSize: 20 }}>{w.emoji}</div>
              <div style={{
                width: 36, height: 4, borderRadius: 999, overflow: 'hidden',
                background: '#F0F1F5',
              }}>
                <div style={{
                  height: '100%',
                  width: `${w.starsTotal > 0 ? Math.round(w.starsEarned / w.starsTotal * 100) : 0}%`,
                  background: w.accent, borderRadius: 999,
                }} />
              </div>
            </div>
            {i < ADVENTURE_DATA.length - 1 && (
              <div style={{
                flex: 1, height: 2, minWidth: 12,
                background: ADVENTURE_DATA[i + 1].unlocked ? '#E0E2EA' : '#F0F1F5',
                marginBottom: 10,
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Scrollable world map */}
      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}
      >
        {ADVENTURE_DATA.map((world, i) => (
          <React.Fragment key={world.id}>
            <div data-zone={world.id}>
              <WorldZoneSection world={world} activeRef={activeNodeRef} />
            </div>
            {i < ADVENTURE_DATA.length - 1 && (
              <WorldGate fromWorld={world} toWorld={ADVENTURE_DATA[i + 1]} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom nav (same as home) */}
      <BottomNavBar active="home" onSelect={onNavSelect} />
    </div>
  )
}

// ─── Practice Screen ──────────────────────────────────────────────────────────

const PRACTICE_LESSON_NAME = 'Add it Up!'

interface PracticeQ { id: number; a: number; op: string; b: number; answer: number }

const PRACTICE_QS: PracticeQ[] = [
  { id: 1,  a: 2, op: '+', b: 5, answer: 7 },
  { id: 2,  a: 8, op: '−', b: 3, answer: 5 },
  { id: 3,  a: 3, op: '×', b: 3, answer: 9 },
  { id: 4,  a: 4, op: '+', b: 2, answer: 6 },
  { id: 5,  a: 5, op: '−', b: 3, answer: 2 },
  { id: 6,  a: 2, op: '×', b: 4, answer: 8 },
  { id: 7,  a: 1, op: '+', b: 3, answer: 4 },
  { id: 8,  a: 9, op: '−', b: 6, answer: 3 },
  { id: 9,  a: 0, op: '+', b: 7, answer: 7 },
  { id: 10, a: 3, op: '×', b: 2, answer: 6 },
]

const PRACTICE_CONFETTI = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  color: ['#FFD54A','#4FD37A','#6BCBFF','#FF7B7B','#A78BFA','#FFB347'][i % 6],
  left: 5 + (i * 19) % 340,
  delay: i * 0.045,
  size: 6 + (i % 4) * 4,
  round: i % 3 === 0,
}))

function PracticeScreen({
  onBack, onComplete, onNavSelect,
}: {
  onBack: () => void
  onComplete: (data: ResultData) => void
  onNavSelect: (id: string) => void
}) {
  const [qIdx, setQIdx] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [xpGained, setXpGained] = useState(0)
  const [coinsGained, setCoinsGained] = useState(0)
  const [starsEarned, setStarsEarned] = useState(0)
  const [totalMistakes, setTotalMistakes] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [currentCombo, setCurrentCombo] = useState(0)
  const startTimeRef = React.useRef(Date.now())
  const [gameState, setGameState] = useState<'playing' | 'correct' | 'wrong' | 'complete'>('playing')
  const [placedVal, setPlacedVal] = useState<number | null>(null)
  const [wrongStreak, setWrongStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [pressedKey, setPressedKey] = useState<number | null>(null)

  // Drag state
  const dragRef = React.useRef<{ val: number; sx: number; sy: number } | null>(null)
  const [draggingVal, setDraggingVal] = useState<number | null>(null)
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number } | null>(null)
  const [slotGlowing, setSlotGlowing] = useState(false)
  const slotRef = React.useRef<HTMLDivElement>(null)

  const current = PRACTICE_QS[qIdx]

  const tryAnswer = (val: number) => {
    if (gameState !== 'playing') return
    setPlacedVal(val)

    if (val === current.answer) {
      setGameState('correct')
      const perfect = wrongStreak === 0
      setXpGained(p => p + 50)
      setCoinsGained(p => p + 15)
      if (perfect) setStarsEarned(p => p + 1)
      const newCombo = currentCombo + 1
      setCurrentCombo(newCombo)
      setMaxCombo(m => Math.max(m, newCombo))
      setTimeout(() => {
        const next = qIdx + 1
        if (next >= PRACTICE_QS.length) {
          setGameState('complete')
        } else {
          setQIdx(next)
          setPlacedVal(null)
          setWrongStreak(0)
          setShowHint(false)
          setGameState('playing')
        }
      }, 2100)
    } else {
      setGameState('wrong')
      setTotalMistakes(m => m + 1)
      setCurrentCombo(0)
      const newStreak = wrongStreak + 1
      setWrongStreak(newStreak)
      if (newStreak >= 3) {
        setHearts(h => Math.max(0, h - 1))
        setWrongStreak(0)
      }
      setTimeout(() => {
        setPlacedVal(null)
        setGameState('playing')
      }, 950)
    }
  }

  const onKeyPointerDown = (val: number, e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'playing') return
    e.preventDefault()
    dragRef.current = { val, sx: e.clientX, sy: e.clientY }
    setDraggingVal(val)
    setGhostPos({ x: e.clientX, y: e.clientY })
    setPressedKey(val)
    setTimeout(() => setPressedKey(null), 250)
  }

  const onContainerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    const { sx, sy } = dragRef.current
    const moved = Math.hypot(e.clientX - sx, e.clientY - sy) > 10
    if (moved) {
      setGhostPos({ x: e.clientX, y: e.clientY })
      if (slotRef.current) {
        const r = slotRef.current.getBoundingClientRect()
        setSlotGlowing(
          e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top && e.clientY <= r.bottom
        )
      }
    }
  }

  const onContainerPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    const { val, sx, sy } = dragRef.current
    const moved = Math.hypot(e.clientX - sx, e.clientY - sy) > 10

    dragRef.current = null
    setDraggingVal(null)
    setGhostPos(null)
    setSlotGlowing(false)

    if (moved) {
      if (slotRef.current) {
        const r = slotRef.current.getBoundingClientRect()
        const over = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
        if (over) tryAnswer(val)
      }
    } else {
      tryAnswer(val)
    }
  }

  const hintText = wrongStreak >= 2
    ? `The answer is ${current.answer}! You've got this! 🎯`
    : `Think step by step: ${current.a} ${current.op} ${current.b}... count on your fingers! 🖐️`

  const progressPct = Math.round((qIdx / PRACTICE_QS.length) * 100)

  return (
    <div
      onPointerMove={onContainerPointerMove}
      onPointerUp={onContainerPointerUp}
      onPointerCancel={() => { dragRef.current = null; setDraggingVal(null); setGhostPos(null); setSlotGlowing(false); }}
      style={{
        display: 'flex', flexDirection: 'column', minHeight: '100vh',
        background: 'linear-gradient(180deg, #9DC8F5 0%, #BACED8 28%, #CCCAFF 62%, #DDD5FF 85%, #E8D8FF 100%)',
        touchAction: 'none', userSelect: 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* ── Background layer ────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <CloudBlob w={170} style={{ top: 44, left: -32, opacity: 0.62, animation: 'cloud-drift 10s ease-in-out infinite' }} />
        <CloudBlob w={110} style={{ top: 24, right: -18, opacity: 0.48, transform: 'scaleX(-1)', animation: 'cloud-drift 13s 3s ease-in-out infinite' }} />
        <CloudBlob w={80} style={{ top: 200, left: 8, opacity: 0.28, transform: 'scale(0.7)', animation: 'cloud-drift 16s 7s ease-in-out infinite' }} />

        {/* Floating background blocks */}
        <div className="animate-float" style={{ position: 'absolute', top: 92, left: '2%', animationDuration: '4.2s', animationDelay: '0.1s', opacity: 0.32 }}>
          <NumberBlock value={1} color="coral" size="sm" />
        </div>
        <div className="animate-float" style={{ position: 'absolute', top: 76, right: '3%', animationDuration: '3.6s', animationDelay: '0.9s', opacity: 0.28 }}>
          <OperatorBlock op="+" size="sm" />
        </div>
        <div className="animate-float" style={{ position: 'absolute', bottom: 260, left: '4%', animationDuration: '4.8s', animationDelay: '1.5s', opacity: 0.25 }}>
          <NumberBlock value={8} color="blue" size="sm" />
        </div>
        <div className="animate-float" style={{ position: 'absolute', bottom: 240, right: '2%', animationDuration: '3.9s', animationDelay: '0.6s', opacity: 0.25 }}>
          <OperatorBlock op="×" size="sm" />
        </div>

        {/* Sparkles */}
        <Sparkle top="12%"  left="11%"  size={8} opacity={0.5} delay="0s"    color="#FFD54A" />
        <Sparkle top="10%"  right="13%" size={6} opacity={0.4} delay="0.8s"  color="#A78BFA" />
        <Sparkle top="38%"  left="5%"   size={5} opacity={0.3} delay="1.6s"  color="#6BCBFF" />
        <Sparkle top="36%"  right="6%"  size={7} opacity={0.35} delay="0.4s" color="#4FD37A" />
        <Sparkle bottom="40%" left="7%" size={6} opacity={0.28} delay="2.1s" color="#FFB347" />
        <Sparkle bottom="36%" right="8%" size={5} opacity={0.3} delay="1.1s" color="#FF7B7B" />
      </div>

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 10, padding: '12px 16px 0' }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Back */}
          <button onClick={onBack} style={{
            background: 'rgba(255,255,255,0.82)', border: 'none', borderRadius: 13,
            width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Lesson + subtitle */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#1E1B4B', lineHeight: 1.1 }}>
              {PRACTICE_LESSON_NAME}
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, color: 'rgba(76,29,149,0.72)', marginTop: 1 }}>
              Word Problems · {progressPct}% done
            </div>
          </div>

          {/* Hearts */}
          <div style={{ display: 'flex', gap: 3 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                fontSize: 20, lineHeight: 1,
                opacity: i < hearts ? 1 : 0.28,
                filter: i < hearts ? 'none' : 'grayscale(1)',
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                display: 'inline-block',
              }}>❤️</span>
            ))}
          </div>

          {/* Coins */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'rgba(255,255,255,0.82)', borderRadius: 999, padding: '5px 10px',
            backdropFilter: 'blur(10px)', boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}>
            <CoinIcon size={15} />
            <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 13, color: '#7A5A00' }}>
              +{coinsGained}
            </span>
          </div>

          {/* XP */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: `${COLORS.purple}18`, borderRadius: 999, padding: '5px 10px',
            border: `1px solid ${COLORS.purple}30`,
          }}>
            <LightningIcon size={12} color={COLORS.purple} />
            <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 13, color: COLORS.purpleDark }}>
              +{xpGained}
            </span>
          </div>

          {/* Mascot cheering */}
          <div
            className={gameState === 'correct' ? 'animate-bounce-in' : gameState === 'wrong' ? 'animate-wiggle' : 'animate-float'}
            style={{ flexShrink: 0, animationDuration: '4s' }}
          >
            <Mascot size={42} />
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 12, height: 7, background: 'rgba(255,255,255,0.38)', borderRadius: 999, overflow: 'hidden', backdropFilter: 'blur(4px)' }}>
          <div style={{
            height: '100%',
            width: `${progressPct}%`,
            background: 'linear-gradient(90deg, #A78BFA 0%, #6BCBFF 100%)',
            borderRadius: 999,
            boxShadow: '0 0 10px rgba(167,139,250,0.55)',
            transition: 'width 0.6s cubic-bezier(0.34,1.56,0.64,1)',
          }} />
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'space-evenly', padding: '4px 20px 8px',
        position: 'relative', zIndex: 1,
        gap: 4,
      }}>

        {/* ── Equation zone ───────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          background: 'rgba(255,255,255,0.46)', backdropFilter: 'blur(14px)',
          borderRadius: 32, padding: '22px 28px 24px',
          width: '100%',
          border: gameState === 'correct' ? '1.5px solid rgba(79,211,122,0.4)'
            : gameState === 'wrong' ? '1.5px solid rgba(255,123,123,0.4)'
            : '1.5px solid rgba(255,255,255,0.6)',
          boxShadow: gameState === 'correct' ? '0 8px 40px rgba(79,211,122,0.18), 0 2px 12px rgba(0,0,0,0.06)'
            : gameState === 'wrong' ? '0 8px 40px rgba(255,123,123,0.18), 0 2px 12px rgba(0,0,0,0.06)'
            : '0 8px 40px rgba(0,0,0,0.07), 0 2px 12px rgba(0,0,0,0.04)',
          transition: 'border-color 0.2s, box-shadow 0.25s',
        }}>
          {/* Equation row */}
          <div
            className={gameState === 'wrong' ? 'animate-wiggle' : ''}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}
          >
            <NumberBlock value={current.a} size="lg" />
            <OperatorBlock op={current.op} size="lg" />
            <NumberBlock value={current.b} size="lg" />
            <OperatorBlock op="=" size="lg" />

            {/* Answer slot */}
            <div
              ref={slotRef}
              style={{
                position: 'relative',
                transition: 'transform 0.15s',
                transform: slotGlowing ? 'scale(1.12)' : 'scale(1)',
              }}
            >
              {placedVal !== null ? (
                <div
                  key={`placed-${qIdx}-${placedVal}`}
                  className="animate-answer-pop"
                >
                  <NumberBlock
                    value={placedVal}
                    color={gameState === 'correct' ? 'green' : gameState === 'wrong' ? 'coral' : undefined}
                    size="lg"
                  />
                </div>
              ) : (
                <div className="animate-slot-idle">
                  <OperatorBlock op="?" size="lg" animate />
                </div>
              )}

              {/* Drop target glow ring */}
              {slotGlowing && (
                <div style={{
                  position: 'absolute', inset: -10, borderRadius: 26, zIndex: -1,
                  background: 'rgba(255,213,74,0.18)',
                  border: '3px dashed #FFD54A',
                  animation: 'slot-drop-glow 0.65s ease-in-out infinite',
                }} />
              )}
            </div>
          </div>

          {/* Status message */}
          <div style={{
            fontFamily: 'Nunito', fontWeight: 700, fontSize: 13.5,
            color: gameState === 'correct' ? '#35B862'
              : gameState === 'wrong' ? '#E85A5A'
              : slotGlowing ? '#E6BB2A'
              : 'rgba(76,29,149,0.68)',
            textAlign: 'center',
            transition: 'color 0.2s',
            minHeight: 20,
          }}>
            {gameState === 'wrong' ? "❌ Not quite! You've got this! 💪"
              : gameState === 'correct' ? '🎉 Fantastic! Keep going!'
              : ghostPos ? 'Drop it in the box! ⬆️'
              : 'Tap a number below, or drag it up ↑'}
          </div>
        </div>

        {/* ── Hint ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
          {showHint && (
            <div className="animate-bounce-in" style={{
              background: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: '13px 18px',
              boxShadow: '0 6px 28px rgba(0,0,0,0.10)',
              border: '1.5px solid rgba(167,139,250,0.3)',
              textAlign: 'center', maxWidth: 290, position: 'relative',
            }}>
              <div style={{ position: 'absolute', bottom: -9, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderTop: '10px solid rgba(255,255,255,0.95)' }} />
              <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13.5, color: COLORS.text, lineHeight: 1.45 }}>
                💡 {hintText}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowHint(s => !s)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(12px)',
              border: `1.5px solid rgba(167,139,250,${showHint ? '0.55' : '0.25'})`,
              borderRadius: 999, padding: '9px 22px', cursor: 'pointer',
              boxShadow: '0 3px 14px rgba(0,0,0,0.06)',
              transition: 'border-color 0.2s',
            }}
          >
            <span style={{ fontSize: 18 }}>💡</span>
            <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, color: COLORS.purpleDark }}>
              {showHint ? 'Hide Hint' : 'Get a Hint'}
            </span>
            {wrongStreak >= 2 && !showHint && (
              <span style={{
                background: COLORS.coral, borderRadius: 999, padding: '2px 7px',
                fontFamily: 'Nunito', fontWeight: 900, fontSize: 11, color: '#fff',
                marginLeft: 2,
              }}>!</span>
            )}
          </button>
        </div>

        {/* ── Number Block Keyboard ─────────────────────────────────── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
          background: 'rgba(255,255,255,0.38)', backdropFilter: 'blur(14px)',
          borderRadius: 28, padding: '18px 20px 20px',
          width: '100%',
          border: '1.5px solid rgba(255,255,255,0.55)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 12, color: 'rgba(76,29,149,0.6)', marginBottom: 2 }}>
            {ghostPos ? '📦 Drag to the answer box!' : '✋ Tap a number or drag it up'}
          </div>
          {[[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]].map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 9 }}>
              {row.map(val => {
                const isBeingDragged = draggingVal === val && ghostPos !== null
                const isPressed = pressedKey === val
                return (
                  <div
                    key={val}
                    onPointerDown={(e) => onKeyPointerDown(val, e)}
                    className={isPressed ? 'animate-keyboard-press' : ''}
                    style={{
                      cursor: gameState === 'playing' ? 'grab' : 'not-allowed',
                      opacity: isBeingDragged ? 0.35 : 1,
                      transition: 'opacity 0.15s',
                      touchAction: 'none',
                      flexShrink: 0,
                    }}
                  >
                    <NumberBlock value={val} size="md" />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom strip ────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 10,
        padding: '10px 20px 14px',
        background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.65)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13, color: '#4C1D95' }}>
            Question {qIdx + 1} / {PRACTICE_QS.length}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <LightningIcon size={13} color={COLORS.purple} />
              <span style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 12, color: COLORS.purpleDark }}>+{xpGained} XP</span>
            </div>
            <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {Array.from({ length: 3 }, (_, i) => (
                <StarIcon key={i} size={15} filled={i < starsEarned} color="#FFD54A" />
              ))}
            </div>
          </div>
        </div>
        {/* Question dots */}
        <div style={{ display: 'flex', gap: 5 }}>
          {PRACTICE_QS.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 7, borderRadius: 999,
              background: i < qIdx ? '#4FD37A' : i === qIdx ? '#A78BFA' : 'rgba(0,0,0,0.1)',
              transition: 'background 0.3s',
              boxShadow: i === qIdx ? '0 0 8px rgba(167,139,250,0.7)' : 'none',
            }} />
          ))}
        </div>
      </div>

      {/* ── Bottom Nav ──────────────────────────────────────────────────── */}
      <BottomNavBar active="learn" onSelect={onNavSelect} />

      {/* ── Drag ghost ──────────────────────────────────────────────────── */}
      {ghostPos && draggingVal !== null && (
        <div style={{
          position: 'fixed',
          left: ghostPos.x - 30, top: ghostPos.y - 30,
          pointerEvents: 'none', zIndex: 9999,
          transform: 'scale(1.28) rotate(-6deg)',
          filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.32))',
        }}>
          <NumberBlock value={draggingVal} size="md" />
        </div>
      )}

      {/* ── Correct reward burst ─────────────────────────────────────────── */}
      {gameState === 'correct' && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          zIndex: 20, overflow: 'hidden',
        }}>
          {/* Screen flash */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(79,211,122,0.12)',
            animation: 'correct-screen-flash 0.7s ease-out both',
          }} />
          {/* Confetti */}
          {PRACTICE_CONFETTI.map(p => (
            <div key={p.id} className="animate-confetti-fly" style={{
              position: 'absolute', bottom: '35%', left: p.left,
              width: p.size, height: p.size,
              borderRadius: p.round ? '50%' : '3px',
              background: p.color,
              animationDelay: `${p.delay}s`,
            }} />
          ))}
          {/* Reward popup */}
          <div className="animate-reward-pop" style={{
            position: 'absolute', top: '18%', left: '50%',
            background: 'linear-gradient(135deg, #4FD37A 0%, #35B862 100%)',
            borderRadius: 26, padding: '16px 30px',
            boxShadow: '0 14px 48px rgba(79,211,122,0.52)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            whiteSpace: 'nowrap', transform: 'translateX(-50%)',
          }}>
            <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 28, color: '#fff', lineHeight: 1 }}>
              +50 XP 🚀
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <CoinIcon size={18} />
                <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#fff' }}>+15</span>
              </div>
              {wrongStreak === 0 && (
                <div style={{ display: 'flex', gap: 2 }}>
                  <StarIcon size={20} filled color="#FFD54A" />
                  <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#FFD54A' }}>Perfect!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Lesson Complete overlay ──────────────────────────────────────── */}
      {gameState === 'complete' && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(30,27,78,0.88)', backdropFilter: 'blur(14px)',
          zIndex: 30, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '30px 24px',
        }}>
          {/* Confetti also plays on complete */}
          {PRACTICE_CONFETTI.map(p => (
            <div key={p.id} className="animate-confetti-fly" style={{
              position: 'absolute', bottom: '30%', left: p.left,
              width: p.size, height: p.size,
              borderRadius: p.round ? '50%' : '3px',
              background: p.color,
              animationDelay: `${p.delay * 0.5}s`,
            }} />
          ))}

          <div className="animate-bounce-in" style={{
            background: 'linear-gradient(145deg, #2D1B69 0%, #1E1B4B 100%)',
            borderRadius: 32, padding: '32px 28px',
            width: '100%', maxWidth: 340, textAlign: 'center',
            border: '1.5px solid rgba(167,139,250,0.35)',
            boxShadow: '0 24px 72px rgba(0,0,0,0.4)',
            zIndex: 1,
          }}>
            {/* Trophy */}
            <div style={{ fontSize: 56, marginBottom: 6 }}>🏆</div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 26, color: '#fff', lineHeight: 1.1 }}>
              Lesson Complete!
            </div>
            <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 14, color: 'rgba(167,139,250,0.85)', marginTop: 6, marginBottom: 22 }}>
              You finished all {PRACTICE_QS.length} questions! 🎉
            </div>

            {/* Stats row */}
            <div style={{
              display: 'flex', justifyContent: 'space-around',
              background: 'rgba(255,255,255,0.06)', borderRadius: 22, padding: '18px 12px',
              marginBottom: 22, border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {/* Stars */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 4 }}>
                  {Array.from({ length: 3 }, (_, i) => (
                    <StarIcon key={i} size={22} filled={i < starsEarned} color="#FFD54A" />
                  ))}
                </div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11.5, color: 'rgba(255,255,255,0.55)' }}>
                  Stars
                </div>
              </div>
              {/* XP */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 28, color: '#A78BFA', lineHeight: 1 }}>
                  +{xpGained}
                </div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11.5, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
                  XP
                </div>
              </div>
              {/* Coins */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                  <CoinIcon size={22} />
                  <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 28, color: '#FFD54A', lineHeight: 1 }}>
                    +{coinsGained}
                  </span>
                </div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11.5, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
                  Coins
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={onBack} style={{
                flex: 1, padding: '13px 0',
                background: 'rgba(255,255,255,0.09)', border: '1.5px solid rgba(255,255,255,0.18)',
                borderRadius: 16, fontFamily: 'Nunito', fontWeight: 800, fontSize: 14,
                color: 'rgba(255,255,255,0.78)', cursor: 'pointer',
              }}>
                ← Back
              </button>
              <button
                onClick={() => onComplete({
                  xp: xpGained, coins: coinsGained, stars: starsEarned, starsTotal: PRACTICE_QS.length,
                  correct: starsEarned + (PRACTICE_QS.length - starsEarned),
                  total: PRACTICE_QS.length, mistakes: totalMistakes, combo: maxCombo,
                  timeSec: Math.round((Date.now() - startTimeRef.current) / 1000),
                  lessonName: PRACTICE_LESSON_NAME,
                })}
                style={{
                  flex: 2, padding: '13px 0',
                  background: 'linear-gradient(135deg, #A78BFA 0%, #6366F1 100%)',
                  border: 'none', borderRadius: 16,
                  fontFamily: 'Nunito', fontWeight: 900, fontSize: 15, color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 0 0 #4C1D95, 0 6px 22px rgba(167,139,250,0.42)',
                }}
              >
                See Results! 🎉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Result Screen ────────────────────────────────────────────────────────────

const RESULT_CONFETTI = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: ['#FFD54A','#4FD37A','#6BCBFF','#FF7B7B','#A78BFA','#FFB347','#fff'][i % 7],
  left: (i * 37) % 380 + 10,
  delay: i * 0.06,
  size: 6 + (i % 5) * 3,
  round: i % 3 === 0,
}))

const RESULT_FLOATING_BLOCKS: { val: number; color: BlockColor; top: string; left?: string; right?: string; delay: string; dur: string }[] = [
  { val: 3, color: 'green',  top: '12%', left: '3%',  delay: '0s',    dur: '3.8s' },
  { val: 7, color: 'blue',   top: '9%',  right: '4%', delay: '0.7s',  dur: '4.2s' },
  { val: 1, color: 'coral',  top: '28%', left: '2%',  delay: '1.4s',  dur: '3.5s' },
  { val: 5, color: 'orange', top: '22%', right: '3%', delay: '0.3s',  dur: '4.6s' },
  { val: 2, color: 'yellow', top: '62%', left: '2%',  delay: '1.8s',  dur: '3.9s' },
  { val: 9, color: 'purple', top: '58%', right: '2%', delay: '1.1s',  dur: '4.3s' },
]

function ResultStatCard({ label, value, icon, color, delay = '0s' }: {
  label: string; value: string; icon: React.ReactNode; color: string; delay?: string
}) {
  return (
    <div className="animate-stat-slide" style={{
      background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(14px)',
      borderRadius: 22, padding: '16px 18px',
      display: 'flex', alignItems: 'center', gap: 14,
      border: '1.5px solid rgba(255,255,255,0.7)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      animationDelay: delay,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14, flexShrink: 0,
        background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 12px rgba(0,0,0,0.18)`,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 20, color: '#1E1B4B', lineHeight: 1.1 }}>
          {value}
        </div>
        <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 12, color: 'rgba(76,29,149,0.6)', marginTop: 1 }}>
          {label}
        </div>
      </div>
    </div>
  )
}

function RewardChip({ emoji, label, sublabel, color, delay = '0s', chest = false }: {
  emoji: string; label: string; sublabel: string; color: string; delay?: string; chest?: boolean
}) {
  return (
    <div className="animate-badge-unlock" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      animationDelay: delay,
    }}>
      <div
        className={chest ? 'animate-chest-open' : ''}
        style={{
          width: 62, height: 62, borderRadius: 20,
          background: color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 6px 0 0 rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.10)`,
          fontSize: 28,
        }}
      >
        {emoji}
      </div>
      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 12, color: '#1E1B4B', textAlign: 'center', lineHeight: 1.2 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 10.5, color: 'rgba(76,29,149,0.55)', textAlign: 'center' }}>
        {sublabel}
      </div>
    </div>
  )
}

function ResultScreen({
  data, onPlayAgain, onContinue, onNavSelect,
}: {
  data: ResultData
  onPlayAgain: () => void
  onContinue: () => void
  onNavSelect: (id: string) => void
}) {
  const accuracy = Math.round((data.correct / data.total) * 100)
  const starsRating = accuracy >= 95 ? 3 : accuracy >= 70 ? 2 : 1
  const ratingLabel = starsRating === 3 ? 'Perfect!' : starsRating === 2 ? 'Great Job!' : 'Keep Going!'
  const ratingColor = starsRating === 3 ? '#4FD37A' : starsRating === 2 ? '#A78BFA' : '#FFB347'
  const mins = Math.floor(data.timeSec / 60)
  const secs = data.timeSec % 60
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  const currentXP = 340
  const nextLevelXP = 500
  const newXP = Math.min(currentXP + data.xp, nextLevelXP)
  const barPct = Math.round((newXP / nextLevelXP) * 100)

  const [confettiDone, setConfettiDone] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setConfettiDone(true), 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      background: 'linear-gradient(180deg, #B8D4FF 0%, #C8C0FF 30%, #D9C8FF 58%, #E8D5FF 80%, #F3EEFF 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* ── Background ─────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <CloudBlob w={190} style={{ top: 28, left: -40, opacity: 0.55, animation: 'cloud-drift 11s ease-in-out infinite' }} />
        <CloudBlob w={130} style={{ top: 14, right: -25, opacity: 0.42, transform: 'scaleX(-1)', animation: 'cloud-drift 15s 4s ease-in-out infinite' }} />
        <CloudBlob w={100} style={{ top: 380, left: -10, opacity: 0.28, animation: 'cloud-drift 18s 8s ease-in-out infinite' }} />
        <CloudBlob w={80}  style={{ top: 560, right: -8, opacity: 0.25, transform: 'scaleX(-1)', animation: 'cloud-drift 13s 2s ease-in-out infinite' }} />
        <Sparkle top="8%"    left="14%"   size={9} opacity={0.65} delay="0s"   color="#FFD54A" />
        <Sparkle top="7%"    right="15%"  size={7} opacity={0.5}  delay="0.6s" color="#A78BFA" />
        <Sparkle top="20%"   left="6%"    size={6} opacity={0.4}  delay="1.3s" color="#6BCBFF" />
        <Sparkle top="18%"   right="7%"   size={8} opacity={0.45} delay="0.2s" color="#4FD37A" />
        <Sparkle top="45%"   left="4%"    size={5} opacity={0.32} delay="1.9s" color="#FFB347" />
        <Sparkle top="42%"   right="5%"   size={7} opacity={0.35} delay="0.9s" color="#FF7B7B" />
        <Sparkle bottom="35%" left="8%"   size={6} opacity={0.28} delay="2.4s" color="#FFD54A" />
        <Sparkle bottom="28%" right="9%"  size={5} opacity={0.3}  delay="1.4s" color="#A78BFA" />
        {RESULT_FLOATING_BLOCKS.map((b, i) => (
          <div key={i} className="animate-float-block" style={{
            position: 'absolute', top: b.top, left: b.left, right: b.right,
            animationDelay: b.delay, animationDuration: b.dur, opacity: 0.28,
          }}>
            <NumberBlock value={b.val} color={b.color} size="sm" />
          </div>
        ))}
        <div className="animate-float" style={{ position: 'absolute', top: '35%', left: '5%', opacity: 0.16, animationDuration: '5s', animationDelay: '1s' }}>
          <OperatorBlock op="+" size="sm" />
        </div>
        <div className="animate-float" style={{ position: 'absolute', top: '52%', right: '4%', opacity: 0.14, animationDuration: '6s', animationDelay: '2.5s' }}>
          <OperatorBlock op="×" size="sm" />
        </div>
      </div>

      {/* ── Confetti ───────────────────────────────────────────────── */}
      {!confettiDone && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
          {RESULT_CONFETTI.map(p => (
            <div key={p.id} className="animate-confetti-fly" style={{
              position: 'absolute', bottom: '55%', left: p.left,
              width: p.size, height: p.size,
              borderRadius: p.round ? '50%' : '3px',
              background: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: '1.8s',
            }} />
          ))}
        </div>
      )}

      {/* ── Scrollable content ─────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 90, position: 'relative', zIndex: 1 }}>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div className="animate-result-hero" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '30px 24px 0', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            width: 200, height: 200, borderRadius: '50%',
            background: `radial-gradient(circle, ${ratingColor}28 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div className="animate-mascot-wave">
            <Mascot size={112} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14, marginBottom: 6 }}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="animate-star-award" style={{ animationDelay: `${0.1 + i * 0.13}s` }}>
                <StarIcon size={40} filled={i < starsRating} color="#FFD54A" />
              </div>
            ))}
          </div>
          <div className="animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            <div style={{
              fontFamily: 'Nunito', fontWeight: 900, fontSize: 38, color: ratingColor,
              lineHeight: 1, textAlign: 'center', letterSpacing: '-0.5px',
              filter: `drop-shadow(0 2px 20px ${ratingColor}55)`,
            }}>{ratingLabel}</div>
          </div>
          <div style={{
            fontFamily: 'Nunito', fontWeight: 700, fontSize: 14,
            color: 'rgba(76,29,149,0.7)', marginTop: 6, textAlign: 'center',
          }}>
            You completed <span style={{ fontWeight: 900, color: '#4C1D95' }}>{data.lessonName}</span>!
          </div>
        </div>

        {/* ── XP + Coins pills ──────────────────────────────────────── */}
        <div className="animate-bounce-in" style={{
          display: 'flex', justifyContent: 'center', gap: 12,
          padding: '18px 24px 0', animationDelay: '0.35s',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #A78BFA 0%, #6366F1 100%)',
            borderRadius: 999, padding: '11px 22px',
            boxShadow: '0 4px 0 0 #4C1D95, 0 6px 22px rgba(167,139,250,0.4)',
          }}>
            <LightningIcon size={18} color="#fff" />
            <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 22, color: '#fff' }}>+{data.xp} XP</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #FFD54A 0%, #FFB347 100%)',
            borderRadius: 999, padding: '11px 22px',
            boxShadow: '0 4px 0 0 #C9930D, 0 6px 22px rgba(255,213,74,0.4)',
          }}>
            <CoinIcon size={20} />
            <span style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 22, color: '#7A4F00' }}>+{data.coins}</span>
          </div>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────── */}
        <div style={{ padding: '22px 20px 0' }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#1E1B4B', marginBottom: 12, paddingLeft: 4 }}>
            📊 How did you do?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <ResultStatCard label="Accuracy" value={`${accuracy}%`} delay="0s"
              color="linear-gradient(135deg, #4FD37A 0%, #35B862 100%)"
              icon={<CheckIcon size={20} />} />
            <ResultStatCard label="Time" value={timeStr} delay="0.07s"
              color="linear-gradient(135deg, #6BCBFF 0%, #3BAEE5 100%)"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
            <ResultStatCard label="Correct" value={`${data.correct} / ${data.total}`} delay="0.14s"
              color="linear-gradient(135deg, #A78BFA 0%, #6366F1 100%)"
              icon={<StarIcon size={20} color="#fff" />} />
            <ResultStatCard
              label="Mistakes" value={String(data.mistakes)} delay="0.21s"
              color={data.mistakes === 0 ? 'linear-gradient(135deg, #4FD37A 0%, #35B862 100%)' : 'linear-gradient(135deg, #FF7B7B 0%, #E85A5A 100%)'}
              icon={data.mistakes === 0
                ? <span style={{ fontSize: 20 }}>🌟</span>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>} />
            <div style={{ gridColumn: '1 / -1' }}>
              <ResultStatCard label="Best Combo" value={`${data.combo}× streak`} delay="0.28s"
                color="linear-gradient(135deg, #FFB347 0%, #E8953A 100%)"
                icon={<FireIcon size={20} color="#fff" />} />
            </div>
          </div>
        </div>

        {/* ── Rewards ───────────────────────────────────────────────── */}
        <div style={{ padding: '22px 20px 0' }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#1E1B4B', marginBottom: 14, paddingLeft: 4 }}>
            🎁 Rewards Unlocked!
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(14px)',
            borderRadius: 28, padding: '22px 16px',
            border: '1.5px solid rgba(255,255,255,0.75)',
            boxShadow: '0 6px 28px rgba(0,0,0,0.07)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
              <RewardChip emoji="⭐" label={`${data.stars} Stars`}  sublabel="Collected"           color="#FFF4C8" delay="0.05s" />
              <RewardChip emoji="🪙" label={`${data.coins} Coins`} sublabel="Earned"               color="#FFF3C0" delay="0.18s" />
              {starsRating === 3 && <RewardChip emoji="🏅" label="Accuracy Badge" sublabel="95%+ Perfect" color="#EDE9FE" delay="0.32s" />}
              {data.combo >= 5  && <RewardChip emoji="🔥" label="Combo Badge" sublabel={`${data.combo}× streak`} color="#FFE8D6" delay="0.46s" />}
              <RewardChip emoji="📦" label="Mystery Box"   sublabel="Tap to open!"  color="#DBEAFE" delay="0.6s"  chest />
              {data.mistakes === 0 && <RewardChip emoji="🌟" label="No Mistakes!"  sublabel="Flawless!"      color="#D1FAE5" delay="0.74s" />}
              <RewardChip emoji="🦊" label="Fox Hat"       sublabel="New accessory" color="#FCE7F3" delay="0.88s" />
            </div>
          </div>
        </div>

        {/* ── XP Progress ───────────────────────────────────────────── */}
        <div style={{ padding: '22px 20px 0' }}>
          <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 16, color: '#1E1B4B', marginBottom: 14, paddingLeft: 4 }}>
            ⚡ Progress to Next Level
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.68)', backdropFilter: 'blur(14px)',
            borderRadius: 28, padding: '22px 20px',
            border: '1.5px solid rgba(255,255,255,0.75)',
            boxShadow: '0 6px 28px rgba(0,0,0,0.07)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 15,
                  background: 'linear-gradient(135deg, #A78BFA 0%, #6366F1 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 0 0 #4C1D95',
                  fontFamily: 'Nunito', fontWeight: 900, fontSize: 20, color: '#fff',
                }}>4</div>
                <div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, color: '#1E1B4B' }}>Level 4</div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, color: 'rgba(76,29,149,0.6)' }}>Math Explorer</div>
                </div>
              </div>
              <ArrowRightIcon size={16} color="rgba(167,139,250,0.55)" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: 14, color: '#1E1B4B' }}>Level 5</div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, color: 'rgba(76,29,149,0.6)' }}>Math Wizard</div>
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: 15,
                  background: 'rgba(167,139,250,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px dashed rgba(167,139,250,0.45)',
                  fontFamily: 'Nunito', fontWeight: 900, fontSize: 20, color: 'rgba(99,102,241,0.5)',
                }}>5</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 12, color: 'rgba(76,29,149,0.7)' }}>
                {newXP} XP
                {data.xp > 0 && <span style={{ color: '#A78BFA', marginLeft: 6 }}>+{data.xp} gained!</span>}
              </span>
              <span style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 12, color: 'rgba(76,29,149,0.55)' }}>{nextLevelXP} XP</span>
            </div>
            <div style={{ height: 18, background: 'rgba(167,139,250,0.15)', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
              <div className="animate-xp-bar" style={{
                height: '100%', width: `${barPct}%`,
                background: 'linear-gradient(90deg, #A78BFA 0%, #6BCBFF 50%, #4FD37A 100%)',
                borderRadius: 999, boxShadow: '0 0 14px rgba(167,139,250,0.65)',
                animationDelay: '0.4s', animationDuration: '1.6s', position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: 3, left: 8, right: 8, height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.38)' }} />
              </div>
            </div>
            {barPct >= 65 && (
              <div className="animate-bounce-in" style={{
                marginTop: 14, padding: '10px 14px',
                background: 'linear-gradient(135deg, rgba(255,213,74,0.14) 0%, rgba(255,179,71,0.1) 100%)',
                borderRadius: 14, border: '1px solid rgba(255,213,74,0.4)',
                display: 'flex', alignItems: 'center', gap: 10,
                animationDelay: '1s',
              }}>
                <span style={{ fontSize: 22 }}>🗺️</span>
                <div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: 13, color: '#7A4F00' }}>Almost at Addition Valley!</div>
                  <div style={{ fontFamily: 'Nunito', fontWeight: 700, fontSize: 11, color: 'rgba(122,79,0,0.7)' }}>{nextLevelXP - newXP} XP until the next world unlocks</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Buttons ───────────────────────────────────────────────── */}
        <div style={{ padding: '24px 20px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={onContinue} style={{
            width: '100%', padding: '17px 0',
            background: 'linear-gradient(135deg, #4FD37A 0%, #35B862 100%)',
            border: 'none', borderRadius: 20, cursor: 'pointer',
            fontFamily: 'Nunito', fontWeight: 900, fontSize: 18, color: '#fff',
            boxShadow: '0 6px 0 0 #2A9E50, 0 10px 32px rgba(79,211,122,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>🗺️</span>
            Continue Adventure
            <ArrowRightIcon size={18} color="#fff" />
          </button>
          <button onClick={onPlayAgain} style={{
            width: '100%', padding: '15px 0',
            background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(12px)',
            border: '2px solid rgba(167,139,250,0.45)', borderRadius: 20, cursor: 'pointer',
            fontFamily: 'Nunito', fontWeight: 900, fontSize: 17, color: COLORS.purpleDark,
            boxShadow: '0 4px 0 0 rgba(167,139,250,0.22), 0 6px 20px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>🔄</span>
            Play Again
          </button>
          {data.mistakes > 0 && (
            <button onClick={() => {}} style={{
              width: '100%', padding: '12px 0',
              background: 'transparent',
              border: '1.5px solid rgba(255,123,123,0.4)', borderRadius: 16, cursor: 'pointer',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: 14, color: '#E85A5A',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 15 }}>🔍</span>
              Review Mistakes
            </button>
          )}
        </div>
      </div>

      <BottomNavBar active="learn" onSelect={onNavSelect} />
    </div>
  )
}
