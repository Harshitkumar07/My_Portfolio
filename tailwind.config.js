/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        cosmic: {
          blue: '#3a86ff',
          purple: '#8338ec',
          fuchsia: '#f72585',
          indigo: '#5f5fff',
          violet: '#9d4edd',
          cyan: '#8ecae6',
          silver: '#e0e0e0',
          dark: '#0a1026',
        },
      },
    },
  },
  plugins: [],
}

