/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#EA1D25',
        secondary: '#020202',
      },
      fontFamily: {
        outfitthin: ["Outfit-Thin", "sans-serif"],
        outfitextralight: ["Outfit-ExtraLight", "sans-serif"],
        outfitlight: ["Outfit-Light", "sans-serif"],
        outfitregular: ["Outfit-Regular", "sans-serif"],
        outfitmedium: ["Outfit-Medium", "sans-serif"],
        outfitsemibold: ["Outfit-SemiBold", "sans-serif"],
        outfitbold: ["Outfit-Bold", "sans-serif"],
        outfitextrabold: ["Outfit-ExtraBold", "sans-serif"],
        outfitblack: ["Outfit-Black", "sans-serif"],
      }
    },
  },
  plugins: [],
}

