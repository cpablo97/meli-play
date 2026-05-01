// screens-home.jsx — Home, Friends tab, Movie/Recommendation card
// Uses globals: MOVIES, FRIENDS, RECOMMENDATIONS, LISTS, NOTIFICATIONS,
// movieById, friendById, recsForMovie, friendsForMovie,
// Avatar, AvatarStack, Poster, PosterBackdrop, Stars, Icon, VisibilityChip

const TAB_BAR_H = 78;
const TOP_INSET = 54; // status bar + dynamic island

// ──────────────────────────────────────────────────────
// Top app bar — small, sticky, transparent over content
// ──────────────────────────────────────────────────────
function TopBar({ title, onBack, right, transparent = false }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 30,
      paddingTop: TOP_INSET, paddingBottom: 10,
      paddingLeft: 16, paddingRight: 16,
      display: 'flex', alignItems: 'center', gap: 12,
      background: transparent ? 'transparent' : 'rgba(13,13,13,0.85)',
      backdropFilter: transparent ? 'none' : 'blur(20px)',
      WebkitBackdropFilter: transparent ? 'none' : 'blur(20px)',
      color: '#fff',
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 18, border: 0,
          background: 'rgba(255,255,255,0.12)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', backdropFilter: 'blur(20px)',
        }}>{Icon.back(20)}</button>
      )}
      {title && <div style={{ flex: 1, fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>}
      {!title && <div style={{ flex: 1 }} />}
      {right}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Tab Bar — Home / Friends / Search / Notifications / Me
// ──────────────────────────────────────────────────────
function TabBar({ active, onChange, unread = 0 }) {
  const tabs = [
    { id: 'home',    label: 'Inicio',    on: Icon.homeFill(24),    off: Icon.home(24) },
    { id: 'friends', label: 'Amigos',    on: Icon.friendsFill(24), off: Icon.friends(24) },
    { id: 'search',  label: 'Buscar',    on: Icon.search_bar(24),  off: Icon.search_bar(24) },
    { id: 'inbox',   label: 'Avisos',    on: Icon.bell(24),        off: Icon.bell(24), badge: unread },
    { id: 'me',      label: 'Tú',        on: Icon.user(24),        off: Icon.user(24) },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: TAB_BAR_H, paddingBottom: 22, paddingTop: 8,
      background: 'linear-gradient(to top, #0a0a0a 70%, rgba(10,10,10,0.4) 100%)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      borderTop: '0.5px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 40,
    }}>
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
            position: 'relative',
          }}>
            <div style={{ position: 'relative' }}>
              {isActive ? t.on : t.off}
              {t.badge ? (
                <div style={{
                  position: 'absolute', top: -2, right: -4,
                  minWidth: 16, height: 16, borderRadius: 8, padding: '0 4px',
                  background: '#FF3B30', color: '#fff',
                  fontSize: 10, fontWeight: 700, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 0 2px #0a0a0a',
                }}>{t.badge}</div>
              ) : null}
            </div>
            <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.01em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// FriendRecCard — used in carousel, grid, feed variants
