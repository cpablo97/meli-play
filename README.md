# Meli Play — Componentes

Componentes de UI para **Mercado Play**, el servicio de streaming de Mercado Libre. Este repositorio contiene el prototipo interactivo del flujo de recomendaciones entre amigos y familia.

---

## RecommendationCard

Tarjeta de recomendaciones de amigos — aparece en la pantalla de detalle de película.

**[→ Ver componente en Storybook]([https://cpablo97.github.io/meli-play/](https://cpablo97.github.io/meli-play/?path=/docs/componentes-recommendationcard--docs))**

### Estados

| Estado | Descripción |
|---|---|
| Cerrada | Muestra avatar, nombre, estrellas y tag. El chevron `›` invita a expandir. |
| Abierta | Revela la reseña completa, fecha y botón de likes. Animación ease-out 150 ms. |
| Múltiple | Varias recomendaciones en la misma tarjeta, cada una se abre independientemente. |

### Uso

```jsx
import { RecommendationCard } from './componentes/RecommendationCard.module.jsx';

// Recommendation shape
const recommendations = [
  {
    id: 'r1',
    friend: { name: 'Sofía Restrepo', initial: 'S', hue: 18 },
    rating: 5,
    tag: 'La mejor del año',
    date: 'agosto 2026',
    text: 'La actuación de Colin Firth es absolutamente magistral...',
    likes: 12,
  },
];

<RecommendationCard
  recommendations={recommendations}
  onToggle={(recId, isNowOpen) => console.log(recId, isNowOpen)}
/>
```

### Props

| Prop | Tipo | Descripción |
|---|---|---|
| `recommendations` | `Recommendation[]` | Array de recomendaciones con datos del amigo embebidos. |
| `onToggle` | `(recId, isNowOpen) => void` | Se emite cada vez que una reseña se abre o cierra. |

### Especificaciones de diseño

- Fondo: `rgba(255,201,64,0.06)` · Borde: `0.5px solid rgba(255,201,64,0.18)`
- Border radius: `16px` · Padding: `16px`
- Iconos: Material Symbols Rounded (`keyboard_arrow_right`, `keyboard_arrow_down`, `favorite`)
- Tipografía: Inter (sistema) · Transición: `ease-out 150ms`
- Accesible: `aria-expanded`, `aria-label`, `aria-hidden`, navegación por teclado

---

## Correr localmente

```bash
npm install
npm run storybook   # abre http://localhost:6006
```

## Estructura

```
componentes/
  RecommendationCard.jsx         # versión CDN (cargada por index.html vía Babel standalone)
  RecommendationCard.module.jsx  # versión ES module (usada por Storybook / Vite)
  RecommendationCard.stories.jsx # 7 stories — todos los estados y casos borde

.storybook/
  main.js            # Storybook 8 + react-vite
  preview.js         # fondo oscuro por defecto
  preview-head.html  # inyecta Inter + Material Symbols Rounded

.github/workflows/
  deploy-storybook.yml  # build + deploy a GitHub Pages en cada push a main
```
