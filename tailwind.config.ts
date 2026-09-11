import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          navy: {
            DEFAULT: "#0F2C59",
            50: "#f0f4fa",
            100: "#d9e3f3",
            200: "#b3c7e7",
            700: "#13356d",
            800: "#0F2C59",
            900: "#0A1E3F",
            950: "#061328",
          },
          red: {
            DEFAULT: "#E53935",
            50: "#fef2f2",
            100: "#fee2e2",
            500: "#E53935",
            600: "#D32F2F",
            700: "#C62828",
            800: "#991B1B",
          },
          gold: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
