/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

