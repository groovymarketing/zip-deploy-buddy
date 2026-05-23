import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ThreeSixtyViewer } from "./ThreeSixtyViewer";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useServerFn } from "@tanstack/react-start";
import { listProjects, type ProjectRow } from "@/lib/projects.functions";

type Project = {
  id: string;
  title: string;
  location: string;
  category: string;
  panoramaUrl: string;
  thumbnailUrl?: string;
  description: string;
};

const fallbackProjects: Project[] = [
  { id: "1", title: "Residencia Chapelco Golf", location: "San Martín de los Andes, Neuquén", category: "Real Estate", panoramaUrl: "/360_casa_chapelco.jpeg", thumbnailUrl: "/360_casa_chapelco.jpeg", description: "Tour virtual de una propiedad de lujo con vistas al campo de golf y la montaña." },
  { id: "2", title: "Hall Casa", location: "Pilar, Buenos Aires", category: "Real Estate", panoramaUrl: "/360_hall_lomada.jpeg", thumbnailUrl: "/360LOW_hall_lomada Small.jpeg", description: "Captura inmersiva de acceso principal y living de doble altura." },
  { id: "3", title: "Galería Casa", location: "Pilar, Buenos Aires", category: "Real Estate", panoramaUrl: "/360_galería_lomada.jpeg", thumbnailUrl: "/360LOW_galería_lomada Small.jpeg", description: "Espacio exterior integrado con parrilla y vista al parque." },
  { id: "4", title: "Cine Centro Cultural Cotesma", location: "San Martín de los Andes, Neuquén", category: "Eventos", panoramaUrl: "/360_CineCCC.jpeg", thumbnailUrl: "/360LOW_CineCCC Small.jpeg", description: "Visualización 360 de la sala de cine y conferencias." },
  { id: "5", title: "Hall Centro Cultural Cotesma", location: "San Martín de los Andes, Neuquén", category: "Eventos", panoramaUrl: "/360_HallCCC.jpeg", thumbnailUrl: "/360LOW_HallCCC Small.jpeg", description: "Recorrido por el lobby principal del Centro Cultural Cotesma." },
  { id: "6", title: "Complejo Rocco", location: "San Martín de los Andes, Neuquén", category: "Comercial", panoramaUrl: "/360_Rocco_Int.jpeg", thumbnailUrl: "/360LOW_Rocco_Int Small.jpeg", description: "Experiencia inmersiva de la casa de 3 ambientes." },
  { id: "7", title: "La Pastera Museo del Che", location: "San Martín de los Andes, Neuquén", category: "Turismo", panoramaUrl: "/360_Pastera.jpeg", thumbnailUrl: "/360LOW_Pastera Small.jpeg", description: "Documentación histórica y cultural del edificio emblemático." },
  { id: "8", title: "Obra Chapelco", location: "San Martín de los Andes, Neuquén", category: "Construcción", panoramaUrl: "/360_Obra_Chapelco.jpeg", thumbnailUrl: "/360LOW_Obra_Chapelco Small.jpeg", description: "Seguimiento de obra en construcción con visualización 360." },
  { id: "9", title: "Avance de Obra - Estudio Produtek", location: "San Martín de los Andes, Neuquén", category: "Construcción", panoramaUrl: "/Avance de Obra - Estudio Produtek.jpg", thumbnailUrl: "/360LOW_Avance de Obra - Estudio Produtek Small.jpeg", description: "Seguimiento técnico y visual de obra comercial." },
  { id: "10", title: "Rental Vestuario - Las Rosas", location: "San Martín de los Andes, Neuquén", category: "Comercial", panoramaUrl: "/Rental Vestuario - Las Rosas.jpg", thumbnailUrl: "/360LOW_Rental Vestuario - Las Rosas Small.jpeg", description: "Tour virtual por local comercial de rental de vestuario." },
  { id: "11", title: "Baño Recoleta", location: "Recoleta, Buenos Aires", category: "Real Estate", panoramaUrl: "/Baño Recoleta.jpg", thumbnailUrl: "/360LOW_Baño Recoleta Small.jpeg", description: "Visualización de remodelación premium en zona céntrica." },
  { id: "12", title: "Habitación Tunqueley", location: "San Martín de los Andes, Neuquén", category: "Hotel", panoramaUrl: "/Habitación Tunqueley.jpg", thumbnailUrl: "/360LOW_Habitación Tunqueley Small.jpeg", description: "Captura inmersiva de suite principal con detalles patagónicos." },
  { id: "13", title: "Comedor Tunqueley", location: "San Martín de los Andes, Neuquén", category: "Hotel", panoramaUrl: "/Comedor Tunqueley.jpg", thumbnailUrl: "/360LOW_Comedor Tunqueley Small.jpeg", description: "Espacio social amplio y luminoso integrado con el paisaje sanmartinense." },
  { id: "14", title: "Cata Gin - Casa Chola", location: "San Martín de los Andes, Neuquén", category: "Eventos", panoramaUrl: "/Cata Gin - Casa Chola.jpg", thumbnailUrl: "/360LOW_Cata Gin - Casa Chola Small.jpeg", description: "Cobertura de evento social y gastronómico en un entorno único." },
];

