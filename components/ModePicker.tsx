"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { useTheme, type ColorMode } from "@/context/ThemeContext";

const MODE_META: Record<ColorMode, { es: string; en: string }> = {
  light: { es: "Claro", en: "Light" },
  dark: { es: "Oscuro", en: "Dark" },
  system: { es: "Sistema", en: "System" },
};

function ModeIcon({ mode }: { mode: ColorMode }) {
  if (mode === "light") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    );
  }
  if (mode === "dark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ModePicker() {
  const { colorMode, setColorMode } = useTheme();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const modes: ColorMode[] = ["light", "dark", "system"];

  return (
    <div className="mode-picker" ref={ref}>
      <button
        type="button"
        id="modeTrigger"
        className="mode-trigger"
        title="Cambiar apariencia"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="mode-trigger-icon">
          <ModeIcon mode={colorMode} />
        </span>
        <span className="mode-trigger-label">{MODE_META[colorMode][lang]}</span>
        <svg className="mode-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div id="modeMenu" className={`mode-menu${open ? " open" : ""}`}>
        {modes.map((m) => (
          <div
            key={m}
            className={`mode-option${colorMode === m ? " active" : ""}`}
            data-mode={m}
            onClick={() => {
              setColorMode(m);
              setOpen(false);
            }}
          >
            <span className="mode-option-icon">
              <ModeIcon mode={m} />
            </span>
            <span className="mode-option-label">{MODE_META[m][lang]}</span>
            <span className="mode-check">{CHECK}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
