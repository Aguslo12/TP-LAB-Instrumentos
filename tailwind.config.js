module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{tsx,jsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      colors: {
      'navbar': '#588157',
      'bgarriba': '#dad7cd',
      'bgabajo': '#a3b18a',
      'custom-green': '#00A96E',
    },
  },
  },
  plugins: [require("daisyui")],
}