"use client";

import { useState } from "react";
import { T } from "@/context/LangContext";
import { usePdfModal } from "@/context/PdfModalContext";
import { useReveal } from "./useReveal";

type TabId = "experiencia" | "formacion" | "certificaciones" | "idiomas";

const TABS: { id: TabId; es: string; en: string }[] = [
  { id: "experiencia", es: "Experiencia", en: "Experience" },
  { id: "formacion", es: "Formación", en: "Education" },
  { id: "certificaciones", es: "Certificaciones", en: "Certifications" },
  { id: "idiomas", es: "Idiomas", en: "Languages" },
];

const MERCANZA_BULLETS: { es: string; en: string }[] = [
  { es: "Desarrollé módulos completos de frontend en React", en: "Built complete React frontend modules" },
  { es: "Construí endpoints REST en .NET 10 con ASP.NET Core y Entity Framework Core", en: "Built REST endpoints in .NET 10 with ASP.NET Core and Entity Framework Core" },
  { es: "Implementé control de acceso por roles y perfiles de usuario sobre los endpoints", en: "Implemented role- and profile-based access control on the endpoints" },
  { es: "Diseñé e implementé un sistema de auditoría/log de operaciones de escritura en base de datos", en: "Designed and implemented an audit/log system for database write operations" },
  { es: "Apliqué lógica de baja lógica (soft-delete) conservando trazabilidad e histórico", en: "Applied soft-delete logic while preserving traceability and history" },
  { es: "Resolví conflictos de migraciones EF Core y problemas de esquema en SQL Server", en: "Resolved EF Core migration conflicts and SQL Server schema issues" },
  { es: "Trabajé con joins complejos sobre múltiples tablas (Poblaciones, Provincias, Mutuas, Centros)", en: "Worked with complex joins across multiple tables (Poblaciones, Provincias, Mutuas, Centros)" },
  { es: "Integré geolocalización con mapa interactivo en formularios", en: "Integrated geolocation with an interactive map in forms" },
  { es: "Construí grids interactivos con DevExtreme (filtros, paginación, exportación Excel/PDF)", en: "Built interactive DevExtreme grids (filters, pagination, Excel/PDF export)" },
  { es: "Gestioné el flujo Git con doble remoto (GitLab equipo + GitHub personal) y resolución de conflictos en equipo", en: "Managed a dual-remote Git workflow (team GitLab + personal GitHub) and team conflict resolution" },
];

const MERCANZA_PROJECTS: { name: { es: string; en: string }; desc: { es: string; en: string } }[] = [
  { name: { es: "MZ-Asistencial", en: "MZ-Asistencial" }, desc: { es: ".NET 10 · React · SQL Server — Migración de sistema legacy VB a stack moderno", en: ".NET 10 · React · SQL Server — Migration of a legacy VB system to a modern stack" } },
  { name: { es: "Centros Propios", en: "Centros Propios" }, desc: { es: "React · DevExtreme · ASP.NET Core — CRUD completo con control de acceso por perfil", en: "React · DevExtreme · ASP.NET Core — Full CRUD with profile-based access control" } },
  { name: { es: "Conciertos", en: "Conciertos" }, desc: { es: "React · Entity Framework Core · SQL Server — Módulo con baja lógica, auditoría y joins complejos", en: "React · Entity Framework Core · SQL Server — Module with soft-delete, auditing and complex joins" } },
  { name: { es: "Dashboard", en: "Dashboard" }, desc: { es: "React · Recharts — Visualización de datos con gráficos interactivos", en: "React · Recharts — Data visualization with interactive charts" } },
  { name: { es: "ICG06 / Descuadres", en: "ICG06 / Descuadres" }, desc: { es: "React · .NET 10 — Módulos de gestión y control de informes", en: "React · .NET 10 — Reporting and control management modules" } },
];

const TRAINEE_BULLETS = [
  { es: "Configuración de los módulos de SAP SuccessFactors a los clientes", en: "Configured SAP SuccessFactors modules for clients" },
  { es: "Tareas de mantenimiento, gestionando y resolviendo correctivos, evolutivos y soporte", en: "Maintenance work, managing and resolving fixes, enhancements and support" },
  { es: "Participar en las distintas fases del proyecto", en: "Took part in the project's different phases" },
];

