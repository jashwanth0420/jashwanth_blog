"use client";

import { useEffect, useRef, useState } from "react";

type ProjectCard = {
    id: number;
    title: string;
    shortDescription: string;
    problem: string;
    solution: string;
    outcome: string;
    tech: string[];
    filterTags: string[];
    github: string;
    demo?: string;
};

const FILTERS = ["All", "LangChain", "RAG", "MERN", "Python", "Research", "Hackathon"] as const;
type FilterTag = (typeof FILTERS)[number];

const PROJECTS: ProjectCard[] = [
    {
        id: 1,
        title: "AI Negotiation Agent",
        shortDescription: "Multi-turn autonomous agent using reasoning-driven decision logic.",
        problem: "Business negotiations often need consistent multi-turn reasoning without human micromanagement.",
        solution: "Built an autonomous agent that plans, reasons, and responds across negotiation turns with LLM-guided decision flows.",
        outcome: "Top 5 Finalist - Neuro Nexus Hackathon 2024",
        tech: ["LLMs", "Automation Frameworks"],
        filterTags: ["Hackathon", "Python"],
        github: "https://github.com/Jashwanth",
    },
    {
        id: 2,
        title: "FDA Report Checker",
        shortDescription: "RAG pipeline to validate FDA regulatory documents using LangChain + vector retrieval.",
        problem: "Regulatory teams need a faster way to review dense FDA documents for compliance validation.",
        solution: "Implemented a LangChain-powered RAG workflow with vector retrieval to parse and validate FDA reports.",
        outcome: "Used in production-style compliance review workflows",
        tech: ["LangChain", "RAG", "FastAPI"],
        filterTags: ["LangChain", "RAG", "Python"],
        github: "https://github.com/Jashwanth",
    },
    {
        id: 3,
        title: "DEFENZERO",
        shortDescription: "Ensemble ML pipeline for drug risk classification.",
        problem: "Drug risk signals can be hard to classify reliably from diverse and noisy data points.",
        solution: "Engineered an ensemble ML pipeline and added workflow automation for risk flagging and review.",
        outcome: "Published Research",
        tech: ["ML", "n8n", "Research"],
        filterTags: ["Research", "Python"],
        github: "https://github.com/Jashwanth",
    },
    {
        id: 4,
        title: "JurisMinds",
        shortDescription: "Legal AI chatbot with domain-specific RAG and legal document retrieval.",
        problem: "Legal Q&A requires context-aware retrieval from structured legal sources to avoid generic answers.",
        solution: "Built a legal assistant for iCube-7.0 using domain-tuned RAG, LLM orchestration, and legal doc indexing.",
        outcome: "Hackathon-ready legal assistant for iCube-7.0",
        tech: ["LangChain", "RAG", "FastAPI"],
        filterTags: ["LangChain", "RAG", "Hackathon", "Python"],
        github: "https://github.com/Jashwanth",
    },
    {
        id: 5,
        title: "TrustCart",
        shortDescription: "MERN e-commerce platform with fraud-aware backend architecture.",
        problem: "Modern commerce platforms need secure auth, structured catalog flows, and scalable backend controls.",
        solution: "Delivered a MERN commerce stack with robust backend APIs, authentication, and fraud-aware architecture patterns.",
        outcome: "End-to-end production-style platform delivered",
        tech: ["MERN", "MongoDB", "Node.js", "Express"],
        filterTags: ["MERN"],
        github: "https://github.com/Jashwanth",
    },
];

const TECH_PILL_STYLES = [
    "border-neon-cyan/40 text-neon-cyan bg-neon-cyan/10",
    "border-neon-purple/40 text-neon-purple bg-neon-purple/10",
    "border-neon-blue/40 text-neon-blue bg-neon-blue/10",
];

