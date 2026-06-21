"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type StatConfig = {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;
};

const STATS: StatConfig[] = [
    { value: 5, suffix: "+", label: "Projects Shipped" },
    { value: 5, prefix: "Top ", label: "Hackathon Finish (Neuro Nexus 2024)" },
    { value: 1, label: "Published Research Paper" },
    { value: 8.33, decimals: 2, label: "CGPA at SVCE" },
];

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

function formatValue(value: number, decimals = 0) {
    if (decimals > 0) return value.toFixed(decimals);
    return Math.round(value).toString();
}

export default function StatsBar() {
    const sectionRef = useRef<HTMLElement>(null);
    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;

        const duration = 800;
        let rafId = 0;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const next = Math.min(elapsed / duration, 1);
            setProgress(easeOutCubic(next));
            if (next < 1) {
                rafId = requestAnimationFrame(tick);
            }
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [started]);

    const displayValues = useMemo(
        () =>
            STATS.map((stat) => {
                const current = stat.value * progress;
                const numeric = formatValue(current, stat.decimals ?? 0);
                return `${stat.prefix ?? ""}${numeric}${stat.suffix ?? ""}`;
            }),
        [progress]
    );

    return (
        <section
            id="stats"
            ref={sectionRef}
            className="w-full bg-slate-100/60 border-y border-slate-200/70"
            aria-label="Key portfolio statistics"
        >
            <div className="content-container py-8">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {STATS.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={[
                                "text-center px-4 py-3",
                                i < STATS.length - 1 ? "lg:border-r lg:border-slate-300/80" : "",
                            ].join(" ")}
                        >
                            <p className="text-[30px] leading-none font-bold text-neon-cyan font-display">
                                {displayValues[i]}
                            </p>
                            <p className="mt-2 text-[13px] text-slate-500">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
