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
      fontFamily: {
        'rubik': ['Bricolage Grotesque'],
        'poppins': ['Bricolage Grotesque']
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
