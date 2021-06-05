const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#3500D3",
      violet: colors.violet,
      gray: colors.gray,
      white: "#fff",
      black: "#000",
      blue: colors.blue,
      red: colors.red,
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
  },
  variants: {
    extend: { opacity: ["disabled"] },
  },
  plugins: [],
};

//#3500D3
//#ff2d20
