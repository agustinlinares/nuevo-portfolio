"use client";

import { useEffect, useRef } from "react";
import { THEME_SLUGS, useTheme } from "@/context/ThemeContext";

// Ported close to verbatim from the source site's per-theme <canvas> background
// animations (dots+constellation, falling olive leaves, stadium/polka-dot grid,
// barber-pole "curbs", equalizer bars, rising embers, bouncing pixels, falling
// dice, sparkle stars, bokeh circles) plus the DEPTH_LAYERS/applyDepth parallax
// helper. Kept imperative on purpose — this is exactly the kind of per-frame
// drawing logic that doesn't benefit from being "React-ified".

type Kind =
  | "dots"
  | "leaves"
  | "lunares"
  | "curbs"
  | "bars"
  | "embers"
  | "pixels"
  | "dice"
  | "sparkles"
  | "bokeh";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Particle = Record<string, any>;

const KIND_BY_THEME: Record<string, Kind> = {
  default: "dots",
  jaen: "leaves",
  betis: "lunares",
  motorsport: "curbs",
  musica: "bars",
  "games-modernos": "embers",
  retro: "pixels",
  mesa: "dice",
  manga: "sparkles",
  cine: "bokeh",
};

const COUNT_BY_KIND: Record<Kind, number> = {
  dots: 70,
  leaves: 22,
  lunares: 54,
  curbs: 34,
  bars: 26,
  embers: 30,
  pixels: 26,
  dice: 12,
  sparkles: 24,
  bokeh: 14,
};

const DEPTH_LAYERS = [
  { sizeMul: 0.55, speedMul: 0.55, alphaMul: 0.55 }, // lejos
  { sizeMul: 1.0, speedMul: 1.0, alphaMul: 0.9 }, // media
  { sizeMul: 1.7, speedMul: 1.6, alphaMul: 1.25 }, // cerca
];

function applyDepth(p: Particle, layer: number): Particle {
  const d = DEPTH_LAYERS[layer];
  p.layer = layer;
  p.alphaMul = d.alphaMul;
  if (typeof p.size === "number") p.size *= d.sizeMul;
  if (typeof p.vx === "number") p.vx *= d.speedMul;
  if (typeof p.vy === "number") p.vy *= d.speedMul;
  if (typeof p.speed === "number") p.speed *= d.speedMul;
  if (typeof p.rotSpeed === "number") p.rotSpeed *= d.speedMul;
  if (typeof p.maxFrac === "number") p.maxFrac = Math.min(1, p.maxFrac * d.sizeMul);
  if (typeof p.bw === "number") p.bw *= d.sizeMul;
  if (typeof p.alpha === "number") p.alpha *= d.alphaMul;
  return p;
}

const rnd = (min: number, max: number) => min + Math.random() * (max - min);

