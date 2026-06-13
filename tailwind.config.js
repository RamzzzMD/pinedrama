/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#070A12",
        panel: "#101626",
        soft: "#1A2236",
        gold: "#F6C76B",
        rose: "#FF5C8A"
      },
      boxShadow: {
        glow: "0 0 40px rgba(246,199,107,0.25)",
        pinkGlow: "0 0 50px rgba(255,92,138,0.25)"
      }
    }
  },
  plugins: []
};
