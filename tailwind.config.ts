function withOpacity(variableName:any) {
  return ({ opacityValue }:any) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

const { colors } = require('tailwindcss/colors');
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        ...colors,
        brand: {
          50: '#f2f0ff',
          100: '#eeebff',
          200: '#d4d0ff',
          300: '#c7c2ff',
          400: '#9f92ff',
          500: '#6152df',
          600: '#5243cb',
          700: '#3f2eb2',
          800: '#312887',
          900: '#231c6b',
          DEFAULT: '#6152df',
        },
        "accent-300": withOpacity("--color-accent-300"),
        "accent-400": withOpacity("--color-accent-400"),
        "accent-500": withOpacity("--color-accent-500"),
      },
    },
  },
  plugins: [],
};
export default config;