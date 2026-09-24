"use client";

import { useState } from "react";
import { T, useLang } from "@/context/LangContext";
import { GITHUB_BADGE_ICON_URL, GITHUB_TILE, ODOO_BADGE_ICON_URL, PROJECTS, type Project, type ProjectCategory } from "@/data/projects";
import { IconGithubBadge, mediaIconFor } from "./icons/ProjectIcons";
import ProjectModal from "./ProjectModal";
import { useReveal } from "./useReveal";

const FILTERS: { cat: ProjectCategory | "todos"; es: string; en: string }[] = [
  { cat: "todos", es: "Todos", en: "All" },
  { cat: "web", es: "Web", en: "Web" },
  { cat: "programacion", es: "Programación", en: "Programming" },
  { cat: "bases-de-datos", es: "Bases de datos", en: "Databases" },
  { cat: "movil", es: "Móvil", en: "Mobile" },
];

function DevicesGraphic() {
  return (
    <div className="devices-graphic" aria-hidden="true">
      <span className="devices-glow" />
      <svg viewBox="0 0 300 240" fill="none">
        <defs>
          <linearGradient id="deviceScreenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" className="devices-stop-1" />
            <stop offset="100%" className="devices-stop-2" />
          </linearGradient>
        </defs>
        {/* portátil */}
        <g transform="rotate(-7 100 90)">
          <path className="devices-base" d="M6 148 L194 148 L206 168 L-6 168 Z" />
          <rect className="devices-frame" x="18" y="18" width="164" height="112" rx="10" />
          <rect x="18" y="18" width="164" height="112" rx="10" fill="url(#deviceScreenGrad)" />
          <rect className="devices-ui-bar" x="34" y="38" width="80" height="7" rx="3.5" />
          <rect className="devices-ui-bar devices-ui-bar-dim" x="34" y="54" width="110" height="7" rx="3.5" />
          <rect className="devices-ui-bar devices-ui-bar-dim" x="34" y="70" width="60" height="7" rx="3.5" />
          <rect className="devices-ui-chip" x="34" y="92" width="42" height="20" rx="6" />
        </g>
        {/* tablet */}
        <g transform="rotate(7 205 85)">
          <rect className="devices-frame" x="158" y="15" width="94" height="130" rx="16" />
          <rect x="158" y="15" width="94" height="130" rx="16" fill="url(#deviceScreenGrad)" />
          <circle className="devices-cam" cx="205" cy="27" r="2.6" />
          <rect className="devices-ui-bar" x="172" y="52" width="66" height="6" rx="3" />
          <rect className="devices-ui-bar devices-ui-bar-dim" x="172" y="66" width="50" height="6" rx="3" />
          <rect className="devices-ui-chip" x="172" y="86" width="66" height="42" rx="8" />
        </g>
        {/* móvil */}
        <g transform="rotate(-6 224 163)">
          <rect className="devices-frame" x="196" y="107" width="58" height="112" rx="14" />
          <rect x="196" y="107" width="58" height="112" rx="14" fill="url(#deviceScreenGrad)" />
          <circle className="devices-cam" cx="225" cy="119" r="2.2" />
          <rect className="devices-ui-bar" x="205" y="140" width="40" height="6" rx="3" />
          <rect className="devices-ui-bar devices-ui-bar-dim" x="205" y="153" width="28" height="6" rx="3" />
          <rect className="devices-ui-chip" x="205" y="172" width="40" height="30" rx="7" />
          <rect className="devices-home" x="213" y="210" width="24" height="4" rx="2" />
        </g>
      </svg>
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const { lang } = useLang();
  const ref = useReveal<HTMLDivElement>(index);
  return (
    <div
      className="proj-card"
      ref={ref}
      tabIndex={0}
      role="button"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="proj-img">
        {mediaIconFor(project.mediaIcon, ODOO_BADGE_ICON_URL)}
        <span className="proj-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="proj-badge">{lang === "en" ? project.badge.en : project.badge.es}</span>
      </div>
      <div className="proj-body">
        <div className="proj-toprow">
          <h3>{project.name}</h3>
          {project.date && <span className="proj-date">{lang === "en" ? project.date.en : project.date.es}</span>}
        </div>
        <p>{lang === "en" ? project.descShort.en : project.descShort.es}</p>
        <div className="stack">
          {project.stackFull.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <span className="proj-cta">
        <T es="Ver proyecto" en="View project" />
      </span>
    </div>
  );
}

export default function Portfolio() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<ProjectCategory | "todos">("todos");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const revealHeader = useReveal<HTMLDivElement>(0);
  const revealFilters = useReveal<HTMLDivElement>(1);

  const visible = PROJECTS.filter((p) => filter === "todos" || (p.cats as string[]).includes(filter));

  return (
    <section id="portfolio">
      <div className="portfolio-header" ref={revealHeader}>
        <h2 className="exp-heading">
          <T es="Portfolio y proyectos de GitHub" en="Portfolio and GitHub projects" />
        </h2>
        <DevicesGraphic />
      </div>
      <div className="projects-filters" id="projFilters" ref={revealFilters}>
        {FILTERS.map((f) => (
          <button
            key={f.cat}
            type="button"
            className={`exp-tab-btn${filter === f.cat ? " active" : ""}`}
            onClick={() => setFilter(f.cat)}
          >
            <T es={f.es} en={f.en} />
          </button>
        ))}
      </div>
      <div className="projects-grid" id="projGrid">
        {PROJECTS.map((p, i) =>
          filter === "todos" || (p.cats as string[]).includes(filter) ? (
            <ProjectCard project={p} index={i} key={p.name} onOpen={() => setOpenIdx(i)} />
          ) : null
        )}
        <a className="proj-card proj-card-link" href="https://github.com/agustinlinares?tab=repositories" target="_blank" rel="noopener">
          <div className="proj-img">
            <IconGithubBadge url={GITHUB_BADGE_ICON_URL} />
            <span className="proj-badge">{lang === "en" ? GITHUB_TILE.badge.en : GITHUB_TILE.badge.es}</span>
          </div>
          <div className="proj-body">
            <div className="proj-toprow">
              <h3>{lang === "en" ? GITHUB_TILE.title.en : GITHUB_TILE.title.es}</h3>
            </div>
            <p>{lang === "en" ? GITHUB_TILE.desc.en : GITHUB_TILE.desc.es}</p>
            <div className="stack">
              {GITHUB_TILE.tags.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <span className="proj-cta">{lang === "en" ? GITHUB_TILE.cta.en : GITHUB_TILE.cta.es}</span>
        </a>
        <p className={`proj-empty${visible.length === 0 ? " show" : ""}`}>
          <T
            es="Todavía no tengo proyectos en esta categoría — vuelve pronto."
            en="No projects in this category yet — check back soon."
          />
        </p>
      </div>
      <ProjectModal project={openIdx !== null ? PROJECTS[openIdx] : null} onClose={() => setOpenIdx(null)} />
    </section>
  );
}
