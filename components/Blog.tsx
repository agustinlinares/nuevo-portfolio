"use client";

import { T } from "@/context/LangContext";
import { useReveal } from "./useReveal";

export default function Blog() {
  const r1 = useReveal<HTMLParagraphElement>(0);
  const r2 = useReveal<HTMLHeadingElement>(1);
  const r3 = useReveal<HTMLParagraphElement>(2);
  const r4 = useReveal<HTMLDivElement>(3);
  return (
    <section id="blog">
      <p className="note" ref={r1}>
        <T es="// blog" en="// blog" />
      </p>
      <h2 className="section-title" ref={r2}>
        <T es="Blog" en="Blog" />
      </h2>
      <p className="section-desc" ref={r3}>
        <T
          es="Sección lista desde el lanzamiento, sin posts todavía — se decidirán los primeros temas más adelante."
          en="Section ready from launch, no posts yet — first topics to be decided later."
        />
      </p>
      <div className="blog-placeholder" ref={r4}>
        <T es="próximamente — primeros posts en camino" en="coming soon — first posts on the way" />
      </div>
    </section>
  );
}
