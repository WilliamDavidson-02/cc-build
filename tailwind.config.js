/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        seaShell: '#F1F1F1',
        paleSky: '#6C757D',
        bostonBlue: '#488AC6',
        blueZodiac: '#112F5F',
      }
    },
  },
  plugins: [],
};
