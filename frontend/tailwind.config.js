/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Ins: "Instrument Sans, sans-serif",
    },
    screens: {
      desktop: "1920px",
      laptop: "1000px",
      tablet: "690px",
      phone: "550px",
    },
    extend: {
      backgroundImage: {
        email: "url(/images/icon-email.svg)",
        password: "url(/images/icon-password.svg)",
        link: "url(/images/icon-link.svg)",
      },
      colors: {
        royalBlue: "#633CFF",
        lavender: "#BEADFF",
        babyPowder: "#EFEBFF",
        richBlack: "#333333",
        mediumGrey: "#737373",
        lightGrey: "#D9D9D9",
        snow: "#FAFAFA",
        white: "#FFFFFF",
        crimson: "#FF3939",
      },

      fontSize: {
        "h-m-b": "32px",
        "h-s-b": "16px",
        "b-m": "16px",
        "b-s": "12px",
      },
      dropShadow: {
        input: "0 10px 15px rgba(99, 60, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
