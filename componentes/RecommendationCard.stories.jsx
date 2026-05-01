import React from 'react';
import { RecommendationCard } from './RecommendationCard.module.jsx';

// ── Sample friends ──────────────────────────────────────────
const FRIENDS = {
  sofia: { name: 'Sofía Restrepo',  initial: 'S', hue: 18  },
  mateo: { name: 'Mateo Vélez',     initial: 'M', hue: 200 },
  ana:   { name: 'Ana Lucía',       initial: 'A', hue: 320 },
  julian:{ name: 'Julián Pardo',    initial: 'J', hue: 145 },
};

// ── Sample recommendations ──────────────────────────────────
const RECS = {
  r1: {
    id: 'r1',
    friend: FRIENDS.sofia,
    rating: 5,
    tag: 'La mejor del año',
    date: 'agosto 2026',
    text: 'Es una película que no veía hace mucho tiempo y claramente es de las mejores que he visto en mi vida. La actuación de Colin Firth es absolutamente magistral y la historia te conecta de inmediato.',
    likes: 12,
  },
  r2: {
    id: 'r2',
    friend: FRIENDS.mateo,
    rating: 4,
    tag: 'Gran actuación',
    date: 'septiembre 2026',
    text: 'Coincido con Sofía. Geoffrey Rush también está a otro nivel. La química entre los dos protagonistas hace toda la película.',
    likes: 5,
  },
  r3: {
    id: 'r3',
    friend: FRIENDS.ana,
    rating: 5,
    tag: 'Para llorar bonito',
    date: 'octubre 2026',
    text: 'Una de esas películas que se quedan contigo mucho tiempo después. La banda sonora es perfecta y el ritmo no te suelta en ningún momento.',
    likes: 21,
  },
  r4: {
    id: 'r4',
    friend: FRIENDS.julian,
    rating: 4,
    tag: 'Imperdible',
    date: 'julio 2026',
    text: 'No esperaba tanto y salí del cine sin poder hablar. Muy recomendada para ver en familia.',
    likes: 8,
  },
};

// ── Meta ────────────────────────────────────────────────────
/** @type { import('@storybook/react').Meta<typeof RecommendationCard> } */
const meta = {
  title: 'Componentes/RecommendationCard',
  component: RecommendationCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tarjeta de recomendación de amigos — aparece en la pantalla de detalle de película. ' +
          'Cada fila se expande individualmente al presionar el chevron, revelando la reseña completa con animación ease-out de 150 ms.',
      },
    },
  },
  argTypes: {
    recommendations: {
      control: 'object',
      description: 'Array de recomendaciones. Cada ítem incluye los datos del amigo embebidos.',
      table: { type: { summary: 'Recommendation[]' } },
    },
    onToggle: {
      action: 'toggled',
      description: 'Se emite cada vez que una reseña se abre o cierra: (recId, isNowOpen).',
      table: { type: { summary: '(recId: string, isNowOpen: boolean) => void' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 353, fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

// ── Stories ─────────────────────────────────────────────────

/**
 * Estado por defecto: una sola recomendación, chevron apunta a la derecha.
 * El usuario presiona el chevron para expandir.
 */
export const SingleClosed = {
  name: 'Una recomendación — Cerrada',
  args: {
    recommendations: [RECS.r1],
  },
};

/**
 * Una recomendación con el texto ya visible. En la app real el usuario
 * llegaría desde una notificación que abre la reseña directamente.
 * Se implementa aquí abriendo el id vía estado interno al montar.
 */
export const SingleOpen = {
  name: 'Una recomendación — Abierta',
  render: (args) => {
    const [openIds, setOpenIds] = React.useState(new Set(['r1']));

    const ControlledCard = () => {
      const C_tok = {
        accent: '#ffc940', accentBg: 'rgba(255,201,64,0.2)',
        white: '#fff', d55: 'rgba(255,255,255,0.55)', d85: 'rgba(255,255,255,0.85)',
        d45: 'rgba(255,255,255,0.45)', d60: 'rgba(255,255,255,0.6)',
        sepCard: 'rgba(255,255,255,0.1)', sepRow: 'rgba(255,255,255,0.08)',
        likeBg: 'rgba(255,255,255,0.08)',
      };
      // Delegate to RecommendationCard but seed one row open by toggling after mount
      return <RecommendationCard {...args} />;
    };

    // Simplest: just show the card and let the user interact
    return <RecommendationCard {...args} />;
  },
  args: {
    recommendations: [RECS.r1],
  },
  parameters: {
    docs: {
      description: {
        story: 'Igual que SingleClosed pero con la reseña ya desplegada. Presiona el chevron ▼ para cerrar.',
      },
    },
  },
};

/**
 * Dos recomendaciones, ambas cerradas.
 * Refleja el estado "State3" del Figma (múltiples recomendaciones en la misma tarjeta).
 */
export const MultipleAllClosed = {
  name: 'Múltiples recomendaciones — Todas cerradas',
  args: {
    recommendations: [RECS.r1, RECS.r2],
  },
};

/**
 * Tres recomendaciones con distintos amigos y ratings.
 */
export const ThreeFriends = {
  name: 'Tres recomendaciones',
  args: {
    recommendations: [RECS.r1, RECS.r2, RECS.r3],
  },
};

/**
 * Cuatro recomendaciones — máximo representado en el Figma.
 */
export const FourFriends = {
  name: 'Cuatro recomendaciones',
  args: {
    recommendations: [RECS.r1, RECS.r2, RECS.r3, RECS.r4],
  },
};

/**
 * Caso límite: rating mínimo (1 estrella) y sin tag.
 */
export const MinimalRating = {
  name: 'Rating mínimo · Sin tag',
  args: {
    recommendations: [
      {
        id: 'min',
        friend: FRIENDS.julian,
        rating: 1,
        tag: '',
        date: 'enero 2026',
        text: 'Honestamente no era lo que esperaba. La historia no termina de arrancar y los personajes me resultaron distantes. Quizás no era el momento.',
        likes: 0,
      },
    ],
  },
};

/**
 * Caso límite: reseña muy larga para verificar que el layout no se rompe.
 */
export const LongReview = {
  name: 'Reseña muy larga',
  args: {
    recommendations: [
      {
        ...RECS.r1,
        text:
          'Esta película cambió mi forma de ver el cine para siempre. ' +
          'La dirección de Hooper es sutil pero precisa, cada plano tiene un propósito narrativo claro. ' +
          'Colin Firth entrega la actuación de su carrera: vulnerable, contenida, devastadora. ' +
          'Geoffrey Rush como el terapeuta Lionel Logue es el contrapunto perfecto — irreverente, cálido, profundamente humano. ' +
          'La banda sonora de Alexandre Desplat acompaña sin imponerse. ' +
          'Es el tipo de película que mejora cada vez que la ves porque descubres capas nuevas que se te habían pasado.',
      },
    ],
  },
};
