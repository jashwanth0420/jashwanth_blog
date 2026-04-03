"use client";

import { useEffect, useRef } from "react";

export default function EmbeddingDustField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Fix: check if canvas exists
    if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const pointer = {
            x: Number.NaN,
            y: Number.NaN,
            visible: false,
        };

        const clusters: ClusterCenter[] = Array.from({ length: CLUSTER_COUNT }, () => ({
            x: randomInRange(-220, 220),
            y: randomInRange(-140, 140),
            z: randomInRange(-DEPTH_SPREAD, DEPTH_SPREAD),
        }));

        const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
            const cluster = Math.floor(Math.random() * CLUSTER_COUNT);
            const center = clusters[cluster];

            return {
                cluster,
                x: center.x + randomInRange(-66, 66),
                y: center.y + randomInRange(-54, 54),
                z: center.z + randomInRange(-108, 108),
                size: randomInRange(0.55, 1.9),
                drift: randomInRange(0.16, 0.38),
                phase: randomInRange(0, Math.PI * 2),
                sparkle: randomInRange(0.5, 1.2),
                glow: 0,
            };
        });

        let width = 0;
        let height = 0;
        let dpr = 1;
        let rafId = 0;

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function onPointerMove(e: PointerEvent) {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
            pointer.visible = true;
        }

        function onPointerLeave() {
            pointer.visible = false;
            pointer.x = Number.NaN;
            pointer.y = Number.NaN;
        }

        function animate(now: number) {
            const t = now * 0.00018;

            ctx.clearRect(0, 0, width, height);

            // Deep black base with a subtle cold vignette.
            const bg = ctx.createRadialGradient(
                width * 0.5,
                height * 0.45,
                0,
                width * 0.5,
                height * 0.5,
                Math.max(width, height) * 0.82,
            );
            bg.addColorStop(0, "rgba(3, 7, 18, 0.95)");
            bg.addColorStop(0.55, "rgba(2, 3, 10, 0.98)");
            bg.addColorStop(1, "rgba(0, 0, 0, 1)");
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, width, height);

            const projected: {
                x: number;
                y: number;
                z: number;
                distSq: number;
                p: Particle;
                radius: number;
                tintMix: number;
            }[] = [];

            const cosY = Math.cos(t * 0.68);
            const sinY = Math.sin(t * 0.68);
            const cosX = Math.cos(t * 0.43);
            const sinX = Math.sin(t * 0.43);

            for (let i = 0; i < particles.length; i += 1) {
                const p = particles[i];
                const driftPulse = Math.sin(t * p.drift * 7 + p.phase);

                const x0 = p.x + driftPulse * 7.5;
                const y0 = p.y + Math.cos(t * p.drift * 5 + p.phase) * 5.2;
                const z0 = p.z + Math.sin(t * p.drift * 4 + p.phase * 1.35) * 8.4;

                const x1 = x0 * cosY - z0 * sinY;
                const z1 = x0 * sinY + z0 * cosY;
                const y1 = y0 * cosX - z1 * sinX;
                const z2 = y0 * sinX + z1 * cosX;

                const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE + z2 + DEPTH_SPREAD);
                const sx = width * 0.5 + x1 * perspective;
                const sy = height * 0.52 + y1 * perspective;

                if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40) {
                    p.glow = lerp(p.glow, 0, 0.08);
                    continue;
                }

                const dx = pointer.visible ? sx - pointer.x : 99999;
                const dy = pointer.visible ? sy - pointer.y : 99999;
                const distSq = dx * dx + dy * dy;

                projected.push({
                    x: sx,
                    y: sy,
                    z: z2,
                    distSq,
                    p,
                    radius: p.size * (0.45 + perspective * 1.35),
                    tintMix: (p.cluster % 4) / 3,
                });
            }

            if (pointer.visible) {
                const radiusSq = SEARCH_RADIUS * SEARCH_RADIUS;

                const nearby = projected
                    .filter((item) => item.distSq < radiusSq)
                    .sort((a, b) => a.distSq - b.distSq)
                    .slice(0, K_NEAREST);

                for (let i = 0; i < projected.length; i += 1) {
                    projected[i].p.glow = lerp(projected[i].p.glow, 0, 0.06);
                }

                for (let i = 0; i < nearby.length; i += 1) {
                    const n = nearby[i];
                    const proximity = 1 - Math.min(Math.sqrt(n.distSq) / SEARCH_RADIUS, 1);
                    const rankFalloff = 1 - i / Math.max(K_NEAREST, 1);
                    const targetGlow = Math.max(0, proximity * 0.9 + rankFalloff * 0.35);
                    n.p.glow = lerp(n.p.glow, targetGlow, 0.22);
                }
            } else {
                for (let i = 0; i < projected.length; i += 1) {
                    projected[i].p.glow = lerp(projected[i].p.glow, 0, 0.08);
                }
            }

            projected.sort((a, b) => a.z - b.z);

            for (let i = 0; i < projected.length; i += 1) {
                const item = projected[i];
                const depthFactor = Math.max(0.2, 1 - (item.z + DEPTH_SPREAD) / (DEPTH_SPREAD * 2.1));
                const baseMix = item.tintMix * 0.68 + depthFactor * 0.32;

                const r = Math.round(lerp(DEEP_BLUE.r, CYAN.r, baseMix));
                const g = Math.round(lerp(DEEP_BLUE.g, CYAN.g, baseMix));
                const b = Math.round(lerp(DEEP_BLUE.b, CYAN.b, baseMix));

                const twinkle = 0.7 + Math.sin(t * 13 * item.p.sparkle + item.p.phase) * 0.3;
                const glowBoost = item.p.glow;
                const alpha = Math.min(0.92, 0.2 + depthFactor * 0.38 + glowBoost * 0.42);
                const radius = item.radius + glowBoost * 1.8;

                ctx.shadowBlur = 10 + glowBoost * 26;
                ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.32 + glowBoost * 0.42})`;
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * twinkle})`;

                ctx.beginPath();
                ctx.arc(item.x, item.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.shadowBlur = 0;
            rafId = window.requestAnimationFrame(animate);
        }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
}