const CONSULTOR_BULLETS = [
  { es: "Mantenimiento de Hojas de Gasto para los clientes con SAP Concur", en: "Maintained expense reports for clients using SAP Concur" },
  { es: "Monitorización del sistema de SAP Concur", en: "Monitored the SAP Concur system" },
  { es: "Creación, revisión y supervisión de la gestión de SAP S/4 HANA según los objetivos estratégicos de los clientes, los requisitos de los usuarios y las especificaciones funcionales", en: "Created, reviewed and oversaw SAP S/4 HANA management per clients' strategic goals, user requirements and functional specs" },
  { es: "Colaboración con los desarrolladores ABAP dentro del proceso de diseño funcional del producto para el cliente", en: "Collaborated with ABAP developers within the product's functional design process for the client" },
  { es: "Definición del alcance y los elementos pendientes de los proyectos", en: "Defined project scope and outstanding items" },
  { es: "Participación en las distintas interacciones y contacto directo con Recursos Humanos y equipo de soporte/consultores SAP", en: "Took part in stakeholder interactions and direct contact with HR and the SAP support/consulting team" },
  { es: "Actuación como enlace entre los grupos de negocio y los analistas de negocio y sistemas de IT", en: "Acted as a liaison between business groups and business/IT systems analysts" },
];

function ExpCardMercanza() {
  const { openPdfModal } = usePdfModal();
  return (
    <div className="exp-card">
      <div className="exp-card-top">
        <div className="exp-icon exp-icon-alt exp-icon-mercanza">
          <span className="exp-icon-mark">M</span>
        </div>
        <div>
          <h3 className="exp-title">Mercanza</h3>
          <p className="exp-meta">
            <T es="4 meses · En remoto · Leganés (Madrid)" en="4 months · Remote · Leganés (Madrid)" />
          </p>
        </div>
      </div>
      <p className="exp-desc">
        <T
          es="Empresa especializada en soluciones tecnológicas para el sector de la salud laboral. Participé en el desarrollo real de MZ-Asistencial, una aplicación empresarial en migración de un sistema legacy Visual Basic a un stack moderno."
          en="Company specializing in technology solutions for occupational health. I took part in the real development of MZ-Asistencial, a business application being migrated from a legacy Visual Basic system to a modern stack."
        />
      </p>
      <div className="exp-positions">
        <div className="exp-position">
          <p className="exp-position-role">
            <T es="Desarrollador de FullStack multiplataforma" en="FullStack Multiplatform Developer" />
          </p>
          <span className="exp-position-meta">
            <T es="Jornada parcial · mar. 2026 – jun. 2026 · 4 meses" en="Part-time · Mar 2026 – Jun 2026 · 4 months" />
          </span>
          <ul className="exp-position-bullets">
            {MERCANZA_BULLETS.map((b, i) => (
              <li key={i}>
                <T {...b} />
              </li>
            ))}
          </ul>
          <div className="exp-position-projects">
            {MERCANZA_PROJECTS.map((p, i) => (
              <div className="exp-position-project" key={i}>
                <strong>
                  <T {...p.name} />
                </strong>
                <span>
                  <T {...p.desc} />
                </span>
              </div>
            ))}
          </div>
          <div className="exp-position-actions">
            <button
              type="button"
              className="btn-pill btn-pill-ghost btn-pill-sm"
              onClick={() => openPdfModal("carta-referencia-mercanza.pdf", "Carta de referencia — Mercanza")}
            >
              <T es="Recibí una carta de referencia (PDF, 314 KB)" en="I received a reference letter (PDF, 314 KB)" />
            </button>
          </div>
        </div>
      </div>
      <div className="exp-tags">
        {["React", "JavaScript", ".NET 10", "C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "DevExtreme", "Recharts", "Git", "GitLab", "GitHub"].map(
          (t) => (
            <span className="exp-tag" key={t}>
              {t}
            </span>
          )
        )}
      </div>
    </div>
  );
}

