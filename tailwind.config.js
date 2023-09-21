/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      scale: {
        175: "1.75",
      },
      px: {
        3: "3px",
      },
    },
    colors: {
      tangerine: "#e67d1c",
      gunmetal: "#292F36",
      blue: "#4ECDC4",
      white: "#FFFFFF",
    },
    backgroundImage: {
      banner: "url('/img/banneriKuva.jpg')",
    },
  },
  plugins: [],
};
