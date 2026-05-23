import { useState } from "react";
import { Mail, MapPin, Loader2 } from "lucide-react";
const Instagram = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/projects.functions";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = useServerFn(subscribeNewsletter);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribe({ data: { email } });
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white pt-24 pb-12 px-[5%] border-t border-white/10">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
        <div className="space-y-6 flex flex-col items-center md:items-start">
          <img src="/logo-Medium.png" alt="Patagonia Inmersiva" className="h-12 w-auto object-contain" referrerPolicy="no-referrer" />
          <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            Transformamos la manera en que el mundo ve tus espacios. Especialistas en tours virtuales 360 y contenido de alta gama para la región patagónica.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/patagonia.inmersiva/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent-blue hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Navegación</h4>
          <ul className="space-y-4 text-zinc-400 text-sm font-light">
            <li><Link to="/" className="hover:text-accent-blue transition-colors">Inicio</Link></li>
            <li><a href="#portfolio" className="hover:text-accent-blue transition-colors">Portfolio</a></li>
            <li><a href="#servicios" className="hover:text-accent-blue transition-colors">Servicios</a></li>
            <li><a href="#blog" className="hover:text-accent-blue transition-colors">Blog</a></li>
            <li><a href="#contacto" className="hover:text-accent-blue transition-colors">Contacto</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Contacto</h4>
          <ul className="space-y-4 text-zinc-400 text-sm font-light flex flex-col items-center md:items-start">
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-accent-blue" /> hola@patagoniainmersiva.com.ar</li>
            <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent-blue flex-shrink-0" /> San Martín de los Andes, Neuquén, Patagonia Argentina</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Newsletter</h4>
          <p className="text-zinc-400 font-light text-sm">Suscríbete para recibir las últimas novedades y proyectos.</p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex gap-2">
              <Input type="email" placeholder="Tu email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading || subscribed} className="bg-white/5 border-white/10 focus:ring-accent-blue text-white" required />
              <Button type="submit" disabled={loading || subscribed} className="bg-accent-blue text-white hover:bg-accent-blue/90">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "OK"}
              </Button>
            </div>
            {subscribed && <p className="text-accent-blue text-xs">¡Gracias por suscribirte!</p>}
          </form>
        </div>
      </div>

      <div className="mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-600 text-xs">© 2026 Patagonia Inmersiva. Todos los derechos reservados.</p>
        <div className="flex gap-8 text-zinc-600 text-xs">
          <Link to="/proyectos" className="hover:text-white transition-colors">Proyectos</Link>
          <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
};
