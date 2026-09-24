"use client";

import { useEffect, useRef, useState } from "react";
import { THEME_EMOJIS, THEME_LABELS, useTheme, type ThemeEmoji } from "@/context/ThemeContext";

/** The 💻🫒⚽🚗🎸🎮🕹️🎱🀄🎥 emoji theme switcher shown over the hero photo. */
export default function ThemePicker() {
  const { emoji, selectTheme } = useTheme();
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

  return (
    <div className="hero-theme-picker">
      <div className="theme-picker" ref={ref}>
        <button
          type="button"
          className="theme-trigger"
          id="themeTrigger"
          title="Cambiar temática"
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Cambiar temática de color"
          onClick={() => setOpen((o) => !o)}
        >
          {emoji}
        </button>
        <div id="themeMenu" className={`theme-menu${open ? " open" : ""}`} role="menu">
          {THEME_EMOJIS.map((e: ThemeEmoji) => (
            <button
              key={e}
              type="button"
              className={emoji === e ? "active" : undefined}
              data-emoji={e}
              title={THEME_LABELS[e]}
              aria-label={THEME_LABELS[e]}
              onClick={() => {
                selectTheme(e);
                setOpen(false);
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
