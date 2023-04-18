const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        jakarta: ['var(--font-jakarta)', ...fontFamily.sans],
      },
      colors: {
        white: {
          100: '#ffffff',
          200: '#f2f5f7c2'
        },
        gray48: '#67768e',
      },
    },
  },
  plugins: [],
}
