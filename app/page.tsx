import CanvasBackground from "@/components/CanvasBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MiPerfil from "@/components/MiPerfil";
import Stack from "@/components/Stack";
import Experiencia from "@/components/Experiencia";
import Referencias from "@/components/Referencias";
import Portfolio from "@/components/Portfolio";
import Blog from "@/components/Blog";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import PdfModal from "@/components/PdfModal";
import RadioPlayer from "@/components/RadioPlayer";
import { PdfModalProvider } from "@/context/PdfModalContext";

export default function Home() {
  return (
    <PdfModalProvider>
      <CanvasBackground />
      <Header />
      <main className="wrap">
        <Hero />
        <MiPerfil />
        <Stack />
        <Experiencia />
        <Referencias />
        <Portfolio />
        <Blog />
        <Contacto />
      </main>
      <Footer />
      <PdfModal />
      <RadioPlayer />
    </PdfModalProvider>
  );
}
