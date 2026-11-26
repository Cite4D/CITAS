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
          900: '#003829',
          800: '#00563F', // Official De La Salle Green
          700: '#0b664d',
          100: '#e5f3ed',
          50: '#f2f8f5',
        }
      },
      fontFamily: {
        serif: ['"Merriweather"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
