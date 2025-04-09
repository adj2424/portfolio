/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'serif']
      },
      colors: {
        accent: '#dc2f02', //B8C0FF - light blue  // dc2f02 - bright orange
        light: '#f8f8ff',
        dark: '#0a0908'
      },
      fontSize: {
        sm: '1rem',
        md: '1.3rem',
        lg: '2.5rem',
        xl: '5rem',
        '2xl': '15rem',
        '3xl': '28rem',
        '4xl': '40rem'
      }
    }
  },
  plugins: []
};

