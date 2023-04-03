/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        50: "#1DA1F2",
        100: "#1A8CD8",
      },
      light: {
        50: "#FFFFFF",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
      },
      dark: {
        50: "#4B5563",
        100: "#374151",
        200: "#1F2937",
        300: "#111827",
        400: "#000000",
      },
      gray: {
        50: "#F5F8FA",
        100: "#E1E8ED",
        200: "#AAB8C2",
        300: "#657786",
      },
      red: {
        50: "#EF4444",
        100: "#DC2626",
        200: "#B91C1C",
      },
      green: {
        50: "#22C55E",
        100: "#16A34A",
      },
      yellow: {
        50: "#F59E0B",
        100: "#CA8A04",
      },
      blue: {
        50: "#2563EB",
        100: "#1d4ED8",
      },
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
