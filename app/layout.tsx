import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import EmbeddingDustField from "@/components/ui/EmbeddingDustField";
import RevealObserver from "@/components/ui/RevealObserver";
import LiquidEther from "@/components/LiquidEther";
import "./globals.css";

// ─── Font Configuration ────────────────────────────────────────────────────
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
    weight: ["300", "400", "500", "600", "700"],
});

// ─── SEO Metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: {
        default: "Jashwanth | AI Systems Engineer & MERN Developer",
        template: "%s | Jashwanth",
    },
    description:
        "Portfolio of Jashwanth — AI Systems Engineer specializing in RAG architecture, MERN stack, autonomous AI agents, and LLM-powered applications. Top 5 Finalist at Neuro Nexus Hackathon 2024.",
    keywords: [
        "AI Systems Engineer",
        "MERN Stack Developer",
        "RAG Architecture",
        "LLM",
        "Full Stack Developer",
        "Next.js",
        "Machine Learning",
        "AI Agent",
        "Portfolio",
    ],
    authors: [{ name: "Jashwanth" }],
    creator: "Jashwanth",
    openGraph: {
        type: "website",
        locale: "en_US",
        title: "Jashwanth | AI Systems Engineer & MERN Developer",
        description:
            "Building systems that reason, retrieve, and respond. AI Systems Engineer specializing in RAG, MERN, and autonomous AI agents.",
        siteName: "Jashwanth Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Jashwanth | AI Systems Engineer & MERN Developer",
        description:
            "Building systems that reason, retrieve, and respond. Portfolio of Jashwanth — AI engineer & MERN developer.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

// ─── Root Layout ───────────────────────────────────────────────────────────
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const themeInitScript = `
        (function () {
            try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = (stored === 'light' || stored === 'dark') ? stored : (prefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.colorScheme = theme;
            } catch (e) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.documentElement.style.colorScheme = 'dark';
            }
        })();
    `;

    return (
        <html
            lang="en"
            className={`dark ${inter.variable} ${spaceGrotesk.variable} ${GeistMono.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
            </head>
            <body className="relative bg-black text-text-primary font-sans antialiased">
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
                    <LiquidEther
                        colors={['#5227FF', '#FF9FFC', '#B497CF']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>
                <EmbeddingDustField />
                <div className="relative z-10">
                    <SmoothCursor />
                    <RevealObserver />
                    {children}
                </div>
            </body>
        </html>
    );
}
