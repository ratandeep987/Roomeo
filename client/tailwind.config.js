/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Roomeo design tokens — a boutique-hotel palette: deep ink navy,
        // a brass key-fob accent, warm ivory paper. Deliberately not the
        // cream+terracotta default.
        ink: {
          DEFAULT: "#13203A",
          50: "#EEF1F6",
          100: "#D6DCE8",
          200: "#AEB9CE",
          300: "#8593B0",
          400: "#5C6D92",
          500: "#3C4D71",
          600: "#28375A",
          700: "#1C2A47",
          800: "#13203A",
          900: "#0B1526",
        },
        brass: {
          DEFAULT: "#B8935A",
          50: "#FBF6ED",
          100: "#F3E5C8",
          200: "#E7CC9B",
          300: "#DAB36E",
          400: "#C9A24B",
          500: "#B8935A",
          600: "#9C7742",
          700: "#7A5D34",
          800: "#584327",
          900: "#3A2C19",
        },
        paper: "#FBF9F4",
        sage: {
          DEFAULT: "#4C7A5D",
          100: "#E1EBE3",
          500: "#4C7A5D",
          700: "#33543F",
        },
        rust: {
          DEFAULT: "#A6432F",
          100: "#F3DCD6",
          500: "#A6432F",
          700: "#7A2F20",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        tag: "4px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(19,32,58,0.06), 0 8px 24px -12px rgba(19,32,58,0.18)",
        lift: "0 12px 32px -12px rgba(19,32,58,0.28)",
      },
    },
  },
  plugins: [],
};
