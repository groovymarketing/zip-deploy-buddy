import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ThreeSixtyViewer } from "@/components/ThreeSixtyViewer";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Home } from "lucide-react";
import { getProject, type ProjectRow } from "@/lib/projects.functions";

export const Route = createFileRoute("/view/$projectId")({
  head: () => ({
    meta: [
      { title: "Tour Virtual 360° | Patagonia Inmersiva" },
      { name: "description", content: "Recorré este proyecto en 360°." },
    ],
  }),
  component: ViewerPage,
});

function ViewerPage() {
  const { projectId } = Route.useParams();
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchProject = useServerFn(getProject);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProject({ data: { id: projectId } })
      .then(({ project }) => {
        if (!project) setError("Proyecto no encontrado");
        else setProject(project);
      })
      .catch(() => setError("Error al cargar el proyecto"))
      .finally(() => setLoading(false));
  }, [projectId, fetchProject]);

  if (loading) return (<div className="min-h-screen bg-zinc-950 flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-accent-blue" /></div>);
  if (error || !project) return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 space-y-6 text-white">
      <h2 className="text-2xl font-light text-zinc-400">{error || "Proyecto no encontrado"}</h2>
      <Link to="/" className="flex items-center gap-2 text-accent-blue hover:underline"><Home className="w-4 h-4" /> Volver al inicio</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 pb-12 px-[5%]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-accent-blue uppercase tracking-widest font-medium mb-2"><ArrowLeft className="w-3 h-3" /> Volver</Link>
            <div className="space-y-2">
              <Badge variant="outline" className="text-accent-blue border-accent-blue/30 px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">{project.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-light tracking-tight">{project.title}</h1>
            </div>
          </div>
          <div className="text-zinc-400 text-sm font-light md:text-right max-w-sm">
            <p className="mb-1">{project.location}</p>
            <p>Usa el mouse o touch para navegar en 360°</p>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          <ThreeSixtyViewer image={project.panorama_url} title={project.title} autoLoad />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-medium">Sobre este proyecto</h3>
            <p className="text-zinc-400 font-light leading-relaxed">{project.description}</p>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">¿Te interesa algo similar?</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Podemos crear una experiencia personalizada para tu propiedad o negocio.</p>
              <Link to="/" hash="contacto" className="block">
                <button className="w-full bg-accent-blue hover:bg-accent-blue/90 text-white text-xs font-bold py-3 rounded-full transition-all">Consultar Presupuesto</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
