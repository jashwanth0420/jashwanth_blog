"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/animations/gsap.config";
import { socials } from "@/lib/data";

// ─── Nav links ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
] as const;

// ─── GitHub SVG Icon ─────────────────────────────────────────────────────────
function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

// ─── Main Navbar Component ────────────────────────────────────────────────────
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<string>("");
    const navRef = useRef<HTMLElement>(null);

    // ── Scroll-aware opacity / border transition ──────────────────────────────
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ── Active section tracker via IntersectionObserver ──────────────────────
    useEffect(() => {
        const ids = NAV_LINKS.map((l) => l.href.slice(1));
        const observers: IntersectionObserver[] = [];

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveLink(`#${id}`); },
                { threshold: 0.45 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    // ── GSAP entrance animation ───────────────────────────────────────────────
    // NOTE: Never animate the scope element itself — it causes the header to
    // start at opacity:0 / translateY(-80px) and can get stuck there in Strict
    // Mode. Instead, stagger-reveal the inner children by their stable IDs.
    useGSAP(() => {
        gsap.from(".nav-anim", {
            y: -24,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.07,
            delay: 0.1,
            clearProps: "opacity,transform",
        });
    }, { scope: navRef, dependencies: [] });

    // ── Smooth-scroll helper ──────────────────────────────────────────────────
    function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        setMenuOpen(false);
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return (
        <header
            ref={navRef}
            role="banner"
            className={[
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle shadow-[0_1px_0_rgba(0,245,212,0.08)]"
                    : "bg-transparent",
            ].join(" ")}
        >
            <nav
                className="content-container flex items-center justify-between h-16 lg:h-18"
                aria-label="Primary navigation"
            >
                {/* ── Logo ─────────────────────────────────────────────────── */}
                <Link
                    href="/"
                    id="nav-logo"
                    aria-label="Jashwanth — Home"
                    className="nav-anim flex items-center gap-2.5 group"
                >
                    <span
                        className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-neon-cyan/50
                       px-1.5 text-[0.65rem] font-semibold font-mono-custom uppercase tracking-[0.12em] text-neon-cyan
                       transition-all duration-300 group-hover:border-neon-cyan group-hover:shadow-neon-cyan-sm"
                    >
                        JS
                    </span>
                    <span
                        className="font-display text-lg font-bold tracking-[0.01em] text-text-primary
                       transition-colors duration-300 group-hover:text-neon-cyan"
                    >
                        Jashwanth
                    </span>
                </Link>

                {/* ── Desktop links ─────────────────────────────────────────── */}
                <ul
                    className="hidden md:flex items-center gap-1"
                    role="list"
                >
                    {NAV_LINKS.map(({ label, href }) => {
                        const isActive = activeLink === href;
                        return (
                            <li key={href}>
                                <a
                                    id={`nav-link-${label.toLowerCase()}`}
                                    href={href}
                                    onClick={(e) => handleNavClick(e, href)}
                                    aria-current={isActive ? "page" : undefined}
                                    className={[
                                        "nav-anim relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg",
                                        "transition-all duration-300 group",
                                        isActive
                                            ? "text-neon-cyan"
                                            : "text-text-secondary hover:text-text-primary",
                                    ].join(" ")}
                                >
                                    {label}
                                    {/* Active / hover underline pill */}
                                    <span
                                        className={[
                                            "absolute bottom-0.5 left-4 right-4 h-px rounded-full",
                                            "bg-neon-cyan transition-all duration-300",
                                            isActive
                                                ? "opacity-100 shadow-neon-cyan-sm"
                                                : "opacity-0 group-hover:opacity-40",
                                        ].join(" ")}
                                        aria-hidden="true"
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* ── Right-side actions ────────────────────────────────────── */}
                <div className="hidden md:flex items-center gap-3">
                    {/* GitHub link */}
                    <a
                        id="nav-github-link"
                        href={socials.github || "#"}
                        target={socials.github ? "_blank" : undefined}
                        rel={socials.github ? "noopener noreferrer" : undefined}
                        aria-label="GitHub profile"
                        className="nav-anim p-2 text-text-secondary hover:text-neon-cyan rounded-lg
                       hover:bg-white/5 transition-all duration-300"
                    >
                        <GitHubIcon className="w-5 h-5" />
                    </a>

                    {/* Hire Me CTA */}
                    <a
                        id="nav-hire-cta"
                        href="#contact"
                        onClick={(e) => handleNavClick(e, "#contact")}
                        className="nav-anim px-4 py-1.5 text-sm font-semibold font-display
                       border border-neon-cyan text-neon-cyan rounded-lg
                       hover:bg-neon-cyan hover:text-bg-primary
                       transition-all duration-300 hover:shadow-neon-cyan-sm"
                    >
                        Hire Me
                    </a>
                </div>

                {/* ── Mobile hamburger ──────────────────────────────────────── */}
                <button
                    id="nav-mobile-menu-button"
                    type="button"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    className="md:hidden p-2 text-text-secondary hover:text-neon-cyan
                     rounded-lg hover:bg-white/5 transition-all duration-300"
                    onClick={() => setMenuOpen((v) => !v)}
                >
                    <span className="block w-5 h-0.5 bg-current mb-1.5 transition-transform duration-300"
                        style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
                    <span className="block w-5 h-0.5 bg-current mb-1.5 transition-opacity duration-300"
                        style={{ opacity: menuOpen ? 0 : 1 }} />
                    <span className="block w-5 h-0.5 bg-current transition-transform duration-300"
                        style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
                </button>
            </nav>

            {/* ── Mobile dropdown menu ──────────────────────────────────────── */}
            <div
                id="mobile-menu"
                role="navigation"
                aria-label="Mobile navigation"
                className={[
                    "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
                    "bg-bg-primary/95 backdrop-blur-xl border-b border-border-subtle",
                    menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
                ].join(" ")}
            >
                <ul className="content-container py-4 flex flex-col gap-1" role="list">
                    {NAV_LINKS.map(({ label, href }) => (
                        <li key={href}>
                            <a
                                href={href}
                                onClick={(e) => handleNavClick(e, href)}
                                className="block px-4 py-3 text-sm font-medium text-text-secondary
                           hover:text-neon-cyan hover:bg-white/5 rounded-lg
                           transition-all duration-200"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                    <li className="pt-2 border-t border-border-subtle mt-2">
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, "#contact")}
                            className="block px-4 py-3 text-sm font-semibold text-neon-cyan
                         hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                            Hire Me →
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
