import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export const k72 = {
  get black() {
    return '#1c1c1c';
  },
  get white() {
    return '#fff';
  },
};

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/containers/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
    },
    container: {
      center: true,
      padding: 'var(--container-padding, 1.5rem)',
    },
    spacing: {
      '0': '0',
      '1': 'var(--space-1)',
      '2': 'var(--space-2)',
      '3': 'var(--space-3)',
      '4': 'var(--space-4)',
      '5': 'var(--space-5)',
      '6': 'var(--space-6)',
      '7': 'var(--space-7)',
      '8': 'var(--space-8)',
      '9': 'var(--space-9)',
      '10': 'var(--space-10)',
    },
    colors: {
      white: k72.white,
      black: k72.black,
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['var(--font-sans)'],
    },
    extend: {
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
        sm: 'calc(var(--border-radius) * 0.5)',
        lg: 'calc(var(--border-radius) * 2)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus']);
    }),
  ],
};

export default config;
