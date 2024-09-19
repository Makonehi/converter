/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        containerw: '360px'
      },
      height: {
        containery: '703px'
      },
      backgroundColor: {
        main: 'rgb(234, 234, 254)',
        fon: '#242424'
      },
      color: {
        titlee: 'rgb(31, 34, 97)',
        teht: 'rgb(128, 128, 128)',
        textt: 'rgb(152, 152, 152)'
      },
      backgroundImage: {
        'footer-texture': "url('./Photo/china.png')"
      },
      borderRadius: {
        full: '360px'
      }
    },
  },
  plugins: [],
}

