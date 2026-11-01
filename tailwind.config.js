/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bloom: {
          bg: '#FFFDF9',
          surface: '#FFFFFF',
          soft: '#F8E9EC',
          blush: '#F3D2DA',
          accent: '#DDA6B3',
          rose: '#C98498',
          deepRose: '#A6536F',
          text: '#292329',
          muted: '#777078',
          border: '#EEE7E9',
          gold: '#C5A880',
          dark: '#1C161C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(41, 35, 41, 0.05)',
        'card': '0 8px 30px rgba(41, 35, 41, 0.07)',
        'dropdown': '0 12px 35px -4px rgba(41, 35, 41, 0.12)',
        'drawer': '-8px 0 35px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'marquee': 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