function ExpCardNTT() {
  return (
    <div className="exp-card">
      <div className="exp-card-top">
        <div className="exp-icon exp-icon-ntt">
          <span className="exp-icon-mark">
            NTT
            <br />
            DATA
          </span>
        </div>
        <div>
          <h3 className="exp-title">NTT Data</h3>
          <p className="exp-meta">
            <T es="11 meses · En remoto · Sevilla" en="11 months · Remote · Seville" />
          </p>
        </div>
      </div>
      <p className="exp-desc">
        <T
          es="Multinacional japonesa de gestión de servicios tecnológicos y de comunicaciones especializada en la integración de sistemas. Progresé de Trainee a Consultor Junior dentro del área de SAP SuccessFactors / SAP HCM."
          en="Japanese multinational providing technology and communications services, specializing in systems integration. I progressed from Trainee to Junior Consultant within the SAP SuccessFactors / SAP HCM area."
        />
      </p>
      <div className="exp-positions">
        <div className="exp-position">
          <p className="exp-position-role">
            <T es="Trainee SAP SuccessFactors / SAP HCM" en="Trainee, SAP SuccessFactors / SAP HCM" />
          </p>
          <span className="exp-position-meta">
            <T es="Jornada parcial · may. 2021 – ago. 2021 · 4 meses" en="Part-time · May 2021 – Aug 2021 · 4 months" />
          </span>
          <ul className="exp-position-bullets">
            {TRAINEE_BULLETS.map((b, i) => (
              <li key={i}>
                <T {...b} />
              </li>
            ))}
          </ul>
          <div className="exp-position-projects">
            <div className="exp-position-project">
              <strong>
                <T es="Proyecto SAP SuccessFactors" en="SAP SuccessFactors project" />
              </strong>
              <span>
                <T es="Implementación para Ilunion." en="Implementation for Ilunion." />
              </span>
            </div>
          </div>
        </div>
        <div className="exp-position">
          <p className="exp-position-role">
            <T es="Consultor Junior SAP SuccessFactors / SAP HCM" en="Junior Consultant, SAP SuccessFactors / SAP HCM" />
          </p>
          <span className="exp-position-meta">
            <T es="Jornada completa · ago. 2021 – mar. 2022 · 8 meses" en="Full-time · Aug 2021 – Mar 2022 · 8 months" />
          </span>
          <ul className="exp-position-bullets">
            {CONSULTOR_BULLETS.map((b, i) => (
              <li key={i}>
                <T {...b} />
              </li>
            ))}
          </ul>
          <div className="exp-position-projects">
            <div className="exp-position-project">
              <strong>
                <T es="Proyecto SAP Concur" en="SAP Concur project" />
              </strong>
              <span>
                <T
                  es="Mantenimiento de Hojas de Gasto para Repsol o Estrella Galicia entre otras compañías. Monitorización del sistema para Repsol."
                  en="Maintained expense reports for Repsol, Estrella Galicia and other companies. Monitored the system for Repsol."
                />
              </span>
            </div>
            <div className="exp-position-project">
              <strong>
                <T es="Proyecto OneERP" en="OneERP project" />
              </strong>
              <span>
                <T
                  es="Mantenimiento de Hojas de Gastos en SAP S/4 HANA, Captio y SAP Fiori. Mantenimiento de la planificación en los subcontratados en SAP S/4 HANA y Fiori."
                  en="Maintained expense reports in SAP S/4 HANA, Captio and SAP Fiori. Maintained subcontractor scheduling in SAP S/4 HANA and Fiori."
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="exp-tags">
        {["SAP HCM", "SAP SuccessFactors Employee Central", "SAP S/4 HANA", "SAP Fiori", "SAP Concur", "Captio"].map((t) => (
          <span className="exp-tag" key={t}>
            {t}
          </span>
        ))}
        <span className="exp-tag">
          <T es="ABAP (funcional)" en="ABAP (functional)" />
        </span>
      </div>
    </div>
  );
}

interface FormacionItem {
  date: { es: string; en: string };
  title: { es: string; en: string };
  school: React.ReactNode;
  bullets?: { es: string; en: string }[];
  actions?: React.ReactNode;
}

function FormacionRow({ item, index }: { item: FormacionItem; index: number }) {
  const ref = useReveal<HTMLDivElement>(index);
  return (
    <div className="formacion-item" ref={ref}>
      <span className="formacion-date">
        <T {...item.date} />
      </span>
      <h3 className="formacion-title">
        <T {...item.title} />
      </h3>
      <p className="formacion-school">{item.school}</p>
      {item.bullets && (
        <ul className="formacion-bullets">
          {item.bullets.map((b, i) => (
            <li key={i}>
              <T {...b} />
            </li>
          ))}
        </ul>
      )}
      {item.actions && <div className="formacion-actions">{item.actions}</div>}
    </div>
  );
}

