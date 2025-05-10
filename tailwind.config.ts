import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // App Router structure
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],            // For body text
        heading: ['Montserrat', 'sans-serif'],   // For titles/headings
      },
      colors: {
        mourid: {
          green: '#2e5b43',     // Main branding green
          blue: '#3fa9f5',      // Light blue (used for secondary elements or hover)
          yellow: '#f9c53b',    // Optional accent yellow (e.g. icons)
          navy: '#0d1f2d',      // Deep navy for footer/background contrast
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config