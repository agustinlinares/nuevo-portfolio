"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-reveal hook — the React equivalent of the original site's generic
 * IntersectionObserver pass that added `.reveal`/`.is-visible` to many
 * repeated elements (cards, timeline items, headings…) as they scroll into
 * view. The actual fade/slide CSS lives in globals.css (`.reveal`,
 * `html.js-anim .reveal`), ported verbatim from the source stylesheet.
 */
export function useReveal<T extends HTMLElement>(index = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    const reducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reducedMotion) return;

    document.documentElement.classList.add("js-anim");
    el.classList.add("reveal");
    el.style.setProperty("--d", String(index % 6));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return ref;
}
