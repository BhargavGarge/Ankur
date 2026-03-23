/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "primary": "#1B4F72", 
        "secondary": "#0E6655", 
        "warning": "#BA7517", 
        "surface": "#ffffff",
        "surface-container-low": "#f3f3f6",
        "on-surface": "#191c1e",
        "on-surface-variant": "#41474e",
        "outline-variant": "#E8E8E8",
        "selection-bg": "#E8F1F8",
      },
      fontFamily: {
        headline: ["Fraunces", "serif"],
        body: ["DM Sans", "sans-serif"],
        label: ["DM Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}
