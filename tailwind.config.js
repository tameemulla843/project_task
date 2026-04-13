/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "hsl(var(--bg-primary))",
          secondary: "hsl(var(--bg-secondary))",
          card: "hsl(var(--bg-card))",
          column: "hsl(var(--bg-column))",
        },
        text: {
          primary: "hsl(var(--text-primary))",
          secondary: "hsl(var(--text-secondary))",
          muted: "hsl(var(--text-muted))",
        },
        border: {
          DEFAULT: "hsl(var(--border-color))",
        },
        accent: {
          blue: "hsl(var(--accent-blue))",
          "blue-light": "hsl(var(--accent-blue-light))",
          green: "hsl(var(--accent-green))",
          "green-light": "hsl(var(--accent-green-light))",
          orange: "hsl(var(--accent-orange))",
          "orange-light": "hsl(var(--accent-orange-light))",
          red: "hsl(var(--accent-red))",
          "red-light": "hsl(var(--accent-red-light))",
          purple: "hsl(var(--accent-purple))",
          "purple-light": "hsl(var(--accent-purple-light))",
        },
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
};