function rowToProject(r: ProjectRow): Project {
  return {
    id: r.id,
    title: r.title,
    location: r.location ?? "",
    category: r.category ?? "",
    panoramaUrl: r.panorama_url,
    thumbnailUrl: r.thumbnail_url ?? undefined,
    description: r.description ?? "",
  };
}

export const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const fetchProjects = useServerFn(listProjects);

  useEffect(() => {
    fetchProjects()
      .then(({ projects: rows }) => {
        const list = rows.length > 0 ? rows.map(rowToProject) : fallbackProjects;
        setProjects(list);
        setActiveProject((prev) => prev || list[0]);
      })
      .catch(() => {
        setProjects(fallbackProjects);
        setActiveProject((prev) => prev || fallbackProjects[0]);
      })
      .finally(() => setLoading(false));
  }, [fetchProjects]);

  const handleSelect = (project: Project) => {
    setActiveProject(project);
    if (window.innerWidth < 1024) sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portfolio" ref={sectionRef} className="pt-8 md:pt-12 pb-12 md:pb-24 bg-zinc-950 text-white min-h-[400px] flex flex-col">
      {loading && !activeProject ? (
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent-blue" />
        </div>
      ) : activeProject ? (
        <div className="w-full lg:max-w-[90%] mx-auto space-y-6 md:space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-[5%] lg:px-0">
            <div className="space-y-2 md:space-y-4">
              <Badge variant="outline" className="text-accent-blue border-accent-blue/30 px-3 md:px-4 py-0.5 md:py-1 rounded-full uppercase tracking-widest text-[9px] md:text-[10px]">Realidad Virtual</Badge>
              <h2 className="text-2xl md:text-5xl font-light tracking-tight">Experiencias <span className="font-bold text-accent-blue">360°</span></h2>
            </div>
            <div className="text-zinc-400 max-w-[320px] md:max-w-md font-light text-sm md:text-base md:text-right leading-tight">
              <p className="hidden md:block">Movete por las imágenes con el teclado o el mouse. <br />Seleccioná un espacio para comenzar a recorrerlo.</p>
              <p className="block md:hidden">Activá la brújula y mové tu teléfono para recorrer el espacio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8 items-stretch px-4 md:px-6 lg:px-0">
            <div className="lg:col-span-3 space-y-4 md:space-y-6">
              <motion.div key={activeProject.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <ThreeSixtyViewer image={activeProject.panoramaUrl} title={activeProject.title} author="Patagonia Inmersiva" />
              </motion.div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="space-y-1">
                  <h3 className="text-lg md:text-2xl font-medium">{activeProject.title}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm font-light max-w-2xl">{activeProject.description}</p>
                </div>
                <Badge className="bg-accent-blue text-white text-[10px] md:text-xs">{activeProject.category}</Badge>
              </div>
            </div>

            <div className="relative min-h-[300px] lg:min-h-0 mt-4 lg:mt-0">
              <div className="lg:absolute lg:inset-0 flex flex-col">
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-2 md:mb-4 flex-shrink-0">Proyectos</h4>
                <div className="space-y-1.5 md:space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow min-h-0 pb-4">
                  {projects.map((project) => (
                    <button key={project.id} onClick={() => handleSelect(project)} className={cn("w-full text-left group transition-all duration-500", activeProject.id === project.id ? "ring-1 ring-accent-blue rounded-lg md:rounded-xl" : "")}>
                      <div className="relative h-[30px] md:h-auto md:aspect-[25/9] rounded-lg md:rounded-xl overflow-hidden bg-zinc-900 shadow-lg border border-white/5">
                        <img
                          src={project.thumbnailUrl || project.panoramaUrl}
                          alt={project.title}
                          onError={(e) => { const t = e.target as HTMLImageElement; if (!t.src.includes("headerpic.jpeg")) t.src = "/headerpic.jpeg"; }}
                          className={cn("w-full h-full object-cover transition-all duration-700",
                            activeProject.id === project.id ? "grayscale-0 opacity-80 scale-105" : "grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60")}
                          referrerPolicy="no-referrer"
                        />
                        <div className={cn("absolute inset-0 flex items-center justify-center p-1 md:p-2 transition-opacity duration-500", activeProject.id === project.id ? "opacity-0" : "opacity-100 group-hover:opacity-0")}>
                          <h5 className="text-white text-[9px] md:text-[10px] font-medium text-center uppercase tracking-widest leading-none px-2">{project.title}</h5>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};
