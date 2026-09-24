import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";

const SITE_URL = "https://agustinlinares.dev/";
const TITLE_ES = "Agustín Linares — Desarrollador Multiplataforma y Web";
const OG_TITLE_ES =
  "Agustín Linares — Desarrollador de Aplicaciones Multiplataforma y Web";
const DESCRIPTION_ES =
  "Portfolio de Agustín Linares, desarrollador de Aplicaciones Multiplataforma y Web con experiencia previa como consultor SAP HCM. Proyectos, stack y CV.";
const OG_DESCRIPTION_ES =
  "Portfolio de Agustín Linares, desarrollador de Aplicaciones Multiplataforma y Web con experiencia previa como consultor SAP HCM. Proyectos, stack tecnológico, experiencia y CV.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE_ES,
  description: DESCRIPTION_ES,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: OG_TITLE_ES,
    description: OG_DESCRIPTION_ES,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: OG_TITLE_ES,
      },
    ],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE_ES,
    description: OG_DESCRIPTION_ES,
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Agustín Linares Carrera",
  url: SITE_URL,
  image: "https://agustinlinares.dev/foto-perfil-fg.png",
  jobTitle: "Desarrollador de Aplicaciones Multiplataforma y Web",
  email: "mailto:agustinlc88@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sevilla",
    addressCountry: "ES",
  },
  sameAs: [
    "https://github.com/agustinlinares",
    "https://www.linkedin.com/in/agustin-linares-carrera/",
  ],
};

// Default favicon: same 64x64 rounded-square "A" mark as the source site, computed
// with the default (💻, dark) palette. ThemeProvider regenerates it client-side
// whenever the theme/color-mode changes (see updateFaviconDom in ThemeContext).
const DEFAULT_FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%230B0F17'/%3E%3Ctext x='20' y='44' font-family='Space Grotesk, sans-serif' font-weight='700' font-size='34' fill='%235B8CFF'%3EA%3C/text%3E%3C/svg%3E";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <link id="faviconLink" rel="icon" type="image/svg+xml" href={DEFAULT_FAVICON} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <body>
        {/* Person schema.org JSON-LD, ported verbatim from the source page's <head> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
