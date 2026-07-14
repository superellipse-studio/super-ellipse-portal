import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Space Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        base: "#0a0a0a",
        panel: "#0e0e0e",
        line: "#262626",
        accent: "#22c55e",
        warn: "#f59e0b",
        sage: "#dae3d8",
      },
    },
  },
  plugins: [],
};
export default config;
