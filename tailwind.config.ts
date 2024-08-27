import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "no-offset-light": "0px 0px 35px rgba(0, 0, 0, 0.25)",
        "no-offset-dark": "0px 0px 35px rgba(255, 255, 255, 0.25)",
      },

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
        show: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "0.05",
          },
        },
        moveGradient: {
          "0%": { transform: "translateX(-100%) translateY(-100%)" },
          "100%": { transform: "translateX(100%) translateY(100%)" },
        },
      },
      animation: {
        "move-ball": "move 2s ease-in-out 1",
        "show-ball": "show 1s forwards ease-in-out",
        "move-gradient": "moveGradient forwards 1s linear 1",
      },
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
};
export default config;
