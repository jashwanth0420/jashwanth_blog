"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/animations/gsap.config";

// ─── Icons ──────────────────────────────────────────────────────────────────
const ICONS = {
    Home: (className: string) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="m5 3 3 3" />
            <path d="m5 21 3-3" />
            <path d="m21 3-3 3" />
            <path d="m21 21-3-3" />
        </svg>
    ),
    Services: (className: string) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    ),
    About: (className: string) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
    )
};

// ─── Nav links mapping to image content ─────────────────────────────────────
const NAV_LINKS = [
    { label: "Home", href: "#hero", icon: "Home" },
    { label: "Services", href: "#projects", icon: "Services" },
    { label: "About", href: "#about", icon: "About" },
] as const;

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState<string>("#hero");
    const navRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // ── Scroll detection ──────────────────────────────────────────────────────
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ── Active section tracker ────────────────────────────────────────────────
    useEffect(() => {
        const ids = NAV_LINKS.map((l) => l.href.slice(1)).filter(id => id);
        const observers: IntersectionObserver[] = [];

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { 
                    if (entry.isIntersecting) setActiveLink(`#${id}`); 
                },
                {
                    threshold: 0.5,
                    rootMargin: "-20% 0px -50% 0px",
                }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    // ── GSAP Entrance Animation ──────────────────────────────────────────────
    useGSAP(() => {
        gsap.from(containerRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            delay: 0.2,
            clearProps: "all",
        });

        gsap.from(".nav-item", {
            opacity: 0,
            scale: 0.9,
            y: 10,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.4,
            clearProps: "all",
        });
    }, { scope: navRef });

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header
            ref={navRef}
            className="fixed top-8 inset-x-0 z-[100] flex justify-center px-6 pointer-events-none"
        >
            <div
                ref={containerRef}
                className={`
                    pointer-events-auto relative flex items-center p-1.5 
                    bg-slate-900/90 backdrop-blur-3xl border border-white/20
                    rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.05)] transition-all duration-500
                    ${scrolled ? "bg-slate-950/95 scale-95" : "scale-100"}
                `}
            >
                {/* Grainy texture overlay */}
                <div className="absolute inset-0 rounded-[2rem] opacity-[0.05] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

                {/* Subtle bottom glow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm" />

                <nav className="flex items-center gap-1">
                    {NAV_LINKS.map(({ label, href, icon }) => {
                        const isActive = activeLink === href;
                        const Icon = ICONS[icon as keyof typeof ICONS];

                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={(e) => handleNavClick(e, href)}
                                className={`
                                    nav-item relative flex items-center gap-3 px-6 py-2.5 rounded-full 
                                    transition-all duration-500 group overflow-hidden
                                    ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}
                                `}
                            >
                                {/* Active background pill */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-white/10 border border-white/5 shadow-inner" />
                                )}

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <span className={`
                                    relative z-10 p-1 rounded-md transition-transform duration-300
                                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                                `}>
                                    {Icon("w-4.5 h-4.5")}
                                </span>
                                
                                <span className="relative z-10 font-sans text-sm font-semibold tracking-tight">
                                    {label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
