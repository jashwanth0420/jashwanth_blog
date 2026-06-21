"use client";

import { useEffect, useRef, useState } from "react";

type TimelineItem = {
    role: string;
    organization: string;
    duration: string;
    description: string;
};

const TIMELINE_ITEMS: TimelineItem[] = [
    {
        role: "Backend R&D Engineer",
        organization: "Vlog Innovations",
        duration: "2024-Present",
        description: "Building AI-powered backend systems and researching LLM integration strategies.",
    },
    {
        role: "STEM Tutor & Event Coordinator",
        organization: "Engineering Monk",
        duration: "2024-Present",
        description: "Conducting Python and DSA sessions for 50+ students. Organized Python Codeathon end-to-end.",
    },
    {
        role: "Freelance Full-Stack Developer",
        organization: "",
        duration: "2023-Present",
        description: "Delivering MERN + FastAPI solutions for clients across e-commerce and SaaS domains.",
    },
    {
        role: "B.E. Computer Science",
        organization: "SVCE, Chennai",
        duration: "2022-2026 (Expected)",
        description: "CGPA: 8.33 | Published researcher | Hackathon finalist",
    },
];

export default function Experience() {
    const itemRefs = useRef<Array<HTMLElement | null>>([]);
    const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const idx = Number((entry.target as HTMLElement).dataset.idx);
                    if (entry.isIntersecting && Number.isFinite(idx)) {
                        setVisibleItems((prev) => ({ ...prev, [idx]: true }));
                    }
                });
            },
            {
                threshold: 0.25,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        itemRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="experience"
            className="relative w-full scroll-mt-24 bg-bg-primary section-padding border-t border-border-subtle"
        >
            <div className="content-container">
                <h2 className="font-display text-4xl font-bold mb-12 text-center text-text-primary">
                    Field <span className="gradient-text">Experience</span>
                </h2>

                <div className="relative mx-auto max-w-5xl">
                    <div
                        aria-hidden="true"
                        className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-neon-cyan/70"
                    />

                    <div className="flex flex-col gap-8">
                        {TIMELINE_ITEMS.map((item, i) => {
                            const isVisible = !!visibleItems[i];
                            const isRight = i % 2 !== 0;
                            const orgPrefix = item.organization ? ` - ${item.organization}` : "";

                            return (
                                <article
                                    key={`${item.role}-${i}`}
                                    data-idx={i}
                                    ref={(el) => {
                                        itemRefs.current[i] = el;
                                    }}
                                    className="relative md:grid md:grid-cols-2 md:gap-10"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-6 left-4 md:left-1/2 md:-translate-x-1/2 w-3.5 h-3.5 rounded-full bg-neon-cyan shadow-neon-cyan-sm border border-neon-cyan/80"
                                    />

                                    <div
                                        className={[
                                            "pl-12 md:pl-0",
                                            "md:col-start-1",
                                            isRight ? "md:col-start-2" : "md:col-start-1",
                                        ].join(" ")}
                                    >
                                        <div
                                            className={[
                                                "glass-card border border-border-subtle rounded-2xl p-5",
                                                "transition-all duration-600 ease-out",
                                                "md:max-w-[460px]",
                                                isRight ? "md:mr-0 md:ml-auto" : "md:mr-auto md:ml-0",
                                                isVisible
                                                    ? "opacity-100 translate-x-0"
                                                    : isRight
                                                        ? "opacity-0 translate-y-2 md:translate-x-10"
                                                        : "opacity-0 translate-y-2 md:-translate-x-10",
                                            ].join(" ")}
                                        >
                                            <h3 className="font-display text-xl font-semibold text-text-primary">
                                                {item.role}
                                                <span className="text-text-secondary">{orgPrefix}</span>
                                            </h3>
                                            <p className="mt-1 font-mono-custom text-xs tracking-wider uppercase text-neon-cyan">
                                                {item.duration}
                                            </p>
                                            <p className="mt-3 text-text-secondary leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
