/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#2E7D32',
          600: '#256B29',
          700: '#1B5E20',
          800: '#144A19',
          900: '#0D3812',
        },
        link: {
          DEFAULT: '#0071BC',
          hover: '#205493',
          active: '#112E51',
          visited: '#4C2C92',
        },
        cta: {
          DEFAULT: '#1B5E20',
          hover: '#144A19',
        },
      },
      minWidth: {
        touch: '44px',
      },
      minHeight: {
        touch: '44px',
      },
    },
  },
  plugins: [],
}
