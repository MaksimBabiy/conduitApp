/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titillium: ["Titillium Web", "sans-serif"],
      },
      colors: {
        theme: {
          green: "#5CB85C",
          darkGreen: "#3d8b3d",
          gray: "#bbb",
          darkestGray: "#373a3c",
          darkenGray: "#999",
          pageHoverBg: "#eceeef",
        },
      },
      dropShadow: {
        logo: "0px 1px 3px rgb(0 0 0 / 30%)",
      },
    },
  },
  plugins: [],
};
