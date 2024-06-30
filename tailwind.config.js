/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlack: '#020202',
        brightRed: '#EA1D25',
        lightCream: '#F0E6C1',
        vibrantOrange: '#FA7930',
        darkGray: '#333243',
        warmBlue: '#2871FF'
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

