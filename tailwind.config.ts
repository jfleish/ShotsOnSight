import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["'Impact'", "'Arial Black'", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Team colors
        team: {
          home: "hsl(var(--team-home))",
          "home-muted": "hsl(var(--team-home-muted))",
          away: "hsl(var(--team-away))",
          "away-muted": "hsl(var(--team-away-muted))",
        },
        // Drink tier colors
        drink: {
          sip: "hsl(var(--drink-sip))",
          shot: "hsl(var(--drink-shot))",
          shotgun: "hsl(var(--drink-shotgun))",
        },
        // Win probability
        win: {
          positive: "hsl(var(--win-positive))",
          negative: "hsl(var(--win-negative))",
          neutral: "hsl(var(--win-neutral))",
        },
        // Chart colors
        chart: {
          home: "hsl(var(--chart-home))",
          away: "hsl(var(--chart-away))",
          grid: "hsl(var(--chart-grid))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px hsl(var(--primary) / 0.4)",
          },
          "50%": {
            opacity: "0.8",
            boxShadow: "0 0 40px hsl(var(--primary) / 0.6)",
          },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "number-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "alert-slide-in": {
          "0%": { transform: "translateY(-100%) scale(0.8)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        "number-pop": "number-pop 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out forwards",
        "alert-in": "alert-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "gradient-alert": "var(--gradient-alert)",
        "gradient-shotgun": "var(--gradient-shotgun)",
        "gradient-win": "var(--gradient-win)",
        "gradient-fire": "var(--gradient-fire)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
