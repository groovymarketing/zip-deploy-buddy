import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";
import { LazyImage } from "./LazyImage";

const articles = [
  {
    id: 1,
    title: "El futuro del Real Estate: Realidad Virtual y Tours 360 en la Patagonia",
    excerpt: "La fotografía 360° y los tours virtuales están transformando la manera de comprar y vender inmuebles en la región.",
    content: `La Patagonia siempre tuvo algo especial: distancias largas, paisajes que quitan el aliento y propiedades que muchas veces se venden tanto por lo que muestran como por lo que transmiten. Durante años, quien quería comprar una casa con vista al lago o un lote frente a la cordillera tenía que armar un viaje complicado, con vuelos, rutas de ripio y varios días de agenda. Eso está cambiando rápido.

La fotografía 360° y los tours virtuales, junto con las primeras experiencias de realidad virtual, están transformando la manera de comprar y vender inmuebles en la región. Hoy un interesado desde Buenos Aires, Europa o cualquier parte del mundo puede recorrer una propiedad completa, girar en 360 grados, mirar hacia el techo o asomarse a la terraza y sentir realmente cómo es el espacio y cómo se conecta con el entorno.

En una zona donde el paisaje forma parte esencial del valor de una propiedad, esta tecnología marca una diferencia notable. Los listados que incluyen tours 360° suelen recibir muchas más vistas que aquellos que solo tienen fotos tradicionales. Además, las propiedades con recorrido virtual tienden a reducir drásticamente su tiempo en el mercado, porque los compradores llegan a las visitas presenciales ya convencidos y con menos dudas.

El beneficio va más allá de los números. Un buen tour virtual permite apreciar detalles que antes solo se descubrían en persona: cómo entra la luz del atardecer en el living, la amplitud real de los ambientes, la orientación de las ventanas hacia el Nahuel Huapi o la sensación de estar rodeado de bosque y montañas. Para inversores extranjeros, esto elimina la barrera geográfica inicial y les permite evaluar seriamente varias opciones sin moverse de su casa.

En la práctica, los tours 360° están ayudando a que el proceso sea más transparente y eficiente. Se reducen las visitas innecesarias, se ahorra tiempo y combustible, y tanto vendedores como compradores pueden enfocarse en las propiedades que realmente les interesan. En 2026, cada vez más compradores directamente descartan anuncios que no ofrecen este nivel de detalle. La tecnología no reemplaza la visita presencial, pero la hace mucho más efectiva.`,
    date: "10 Abr 2026", author: "Kevin Perelman", category: "Tecnología", image: "/headerpic.jpeg",
  },
  {
    id: 2,
    title: "Marketing Inmobiliario: 5 consejos para destacar una propiedad en la Patagonia",
    excerpt: "Estrategias visuales para resaltar propiedades en un entorno natural imponente.",
    content: `Competir en el mercado inmobiliario patagónico no es sencillo. Las propiedades no solo se comparan entre sí, sino también con el enorme atractivo del entorno natural: lagos, bosques y montañas que muchas veces roban protagonismo a la casa misma. Por eso, una buena estrategia de marketing visual puede marcar la diferencia entre pasar desapercibido y generar interés real.

**1. Iluminación estratégica:** La luz en la Patagonia puede ser muy intensa o cambiar drásticamente según la hora, el clima y el momento del año. Una correcta gestión de la luz natural y uso de bracketing evita sombras duras, resalta materiales y texturas, y hace que los ambientes se vean más amplios y cálidos.

**2. Staging estratégico:** Ordenar y despersonalizar los espacios ayuda a que quien mira pueda imaginarse viviendo allí.

**3. Contenido inmersivo:** Las fotografías planas siguen siendo útiles, pero un tour virtual 360° permite explorar la propiedad como si uno estuviera caminando dentro de ella.

**4. Narrativa visual:** Más que mostrar habitaciones, resulta efectivo destacar lo que hace única a esa propiedad.

**5. Publicación inteligente:** Google y los principales portales inmobiliarios valoran positivamente el contenido rico en imágenes y recorridos interactivos.`,
    date: "05 Abr 2026", author: "Patagonia Team", category: "Marketing", image: "/Complejo01_bloom_1x.jpeg",
  },
  {
    id: 3,
    title: "Experiencias de Viaje: La Patagonia como nunca la viste con tours 360°",
    excerpt: "Explora la región de forma inmersiva sin necesidad de viajar físicamente.",
    content: `La Patagonia es uno de esos lugares que cuesta describir con palabras. Sus paisajes son tan vastos y cambiantes que muchas veces las fotos tradicionales se quedan cortas. Ahí es donde los tours virtuales 360° están haciendo una diferencia interesante, permitiendo explorar la región de forma inmersiva sin necesidad de viajar físicamente.

Estos recorridos van más allá de una simple imagen panorámica. Permiten "caminar" por senderos, girar para ver el panorama completo, detenerse a observar detalles y tener una sensación mucho más cercana a estar presente.

Para el sector turístico, esta herramienta ofrece varias ventajas. Facilita la planificación de viajes, permite mostrar lodges, cabañas o estancias tal como son y ayuda a que los potenciales visitantes se hagan una idea realista de lo que van a encontrar.`,
    date: "28 Mar 2026", author: "Patagonia Inmersiva", category: "Viajes", image: "/7-lagos.png",
  },
];

