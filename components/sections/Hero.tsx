"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { personal } from "@/lib/data";

type TypingPhase = "typing" | "pausing" | "deleting";

function useTerminalTypewriter(lines: string[]) {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [phase, setPhase] = useState<TypingPhase>("typing");

    const activeLine = useMemo(() => lines[lineIndex] ?? "", [lines, lineIndex]);

    useEffect(() => {
        if (!lines.length) return;

        let delay = 60;

        if (phase === "typing") {
            if (charIndex < activeLine.length) {
                delay = 60;
            } else {
                delay = 2000;
            }
        }

        if (phase === "deleting") {
            delay = 35;
        }

        const timer = window.setTimeout(() => {
            if (phase === "typing") {
                if (charIndex < activeLine.length) {
                    setCharIndex((c) => c + 1);
                } else {
                    setPhase("pausing");
                }
                return;
            }

            if (phase === "pausing") {
                setPhase("deleting");
                return;
            }

            if (charIndex > 0) {
                setCharIndex((c) => c - 1);
            } else {
                setLineIndex((prev) => (prev + 1) % lines.length);
                setPhase("typing");
            }
        }, delay);

        return () => window.clearTimeout(timer);
    }, [activeLine.length, charIndex, lines.length, phase]);

    return activeLine.slice(0, charIndex);
}

interface CtaButtonProps {
    href: string;
    id: string;
    variant: "solid" | "ghost";
    children: React.ReactNode;
    external?: boolean;
}

function CtaButton({ href, id, variant, children, external = false }: CtaButtonProps) {
    const base =
        "inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

    const solid =
        "bg-white text-black hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98]";

    const ghost =
        "border border-white/20 text-white hover:border-white hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98]";

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

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
};

function HeroParticleCanvas({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const particleCount = 60;
        const maxLinkDistance = 120;
        const cursorInfluenceRadius = 140;
        const accentRgb = "56, 189, 248";
        const cursor = { x: 0, y: 0, active: false };

        let width = 0;
        let height = 0;
        let rafId = 0;

        const particles: Particle[] = [];

        const randomVelocity = () => (Math.random() - 0.5) * 0.45;

        const initParticles = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i += 1) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: randomVelocity(),
                    vy: randomVelocity(),
                });
            }
        };

        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.max(1, Math.floor(width * dpr));
            canvas.height = Math.max(1, Math.floor(height * dpr));
            canvas.style.width = `${Math.floor(width)}px`;
            canvas.style.height = `${Math.floor(height)}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initParticles();
        };

        const drawFrame = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i += 1) {
                const p = particles[i];

                if (cursor.active) {
                    const dx = cursor.x - p.x;
                    const dy = cursor.y - p.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq > 0 && distSq < cursorInfluenceRadius * cursorInfluenceRadius) {
                        const force = (1 - Math.sqrt(distSq) / cursorInfluenceRadius) * 0.02;
                        p.vx += dx * force * 0.01;
                        p.vy += dy * force * 0.01;
                    }
                }

                p.x += p.vx;
                p.y += p.vy;

                p.vx *= 0.992;
                p.vy *= 0.992;

                if (Math.abs(p.vx) < 0.02) p.vx += randomVelocity() * 0.08;
                if (Math.abs(p.vy) < 0.02) p.vy += randomVelocity() * 0.08;

                if (p.x < 0 || p.x > width) {
                    p.vx *= -1;
                    p.x = Math.max(0, Math.min(width, p.x));
                }
                if (p.y < 0 || p.y > height) {
                    p.vy *= -1;
                    p.y = Math.max(0, Math.min(height, p.y));
                }
            }

            for (let i = 0; i < particles.length; i += 1) {
                const p1 = particles[i];

                for (let j = i + 1; j < particles.length; j += 1) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist <= maxLinkDistance) {
                        const alpha = (1 - dist / maxLinkDistance) * 0.18;
                        ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            ctx.fillStyle = `rgba(${accentRgb}, 0.3)`;
            for (let i = 0; i < particles.length; i += 1) {
                const p = particles[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
                ctx.fill();
            }

            rafId = window.requestAnimationFrame(drawFrame);
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            cursor.x = e.clientX - rect.left;
            cursor.y = e.clientY - rect.top;
            cursor.active = true;
        };

        const onMouseLeave = () => {
            cursor.active = false;
        };

        resizeCanvas();
        drawFrame();

        window.addEventListener("resize", resizeCanvas);
        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseleave", onMouseLeave);

        return () => {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resizeCanvas);
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [containerRef]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const roles = useMemo(
        () => [
            "> AI Systems Engineer",
            "> LangChain & RAG Architect",
            "> MERN Stack Developer",
            "> Backend R&D @ Vlog Innovations",
        ],
        []
    );
    const typed = useTerminalTypewriter(roles);

    return (
        <section
            id="hero"
            ref={sectionRef}
            aria-label="Hero — Introduction"
            className="relative overflow-hidden flex min-h-screen items-center justify-center px-6 pt-24 pb-16 bg-transparent text-center"
        >
            <HeroParticleCanvas containerRef={sectionRef} />
            <div className="relative z-10 flex max-w-5xl flex-col items-center gap-6">
                <span className="font-mono-custom text-sm tracking-widest text-slate-400 uppercase">
                    {`< ${personal.headline} />`}
                </span>

                <h1 className="font-display font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white">
                    {personal.tagline}
                </h1>

                <p className="max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
                    I engineer intelligent full-stack systems at the intersection of{" "}
                    <span className="text-white font-medium">backend engineering</span>,{" "}
                    <span className="text-white font-medium">applied machine learning</span>, and{" "}
                    <span className="text-white font-medium">AI architecture</span> - designing scalable
                    systems ready for real-world deployment.
                </p>

                <div className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-[#0f1117] text-left shadow-[0_16px_48px_rgba(2,6,23,0.28)] overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/70 bg-[#121521]">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
                        <span className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
                    </div>
                    <div className="px-5 py-6 sm:px-6 sm:py-8 min-h-[110px] flex items-center">
                        <p
                            className="terminal-mono text-sm sm:text-base text-[#d1d5db] break-words"
                            aria-live="polite"
                            aria-label={`Current role line: ${typed}`}
                        >
                            {typed}
                            <span aria-hidden="true" className="terminal-cursor" />
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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
            </div>
        </section>
    );
}
