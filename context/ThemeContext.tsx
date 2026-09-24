"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const THEME_EMOJIS = [
  "💻",
  "🫒",
  "⚽",
  "🚗",
  "🎸",
  "🎮",
  "🕹️",
  "🎱",
  "🀄",
  "🎥",
] as const;

export type ThemeEmoji = (typeof THEME_EMOJIS)[number];
export type ColorMode = "light" | "dark" | "system";

export const THEME_SLUGS: Record<ThemeEmoji, string | null> = {
  "💻": null, // default theme: no data-theme attribute, uses the base :root / html.light tokens
  "🫒": "jaen",
  "⚽": "betis",
  "🚗": "motorsport",
  "🎸": "musica",
  "🎮": "games-modernos",
  "🕹️": "retro",
  "🎱": "mesa",
  "🀄": "manga",
  "🎥": "cine",
};

export const THEME_LABELS: Record<ThemeEmoji, string> = {
  "💻": "Programación / SAP",
  "🫒": "Jaén",
  "⚽": "Real Betis",
  "🚗": "Motorsport",
  "🎸": "Música",
  "🎮": "Juegos modernos",
  "🕹️": "Retro",
  "🎱": "Juegos de mesa",
  "🀄": "Manga / Anime",
  "🎥": "Cine",
};

interface ThemeContextValue {
  emoji: ThemeEmoji;
  selectTheme: (emoji: ThemeEmoji) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveIsLight(mode: ColorMode): boolean {
  if (mode === "light") return true;
  if (mode === "dark") return false;
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: light)").matches;
  }
  return false;
}

function updateFaviconDom() {
  if (typeof document === "undefined") return;
  const styles = getComputedStyle(document.documentElement);
  const bg = (styles.getPropertyValue("--bg") || "#0B0F17").trim();
  const accent = (styles.getPropertyValue("--accent") || "#5B8CFF").trim();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='16' fill='${bg}'/><text x='20' y='44' font-family='Space Grotesk, sans-serif' font-weight='700' font-size='34' fill='${accent}'>A</text></svg>`;
  const link = document.getElementById("faviconLink");
  if (link) link.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [emoji, setEmoji] = useState<ThemeEmoji>("💻");
  const [colorMode, setColorModeState] = useState<ColorMode>("dark");
  const [isLight, setIsLight] = useState(false);

  // restore persisted color mode (localStorage, same key as the original site)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("colorMode");
      if (saved === "light" || saved === "dark" || saved === "system") {
        setColorModeState(saved);
      }
    } catch {
      /* storage unavailable (e.g. private mode): keep the default */
    }
  }, []);

  const applyEverything = useCallback((mode: ColorMode, currentEmoji: ThemeEmoji) => {
    const light = resolveIsLight(mode);
    setIsLight(light);
    document.documentElement.classList.toggle("light", light);
    const slug = THEME_SLUGS[currentEmoji];
    if (slug) document.documentElement.setAttribute("data-theme", slug);
    else document.documentElement.removeAttribute("data-theme");
    updateFaviconDom();
  }, []);

  useEffect(() => {
    applyEverything(colorMode, emoji);
  }, [colorMode, emoji, applyEverything]);

  // "system" mode should follow live OS changes, same as the original matchMedia listener
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => {
      if (colorMode === "system") applyEverything("system", emoji);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [colorMode, emoji, applyEverything]);

  const setColorMode = useCallback((mode: ColorMode) => {
    try {
      localStorage.setItem("colorMode", mode);
    } catch {
      /* ignore if storage isn't available */
    }
    setColorModeState(mode);
  }, []);

  const selectTheme = useCallback((next: ThemeEmoji) => {
    setEmoji(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ emoji, selectTheme, colorMode, setColorMode, isLight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
