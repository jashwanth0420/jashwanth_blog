"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap.config";
import { projectsData } from "@/lib/data";

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".project-card", {
                opacity: 0,
                y: 60,
                rotationX: 5,
                stagger: 0.15,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
            });
        },
        { scope: containerRef, dependencies: [] }
    );

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative w-full bg-bg-primary section-padding"
        >
            <div className="content-container">
                <h2 className="font-display text-4xl font-bold mb-12 text-center text-text-primary">
                    Select <span className="gradient-text">Operations</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectsData.map((project, i) => (
                        <div
                            key={i}
                            className={`project-card neon-border-card glass-card p-6 md:p-8 flex flex-col justify-between ${project.featured ? "md:col-span-2" : "md:col-span-1"
                                }`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-neon-cyan transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-3">
                                        {project.github !== "#" && (
                                            <a href={project.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-primary transition-colors inline-block hover:scale-110" aria-label="GitHub Repository">
                                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    {project.description}
                                </p>
                            </div>
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
                                    {project.stack.map((tech, j) => (
                                        <span
                                            key={j}
                                            className="font-mono-custom text-xs tracking-wider text-neon-purple uppercase"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
