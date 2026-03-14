import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

/**
 * Root page — single-page portfolio composition.
 *
 * Architecture:
 *  - Navbar is rendered here (not in layout.tsx) so it is scoped to the
 *    portfolio page and can receive page-specific anchor links.
 *  - Each section component is a "use client" leaf; this page itself stays
 *    a React Server Component (no "use client" directive needed here).
 *  - Sections will be added below Hero as phases are completed.
 */
export default function Home() {
    return (
        <>
            <Navbar />

            <main id="main-content" tabIndex={-1}>
                {/* Phase 3 — Hero */}
                <Hero />

                {/* Phase 4 — Skills */}
                <Skills />

                {/* Phase 5 — Projects */}
                <Projects />

                {/* Phase 6 — Contact */}
                <Contact />
            </main>
        </>
    );
}
