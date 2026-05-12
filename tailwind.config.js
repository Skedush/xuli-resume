/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Refined slate palette */
        'bg': '#0B0F14',
        'surface': '#151A23',
        'card': '#1C2431',
        'border': '#2A3441',
        'border-subtle': '#1E2530',
        /* Muted teal accent */
        'accent': '#22D3EE',
        'accent-hover': '#06B6D4',
        /* Text hierarchy */
        'text-primary': '#E2E8F0',
        'text-secondary': '#94A3B8',
        'text-tertiary': '#64748B',
        /* Code accents */
        'cyan': '#67E8F9',
        'purple': '#A78BFA',
        'green': '#4ADE80',
        'orange': '#FB923C',
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'body': ['Rajdhani', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
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
