/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        seaShell: "#F1F1F1",
        paleSky: "#6C757D",
        bostonBlue: "#488AC6",
        blueZodiac: "#112F5F",
        abbey: "#495057",
        complete: "#5BAC4FB2",
        current: "#5B96CCBF",
        missing: "#EFDA6CB2",
        incomplete: "#FF7F29B2",
        mercury: "#E2E2E2",
        albaster: "#F9F9F9",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
