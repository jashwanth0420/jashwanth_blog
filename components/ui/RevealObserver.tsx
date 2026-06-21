"use client";

import { useEffect } from "react";

export default function RevealObserver() {
    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        const setupObserver = () => {
            const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
            if (!revealElements.length) return;

            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add("reveal-visible");
                        observer?.unobserve(entry.target);
                    });
                },
                { threshold: 0.15 }
            );

            revealElements.forEach((el) => observer?.observe(el));
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", setupObserver, { once: true });
        } else {
            setupObserver();
        }

        return () => {
            document.removeEventListener("DOMContentLoaded", setupObserver);
            observer?.disconnect();
        };
    }, []);

    return null;
}
