"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap.config";
import { skillsData } from "@/lib/data";

export default function Skills() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.to(
                ".skill-card",
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.65,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        once: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

            gsap.to(
                ".skill-tag",
                {
                    opacity: 1,
                    scale: 1,
                    stagger: 0.02,
                    duration: 0.34,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        once: true,
                        invalidateOnRefresh: true,
                    },
                }
            );
        },
        { scope: containerRef, dependencies: [] }
    );

    return (
        <section
            id="skills"
            ref={containerRef}
            className="relative w-full scroll-mt-24 bg-bg-secondary section-padding border-t border-border-subtle"
        >
            <div className="content-container">
                <h2 className="font-display text-4xl font-bold mb-12 text-center">
                    <span className="gradient-text">My Arsenal</span> &amp; Capabilities
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((category, i) => (
                        <div
                            key={i}
                            className="skill-card gsap-fade-init glass-card rounded-2xl p-6 transition-all duration-300 hover:border-neon-cyan/50"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl" aria-hidden="true">
                                    {category.icon}
                                </span>
                                <h3 className="font-display text-xl font-semibold text-text-primary">
                                    {category.category}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, j) => (
                                    <span
                                        key={j}
                                        className="skill-tag gsap-fade-init px-3 py-1 text-sm rounded-full bg-bg-primary border border-border-subtle text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/50 hover:shadow-neon-cyan-sm transition-all duration-200 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
