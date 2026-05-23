import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { LazyImage } from "./LazyImage";

const photos = [
  { url: "/Foto_CineCCC.jpeg", title: "Cine CCC" },
  { url: "/Foto_ComplejoRoccoInt.jpeg", title: "Complejo Rocco Interior" },
  { url: "/Foto_EventoCoronaLagoHermoso.jpeg", title: "Evento Corona - Lago Hermoso" },
  { url: "/Foto_JardinInvierno.jpeg", title: "Jardín de Invierno" },
  { url: "/Foto_PanoChapelcoGolf.jpeg", title: "Panorámica Chapelco Golf" },
  { url: "/Foto_PiletaChapelcoGolf.jpeg", title: "Pileta Chapelco Golf" },
  { url: "/Foto_RemodelacionBano.jpeg", title: "Remodelación de Baño" },
  { url: "/Foto_RemodelacionLiving.jpeg", title: "Remodelación de Living" },
  { url: "/Foto_Terraza.jpeg", title: "Terraza Principal" },
  { url: "/Foto_MatterportRocco.jpeg", title: "Matterport - Complejo Rocco" },
  { url: "/Foto_PlanoRocco2Ambientes.jpeg", title: "Plano Complejo Rocco" },
  { url: "/Foto_MatterportPastera.jpeg", title: "Matterport - La Pastera" },
];

export const PhotoGallery = () => (
  <section id="foto" className="pt-8 md:pt-12 pb-12 md:pb-24 px-[5%] bg-zinc-950 text-white">
    <div className="mx-auto space-y-6 md:space-y-12">
      <div className="space-y-2 md:space-y-4">
        <Badge variant="outline" className="text-accent-blue border-accent-blue/30 px-3 md:px-4 py-0.5 md:py-1 rounded-full uppercase tracking-widest text-[9px] md:text-[10px]">Fotografía</Badge>
        <h2 className="text-2xl md:text-5xl font-light tracking-tight">Capturando <span className="font-bold text-accent-blue">la esencia</span></h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {photos.map((photo, i) => (
          <Dialog key={i}>
            <DialogTrigger asChild>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative aspect-square md:aspect-[21/9] overflow-hidden rounded-lg md:rounded-2xl group cursor-pointer">
                <LazyImage src={photo.url} alt={photo.title} wrapperClassName="w-full h-full" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <p className="text-white font-medium text-center">{photo.title}</p>
                </div>
              </motion.div>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="fixed !inset-0 !w-screen !h-screen !max-w-none !max-h-none m-0 p-0 bg-black/90 backdrop-blur-xl border-none shadow-none outline-none !translate-x-0 !translate-y-0 !top-0 !left-0 sm:!max-w-none z-50 overflow-hidden">
              <div className="w-full h-full relative flex items-center justify-center p-4">
                <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center">
                  <DialogClose className="absolute -top-12 right-0 md:-top-16 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white transition-all backdrop-blur-xl group">
                    <X className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
                  </DialogClose>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center gap-8 w-full">
                    <LazyImage src={photo.url} alt={photo.title} wrapperClassName="max-w-[92vw] max-h-[75vh] rounded-[2rem]" className="max-w-[92vw] max-h-[75vh] object-contain shadow-[0_0_80px_rgba(255,255,255,0.15)] border border-white/10" />
                    <p className="text-white text-base md:text-lg font-light bg-black/40 backdrop-blur-md inline-block px-8 py-2 rounded-full border border-white/5 shadow-2xl">{photo.title}</p>
                  </motion.div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  </section>
);
