"use client";

import { useLang } from "@/context/LangContext";
import { usePdfModal } from "@/context/PdfModalContext";

export default function PdfModal() {
  const { modal, closePdfModal } = usePdfModal();
  const { lang } = useLang();

  const desc = modal ? (lang === "en" ? modal.descEn ?? modal.descEs : modal.descEs) : undefined;

  return (
    <div
      id="pdfModalOverlay"
      className={`pdf-modal-overlay${modal ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closePdfModal();
      }}
    >
      <div className="pdf-modal">
        <div className="pdf-modal-header">
          <span className="pdf-modal-title">{modal?.title || "Documento"}</span>
          <button type="button" className="pdf-modal-close" onClick={closePdfModal} aria-label="Cerrar">
            ✕
          </button>
        </div>
        <p className="pdf-modal-desc" hidden={!desc}>
          {desc}
        </p>
        <div className="pdf-modal-body">
          <iframe src={modal?.src || ""} title="Documento PDF" />
        </div>
      </div>
    </div>
  );
}
