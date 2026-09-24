"use client";

import { useEffect, useRef } from "react";
import { T } from "@/context/LangContext";
import { CONTACTS } from "@/data/contacts";
import ThemePicker from "./ThemePicker";
import CvPicker from "./CvPicker";
import TechMarquee from "./TechMarquee";

const MAX_TILT = 10;
const BG_SHIFT = 5;
const FG_SHIFT = 15;

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);

  // "3D photo" hero effect: two real layers (foreground cut-out + blurred background)
  // shift at different speeds with the cursor, plus a slight tilt of the whole card.
  useEffect(() => {
    const wrap = wrapRef.current;
    const photo = photoRef.current;
    if (!wrap || !photo) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleMove(clientX: number, clientY: number) {
      const rect = photo!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2,
        cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height / 2)));
      photo!.style.transform = `perspective(900px) rotateY(${dx * MAX_TILT}deg) rotateX(${-dy * MAX_TILT}deg)`;
      if (bgRef.current)
        bgRef.current.style.transform = `translate(calc(-50% + ${dx * BG_SHIFT}px), calc(-50% + ${dy * BG_SHIFT}px))`;
      if (fgRef.current)
        fgRef.current.style.transform = `translate(calc(-50% + ${dx * FG_SHIFT}px), calc(-50% + ${dy * FG_SHIFT}px)) scale(1.035)`;
    }
    function reset() {
      photo!.style.transform = "";
      if (bgRef.current) bgRef.current.style.transform = "";
      if (fgRef.current) fgRef.current.style.transform = "";
    }
    const onMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", reset);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <section id="inicio">
      <div className="hero-grid">
        <div>
          <h1 className="hero-name">
            <span>
              <T es="Hola, soy " en="Hi, I'm " />
            </span>
            <span className="accent">Agustín</span>.
          </h1>
          <h2 className="hero-role">
            <T
              es="Desarrollador de Aplicaciones Multiplataforma y Web."
              en="Multiplatform & Web Application Developer."
            />
          </h2>
          <p className="hero-desc">
            <T
              es="Combino la lógica del backend y la creatividad del frontend, con experiencia previa como consultor SAP HCM, para crear aplicaciones completas, robustas y funcionales."
              en="I combine backend logic with frontend creativity, backed by previous experience as a SAP HCM consultant, to build complete, robust and functional applications."
            />
          </p>
          <div className="hero-socials" id="heroSocials">
            {CONTACTS.map((c) => (
              <a key={c.name} href={c.href} title={c.name} target="_blank" rel="noopener">
                <img src={c.icon} alt={c.name} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
        <div className="hero-photo-wrap" ref={wrapRef}>
          <div className="hero-photo-frame">
            <div className="hero-photo" ref={photoRef}>
              <img className="hero-photo-bg" ref={bgRef} src="/foto-perfil-bg.jpg" alt="" aria-hidden="true" loading="lazy" />
              <img
                className="hero-photo-fg"
                ref={fgRef}
                src="/foto-perfil-fg.png"
                alt="Agustín Linares Carrera"
                loading="lazy"
              />
            </div>
            <ThemePicker />
          </div>
        </div>
      </div>
      <TechMarquee />
      <div className="marquee-cta-row">
        <a href="#portfolio" className="btn-pill btn-pill-solid">
          <T es="Ver proyectos" en="View projects" />
        </a>
        <CvPicker variant="hero" />
      </div>
    </section>
  );
}
