/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}', './demo/**/*.html'],
  theme: {
    extend: {
      colors: {
        // Vibrant magazine colors - 70s-90s inspired
        vibrantBlue: '#007acc',
        vibrantPink: '#d5006d',
        vibrantOrange: '#ff6200ea',
        vibrantGreen: '#32cd32',
        vibrantYellow: '#ffeb3b',

        // Extended retro palette
        burnished: {
          50: '#faf8f5',
          900: '#2d1810',
        },
        sunset: {
          50: '#fef2e8',
          500: '#ff6b35',
          900: '#8b2e00',
        },
        acid: {
          50: '#f0ff00',
          500: '#ccff00',
          900: '#b3cc00',
        },
        magenta: {
          50: '#ffe0f7',
          500: '#ff00ff',
          900: '#cc00cc',
        },
        peacock: {
          50: '#e0f7ff',
          500: '#00bfff',
          900: '#0066cc',
        },
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        courier: ['Courier Prime', 'monospace'],
        bebas: ['Bebas Neue', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        abril: ['Abril Fatface', 'serif'],
        ibmPlex: ['IBM Plex Serif', 'serif'],
        spaceMono: ['Space Mono', 'monospace'],
        garamond: ['EB Garamond', 'serif'],
        crimson: ['Crimson Text', 'serif'],
        bodoni: ['Bodoni Moda', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        righteous: ['Righteous', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        ultra: '0.15em',
      },
    },
  },
  plugins: [],
};
