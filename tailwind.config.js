/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        body:  ['Source Serif 4', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50:  '#F5F0FF',
          100: '#EDE0FF',
          200: '#D8BFFF',
          300: '#B78BF5',
          400: '#9B5FE8',
          500: '#7C3AED',
          600: '#6527D1',
          700: '#5020A8',
          800: '#3C1880',
          900: '#280F55',
        },
        ink: {
          DEFAULT:   '#0A0A09',
          editorial: '#2A2A27',
          secondary: '#3D3D3A',
          muted:     '#6B6B67',
          light:     '#AEADA8',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          warm:    '#FAFAF8',
          bg:      '#F5F4F0',
          border:  '#D8D7D2',
          muted:   '#ECEAE4',
        },
      },
    },
  },
  plugins: [],
}
