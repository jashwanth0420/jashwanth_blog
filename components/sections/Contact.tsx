"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap.config";

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".contact-card", {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
            });

            gsap.from(".social-icon", {
                opacity: 0,
                scale: 0.8,
                y: 20,
                stagger: 0.1,
                duration: 0.6,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: ".social-container",
                    start: "top 90%",
                },
            });
        },
        { scope: containerRef, dependencies: [] }
    );

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative w-full bg-bg-secondary section-padding border-t border-border-subtle"
        >
            <div className="content-container flex flex-col items-center">
                <h2 className="font-display text-4xl font-bold mb-4 text-center">
                    Let&apos;s Build Something <span className="gradient-text">Intelligent</span>
                </h2>
                <p className="text-text-secondary text-center max-w-xl mb-12">
                    I am currently open to exciting architectural and full-stack opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>

                <div className="contact-card glass-card neon-border-card w-full max-w-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
                    <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-text-primary ml-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                className="bg-bg-primary/50 border border-border-subtle rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-text-primary ml-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="john@example.com"
                                className="bg-bg-primary/50 border border-border-subtle rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-medium text-text-primary ml-1">Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                placeholder="How can we work together?"
                                className="bg-bg-primary/50 border border-border-subtle rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all resize-y"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 bg-neon-cyan text-bg-primary font-semibold font-display py-4 px-8 rounded-lg outline-none hover:bg-neon-cyan-dim focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-bg-card transition-all hover:shadow-neon-cyan transform hover:-translate-y-1"
                        >
                            Send Message →
                        </button>
                    </form>
                </div>

                <div className="social-container flex gap-8">
                    <a href="https://github.com/Jashwanth" target="_blank" rel="noreferrer" className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-bg-card border border-border-subtle hover:border-neon-cyan hover:shadow-neon-cyan-sm text-text-secondary hover:text-neon-cyan transition-all group" aria-label="GitHub">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    </a>
                    <a href="#" className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-bg-card border border-border-subtle hover:border-neon-purple hover:shadow-neon-purple-sm text-text-secondary hover:text-neon-purple transition-all group" aria-label="LinkedIn">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
