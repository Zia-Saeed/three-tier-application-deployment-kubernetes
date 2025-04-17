module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#6366f1',
            main: '#4f46e5',
            dark: '#4338ca',
          },
          secondary: {
            light: '#ec4899',
            main: '#db2777',
            dark: '#be185d',
          },
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }