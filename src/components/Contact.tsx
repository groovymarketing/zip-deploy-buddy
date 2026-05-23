import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/lib/projects.functions";

interface ContactProps { initialPlan?: string }

const plans = [
  { value: "", label: "Seleccionar un plan" },
  { value: "Promo Starter", label: "Promo Starter" },
  { value: "Full House", label: "Full House" },
  { value: "Inmersivo", label: "Inmersivo" },
  { value: "Personalizado", label: "Consulta Personalizada" },
];

export const Contact = ({ initialPlan = "" }: ContactProps) => {
  const location = useLocation();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", plan: initialPlan, message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submit = useServerFn(submitContact);

  useEffect(() => {
    if (initialPlan) setFormData((p) => ({ ...p, plan: initialPlan }));
  }, [initialPlan]);

  const handlePreciosClick = (e: React.MouseEvent) => {
    if (location.pathname === "/presupuesto") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({ data: formData });
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", plan: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="pt-8 md:pt-12 pb-12 md:pb-24 px-[5%] bg-zinc-950 text-white">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-5xl font-light tracking-tight">¿Listo para <span className="font-bold text-accent-blue">empezar?</span></h2>
              <p className="text-zinc-400 font-light max-w-md text-sm md:text-base">Cuéntanos sobre tu proyecto y te ayudaremos a crear una experiencia inmersiva única.</p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white transition-all shrink-0">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest leading-none mb-1">Email</p>
                  <p className="text-xs md:text-sm font-medium">patagoniainmersiva@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white transition-all shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest leading-none mb-1">Ubicación</p>
                  <p className="text-xs md:text-sm font-medium">San Martín de los Andes, Neuquén, Patagonia Argentina</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-white/5 border-white/10 p-8">
            <CardContent className="p-0">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-accent-blue" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">¡Mensaje Enviado!</h3>
                    <p className="text-zinc-400 text-sm max-w-xs">Hemos recibido tu mensaje. Nos pondremos en contacto contigo a la brevedad.</p>
                  </div>
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4 border-white/10 hover:bg-white/5">Enviar otro mensaje</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Nombre</label>
                      <Input placeholder="Tu nombre" className="bg-black/50 border-white/10 h-12 text-zinc-400 placeholder:text-zinc-600" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Email</label>
                      <Input type="email" placeholder="tu@email.com" className="bg-black/50 border-white/10 h-12 text-zinc-400 placeholder:text-zinc-600" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Asunto</label>
                      <Input placeholder="¿En qué podemos ayudarte?" className="bg-black/50 border-white/10 h-12 text-zinc-400 placeholder:text-zinc-600" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center h-4">
                        <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Plan de Interés</label>
                        <Link to="/presupuesto" onClick={handlePreciosClick} className="text-[10px] text-accent-blue hover:text-accent-blue/80 transition-colors uppercase tracking-wider font-bold">(ver precios)</Link>
                      </div>
                      <select value={formData.plan} onChange={(e) => setFormData({ ...formData, plan: e.target.value })} className={cn("w-full h-12 px-3 py-2 bg-black/50 border border-white/10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 appearance-none", formData.plan === "" ? "text-zinc-600" : "text-zinc-400")}>
                        {plans.map((p) => (<option key={p.value} value={p.value} className="bg-zinc-900 text-zinc-400">{p.label}</option>))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Mensaje</label>
                    <Textarea placeholder="Cuéntanos más detalles..." className="bg-black/50 border-white/10 min-h-[150px] text-zinc-400 placeholder:text-zinc-600" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-accent-blue text-white hover:bg-accent-blue/90 font-semibold py-6">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="mr-2 w-4 h-4" />}
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
