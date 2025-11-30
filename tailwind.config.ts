import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
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
        nhis: {
          blue: "hsl(var(--nhis-blue))",
          "blue-dark": "hsl(var(--nhis-blue-dark))",
          "blue-light": "hsl(var(--nhis-blue-light))",
          green: "hsl(var(--nhis-green))",
          "green-light": "hsl(var(--nhis-green-light))",
          yellow: "hsl(var(--nhis-yellow))",
          "yellow-light": "hsl(var(--nhis-yellow-light))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 102, 179, 0.1)',
        'card': '0 4px 20px rgba(0, 102, 179, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 102, 179, 0.15)',
        'button': '0 4px 14px rgba(0, 102, 179, 0.25)',
        'glow-blue': '0 0 40px rgba(0, 102, 179, 0.3)',
        'glow-green': '0 0 40px rgba(0, 166, 81, 0.3)',
        'glow-yellow': '0 0 40px rgba(247, 179, 43, 0.3)',
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
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 102, 179, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 102, 179, 0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, hsl(207 100% 35%) 0%, hsl(207 100% 25%) 50%, hsl(153 100% 33%) 100%)',
        'card-gradient': 'linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(210 40% 98%) 100%)',
        'accent-gradient': 'linear-gradient(135deg, hsl(40 92% 57%) 0%, hsl(40 92% 70%) 100%)',
        'blue-gradient': 'linear-gradient(135deg, hsl(207 100% 35%) 0%, hsl(207 80% 55%) 100%)',
        'green-gradient': 'linear-gradient(135deg, hsl(153 100% 33%) 0%, hsl(153 70% 45%) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
