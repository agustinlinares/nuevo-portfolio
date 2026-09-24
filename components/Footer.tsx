"use client";

import { T } from "@/context/LangContext";
import { CONTACTS } from "@/data/contacts";

const HEART_ICON = (
  <svg className="footer-heart" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21.3s-7.6-4.7-10.2-9.4C.3 8.7 1.6 4.8 5.3 3.9c2.3-.6 4.5.4 6.2 2.7 1.7-2.3 3.9-3.3 6.2-2.7 3.7.9 5 4.8 3.5 8-2.6 4.7-10.2 9.4-10.2 9.4Z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const socials = CONTACTS.filter((c) => c.name !== "Email" && c.name !== "LinkedIn");

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <a className="logo" href="#" onClick={scrollTop}>
            <span className="accent">A</span>
            <span className="logo-rest">gustín Linares Carrera</span>.
          </a>
        </div>
        <p className="footer-copy">
          <span>
            <T es={`© ${year} — Diseñado y construido con`} en={`© ${year} — Designed and built with`} />
          </span>{" "}
          {HEART_ICON}
          <span>.</span>
        </p>
        <div className="footer-socials">
          {socials.map((c) => (
            <a key={c.name} href={c.href} title={c.name} target="_blank" rel="noopener">
              <img src={c.icon} alt={c.name} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
