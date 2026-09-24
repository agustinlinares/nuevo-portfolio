"use client";

import { T } from "@/context/LangContext";
import { useReveal } from "./useReveal";

export default function Referencias() {
  const ref = useReveal<HTMLDivElement>(0);
  return (
    <section id="referencias">
      <div className="quote-card" ref={ref}>
        <span className="quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        <h2 className="quote-title">
          <T es="Referencias y trabajo en equipo" en="References and teamwork" />
        </h2>
        <p className="quote-text">
          <T
            es="Mis recomendaciones profesionales respaldan iniciativa, autonomía, responsabilidad, comunicación y capacidad de colaboración. También puedes consultar el artículo del centro que me reconocieron mi esfuerzo en la Consultoría SAP sacando en el trabajo final una Matrícula de honor."
            en="My professional recommendations speak to initiative, autonomy, responsibility, communication and collaboration. You can also read the school's article recognizing my effort in the SAP Consulting program, where I earned Honors on the final project."
          />
        </p>
        <div className="quote-actions">
          <a
            href="https://www.linkedin.com/in/agustin-linares-carrera/details/recommendations/?detailScreenTabIndex=0"
            target="_blank"
            rel="noopener"
            className="btn-pill btn-pill-solid"
          >
            <T es="Ver recomendaciones" en="View recommendations" />
          </a>
          <a
            href="https://www.tokioschool.com/noticias/opiniones-agustin-linares-alumno-sap/"
            target="_blank"
            rel="noopener"
            className="btn-pill btn-pill-ghost"
          >
            <T es="Leer artículo sobre mi" en="Read the article about me" />
          </a>
        </div>
      </div>
    </section>
  );
}
