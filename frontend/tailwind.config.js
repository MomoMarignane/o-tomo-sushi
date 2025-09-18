/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Thème boisé chaleureux
        primary: {
          50: '#fff8f0',
          100: '#f4e6d7',
          200: '#e7c9a9',
          300: '#d4a574',
          400: '#b97a56',
          500: '#a86b2d',
          600: '#8b5a24',
          700: '#7c4a03',
          800: '#5d3717',
          900: '#4b2e0e',
        },
        wood: {
          50: '#fdfbf7',
          100: '#f8f3e9',
          200: '#ede2d0',
          300: '#d4c4a8',
          400: '#b7a082',
          500: '#a86b2d',
          600: '#8b5a24',
          700: '#7c4a03',
          800: '#6b4423',
          900: '#4b2e0e',
        },
        warm: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fad7a5',
          300: '#f7ba6d',
          400: '#f39333',
          500: '#e7c9a9',
          600: '#d4a574',
          700: '#b97a56',
          800: '#a86b2d',
          900: '#8b5a24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        japanese: ['Noto Sans JP', 'sans-serif'],
      },
      backgroundImage: {
        'wood-pattern': "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
        'subtle-wood': "url('https://www.transparenttextures.com/patterns/light-wood.png')",
        'wood-grain': "linear-gradient(145deg, #a86b2d 0%, #b97a56 25%, #e7c9a9 50%, #b97a56 75%, #a86b2d 100%)",
      },
      boxShadow: {
        'wood': '0 4px 6px -1px rgba(168, 107, 45, 0.1), 0 2px 4px -1px rgba(168, 107, 45, 0.06)',
        'wood-lg': '0 10px 15px -3px rgba(168, 107, 45, 0.1), 0 4px 6px -2px rgba(168, 107, 45, 0.05)',
        'warm': '0 4px 6px -1px rgba(231, 201, 169, 0.3), 0 2px 4px -1px rgba(168, 107, 45, 0.1)',
      }
    },
  },
  plugins: [],
}
