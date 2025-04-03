/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2A4A',
          light: '#2C3E67'
        },
        sand: {
          DEFAULT: '#D4C5B9',
          light: '#E8E1DB'
        }
      }
    },
  },
  plugins: [],
};