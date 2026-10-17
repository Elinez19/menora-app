const color = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: color("background"),
        foreground: color("foreground"),
        card: {
          DEFAULT: color("card"),
          foreground: color("card-foreground"),
        },
        border: color("border"),
        primary: {
          DEFAULT: color("primary"),
          foreground: color("primary-foreground"),
        },
        secondary: {
          DEFAULT: color("secondary"),
          foreground: color("secondary-foreground"),
        },
        accent: {
          DEFAULT: color("accent"),
          foreground: color("accent-foreground"),
        },
        muted: {
          DEFAULT: color("muted"),
          foreground: color("muted-foreground"),
        },
        destructive: {
          DEFAULT: color("destructive"),
          foreground: color("destructive-foreground"),
        },
        success: {
          DEFAULT: color("success"),
          foreground: color("success-foreground"),
        },
        warning: {
          DEFAULT: color("warning"),
          foreground: color("warning-foreground"),
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular"],
        medium: ["Inter_500Medium"],
        semibold: ["Inter_600SemiBold"],
        bold: ["Inter_700Bold"],
      },
      spacing: {
        "screen-sm": "16px",
        screen: "20px",
        "screen-lg": "24px",
        section: "32px",
        control: "48px",
      },
      borderRadius: {
        control: "12px",
        card: "16px",
        "2xl": "16px",
        "3xl": "24px",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
