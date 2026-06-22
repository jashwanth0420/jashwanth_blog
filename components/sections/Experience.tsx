"use client";

import MagicBento from "@/components/MagicBento";

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
    const bentoCards = TIMELINE_ITEMS.map((item) => ({
        title: item.role,
        subtitle: item.organization,
        description: item.description,
        label: item.duration,
    }));

    return (
        <section
            id="experience"
            className="relative w-full scroll-mt-24 bg-bg-primary section-padding border-t border-border-subtle"
        >
            <div className="content-container">
                <h2 className="font-display text-4xl font-bold mb-12 text-center text-text-primary">
                    Field <span className="gradient-text">Experience</span>
                </h2>

                <div className="mx-auto max-w-5xl">
                    <MagicBento 
                        cards={bentoCards as any}
                        textAutoHide={false}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        spotlightRadius={300}
                        particleCount={10}
                        glowColor="0, 245, 212"
                    />
                </div>
            </div>
        </section>
    );
}

