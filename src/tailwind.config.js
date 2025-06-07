/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          dark: '#0056b3',
        },
      },
    },
  },
  plugins: [],
  // Ensure Tailwind's base styles don't conflict with existing styles
  corePlugins: {
    preflight: false,
  },
} 