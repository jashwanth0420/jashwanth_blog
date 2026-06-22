"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
    ({
        card,
        index,
        hovered,
        setHovered,
    }: {
        card: SkillCard;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    }) => (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "rounded-2xl relative bg-bg-card border border-border-subtle overflow-hidden h-48 md:h-56 w-full transition-all duration-300 ease-out",
                hovered !== null && hovered !== index && "blur-sm scale-[0.97] opacity-60"
            )}
        >
            {/* Background glow on hover */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 transition-opacity duration-300",
                hovered === index ? "opacity-100" : "opacity-0"
            )} />

            {/* Logo / Icon centered */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                    "transition-all duration-300",
                    hovered === index ? "scale-90 opacity-20" : "scale-100 opacity-100"
                )}>
                    {card.logo}
                </div>
            </div>

            {/* Tools overlay on hover */}
            <div className={cn(
                "absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300",
                hovered === index ? "opacity-100" : "opacity-0"
            )}>
                <p className="font-display text-sm font-bold text-white mb-2">{card.title}</p>
                <div className="flex flex-wrap gap-1.5">
                    {card.tools.map((tool) => (
                        <span
                            key={tool}
                            className="px-2 py-0.5 text-[10px] rounded-full bg-bg-primary/80 border border-neon-cyan/30 text-neon-cyan"
                        >
                            {tool}
                        </span>
                    ))}
                </div>
                {/* Proficiency bar */}
                <div className="mt-3 h-1 rounded-full bg-bg-primary/60 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-700"
                        style={{ width: card.level }}
                    />
                </div>
            </div>

            {/* Category label always visible at bottom when not hovered */}
            <div className={cn(
                "absolute bottom-0 inset-x-0 p-3 text-center transition-opacity duration-300",
                hovered === index ? "opacity-0" : "opacity-100"
            )}>
                <p className="font-display text-sm font-semibold text-text-secondary">{card.title}</p>
            </div>
        </div>
    )
);

Card.displayName = "Card";

export type SkillCard = {
    title: string;
    logo: React.ReactNode;
    tools: string[];
    level: string;
};

export function FocusCards({ cards }: { cards: SkillCard[] }) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </div>
    );
}
