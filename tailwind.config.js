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
      'primary': '#321313',
      'secondary': '#A20A0A',
      'tertiary': '#F2EAD3',
      'quaternary': '#630000',
      'quinary': '#F9F5F0',
      'icons': '#e4e4e7',
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
      blur: ['hover', 'focus'],
    }
  },
  plugins: [],
}
