import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "César S.", role: "Agente Inmobiliario", content: "Los tours 360° aumentaron nuestras consultas en un 300%. Los clientes pueden recorrer las propiedades desde Buenos Aires antes de viajar. Increíble servicio." },
  { name: "Florencia C.", role: "Propietaria Airbnb en Chapelco Golf", content: "Patagonia Inmersiva capturó la esencia de nuestra casa de manera espectacular. Las reservas desde el exterior se triplicaron gracias a los tours virtuales." },
  { name: "Verónica L.", role: "Gerente Marketing Cotesma", content: "Profesionalismo y calidad excepcional. Nuestros clientes pueden recorrer todo el centro cultural antes de reservar para su congreso. Una inversión que se paga sola." },
];

export const Testimonials = () => (
  <section className="pt-8 md:pt-12 pb-12 md:pb-24 px-[5%] bg-black text-white overflow-hidden">
    <div className="mx-auto">
      <div className="text-center space-y-2 md:space-y-4 mb-8 md:mb-16">
        <h2 className="text-2xl md:text-5xl font-light tracking-tight">Lo que dicen <span className="font-bold text-accent-blue">nuestros clientes</span></h2>
        <p className="text-zinc-400 max-w-2xl mx-auto font-light text-sm md:text-base">La confianza de quienes ya transformaron su forma de mostrar espacios.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}>
            <Card className="bg-zinc-900/50 border-white/10 h-full hover:bg-zinc-900 transition-colors relative overflow-hidden">
              <CardContent className="p-5 md:p-6 flex flex-col h-full relative z-10">
                <Quote className="absolute -top-2 -left-2 w-12 h-12 md:w-16 md:h-16 text-accent-blue/10 -rotate-12" />
                <div className="flex gap-1 mb-2 md:mb-3">
                  {[...Array(5)].map((_, j) => (<Star key={j} className="w-3 h-3 fill-accent-blue text-accent-blue" />))}
                </div>
                <p className="text-zinc-300 font-light text-sm md:text-base mb-4 md:mb-6 flex-grow leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-3 md:pt-4">
                  <div>
                    <h4 className="font-medium text-white text-xs md:text-sm">{t.name}</h4>
                    <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest leading-none mt-1">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
