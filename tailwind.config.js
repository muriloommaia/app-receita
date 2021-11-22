const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors : {
      'primary' : '#57837B',
      'secondary': '#C9D8B6',
      'tertiary': '#F1ECC3',
      'quaternary': '#105652',
      gray: colors.gray
    }
  },
  variants: {
    extend: {
      maxHeight: ['focus'],
    }
  },
  plugins: [],
}
