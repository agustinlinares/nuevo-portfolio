"use client";

import { useEffect, useRef } from "react";
import { ALL_TECHS } from "@/data/techCategories";

/** Auto-scrolling, drag-to-scroll ribbon of tech badges shown under the hero. */
export default function TechMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let x = 0;
    let dragging = false;
    let startPointerX = 0;
    let startX = 0;
    let halfWidth = 0;
    const speed = 0.4;
    let raf = 0;

    function measure() {
      halfWidth = track!.scrollWidth / 2;
    }
    function wrapX() {
      if (halfWidth <= 0) return;
      while (x <= -halfWidth) x += halfWidth;
      while (x > 0) x -= halfWidth;
    }
    function frame() {
      if (!dragging) x -= speed;
      wrapX();
      track!.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(frame);
    }
    function pointerDown(e: MouseEvent | TouchEvent) {
      dragging = true;
      wrap!.classList.add("dragging");
      startPointerX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      startX = x;
    }
    function pointerMove(e: MouseEvent | TouchEvent) {
      if (!dragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      x = startX + (clientX - startPointerX);
    }
    function pointerUp() {
      dragging = false;
      wrap!.classList.remove("dragging");
    }

    measure();
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(frame);

    wrap.addEventListener("mousedown", pointerDown);
    window.addEventListener("mousemove", pointerMove);
    window.addEventListener("mouseup", pointerUp);
    wrap.addEventListener("touchstart", pointerDown, { passive: true });
    window.addEventListener("touchmove", pointerMove, { passive: true });
    window.addEventListener("touchend", pointerUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      wrap.removeEventListener("mousedown", pointerDown);
      window.removeEventListener("mousemove", pointerMove);
      window.removeEventListener("mouseup", pointerUp);
      wrap.removeEventListener("touchstart", pointerDown);
      window.removeEventListener("touchmove", pointerMove);
      window.removeEventListener("touchend", pointerUp);
    };
  }, []);

  const badge = (t: (typeof ALL_TECHS)[number], key: string) => (
    <span className="tech-badge" style={{ "--tc": t.color } as React.CSSProperties} key={key}>
      <span className="icon">{t.emoji ? t.icon : <img src={t.icon} alt={t.name} loading="lazy" />}</span>
      {t.name}
    </span>
  );

  return (
    <div className="marquee" id="marqueeWrap" ref={wrapRef}>
      <div className="marquee-track" id="marqueeTrack" ref={trackRef}>
        {ALL_TECHS.map((t, i) => badge(t, `a-${i}`))}
        {ALL_TECHS.map((t, i) => badge(t, `b-${i}`))}
      </div>
    </div>
  );
}
