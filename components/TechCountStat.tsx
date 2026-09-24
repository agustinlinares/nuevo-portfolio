"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { ALL_TECHS } from "@/data/techCategories";

/** "N tecnologías" stat with the original's animated count-up on scroll into view. */
export default function TechCountStat() {
  const { lang } = useLang();
  const total = ALL_TECHS.length;
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const start0 = performance.now();
          const dur = 1300;
          function step(ts: number) {
            const p = Math.min((ts - start0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(eased * total));
            if (p < 1) requestAnimationFrame(step);
            else setDisplay(null); // fall back to the final localized text below
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [total]);

  const finalText = lang === "en" ? `${total} technologies` : `${total} tecnologías`;

  return (
    <span className="profile-info-sub" id="techCountStat" ref={ref} data-countup={total}>
      {display === null ? finalText : `${display} ${lang === "en" ? "technologies" : "tecnologías"}`}
    </span>
  );
}
