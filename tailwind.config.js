/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const px0_50 = { ...Array.from(Array(51)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_300 = { ...Array.from(Array(301)).map((_, i) => `${i}px`) };
const px0_1920 = { ...Array.from(Array(1921)).map((_, i) => `${i}px`) };

const customUtilities = plugin(({ addUtilities }) => {
  addUtilities({
    ".flex-center": {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    },
    ".flex-col-center": {
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
      "justify-content": "center",
    },
  });
});

const customVariant = plugin(({ addVariant }) => {
  addVariant("all", "& *");
  addVariant("under", "& > *");
});

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: px0_50,
      width: px0_1920,
      height: px0_1920,
      minWidth: px0_1920,
      maxWidth: px0_1920,
      minHeight: px0_1920,
      maxHeight: px0_1920,
      fontSize: px0_100,
      padding: px0_100,
      margin: px0_100,
      spacing: px0_300,
      colors: {
        "c-gray-200": "#F5F5F5",
        "c-gray-300": "#D9D9D9",
        "c-gray-400": "#6B6B6B",
        "c-black-200": "#4F4F4F",
        "c-black-300": "#2B2B2B",
        "c-orange-300": "#EB691B",
      },
      fontFamily: {
        "open-sans": ["OpenSans"],
        "rabbid-highway-sign": ["RabbidHighwaySignII"],
      },
      screens: {
        ssm: "450px",
        // => @media (min-width: 350px) { ... }

        sm: "600px",
        // => @media (min-width: 350px) { ... }

        md: "900px",
        // => @media (min-width: 600px) { ... }

        lg: "1100px",
        // => @media (min-width: 1024px) { ... }

        xl: "1300px",
        // => @media (min-width: 1280px) { ... }

        xxl: "1450px",
        // => @media (min-width: 1536px) { ... }

        xxxl: "1600px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [customUtilities, customVariant],
};
