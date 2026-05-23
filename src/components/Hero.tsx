import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const words = ["casa","negocio","espacio","terreno","cabaña","restaurante","departamento","estudio","construcción","galería","salón","fábrica"];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setIndex((p) => (p + 1) % words.length), 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-8 pb-16 md:py-24 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <img src="/headerpic-mesh-final-low.jpg" alt="Experiencia Inmersiva Patagonia VR" className="w-full h-full object-cover object-[40%_center] md:object-center" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 lg:max-w-[90%] w-full text-center space-y-6 md:space-y-12 mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4 md:space-y-10">
          <div className="flex justify-center mb-0 md:mb-6 -mt-8 md:mt-0">
            <motion.img initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} src="/logo-sq-low-Medium.png" alt="Patagonia Inmersiva" className="w-44 h-44 md:w-60 md:h-60 object-contain" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-3xl md:text-7xl font-light tracking-tight leading-none flex flex-col justify-center items-center gap-y-1 drop-shadow-2xl">
            <span className="drop-shadow-md">¿Querés promocionar tu</span>
            <span className="relative inline-block w-full text-accent-blue font-bold h-[1.1em] drop-shadow-lg">
              <AnimatePresence mode="wait">
                <motion.span key={words[index]} initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="absolute left-1/2 -translate-x-1/2 top-0 whitespace-nowrap">
                  {words[index]}?
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="text-sm md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed pt-2 md:pt-4">
            Mostrá tus propiedades como realmente se sienten. Permití que tus clientes las recorran antes de visitarlas, filtrando rápidamente a los interesados y acelerando cada operación.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="flex flex-row items-center justify-center gap-2 md:gap-4">
          <Button size="lg" className="bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-4 md:px-10 h-10 md:h-12 text-xs md:text-base rounded-full group border-none" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>
            Ver 360
            <ArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 bg-transparent hover:bg-white hover:text-black rounded-full px-4 md:px-10 h-10 md:h-12 text-xs md:text-base text-white font-medium transition-all" onClick={() => navigate({ to: "/presupuesto" })}>
            Precios
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
