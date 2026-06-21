"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap.config";
import { socials } from "@/lib/data";

type FormData = {
    name: string;
    email: string;
    message: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(name: string) {
    return name.trim().length >= 2;
}

function validateEmail(email: string) {
    return EMAIL_REGEX.test(email.trim());
}

function validateMessage(message: string) {
    return message.trim().length >= 20;
}

function CheckIcon({ visible }: { visible: boolean }) {
    return (
        <span
            className={[
                "absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 transition-opacity duration-200",
                visible ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-hidden="true"
        >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
    );
}

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
        name: false,
        email: false,
        message: false,
    });
    const [submitState, setSubmitState] = useState<SubmitState>("idle");

    const validity = useMemo(
        () => ({
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            message: validateMessage(formData.message),
        }),
        [formData]
    );

    const isFormValid = validity.name && validity.email && validity.message;

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

    const contactEndpoint =
        process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
        process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
        "/api/contact";

    const setField = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (submitState === "success" || submitState === "error") {
            setSubmitState("idle");
        }
    };

    const markTouched = (field: keyof FormData) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const markAllTouched = () => {
        setTouched({ name: true, email: true, message: true });
    };

    async function submitForm() {
        setSubmitState("loading");

        try {
            const response = await fetch(contactEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            setSubmitState("success");
            setFormData({ name: "", email: "", message: "" });
            setTouched({ name: false, email: false, message: false });
        } catch {
            setSubmitState("error");
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        markAllTouched();
        if (!isFormValid || submitState === "loading") return;
        await submitForm();
    };

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
                    <form className="flex flex-col gap-6 relative z-10" onSubmit={onSubmit} noValidate>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setField("name", e.target.value)}
                                onBlur={() => markTouched("name")}
                                placeholder=" "
                                className={[
                                    "peer w-full bg-bg-primary/50 border rounded-lg px-4 pt-6 pb-2 text-text-primary",
                                    "placeholder-transparent focus:outline-none focus:ring-1 transition-all",
                                    touched.name && !validity.name
                                        ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/50"
                                        : "border-border-subtle focus:border-neon-cyan focus:ring-neon-cyan",
                                ].join(" ")}
                                aria-invalid={touched.name && !validity.name}
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-all duration-200
                                peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-neon-cyan
                                peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-[11px]"
                            >
                                Name
                            </label>
                            <CheckIcon visible={validity.name && formData.name.length > 0} />
                            {touched.name && !validity.name && (
                                <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-400 rounded-full" aria-hidden="true" />
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setField("email", e.target.value)}
                                onBlur={() => markTouched("email")}
                                placeholder=" "
                                className={[
                                    "peer w-full bg-bg-primary/50 border rounded-lg px-4 pt-6 pb-2 text-text-primary",
                                    "placeholder-transparent focus:outline-none focus:ring-1 transition-all",
                                    touched.email && !validity.email
                                        ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/50"
                                        : "border-border-subtle focus:border-neon-cyan focus:ring-neon-cyan",
                                ].join(" ")}
                                aria-invalid={touched.email && !validity.email}
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-all duration-200
                                peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-neon-cyan
                                peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-[11px]"
                            >
                                Email
                            </label>
                            <CheckIcon visible={validity.email && formData.email.length > 0} />
                            {touched.email && !validity.email && (
                                <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-400 rounded-full" aria-hidden="true" />
                            )}
                        </div>

                        <div className="relative">
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setField("message", e.target.value)}
                                onBlur={() => markTouched("message")}
                                rows={5}
                                placeholder=" "
                                className={[
                                    "peer w-full bg-bg-primary/50 border rounded-lg px-4 pt-7 pb-3 text-text-primary",
                                    "placeholder-transparent focus:outline-none focus:ring-1 transition-all resize-y",
                                    touched.message && !validity.message
                                        ? "border-red-400/80 focus:border-red-400 focus:ring-red-400/50"
                                        : "border-border-subtle focus:border-neon-cyan focus:ring-neon-cyan",
                                ].join(" ")}
                                aria-invalid={touched.message && !validity.message}
                            />
                            <label
                                htmlFor="message"
                                className="absolute left-4 top-4 text-text-muted transition-all duration-200
                                peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-neon-cyan
                                peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-[11px]"
                            >
                                Message
                            </label>
                            <CheckIcon visible={validity.message && formData.message.length > 0} />
                            {touched.message && !validity.message && (
                                <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-400 rounded-full" aria-hidden="true" />
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={submitState === "loading"}
                            className={[
                                "mt-4 font-semibold font-display py-4 px-8 rounded-lg outline-none",
                                "focus:ring-2 focus:ring-offset-2 transition-all",
                                submitState === "success"
                                    ? "bg-emerald-500/20 border border-emerald-400 text-emerald-300 focus:ring-emerald-400 focus:ring-offset-bg-card"
                                    : submitState === "error"
                                        ? "bg-red-500/15 border border-red-400 text-red-200 focus:ring-red-400 focus:ring-offset-bg-card"
                                        : "bg-neon-cyan text-bg-primary hover:bg-neon-cyan-dim focus:ring-neon-cyan focus:ring-offset-bg-card hover:shadow-neon-cyan transform hover:-translate-y-1",
                                submitState === "loading" ? "cursor-wait opacity-90" : "",
                            ].join(" ")}
                        >
                            {submitState === "idle" && "Send Message ->"}
                            {submitState === "loading" && (
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-full border-2 border-bg-primary/30 border-t-bg-primary animate-spin" aria-hidden="true" />
                                    Sending...
                                </span>
                            )}
                            {submitState === "success" && "Sent! I'll reply soon ✓"}
                            {submitState === "error" && "Failed - try again"}
                        </button>

                        {submitState === "error" && (
                            <div className="text-sm text-text-secondary">
                                <button
                                    type="button"
                                    onClick={submitForm}
                                    className="text-neon-cyan hover:text-text-primary transition-colors"
                                >
                                    Retry send
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                <div className="social-container flex gap-8">
                    <a href={socials.github || "#"} target={socials.github ? "_blank" : undefined} rel={socials.github ? "noreferrer" : undefined} className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-bg-card border border-border-subtle hover:border-neon-cyan hover:shadow-neon-cyan-sm text-text-secondary hover:text-neon-cyan transition-all duration-200 hover:-translate-y-[2px] group" aria-label="GitHub">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    </a>
                    <a href={socials.linkedin || "#"} target={socials.linkedin && socials.linkedin !== "#" ? "_blank" : undefined} rel={socials.linkedin && socials.linkedin !== "#" ? "noreferrer" : undefined} className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-bg-card border border-border-subtle hover:border-neon-purple hover:shadow-neon-purple-sm text-text-secondary hover:text-neon-purple transition-all duration-200 hover:-translate-y-[2px] group" aria-label="LinkedIn">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                    <a href={`mailto:${socials.email}`} className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-bg-card border border-border-subtle hover:border-neon-blue hover:shadow-[0_0_12px_rgba(56,189,248,0.35)] text-text-secondary hover:text-neon-blue transition-all duration-200 hover:-translate-y-[2px] group" aria-label="Email">
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 8l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
