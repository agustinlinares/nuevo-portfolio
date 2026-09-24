"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "@/context/LangContext";
import ModePicker from "./ModePicker";
import CvPicker from "./CvPicker";

const NAV_LINKS: { href: string; es: string; en: string }[] = [
  { href: "#perfil", es: "Mi perfil", en: "My profile" },
  { href: "#stack", es: "Stack", en: "Stack" },
  { href: "#experiencia", es: "Experiencia", en: "Experience" },
  { href: "#portfolio", es: "Portfolio", en: "Portfolio" },
  { href: "#blog", es: "Blog", en: "Blog" },
  { href: "#contacto", es: "Contacto", en: "Contact" },
];

function BurgerIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export default function Header() {
  const { lang, toggleLang } = useLang();
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (
        navOpen &&
        navRef.current &&
        !navRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setNavOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNavOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [navOpen]);

  const scrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header>
      <div className="header-inner">
        <a className="logo" href="#" onClick={scrollTop}>
          <span className="accent">A</span>
          <span className="logo-rest">gustín Linares Carrera</span>.
        </a>
        <nav id="siteNav" ref={navRef} className={navOpen ? "nav-open" : undefined}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setNavOpen(false)}>
              <T es={l.es} en={l.en} />
            </a>
          ))}
        </nav>
        <div className="controls">
          <ModePicker />
          <button id="langBtn" className="mini-btn" onClick={toggleLang}>
            {lang === "es" ? "EN" : "ES"}
          </button>
          <CvPicker variant="header" />
          <button
            type="button"
            id="navToggle"
            className="icon-btn nav-toggle"
            ref={toggleRef}
            aria-expanded={navOpen}
            aria-controls="siteNav"
            aria-label={navOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={(e) => {
              e.stopPropagation();
              setNavOpen((o) => !o);
            }}
          >
            <BurgerIcon open={navOpen} />
          </button>
        </div>
      </div>
    </header>
  );
}
