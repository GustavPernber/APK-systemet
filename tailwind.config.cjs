const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",'node_modules/preline/dist/*.js',],
  media: false,
  theme: {
    fontFamily:{
      'sans':['Roboto', ...defaultTheme.fontFamily.sans],
      'condensed':['Roboto condensed', ...defaultTheme.fontFamily.sans],
      'serif':['Munson Regular', ...defaultTheme.fontFamily.serif]
    },
    // borderRadius:{
    //   'app': '4px'
    // },
    extend: {

      gridTemplateRows:{
        'main':'auto auto 1fr'
      },

      colors:{
        gray:{
          100:"#F9F9F9",
          200:"#EAE9E9",
          300: "#D4D3D3",
          400:"#2D2926A6",
          
        },
        green:{
          100:"#CDEAD5",
          200:"#328564",
          300:"#537F61",
          400:"#095741",
        },
        black:"#2D2926",
        orange:"#F08D60"
      }


    },
  },
  plugins: [require('preline/plugin'), require('@tailwindcss/forms')],
}
