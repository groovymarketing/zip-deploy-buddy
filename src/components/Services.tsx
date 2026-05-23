import { motion } from "motion/react";
import { Home, Building2, Video } from "lucide-react";

const services = [
  { icon: <Home className="w-8 h-8" />, title: "Real Estate", description: <><strong className="text-white">Tours virtuales de alta resolución</strong> para propiedades. Aumentá el <strong className="text-white">interés</strong> de compradores y <strong className="text-white">optimizá</strong> el tiempo de las consultas. Ideal para <strong className="text-white">potenciar y acelerar las ventas.</strong></> },
  { icon: <Building2 className="w-8 h-8" />, title: "Comercial y Eventos", description: <>Mostrá tu local, restaurante o salón de eventos. Invitá a tus clientes a <strong className="text-white">explorar cada rincón</strong> y transportalos a tu espacio desde cualquier lugar. <strong className="text-white">Integración 360 en Google Maps: Conversión asegurada.</strong></> },
  { icon: <Video className="w-8 h-8" />, title: "Producción de Video", description: <>Contenido audiovisual y fotográfico de <strong className="text-white">alto impacto</strong>. Videos promocionales, reels y coberturas cinematográficas para destacar tu marca. <strong className="text-white">Elevá la comunicación digital de tu empresa.</strong></> },
];

export const Services = () => (
  <section id="servicios" className="pt-12 pb-24 px-[5%] bg-black text-white" aria-labelledby="services-title">
    <div className="lg:max-w-none mx-auto">
      <h2 id="services-title" className="sr-only">Nuestros Servicios Inmersivos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="space-y-6 group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent-blue/10 rounded-2xl flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all duration-500 border border-accent-blue/20">{s.icon}</div>
            <h3 className="text-2xl font-medium">{s.title}</h3>
            <p className="text-zinc-400 text-base font-light leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
