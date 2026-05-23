import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VideoGallery } from "@/components/VideoGallery";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patagonia Inmersiva | Tours 360° y Realidad Virtual en la Patagonia" },
      { name: "description", content: "Producción 360°, fotografía inmersiva y video profesional en San Martín de los Andes, Neuquén. Real Estate, comercial y eventos." },
      { property: "og:title", content: "Patagonia Inmersiva | Tours 360° y Realidad Virtual" },
      { property: "og:description", content: "Mostrá tus propiedades como realmente se sienten." },
      { property: "og:image", content: "/headerpic.jpeg" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <PhotoGallery />
      <VideoGallery />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
