/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js, jsx, ts, tsx}'
  ],
  theme: {
    extend: {
      keyframes:{
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        glideInTop: {
          '0%': { transform: 'translateY(-100%)'},
          '100%': { transform: 'translateX(0)'},
        },      
        rotateIn:{
          '0%': { transform: 'rotate(0)'},
          '100%':{ transform: 'rotate(180deg)'}
        },
        
  
      },
      animation:{
        'fade-in-slow': 'fadeIn 3s forwards',
        'fade-in-fast': 'fadeIn .5s forwards',
        'glide-in-top': 'glideInTop .2s ease-out',
        'rotate-in':'rotateIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
}

