/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main_blue: "#399efc",
        dark_blue: "#1f184a",
        light_blue: "#e1f1ff",
        shadow: "#f1f1f1",
        off_white: "#fafcfe",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
