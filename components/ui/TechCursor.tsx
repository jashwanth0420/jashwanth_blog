"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/gsap.config";

// ─── Selectors that trigger hover expansion ───────────────────────────────────
const HOVER_SELECTORS = "a, button, .project-card, .skill-tag";

export default function TechCursor() {
    const dotRef      = useRef<HTMLDivElement>(null);
    const ringRef     = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ── Disable on touch / mobile devices ────────────────────────────────
        if (
            typeof window === "undefined" ||
            window.innerWidth < 768 ||
            window.matchMedia("(pointer: coarse)").matches
        ) {
            return;
        }

        const dot  = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Show cursors once we know JS is running and we're on desktop
        dot.style.opacity  = "1";
        ring.style.opacity = "1";

        // ── GSAP quickTo for near-zero-latency dot tracking ───────────────────
        const moveDotX  = gsap.quickTo(dot,  "x", { duration: 0.1, ease: "none" });
        const moveDotY  = gsap.quickTo(dot,  "y", { duration: 0.1, ease: "none" });
        // Ring lags behind for the "follower" feel
        const moveRingX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
        const moveRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

        // ── Mouse move ────────────────────────────────────────────────────────
        function onMouseMove(e: MouseEvent) {
            moveDotX(e.clientX);
            moveDotY(e.clientY);
            moveRingX(e.clientX);
            moveRingY(e.clientY);
        }

        // ── Hover expand ──────────────────────────────────────────────────────
        function onMouseEnterHoverable() {
            gsap.to(dot, {
                scale: 2.5,
                backgroundColor: "var(--neon-purple)",
                duration: 0.25,
                ease: "power2.out",
            });
            gsap.to(ring, {
                scale: 1.7,
                borderColor: "var(--neon-cyan)",
                boxShadow: "0 0 18px 4px rgba(0,245,212,0.45), 0 0 36px 8px rgba(0,245,212,0.2)",
                duration: 0.3,
                ease: "power2.out",
            });
        }

        function onMouseLeaveHoverable() {
            gsap.to(dot, {
                scale: 1,
                backgroundColor: "var(--neon-cyan)",
                duration: 0.25,
                ease: "power2.out",
            });
            gsap.to(ring, {
                scale: 1,
                borderColor: "var(--neon-purple)",
                boxShadow: "0 0 8px 1px rgba(124,58,237,0.35)",
                duration: 0.3,
                ease: "power2.out",
            });
        }

        // ── Mouse down / up click pulse ───────────────────────────────────────
        function onMouseDown() {
            gsap.to(dot, { scale: 0.7, duration: 0.1, ease: "power2.in" });
            gsap.to(ring, { scale: 0.85, duration: 0.12, ease: "power2.in" });
        }

        function onMouseUp() {
            gsap.to(dot,  { scale: 1, duration: 0.2, ease: "back.out(2)" });
            gsap.to(ring, { scale: 1, duration: 0.2, ease: "back.out(2)" });
        }

        // ── Hide when cursor leaves the window ────────────────────────────────
        function onMouseLeaveWindow() {
            gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        }

        function onMouseEnterWindow() {
            gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
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
                ref={dotRef}
                aria-hidden="true"
                className="tech-cursor-dot"
            />
            {/* Follower ring */}
            <div
                ref={ringRef}
                aria-hidden="true"
                className="tech-cursor-ring"
            />
        </>
    );
}
