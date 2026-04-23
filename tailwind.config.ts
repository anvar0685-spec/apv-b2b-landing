import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--neutral-950)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        surface: "var(--surface)",
      },
      maxWidth: {
        content: "1280px",
        hero: "1440px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
