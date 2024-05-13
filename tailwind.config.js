module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
      'navbar': '#588157',
      'bgarriba': '#dad7cd',
      'bgabajo': '#a3b18a'
    },
  },
  },
  plugins: [require("daisyui")],
}