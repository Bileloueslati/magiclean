module.exports = {
  content: [
    // https://tailwindcss.com/docs/content-configuration
    "./*.php",
    "./inc/**/*.php",
    "./templates/**/*.twig",
    "./assets/js/**/*.tsx",
    "./safelist.txt",
    //'./**/*.php', // recursive search for *.php (be aware on every file change it will go even through /node_modules which can be slow, read doc)
  ],
  safelist: [
    "text-center",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0071a8",
        secondary: "#62e3df"
      },
      animation: {
        up: 'scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards',
        down: 'scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards'
    },
      fontFamily: {
        'rubik': ['Jost'],
        'poppins': ['Jost']
      },      
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1240px'
        },

      },
    },
  },
  plugins: [],
};