export const Blog = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleContact = () => {
    setOpenId(null);
    setTimeout(() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <section id="blog" className="pt-8 md:pt-12 pb-12 md:pb-24 px-[5%] bg-zinc-950 text-white">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-16">
          <div className="space-y-2 md:space-y-4">
            <Badge variant="outline" className="text-accent-blue border-accent-blue/30 px-3 md:px-4 py-0.5 md:py-1 rounded-full uppercase tracking-widest text-[9px] md:text-[10px]">Blog & Noticias</Badge>
            <h2 className="text-2xl md:text-5xl font-light tracking-tight">Contenido <span className="font-bold text-accent-blue">Inmersivo</span></h2>
          </div>
          <Button variant="link" className="text-accent-blue p-0 h-auto group text-sm md:text-base">
            Ver todas las entradas <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, i) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Dialog open={openId === article.id} onOpenChange={(o) => setOpenId(o ? article.id : null)}>
                <DialogTrigger asChild>
                  <Card className="bg-white/5 border-white/10 overflow-hidden group h-full flex flex-col cursor-pointer">
                    <div className="relative aspect-video overflow-hidden">
                      <LazyImage src={article.image} alt={article.title} wrapperClassName="w-full h-full" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border-white/10">{article.category}</Badge>
                    </div>
                    <CardHeader className="space-y-4 flex-grow">
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.date}</div>
                        <div className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</div>
                      </div>
                      <CardTitle className="text-xl font-medium leading-tight text-zinc-100 group-hover:text-accent-blue transition-colors">{article.title}</CardTitle>
                      <CardDescription className="text-zinc-400 font-light line-clamp-3">{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 border-t border-white/5 mt-auto">
                      <div className="flex items-center justify-end pt-4">
                        <Button variant="ghost" size="sm" className="text-accent-blue hover:text-accent-blue/80 hover:bg-accent-blue/10">Leer más</Button>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="w-[95vw] md:w-[85vw] max-w-none sm:max-w-none md:max-w-[85vw] max-h-[92vh] overflow-y-auto bg-zinc-950 border-white/10 text-white p-0 focus-visible:ring-0">
                  <div className="relative w-full overflow-hidden">
                    <div className="relative aspect-[21/9] w-full">
                      <LazyImage src={article.image} alt={article.title} wrapperClassName="w-full h-full" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    </div>
                  </div>
                  <div className="px-6 md:px-12 py-10 space-y-10 w-full max-w-[70vw] mx-auto">
                    <DialogHeader className="space-y-6">
                      <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-zinc-500">
                        <Badge variant="outline" className="text-accent-blue border-accent-blue/30 px-3 py-1 font-medium">{article.category}</Badge>
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
                        <span className="flex items-center gap-2"><User className="w-4 h-4" /> Por {article.author}</span>
                      </div>
                      <DialogTitle className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">{article.title}</DialogTitle>
                    </DialogHeader>
                    <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-300 font-light leading-relaxed whitespace-pre-line border-y border-white/5 py-12">
                      <ReactMarkdown>{article.content || article.excerpt}</ReactMarkdown>
                    </div>
                    <div className="pt-12 pb-8 flex flex-col items-center text-center space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-medium">¿Te interesó este artículo?</h4>
                        <p className="text-zinc-400 font-light">Contactanos para implementar estas soluciones en tu negocio.</p>
                      </div>
                      <Button size="lg" className="bg-accent-blue hover:bg-accent-blue/90 text-white font-bold px-12 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(83,144,172,0.3)] transition-all hover:scale-105" onClick={handleContact}>
                        <Send className="mr-2 w-5 h-5" /> Hablar con un asesor
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
