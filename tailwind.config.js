/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vast: {
          bg: '#050507',
          bg2: '#07070b',
          bg3: '#0b0810',
          panel: 'rgba(18,18,24,0.72)',
          border: 'rgba(209,163,255,0.18)',
          accent: '#d1a3ff',
          accentDeep: '#79159d',
          textPrimary: '#f3f5f8',
          textSecondary: '#9ca3af',
          textMuted: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['InterDisplay', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['InterDisplay', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'radial-purple': 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(121,21,157,0.22) 0%, transparent 70%)',
        'radial-purple-center': 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(121,21,157,0.15) 0%, transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'streak': 'streak 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
      },
      keyframes: {
        streak: {
          '0%, 100%': { opacity: '0', transform: 'translateX(-100%) skewX(-15deg)' },
          '50%': { opacity: '1', transform: 'translateX(300%) skewX(-15deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(209,163,255,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(209,163,255,0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

