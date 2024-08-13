/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   'my-primary': '#010E26',
      //   'my-secondary': '#445EF2',
      //   'my-terciary': '#263973',
      //   'my-quartenary': '#05C7F2',
      //   'my-quintenary': '#7FA1CA',
      //   'my-black': '#000000',
      //   'my-white': '#ffffff',
      //   'my-gray': '#818181',
      //   'my-gray-black': '#c0c0c0',
      //   'my-white-opacity': '#ffffffbb',
      //   'my-black-opacity': '#000000bb',
      // },
      colors: {
        'my-primary': '#191D1F',
        'my-secondary': '#B47C49',
        'my-terciary': '#723F28',
        'my-quartenary': '#6E9488',
        'my-quintenary': '#50818C',
        'my-black': '#000000',
        'my-white': '#ffffff',
        'my-gray': '#818181',
        'my-gray-black': '#c0c0c0',
        'my-white-opacity': '#ffffffbb',
        'my-black-opacity': '#000000bb',
      },
      keyframes: {
        colorChange: {
          '0%': { borderColor: 'rgb(255, 0, 0)' },
          '14%': { borderColor: 'rgb(255, 165, 0)' },
          '28%': { borderColor: 'rgb(255, 255, 0)' },
          '42%': { borderColor: 'rgb(0, 128, 0)' },
          '57%': { borderColor: 'rgb(0, 255, 255)' },
          '71%': { borderColor: 'rgb(0, 0, 255)' },
          '85%': { borderColor: 'rgb(128, 0, 128)' },
          '100%': { borderColor: 'rgb(255, 0, 0)' },
        },
        bgChange: {
          '0%': { backgroundColor: 'rgb(255, 0, 0)' },
          '14%': { backgroundColor: 'rgb(255, 165, 0)' },
          '28%': { backgroundColor: 'rgb(255, 255, 0)' },
          '42%': { backgroundColor: 'rgb(0, 128, 0)' },
          '57%': { backgroundColor: 'rgb(0, 255, 255)' },
          '71%': { backgroundColor: 'rgb(0, 0, 255)' },
          '85%': { backgroundColor: 'rgb(128, 0, 128)' },
          '100%': { backgroundColor: 'rgb(255, 0, 0)' },
        },
      },
      animation: {
        colorChange: 'colorChange 4s linear infinite',
        bgChange: 'bgChange 4s infinite linear'
      },
    },
  },
  plugins: [],
}

