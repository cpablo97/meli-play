/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#0d0d0d' },
        { name: 'app bg',  value: '#14110d' },
        { name: 'light',   value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
