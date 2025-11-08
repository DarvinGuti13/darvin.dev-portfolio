/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts,vue}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Color principal del sidebar
        sidebar: '#040b14',
        brand: {turquoise: '#2fb7b2'}
      },
      keyframes: {
        caret: {'50%': {opacity: '0'}}

      },
      animation: {
        caret: 'caret 1s step-end infinite'
      },
      fontFamily: {
        // Texto general
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        // Títulos (h1–h4)
        heading: ['Poppins', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
