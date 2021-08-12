module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ["Pompiere", "Sans-serif"],
        sans: ["Montserrat Alternates", "Sans-serif"],
        mono: ["Lobster", "cursive"],
      },

      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#85D8D8",
        secondary: "#E85A8A",
        tertiary: "#A46497",
      }),

      textColor: (theme) => ({
        ...theme("colors"),
        primary: "#88CDD3",
        secondary: "#E68EAA",
        tertiary: "#A46497",
      }),
    },
  },
  variants: {},
  plugins: [],
};
