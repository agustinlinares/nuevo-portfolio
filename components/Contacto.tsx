"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "@/context/LangContext";
import { useReveal } from "./useReveal";

const MESSAGES = {
  sending: { es: "Enviando…", en: "Sending…" },
  ok: { es: "¡Mensaje enviado! Te responderé lo antes posible.", en: "Message sent! I'll get back to you as soon as possible." },
  missing: { es: "Rellena al menos nombre, email y mensaje.", en: "Please fill in at least name, email and message." },
  invalidEmail: { es: "Revisa el formato del email.", en: "Check the email format." },
  err: {
    es: "No se pudo enviar. Prueba de nuevo o escríbeme directamente a agustinlc88@gmail.com.",
    en: "Couldn't send it. Try again or email me directly at agustinlc88@gmail.com.",
  },
} as const;

type StatusKey = keyof typeof MESSAGES;

export default function Contacto() {
  const { lang } = useLang();
  const revealHeading = useReveal<HTMLHeadingElement>(0);
  const revealGrid = useReveal<HTMLDivElement>(1);

  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ key: StatusKey; ok: boolean } | null>(null);

  const today = new Date();
  const dateStr = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const refText = lang === "en" ? `REQUEST_${today.getFullYear()}` : `SOLICITUD_${today.getFullYear()}`;

  useEffect(() => setStatus(null), [lang]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const nameEl = form.elements.namedItem("name") as HTMLInputElement;
    const emailEl = form.elements.namedItem("email") as HTMLInputElement;
    const messageEl = form.elements.namedItem("message") as HTMLTextAreaElement;

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
      setStatus({ key: "missing", ok: false });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ key: "invalidEmail", ok: false });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      const fd = new FormData(form);
      const res = await fetch("contacto.php", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) {
        setStatus({ key: "ok", ok: true });
        form.reset();
      } else {
        setStatus({ key: "err", ok: false });
      }
    } catch {
      setStatus({ key: "err", ok: false });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contacto">
      <h2 className="exp-heading" ref={revealHeading}>
        <T es="¿Construimos algo juntos?" en="Shall we build something together?" />
      </h2>
      <div className="contact-grid" ref={revealGrid}>
        <div className="contact-intro">
          <p className="contact-intro-text">
            <T es="Escríbeme un email o conecta en LinkedIn. Respondo siempre." en="Email me or connect on LinkedIn. I always respond." />
          </p>
          <div className="contact-intro-actions">
            <a className="btn-pill btn-pill-solid" href="mailto:agustinlc88@gmail.com">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              <span>
                <T es="Enviar email" en="Send email" />
              </span>
            </a>
            <a className="btn-pill btn-pill-ghost" href="https://www.linkedin.com/in/agustin-linares-carrera/" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="1" y="1" width="22" height="22" rx="5" fill="currentColor" />
                <circle cx="7.2" cy="7.3" r="1.6" fill="var(--surface)" />
                <rect x="5.8" y="10.3" width="2.8" height="8.2" rx="1" fill="var(--surface)" />
                <path
                  d="M11.4 10.3h2.7v1.3c.6-.9 1.7-1.6 3.2-1.6 2.5 0 3.7 1.6 3.7 4.4v4.4h-2.7v-3.9c0-1.5-.5-2.4-1.9-2.4-1 0-1.6.7-1.9 1.4-.1.3-.1.6-.1 1v3.9h-2.8V10.3Z"
                  fill="var(--surface)"
                />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
          <p className="contact-intro-meta">
            <a href="mailto:agustinlc88@gmail.com">agustinlc88@gmail.com</a> ·{" "}
            <a href="https://github.com/agustinlinares" target="_blank" rel="noopener">
              github.com/agustinlinares
            </a>{" "}
            · <T es="Sevilla, España" en="Seville, Spain" />
          </p>
        </div>
        <form id="contactForm" className="contact-slip" ref={formRef} method="post" noValidate onSubmit={handleSubmit}>
          <div className="slip-meta">
            <span>
              <span className="slip-meta-label">
                <T es="Ref:" en="Ref:" />
              </span>{" "}
              <span className="slip-meta-value">{refText}</span>
            </span>
            <span>
              <span className="slip-meta-label">
                <T es="Fecha:" en="Date:" />
              </span>{" "}
              <span className="slip-meta-value">{dateStr}</span>
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="fName">
              <T es="Nombre / Empresa" en="Name / Company" />
            </label>
            <input id="fName" name="name" required placeholder={lang === "en" ? "Type here…" : "Escribe aquí…"} />
          </div>
          <div className="form-field">
            <label htmlFor="fEmail">
              <T es="Email de contacto" en="Contact email" />
            </label>
            <input id="fEmail" name="email" type="email" required placeholder="usuario@email.com" />
          </div>
          <div className="form-field">
            <label htmlFor="fSubject">
              <T es="Asunto" en="Subject" />
            </label>
            <input id="fSubject" name="subject" placeholder={lang === "en" ? "Project proposal…" : "Propuesta de proyecto…"} />
          </div>
          <div className="form-field form-field-msg">
            <label htmlFor="fMsg">
              <T es="Mensaje / Descripción" en="Message / Description" />
            </label>
            <textarea
              id="fMsg"
              name="message"
              required
              placeholder={lang === "en" ? "Tell me how I can help…" : "Cuéntame en qué puedo ayudarte…"}
            />
          </div>
          <div className="form-field hp-field" aria-hidden="true">
            <label htmlFor="fWebsite">Website</label>
            <input id="fWebsite" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <button id="fSubmit" className="btn-pill btn-pill-solid" type="submit" disabled={submitting}>
            {submitting ? MESSAGES.sending[lang] : <T es="Enviar solicitud" en="Send request" />}
          </button>
          {status && (
            <p id="formStatus" className={`form-status ${status.ok ? "ok" : "err"}`} role="status" aria-live="polite">
              {MESSAGES[status.key][lang]}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
