import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'saw-red': '#FF0000',
        'saw-yellow': '#FFD700',
        'saw-blue': '#0033CC',
        'saw-black': '#000000',
        'saw-white': '#FFFFFF',
        'saw-paper': '#F5F0E8',
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'Arial Black', 'sans-serif'],
        oswald: ['Oswald', 'Arial', 'sans-serif'],
        stencil: ['Special Elite', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0 #000',
        'brutal-lg': '6px 6px 0 #000',
        'brutal-xl': '8px 8px 0 #000',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
    },
  },
  plugins: [],
}
export default config
