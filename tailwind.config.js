/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      scale: {
        175: "1.75",
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
