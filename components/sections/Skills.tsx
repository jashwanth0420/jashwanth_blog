"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap.config";
import { skillsData } from "@/lib/data";

export default function Skills() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".skill-card", {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });

            gsap.from(".skill-tag", {
                opacity: 0,
                scale: 0.8,
                stagger: 0.02,
                duration: 0.3,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
            });
        },
        { scope: containerRef, dependencies: [] }
    );

    return (
        <section
            id="skills"
            ref={containerRef}
            className="relative w-full bg-bg-secondary section-padding border-t border-border-subtle"
        >
            <div className="content-container">
                <h2 className="font-display text-4xl font-bold mb-12 text-center">
                    <span className="gradient-text">My Arsenal</span> &amp; Capabilities
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((category, i) => (
                        <div
                            key={i}
                            className="skill-card glass-card rounded-xl2 p-6 transition-all duration-300 hover:border-neon-cyan/50"
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
                                        className="skill-tag px-3 py-1 text-sm rounded-full bg-bg-primary border border-border-subtle text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/50 hover:shadow-neon-cyan-sm transition-all duration-200 cursor-default"
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
