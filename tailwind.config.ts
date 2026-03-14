import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // ─── Brand Colour Palette ─────────────────────────────────────────
            colors: {
                bg: {
                    primary: "#050816",   // Deep space black — page background
                    secondary: "#080d1c", // Slightly lighter for section alternation
                    card: "#0d1117",      // Card surfaces / panels
                    hover: "#111827",     // Card hover state
                },
                neon: {
                    cyan: "#00f5d4",      // Primary accent
                    "cyan-dim": "#00c4aa",
                    purple: "#7c3aed",    // Secondary accent
                    "purple-dim": "#5b21b6",
                    blue: "#38bdf8",      // Tertiary / link accent
                    "blue-dim": "#0ea5e9",
                },
                text: {
                    primary: "#e2e8f0",   // Main body text
                    secondary: "#94a3b8", // Subdued text / metadata
                    muted: "#475569",     // Placeholders / disabled
                    inverse: "#050816",   // Text on light/neon backgrounds
                },
                border: {
                    subtle: "#1e293b",    // Default border
                    neon: "#00f5d4",      // Glowing border (neon-cyan)
                    purple: "#7c3aed",    // Purple glowing border
                },
            },

            // ─── Typography ───────────────────────────────────────────────────
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
                mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
            },

            // ─── Glow Box Shadows ─────────────────────────────────────────────
            boxShadow: {
                "neon-cyan": "0 0 8px #00f5d4, 0 0 24px #00f5d440, 0 0 48px #00f5d420",
                "neon-cyan-sm": "0 0 4px #00f5d4, 0 0 12px #00f5d440",
                "neon-purple": "0 0 8px #7c3aed, 0 0 24px #7c3aed40, 0 0 48px #7c3aed20",
                "neon-purple-sm": "0 0 4px #7c3aed, 0 0 12px #7c3aed40",
                "neon-blue": "0 0 8px #38bdf8, 0 0 20px #38bdf840",
                "card-glow": "0 4px 24px rgba(0, 245, 212, 0.08), 0 1px 4px rgba(0,0,0,0.4)",
                "card-hover": "0 8px 40px rgba(0, 245, 212, 0.15), 0 2px 8px rgba(0,0,0,0.5)",
                "glass": "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            },

            // ─── Backgrounds / Gradients ──────────────────────────────────────
            backgroundImage: {
                "hero-radial":
                    "radial-gradient(ellipse 120% 80% at 50% -20%, #0d1b4b 0%, #050816 70%)",
                "neon-gradient":
                    "linear-gradient(135deg, #00f5d4, #7c3aed)",
                "card-gradient":
                    "linear-gradient(145deg, #0d1117, #111827)",
                "border-glow":
                    "linear-gradient(135deg, #00f5d4 0%, #7c3aed 100%)",
            },

            // ─── Animations ───────────────────────────────────────────────────
            keyframes: {
                "pulse-glow": {
                    "0%, 100%": { opacity: "1", filter: "brightness(1)" },
                    "50%": { opacity: "0.7", filter: "brightness(1.3)" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                "shimmer": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "fade-up": {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "scan-line": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100vh)" },
                },
                "border-spin": {
                    "0%": { "--border-angle": "0deg" },
                    "100%": { "--border-angle": "360deg" },
                },
            },
            animation: {
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "float": "float 4s ease-in-out infinite",
                "shimmer": "shimmer 2.5s linear infinite",
                "fade-up": "fade-up 0.6s ease-out both",
                "scan-line": "scan-line 4s linear infinite",
            },

            // ─── Spacing & Sizing ─────────────────────────────────────────────
            spacing: {
                "18": "4.5rem",
                "22": "5.5rem",
                "88": "22rem",
                "128": "32rem",
            },

            // ─── Border Radius ────────────────────────────────────────────────
            borderRadius: {
                "xl2": "1rem",
                "xl3": "1.5rem",
            },

            // ─── Backdrop Blur ────────────────────────────────────────────────
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};

export default config;
