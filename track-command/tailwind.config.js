/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        track: {
          green: '#022c22', // Deep athletic green
          gold: '#fbbf24',  // Athletic gold
          goldHover: '#d97706',
          light: '#f8fafc',
          surface: '#0f392b', // Slightly lighter green for cards
          dim: 'rgba(0,0,0,0.5)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}