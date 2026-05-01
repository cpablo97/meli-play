/**
 * RecommendationCard — ES module version for Storybook / Vite.
 *
 * The CDN version (RecommendationCard.jsx) reads friendId via a global.
 * This version embeds friend data directly in each recommendation so the
 * component is completely self-contained.
 *
 * Recommendation shape:
 *   { id, friend: { name, initial, hue }, rating, tag?, date, text, likes }
 *
 * Props:
 *   recommendations   Recommendation[]
 *   onToggle?         (recId: string, isNowOpen: boolean) => void
 */

import React, { useState } from 'react';

// ── Design tokens ──────────────────────────────────────────
const C = {
  accent:   '#ffc940',
  accentBg: 'rgba(255,201,64,0.2)',
  white:    '#fff',
  d55:      'rgba(255,255,255,0.55)',
  d85:      'rgba(255,255,255,0.85)',
  d45:      'rgba(255,255,255,0.45)',
  d60:      'rgba(255,255,255,0.6)',
  sepCard:  'rgba(255,255,255,0.1)',
  sepRow:   'rgba(255,255,255,0.08)',
  likeBg:   'rgba(255,255,255,0.08)',
};

// ── Avatar ─────────────────────────────────────────────────
function Avatar({ friend, size = 40 }) {
  const bg = `radial-gradient(circle at 30% 25%, oklch(78% 0.18 ${friend.hue}) 0%, oklch(55% 0.15 ${friend.hue}) 60%, oklch(40% 0.13 ${friend.hue}) 100%)`;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 600, fontSize: size * 0.42,
      fontFamily: 'Inter, -apple-system, system-ui, sans-serif',
      letterSpacing: '-0.01em',
    }}>
      {friend.initial}
    </div>
  );
}

// ── Stars ──────────────────────────────────────────────────
function Stars({ value = 5, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: size * 0.15 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i <= value ? C.accent : 'transparent'}
            stroke={C.accent}
            strokeWidth={i <= value ? 0 : 1.5}
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

// ── Material Symbol icon ───────────────────────────────────
// Font is injected via .storybook/preview-head.html
function MSIcon({ name, size = 20, fill = 0, color }) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily:            '"Material Symbols Rounded"',
        fontSize:              size,
        lineHeight:            1,
        fontWeight:            400,
        fontStyle:             'normal',
        letterSpacing:         'normal',
        textTransform:         'none',
        display:               'inline-block',
        userSelect:            'none',
        whiteSpace:            'nowrap',
        fontVariationSettings: `'FILL' ${fill},'wght' 400,'GRAD' 0,'opsz' ${size}`,
        color:                 color || 'currentColor',
        flexShrink:            0,
      }}
    >
      {name}
    </span>
  );
}

// ── Single recommendation row ──────────────────────────────
function RecRow({ rec, isOpen, onToggle, isFirst }) {
  const { friend } = rec;
  return (
    <div
      style={{
        borderTop:  isFirst ? 'none' : `0.5px solid ${C.sepRow}`,
        paddingTop: isFirst ? 0 : 12,
      }}
    >
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? `Ocultar reseña de ${friend.name}` : `Ver reseña de ${friend.name}`}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: 0, padding: 0,
          cursor: 'pointer', color: C.white, textAlign: 'left',
        }}
      >
        <Avatar friend={friend} size={40} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: C.white }}>
            {friend.name}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Stars value={rec.rating} size={11} />
            {rec.tag && (
              <span style={{
                fontSize: 10, fontWeight: 600, color: C.accent,
                background: C.accentBg, padding: '3px 10px', borderRadius: 999,
                whiteSpace: 'nowrap',
              }}>
                {rec.tag}
              </span>
            )}
          </div>
        </div>

        {/* keyboard_arrow_right / keyboard_arrow_down */}
        <div style={{
          flexShrink: 0, width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: C.d60,
        }}>
          <MSIcon name={isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} size={20} />
        </div>
      </button>

      {/* Expandable review — ease-out 150 ms */}
      <div
        aria-hidden={!isOpen}
        style={{
          overflow:   'hidden',
          maxHeight:  isOpen ? 600 : 0,
          opacity:    isOpen ? 1 : 0,
          transition: 'max-height 0.15s ease-out, opacity 0.15s ease-out',
        }}
      >
        <div style={{ paddingLeft: 48, paddingTop: 12 }}>
          <p style={{
            margin: '0 0 19px',
            fontSize: 12, lineHeight: 1.5, fontStyle: 'italic',
            color: C.d85,
          }}>
            "{rec.text}"
          </p>

          {/* Date + likes */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: 8,
          }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.d45 }}>
              {rec.date}
            </span>
            <button
              tabIndex={isOpen ? 0 : -1}
              aria-label={`${rec.likes} personas encontraron útil esta reseña`}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 8px', borderRadius: 30,
                background: C.likeBg, border: 0, cursor: 'pointer',
              }}
            >
              <MSIcon name="favorite" size={20} fill={1} color="#e57373" />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#e5e5e5', lineHeight: 1 }}>
                {rec.likes}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: 4 }} />
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────
export function RecommendationCard({ recommendations = [], onToggle }) {
  const [openIds, setOpenIds] = useState(new Set());

  if (!recommendations.length) return null;

  const avg = (
    recommendations.reduce((s, r) => s + r.rating, 0) / recommendations.length
  ).toFixed(1);

  const toggle = (recId) => {
    const wasOpen = openIds.has(recId);
    setOpenIds((prev) => {
      const next = new Set(prev);
      wasOpen ? next.delete(recId) : next.add(recId);
      return next;
    });
    onToggle?.(recId, !wasOpen);
  };

  return (
    <div
      role="region"
      aria-label="Recomendaciones de amigos"
      style={{
        background:   'rgba(255,201,64,0.06)',
        border:       '0.5px solid rgba(255,201,64,0.18)',
        borderRadius: 16,
        padding:      16,
        width:        '100%',
        boxSizing:    'border-box',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 10 }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: C.white }}>
          {recommendations.length === 1
            ? '1 recomendación de tu gente'
            : `${recommendations.length} recomendaciones de tu gente`}
        </p>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 500, color: C.d55 }}>
          Promedio {avg} ★
        </p>
      </div>

      {/* Hairline separator */}
      <div aria-hidden="true" style={{ height: 0.5, background: C.sepCard, marginBottom: 10 }} />

      {/* Rows */}
      {recommendations.map((rec, i) => (
        <RecRow
          key={rec.id}
          rec={rec}
          isOpen={openIds.has(rec.id)}
          onToggle={() => toggle(rec.id)}
          isFirst={i === 0}
        />
      ))}
    </div>
  );
}

export default RecommendationCard;
