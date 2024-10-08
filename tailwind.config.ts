import type { Config } from "tailwindcss";

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
        "physical-gradient":
          "linear-gradient(90deg, #999999, var(--tw-gradient-stops))",
        "special-gradient":
          "linear-gradient(90deg, #447BFF, var(--tw-gradient-stops))",
        "status-gradient":
          "linear-gradient(90deg, #FF4444, var(--tw-gradient-stops))",
      },
      boxShadow: {
        bottom: "0 5px 10px 2px rgba(0, 0, 0, 0.3)",
        top: "0 -5px 10px 2px rgba(0, 0, 0, 0.3)",
        border: "0px 0px 10px 0px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        spin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
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
        shake: {
          "0%": { transform: "translateX(0px) rotate(0deg)" },
          "25%": { transform: "translateX(5px) rotate(20deg)" },
          "50%": { transform: "translateX(-5px) rotate(-20deg)" },
          "75%": { transform: "translateX(5px) rotate(20deg)" },
          "100%": { transform: "translateX(0px) rotate(0deg)" },
        },
        pulse: {
          "0%": {
            backgroundColor: "rgb(255,255,255)",
          },
          "50%": {
            backgroundColor: "rgb(255, 127, 127)",
          },
          "100%": {
            backgroundColor: "rgb(255,255,255)",
          },
        },
      },
      animation: {
        "pokeball-pulse": "pulse 1s forwards ease-out infinite",
        "pokeball-shake": "shake 1s forwards ease-in-out infinite",
        "spin-icon": "spin 1s forwards linear infinite",
        "move-ball": "move 2s ease-in-out 1",
        "show-ball": "show 1s forwards ease-in-out",
        "move-gradient": "moveGradient forwards 1s linear 1",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".no-tap-highlight": {
          "-webkit-tap-highlight-color": "transparent",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
  future: { hoverOnlyWhenSupported: true },
};
export default config;
