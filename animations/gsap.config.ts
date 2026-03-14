/**
 * animations/gsap.config.ts
 *
 * Central GSAP plugin registration file.
 * Import this file once at the top of any Client Component that uses GSAP.
 * Registering here ensures plugins are never double-registered across the app.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
