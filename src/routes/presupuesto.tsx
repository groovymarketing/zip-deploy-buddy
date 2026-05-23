import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Check, Zap, Star, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Contact } from "@/components/Contact";

const packages = [
  { name: "Plan Starter", price: "$120.000", description: "Ideal para departamentos o locales pequeños.", features: ["Hasta 4 puntos 360°", "4 fotos planas desde 360", "Listo para Integración en Google Maps o tu web", "Entrega en 48hs", "SMA Centro hasta Vega Maipú"], icon: <Zap className="w-6 h-6 text-accent-blue" />, popular: false },
  { name: "Plan Full House", price: "$240.000", description: "El más elegido para casas y negocios medianos.", features: ["Hasta 8 puntos 360°", "2 Hotspots informativos por punto", "8 Fotos planas desde 360", "Gestión de las subidas en host gratuito", "Reemplazo trípode con logo", "Marca de agua personalizada"], icon: <Star className="w-6 h-6 text-accent-blue" />, popular: true },
  { name: "Plan Inmersivo", price: "Personalizado", description: "Soluciones completas para grandes superficies y empresas.", features: ["Planes mensuales por múltiples propiedades", "Contenido Audiovisual", "Fotos HDR", "Borrado de trípode en 360º", "Drone para tomas aéreas", "Planos cenitales reales", "VR Matterport - Gemelo Digital"], icon: <ShieldCheck className="w-6 h-6 text-accent-blue" />, popular: false },
];

const faqs = [
  { question: "¿Qué es exactamente un Tour 360°?", answer: "Es una experiencia digital que permite a tus clientes recorrer tu propiedad o negocio desde cualquier dispositivo (celular, tablet o PC). A diferencia de un video, el usuario tiene el control total: puede girar, hacer zoom y desplazarse por los ambientes como si estuviera ahí físicamente." },
  { question: "¿Cuál es la diferencia entre un Tour 360° y Matterport?", answer: 'El Tour 360° es una experiencia visual basada en fotos esféricas, ideal para atraer clientes en Google Maps u otras plataformas 360 sin costos de mantenimiento. Matterport, en cambio, crea un "Gemelo Digital" mediante un escaneo 3D que permite obtener planos técnicos y medidas exactas.\n\nElegí el Tour 360° para locales comerciales y departamentos, o Matterport para turismo, propiedades de lujo y arquitectura.' },
  { question: "¿Cómo ayuda esto a mi negocio?", answer: "Ahorro de tiempo: Filtrás a los curiosos. Quien te contacta después de ver el tour es porque ya conoce el lugar y tiene un interés real.\n\nConfianza inmediata: Mostrás transparencia total.\n\nSEO Local: Google premia a los negocios que tienen contenido 360° en sus fichas de Google Maps." },
  { question: "¿Tengo que pagar un mantenimiento mensual?", answer: "No. En nuestros planes Starter y Full House, subimos el contenido a plataformas gratuitas y estables. El tour queda activo de forma permanente sin costos fijos." },
  { question: "¿Cuánto tiempo tardan en entregar el trabajo?", answer: "El relevamiento mínimo del lugar suele durar entre 30 y 45 minutos. Una vez hechas las capturas, entregamos el tour listo para usar a partir de las 48 horas hábiles." },
  { question: "¿Qué zonas cubren?", answer: "Nuestra base está en San Martín de los Andes. Cubrimos sin cargo extra desde el Centro hasta la Vega Maipú. También trabajamos en Junín de los Andes, Villa La Angostura, Meliquina y Villa Traful con un adicional por viáticos." },
  { question: "¿Cómo tengo que preparar el lugar?", answer: 'Como regla de oro: "Lo que ve la cámara, lo ve el cliente". El lugar debe estar ordenado, limpio y con la iluminación que desees mostrar.' },
  { question: "¿Puedo poner el tour en mi propia página web?", answer: "¡Sí! Te entregamos un código (iframe) muy sencillo que tu webmaster puede copiar y pegar." },
];

export const Route = createFileRoute("/presupuesto")({
  head: () => ({
    meta: [
      { title: "Precios y Presupuesto | Patagonia Inmersiva" },
      { name: "description", content: "Planes y precios de tours virtuales 360° y producción audiovisual en la Patagonia." },
      { property: "og:title", content: "Precios y Presupuesto | Patagonia Inmersiva" },
      { property: "og:description", content: "Planes Starter, Full House e Inmersivo para tu negocio." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-24 md:pt-32 pb-12 md:pb-24 px-[5%]">
        <div className="mx-auto space-y-12 md:space-y-20">
          <div className="text-center space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-6xl font-light tracking-tight">Nuestros <span className="font-bold text-accent-blue">Precios</span></h1>
            <p className="text-zinc-400 max-w-2xl mx-auto font-light text-sm md:text-base">
              Elegí el plan que mejor se adapte a tus necesidades. Todos nuestros tours incluyen la más alta calidad en fotografía inmersiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={cn("relative p-8 rounded-3xl border flex flex-col h-full", pkg.popular ? "border-accent-blue bg-accent-blue/5" : "border-white/10 bg-white/5")}>
                {pkg.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-blue text-white text-[10px] uppercase tracking-widest px-4 py-1 rounded-full font-bold">Más Popular</div>}
                <div className="mb-6">{pkg.icon}</div>
                <h3 className="text-2xl font-medium mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold mb-4">{pkg.price}</div>
                <p className="text-zinc-400 text-sm font-light mb-8">{pkg.description}</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((f, j) => (<li key={j} className="flex items-center gap-3 text-sm text-zinc-300"><Check className="w-4 h-4 text-accent-blue flex-shrink-0" />{f}</li>))}
                </ul>
                <Button className={cn("w-full rounded-full py-6 font-semibold", pkg.popular ? "bg-accent-blue text-white" : "bg-white text-black hover:bg-zinc-200")} onClick={() => { setSelectedPlan(pkg.name); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Elegir Plan
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="pt-32 max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-light">Preguntas <span className="font-bold text-accent-blue">Frecuentes</span></h2>
              <p className="text-zinc-500 font-light">Resolvé tus dudas sobre Patagonia Inmersiva.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition-colors">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 flex items-center justify-between text-left gap-4">
                    <span className="font-medium text-zinc-100">{faq.question}</span>
                    <ChevronDown className={cn("w-5 h-5 text-accent-blue transition-transform duration-300", openFaq === i ? "rotate-180" : "")} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-6 pb-6 text-zinc-400 font-light text-sm leading-relaxed whitespace-pre-line">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-20"><Contact initialPlan={selectedPlan} /></div>
        </div>
      </div>
    </div>
  );
}
