import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRight, Building2, MapPin } from "lucide-react";
import { listProjects, type ProjectRow } from "@/lib/projects.functions";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos | Patagonia Inmersiva" },
      { name: "description", content: "Recorré nuestros proyectos 360° de Real Estate, Comercial, Hotelería y Eventos en la Patagonia." },
      { property: "og:title", content: "Proyectos | Patagonia Inmersiva" },
      { property: "og:description", content: "Catálogo de tours virtuales 360°." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchProjects = useServerFn(listProjects);

  useEffect(() => {
    fetchProjects()
      .then(({ projects }) => setProjects(projects))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetchProjects]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-[5%]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">Nuestros <span className="text-accent-blue font-bold">Proyectos</span></h1>
          <p className="text-zinc-500 font-light max-w-2xl text-sm md:text-base">
            Explora nuestra colección de recorridos virtuales y experiencias inmersivas 360°.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-accent-blue" /></div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-accent-blue/50 transition-all duration-300">
                <Link to="/view/$projectId" params={{ projectId: p.id }} className="block h-full flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-zinc-900">
                    <img src={p.thumbnail_url || p.panorama_url} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-accent-blue/80 text-white border-none uppercase tracking-widest text-[9px] px-2 py-0.5">{p.category}</Badge>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-medium group-hover:text-accent-blue transition-colors leading-tight">{p.title}</h3>
                      <div className="flex items-center gap-2 text-zinc-500 text-xs"><MapPin className="w-3 h-3" /><span>{p.location}</span></div>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold group-hover:text-accent-blue transition-colors">Ver Detalles</span>
                      <ArrowRight className="w-4 h-4 text-accent-blue -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
            <Building2 className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 font-light">Próximamente estaremos publicando nuevos proyectos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
