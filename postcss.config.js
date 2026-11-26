// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- ¡Esta es la línea mágica que arregla el error!
    autoprefixer: {},
  },
}