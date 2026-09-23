/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          primary: '#8E651E',
          'primary-hover': '#745217',
          'primary-light': '#A3752A',
          dark: '#1C1917',
          charcoal: '#292524',
          accent: '#DECF9E',
          'accent-soft': '#F4EEDA',
          bg: '#FAF7EE',
          'bg-pure': '#FDFBF7',
          surface: '#F8F3DC',
          'surface-card': '#FFFFFF',
          border: '#E8DCB1',
          'border-dark': '#C9B67C',
          text: '#1C1917',
          'text-muted': '#78716C',
          'text-light': '#A8A29E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'academic': '0 4px 20px -2px rgba(142, 101, 30, 0.08), 0 2px 6px -1px rgba(28, 25, 23, 0.04)',
        'academic-lg': '0 10px 30px -4px rgba(142, 101, 30, 0.12), 0 4px 12px -2px rgba(28, 25, 23, 0.06)',
        'academic-sm': '0 2px 8px -1px rgba(142, 101, 30, 0.06)',
      },
      borderRadius: {
        'academic': '8px',
      }
    },
  },
  plugins: [],
}
