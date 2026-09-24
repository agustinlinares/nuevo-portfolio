// Inline SVG icons used by the Portfolio project cards/modal, ported verbatim
// from the source site's PROJECTS rendering helpers.

export function IconMigracion({ className = "proj-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.13-3.36L23 10" />
      <path d="M20.49 15a9 9 0 0 1-14.13 3.36L1 14" />
    </svg>
  );
}

export function IconLlama({ className = "proj-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1 3-3 4.5-3 7.5a3 3 0 0 0 6 0c0-1-.5-1.8-1-2.2 1 1.8 2 2.9 2 4.7a4 4 0 0 1-8 0c0-4.3 3-5.3 4-10Z" />
    </svg>
  );
}

export function IconChat({ className = "proj-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-4.8 7.6 8.5 8.5 0 0 1-8.9-.9L3 21l1.9-4.3a8.5 8.5 0 0 1-.9-3.9 8.5 8.5 0 0 1 8.5-8.3h.2a8.4 8.4 0 0 1 8.3 7.6v.4Z" />
    </svg>
  );
}

export function IconLibro({ className = "proj-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}

export function IconOdooBadge({ url }: { url: string }) {
  return (
    <div className="proj-icon-badge">
      <img src={url} alt="Odoo" loading="lazy" />
    </div>
  );
}

export function IconGithubBadge({ url }: { url: string }) {
  return (
    <div className="proj-icon-badge">
      <img src={url} alt="GitHub" loading="lazy" />
    </div>
  );
}

export function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </svg>
  );
}

export function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function IconFigma() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <circle cx="15" cy="15" r="3" />
      <rect x="6" y="12" width="6" height="6" rx="2" />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12.5 10.5 15 16 9" />
    </svg>
  );
}

export function IconMediaImg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

export function IconMediaPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="6 4 20 12 6 20" />
    </svg>
  );
}

export function mediaIconFor(kind: "migracion" | "llama" | "chat" | "libro" | "odoo-badge", odooUrl: string) {
  switch (kind) {
    case "migracion":
      return <IconMigracion />;
    case "llama":
      return <IconLlama />;
    case "chat":
      return <IconChat />;
    case "libro":
      return <IconLibro />;
    case "odoo-badge":
      return <IconOdooBadge url={odooUrl} />;
  }
}
