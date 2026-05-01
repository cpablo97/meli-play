// screens-lists.jsx — Create List flow, List detail, Write Recommendation
// Globals: MOVIES, FRIENDS, LISTS, movieById, friendById, recsForMovie,
// Avatar, AvatarStack, Poster, Stars, Icon, VisibilityChip, TopBar, SectionHeader,
// TAB_BAR_H, TOP_INSET

// ──────────────────────────────────────────────────────
// Create List — multi-step (Name → Visibility → Invite → Confirm)
// ──────────────────────────────────────────────────────
function CreateListScreen({ nav }) {
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [visibility, setVisibility] = React.useState('friends');
  const [search, setSearch] = React.useState('');
  const [invited, setInvited] = React.useState([]);
  const [color, setColor] = React.useState('#FFC940');

  const steps = ['Información', 'Privacidad', 'Invitar', 'Listo'];

  const toggleInvite = (id) => {
    setInvited((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const filteredFriends = FRIENDS.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) || search === ''
  );

  const canNext =
    (step === 0 && name.trim().length > 0) ||
    (step === 1) ||
    (step === 2) ||
    (step === 3);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column',
                  color: '#fff', background: '#0d0d0d' }}>
      {/* Header w/ progress */}
      <div style={{ padding: `${TOP_INSET}px 16px 16px`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <button onClick={() => step === 0 ? nav('back') : setStep(step - 1)} style={{
            width: 36, height: 36, borderRadius: 18, border: 0, cursor: 'pointer',
            background: 'rgba(255,255,255,0.08)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{Icon.back(20)}</button>
          <div style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
            Paso {step + 1} de {steps.length} · {steps[step]}
          </div>
          <button onClick={() => nav('back')} style={{
            background: 'transparent', border: 0, color: 'rgba(255,255,255,0.55)',
            fontSize: 13, cursor: 'pointer', fontWeight: 500,
          }}>Cancelar</button>
        </div>
        {/* progress bar */}
        <div style={{ display: 'flex', gap: 4 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= step ? '#FFC940' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 24px' }}>
        {step === 0 && (
          <div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 30, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em',
              marginTop: 12, marginBottom: 8,
            }}>
              Empieza una lista
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.5 }}>
              Las listas son espacios donde tú y tus amigos guardan películas y se recomiendan unos a otros.
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
                              letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
                Nombre de la lista
              </label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder="ej: Cine en familia"
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: 16, fontWeight: 500, outline: 'none',
                  fontFamily: 'inherit', boxSizing: 'border-box',
                }} />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
                              letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>
                Descripción
              </label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="¿Qué van a guardar acá?"
                rows={3}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: 14, outline: 'none', resize: 'none',
                  fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.5,
                }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
                              letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>
                Color
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                {['#FFC940', '#FF8A3D', '#FF5470', '#A363D9', '#3DA9FF', '#3AC07F'].map((c) => (
                  <button key={c} onClick={() => setColor(c)} style={{
                    width: 36, height: 36, borderRadius: 18, border: 0,
                    background: c, cursor: 'pointer',
                    boxShadow: color === c ? `0 0 0 3px #0d0d0d, 0 0 0 5px ${c}` : 'none',
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 30, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em',
              marginTop: 12, marginBottom: 8,
            }}>¿Quién puede verla?</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 28, lineHeight: 1.5 }}>
              Podrás cambiarlo después en cualquier momento.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { id: 'private', icon: Icon.lock(22), title: 'Privada', desc: 'Solo tú y las personas que invites.' },
                { id: 'friends', icon: Icon.friends(22), title: 'Amigos', desc: 'Tu círculo en Meli Play puede verla.' },
                { id: 'public',  icon: Icon.globe(22),  title: 'Pública', desc: 'Cualquier usuario puede encontrarla.' },
              ].map((opt) => {
                const active = visibility === opt.id;
                return (
                  <button key={opt.id} onClick={() => setVisibility(opt.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 14,
                    background: active ? 'rgba(255,201,64,0.1)' : 'rgba(255,255,255,0.04)',
                    border: active ? '1px solid #FFC940' : '0.5px solid rgba(255,255,255,0.08)',
                    color: '#fff', cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 22, flexShrink: 0,
                      background: active ? 'rgba(255,201,64,0.18)' : 'rgba(255,255,255,0.06)',
                      color: active ? '#FFC940' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{opt.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{opt.title}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{opt.desc}</div>
                    </div>
                    {active && (
                      <div style={{
                        width: 22, height: 22, borderRadius: 11, background: '#FFC940', color: '#000',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{Icon.check(14)}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 30, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em',
              marginTop: 12, marginBottom: 8,
            }}>Invita a tu gente</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 22, lineHeight: 1.5 }}>
              Busca por nombre o usuario. Solo cuentas activas en Meli Play.
            </div>
            <div style={{ position: 'relative', marginBottom: 18 }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                            color: 'rgba(255,255,255,0.45)' }}>{Icon.search(18)}</div>
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar usuario o email"
                style={{
                  width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)',
                  color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }} />
            </div>
            {invited.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {invited.map((id) => {
                  const f = friendById(id);
                  return (
                    <div key={id} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '4px 10px 4px 4px', borderRadius: 999,
                      background: 'rgba(255,201,64,0.18)', color: '#FFC940',
                      fontSize: 12, fontWeight: 600,
                    }}>
                      <Avatar friend={f} size={22} />
                      {f.name.split(' ')[0]}
                      <button onClick={() => toggleInvite(id)} style={{
                        background: 'transparent', border: 0, color: '#FFC940',
                        cursor: 'pointer', display: 'flex', padding: 0, marginLeft: 2,
                      }}>{Icon.close(14)}</button>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600,
                          letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              Sugeridos
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredFriends.map((f, i) => {
                const checked = invited.includes(f.id);
                return (
                  <button key={f.id} onClick={() => toggleInvite(f.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
                    background: 'transparent', border: 0, color: '#fff', cursor: 'pointer',
                    textAlign: 'left', borderTop: i === 0 ? 0 : '0.5px solid rgba(255,255,255,0.06)',
                  }}>
                    <Avatar friend={f} size={42} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                        @{f.id} · {f.relation}
                      </div>
                    </div>
                    <div style={{
                      width: 26, height: 26, borderRadius: 13,
                      background: checked ? '#FFC940' : 'transparent',
                      border: checked ? 0 : '1.5px solid rgba(255,255,255,0.25)',
                      color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{checked && Icon.check(14)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 30 }}>
            <div style={{
              width: 86, height: 86, borderRadius: 43, background: color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000',
              marginBottom: 24, boxShadow: `0 0 60px ${color}66`,
            }}>{Icon.check(40)}</div>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 28, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
              marginBottom: 10,
            }}>Tu lista está lista</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 280, lineHeight: 1.5, marginBottom: 32 }}>
              Hemos enviado invitaciones a {invited.length} {invited.length === 1 ? 'persona' : 'personas'}. Empieza a agregar películas.
            </div>
            <div style={{ width: '100%', padding: 18, borderRadius: 14,
                          background: 'rgba(255,255,255,0.04)',
                          border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 9, background: color + '33',
                  border: `1px solid ${color}66`, color: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{Icon.list(20)}</div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{name || 'Mi lista'}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                    {invited.length + 1} {invited.length === 0 ? 'miembro' : 'miembros'}
                  </div>
                </div>
                <VisibilityChip visibility={visibility} />
              </div>
              {invited.length > 0 && (
                <AvatarStack friendIds={invited} size={26} max={6} ringColor="rgba(13,13,13,1)" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* footer CTA */}
      <div style={{ padding: '12px 20px 30px',
                    borderTop: '0.5px solid rgba(255,255,255,0.06)',
                    background: 'rgba(13,13,13,0.95)', backdropFilter: 'blur(20px)' }}>
        {step < 3 ? (
          <button disabled={!canNext} onClick={() => setStep(step + 1)} style={{
            width: '100%', height: 50, borderRadius: 25, border: 0,
            background: canNext ? '#FFC940' : 'rgba(255,255,255,0.1)',
            color: canNext ? '#000' : 'rgba(255,255,255,0.3)',
            fontSize: 15, fontWeight: 700, cursor: canNext ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
          }}>
            {step === 2 ? (invited.length === 0 ? 'Saltar y crear' : `Invitar a ${invited.length} y crear`) : 'Continuar'}
          </button>
        ) : (
          <button onClick={() => nav('home')} style={{
            width: '100%', height: 50, borderRadius: 25, border: 0,
            background: '#FFC940', color: '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          }}>Ver mi lista</button>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// List Detail
// ──────────────────────────────────────────────────────
function ListDetailScreen({ listId, nav }) {
  const list = LISTS.find((l) => l.id === listId);
  if (!list) return null;
  const movies = list.movieIds.map(movieById);

  return (
    <div style={{ height: '100%', overflowY: 'auto', color: '#fff', background: '#0d0d0d',
                  paddingBottom: 40 }}>
      {/* Hero */}
      <div style={{
        position: 'relative', height: 320,
        background: `linear-gradient(180deg, ${list.color}22 0%, ${list.color}08 50%, #0d0d0d 100%)`,
        borderBottom: `1px solid ${list.color}22`,
      }}>
        <div style={{
          position: 'absolute', top: TOP_INSET, left: 16, right: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
        {/* Stacked posters preview */}
        <div style={{ position: 'absolute', top: TOP_INSET + 60, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          {movies.slice(0, 3).map((m, i) => (
            <div key={m.id} style={{
              width: 90, height: 130, borderRadius: 8,
              background: `linear-gradient(135deg, ${m.palette[0]}, ${m.palette[1]})`,
              transform: `rotate(${(i - 1) * 8}deg) translateY(${Math.abs(i - 1) * 6}px)`,
              marginLeft: i === 0 ? 0 : -20, zIndex: i === 1 ? 3 : 1,
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              border: '0.5px solid rgba(255,255,255,0.1)',
            }} />
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <VisibilityChip visibility={list.visibility} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
            · creada por Tomás
          </span>
        </div>
        <div style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 32, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em',
          marginBottom: 8,
        }}>{list.name}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, marginBottom: 18 }}>
          {list.description}
        </div>

        {/* Members */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 12,
          background: 'rgba(255,255,255,0.04)', marginBottom: 22,
        }}>
          <AvatarStack friendIds={list.members} size={34} ringColor="#1a1a1a" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{list.members.length} miembros</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>
              {list.members.slice(0, 2).map((id) => friendById(id).name.split(' ')[0]).join(', ')}
              {list.members.length > 2 ? ` y ${list.members.length - 2} más` : ''}
            </div>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '8px 12px', borderRadius: 999,
            background: list.color, color: '#000', border: 0, cursor: 'pointer',
            fontSize: 12, fontWeight: 700,
          }}>{Icon.plus(15)} Agregar</button>
        </div>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{movies.length} películas y series</div>
          <button style={{ background: 'transparent', border: 0,
                           color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer' }}>Ordenar</button>
        </div>

        {/* Movies grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {movies.map((m) => {
            const recsOnList = list.recIds
              .map((rid) => RECOMMENDATIONS.find((r) => r.id === rid))
              .filter((r) => r && r.movieId === m.id);
            return (
              <button key={m.id} onClick={() => nav('movie', { movieId: m.id })} style={{
                background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
                color: '#fff', textAlign: 'left',
              }}>
                <Poster movie={m} width="100%" height={210} rounded={12} />
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{m.title}</div>
                  {recsOnList.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <Avatar friend={friendById(recsOnList[0].friendId)} size={16} />
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>
                        {friendById(recsOnList[0].friendId).name.split(' ')[0]}
                      </span>
                      <Stars value={recsOnList[0].rating} size={9} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────
// Write Recommendation
// ──────────────────────────────────────────────────────
function WriteRecScreen({ movieId, nav }) {
  const movie = movieById(movieId);
  const [rating, setRating] = React.useState(5);
  const [tag, setTag] = React.useState('');
  const [text, setText] = React.useState('');
  const tagSuggestions = ['La mejor del año', 'Imperdible', 'Para verla en familia', 'Te va a romper', 'Adictiva'];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column',
                  background: '#0d0d0d', color: '#fff' }}>
      <div style={{ padding: `${TOP_INSET}px 16px 12px`,
                    display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => nav('back')} style={{
          width: 36, height: 36, borderRadius: 18, border: 0, cursor: 'pointer',
          background: 'rgba(255,255,255,0.08)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{Icon.close(20)}</button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>Tu recomendación</div>
        <button onClick={() => nav('back')} style={{
          padding: '8px 16px', borderRadius: 999, border: 0,
          background: text.length > 10 ? '#FFC940' : 'rgba(255,255,255,0.08)',
          color: text.length > 10 ? '#000' : 'rgba(255,255,255,0.4)',
          fontSize: 13, fontWeight: 700, cursor: text.length > 10 ? 'pointer' : 'not-allowed',
        }}>Publicar</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px' }}>
        {/* Movie banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, borderRadius: 12,
                      background: 'rgba(255,255,255,0.04)', marginBottom: 26 }}>
          <Poster movie={movie} width={56} height={80} rounded={6} showTitle={false} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)',
                          letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              Recomendando
            </div>
            <div style={{ fontFamily: '"Playfair Display", Georgia, serif',
                          fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{movie.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>{movie.year}</div>
          </div>
        </div>

        {/* Rating */}
        <div style={{ marginBottom: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
                        letterSpacing: '0.04em', textTransform: 'uppercase' }}>¿Cuántas estrellas?</div>
          <Stars value={rating} size={32} interactive onChange={setRating} />
          <div style={{ fontSize: 13, color: '#FFC940', fontWeight: 600 }}>
            {['Mala', 'Floja', 'Buena', 'Muy buena', '¡Imperdible!'][rating - 1]}
          </div>
        </div>

        {/* Tag */}
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
                          letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>
            Etiqueta corta
          </label>
          <input value={tag} onChange={(e) => setTag(e.target.value)}
            placeholder="ej: La mejor del año"
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 10,
              background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)',
              color: '#fff', fontSize: 14, outline: 'none', marginBottom: 10,
              fontFamily: 'inherit', boxSizing: 'border-box',
            }} />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tagSuggestions.map((t) => (
              <button key={t} onClick={() => setTag(t)} style={{
                padding: '5px 11px', borderRadius: 999, border: 0, cursor: 'pointer',
                background: tag === t ? 'rgba(255,201,64,0.18)' : 'rgba(255,255,255,0.06)',
                color: tag === t ? '#FFC940' : 'rgba(255,255,255,0.7)',
                fontSize: 11, fontWeight: 500,
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
                          letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>
            ¿Qué les vas a decir?
          </label>
          <textarea value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Cuéntales por qué deberían verla..."
            rows={6}
            style={{
              width: '100%', padding: '14px 16px', borderRadius: 12,
              background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)',
              color: '#fff', fontSize: 14, lineHeight: 1.5, outline: 'none', resize: 'none',
              fontFamily: 'inherit', boxSizing: 'border-box',
            }} />
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'right', marginTop: 4 }}>
            {text.length} / 500
          </div>
        </div>

        {/* Visibility row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                      borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)',
          }}>{Icon.friends(18)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Visible para tus amigos</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{FRIENDS.length} personas la verán</div>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)' }}>{Icon.chevron(16)}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  CreateListScreen, ListDetailScreen, WriteRecScreen,
});
