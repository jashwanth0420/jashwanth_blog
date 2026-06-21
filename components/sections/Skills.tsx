"use client";

import { useState } from "react";

type FlipSkill = {
    category: string;
    icon: string;
    summary: string;
    tools: string[];
    level: string;
};

const FLIP_SKILLS: FlipSkill[] = [
    {
        category: "AI & ML",
        icon: "🧠",
        summary: "Core of my engineering work",
        tools: ["LangChain", "LangGraph", "RAG", "Vector DBs", "Prompt Engineering"],
        level: "w-[88%]",
    },
    {
        category: "Python Ecosystem",
        icon: "🐍",
        summary: "Primary backend language",
        tools: ["FastAPI", "Python", "Pandas"],
        level: "w-[84%]",
    },
    {
        category: "Full-Stack",
        icon: "⚙️",
        summary: "End-to-end delivery",
        tools: ["React", "Node.js", "Express", "Next.js"],
        level: "w-[82%]",
    },
    {
        category: "Databases",
        icon: "🗄️",
        summary: "Multi-model experience",
        tools: ["PostgreSQL", "MongoDB", "MySQL"],
        level: "w-[79%]",
    },
    {
        category: "Automation",
        icon: "🤖",
        summary: "Workflow orchestration",
        tools: ["n8n", "API integrations"],
        level: "w-[74%]",
    },
    {
        category: "Languages",
        icon: "💻",
        summary: "Polyglot foundations",
        tools: ["Python", "JavaScript", "C", "C++", "Java", "SQL"],
        level: "w-[86%]",
    },
];

export default function Skills() {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const toggleCard = (index: number) => {
        setActiveCard((prev) => (prev === index ? null : index));
    };

    return (
        <section
            id="skills"
            className="relative w-full scroll-mt-24 bg-bg-secondary section-padding border-t border-border-subtle"
        >
            <div className="content-container">
                <h2 className="font-display text-4xl font-bold mb-12 text-center">
                    <span className="gradient-text">My Arsenal</span> &amp; Capabilities
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {FLIP_SKILLS.map((skill, i) => {
                        const isFlipped = activeCard === i;

                        return (
                            <div key={skill.category} className="w-full max-w-[220px] [perspective:1200px]">
                                <button
                                    type="button"
                                    onClick={() => toggleCard(i)}
                                    aria-label={`Flip ${skill.category} card`}
                                    aria-pressed={isFlipped}
                                    className="group relative w-full h-[160px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan rounded-2xl"
                                >
                                    <div
                                        className={[
                                            "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
                                            "group-hover:[transform:rotateY(180deg)]",
                                            isFlipped ? "[transform:rotateY(180deg)]" : "",
                                        ].join(" ")}
                                    >
                                        <div className="absolute inset-0 rounded-2xl glass-card border border-border-subtle p-5 [backface-visibility:hidden] flex flex-col items-center justify-center gap-3">
                                            <span className="text-3xl" aria-hidden="true">
                                                {skill.icon}
                                            </span>
                                            <h3 className="font-display text-lg font-bold text-text-primary text-center">
                                                {skill.category}
                                            </h3>
                                        </div>

                                        <div className="absolute inset-0 rounded-2xl glass-card border border-neon-cyan/40 p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between">
                                            <p className="text-xs text-text-secondary leading-relaxed">
                                                {skill.summary}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {skill.tools.map((tool) => (
                                                    <span
                                                        key={tool}
                                                        className="px-2 py-0.5 text-[10px] rounded-full bg-bg-primary border border-border-subtle text-text-secondary"
                                                    >
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mt-3">
                                                <div className="h-1.5 rounded-full bg-bg-primary border border-border-subtle overflow-hidden">
                                                    <div className={`h-full rounded-full bg-neon-cyan ${skill.level}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
