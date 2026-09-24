import { SIMPLE_ICON } from "./icons";

export type ProjectCategory = "web" | "programacion" | "bases-de-datos" | "movil";

export interface Bi {
  es: string;
  en: string;
}

export interface Project {
  name: string;
  cats: ProjectCategory[];
  mediaIcon: "migracion" | "llama" | "chat" | "libro" | "odoo-badge";
  screenshot: string | null;
  video: string | null;
  badge: Bi;
  date?: Bi;
  descShort: Bi;
  stackFull: string[];
  descLong: Bi;
  problem: Bi;
  solution: Bi;
  demonstrates: Bi;
  features: Bi[];
  learnings: Bi[];
  links: { code: string | null; web: string | null; figma: string | null };
}

// screenshot/video (null por defecto): en cuanto Agustín tenga una captura o un clip de
// demo reales, la tarjeta mostrará automáticamente los botones para alternar entre foto y
// vídeo. Con ambos en null se muestra el icono representativo, como en el sitio original.
export const PROJECTS: Project[] = [
  {
    name: "MZ-Asistencial",
    cats: ["web", "programacion"],
    mediaIcon: "migracion",
    screenshot: null,
    video: null,
    badge: { es: "Prácticas profesionales", en: "Professional internship" },
    date: { es: "Marzo – Junio 2026", en: "March – June 2026" },
    descShort: {
      es: "Migración de sistema legacy VB a .NET/React. Caso de estudio profesional.",
      en: "Migration of a legacy VB system to .NET/React. Professional case study.",
    },
    stackFull: [".NET 10", "React", "SQL Server", "Migración legacy"],
    descLong: {
      es: "Migración de un sistema legacy en Visual Basic a una arquitectura moderna con .NET 10 y React, desarrollada durante mis prácticas en Mercanza (sector de salud laboral). Incluye conexión con SQL Server y forma parte de un caso de estudio profesional real, no un ejercicio académico.",
      en: "Migration of a legacy Visual Basic system to a modern .NET 10 + React architecture, built during my internship at Mercanza (occupational health sector). Includes a SQL Server connection and is part of a real professional case study, not an academic exercise.",
    },
    problem: {
      es: "Mercanza necesitaba modernizar un sistema interno crítico escrito en Visual Basic, obsoleto y difícil de mantener, sin interrumpir la operativa diaria de la empresa.",
      en: "Mercanza needed to modernize a critical internal system written in obsolete, hard-to-maintain Visual Basic, without disrupting the company's day-to-day operations.",
    },
    solution: {
      es: "Durante mis prácticas, participé en la migración del sistema hacia una arquitectura moderna con .NET 10 en el backend, React en el frontend y SQL Server como base de datos, integrándome en el equipo de desarrollo real de la empresa.",
      en: "During my internship, I took part in migrating the system to a modern architecture with .NET 10 on the backend, React on the frontend and SQL Server as the database, working as part of the company's real development team.",
    },
    demonstrates: {
      es: "Capacidad para trabajar sobre código legacy ajeno, coordinarme dentro de un equipo de desarrollo profesional y llevar una migración real de principio a fin.",
      en: "Ability to work with someone else's legacy code, coordinate within a professional development team, and carry a real migration through from start to finish.",
    },
    features: [
      { es: "Migración de módulos VB a servicios .NET 10", en: "Migration of VB modules to .NET 10 services" },
      { es: "Nueva interfaz en React para los flujos existentes", en: "New React interface for existing workflows" },
      { es: "Conexión y consultas sobre SQL Server", en: "SQL Server connection and querying" },
      { es: "Coordinación con el equipo de desarrollo de Mercanza", en: "Coordination with the Mercanza development team" },
    ],
    learnings: [
      { es: "Cómo abordar código legacy sin romper funcionalidad en producción", en: "How to approach legacy code without breaking production functionality" },
      { es: "Trabajo en equipo bajo estándares y procesos de una empresa real", en: "Teamwork under the standards and processes of a real company" },
      { es: "Diseño de una migración progresiva en lugar de una reescritura total", en: "Designing a gradual migration instead of a full rewrite" },
    ],
    links: { code: null, web: null, figma: null },
  },
  {
    name: "GoFight",
    cats: ["movil", "programacion"],
    mediaIcon: "llama",
    screenshot: null,
    video: null,
    badge: { es: "Proyecto en equipo", en: "Team project" },
    descShort: {
      es: "App de gestión de clases de boxeo — proyecto final DAM en equipo.",
      en: "Boxing class management app — DAM team final project.",
    },
    stackFull: ["React Native", "Node.js", "PostgreSQL", "Prisma ORM"],
    descLong: {
      es: "Aplicación móvil para la gestión y el seguimiento de entrenamientos de boxeo, desarrollada en equipo como proyecto final de FP DAM junto a Mario Hernández Moreno y Ayoub Arramdani. Backend en Node.js con PostgreSQL y Prisma ORM sobre una arquitectura cliente-servidor, con un sistema de gamificación por rachas y puntos para fomentar la constancia en el entrenamiento.",
      en: "Mobile app for managing and tracking boxing training, built as a team for my DAM final project with Mario Hernández Moreno and Ayoub Arramdani. Node.js backend with PostgreSQL and Prisma ORM on a client-server architecture, with a streaks-and-points gamification system to encourage consistent training.",
    },
    problem: {
      es: "El seguimiento de entrenamientos de boxeo se suele llevar de forma manual o dispersa, lo que dificulta mantener la constancia y ver el progreso real.",
      en: "Boxing training is usually tracked manually or scattered across notes, making it hard to stay consistent and see real progress.",
    },
    solution: {
      es: "Diseñamos y construimos en equipo una app móvil con React Native y un backend en Node.js, PostgreSQL y Prisma ORM, con un sistema de gamificación por rachas y puntos para motivar la constancia en el entrenamiento.",
      en: "As a team, we designed and built a React Native mobile app with a Node.js, PostgreSQL and Prisma ORM backend, including a streaks-and-points gamification system to motivate consistent training.",
    },
    demonstrates: {
      es: "Trabajo en equipo sobre un proyecto completo de principio a fin, y capacidad de pensar en experiencia de usuario más allá de la parte puramente técnica.",
      en: "Teamwork on a complete end-to-end project, and the ability to think about user experience beyond the purely technical side.",
    },
    features: [
      { es: "Registro y seguimiento de sesiones de entrenamiento", en: "Logging and tracking of training sessions" },
      { es: "Sistema de rachas y puntos para fomentar la constancia", en: "Streaks and points system to encourage consistency" },
      { es: "Arquitectura cliente-servidor con API en Node.js", en: "Client-server architecture with a Node.js API" },
      { es: "Persistencia de datos con PostgreSQL y Prisma ORM", en: "Data persistence with PostgreSQL and Prisma ORM" },
      { es: "Interfaz móvil multiplataforma con React Native", en: "Cross-platform mobile interface with React Native" },
      { es: "Reparto de tareas y trabajo coordinado en equipo", en: "Task distribution and coordinated teamwork" },
    ],
    learnings: [
      { es: "Diseño de una arquitectura cliente-servidor desde cero", en: "Designing a client-server architecture from scratch" },
      { es: "Uso de Prisma ORM como capa de acceso a datos", en: "Using Prisma ORM as a data-access layer" },
      { es: "Aplicar gamificación como palanca de motivación real", en: "Applying gamification as a real motivation lever" },
      { es: "Coordinación de un proyecto en equipo con control de versiones", en: "Coordinating a team project with version control" },
    ],
    links: { code: "https://github.com/agustinlinares/GoFight", web: null, figma: null },
  },
  {
    name: "ChatbotWebHotelCostaAzul",
    cats: ["web"],
    mediaIcon: "chat",
    screenshot: null,
    video: null,
    badge: { es: "Proyecto de automatización", en: "Automation project" },
    descShort: { es: "Chatbot con Landbot para un hotel de Málaga.", en: "Landbot-based chatbot for a hotel in Málaga." },
    stackFull: ["Landbot", "HTML"],
    descLong: {
      es: "Chatbot conversacional construido con Landbot para automatizar la atención al cliente de un hotel en Málaga: resolución de dudas frecuentes, información de reservas y primer contacto con los huéspedes desde la propia web.",
      en: "Conversational chatbot built with Landbot to automate customer service for a hotel in Málaga: answering frequent questions, booking information and first contact with guests directly from the website.",
    },
    problem: {
      es: "El hotel recibía de forma constante las mismas preguntas de huéspedes (horarios, servicios, reservas) sin poder darles una respuesta inmediata fuera del horario de atención.",
      en: "The hotel constantly received the same guest questions (schedules, services, bookings) without being able to answer them immediately outside staffed hours.",
    },
    solution: {
      es: "Configuré un chatbot con Landbot integrado directamente en la web del hotel para resolver las dudas más frecuentes y dar un primer contacto inmediato a los huéspedes.",
      en: "I configured a Landbot chatbot integrated directly into the hotel's website to answer the most frequent questions and give guests an immediate first point of contact.",
    },
    demonstrates: {
      es: "Capacidad de aplicar herramientas no-code/low-code para resolver un problema real de negocio de forma rápida y sin sobredimensionar la solución.",
      en: "Ability to apply no-code/low-code tools to solve a real business problem quickly, without over-engineering the solution.",
    },
    features: [
      { es: "Respuestas automáticas a preguntas frecuentes", en: "Automated answers to frequent questions" },
      { es: "Información de reservas y servicios del hotel", en: "Booking and hotel services information" },
      { es: "Integración directa en la web del hotel", en: "Direct integration into the hotel website" },
    ],
    learnings: [
      { es: "Diseño de flujos conversacionales orientados al usuario", en: "Designing user-oriented conversational flows" },
      { es: "Uso de herramientas no-code para resolver necesidades reales", en: "Using no-code tools to solve real needs" },
    ],
    links: {
      code: "https://github.com/agustinlinares/ChatbotWebHotelCostaAzul",
      web: "https://chatbot-web-hotel-costa-azul.vercel.app",
      figma: null,
    },
  },
  {
    name: "Copisteria_Biblioteca",
    cats: ["programacion"],
    mediaIcon: "libro",
    screenshot: null,
    video: null,
    badge: { es: "Ejercicio académico", en: "Academic exercise" },
    descShort: { es: "Ejercicio de programación concurrente.", en: "Concurrent-programming exercise." },
    stackFull: ["Java", "Concurrencia"],
    descLong: {
      es: "Ejercicio de programación concurrente en Java: simulación de la gestión de préstamos y copias en una biblioteca, con control de acceso concurrente a los recursos compartidos para evitar condiciones de carrera.",
      en: "Concurrent-programming exercise in Java: simulating loan and copy management in a library, with concurrent access control over shared resources to avoid race conditions.",
    },
    problem: {
      es: "Cuando varios procesos acceden a la vez a un mismo recurso compartido (como el préstamo de un libro), pueden producirse condiciones de carrera si no se controla ese acceso.",
      en: "When several processes access the same shared resource at once (like borrowing a book), race conditions can occur if that access isn't properly controlled.",
    },
    solution: {
      es: "Implementé en Java una simulación de la gestión de préstamos y copias de una biblioteca, con control de acceso concurrente mediante hilos y sincronización para evitar condiciones de carrera.",
      en: "I implemented a Java simulation of library loan and copy management, with concurrent access control using threads and synchronization to avoid race conditions.",
    },
    demonstrates: {
      es: "Comprensión de los fundamentos de concurrencia en Java: hilos, sincronización y prevención de condiciones de carrera.",
      en: "Understanding of Java concurrency fundamentals: threads, synchronization and race-condition prevention.",
    },
    features: [
      { es: "Simulación de préstamos y copias en biblioteca", en: "Simulation of library loans and copies" },
      { es: "Control de acceso concurrente a recursos compartidos", en: "Concurrent access control over shared resources" },
      { es: "Uso de hilos y sincronización en Java", en: "Use of threads and synchronization in Java" },
    ],
    learnings: [
      { es: "Fundamentos de programación concurrente en Java", en: "Fundamentals of concurrent programming in Java" },
      { es: "Prevención de condiciones de carrera con sincronización", en: "Preventing race conditions with synchronization" },
    ],
    links: { code: "https://github.com/agustinlinares/Copisteria_Biblioteca", web: null, figma: null },
  },
  {
    name: "Odoo_Gestion_Manual",
    cats: ["bases-de-datos", "programacion"],
    mediaIcon: "odoo-badge",
    screenshot: null,
    video: null,
    badge: { es: "Documentación técnica", en: "Technical documentation" },
    descShort: { es: "Documentación técnica de gestión en Odoo.", en: "Technical documentation for Odoo management." },
    stackFull: ["Odoo", "Documentación técnica"],
    descLong: {
      es: "Manual técnico de gestión en Odoo: documentación de la configuración y el uso del ERP para la administración de procesos de negocio.",
      en: "Technical management manual for Odoo: documentation covering ERP configuration and use for business-process administration.",
    },
    problem: {
      es: "Un ERP como Odoo tiene muchos módulos y opciones de configuración, y sin una documentación clara resulta difícil de usar y mantener de forma consistente.",
      en: "An ERP like Odoo has many modules and configuration options, and without clear documentation it becomes hard to use and maintain consistently.",
    },
    solution: {
      es: "Elaboré un manual técnico que documenta paso a paso la configuración y el uso de Odoo para la gestión de procesos de negocio.",
      en: "I put together a technical manual that documents, step by step, Odoo's configuration and use for managing business processes.",
    },
    demonstrates: {
      es: "Capacidad para entender un sistema ERP complejo y documentarlo de forma clara y ordenada.",
      en: "Ability to understand a complex ERP system and document it clearly and in an organized way.",
    },
    features: [
      { es: "Documentación de la configuración del ERP", en: "Documentation of ERP configuration" },
      { es: "Guía de uso para procesos de negocio", en: "Usage guide for business processes" },
    ],
    learnings: [
      { es: "Funcionamiento interno de un ERP como Odoo", en: "Inner workings of an ERP like Odoo" },
      { es: "Cómo documentar procesos técnicos de forma clara", en: "How to document technical processes clearly" },
    ],
    links: { code: "https://github.com/agustinlinares/Odoo_Gestion_Manual", web: "https://odoo-manuales.netlify.app", figma: null },
  },
];

export const ODOO_BADGE_ICON_URL = SIMPLE_ICON("odoo");
export const GITHUB_BADGE_ICON_URL = SIMPLE_ICON("github");

export const GITHUB_TILE = {
  badge: { es: "Repositorio completo", en: "Full repository" },
  title: { es: "Más proyectos y evolución técnica", en: "More projects & technical growth" },
  desc: {
    es: "Consulta el resto de repositorios: ejercicios, prácticas y proyectos con los que sigo aprendiendo.",
    en: "Check out the rest of my repositories: exercises, coursework and projects I keep learning from.",
  },
  tags: ["Java", "Python", "Web", "SQL"],
  cta: { es: "Ver en GitHub", en: "View on GitHub" },
};
