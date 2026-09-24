import { DEVICON, SIMPLE_ICON } from "./icons";

export type SkillLevel = "avanzado" | "intermedio" | "basico";

export const LEVEL_META: Record<SkillLevel, { percent: number; es: string; en: string }> = {
  avanzado: { percent: 92, es: "Avanzado", en: "Advanced" },
  intermedio: { percent: 58, es: "Intermedio", en: "Intermediate" },
  basico: { percent: 28, es: "Básico", en: "Basic" },
};

export interface TechItem {
  icon: string; // URL, or the emoji itself when emoji === true
  name: string;
  color: string;
  level: SkillLevel;
  emoji?: boolean;
}

export interface TechCategory {
  labelEs: string;
  labelEn: string;
  headerIcon: string; // raw inner-SVG markup
  items: TechItem[];
}

const ICON_LANGS =
  '<polyline points="8 6 2 12 8 18"/><polyline points="16 6 22 12 16 18"/>';
const ICON_AI =
  '<rect x="7" y="7" width="10" height="10" rx="2"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>';
const ICON_TESTING = '<polyline points="20 6 9 17 4 12"/>';
const ICON_DB =
  '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>';
const ICON_STYLES =
  '<path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2 0-.6-.2-1-.5-1.4-.4-.5-.2-1.2.4-1.4.6-.2 1.1-.2 1.6-.2A5 5 0 0 0 20 12 10 10 0 0 0 12 2Z"/><circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="7" r="1.1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1.1" fill="currentColor" stroke="none"/>';
const ICON_TOOLS =
  '<path d="M14.5 3.5a4 4 0 0 0-4.9 5.2L3 15.3V19h3.7l6.6-6.6a4 4 0 0 0 5.2-4.9l-3 3-2-2Z"/>';
const ICON_ERP =
  '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="3" y1="13" x2="21" y2="13"/>';

