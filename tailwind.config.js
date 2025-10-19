// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        muaythai: ['KRRThaispirit'], // <<< ชื่อนี้ต้องตรงกับ PostScript Name
      },
    },
  },
  plugins: [],
}