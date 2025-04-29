import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust to match your project’s file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimate],
};
