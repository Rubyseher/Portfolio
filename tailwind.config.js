/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        accent: '#2997ff',
        purple: '#bf5af2',
        pink: '#ff375f',
        teal: '#64d2ff',
        card: 'rgba(255,255,255,0.04)',
      },
      animation: {
        'carousel-left':  'carouselLeft 40s linear infinite',
        'carousel-right': 'carouselRight 48s linear infinite',
        'carousel-left2': 'carouselLeft 56s linear infinite',
        'blink': 'blink 2s ease infinite',
        'line-down': 'lineDown 2.2s ease infinite',
      },
      keyframes: {
        carouselLeft: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        carouselRight: {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        lineDown: {
          '0%': { opacity: '0', transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
    },
  },
  plugins: [],
};
