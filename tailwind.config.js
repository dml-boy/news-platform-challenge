/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['YourFigmaFont', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#yourcolor',
        secondary: '#yourcolor',
      },
    },
  },
  plugins: [],
};
