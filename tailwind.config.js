/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' if you prefer automatic detection
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              // Dark mode colors
              dark: {
                  bg: '#1a202c',
                  text: '#a0aec0',
                  primary: '#4A5568',
                  secondary: '#2D3748',
                  accent: '#718096',
              },
              // Light mode colors
              light: {
                  bg: '#ffffff',
                  text: '#000000',
                  primary: '#f0f0f0',
                  secondary: '#cccccc',
                  accent: '#007bff',
              }
          },
      },
  },
  plugins: [],
}
