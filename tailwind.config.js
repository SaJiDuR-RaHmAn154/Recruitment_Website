/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#141414",
        "sky": "#0369a1",
        "cyan": "#155e75",
      }
    },
  },
  plugins: [],
}

