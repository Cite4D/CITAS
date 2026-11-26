/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dlsu: {
          dark: '#03261a',
          900: '#063f2d',
          800: '#00563F', // Classic DLSU Heritage Green
          700: '#086e51',
          600: '#0e8865',
          500: '#15a87e',
          400: '#2ec497',
          300: '#6de0be',
          200: '#abf0db',
          100: '#ddfaee',
          50: '#f0fbf6',
        },
        gold: {
          700: '#b45309',
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          100: '#fef3c7',
          50: '#fffbeb',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'dlsu-card': '0 4px 20px -2px rgba(0, 86, 63, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'dlsu-hover': '0 12px 30px -4px rgba(0, 86, 63, 0.16), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
