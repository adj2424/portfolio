/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'serif']
      },
      colors: {
        accent: '#b31312',
        light: '#f8f8ff',
        dark: '#0a0908'
      }
    }
  },
  plugins: []
};

