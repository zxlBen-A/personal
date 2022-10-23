/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      // {
      //     garden:{
      //         primary: "#a991f7",
      //         secondary: "#f6d860",
      //         accent: "#37cdbe",
      //         neutral: "#3d4451",
      //         "base-100": "#ffffff",
      //     }
      // },
      "garden",
      "dark",
      "retro"],
  }
}
