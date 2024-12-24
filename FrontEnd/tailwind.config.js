/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default {
  
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}", 
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}", 
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        white: "#F9FCFE",
        grey: "#999999",
        black: "#333333",
        bluelight: "#2980F2",
        bluedarklight: "#1A62B2",
        bluedark: '#0F3C6B',
        lightblue1: '#E2F3FD',
        lightblue2: '#BCD7F6',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      screens: {
        'xsm': '300px', 
        'galaxysm': '412px',  // Custom screen size for Galaxy A51
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        '2xl': '1536px',
        'ipadsm': '1640px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // Add the line-clamp plugin
  ],
};