/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        /* Logo-inspired brand tokens */
        crystal: {
          blue: "var(--crystal-blue)",
          "blue-light": "var(--crystal-blue-light)",
          "blue-dark": "var(--crystal-blue-dark)",
        },
        moon: {
          cream: "var(--moon-cream)",
          "cream-dark": "var(--moon-cream-dark)",
        },
        sparkle: {
          peach: "var(--sparkle-peach)",
          rose: "var(--sparkle-rose)",
        },
        navy: "var(--deep-navy)",
        leaf: "var(--leaf-green)",
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Cormorant Garamond', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        crystal: "12px",
        moon: "50%",
      },
      boxShadow: {
        crystal: "0 4px 24px oklch(52% 0.12 230 / 0.12)",
        "crystal-lg": "0 8px 40px oklch(52% 0.12 230 / 0.18)",
        glow: "0 0 20px oklch(52% 0.12 230 / 0.25)",
        "glow-peach": "0 0 20px oklch(78% 0.08 30 / 0.3)",
      },
      backgroundImage: {
        "crystal-gradient": "linear-gradient(135deg, oklch(97% 0.008 80) 0%, oklch(93% 0.02 220) 50%, oklch(97% 0.008 80) 100%)",
        "moon-gradient": "linear-gradient(180deg, oklch(97% 0.008 80) 0%, oklch(94% 0.018 220) 100%)",
        "blue-shimmer": "linear-gradient(135deg, oklch(52% 0.12 230), oklch(65% 0.14 220), oklch(52% 0.12 230))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 4s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
