"use client";

import { FocusCards, SkillCard } from "@/components/ui/focus-cards";

// ─── SVG Tech Logos ──────────────────────────────────────────────────────────

const Logo = ({ children, bg = "#0d1117" }: { children: React.ReactNode; bg?: string }) => (
    <div className="flex flex-wrap items-center justify-center gap-4 px-4" style={{ background: bg }}>
        {children}
    </div>
);

const Svg = ({ src, label }: { src: string; label: string }) => (
    <img src={src} alt={label} title={label} className="w-10 h-10 object-contain" />
);

// Individual SVG logos via Simple Icons CDN (svg.ico / devicons)
const SKILL_CARDS: SkillCard[] = [
    {
        title: "AI & ML",
        level: "88%",
        tools: ["LangChain", "LangGraph", "RAG", "Vector DBs", "Prompt Engineering"],
        logo: (
            <Logo>
                {/* LangChain */}
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" label="Python" />
                {/* OpenAI */}
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.371 2.019-1.164a.076.076 0 0 1 .072 0l4.83 2.78a4.5 4.5 0 0 1-.696 8.122v-5.677a.79.79 0 0 0-.382-.69zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
                </svg>
                {/* Pinecone-like vector icon */}
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-neon-cyan" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </Logo>
        ),
    },
    {
        title: "Python Ecosystem",
        level: "84%",
        tools: ["FastAPI", "Python", "Pandas"],
        logo: (
            <Logo>
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" label="Python" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" label="FastAPI" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" label="Pandas" />
            </Logo>
        ),
    },
    {
        title: "Full-Stack",
        level: "82%",
        tools: ["React", "Node.js", "Express", "Next.js"],
        logo: (
            <Logo>
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" label="React" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" label="Node.js" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" label="Express" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" label="Next.js" />
            </Logo>
        ),
    },
    {
        title: "Databases",
        level: "79%",
        tools: ["PostgreSQL", "MongoDB", "MySQL"],
        logo: (
            <Logo>
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" label="PostgreSQL" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" label="MongoDB" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" label="MySQL" />
            </Logo>
        ),
    },
    {
        title: "Automation",
        level: "74%",
        tools: ["n8n", "API integrations", "Selenium"],
        logo: (
            <Logo>
                {/* n8n official brand icon */}
                <svg viewBox="0 0 40 40" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="#EA4B71"/>
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="monospace">n8n</text>
                </svg>
                {/* Selenium */}
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg" label="Selenium" />
                {/* API integrations — plug/connection icon */}
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="#00f5d4" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
            </Logo>
        ),
    },
    {
        title: "Languages",
        level: "86%",
        tools: ["Python", "JavaScript", "C", "C++", "Java", "SQL"],
        logo: (
            <Logo>
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" label="Python" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" label="JavaScript" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" label="C" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" label="C++" />
                <Svg src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" label="Java" />
            </Logo>
        ),
    },
];

export default function Skills() {
    return (
        <section
            id="skills"
            className="relative w-full scroll-mt-24 bg-bg-secondary section-padding border-t border-border-subtle"
        >
            <div className="content-container">
                <h2 className="font-display text-4xl font-bold mb-12 text-center">
                    <span className="gradient-text">My Arsenal</span> &amp; Capabilities
                </h2>
                <FocusCards cards={SKILL_CARDS} />
            </div>
        </section>
    );
}