function Formacion() {
  const { openPdfModal } = usePdfModal();
  const items: FormacionItem[] = [
    {
      date: { es: "sep. 2026 en adelante", en: "Sep 2026 – present" },
      title: { es: "FP Desarrollo de Aplicaciones Web (DAW)", en: "Vocational Training in Web Application Development (DAW)" },
      school: "PrometeoFP · ThePower",
    },
    {
      date: { es: "feb. 2025 en adelante", en: "Feb 2025 – present" },
      title: { es: "Máster Desarrollo FullStack", en: "FullStack Development Master's" },
      school: "Universidad Católica San Antonio de Murcia (UCAM) / ThePower",
      bullets: [
        { es: "Desarrollo web con HTML, CSS y JavaScript", en: "Web development with HTML, CSS and JavaScript" },
        { es: "Frontend con Vite, React y manejo del DOM", en: "Frontend with Vite, React and DOM handling" },
        { es: "Control de versiones con Git", en: "Version control with Git" },
        { es: "Diseño y consumo de APIs REST", en: "Designing and consuming REST APIs" },
      ],
    },
    {
      date: { es: "sep. 2024 – jul. 2026", en: "Sep 2024 – Jul 2026" },
      title: { es: "FP Desarrollo de Aplicaciones Multiplataforma (DAM)", en: "Vocational Training in Multiplatform App Development (DAM)" },
      school: (
        <>
          PrometeoFP · ThePower |{" "}
          <T es="Nota Media: 8,39" en="Average Grade: 8.39" />
        </>
      ),
      bullets: [
        { es: "Programación Java (POO, herencia, colecciones)", en: "Java programming (OOP, inheritance, collections)" },
        { es: "Interfaces JavaSwing y entornos gráficos", en: "JavaSwing interfaces and graphical environments" },
        { es: "Kotlin y desarrollo Android Studio", en: "Kotlin and Android Studio development" },
        { es: "Bases de datos: modelado, SQL, MySQL", en: "Databases: modeling, SQL, MySQL" },
      ],
      actions: (
        <button
          type="button"
          className="btn-pill btn-pill-ghost btn-pill-sm"
          onClick={() =>
            openPdfModal(
              "tfg-gofight.pdf",
              "TFG — GoFight",
              "Trabajo de Fin de Grado (FP DAM) desarrollado en equipo: GoFight, una aplicación móvil para la gestión y el seguimiento de entrenamientos de boxeo. Permite registrar rutinas y ejercicios, registrar las sesiones realizadas y consultar el progreso, con un sistema de gamificación basado en rachas y puntos para fomentar la constancia. Desarrollado con Node.js, PostgreSQL y Prisma ORM sobre una arquitectura cliente-servidor.",
              "Final Degree Project (Vocational Training, DAM) built as a team: GoFight, a mobile app for managing and tracking boxing training. It lets users browse training routines and exercises, log completed sessions and track progress, with a gamification system based on streaks and points to encourage consistency. Built with Node.js, PostgreSQL and Prisma ORM on a client-server architecture."
            )
          }
        >
          <T es="Ver TFG (PDF, 2,2 MB)" en="View final project (PDF, 2.2 MB)" />
        </button>
      ),
    },
    {
      date: { es: "oct. 2022 – abr. 2023", en: "Oct 2022 – Apr 2023" },
      title: { es: "Curso Especialista SAP SuccessFactors", en: "SAP SuccessFactors Specialist Course" },
      school: "Cloud Formación",
      bullets: [
        { es: "Configuración del módulo Employee Central y administración de personal", en: "Employee Central module setup and personnel administration" },
        { es: "Metadata Framework (MDF) y reglas de negocio", en: "Metadata Framework (MDF) and business rules" },
        { es: "Gestión de estructura organizativa y puestos", en: "Organizational structure and position management" },
        { es: "Preparación para la certificación oficial (C_THR81_2505)", en: "Preparation for the official certification (C_THR81_2505)" },
      ],
    },
    {
      date: { es: "sept. 2019 – ago. 2021", en: "Sept 2019 – Aug 2021" },
      title: { es: "Máster en Consultoría SAP HCM", en: "SAP HCM Consulting Master's" },
      school: (
        <>
          Tokio School | <T es="Nota Media: Matrícula de Honor" en="Average Grade: Honors" />
        </>
      ),
      bullets: [
        { es: "Estructuras HCM y planificación organizativa (THR10)", en: "HCM structures and organizational planning (THR10)" },
        { es: "Gestión de nóminas y procesos de pago (THR12)", en: "Payroll management and payment processes (THR12)" },
        { es: "Administración de tiempos, ausencias y datos maestros", en: "Time, absence and master data administration" },
        { es: "Proyecto final: implementación de procesos de RRHH", en: "Final project: HR process implementation" },
      ],
      actions: (
        <>
          <a
            href="https://www.tokioschool.com/noticias/opiniones-agustin-linares-alumno-sap/"
            target="_blank"
            rel="noopener"
            className="btn-pill btn-pill-ghost btn-pill-sm"
          >
            <T es="Me hicieron una entrevista" en="I was interviewed" />
          </a>
          <button
            type="button"
            className="btn-pill btn-pill-ghost btn-pill-sm"
            onClick={() =>
              openPdfModal(
                "tfm-sap-hcm.pdf",
                "Proyecto final — Máster SAP HCM",
                "Proyecto final 2020. Implementación ficticia del Módulo HCM para el cliente Renault-Nissan-Mitsubishi. Mi Proyecto Final fue la implementación del Programa SAP ERP para Groupe Renault en España y al resto de empresas de la Alianza Renault-Nissan-Mitsubishi.",
                "Final project 2020. Fictitious implementation of the HCM Module for the client Renault-Nissan-Mitsubishi. My Final Project was the implementation of the SAP ERP Program for Groupe Renault in Spain and the rest of the companies in the Renault-Nissan-Mitsubishi Alliance."
              )
            }
          >
            <T es="Ver TFM (PDF, 8,4 MB)" en="View final project (PDF, 8.4 MB)" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="formacion-timeline">
      {items.map((item, i) => (
        <FormacionRow item={item} index={i} key={item.title.es} />
      ))}
    </div>
  );
}

function CertItem({ name, status, statusClass, index }: { name: { es: string; en: string }; status: { es: string; en: string }; statusClass: string; index: number }) {
  const ref = useReveal<HTMLDivElement>(index);
  return (
    <div className="cert-item" ref={ref}>
      <span className="cert-name">
        <T {...name} />
      </span>
      <span className={`cert-status ${statusClass}`}>
        <T {...status} />
      </span>
    </div>
  );
}

function Certificaciones() {
  const items = [
    { name: { es: "AI-901: Introducción a la IA en Azure", en: "AI-901: Introduction to AI in Azure" }, status: { es: "En proceso", en: "In progress" } },
    { name: { es: "THR10 — Gestión de Personal y Organización (SAP HCM)", en: "THR10 — Personnel Administration and Organizational Management (SAP HCM)" }, status: { es: "Pendiente de estudio", en: "Pending study" } },
    { name: { es: "THR12 — Nóminas y Procesos de Pago (SAP HCM)", en: "THR12 — Payroll and Payment Processes (SAP HCM)" }, status: { es: "Pendiente de estudio", en: "Pending study" } },
    { name: { es: "C_THR81_2505 — SAP SuccessFactors Employee Central Core", en: "C_THR81_2505 — SAP SuccessFactors Employee Central Core" }, status: { es: "Pendiente de estudio", en: "Pending study" } },
  ];
  return (
    <div className="cert-list">
      {items.map((it, i) => (
        <CertItem key={it.name.es} name={it.name} status={it.status} statusClass="cert-status-progress" index={i} />
      ))}
    </div>
  );
}

function Idiomas() {
  const items = [
    { name: { es: "Español", en: "Spanish" }, status: { es: "Nativo", en: "Native" } },
    { name: { es: "Inglés", en: "English" }, status: { es: "B2", en: "B2" } },
  ];
  return (
    <div className="cert-list">
      {items.map((it, i) => (
        <CertItem key={it.name.es} name={it.name} status={it.status} statusClass="cert-status-done" index={i} />
      ))}
    </div>
  );
}

export default function Experiencia() {
  const [tab, setTab] = useState<TabId>("experiencia");
  const revealHeading = useReveal<HTMLHeadingElement>(0);
  const revealTabs = useReveal<HTMLDivElement>(1);
  const revealCard0 = useReveal<HTMLDivElement>(0);
  const revealCard1 = useReveal<HTMLDivElement>(1);

  return (
    <section id="experiencia">
      <h2 className="exp-heading" ref={revealHeading}>
        <T
          es="Donde he aprendido código, dónde lo he aplicado y estoy certificado"
          en="Where I've learned to code, where I've applied it, and where I'm certified"
        />
      </h2>
      <div className="exp-tabs" role="tablist" ref={revealTabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`exp-tab-btn${tab === t.id ? " active" : ""}`}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            <T es={t.es} en={t.en} />
          </button>
        ))}
      </div>

      {tab === "experiencia" && (
        <div className="exp-tab-panel" role="tabpanel">
          <div className="exp-list">
            <div ref={revealCard0}>
              <ExpCardMercanza />
            </div>
            <div ref={revealCard1}>
              <ExpCardNTT />
            </div>
          </div>
        </div>
      )}
      {tab === "formacion" && (
        <div className="exp-tab-panel" role="tabpanel">
          <Formacion />
        </div>
      )}
      {tab === "certificaciones" && (
        <div className="exp-tab-panel" role="tabpanel">
          <Certificaciones />
        </div>
      )}
      {tab === "idiomas" && (
        <div className="exp-tab-panel" role="tabpanel">
          <Idiomas />
        </div>
      )}
    </section>
  );
}