export default function Projects() {
    const [openId, setOpenId] = useState<number | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<FilterTag[]>([]);
    const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const toggleCard = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    const toggleFilter = (filter: FilterTag) => {
        if (filter === "All") {
            setSelectedFilters([]);
            return;
        }

        setSelectedFilters((prev) => {
            if (prev.includes(filter)) {
                return prev.filter((tag) => tag !== filter);
            }
            return [...prev, filter];
        });
    };

    const isMatch = (project: ProjectCard) => {
        if (!selectedFilters.length) return true;
        return selectedFilters.every((tag) => project.filterTags.includes(tag));
    };

    const visibleCount = PROJECTS.filter(isMatch).length;

    useEffect(() => {
        if (openId === null) return;
        const openProject = PROJECTS.find((project) => project.id === openId);
        if (openProject && !isMatch(openProject)) {
            setOpenId(null);
        }
    }, [openId, selectedFilters]);

    return (
        <section id="projects" className="relative w-full bg-bg-primary section-padding">
            <div className="content-container">
                <h2 className="font-display text-4xl font-bold mb-12 text-center text-text-primary">
                    Select <span className="gradient-text">Operations</span>
                </h2>

                <div className="mb-6">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {FILTERS.map((filter) => {
                            const isActive = filter === "All" ? selectedFilters.length === 0 : selectedFilters.includes(filter);

                            return (
                                <button
                                    key={filter}
                                    type="button"
                                    onClick={() => toggleFilter(filter)}
                                    className={[
                                        "px-3 py-1.5 text-xs tracking-wide rounded-full border transition-all duration-300",
                                        isActive
                                            ? "bg-neon-cyan text-bg-primary border-neon-cyan shadow-neon-cyan-sm"
                                            : "border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10",
                                    ].join(" ")}
                                >
                                    {filter}
                                </button>
                            );
                        })}
                    </div>

                    <p className="mt-3 text-center text-sm text-text-secondary">
                        Showing {visibleCount} of {PROJECTS.length} projects
                    </p>
                </div>

                <div>
                    {PROJECTS.map((project) => {
                        const matched = isMatch(project);
                        const isOpen = openId === project.id;
                        const maxHeight = isOpen ? `${contentRefs.current[project.id]?.scrollHeight ?? 0}px` : "0px";

                        return (
                            <div
                                key={project.id}
                                className={[
                                    "overflow-hidden transition-[opacity,transform,max-height,margin] duration-300 ease-out",
                                    matched
                                        ? "opacity-100 scale-100 max-h-[1200px] mb-4"
                                        : "opacity-0 scale-95 max-h-0 mb-0 pointer-events-none",
                                ].join(" ")}
                            >
                                <article className="neon-border-card glass-card rounded-2xl overflow-hidden border border-border-subtle">
                                    <button
                                        type="button"
                                        onClick={() => toggleCard(project.id)}
                                        className="w-full p-5 md:p-6 text-left transition-colors hover:bg-white/[0.02]"
                                        aria-expanded={isOpen}
                                        aria-controls={`project-panel-${project.id}`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <h3 className="font-display text-2xl font-bold text-text-primary">
                                                    {project.title}
                                                </h3>
                                                <p className="mt-2 text-text-secondary leading-relaxed truncate">
                                                    {project.shortDescription}
                                                </p>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {project.tech.map((tag, index) => (
                                                        <span
                                                            key={tag}
                                                            className={[
                                                                "px-2.5 py-1 text-[10px] uppercase tracking-wide rounded-full border",
                                                                TECH_PILL_STYLES[index % TECH_PILL_STYLES.length],
                                                            ].join(" ")}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <span
                                                className={[
                                                    "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-transform duration-300",
                                                    isOpen ? "rotate-180" : "rotate-0",
                                                ].join(" ")}
                                                aria-hidden="true"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                    </button>

                                    <div
                                        id={`project-panel-${project.id}`}
                                        className="overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out"
                                        style={{
                                            maxHeight,
                                            opacity: isOpen ? 1 : 0,
                                        }}
                                    >
                                        <div
                                            ref={(el) => {
                                                contentRefs.current[project.id] = el;
                                            }}
                                            className="px-5 md:px-6 pb-6"
                                        >
                                            <div className="h-px bg-border-subtle mb-5" />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <p className="font-mono-custom text-[11px] uppercase tracking-widest text-neon-purple mb-2">
                                                        Problem
                                                    </p>
                                                    <p className="text-text-secondary leading-relaxed text-sm">
                                                        {project.problem}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="font-mono-custom text-[11px] uppercase tracking-widest text-neon-cyan mb-2">
                                                        Solution
                                                    </p>
                                                    <p className="text-text-secondary leading-relaxed text-sm">
                                                        {project.solution}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-5 flex flex-wrap items-center gap-3">
                                                <span className="px-3 py-1 text-xs rounded-full border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan">
                                                    {project.outcome}
                                                </span>
                                            </div>

                                            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                                                {project.github && project.github !== "#" && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-neon-cyan hover:text-text-primary transition-colors"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}
                                                {project.demo && project.demo !== "#" && (
                                                    <a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-neon-purple hover:text-text-primary transition-colors"
                                                    >
                                                        Live Demo
                                                    </a>
                                                )}
                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {project.tech.map((tag, index) => (
                                                    <span
                                                        key={`${project.id}-${tag}`}
                                                        className={[
                                                            "px-2.5 py-1 text-[10px] uppercase tracking-wide rounded-full border",
                                                            TECH_PILL_STYLES[index % TECH_PILL_STYLES.length],
                                                        ].join(" ")}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
