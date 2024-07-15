import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        bottom: "0 5px 10px 2px rgba(0, 0, 0, 0.3)",
        top: "0 -5px 10px 2px rgba(0, 0, 0, 0.3)",
        border: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        move: {
          "0%": {
            top: "var(--topOld)",
            left: "var(--leftOld)",
            transform: "rotate(0deg)",
          },
          "100%": {
            top: "var(--topNew)",
            left: "var(--leftNew)",
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "move-ball": "move 2s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
export default config;