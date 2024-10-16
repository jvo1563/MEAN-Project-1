/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // default sans-serif
        serif: ["Merriweather", "serif"], // default serif
        mono: ["Source Code Pro", "monospace"], // default monospace
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
