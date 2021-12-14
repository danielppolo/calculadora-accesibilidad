module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"sofia pro"', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#F1F3EE',
      black: '#1A1A1A',
      blue: '#307DC6',
      yellow: '#F1BB43',
      aqua: '#43C6CB',
      green: '#54AC59',
      pink: '#FF9DE1',
      orange: '#FE8840',
      red: '#DA546F',
      purple: '#7054BC',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
