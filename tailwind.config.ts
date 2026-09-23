import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-black warm base — never pure #000.
        base: {
          DEFAULT: "#0B0B0D",
          soft: "#0F0F12",
          panel: "#141418",
          border: "#22222A",
        },
        ink: {
          DEFAULT: "#F5F5F4",
          muted: "#A8A8AD",
          faint: "#6E6E76",
        },
        // Single warm accent — amber/gold. Used sparingly.
        accent: {
          DEFAULT: "#FFB020",
          soft: "#FFC24B",
          deep: "#F59E0B",
          glow: "rgba(255, 176, 32, 0.16)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,176,32,0.12), 0 20px 60px -20px rgba(255,176,32,0.25)",
        panel: "0 24px 80px -40px rgba(0,0,0,0.9)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 1.8s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
