/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../themes/toha/layouts/**/*.html",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../themes/toha/static/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          dark: '#0056b3'
        }
      }
    }
  },
  // Ensure Tailwind's base styles don't conflict with existing styles
  corePlugins: {
    preflight: false
  }
} 