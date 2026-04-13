import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-end Typography Scale
        ink: {
          primary: "#1a1a1a", // The main headings (Deep off-black)
          secondary: "#4a4a4a", // The sub-text (Legible dark grey)
          tertiary: "#7a7a7a", // The tiny metadata (Faint but readable)
          faded: "#a1a1a1", // The super-subtle hints
        },
        surface: {
          soft: "#f9f9fb", // Your background grey
          glass: "rgba(255, 255, 255, 0.7)", // For the floating effects
        },
      },
      // Adding a custom "Glow" utility to lift text
      dropShadow: {
        glow: "0 0 20px rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
