"use client";

import { T } from "@/context/LangContext";
import { ODS_GOALS } from "@/data/odsGoals";
import TechCountStat from "./TechCountStat";
import { useReveal } from "./useReveal";

interface SkillNode {
  topText: { es: string; en: string };
  topLabel: { es: string; en: string };
  num: string;
  icon: React.ReactNode;
  bottomLabel: { es: string; en: string };
  bottomText: { es: string; en: string };
}

const SKILLS: SkillNode[] = [
  {
    topText: {
      es: "Vengo de un perfil analítico (consultoría SAP HCM) — busco la causa raíz antes de programar la solución.",
      en: "I come from an analytical background (SAP HCM consulting) — I look for the root cause before coding the fix.",
    },
    topLabel: { es: "Resolución de problemas", en: "Problem solving" },
    num: "01.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.3V16h6v-1.2c0-.9.4-1.7 1-2.3A6 6 0 0 0 12 2Z" />
      </svg>
    ),
    bottomLabel: { es: "Adaptabilidad", en: "Adaptability" },
    bottomText: {
      es: "Mi cambio de carrera hacia el desarrollo me ha entrenado para adaptarme rápido a tecnologías y contextos nuevos.",
      en: "My career change into development has trained me to adapt quickly to new technologies and contexts.",
    },
  },
  {
    topText: {
      es: "Aprendí a programar por mi cuenta y sigo formándome — así pasé de RRHH al desarrollo de software.",
      en: "I taught myself to code and keep training on my own — that's how I moved from HR into software development.",
    },
    topLabel: { es: "Aprendizaje autónomo", en: "Self-directed learning" },
    num: "02.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c3 2 5 6 4 11-1 1-3 2-4 2s-3-1-4-2c-1-5 1-9 4-11Z" />
        <path d="M9 15c-2 1-3 3-3 6 3 0 5-1 6-3" />
        <path d="M15 15c2 1 3 3 3 6-3 0-5-1-6-3" />
        <circle cx="12" cy="9" r="1.6" />
      </svg>
    ),
    bottomLabel: { es: "Trabajo en equipo", en: "Teamwork" },
    bottomText: {
      es: "En GoFight trabajé con un equipo de 3 personas, repartiendo tareas y apoyándonos entre todos.",
      en: "On GoFight I worked with a team of 3, splitting tasks and supporting each other.",
    },
  },
  {
    topText: {
      es: "Antes de programar, entiendo el proceso de negocio — un hábito que traigo de la consultoría SAP.",
      en: "Before coding, I make sure I understand the business process — a habit from SAP consulting.",
    },
    topLabel: { es: "Pensamiento analítico", en: "Analytical thinking" },
    num: "03.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 17 9 11 13 15 21 6" />
        <polyline points="15 6 21 6 21 12" />
      </svg>
    ),
    bottomLabel: { es: "Atención al detalle", en: "Attention to detail" },
    bottomText: {
      es: "Dar soporte a incidencias en producción me enseñó a revisar cada caso con cuidado.",
      en: "Handling production incidents taught me to review every case carefully.",
    },
  },
  {
    topText: {
      es: "Compagino formación, prácticas y proyectos personales sin perder de vista los plazos.",
      en: "I balance training, work placements and personal projects while keeping deadlines in check.",
    },
    topLabel: { es: "Gestión del tiempo", en: "Time management" },
    num: "04.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="8" />
        <line x1="12" y1="13" x2="12" y2="9" />
        <line x1="9" y1="2" x2="15" y2="2" />
        <line x1="12" y1="2" x2="12" y2="5" />
      </svg>
    ),
    bottomLabel: { es: "Autogestión", en: "Self-management" },
    bottomText: {
      es: "Organizo mis tareas y prioridades de forma autónoma, sin necesitar supervisión constante.",
      en: "I organize my own tasks and priorities without needing constant supervision.",
    },
  },
  {
    topText: {
      es: "Explicar soluciones técnicas a perfiles no técnicos era el día a día como consultor SAP.",
      en: "Explaining technical solutions to non-technical people was daily work as a SAP consultant.",
    },
    topLabel: { es: "Comunicación", en: "Communication" },
    num: "05.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3h8v5a4 4 0 0 1-8 0V3Z" />
        <path d="M8 4H5a2 2 0 0 0 0 4h1.5" />
        <path d="M16 4h3a2 2 0 0 1 0 4h-1.5" />
        <path d="M10 13v3M14 13v3" />
        <path d="M8 20h8" />
        <path d="M9.5 16h5l.5 4h-6l.5-4Z" />
      </svg>
    ),
    bottomLabel: { es: "Proyectos reales", en: "Real-world projects" },
    bottomText: {
      es: "He aplicado todo esto en proyectos como GoFight y MZ-Asistencial, de principio a fin.",
      en: "I've applied all this in real projects like GoFight and MZ-Asistencial, from start to finish.",
    },
  },
];

