import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    textColor: {
      navy: "#23285A",
      yellow: "#FBFF27",
      "light-navy": "#B4B4C8",
      "light-tan": "#F6EBD7",
      tan: "#A56A32",
      white: "#fff",
    },
    extend: {
      colors: {
        "primary-dark": "#23285A",
        "secondary-dark": "#FBFF27",
        "primary-light": "#F6EBD7",
        "secondary-light": "#002FFF",
        "brand-gray": "#B4B4C880",
        "card-gray": "rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
