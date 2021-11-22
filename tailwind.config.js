const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  plugins: {
    tailwindcss: {},
    'postcss-focus-visible': {},
    autoprefixer: {}
  },
  theme: {
    listStyleType: {
      none: 'none',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      transform: ['hover', 'focus'],
      fontSmoothing: ['hover', 'focus'],
    },
    variants: {
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
      extend: {
      }
    },
    colors: {
      'primary': '#57837B',
      'secondary': '#C9D8B6',
      'tertiary': '#F1ECC3',
      'quaternary': '#105652',
      gray: colors.gray,
      'card': '#F6EEDF',
      yellow: colors.yellow,
      red: colors.red,
    }
  },
  variants: {
    extend: {
      maxHeight: ['focus'],
      opacity: ['disabled'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    }
  },
  plugins: [],
}
