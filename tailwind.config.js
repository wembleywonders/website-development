/** @type {import('tailwindcss').Config} */
// Tailwind v4 note:
// Most configuration has moved to CSS using @theme in globals.css.
// This file is retained for backwards compatibility with any tooling
// that reads it, but v4 does not require it.
// Custom theme tokens should be added in src/styles/globals.css
// using the @theme directive, not here.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
 