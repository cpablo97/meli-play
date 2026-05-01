// atoms.jsx — Shared visual atoms: Avatar, Poster, Stars, Icons.
// All built with CSS gradients + SVG — no external assets.

// ──────────────────────────────────────────────────────
// Avatar — gradient disc with friend's initial.
// `prominence` controls scale: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
// ──────────────────────────────────────────────────────
function Avatar({ friend, size = 40, ring = false, ringColor = '#0d0d0d', style = {} }) {
  if (!friend) return null;
  const f = friend;
  const bg = `radial-gradient(circle at 30% 25%, oklch(78% 0.18 ${f.hue}) 0%, oklch(55% 0.15 ${f.hue}) 60%, oklch(40% 0.13 ${f.hue}) 100%)`;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 600, fontSize: size * 0.42,
      boxShadow: ring ? `0 0 0 ${Math.max(2, size * 0.06)}px ${ringColor}` : 'none',
      flexShrink: 0, fontFamily: 'Inter, -apple-system, system-ui, sans-serif',
      letterSpacing: '-0.01em',
      ...style,
    }}>
      {f.initial}
    </div>
  );
}

// AvatarStack — overlapping circles
function AvatarStack({ friendIds, max = 4, size = 28, ringColor = '#0d0d0d' }) {
  const ids = friendIds.slice(0, max);
  const overflow = friendIds.length - max;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {ids.map((id, i) => (
        <div key={id} style={{ marginLeft: i === 0 ? 0 : -size * 0.32 }}>
          <Avatar friend={friendById(id)} size={size} ring ringColor={ringColor} />
        </div>
      ))}
      {overflow > 0 && (
        <div style={{
          marginLeft: -size * 0.32, width: size, height: size, borderRadius: '50%',
          background: '#2a2a2a', color: 'rgba(255,255,255,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: size * 0.36, fontWeight: 600,
          boxShadow: `0 0 0 ${Math.max(2, size * 0.06)}px ${ringColor}`,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          +{overflow}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Poster — typographic poster generated from a movie's palette
// Layered gradients give each poster a distinct "vibe".
// ──────────────────────────────────────────────────────
function Poster({ movie, width, height, rounded = 12, showTitle = true, badge = null }) {
  if (!movie) return null;
  const [c1, c2, c3] = movie.palette;
  // Build a textured background per-movie using its palette
  const bg = `
    radial-gradient(120% 80% at 80% 0%, ${c3}55 0%, transparent 50%),
    radial-gradient(100% 100% at 10% 100%, ${c2}88 0%, transparent 60%),
    linear-gradient(160deg, ${c1} 0%, ${c2} 65%, ${c1} 100%)
  `;
  return (
    <div style={{
      width, height, borderRadius: rounded, overflow: 'hidden',
      position: 'relative', background: bg, flexShrink: 0,
      boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 0 0 0.5px rgba(255,255,255,0.08)',
    }}>
      {/* film grain texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.18, mixBlendMode: 'overlay',
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 2px, rgba(0,0,0,0.18) 2px 3px)`,
      }} />
      {/* vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
      }} />
      {/* typographic title */}
      {showTitle && (
        <div style={{
          position: 'absolute', inset: 0,
          padding: width >= 200 ? 18 : width >= 130 ? 12 : 8,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div style={{
            color: '#fff',
            fontFamily: '"Playfair Display", "Bodoni Moda", Georgia, serif',
            fontWeight: 800,
            fontSize: width >= 240 ? 30 : width >= 160 ? 22 : width >= 120 ? 17 : 13,
            lineHeight: 1.0,
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            letterSpacing: '-0.01em',
            textWrap: 'balance',
          }}>
            {movie.title}
          </div>
          {width >= 160 && (
            <div style={{
              color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 6,
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
            }}>
              {movie.year} · {movie.genres[0]}
            </div>
          )}
        </div>
      )}
      {badge && (
        <div style={{ position: 'absolute', top: 8, left: 8 }}>{badge}</div>
      )}
    </div>
  );
}

// PosterBackdrop — wider, more cinematic than a poster
function PosterBackdrop({ movie, height = 220, children }) {
  if (!movie) return null;
  const [c1, c2, c3] = movie.palette;
  const bg = `
    radial-gradient(80% 100% at 80% 30%, ${c3}66 0%, transparent 55%),
    radial-gradient(100% 80% at 20% 90%, ${c2}99 0%, transparent 65%),
    linear-gradient(135deg, ${c1} 0%, ${c2} 100%)
  `;
  return (
    <div style={{
      width: '100%', height, position: 'relative',
      background: bg, overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15, mixBlendMode: 'overlay',
        backgroundImage: `repeating-linear-gradient(135deg, transparent 0 2px, rgba(0,0,0,0.2) 2px 3px)`,
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(13,13,13,0.95) 100%)',
      }} />
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Stars — for ratings
// ──────────────────────────────────────────────────────
function Stars({ value = 5, size = 14, color = '#FFC940', interactive = false, onChange }) {
  return (
    <div style={{ display: 'flex', gap: size * 0.15 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= value;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24"
               onClick={interactive ? () => onChange?.(i) : undefined}
               style={{ cursor: interactive ? 'pointer' : 'default', transition: 'transform 0.15s' }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={filled ? color : 'transparent'}
                  stroke={color}
                  strokeWidth={filled ? 0 : 1.5}
                  strokeLinejoin="round"/>
          </svg>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Icons — outline svg, currentColor stroked
// ──────────────────────────────────────────────────────
const Icon = {
  search: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  home: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z"
            stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  homeFill: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" fill="currentColor"/>
    </svg>
  ),
  friends: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M15 18c0-2 1.3-4 4-4s2 0 2 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  friendsFill: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <circle cx="9" cy="8" r="3.5" fill="currentColor"/>
      <circle cx="17" cy="9" r="2.5" fill="currentColor"/>
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6v1H3v-1zM15 18c0-1.7 1.3-3 4-3 2 0 3 1.3 3 3v1h-7v-1z" fill="currentColor"/>
    </svg>
  ),
  search_bar: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  bell: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 9a6 6 0 0112 0v4l1.5 3H4.5L6 13V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  user: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  back: (s = 24) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  close: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  play: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <path d="M7 5l12 7-12 7V5z" fill="currentColor"/>
    </svg>
  ),
  plus: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  share: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 15V3M12 3l-4 4M12 3l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  heart: (s = 22, filled = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
      <path d="M12 21s-7-4.5-9.5-9.5C0 7 4 3 7.5 3c2 0 3.5 1 4.5 2.5C13 4 14.5 3 16.5 3 20 3 24 7 21.5 11.5 19 16.5 12 21 12 21z"
            stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  bookmark: (s = 20, filled = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
      <path d="M6 3h12v18l-6-4-6 4V3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  chevron: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronDown: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  lock: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  globe: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  list: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  check: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  edit: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 21l4-1 12-12-3-3L4 17l-1 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  more: (s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <circle cx="5" cy="12" r="2" fill="currentColor"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <circle cx="19" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
};

// ──────────────────────────────────────────────────────
// VisibilityChip — for list visibility
// ──────────────────────────────────────────────────────
function VisibilityChip({ visibility, accent = '#FFC940' }) {
  const map = {
    private:  { icon: Icon.lock(13),    label: 'Privada' },
    friends:  { icon: Icon.friends(13), label: 'Amigos' },
    public:   { icon: Icon.globe(13),   label: 'Pública' },
  };
  const v = map[visibility] || map.private;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 9px', borderRadius: 999,
      background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)',
      fontSize: 11, fontWeight: 500, letterSpacing: '0.01em',
    }}>
      <span style={{ display: 'flex' }}>{v.icon}</span>
      {v.label}
    </div>
  );
}

Object.assign(window, {
  Avatar, AvatarStack, Poster, PosterBackdrop, Stars, Icon, VisibilityChip,
});
