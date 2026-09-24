"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { T, useLang } from "@/context/LangContext";

const USERNAME = "agustinlinares";
const MESES: Record<"es" | "en", string[]> = {
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

interface ContribDay {
  date: string;
  count: number;
  level: number;
}
interface ContribResponse {
  contributions: ContribDay[];
  total: Record<string, number>;
}

interface DayCell {
  date: Date;
  inYear: boolean;
  count: number;
  level: number;
}

const fmtDate = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function buildWeeks(contributions: ContribDay[], year: number): DayCell[][] {
  const map = new Map(contributions.map((d) => [d.date, d]));
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const gridStart = new Date(start);
  gridStart.setDate(gridStart.getDate() - start.getDay());
  const gridEnd = new Date(end);
  gridEnd.setDate(gridEnd.getDate() + (6 - end.getDay()));

  const weeks: DayCell[][] = [];
  const cur = new Date(gridStart);
  while (cur <= gridEnd) {
    const week: DayCell[] = [];
    for (let d = 0; d < 7; d++) {
      const inYear = cur.getFullYear() === year;
      const rec = map.get(fmtDate(cur));
      week.push({ date: new Date(cur), inYear, count: rec ? rec.count : 0, level: rec ? rec.level : 0 });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export default function GithubHeatmap() {
  const { lang } = useLang();
  const CURRENT_YEAR = useMemo(() => new Date().getFullYear(), []);
  const YEARS = useMemo(() => [CURRENT_YEAR - 2, CURRENT_YEAR - 1, CURRENT_YEAR], [CURRENT_YEAR]);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [weeks, setWeeks] = useState<DayCell[][] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const cache = useRef<Map<number, ContribResponse>>(new Map());

  useEffect(() => {
    let cancelled = false;
    const cached = cache.current.get(selectedYear);
    if (cached) {
      setWeeks(buildWeeks(cached.contributions || [], selectedYear));
      setTotal((cached.total && cached.total[selectedYear]) || 0);
      setStatus("ready");
      return;
    }
    setStatus("loading");
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${selectedYear}`)
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data: ContribResponse) => {
        if (cancelled) return;
        cache.current.set(selectedYear, data);
        setWeeks(buildWeeks(data.contributions || [], selectedYear));
        setTotal((data.total && data.total[selectedYear]) || 0);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [selectedYear]);

  let prevMonth = -1;

  return (
    <div className="github-activity">
      <div className="github-activity-header">
        <div className="stack-card-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h4l2.5-7 4 14 2.5-7H21" />
          </svg>
          <span className="stack-card-label">
            <T es="Actividad en GitHub" en="GitHub activity" />
          </span>
        </div>
        <div className="gh-year-buttons" id="ghYearButtons">
          {YEARS.map((y) => (
            <button
              type="button"
              key={y}
              className={`gh-year-btn${y === selectedYear ? " active" : ""}`}
              aria-pressed={y === selectedYear}
              onClick={() => setSelectedYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      <div className="gh-calendar-scroll">
        <div className="gh-calendar" id="ghCalendar">
          {status === "loading" && (
            <p className="gh-calendar-status">
              <T es="Cargando actividad de GitHub…" en="Loading GitHub activity…" />
            </p>
          )}
          {status === "error" && (
            <p className="gh-calendar-status">
              <T
                es="No se pudo cargar la actividad de GitHub aquí — consúltala directamente en mi perfil."
                en="Could not load GitHub activity here — check it directly on my profile."
              />
            </p>
          )}
          {status === "ready" &&
            weeks &&
            weeks.map((week, wi) => {
              const anchor = week.find((d) => d.inYear) || week[0];
              let label = "";
              if (anchor.date.getMonth() !== prevMonth && anchor.date.getDate() <= 7) {
                prevMonth = anchor.date.getMonth();
                label = MESES[lang][prevMonth];
              }
              return (
                <div className="gh-week" key={wi}>
                  <span className="gh-month-label">{label}</span>
                  {week.map((d, di) =>
                    d.inYear ? (
                      <span
                        key={di}
                        className="gh-day"
                        data-level={d.level}
                        title={`${fmtDate(d.date)}: ${d.count}`}
                      />
                    ) : (
                      <span key={di} className="gh-day" style={{ visibility: "hidden" }} />
                    )
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="gh-calendar-footer">
        <span className="gh-calendar-total">
          {total !== null &&
            (lang === "es"
              ? `${total} ${total === 1 ? "contribución" : "contribuciones"} en ${selectedYear}`
              : `${total} ${total === 1 ? "contribution" : "contributions"} in ${selectedYear}`)}
        </span>
        <span className="gh-legend">
          <span>
            <T es="Menos" en="Less" />
          </span>
          <span className="gh-legend-box" data-level="0" />
          <span className="gh-legend-box" data-level="1" />
          <span className="gh-legend-box" data-level="2" />
          <span className="gh-legend-box" data-level="3" />
          <span className="gh-legend-box" data-level="4" />
          <span>
            <T es="Más" en="More" />
          </span>
        </span>
        <a className="gh-calendar-link" href="https://github.com/agustinlinares" target="_blank" rel="noopener">
          <T es="Ver en GitHub →" en="View on GitHub →" />
        </a>
      </div>
    </div>
  );
}
