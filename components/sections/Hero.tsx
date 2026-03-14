"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/animations/gsap.config";
import { personal } from "@/lib/data";

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
// Cycles through the roles array with a blinking cursor effect.
// Pure React — no GSAP TextPlugin required (avoids Club license dependency).
function useTypewriter(words: string[], speed = 80, pause = 1800) {
    const [displayed, setDisplayed] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!words.length) return;
        const current = words[wordIndex] ?? "";
        if (!current) return;

        const timeout = setTimeout(() => {
            if (!deleting) {
                // Typing forward
                setDisplayed(current.slice(0, charIndex + 1));
                if (charIndex + 1 === current.length) {
                    // Pause at end of word, then start deleting
                    setTimeout(() => setDeleting(true), pause);
                    return;
                }
                setCharIndex((c) => c + 1);
            } else {
                // Deleting backward
                setDisplayed(current.slice(0, charIndex - 1));
                if (charIndex - 1 === 0) {
                    setDeleting(false);
                    setWordIndex((w) => (w + 1) % words.length);
                    setCharIndex(0);
                    return;
                }
                setCharIndex((c) => c - 1);
            }
        }, deleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, wordIndex, words, speed, pause]);

    return displayed;
}

// ─── Neon CTA Button variants ────────────────────────────────────────────────
interface CtaButtonProps {
    href: string;
    id: string;
    variant: "solid" | "ghost";
    children: React.ReactNode;
    external?: boolean;
}

function CtaButton({ href, id, variant, children, external = false }: CtaButtonProps) {
    const base =
        "inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold font-display text-sm tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary";

    const solid =
        "bg-neon-cyan text-bg-primary hover:bg-neon-cyan-dim hover:shadow-neon-cyan hover:scale-[1.03] active:scale-[0.98]";

    const ghost =
        "border border-neon-cyan/50 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-neon-cyan-sm hover:scale-[1.03] active:scale-[0.98]";

    return (
        <a
            id={id}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={`${base} ${variant === "solid" ? solid : ghost}`}
        >
            {children}
        </a>
    );
}

// ─── Background Grid Decoration ──────────────────────────────────────────────
function HeroBackground() {
    return (
        <>
            {/* Deep radial glow behind heading */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                {/* Top-centre blue-purple nebula */}
                <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[800px] h-[600px]
                        rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.18)_0%,transparent_70%)]
                        blur-3xl" />
                {/* Bottom-left cyan glow */}
                <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px]
                        rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,245,212,0.12)_0%,transparent_70%)]
                        blur-3xl" />
                {/* Dot grid overlay */}
                <div className="absolute inset-0 dot-grid-bg opacity-40" />
            </div>
        </>
    );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const role = useTypewriter(personal.roles);

    // ── GSAP stagger entrance ─────────────────────────────────────────────────
    // dependencies: [] ensures the timeline is created exactly once.
    // Without it, useGSAP re-runs on every render (e.g. triggered by the
    // typewriter state updates), producing duplicate overlapping animations.
    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-eyebrow", {
                opacity: 0,
                y: 20,
                duration: 0.6,
            })
                .from(".hero-headline", {
                    opacity: 0,
                    y: 48,
                    duration: 0.85,
                }, "-=0.3")
                .from(".hero-typewriter-row", {
                    opacity: 0,
                    y: 24,
                    duration: 0.6,
                }, "-=0.4")
                .from(".hero-description", {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                }, "-=0.3")
                .from(".hero-cta-group", {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                }, "-=0.3")
                .from(".hero-meta-row", {
                    opacity: 0,
                    duration: 0.5,
                }, "-=0.2");
        },
        { scope: containerRef, dependencies: [] }
    );

    return (
        <section
            id="about"
            ref={containerRef}
            aria-label="Hero — Introduction"
            className="relative flex min-h-screen flex-col items-center justify-center
                 overflow-hidden bg-bg-primary px-6 pt-24 pb-16 text-center"
        >
            <HeroBackground />

            {/* ── Content stack ── */}
            <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6">

                {/* Eyebrow tag */}
                <div className="hero-eyebrow flex items-center gap-3">
                    <span
                        aria-hidden="true"
                        className="h-px w-10 bg-gradient-to-r from-transparent to-neon-cyan"
                    />
                    <span className="font-mono-custom text-sm tracking-widest text-neon-cyan uppercase
                           glow-cyan-text">
                        {`< ${personal.headline} />`}
                    </span>
                    <span
                        aria-hidden="true"
                        className="h-px w-10 bg-gradient-to-l from-transparent to-neon-cyan"
                    />
                </div>

                {/* Main headline */}
                <h1 className="hero-headline font-display font-bold leading-[1.1] tracking-tight
                       text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-text-primary">
                    {personal.tagline}
                </h1>

                {/* Typewriter role row */}
                <div
                    className="hero-typewriter-row flex items-center justify-center gap-3
                     min-h-[2rem] sm:min-h-[2.5rem]"
                    aria-live="polite"
                    aria-label={`Current role: ${role}`}
                >
                    <span className="text-lg sm:text-xl font-medium text-text-secondary font-display">
                        {role}
                    </span>
                    {/* Blinking cursor */}
                    <span
                        aria-hidden="true"
                        className="inline-block w-0.5 h-5 sm:h-6 bg-neon-cyan rounded-full animate-pulse-glow"
                    />
                </div>

                {/* Short description */}
                <p className="hero-description max-w-2xl text-base sm:text-lg text-text-secondary
                      leading-relaxed">
                    I engineer intelligent full-stack systems at the intersection of{" "}
                    <span className="text-text-primary font-medium">backend engineering</span>,{" "}
                    <span className="text-text-primary font-medium">applied machine learning</span>, and{" "}
                    <span className="text-text-primary font-medium">AI architecture</span> — designing scalable
                    systems ready for real-world deployment.
                </p>

                {/* CTA buttons */}
                <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4 pt-2">
                    <CtaButton
                        id="hero-cta-projects"
                        href="#projects"
                        variant="solid"
                    >
                        View My Work
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </CtaButton>

                    <CtaButton
                        id="hero-cta-resume"
                        href="/resume.pdf"
                        variant="ghost"
                        external
                    >
                        Download Resume
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 16v-8m0 8l-3-3m3 3l3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
                        </svg>
                    </CtaButton>
                </div>

                {/* Meta row — achievements / badges */}
                <div className="hero-meta-row flex flex-wrap items-center justify-center gap-x-6 gap-y-2
                        pt-4 text-xs text-text-muted font-mono-custom">
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                        Top 5 Finalist · Neuro Nexus Hackathon 2024
                    </span>
                    <span className="hidden sm:inline text-border-subtle">|</span>
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
                        R&amp;D Student · Engineering Monk
                    </span>
                    <span className="hidden sm:inline text-border-subtle">|</span>
                    <span className="flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
                        {personal.roles.join(" · ")}
                    </span>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                aria-hidden="true"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
                   opacity-40 hover:opacity-80 transition-opacity duration-300"
            >
                <span className="font-mono-custom text-[10px] tracking-widest text-text-muted uppercase">
                    scroll
                </span>
                <div className="w-px h-10 bg-gradient-to-b from-neon-cyan to-transparent animate-pulse" />
            </div>
        </section>
    );
}
