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
        // Background colors - Softer, less saturated (-15%)
        'bg-primary': '#0f1729',
        'bg-secondary': '#1a2332',
        'bg-tertiary': '#2a3544',
        'bg-glass': 'rgba(30, 41, 59, 0.6)',

        // Text colors - Improved contrast for WCAG AA
        'text-primary': '#f8fafc',
        'text-secondary': '#e2e8f0',
        'text-tertiary': '#cbd5e1',
        'text-muted': '#94a3b8',

        // Accent colors - Softer, more professional (-15% saturation)
        'accent-blue': '#5B8DEF',
        'accent-blue-light': '#7BA5F3',
        'accent-blue-dark': '#3B6FD4',
        'accent-green': '#2FC98C',
        'accent-green-light': '#52D6A3',
        'accent-green-dark': '#1FAA73',
        'accent-purple': '#8B7FF8',
        'accent-purple-light': '#A89FFB',
        'accent-yellow': '#F5C344',
        'accent-red': '#F87171',
        'accent-red-dark': '#DC2626',

        // Notion-inspired neutrals
        'notion-gray': '#9CA3AF',
        'notion-brown': '#A1887F',
        'notion-orange': '#FB923C',

        // Stripe-inspired borders
        'border-subtle': 'rgba(148, 163, 184, 0.1)',
        'border-medium': 'rgba(148, 163, 184, 0.2)',
        'border-strong': 'rgba(148, 163, 184, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Improved hierarchy - larger headings
        'heading-1': ['3rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'heading-2': ['2.25rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'heading-3': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.625' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        // Consistent 4/8/12/16/24px scale
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'card': '0.875rem',
        'button': '0.5rem',
        'input': '0.625rem',
      },
      boxShadow: {
        // Layered shadows for depth (Stripe-inspired)
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        // Glass morphism shadow
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        // Glow effects
        'glow-blue': '0 0 20px rgba(91, 141, 239, 0.3)',
        'glow-green': '0 0 20px rgba(47, 201, 140, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
      scale: {
        '98': '0.98',
      },
    },
  },
  plugins: [],
}
