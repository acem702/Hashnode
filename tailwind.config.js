/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      margin: {
        spacing: "1.25rem",
      },
      padding: {
        spacing: "1.25rem",
      },
      gap: {
        spacing: "1.25rem",
      },

      colors: {
        primary: {
          500: "rgb(52, 102, 246)",
          dark: {
            100: "rgb(156, 163, 175)",
            200: "#111827",
            300: "rgb(31, 41, 55)",
            400: "rgb(55, 65, 81)",
          },
          light: {
            100: "rgb(255, 255, 255)",
            200: "rgb(250, 251, 255)",
          },
        },
        text: {
          dark: {
            100: "rgb(255, 255, 255)",
            200: "rgb(229, 231, 235)",
            300: "rgb(209, 213, 219)",
            400: "rgb(229, 231, 235)", // input
            500: "rgb(156, 163, 175)",
          },
          light: {
            100: "rgb(0,0,0)",
            200: "rgb(75, 85, 99)",
            300: "rgb(107, 114, 128)",
            400: "rgb(34, 34, 34)",
          },
        },
      },
    },
  },
  plugins: [],
};
