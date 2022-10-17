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
        blue: "rgb(52, 102, 246)",
        dark: {
          border_primary: "rgba(31, 41, 55, 1)",
          border_secondary: "rgba(55, 65, 81, 1)",
          primary_background: "rgba(17, 24, 39, 1)",
          paragraph_color: "rgba(156, 163, 175, 1)",
          heading_color: "rgba(255, 255, 255, 1)",
          secondary_background: "rgba(17, 24, 39, 1)",
          button_text: "rgba(229, 231, 235, 1)",
        },
      },
    },
  },
  plugins: [],
};