function hexToRgb(hex: string): [number, number, number] {
  const m = (hex || "").replace("#", "").match(/.{1,2}/g);
  return m ? (m.map((c) => parseInt(c, 16)) as [number, number, number]) : [91, 140, 255];
}
function rgba(rgb: [number, number, number], alpha: number) {
  return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { emoji } = useTheme();
  const stateRef = useRef<{
    w: number;
    h: number;
    particles: Particle[];
    currentKind: Kind;
  }>({ w: 0, h: 0, particles: [], currentKind: "dots" });

  // main animation loop — set up once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;
    let raf = 0;

    function currentThemeSlug() {
      return document.documentElement.getAttribute("data-theme") || "default";
    }
    function getColors() {
      const cs = getComputedStyle(document.documentElement);
      return {
        a: hexToRgb((cs.getPropertyValue("--accent") || "#5B8CFF").trim()),
        b: hexToRgb((cs.getPropertyValue("--accent-2") || "#34D1BF").trim()),
      };
    }

    function drawStadiumReform(w: number, h: number, A: [number, number, number], B: [number, number, number], t: number) {
      const cx = w * 0.5,
        cy = h * 1.02;
      const rx = w * 0.64,
        ry = h * 0.4;
      const bars = 13;
      for (let i = 0; i < bars; i++) {
        const a0 = -Math.PI + (i / bars) * Math.PI * 2;
        const a1 = -Math.PI + ((i + 1) / bars) * Math.PI * 2;
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, rx, ry, 0, a0, a1);
        ctx!.ellipse(cx, cy, rx * 0.82, ry * 0.82, 0, a1, a0, true);
        ctx!.closePath();
        ctx!.fillStyle = rgba(i % 2 === 0 ? A : B, 0.16);
        ctx!.fill();
      }
      ctx!.beginPath();
      ctx!.ellipse(cx, cy, rx, ry, 0, Math.PI, Math.PI * 2);
      ctx!.strokeStyle = rgba(A, 0.26);
      ctx!.lineWidth = 1.2;
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.ellipse(cx, cy, rx * 0.78, ry * 0.78, 0, 0, Math.PI * 2);
      ctx!.fillStyle = rgba(A, 0.09);
      ctx!.fill();
      ctx!.strokeStyle = rgba(A, 0.22);
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(cx - rx * 0.78, cy);
      ctx!.lineTo(cx + rx * 0.78, cy);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.ellipse(cx, cy, rx * 0.14, ry * 0.14, 0, 0, Math.PI * 2);
      ctx!.stroke();

      const bAng = t * 0.0007;
      const bx = cx + Math.cos(bAng) * rx * 0.14,
        by = cy + Math.sin(bAng) * ry * 0.14;
      ctx!.save();
      ctx!.translate(bx, by);
      ctx!.rotate(bAng * 2);
      ctx!.strokeStyle = rgba(B, 0.5);
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.arc(0, 0, 4, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();
    }

    function resize() {
      state.w = canvas!.width = window.innerWidth;
      state.h = canvas!.height = window.innerHeight;
    }

    function spawn(kind: Kind, i: number, count: number): Particle {
      const { w, h } = state;
      switch (kind) {
        case "dots":
          return { x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.125, 0.125), vy: rnd(-0.125, 0.125), size: 1.8 };
        case "leaves":
          return { x: rnd(0, w), y: rnd(0, h), vy: rnd(0.3, 0.7), size: rnd(5, 9), rot: rnd(0, Math.PI * 2), rotSpeed: rnd(-0.012, 0.012), phase: rnd(0, Math.PI * 2) };
        case "lunares": {
          const cols = 9;
          const rows = Math.ceil(count / cols);
          const col = i % cols,
            row = Math.floor(i / cols);
          const cellW = w / cols,
            cellH = h / rows;
          const big = Math.random() < 0.35;
          return {
            x: (col + 0.5) * cellW + rnd(-cellW * 0.15, cellW * 0.15),
            y: (row + 0.5) * cellH + rnd(-cellH * 0.15, cellH * 0.15),
            size: (big ? rnd(0.16, 0.2) : rnd(0.07, 0.11)) * Math.min(cellW, cellH),
            freq: rnd(0.0006, 0.0013),
            phase: rnd(0, Math.PI * 2),
            alt: (col + row) % 2 === 0,
            isLast: i === count - 1,
          };
        }
        case "curbs": {
          const total = w + h;
          const spacing = total / count;
          return { baseK: i * spacing, spacing, speed: rnd(0.045, 0.075), bw: spacing * 0.5, alt: i % 2 === 0 };
        }
        case "bars":
          return { x: (i + 0.5) * (w / count), freq: rnd(0.0016, 0.0034), phase: rnd(0, Math.PI * 2), maxFrac: rnd(0.32, 0.92), bw: Math.max(4, (w / count) * 0.5) };
        case "embers":
          return { x: rnd(0, w), y: rnd(0, h), vy: -rnd(0.2, 0.7), vx: rnd(-0.15, 0.15), size: rnd(1, 2.6), phase: rnd(0, Math.PI * 2) };
        case "pixels":
          return { x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.35, 0.35), vy: rnd(-0.35, 0.35), size: [4, 6, 8][Math.floor(rnd(0, 3))], alt: Math.random() < 0.5 };
        case "dice":
          return { x: rnd(0, w), y: rnd(0, h), vy: rnd(0.14, 0.3), size: rnd(16, 24), rot: rnd(0, Math.PI * 2), rotSpeed: rnd(-0.012, 0.012), pips: 1 + Math.floor(rnd(0, 6)) };
        case "sparkles":
          return { x: rnd(0, w), y: rnd(0, h), vy: -rnd(0.05, 0.18), size: rnd(3, 9), rot: rnd(0, Math.PI * 2), rotSpeed: rnd(-0.01, 0.01), phase: rnd(0, Math.PI * 2), freq: rnd(0.0015, 0.0035), alt: Math.random() < 0.5 };
        case "bokeh":
          return { x: rnd(0, w), y: rnd(0, h), vy: -rnd(0.05, 0.16), size: rnd(22, 52), alpha: rnd(0.1, 0.22) };
      }
    }

    function initParticles(slug?: string) {
      state.currentKind = KIND_BY_THEME[slug ?? currentThemeSlug()] || "dots";
      const count = COUNT_BY_KIND[state.currentKind];
      state.particles = Array.from({ length: count }, (_, i) => applyDepth(spawn(state.currentKind, i, count), i % 3));
    }
    function init() {
      resize();
      initParticles();
    }

    function stepAndDraw(p: Particle, colors: { a: [number, number, number]; b: [number, number, number] }, t: number) {
      const { w, h } = state;
      const A = colors.a,
        B = colors.b;
      switch (state.currentKind) {
        case "dots":
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          return;
        case "leaves": {
          p.y += p.vy;
          p.x += Math.sin(t * 0.0011 + p.phase) * 0.35;
          p.rot += p.rotSpeed;
          if (p.y > h + 20) {
            p.y = -20;
            p.x = rnd(0, w);
          }
          ctx!.save();
          ctx!.translate(p.x, p.y);
          ctx!.rotate(p.rot);
          ctx!.fillStyle = rgba(A, 0.3 * p.alphaMul);
          ctx!.beginPath();
          ctx!.ellipse(0, 0, p.size, p.size * 0.42, 0, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.restore();
          return;
        }
        case "sparkles": {
          p.y += p.vy;
          p.rot += p.rotSpeed;
          if (p.y < -p.size * 3) {
            p.y = h + p.size * 3;
            p.x = rnd(0, w);
          }
          const tw = Math.abs(Math.sin(t * p.freq + p.phase));
          const alpha = (0.12 + 0.6 * tw) * p.alphaMul;
          const R = p.size * (0.55 + 0.55 * tw);
          const r = R * 0.28;
          ctx!.save();
          ctx!.translate(p.x, p.y);
          ctx!.rotate(p.rot);
          ctx!.fillStyle = rgba(p.alt ? B : A, alpha);
          ctx!.beginPath();
          ctx!.moveTo(0, -R);
          ctx!.quadraticCurveTo(r, -r, R, 0);
          ctx!.quadraticCurveTo(r, r, 0, R);
          ctx!.quadraticCurveTo(-r, r, -R, 0);
          ctx!.quadraticCurveTo(-r, -r, 0, -R);
          ctx!.closePath();
          ctx!.fill();
          ctx!.restore();
          return;
        }
        case "lunares": {
          if (p.y < h * 0.6) {
            const col = p.alt ? A : B;
            const pulse = 0.85 + 0.15 * Math.sin(t * p.freq + p.phase);
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
            ctx!.fillStyle = rgba(col, 0.16 * p.alphaMul);
            ctx!.fill();
          }
          if (p.isLast) drawStadiumReform(w, h, A, B, t);
          return;
        }
        case "curbs": {
          const total = w + h;
          const k = (((p.baseK + t * p.speed) % total) + total) % total;
          const col = p.alt ? A : B;
          ctx!.strokeStyle = rgba(col, 0.17 * p.alphaMul);
          ctx!.lineWidth = p.bw;
          ctx!.beginPath();
          ctx!.moveTo(k - h, h);
          ctx!.lineTo(k, 0);
          ctx!.stroke();
          return;
        }
        case "bars": {
          const baseY = h;
          const hgt = (0.1 + 0.9 * Math.abs(Math.sin(t * p.freq + p.phase))) * p.maxFrac * h;
          const grad = ctx!.createLinearGradient(0, baseY, 0, baseY - hgt);
          grad.addColorStop(0, rgba(A, 0.22 * p.alphaMul));
          grad.addColorStop(1, rgba(B, 0.03 * p.alphaMul));
          ctx!.fillStyle = grad;
          ctx!.fillRect(p.x - p.bw / 2, baseY - hgt, p.bw, hgt);
          return;
        }
        case "embers": {
          p.y += p.vy;
          p.x += p.vx + Math.sin(t * 0.002 + p.phase) * 0.12;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = rnd(0, w);
          }
          const alpha = (0.3 + 0.4 * Math.abs(Math.sin(t * 0.004 + p.phase))) * p.alphaMul;
          ctx!.fillStyle = rgba(A, alpha);
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx!.fill();
          return;
        }
        case "pixels": {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          ctx!.fillStyle = rgba(p.alt ? B : A, 0.5 * p.alphaMul);
          ctx!.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
          return;
        }
        case "dice": {
          p.y += p.vy;
          p.rot += p.rotSpeed;
          if (p.y > h + p.size) {
            p.y = -p.size;
            p.x = rnd(0, w);
          }
          const s = p.size * 0.5;
          ctx!.save();
          ctx!.translate(p.x, p.y);
          ctx!.rotate(p.rot);
          ctx!.strokeStyle = rgba(A, 0.35 * p.alphaMul);
          ctx!.lineWidth = 1.1;
          ctx!.strokeRect(-s, -s, s * 2, s * 2);
          ctx!.fillStyle = rgba(B, 0.5 * p.alphaMul);
          const pr = s * 0.2,
            o = s * 0.5;
          const layouts: Record<number, [number, number][]> = {
            1: [[0, 0]],
            2: [[-o, -o], [o, o]],
            3: [[-o, -o], [0, 0], [o, o]],
            4: [[-o, -o], [o, -o], [-o, o], [o, o]],
            5: [[-o, -o], [o, -o], [0, 0], [-o, o], [o, o]],
            6: [[-o, -o], [o, -o], [-o, 0], [o, 0], [-o, o], [o, o]],
          };
          (layouts[p.pips] || layouts[1]).forEach(([dx, dy]) => {
            ctx!.beginPath();
            ctx!.arc(dx, dy, pr, 0, Math.PI * 2);
            ctx!.fill();
          });
          ctx!.restore();
          return;
        }
        case "bokeh": {
          p.y += p.vy;
          if (p.y < -p.size) {
            p.y = h + p.size;
            p.x = rnd(0, w);
          }
          const light = document.documentElement.classList.contains("light");
          const a = light ? Math.min(p.alpha * 2.6, 0.55) : p.alpha;
          const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, rgba(A, a));
          grad.addColorStop(0.45, rgba(A, a * 0.55));
          grad.addColorStop(1, rgba(A, 0));
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx!.fill();
          return;
        }
      }
    }

    function tick(t: number) {
      const { w, h, particles } = state;
      ctx!.clearRect(0, 0, w, h);
      const colors = getColors();
      particles.forEach((p) => stepAndDraw(p, colors, t));
      if (state.currentKind === "dots") {
        const LINK_DIST = 140;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x,
              dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINK_DIST) {
              const pairAlphaMul = (particles[i].alphaMul + particles[j].alphaMul) / 2;
              ctx!.strokeStyle = rgba(colors.a, 0.22 * (1 - dist / LINK_DIST) * pairAlphaMul);
              ctx!.lineWidth = 1;
              ctx!.beginPath();
              ctx!.moveTo(particles[i].x, particles[i].y);
              ctx!.lineTo(particles[j].x, particles[j].y);
              ctx!.stroke();
            }
          }
        }
        particles.forEach((p) => {
          ctx!.fillStyle = rgba(colors.a, 0.75 * p.alphaMul);
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx!.fill();
        });
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("resize", resize);
    init();
    raf = requestAnimationFrame(tick);

    // exposed so the theme effect below can trigger a reinit without restarting the loop
    (canvas as HTMLCanvasElement & { __reinitFx?: (slug?: string) => void }).__reinitFx = initParticles;

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-seed particles for the new theme's animation kind. We pass the slug computed
  // directly from `emoji` (instead of letting initParticles re-read the DOM's
  // data-theme attribute) because React fires a descendant's effects before its
  // ancestor's: this effect would otherwise run before ThemeProvider's own effect
  // has updated the data-theme attribute, reading a stale (one-click-behind) value.
  useEffect(() => {
    const canvas = canvasRef.current as (HTMLCanvasElement & { __reinitFx?: (slug?: string) => void }) | null;
    canvas?.__reinitFx?.(THEME_SLUGS[emoji] ?? "default");
  }, [emoji]);

  return <canvas id="particleCanvas" ref={canvasRef} aria-hidden="true" />;
}
