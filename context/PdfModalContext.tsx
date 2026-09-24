"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface PdfModalState {
  src: string;
  title: string;
  descEs?: string;
  descEn?: string;
}

interface PdfModalContextValue {
  modal: PdfModalState | null;
  openPdfModal: (src: string, title: string, descEs?: string, descEn?: string) => void;
  closePdfModal: () => void;
}

const PdfModalContext = createContext<PdfModalContextValue | null>(null);

export function PdfModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<PdfModalState | null>(null);

  const openPdfModal = useCallback((src: string, title: string, descEs?: string, descEn?: string) => {
    setModal({ src, title, descEs, descEn });
  }, []);
  const closePdfModal = useCallback(() => setModal(null), []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
  }, [modal]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePdfModal();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closePdfModal]);

  return (
    <PdfModalContext.Provider value={{ modal, openPdfModal, closePdfModal }}>
      {children}
    </PdfModalContext.Provider>
  );
}

export function usePdfModal() {
  const ctx = useContext(PdfModalContext);
  if (!ctx) throw new Error("usePdfModal must be used within a PdfModalProvider");
  return ctx;
}
