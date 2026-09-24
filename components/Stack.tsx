"use client";

import { T, useLang } from "@/context/LangContext";
import { ALL_TECHS, LEVEL_META, TECH_CATEGORIES, type TechItem } from "@/data/techCategories";
import GithubHeatmap from "./GithubHeatmap";
import { useReveal } from "./useReveal";

function CategoryIcon({ inner }: { inner: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

function SkillRow({ t }: { t: TechItem }) {
  const { lang } = useLang();
  const lvl = LEVEL_META[t.level];
  return (
    <div className="skill-row">
      <span className="skill-row-icon">
        {t.emoji ? t.icon : <img src={t.icon} alt={t.name} loading="lazy" />}
      </span>
      <span className="skill-row-name">{t.name}</span>
      <span className="skill-row-bar">
        <span className="skill-row-bar-fill" style={{ width: `${lvl.percent}%` }} />
      </span>
      <span className={`skill-row-level skill-level-${t.level}`}>{lang === "es" ? lvl.es : lvl.en}</span>
    </div>
  );
}

function SkillsCategoryBlock({ cat, index }: { cat: (typeof TECH_CATEGORIES)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>(index);
  return (
    <div className="skills-category" ref={ref}>
      <div className="stack-card-header">
        <CategoryIcon inner={cat.headerIcon} />
        <span className="stack-card-label">
          <T es={cat.labelEs} en={cat.labelEn} />
        </span>
      </div>
      <div className="skills-grid">
        {cat.items.map((t, i) => (
          <SkillRow t={t} key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const total = ALL_TECHS.length;
  const revealHeading = useReveal<HTMLHeadingElement>(0);

  return (
    <section id="stack">
      <h2 className="stack-heading" ref={revealHeading}>
        <T es="Las herramientas con las que construyo." en="The tools I build with." />
      </h2>
      <div className="skills-terminal">
        <div className="skills-terminal-body" id="skillsTerminalBody">
          {TECH_CATEGORIES.map((cat, i) => (
            <SkillsCategoryBlock cat={cat} index={i} key={cat.labelEs} />
          ))}
          <p className="skills-terminal-footer">
            <span className="skills-check">✓</span>
            <span>
              <T es={`${total} tecnologías cargadas`} en={`${total} technologies loaded`} />
            </span>
          </p>
        </div>
      </div>
      <GithubHeatmap />
    </section>
  );
}
