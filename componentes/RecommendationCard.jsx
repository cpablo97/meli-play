// componentes/RecommendationCard.jsx
// Matches Figma "FriendsStrip" — Mercado Play recommendation card
//
// Props:
//   recommendations  Array<{ id, friendId, rating, tag, date, text, likes }>
//   onToggle?        (recId: string, isNowOpen: boolean) => void
//
// Globals required (loaded before this file):
//   React, Avatar, Stars, friendById

(function () {

  // ── Material Symbols Rounded — injected once ────────────
  if (!document.querySelector('link[href*="Material+Symbols+Rounded"]')) {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    document.head.appendChild(link);
  }

  // ── Focus rings for keyboard navigation ─────────────────
  if (!document.getElementById('rec-card-styles')) {
    const s = document.createElement('style');
    s.id = 'rec-card-styles';
    s.textContent = [
      '.rc-toggle:focus-visible{outline:2px solid rgba(255,201,64,0.8);outline-offset:3px;border-radius:8px;}',
      '.rc-like:focus-visible{outline:2px solid rgba(255,201,64,0.8);outline-offset:2px;border-radius:30px;}',
    ].join('');
    document.head.appendChild(s);
  }

  // ── Design tokens ────────────────────────────────────────
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

  // ── Material Symbol span ─────────────────────────────────
  // Renders a single ligature from the Rounded variable font.
  // `fill` 0 = outline, 1 = filled.
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

  // ── Individual recommendation row ────────────────────────
  // The toggle button is always visible.
  // The review block animates in/out with ease-out 150 ms.
  function RecRow({ rec, friend, isOpen, onToggle, isFirst }) {
    return (
      <div
        style={{
          borderTop:  isFirst ? 'none' : `0.5px solid ${C.sepRow}`,
          paddingTop: isFirst ? 0 : 12,
        }}
      >
        {/* ── Header row (avatar / name / stars / tag / chevron) ── */}
        <button
          className="rc-toggle"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={
            isOpen
              ? `Ocultar reseña de ${friend.name}`
              : `Ver reseña de ${friend.name}`
          }
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

          {/* keyboard_arrow_right (closed) / keyboard_arrow_down (open) */}
          <div style={{
            flexShrink: 0, width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: C.d60,
          }}>
            <MSIcon
              name={isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
              size={20}
            />
          </div>
        </button>

        {/* ── Expandable review block — ease-out 150 ms ── */}
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
              fontSize: 12, lineHeight: 1.5,
              fontStyle: 'italic', color: C.d85,
            }}>
              "{rec.text}"
            </p>

            {/* Date + likes pill */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: 8,
            }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: C.d45 }}>
                {rec.date}
              </span>
              <button
                className="rc-like"
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

        {/* Spacer so the last row has breathing room above the card's bottom padding */}
        <div style={{ height: 4 }} />
      </div>
    );
  }

  // ── Main card ────────────────────────────────────────────
  function RecommendationCard({ recommendations = [], onToggle }) {
    const [openIds, setOpenIds] = React.useState(new Set());

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
        {/* Card header */}
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

        {/* Hairline separator between header and rows */}
        <div aria-hidden="true" style={{ height: 0.5, background: C.sepCard, marginBottom: 10 }} />

        {/* Recommendation rows */}
        {recommendations.map((rec, i) => {
          const friend = friendById(rec.friendId);
          if (!friend) return null;
          return (
            <RecRow
              key={rec.id}
              rec={rec}
              friend={friend}
              isOpen={openIds.has(rec.id)}
              onToggle={() => toggle(rec.id)}
              isFirst={i === 0}
            />
          );
        })}
      </div>
    );
  }

  Object.assign(window, { RecommendationCard });
})();
