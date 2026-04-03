"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/gsap.config";

// ─── Selectors that trigger hover expansion ───────────────────────────────────
const HOVER_SELECTORS = "a, button, .project-card, .skill-tag";

export default function TechCursor() {
    const coreRef = useRef<HTMLDivElement>(null);
    const haloRef = useRef<HTMLDivElement>(null);
    const radarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ── Disable on touch / mobile devices ────────────────────────────────
        if (
            typeof window === "undefined" ||
            window.innerWidth < 768 ||
            window.matchMedia("(pointer: coarse)").matches
        ) {
            return;
        }

        const core = coreRef.current;
        const halo = haloRef.current;
        const radar = radarRef.current;
        if (!core || !halo || !radar) return;

        // Show cursors once we know JS is running and we're on desktop
        core.style.opacity = "1";
        halo.style.opacity = "1";
        radar.style.opacity = "1";

        // ── GSAP quickTo for near-zero-latency dot tracking ───────────────────
        const moveCoreX = gsap.quickTo(core, "x", { duration: 0.08, ease: "none" });
        const moveCoreY = gsap.quickTo(core, "y", { duration: 0.08, ease: "none" });
        const moveHaloX = gsap.quickTo(halo, "x", { duration: 0.34, ease: "power3.out" });
        const moveHaloY = gsap.quickTo(halo, "y", { duration: 0.34, ease: "power3.out" });
        const moveRadarX = gsap.quickTo(radar, "x", { duration: 0.56, ease: "power3.out" });
        const moveRadarY = gsap.quickTo(radar, "y", { duration: 0.56, ease: "power3.out" });

        gsap.to(radar, {
            rotate: 360,
            duration: 3.2,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
        });

        // ── Mouse move ────────────────────────────────────────────────────────
        function onMouseMove(e: MouseEvent) {
            moveCoreX(e.clientX);
            moveCoreY(e.clientY);
            moveHaloX(e.clientX);
            moveHaloY(e.clientY);
            moveRadarX(e.clientX);
            moveRadarY(e.clientY);
        }

        // ── Hover expand ──────────────────────────────────────────────────────
        function onMouseEnterHoverable() {
            gsap.to(core, {
                scale: 1.35,
                duration: 0.2,
                ease: "power2.out",
            });
            gsap.to(halo, {
                scale: 1.22,
                borderColor: "var(--neon-cyan)",
                boxShadow: "0 0 24px 5px rgba(0,245,212,0.25), inset 0 0 16px rgba(0,245,212,0.18)",
                duration: 0.25,
                ease: "power2.out",
            });
            gsap.to(radar, {
                scale: 1.26,
                opacity: 0.95,
                duration: 0.25,
                ease: "power2.out",
            });
        }

        function onMouseLeaveHoverable() {
            gsap.to(core, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
            });
            gsap.to(halo, {
                scale: 1,
                borderColor: "rgba(var(--neon-cyan-rgb), 0.72)",
                boxShadow: "0 0 12px 2px rgba(0,245,212,0.2), inset 0 0 10px rgba(56,189,248,0.15)",
                duration: 0.25,
                ease: "power2.out",
            });
            gsap.to(radar, {
                scale: 1,
                opacity: 0.7,
                duration: 0.25,
                ease: "power2.out",
            });
        }

        // ── Mouse down / up click pulse ───────────────────────────────────────
        function onMouseDown() {
            gsap.to(core, { scale: 0.76, duration: 0.1, ease: "power2.in" });
            gsap.to(halo, { scale: 0.9, duration: 0.12, ease: "power2.in" });
            gsap.to(radar, { scale: 0.88, duration: 0.12, ease: "power2.in" });
        }

        function onMouseUp() {
            gsap.to(core, { scale: 1, duration: 0.22, ease: "back.out(2)" });
            gsap.to(halo, { scale: 1, duration: 0.22, ease: "back.out(2)" });
            gsap.to(radar, { scale: 1, duration: 0.22, ease: "back.out(2)" });
        }

        // ── Hide when cursor leaves the window ────────────────────────────────
        function onMouseLeaveWindow() {
            gsap.to([core, halo, radar], { opacity: 0, duration: 0.2 });
        }

        function onMouseEnterWindow() {
            gsap.to([core, halo, radar], { opacity: 1, duration: 0.2 });
        }

        // ── Attach events ─────────────────────────────────────────────────────
        window.addEventListener("mousemove",  onMouseMove,       { passive: true });
        window.addEventListener("mousedown",  onMouseDown);
        window.addEventListener("mouseup",    onMouseUp);
        document.documentElement.addEventListener("mouseleave", onMouseLeaveWindow);
        document.documentElement.addEventListener("mouseenter", onMouseEnterWindow);

        // Delegate hover events via document-level listeners
        function onDelegatedEnter(e: MouseEvent) {
            if ((e.target as Element).closest(HOVER_SELECTORS)) {
                onMouseEnterHoverable();
            }
        }
        function onDelegatedLeave(e: MouseEvent) {
            if ((e.target as Element).closest(HOVER_SELECTORS)) {
                onMouseLeaveHoverable();
            }
        }

        document.addEventListener("mouseover",  onDelegatedEnter, { passive: true });
        document.addEventListener("mouseout",   onDelegatedLeave, { passive: true });

        // ── Cleanup ───────────────────────────────────────────────────────────
        return () => {
            window.removeEventListener("mousemove",  onMouseMove);
            window.removeEventListener("mousedown",  onMouseDown);
            window.removeEventListener("mouseup",    onMouseUp);
            document.documentElement.removeEventListener("mouseleave", onMouseLeaveWindow);
            document.documentElement.removeEventListener("mouseenter", onMouseEnterWindow);
            document.removeEventListener("mouseover",  onDelegatedEnter);
            document.removeEventListener("mouseout",   onDelegatedLeave);
        };
    }, []);

    return (
        <>
            {/* Primary dot */}
            <div
                ref={coreRef}
                aria-hidden="true"
                className="tech-cursor-core"
            />
            {/* Follower ring */}
            <div
                ref={haloRef}
                aria-hidden="true"
                className="tech-cursor-halo"
            />
            <div
                ref={radarRef}
                aria-hidden="true"
                className="tech-cursor-radar"
            />
        </>
    );
}