export const TECH_CATEGORIES: TechCategory[] = [
  {
    labelEs: "Lenguajes y frameworks",
    labelEn: "Languages & frameworks",
    headerIcon: ICON_LANGS,
    items: [
      { icon: DEVICON("javascript/javascript-original.svg"), name: "JavaScript", color: "#F7DF1E", level: "avanzado" },
      { icon: DEVICON("typescript/typescript-original.svg"), name: "TypeScript", color: "#3178C6", level: "intermedio" },
      { icon: DEVICON("html5/html5-original.svg"), name: "HTML5", color: "#E34F26", level: "avanzado" },
      { icon: DEVICON("java/java-original.svg"), name: "Java", color: "#ED8B00", level: "basico" },
      { icon: DEVICON("python/python-original.svg"), name: "Python", color: "#3776AB", level: "basico" },
      { icon: DEVICON("kotlin/kotlin-original.svg"), name: "Kotlin", color: "#7F52FF", level: "intermedio" },
      { icon: DEVICON("dotnetcore/dotnetcore-original.svg"), name: "C# / .NET", color: "#512BD4", level: "avanzado" },
      { icon: DEVICON("react/react-original.svg"), name: "React", color: "#61DAFB", level: "avanzado" },
      { icon: DEVICON("react/react-original.svg"), name: "React Native", color: "#61DAFB", level: "avanzado" },
      { icon: "🧭", name: "React Navigation", color: "#61DAFB", emoji: true, level: "avanzado" },
      { icon: "🐻", name: "Zustand", color: "#8a8a8a", emoji: true, level: "intermedio" },
      { icon: DEVICON("nextjs/nextjs-original.svg"), name: "Next.js", color: "#8a8a8a", level: "basico" },
      { icon: DEVICON("nodejs/nodejs-original.svg"), name: "Node.js", color: "#339933", level: "intermedio" },
      { icon: DEVICON("express/express-original.svg"), name: "Express", color: "#8a8a8a", level: "intermedio" },
      { icon: SIMPLE_ICON("fastapi"), name: "FastAPI", color: "#009688", level: "basico" },
      { icon: SIMPLE_ICON("springboot"), name: "Spring Boot", color: "#6DB33F", level: "basico" },
    ],
  },
  {
    labelEs: "IA",
    labelEn: "AI",
    headerIcon: ICON_AI,
    items: [
      { icon: "🤖", name: "ChatGPT / Claude", color: "#8a8a8a", emoji: true, level: "intermedio" },
      { icon: SIMPLE_ICON("githubcopilot"), name: "GitHub Copilot", color: "#6e7681", level: "intermedio" },
    ],
  },
  {
    labelEs: "Testing",
    labelEn: "Testing",
    headerIcon: ICON_TESTING,
    items: [
      { icon: SIMPLE_ICON("vitest"), name: "Vitest", color: "#729B1B", level: "intermedio" },
      { icon: SIMPLE_ICON("jest"), name: "Jest", color: "#C21325", level: "intermedio" },
      { icon: SIMPLE_ICON("pytest"), name: "pytest", color: "#0A9EDC", level: "intermedio" },
    ],
  },
  {
    labelEs: "Bases de datos",
    labelEn: "Databases",
    headerIcon: ICON_DB,
    items: [
      { icon: DEVICON("postgresql/postgresql-original.svg"), name: "PostgreSQL", color: "#336791", level: "intermedio" },
      { icon: DEVICON("microsoftsqlserver/microsoftsqlserver-plain.svg"), name: "SQL Server", color: "#CC2927", level: "intermedio" },
      { icon: DEVICON("mysql/mysql-original.svg"), name: "MySQL", color: "#4479A1", level: "intermedio" },
      { icon: DEVICON("mongodb/mongodb-original.svg"), name: "MongoDB", color: "#47A248", level: "intermedio" },
      { icon: SIMPLE_ICON("supabase"), name: "Supabase", color: "#3ECF8E", level: "intermedio" },
      { icon: DEVICON("sqlite/sqlite-original.svg"), name: "SQLite", color: "#003B57", level: "intermedio" },
      { icon: SIMPLE_ICON("oracle"), name: "Oracle SQL", color: "#F80000", level: "intermedio" },
    ],
  },
  {
    labelEs: "Estilos",
    labelEn: "Styles",
    headerIcon: ICON_STYLES,
    items: [
      { icon: DEVICON("css3/css3-original.svg"), name: "CSS3", color: "#1572B6", level: "avanzado" },
      { icon: DEVICON("tailwindcss/tailwindcss-original.svg"), name: "Tailwind CSS", color: "#06B6D4", level: "intermedio" },
      { icon: DEVICON("bootstrap/bootstrap-original.svg"), name: "Bootstrap", color: "#7952B3", level: "intermedio" },
    ],
  },
  {
    labelEs: "Entornos y herramientas",
    labelEn: "Environments & tools",
    headerIcon: ICON_TOOLS,
    items: [
      { icon: DEVICON("git/git-original.svg"), name: "Git", color: "#F05032", level: "avanzado" },
      { icon: SIMPLE_ICON("github"), name: "GitHub", color: "#6e7681", level: "avanzado" },
      { icon: DEVICON("docker/docker-original.svg"), name: "Docker", color: "#2496ED", level: "intermedio" },
      { icon: SIMPLE_ICON("vercel"), name: "Vercel", color: "#8a8a8a", level: "intermedio" },
      { icon: SIMPLE_ICON("powerbi"), name: "Power BI", color: "#F2C811", level: "intermedio" },
      { icon: SIMPLE_ICON("amazonwebservices"), name: "AWS", color: "#FF9900", level: "basico" },
      { icon: DEVICON("apachekafka/apachekafka-original.svg"), name: "Kafka", color: "#7a7a7a", level: "basico" },
      { icon: DEVICON("flutter/flutter-original.svg"), name: "Flutter", color: "#02569B", level: "basico" },
      { icon: DEVICON("dart/dart-original.svg"), name: "Dart", color: "#0175C2", level: "basico" },
      { icon: DEVICON("vscode/vscode-original.svg"), name: "VS Code", color: "#007ACC", level: "avanzado" },
      { icon: SIMPLE_ICON("npm"), name: "npm", color: "#CB3837", level: "avanzado" },
      { icon: DEVICON("intellij/intellij-original.svg"), name: "IntelliJ IDEA", color: "#FE315D", level: "intermedio" },
      { icon: DEVICON("vitejs/vitejs-original.svg"), name: "Vite", color: "#646CFF", level: "intermedio" },
      { icon: DEVICON("postman/postman-original.svg"), name: "Postman", color: "#FF6C37", level: "intermedio" },
      { icon: DEVICON("androidstudio/androidstudio-original.svg"), name: "Android Studio", color: "#3DDC84", level: "basico" },
      { icon: SIMPLE_ICON("insomnia"), name: "Insomnia", color: "#4000BF", level: "basico" },
      { icon: SIMPLE_ICON("stripe"), name: "Stripe", color: "#635BFF", level: "intermedio" },
    ],
  },
  {
    labelEs: "ERP",
    labelEn: "ERP",
    headerIcon: ICON_ERP,
    items: [
      { icon: SIMPLE_ICON("sap"), name: "SAP HCM", color: "#0FAAFF", level: "avanzado" },
      { icon: SIMPLE_ICON("sap"), name: "SAP SuccessFactors", color: "#0FAAFF", level: "avanzado" },
      { icon: SIMPLE_ICON("odoo"), name: "Odoo", color: "#714B67", level: "avanzado" },
    ],
  },
];

export const ALL_TECHS: TechItem[] = TECH_CATEGORIES.flatMap((c) => c.items);
