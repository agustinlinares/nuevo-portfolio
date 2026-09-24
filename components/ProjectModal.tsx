"use client";

import { useEffect } from "react";
import { useLang } from "@/context/LangContext";
import type { Project } from "@/data/projects";
import { mediaIconFor, IconCheck, IconCode, IconFigma, IconLink } from "./icons/ProjectIcons";
import { ODOO_BADGE_ICON_URL } from "@/data/projects";

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { lang } = useLang();

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
  }, [project]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pick = <T,>(bi: { es: T; en: T }) => (lang === "en" ? bi.en : bi.es);

  return (
    <div
      id="projModalOverlay"
      className={`proj-modal-overlay${project ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="proj-modal">
          <button type="button" className="proj-modal-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
          <div className="proj-modal-media">
            {project.screenshot ? (
              <img
                src={project.screenshot}
                alt={project.name}
                style={{ width: "100%", height: "100%", minHeight: 280, objectFit: "cover" }}
              />
            ) : (
              mediaIconFor(project.mediaIcon, ODOO_BADGE_ICON_URL)
            )}
          </div>
          <div className="proj-modal-info">
            <h3 className="proj-modal-title">{project.name}</h3>
            <div className="proj-modal-tags">
              {project.stackFull.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <p className="proj-modal-desc">{pick(project.descLong)}</p>
            <div className="proj-modal-actions">
              {project.links.code && (
                <a href={project.links.code} target="_blank" rel="noopener">
                  <IconCode />
                  <span>{lang === "en" ? "View Code" : "Ver Código"}</span>
                </a>
              )}
              {project.links.web && (
                <a href={project.links.web} target="_blank" rel="noopener">
                  <IconLink />
                  <span>{lang === "en" ? "View Site" : "Ver Web"}</span>
                </a>
              )}
              {project.links.figma && (
                <a href={project.links.figma} target="_blank" rel="noopener">
                  <IconFigma />
                  <span>{lang === "en" ? "View in Figma" : "Ver en Figma"}</span>
                </a>
              )}
            </div>
          </div>
          <div className="proj-modal-detail">
            <div className="proj-story-grid">
              <div className="proj-story-card">
                <p className="proj-story-label">{lang === "en" ? "Problem" : "Problema"}</p>
                <p>{pick(project.problem)}</p>
              </div>
              <div className="proj-story-card">
                <p className="proj-story-label">{lang === "en" ? "Solution" : "Solución"}</p>
                <p>{pick(project.solution)}</p>
              </div>
              <div className="proj-story-card">
                <p className="proj-story-label">{lang === "en" ? "What it shows" : "Qué demuestra"}</p>
                <p>{pick(project.demonstrates)}</p>
              </div>
            </div>
            <div className="proj-detail-sections">
              <div>
                <h4 className="proj-detail-heading">{lang === "en" ? "Key features" : "Funcionalidades principales"}</h4>
                <div className="proj-check-grid">
                  {project.features.map((f, i) => (
                    <div className="proj-check-item" key={i}>
                      <IconCheck />
                      <span>{pick(f)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="proj-detail-heading">{lang === "en" ? "What I learned" : "Aprendizajes"}</h4>
                <div className="proj-check-grid single">
                  {project.learnings.map((l, i) => (
                    <div className="proj-check-item" key={i}>
                      <IconCheck />
                      <span>{pick(l)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
