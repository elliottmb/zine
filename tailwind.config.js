module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        vibrantBlue: '#007acc',
        vibrantPink: '#d5006d',
        vibrantOrange: '#ff6200ea',
        vibrantGreen: '#32cd32',
        vibrantYellow: '#ffeb3b',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        courier: ['Courier Prime', 'monospace'],
        bebas: ['Bebas Neue', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        abril: ['Abril Fatface', 'serif'],
        ibmPlex: ['IBM Plex Serif', 'serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.pullquote': {
          fontSize: '1.5rem',
          fontStyle: 'italic',
          color: '#007acc',
          borderLeft: '4px solid #d5006d',
          paddingLeft: '1rem',
          margin: '1.5rem 0',
        },
        '.article-section': {
          marginBottom: '2rem',
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
        },
        '.text-emphasis': {
          color: '#d5006d',
          fontWeight: 'bold',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};