function SkillNodeView({ s }: { s: SkillNode }) {
  return (
    <div className="skill-node">
      <div className="skill-top">
        <p className="skill-top-text">
          <T {...s.topText} />
        </p>
        <div className="skill-dash skill-dash-accent" />
        <div className="skill-top-label">
          <T {...s.topLabel} />
        </div>
      </div>
      <div className="skill-num">{s.num}</div>
      <div className="skill-circle-wrap">
        <div className="skill-circle-outer" />
        <div className="skill-circle-inner">{s.icon}</div>
      </div>
      <div className="skill-bottom">
        <div className="skill-dash skill-dash-muted" />
        <div className="skill-bottom-label">
          <T {...s.bottomLabel} />
        </div>
        <p className="skill-bottom-text">
          <T {...s.bottomText} />
        </p>
      </div>
    </div>
  );
}

function ValuesDiagram() {
  return (
    <svg className="values-diagram" viewBox="0 0 760 620" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="hubGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <circle cx="380" cy="310" r="95" fill="var(--accent)" opacity="0.28" filter="url(#hubGlow)" />

      <line x1="380" y1="310" x2="380" y2="212" stroke="var(--border)" strokeWidth="2" />
      <line x1="380" y1="310" x2="380" y2="408" stroke="var(--border)" strokeWidth="2" />
      <line x1="380" y1="310" x2="278" y2="310" stroke="var(--border)" strokeWidth="2" />
      <line x1="380" y1="310" x2="482" y2="310" stroke="var(--border)" strokeWidth="2" />

      <circle cx="380" cy="310" r="50" fill="var(--accent)" />
      <text x="380" y="305" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="15" fill="#fff">Mis</text>
      <text x="380" y="323" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="15" fill="#fff">valores</text>

      {/* top: Compromiso */}
      <g className="value-node">
        <circle cx="380" cy="160" r="52" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <g transform="translate(364,144)" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 2 4 6v7c0 6 5 10.5 12 13 7-2.5 12-7 12-13V6L16 2Z" />
          <path d="m11 15 3 3 6-6" />
        </g>
        <text x="380" y="81" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="16" fill="var(--text)">
          <T es="Compromiso" en="Commitment" />
        </text>
        <text x="380" y="98" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="11" fill="var(--text-2)">
          <T es="de principio a fin" en="start to finish" />
        </text>
      </g>

      {/* right: Generosidad */}
      <g className="value-node">
        <circle cx="530" cy="310" r="52" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <g transform="translate(514,294)" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 28s-8.9-5.8-12.4-10.8C1.4 12.9 2.5 8 6.1 6.3 9.3 4.9 12.5 6.3 16 9.7 19.5 6.3 22.7 4.9 25.9 6.3c3.6 1.7 4.7 6.6 2.5 10.9C24.9 22.2 16 28 16 28Z" />
        </g>
        <text x="598" y="305" textAnchor="start" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="16" fill="var(--text)">
          <T es="Generosidad" en="Generosity" />
        </text>
        <text x="598" y="322" textAnchor="start" fontFamily="'Inter',sans-serif" fontSize="11" fill="var(--text-2)">
          <T es="más allá de lo pedido" en="beyond what's asked" />
        </text>
      </g>

      {/* bottom: Transparencia */}
      <g className="value-node">
        <circle cx="380" cy="460" r="52" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <g transform="translate(364,444)" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 16s5.3-9.3 14-9.3S30 16 30 16s-5.3 9.3-14 9.3S2 16 2 16Z" />
          <circle cx="16" cy="16" r="4" />
        </g>
        <text x="380" y="538" textAnchor="middle" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="16" fill="var(--text)">
          <T es="Transparencia" en="Transparency" />
        </text>
        <text x="380" y="555" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="11" fill="var(--text-2)">
          <T es="comunicación clara" en="clear communication" />
        </text>
      </g>

      {/* left: Compartir */}
      <g className="value-node">
        <circle cx="230" cy="310" r="52" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
        <g transform="translate(214,294)" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="7" r="4" />
          <circle cx="8" cy="16" r="4" />
          <circle cx="24" cy="25" r="4" />
          <path d="m11.5 14 9-5M11.5 18l9 5" />
        </g>
        <text x="162" y="305" textAnchor="end" fontFamily="'Space Grotesk',sans-serif" fontWeight="700" fontSize="16" fill="var(--text)">
          <T es="Compartir" en="Sharing" />
        </text>
        <text x="162" y="322" textAnchor="end" fontFamily="'Inter',sans-serif" fontSize="11" fill="var(--text-2)">
          <T es="el conocimiento" en="knowledge" />
        </text>
      </g>
    </svg>
  );
}

export default function MiPerfil() {
  const revealText = useReveal<HTMLDivElement>(0);
  const revealInfo = useReveal<HTMLDivElement>(1);
  const revealSkills = useReveal<HTMLDivElement>(2);

  return (
    <section id="perfil">
      <div className="profile-card">
        <div className="profile-grid">
          <div className="profile-text" ref={revealText}>
            <h2 className="profile-heading">
              <T
                es="Mi trayectoria no empezó en la programación y eso también suma."
                en="My path didn't start in programming and that adds up too."
              />
            </h2>
            <div className="location-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <span>
                <T es="Sevilla, Andalucía · España" en="Seville, Andalusia · Spain" />
              </span>
            </div>
            <p>
              <T
                es="Antes de desarrollar software trabajé en departamentos de recursos humanos, administración, ventas, atención al cliente y he realizado trabajos de montaje y desmontaje de eventos. Esa experiencia me enseñó a entender necesidades, hacer las preguntas correctas y comunicar soluciones con claridad."
                en="Before developing software I worked in human resources, administration, sales and customer service departments, and did event setup/teardown work. That experience taught me to understand needs, ask the right questions and communicate solutions clearly."
              />
            </p>
            <p>
              <T
                es="En 2026 finalicé la formación profesional de Desarrollo de Aplicaciones Multiplataforma (DAM) y en mis prácticas de empresa participé en el proyecto MZ-Asistencial, una aplicación multiplataforma que ayuda a gestionar los recursos necesarios entre centros, mutuas, etc. en un sistema de salud privado para Mercanza. Hoy centro mi perfil tanto en backend como en frontend y continúo especializándome mediante un Máster en Desarrollo y Aplicaciones Web y otras formaciones más."
                en="In 2026 I completed my vocational training in Multiplatform Application Development (DAM), and during my work placement I took part in the MZ-Asistencial project, a multiplatform app that helps manage the resources needed between centers, insurers, etc. within a private healthcare system for Mercanza. Today I focus my profile on both backend and frontend, and I keep specializing through a Master's in Web Application Development and further training."
              />
            </p>
            <div className="profile-btns">
              <a
                href="https://www.linkedin.com/in/agustin-linares-carrera/"
                target="_blank"
                rel="noopener"
                className="btn-pill btn-pill-solid btn-pill-sm"
              >
                <T es="Ver LinkedIn" en="View LinkedIn" />
              </a>
              <a href="#experiencia" className="btn-pill btn-pill-ghost btn-pill-sm">
                <T es="Ver experiencia" en="View experience" />
              </a>
            </div>
          </div>
          <div className="profile-info-list" ref={revealInfo}>
            <div className="profile-info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                <path d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
              </svg>
              <div className="profile-info-text">
                <strong>
                  <T es="Idiomas" en="Languages" />
                </strong>
                <span>
                  <T es="Español · Inglés" en="Spanish · English" />
                </span>
              </div>
            </div>
            <div className="profile-info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A4.5 4.5 0 0 0 6.5 19h11Z" />
              </svg>
              <div className="profile-info-text">
                <strong>SAP HCM</strong>
                <span>
                  <T es="Máster en Consultoría" en="Consulting Master's" />
                </span>
                <strong>SAP SuccessFactors</strong>
                <span>
                  <T es="Módulo Employee Central" en="Employee Central module" />
                </span>
              </div>
            </div>
            <div className="profile-info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
              </svg>
              <div className="profile-info-text">
                <strong>DAM</strong>
                <span>
                  <T es="Titulación oficial finalizada" en="Official qualification completed" />
                </span>
                <strong>DAW</strong>
                <span>
                  <T es="Empiezo en septiembre" en="Starting in September" />
                </span>
              </div>
            </div>
            <div className="profile-info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <div className="profile-info-text">
                <strong>Full-stack</strong>
                <span>Backend &amp; Frontend</span>
                <TechCountStat />
              </div>
            </div>
          </div>
        </div>

        <div className="skills-block" ref={revealSkills}>
          <h3 className="skills-heading">
            <T es="Mis habilidades" en="My skills" />
          </h3>
          <div className="skills-diagram">
            {SKILLS.map((s, i) => (
              <SkillNodeView s={s} key={i} />
            ))}
          </div>
        </div>

        <div className="values-ods-grid">
          <div className="values-col">
            <h3 className="values-heading">
              <T es="Los valores que más me identifican" en="The values that define me most" />
            </h3>
            <ValuesDiagram />
          </div>
          <div className="ods-card">
            <h3 className="ods-heading">
              <T es="Objetivos de Desarrollo Sostenible" en="Sustainable Development Goals" />
            </h3>
            <div className="ods-grid" id="odsGrid">
              {ODS_GOALS.map((g) => (
                <div
                  key={g.n}
                  className="ods-tile"
                  style={{ background: g.color }}
                  title={`${g.n}. ${g.name}`}
                  dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24">${g.icon}</svg>` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="granito-block">
          <svg
            className="granito-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7L5.7 12" />
            <path d="M11.2 19H19a1.8 1.8 0 0 0 1.6-2.7l-1.4-2.4" />
            <path d="m14 16-3 3 3 3" />
            <path d="m8.3 13.6-1.1-4 4-1.1" />
            <path d="m9.3 5.8 1.1-1.9A1.8 1.8 0 0 1 12 3a1.8 1.8 0 0 1 1.5.9l3.9 6.8" />
            <path d="m13.4 9.6 4 1.1 1.1-4" />
          </svg>
          <h3 className="granito-heading">
            <T es="Aportando mi granito de arena" en="Doing my small part" />
          </h3>
          <p className="granito-text">
            <T
              es="Apoyo los Objetivos de Desarrollo Sostenible favoreciendo su integración, ya que uso materiales tecnológicos reacondicionados en mi ámbito laboral y planteo acciones diarias para fomentar la concienciación social hacia el bien común y el cuidado del medio ambiente."
              en="I support the UN Sustainable Development Goals by favoring their integration — I use refurbished tech materials in my work and take daily actions to raise social awareness around the common good and environmental care."
            />
          </p>
        </div>

        <div className="experience-grid">
          <div className="volunteer-block">
            <h3 className="volunteer-heading">
              <T
                es="Hago voluntariado en el Proyecto Click_A de la Cruz Roja Española de Sevilla"
                en="I volunteer with Cruz Roja Española's Click_A Project in Seville"
              />
            </h3>
            <p className="volunteer-text">
              <T
                es="Click_A es la iniciativa de voluntariado digital de Cruz Roja en Andalucía (continuación de Andalucía Compromiso Digital) para reducir la brecha digital entre la población en situación de vulnerabilidad. Como voluntario en la provincia de Sevilla, imparto talleres de competencias digitales —uso seguro de dispositivos, internet y redes sociales— a colectivos sociales desfavorecidos: personas mayores, demandantes de empleo y jóvenes, ayudando a que puedan desenvolverse de forma autónoma, segura y efectiva en su día a día digital."
                en="Click_A is Cruz Roja's digital volunteering initiative in Andalusia (a continuation of Andalucía Compromiso Digital) working to close the digital divide among people in vulnerable situations. As a volunteer in the province of Seville, I run digital-skills workshops — safe use of devices, the internet and social media — for disadvantaged social groups: elderly people, job seekers and young people, helping them navigate everyday digital life autonomously, safely and effectively."
              />
            </p>
            <div className="volunteer-gallery">
              <img
                className="volunteer-photo-real"
                src="/voluntariado-clicka.jpg"
                alt="Agustín impartiendo un taller de competencias digitales como voluntario de Cruz Roja Sevilla"
                loading="lazy"
              />
            </div>
          </div>
          <div className="exposicion-block">
            <h3 className="exposicion-heading">
              <T
                es="He hecho alguna exposición comentando las ventajas de usar las tecnologías"
                en="I've given talks on the advantages of using technology"
              />
            </h3>
            <p className="exposicion-text">
              <T
                es="Disfruto compartiendo lo que sé sobre tecnología con otras personas. He participado en formaciones y exposiciones —como una charla sobre SAP Human Resources (SAP HR)— explicando las ventajas de aplicar distintas herramientas digitales en el entorno laboral. Para mí, ayudar a otros a entender y aplicar la tecnología es igual de valioso en el ámbito profesional que en el día a día."
                en="I enjoy sharing what I know about technology with others. I've taken part in training sessions and talks — including one on SAP Human Resources (SAP HR) — explaining the advantages of applying different digital tools in the workplace. For me, helping others understand and apply technology matters just as much professionally as it does day to day."
              />
            </p>
            <div className="exposicion-gallery">
              <img
                className="exposicion-photo-real"
                src="/exposicion-sap-hr.jpg"
                alt="Agustín impartiendo una exposición sobre SAP Human Resources (SAP HR) en Core Networks Sevilla"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
