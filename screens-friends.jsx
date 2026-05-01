// screens-friends.jsx — Friends tab (dedicated section), Movie/Rec card, Notifications
// Globals used: MOVIES, FRIENDS, RECOMMENDATIONS, LISTS, NOTIFICATIONS,
// movieById, friendById, recsForMovie, friendsForMovie,
// Avatar, AvatarStack, Poster, PosterBackdrop, Stars, Icon, VisibilityChip,
// TopBar, SectionHeader, FriendRecCard, FriendsShelf, ListCard,
// TAB_BAR_H, TOP_INSET

// ──────────────────────────────────────────────────────
// Friends Tab — dedicated screen
// ──────────────────────────────────────────────────────
function FriendsTab({ nav, tweaks }) {
  const [filter, setFilter] = React.useState('todos');
  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'family', label: 'Familia' },
    { id: 'friends', label: 'Amigos' },
    { id: 'unseen', label: 'No vistos' },
  ];
  const recs = filter === 'unseen' ? RECOMMENDATIONS.slice(0, 5) : RECOMMENDATIONS;

  return (
    <div style={{ paddingBottom: TAB_BAR_H + 16, color: '#fff' }}>
      <div style={{ paddingTop: TOP_INSET, padding: `${TOP_INSET}px 16px 0` }}>
        <div style={{ fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: 36, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em',
                      marginBottom: 6, marginTop: 8 }}>
          Amigos & familia
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 18 }}>
          {RECOMMENDATIONS.length} recomendaciones de {FRIENDS.length} personas
        </div>
      </div>

      {/* People row — horizontal avatars */}
      <div style={{
        display: 'flex', gap: 14, padding: '0 16px 18px', overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        <button style={{
          flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 6, background: 'transparent', border: 0, cursor: 'pointer', color: '#fff',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28,
            border: '1.5px dashed rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)',
          }}>{Icon.plus(24)}</div>
          <span style={{ fontSize: 11 }}>Invitar</span>
        </button>
        {FRIENDS.map((f) => {
          const count = RECOMMENDATIONS.filter((r) => r.friendId === f.id).length;
          return (
            <button key={f.id} style={{
              flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 6, background: 'transparent', border: 0, cursor: 'pointer', color: '#fff',
              maxWidth: 64,
            }}>
              <div style={{ position: 'relative' }}>
                <Avatar friend={f} size={56} />
                {count > 0 && (
                  <div style={{
                    position: 'absolute', bottom: -2, right: -2,
                    minWidth: 20, height: 20, borderRadius: 10, padding: '0 5px',
                    background: '#FFC940', color: '#000', fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 2px #0d0d0d',
                  }}>{count}</div>
                )}
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)',
                             whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                             maxWidth: 64 }}>
                {f.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter chips */}
      <div style={{
        display: 'flex', gap: 8, padding: '0 16px 18px', overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {filters.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            flexShrink: 0, padding: '7px 14px', borderRadius: 999,
            background: filter === f.id ? '#fff' : 'rgba(255,255,255,0.08)',
            color: filter === f.id ? '#000' : 'rgba(255,255,255,0.85)',
            border: 0, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>{f.label}</button>
        ))}
      </div>

      {/* Lists section */}
      <div style={{ marginBottom: 24 }}>
        <SectionHeader
          title="Listas compartidas"
          subtitle="Espacios para descubrir con tus grupos"
          action="Nueva"
          onAction={() => nav('createList')}
        />
        <div style={{ display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {LISTS.map((list) => <ListCard key={list.id} list={list} onClick={() => nav('list', { listId: list.id })} />)}
        </div>
      </div>

      {/* Recommendations feed */}
      <div>
        <SectionHeader title="Últimas recomendaciones" />
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recs.map((r) => (
            <FriendRecCard key={r.id} rec={r} layout="feed"
                           avatarProminence={tweaks.avatarProminence}
                           onOpen={() => nav('movie', { movieId: r.movieId, recId: r.id })} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Movie / Recommendation Detail
// rec view appears INSIDE the movie card (per user choice).
// Variant: 'drawer' (slides up over poster) or 'page' (inline scroll)
// ──────────────────────────────────────────────────────
function MovieScreen({ movieId, initialRecId, nav, tweaks }) {
  const movie = movieById(movieId);
  const recs = recsForMovie(movieId);
  const [openRecId, setOpenRecId] = React.useState(initialRecId || null);
  const openRec = openRecId ? recs.find((r) => r.id === openRecId) : null;

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      {/* Scrolling content */}
      <div style={{ height: '100%', overflowY: 'auto', color: '#fff', paddingBottom: 40 }}>
        {/* Backdrop */}
        <div style={{ position: 'relative' }}>
          <PosterBackdrop movie={movie} height={460}>
            <div style={{
              position: 'absolute', top: TOP_INSET, left: 0, right: 0,
              padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <button onClick={() => nav('back')} style={{
                width: 38, height: 38, borderRadius: 19, border: 0, cursor: 'pointer',
                background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(20px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{Icon.back(20)}</button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  width: 38, height: 38, borderRadius: 19, border: 0, cursor: 'pointer',
                  background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(20px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{Icon.share(18)}</button>
                <button style={{
                  width: 38, height: 38, borderRadius: 19, border: 0, cursor: 'pointer',
                  background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(20px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{Icon.more(20)}</button>
              </div>
            </div>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
                          padding: '0 20px 24px' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em',
                            textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
                {movie.kind === 'series' ? 'Serie' : 'Película'} · {movie.genres[0]}
              </div>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 44, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.025em',
                marginBottom: 10, textWrap: 'balance',
              }}>
                {movie.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                <span>{movie.year}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{movie.runtime}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{movie.rating}</span>
              </div>
            </div>
          </PosterBackdrop>
        </div>

        <div style={{ padding: '20px 20px 0' }}>
          {/* Action row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button style={{
              flex: 1, height: 46, borderRadius: 23, border: 0, cursor: 'pointer',
              background: '#fff', color: '#000', fontSize: 15, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {Icon.play(18)} Reproducir
            </button>
            <button style={{
              width: 46, height: 46, borderRadius: 23, border: 0, cursor: 'pointer',
              background: 'rgba(255,255,255,0.12)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{Icon.bookmark(20)}</button>
            <button onClick={() => nav('writeRec', { movieId })} style={{
              height: 46, borderRadius: 23, border: 0, cursor: 'pointer', padding: '0 16px',
              background: 'rgba(255,201,64,0.18)', color: '#FFC940',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontSize: 13, fontWeight: 600,
            }}>{Icon.edit(16)} Recomendar</button>
          </div>

          {/* Friends-strip — who recommended */}
          {recs.length > 0 && (
            <div style={{
              padding: 16, borderRadius: 16, marginBottom: 22,
              background: 'rgba(255,201,64,0.06)',
              border: '0.5px solid rgba(255,201,64,0.18)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <AvatarStack friendIds={recs.map((r) => r.friendId)} size={32} ringColor="#0d0d0d" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {recs.length} {recs.length === 1 ? 'recomendación' : 'recomendaciones'} de tu gente
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>
                      Promedio {(recs.reduce((s, r) => s + r.rating, 0) / recs.length).toFixed(1)} ★
                    </div>
                  </div>
                </div>
              </div>

              {/* Inline rec cards — tap to expand within this card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {recs.map((rec, i) => {
                  const friend = friendById(rec.friendId);
                  const isOpen = openRecId === rec.id;
                  return (
                    <div key={rec.id} style={{
                      borderTop: i === 0 ? 0 : '0.5px solid rgba(255,255,255,0.08)',
                    }}>
                      <button onClick={() => setOpenRecId(isOpen ? null : rec.id)} style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 0', background: 'transparent', border: 0, cursor: 'pointer',
                        color: '#fff', textAlign: 'left',
                      }}>
                        <Avatar friend={friend} size={40} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <span style={{ fontSize: 13, fontWeight: 600 }}>{friend.name}</span>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>· {friend.relation}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Stars value={rec.rating} size={11} />
                            <span style={{
                              fontSize: 10, padding: '2px 8px', borderRadius: 999,
                              background: 'rgba(255,201,64,0.2)', color: '#FFC940', fontWeight: 600,
                            }}>{rec.tag}</span>
                          </div>
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.4)',
                                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                                      transition: 'transform 0.2s' }}>
                          {Icon.chevron(16)}
                        </div>
                      </button>
                      {/* Inline expanded review (when 'inline' variant) */}
                      {isOpen && tweaks.recVariant === 'inline' && (
                        <div style={{ paddingBottom: 14, paddingLeft: 52 }}>
                          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)',
                                        fontStyle: 'italic', marginBottom: 10 }}>
                            "{rec.text}"
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{rec.date}</span>
                            <button style={{
                              display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px',
                              borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: 0,
                              color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 500, cursor: 'pointer',
                            }}>{Icon.heart(13)} {rec.likes}</button>
                            <button style={{
                              display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px',
                              borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: 0,
                              color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 500, cursor: 'pointer',
                            }}>Responder</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Synopsis */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em',
                          textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
              Sinopsis
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>
              {movie.synopsis}
            </div>
          </div>

          {/* Cast */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em',
                          textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>
              Reparto
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              {movie.cast.join(' · ')}
            </div>
          </div>

          {/* Genres */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {movie.genres.map((g) => (
              <span key={g} style={{
                padding: '6px 12px', borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 500,
              }}>{g}</span>
            ))}
          </div>
        </div>
      </div>

      {/* DRAWER variant — slide up from bottom */}
      {tweaks.recVariant === 'drawer' && openRec && (
        <RecDrawer rec={openRec} onClose={() => setOpenRecId(null)} />
      )}
      {/* PAGE variant — full screen overlay */}
      {tweaks.recVariant === 'page' && openRec && (
        <RecFullPage rec={openRec} onClose={() => setOpenRecId(null)} />
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Drawer variant — slides up over the movie card
// ──────────────────────────────────────────────────────
function RecDrawer({ rec, onClose }) {
  const friend = friendById(rec.friendId);
  const movie = movieById(rec.movieId);
  return (
    <>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)', zIndex: 50, animation: 'fade 0.2s ease',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 51,
        background: 'linear-gradient(180deg, #1a1612 0%, #0d0d0d 100%)',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: '14px 20px 30px', color: '#fff',
        boxShadow: '0 -20px 60px rgba(0,0,0,0.6)',
        animation: 'slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        maxHeight: '70%', overflowY: 'auto',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.25)',
                      margin: '0 auto 18px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <Avatar friend={friend} size={56} ring ringColor={movie.accent} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{friend.name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{friend.relation} · {rec.date}</div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 16, border: 0, cursor: 'pointer',
            background: 'rgba(255,255,255,0.08)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.close(18)}</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Stars value={rec.rating} size={18} />
          <span style={{
            fontSize: 11, padding: '4px 10px', borderRadius: 999,
            background: 'rgba(255,201,64,0.18)', color: '#FFC940', fontWeight: 600,
          }}>{rec.tag}</span>
        </div>
        <div style={{
          padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.04)',
          fontSize: 15, lineHeight: 1.55, marginBottom: 18,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          "{rec.text}"
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{
            flex: 1, height: 42, borderRadius: 21, border: 0, cursor: 'pointer',
            background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>{Icon.heart(15)} Me sirvió ({rec.likes})</button>
          <button style={{
            flex: 1, height: 42, borderRadius: 21, border: 0, cursor: 'pointer',
            background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, fontWeight: 600,
          }}>Responder a {friend.name.split(' ')[0]}</button>
        </div>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────
// Full-page variant — opens as separate screen
// ──────────────────────────────────────────────────────
function RecFullPage({ rec, onClose }) {
  const friend = friendById(rec.friendId);
  const movie = movieById(rec.movieId);
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: '#0d0d0d', color: '#fff', overflowY: 'auto',
      animation: 'slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
    }}>
      <div style={{ position: 'relative' }}>
        <PosterBackdrop movie={movie} height={300}>
          <div style={{
            position: 'absolute', top: TOP_INSET, left: 16, right: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <button onClick={onClose} style={{
              width: 38, height: 38, borderRadius: 19, border: 0, cursor: 'pointer',
              background: 'rgba(0,0,0,0.5)', color: '#fff', backdropFilter: 'blur(20px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{Icon.close(20)}</button>
          </div>
          <div style={{ position: 'absolute', left: 20, right: 20, bottom: 20 }}>
            <Avatar friend={friend} size={68} ring ringColor={movie.accent} />
          </div>
        </PosterBackdrop>
      </div>
      <div style={{ padding: '18px 24px 40px' }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{friend.name}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
          {friend.relation} · recomendó {movie.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <Stars value={rec.rating} size={22} />
          <span style={{
            fontSize: 12, padding: '5px 12px', borderRadius: 999,
            background: 'rgba(255,201,64,0.18)', color: '#FFC940', fontWeight: 600,
          }}>{rec.tag}</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginLeft: 'auto' }}>{rec.date}</span>
        </div>
        <div style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 22, fontWeight: 500, lineHeight: 1.4, fontStyle: 'italic',
          marginBottom: 24, color: 'rgba(255,255,255,0.95)',
        }}>
          "{rec.text}"
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{
            flex: 1, height: 46, borderRadius: 23, border: 0, cursor: 'pointer',
            background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>{Icon.heart(16)} Me sirvió · {rec.likes}</button>
          <button style={{
            flex: 1, height: 46, borderRadius: 23, border: 0, cursor: 'pointer',
            background: '#FFC940', color: '#000', fontSize: 14, fontWeight: 700,
          }}>Responder</button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Notifications screen
// ──────────────────────────────────────────────────────
function InboxScreen({ nav }) {
  return (
    <div style={{ paddingBottom: TAB_BAR_H + 16, color: '#fff' }}>
      <div style={{ padding: `${TOP_INSET}px 20px 0` }}>
        <div style={{ fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: 36, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em',
                      marginBottom: 6, marginTop: 8 }}>
          Avisos
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
          Lo nuevo de tus amigos y familia
        </div>
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NOTIFICATIONS.map((n) => {
          const friend = friendById(n.friendId);
          const movie = n.movieId ? movieById(n.movieId) : null;
          const list = n.listId ? LISTS.find((l) => l.id === n.listId) : null;
          const onClick = () => {
            if (n.movieId) nav('movie', { movieId: n.movieId });
            else if (n.listId) nav('list', { listId: n.listId });
          };
          return (
            <button key={n.id} onClick={onClick} style={{
              display: 'flex', gap: 12, padding: 12, borderRadius: 12,
              background: n.unread ? 'rgba(255,201,64,0.05)' : 'transparent',
              border: 0, color: '#fff', cursor: 'pointer', alignItems: 'center',
              textAlign: 'left',
            }}>
              <div style={{ position: 'relative' }}>
                <Avatar friend={friend} size={44} />
                {n.unread && (
                  <div style={{
                    position: 'absolute', top: 0, right: -2, width: 10, height: 10, borderRadius: 5,
                    background: '#FFC940', boxShadow: '0 0 0 2px #0d0d0d',
                  }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                  <span style={{ fontWeight: 600 }}>{friend.name.split(' ')[0]}</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}> {n.text} </span>
                  <span style={{ fontWeight: 600 }}>{movie?.title || list?.name}</span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{n.time}</div>
              </div>
              {movie && (
                <div style={{
                  width: 36, height: 50, borderRadius: 5,
                  background: `linear-gradient(135deg, ${movie.palette[0]}, ${movie.palette[1]})`,
                  flexShrink: 0,
                }} />
              )}
              {list && (
                <div style={{
                  width: 36, height: 36, borderRadius: 9, background: list.color + '33',
                  border: `1px solid ${list.color}66`, color: list.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{Icon.list(18)}</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, {
  FriendsTab, MovieScreen, RecDrawer, RecFullPage, InboxScreen,
});
