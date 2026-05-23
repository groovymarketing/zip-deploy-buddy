import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { motion } from "motion/react";

const videos = [
  { id: "p0_W9cUED50", title: "Casa 711", category: "Real Estate" },
  { id: "I5QaxAyG--0", title: "Edificio FEEL", category: "Real Estate", is360: true },
  { id: "DG3MCOqlGE4", title: "Casa Chapelco Golf", category: "Real Estate" },
  { id: "YmGSxCg7Dy8", title: "Complejo Rocco", category: "Real Estate" },
  { id: "mLdOs4H8H2Y", title: "Puentes de Luz", category: "360VR", is360: true },
  { id: "ntEBsk1LQsM", title: "La Islita", category: "360VR", is360: true },
  { id: "yl5omGCnHV0", title: "Walung", category: "360VR", is360: true },
  { id: "5mOFiFY-l4s", title: "Terrazas Chapelco Chico", category: "Real Estate" },
  { id: "K3ys0HUqCsU", title: "Iluminatti", category: "Comercial" },
  { id: "UmKRAFlzbqY", title: "Yo Acuso", category: "360VR", is360: true },
  { id: "IeG0RwoXrbc", title: "Tour El Rosedal", category: "360VR", is360: true },
  { id: "aVCqC7L4WrE", title: "Patagonia Flooring", category: "Comercial" },
  { id: "3J4odvbwgaY", title: "Institucional CCC", category: "Institucional" },
  { id: "eViqCtpWBBM", title: "Muestra Croquiseros", category: "Eventos" },
  { id: "6JawySIHaYo", title: "Reciclaje Cotesma 2026", category: "Eventos" },
  { id: "aPYf6TkNvVU", title: "RNU Cotesma", category: "Institucional" },
  { id: "t4B02ubW9GI", title: "Visión Ilusión", category: "Institucional" },
];

const categories = ["Todos", "Real Estate", "360VR", "Comercial", "Institucional", "Eventos"];

const VideoCard = ({ video }: { video: typeof videos[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => { if (!isHovered) setIframeLoaded(false); }, [isHovered]);

  const handleClick = (e: React.MouseEvent) => {
    if (video.is360) {
      e.preventDefault();
      window.open(`https://www.youtube.com/watch?v=${video.id}&vq=hd2160`, "_blank");
    } else setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-500 hover:border-accent-blue/50 group cursor-pointer">
        <div className="w-full h-full">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
              {isHovered ? (
                <div className="w-full h-full scale-[1.5] origin-center bg-zinc-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&start=0&end=10&loop=1&playlist=${video.id}&disablekb=1&fs=0&autohide=1&vq=hd2160`}
                    className={cn("w-full h-full pointer-events-none border-none relative z-10 transition-opacity duration-1000", iframeLoaded ? "opacity-100" : "opacity-0")}
                    allow="autoplay; encrypted-media" title={video.title}
                    onLoad={() => setTimeout(() => setIframeLoaded(true), 1500)}
                  />
                  <div className={cn("absolute inset-0 flex items-center justify-center bg-zinc-900 z-20 transition-opacity duration-1000", iframeLoaded ? "opacity-0 pointer-events-none" : "opacity-100")}>
                    <img src="/logo sq low Medium.png" alt="" className="w-16 h-16 opacity-40 object-contain animate-pulse" />
                  </div>
                </div>
              ) : (
                <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              )}
              <div className={cn("absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-500", isHovered ? "bg-black/10" : "group-hover:bg-black/20")}>
                {!isHovered && (
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <Badge className={cn("backdrop-blur-md border-none text-[10px] uppercase tracking-tighter px-3 py-1", video.is360 ? "bg-accent-blue/80" : "bg-white/10 text-white/70")}>{video.category}</Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-xs font-mono uppercase tracking-[0.2em] drop-shadow-md">{video.title}</p>
          </div>
        </div>
      </div>
      <DialogContent showCloseButton={false} className="fixed !inset-0 !translate-x-0 !translate-y-0 !top-0 !left-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-xl border-none shadow-none p-0 m-0 !max-w-none !max-h-none outline-none">
        <div className="relative z-10 w-[85vw] max-w-6xl flex flex-col items-center gap-6">
          <DialogClose className="absolute -top-14 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-all group">
            <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </DialogClose>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/20">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&rel=0&modestbranding=1&iv_load_policy=3&vq=hd2160`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; vr" allowFullScreen className="w-full h-full" />
          </motion.div>
          {video.is360 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-2">
              <a href={`https://www.youtube.com/watch?v=${video.id}&vq=hd2160`} target="_blank" rel="noopener noreferrer" className="group bg-accent-blue/10 hover:bg-accent-blue/20 backdrop-blur-md px-8 py-3 rounded-full border border-accent-blue/20 transition-all hover:scale-105">
                <p className="text-white text-sm md:text-base font-light">Ver en YouTube 4K (2160s) para navegar en 360°</p>
              </a>
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest">Recomendado para VR o Giroscopio en smartphone.</span>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const VideoGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

  const filtered = activeCategory === "Todos" ? videos : videos.filter((v) => v.category === activeCategory);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollLeft = 0; }, [activeCategory, filtered.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || filtered.length === 0) return;
    let raf: number;
    const speed = 0.6;
    const tick = () => {
      if (!isPausedRef.current && container) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) container.scrollLeft = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [filtered.length]);

  return (
    <section id="video" className="pt-12 pb-24 bg-black text-white overflow-hidden">
      <div className="lg:max-w-[90%] mx-auto space-y-12 mb-16 px-[5%] lg:px-0 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <Badge variant="outline" className="text-accent-blue border-accent-blue/30 px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">Video</Badge>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight">Producción <span className="font-bold text-accent-blue">Audiovisual</span></h2>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition-all border",
                activeCategory === c ? "bg-accent-blue border-accent-blue text-white shadow-[0_0_15px_rgba(83,144,172,0.4)]" : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/30")}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div ref={scrollRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="flex overflow-x-auto gap-6 py-4 px-6 custom-scrollbar pb-8 select-none">
          {filtered.length > 0 ? filtered.map((v, i) => (
            <div key={`${v.id}-${i}`} className="flex-shrink-0 w-[300px] md:w-[450px]"><VideoCard video={v} /></div>
          )) : (
            <div className="w-full text-center py-20 text-zinc-500 font-light">No hay videos disponibles en esta categoría.</div>
          )}
        </div>
      </div>
    </section>
  );
};
