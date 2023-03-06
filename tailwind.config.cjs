/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        "odibee-sans": ["Odibee Sans", "sans-serif"],
      },
      colors: {
        "light-red": "#ff5040",
        "light-blue": "#4080ff",
      },
    },
  },
  plugins: [],
};
