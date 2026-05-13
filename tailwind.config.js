/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'var(--xuli-bg-primary)',
        'surface': 'var(--xuli-bg-secondary)',
        'card': 'var(--xuli-bg-tertiary)',
        'accent': 'var(--xuli-accent)',
        'accent-hover': 'var(--xuli-accent-hover)',
        'text-primary': 'var(--xuli-text-primary)',
        'text-secondary': 'var(--xuli-text-secondary)',
        'text-tertiary': 'var(--xuli-text-tertiary)',
      },
      fontFamily: {
        'display': ['var(--xuli-font-display)'],
        'body': ['var(--xuli-font-body)'],
        'mono': ['var(--xuli-font-mono)'],
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'subtle-pulse': 'subtle-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
