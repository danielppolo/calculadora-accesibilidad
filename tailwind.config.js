module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/context/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['"sofia pro"', 'sans-serif'],
    },
    extend: {
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
    },
  },
  variants: {
    extend: {},
  },
  important: true,
  plugins: [require('@tailwindcss/typography')],
};