// ──────────────────────────────────────────────────────
function FriendRecCard({ rec, onOpen, layout = 'carousel', avatarProminence = 'medium' }) {
  const movie = movieById(rec.movieId);
  const friend = friendById(rec.friendId);
  const avSize = { subtle: 28, medium: 36, prominent: 48 }[avatarProminence] || 36;

  if (layout === 'grid') {
    return (
      <button onClick={onOpen} style={{
        display: 'block', width: '100%', textAlign: 'left',
        background: 'transparent', border: 0, padding: 0, cursor: 'pointer', color: '#fff',
      }}>
        <div style={{ position: 'relative' }}>
          <Poster movie={movie} width="100%" height={210} rounded={14} />
          <div style={{ position: 'absolute', top: 8, left: 8 }}>
            <Avatar friend={friend} size={avSize - 8} ring ringColor="rgba(0,0,0,0.4)" />
          </div>
          <div style={{
            position: 'absolute', top: 8, right: 8,
            display: 'flex', alignItems: 'center', gap: 3,
            padding: '4px 7px', borderRadius: 999,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          }}>
            <Stars value={rec.rating} size={10} />
          </div>
        </div>
        <div style={{ paddingTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{movie.title}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
            {friend.name.split(' ')[0]} · {rec.tag}
          </div>
        </div>
      </button>
    );
  }

  if (layout === 'feed') {
    return (
      <button onClick={onOpen} style={{
        display: 'flex', width: '100%', gap: 12, padding: 12, textAlign: 'left',
        background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.06)',
        borderRadius: 14, cursor: 'pointer', color: '#fff', alignItems: 'flex-start',
      }}>
        <Poster movie={movie} width={90} height={130} rounded={8} showTitle={false} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Avatar friend={friend} size={avSize - 10} />
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>{friend.name.split(' ')[0]}</span>
              <span> recomendó</span>
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.15, marginBottom: 4, fontFamily: '"Playfair Display", Georgia, serif' }}>
            {movie.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Stars value={rec.rating} size={11} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{rec.date}</span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            "{rec.text}"
          </div>
        </div>
      </button>
    );
  }

  // 'carousel' default — vertical poster card
  return (
    <button onClick={onOpen} style={{
      flexShrink: 0, width: 152, background: 'transparent', border: 0, padding: 0,
      textAlign: 'left', cursor: 'pointer', color: '#fff',
    }}>
      <div style={{ position: 'relative' }}>
        <Poster movie={movie} width={152} height={216} rounded={12} />
        <div style={{
          position: 'absolute', bottom: 8, left: 8,
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 8px 4px 4px', borderRadius: 999,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        }}>
          <Avatar friend={friend} size={avSize - 16} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.95)', fontWeight: 600, paddingRight: 2 }}>
            {friend.name.split(' ')[0]}
          </span>
        </div>
      </div>
      <div style={{ paddingTop: 8, paddingLeft: 2, paddingRight: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
          <Stars value={rec.rating} size={10} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{movie.title}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {rec.tag}
        </div>
      </div>
    </button>
  );
}

// ──────────────────────────────────────────────────────
// Section Title (deck rhythm)
// ──────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, action, onAction }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '0 16px', marginBottom: 14, color: '#fff', gap: 12,
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
            {subtitle}
          </div>
        )}
      </div>
      {action && (
        <button onClick={onAction} style={{
          background: 'transparent', border: 0, color: 'rgba(255,255,255,0.7)',
          fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 2,
          cursor: 'pointer', padding: 0, flexShrink: 0,
        }}>
          {action} {Icon.chevron(14)}
        </button>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Home Screen
// ──────────────────────────────────────────────────────
function HomeScreen({ nav, tweaks }) {
  // Order: hero rec + "from your friends" shelf + Continue + popular shelf
  const heroRec = RECOMMENDATIONS[0];
  const heroMovie = movieById(heroRec.movieId);
  const heroFriend = friendById(heroRec.friendId);
  const friendRecs = RECOMMENDATIONS.slice(1, 7);

  return (
    <div style={{ paddingBottom: TAB_BAR_H + 16 }}>
      {/* Hero — featured friend recommendation */}
      <div style={{ position: 'relative' }}>
        <PosterBackdrop movie={heroMovie} height={520}>
          <div style={{
            position: 'absolute', top: TOP_INSET, left: 0, right: 0,
            padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 12px 6px 6px', borderRadius: 999,
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFC940, #FF8A3D)',
                color: '#000', fontWeight: 700, fontSize: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>T</div>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>Hola, Tomás</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => nav('inbox')} style={{
                width: 38, height: 38, borderRadius: 19, border: 0, cursor: 'pointer',
                background: 'rgba(0,0,0,0.4)', color: '#fff',
                backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {Icon.bell(20)}
                <div style={{
                  position: 'absolute', top: 7, right: 7, width: 8, height: 8, borderRadius: 4,
                  background: '#FF3B30', boxShadow: '0 0 0 2px rgba(0,0,0,0.4)',
                }} />
              </button>
              <button onClick={() => nav('search')} style={{
                width: 38, height: 38, borderRadius: 19, border: 0, cursor: 'pointer',
                background: 'rgba(0,0,0,0.4)', color: '#fff',
                backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{Icon.search(18)}</button>
            </div>
          </div>
          {/* Hero meta at bottom */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: '0 20px 28px', color: '#fff',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 12px 5px 5px', borderRadius: 999, marginBottom: 14,
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(255,255,255,0.18)',
            }}>
              <Avatar friend={heroFriend} size={22} />
              <span style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' }}>
                <span style={{ opacity: 0.7 }}>Recomendado por </span>
                {heroFriend.name.split(' ')[0]}
              </span>
            </div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 38, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.02em',
              marginBottom: 14, textWrap: 'balance',
            }}>
              {heroMovie.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, fontSize: 12, color: 'rgba(255,255,255,0.75)', flexWrap: 'wrap' }}>
              <span>{heroMovie.year}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{heroMovie.runtime}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{heroMovie.rating}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <Stars value={heroRec.rating} size={11} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => nav('movie', { movieId: heroMovie.id, recId: heroRec.id })}
                style={{
                  flex: 1, height: 46, borderRadius: 23, border: 0, cursor: 'pointer',
                  background: '#fff', color: '#000', fontSize: 15, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                {Icon.play(18)} Ver ahora
              </button>
              <button onClick={() => nav('movie', { movieId: heroMovie.id, recId: heroRec.id })}
                style={{
                  width: 46, height: 46, borderRadius: 23, border: 0, cursor: 'pointer',
                  background: 'rgba(255,255,255,0.18)', color: '#fff',
                  backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                {Icon.bookmark(20)}
              </button>
              <button onClick={() => nav('movie', { movieId: heroMovie.id, recId: heroRec.id })}
                style={{
                  width: 46, height: 46, borderRadius: 23, border: 0, cursor: 'pointer',
                  background: 'rgba(255,255,255,0.18)', color: '#fff',
                  backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                {Icon.plus(22)}
              </button>
            </div>
          </div>
        </PosterBackdrop>
      </div>

      {/* Friends shelf — variant by tweak */}
      <div style={{ marginTop: 28 }}>
        <SectionHeader
          title="Lo que ven tus amigos"
          subtitle={`${FRIENDS.length} personas en tu círculo`}
          action="Ver todo"
          onAction={() => nav('friends')}
        />
        <FriendsShelf recs={friendRecs} layout={tweaks.friendsLayout} avatarProminence={tweaks.avatarProminence} nav={nav} />
      </div>

      {/* Lists */}
      <div style={{ marginTop: 32 }}>
        <SectionHeader
          title="Tus listas"
          action="Nueva"
          onAction={() => nav('createList')}
        />
        <div style={{
          display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {LISTS.map((list) => <ListCard key={list.id} list={list} onClick={() => nav('list', { listId: list.id })} />)}
          <button onClick={() => nav('createList')} style={{
            flexShrink: 0, width: 200, height: 130, borderRadius: 14,
            border: '1.5px dashed rgba(255,255,255,0.2)',
            background: 'transparent', color: 'rgba(255,255,255,0.6)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer', fontSize: 13, fontWeight: 500,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{Icon.plus(20)}</div>
            Crear lista
          </button>
        </div>
      </div>

      {/* Continue watching */}
      <div style={{ marginTop: 32 }}>
        <SectionHeader title="Sigue viendo" />
        <div style={{ display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[MOVIES[5], MOVIES[7], MOVIES[10]].map((m) => (
            <div key={m.id} style={{ flexShrink: 0, width: 220, cursor: 'pointer' }}
                 onClick={() => nav('movie', { movieId: m.id })}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 220, height: 124, borderRadius: 10,
                  background: `linear-gradient(135deg, ${m.palette[0]} 0%, ${m.palette[1]} 100%)`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle at 70% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', left: 14, bottom: 14, color: '#fff',
                                fontFamily: '"Playfair Display", Georgia, serif',
                                fontSize: 18, fontWeight: 700 }}>{m.title}</div>
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'rgba(255,255,255,0.15)' }}>
                  <div style={{ width: `${30 + Math.random() * 50}%`, height: '100%', background: '#FFC940' }} />
                </div>
              </div>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginTop: 8 }}>{m.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 2 }}>
                Quedan 47 min
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// FriendsShelf — wraps the layout choice
function FriendsShelf({ recs, layout, avatarProminence, nav }) {
  if (layout === 'grid') {
    return (
      <div style={{
        padding: '0 16px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
      }}>
        {recs.slice(0, 4).map((r) => (
          <FriendRecCard key={r.id} rec={r} layout="grid" avatarProminence={avatarProminence}
                         onOpen={() => nav('movie', { movieId: r.movieId, recId: r.id })} />
        ))}
      </div>
    );
  }
  if (layout === 'feed') {
    return (
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recs.slice(0, 4).map((r) => (
          <FriendRecCard key={r.id} rec={r} layout="feed" avatarProminence={avatarProminence}
                         onOpen={() => nav('movie', { movieId: r.movieId, recId: r.id })} />
        ))}
      </div>
    );
  }
  return (
    <div style={{
      display: 'flex', gap: 14, padding: '0 16px', overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      {recs.map((r) => (
        <FriendRecCard key={r.id} rec={r} layout="carousel" avatarProminence={avatarProminence}
                       onOpen={() => nav('movie', { movieId: r.movieId, recId: r.id })} />
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// List card (small, on home shelf)
// ──────────────────────────────────────────────────────
function ListCard({ list, onClick }) {
  const movies = list.movieIds.slice(0, 3).map(movieById);
  return (
    <button onClick={onClick} style={{
      flexShrink: 0, width: 220, padding: 14, borderRadius: 14,
      background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.08)',
      cursor: 'pointer', textAlign: 'left', color: '#fff',
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {movies.map((m, i) => (
          <div key={m.id} style={{
            width: 56, height: 76, borderRadius: 5,
            background: `linear-gradient(135deg, ${m.palette[0]}, ${m.palette[1]})`,
            transform: `translateY(${i * -2}px)`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          }} />
        ))}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.2 }}>{list.name}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <AvatarStack friendIds={list.members} size={20} ringColor="#1a1a1a" />
        <VisibilityChip visibility={list.visibility} />
      </div>
    </button>
  );
}

Object.assign(window, {
  TopBar, TabBar, FriendRecCard, SectionHeader, HomeScreen, FriendsShelf, ListCard,
  TAB_BAR_H, TOP_INSET,
});
