/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        'darkblue': 'hsl(209, 23%, 22%)',
        'verydarkblue': ' hsl(207, 26%, 17%)',
        'darktext': ' hsl(200, 15%, 8%)',
        'lightgray': 'hsl(0, 0%, 94%)',
        'verylightgray': 'hsl(0, 0%, 97%)',
        'lighttext': 'hsl(0, 0%, 100%)',
      },

      screens: {
        'sm': '375px',
        'md': '376px',
        'lg': '1440px',
      }
    },

  },
  plugins: [],
}

