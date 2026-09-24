"use client";

import { useEffect, useRef, useState } from "react";
import { T } from "@/context/LangContext";

export default function CvPicker({
  variant = "header",
}: {
  variant?: "header" | "hero";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const menu = (
    <div
      id={variant === "header" ? "cvMenu" : "cvMenuHero"}
      className={`cv-menu${variant === "header" ? " cv-menu-right" : ""}${open ? " open" : ""}`}
    >
      <a href="/CV_Agustin_Linares_ES.pdf" download="CV_Agustin_Linares_ES.pdf" target="_blank" rel="noopener">
        🇪🇸 Español <span className="cv-size">(PDF, 1,7 MB)</span>
      </a>
      <a href="/CV_Agustin_Linares_EN.pdf" download="CV_Agustin_Linares_EN.pdf" target="_blank" rel="noopener">
        🇬🇧 English <span className="cv-size">(PDF, 1,6 MB)</span>
      </a>
    </div>
  );

  if (variant === "hero") {
    return (
      <div className="cv-picker" ref={ref}>
        <button type="button" id="cvTriggerHero" className="btn-pill btn-pill-ghost" onClick={() => setOpen((o) => !o)}>
          ⬇ <span><T es="Descargar CV" en="Download CV" /></span>
        </button>
        {menu}
      </div>
    );
  }

  return (
    <div className="cv-picker" ref={ref}>
      <button type="button" id="cvTrigger" className="cv-trigger" onClick={() => setOpen((o) => !o)}>
        ⬇ CV
      </button>
      {menu}
    </div>
  );
}
