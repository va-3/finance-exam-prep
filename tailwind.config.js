/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep navy/slate backgrounds
        'bg-primary': '#0f172a',
        'bg-secondary': '#1e293b',
        'bg-tertiary': '#334155',

        // Soft blue accents
        'accent-blue': '#3b82f6',
        'accent-blue-light': '#60a5fa',

        // Green success
        'accent-green': '#10b981',
        'accent-green-light': '#34d399',

        // Gentle red error
        'accent-red': '#ef4444',
        'accent-red-light': '#f87171',

        // Text colors
        'text-primary': '#f1f5f9',
        'text-secondary': '#cbd5e1',
        'text-tertiary': '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'heading-1': '2.5rem',
        'heading-2': '2rem',
        'heading-3': '1.5rem',
        'body': '1.125rem',
      },
      lineHeight: {
        'relaxed': '1.75',
      },
      borderRadius: {
        'card': '0.75rem',
      },
      animation: {
        'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
        'scale-in': 'scaleIn 0.2s ease-out',
        'confetti': 'confetti 0.6s ease-out',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
