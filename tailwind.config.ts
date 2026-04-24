import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#0F0F0F",
        sand: "#EAD9C8",
        henna: {
          DEFAULT: "#7A3B2E",
          hover: "#8F4B3C",
        },
        gold: "#C8A96A",
        textPrimary: "#F5F5F5",
        textSecondary: "#C4C4C4",
        borderSubtle: "#2A2A2A",
        cardDark: "#151515",
        overlay: "rgba(0,0,0,0.7)",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["72px", { lineHeight: "1.1", fontWeight: "600" }],
        h2: ["56px", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["40px", { lineHeight: "1.3", fontWeight: "500" }],
        h4: ["28px", { lineHeight: "1.4", fontWeight: "500" }],
        "body-lg": ["20px", { lineHeight: "1.6" }],
        "body-base": ["16px", { lineHeight: "1.7" }],
        caption: ["14px", { lineHeight: "1.5" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
        "5xl": "128px",
      },
      maxWidth: {
        container: "1200px",
        "container-lg": "1440px",
      },
      borderRadius: {
        card: "16px",
        "card-lg": "20px",
        modal: "24px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.4)",
        "card-hover": "0 20px 50px rgba(0,0,0,0.5)",
      },
      transitionTimingFunction: {
        elegant: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        component: "400ms",
        reveal: "600ms",
      },
      screens: {
        sm: "640px",
        md: "641px",
        lg: "1025px",
        xl: "1441px",
      },
      gap: {
        grid: "24px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
