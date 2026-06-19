import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        gray: {
          // Darkened from #8d8d8d (~3.3:1, fails WCAG AA) to ~5.3:1 to pass AA
          text: "#6b6b6b",
        },
      },
      maxWidth: {
        'portfolio': '1440px',
      },
    },
  },
  plugins: [],
};
export default config;

