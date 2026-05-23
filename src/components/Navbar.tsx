import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Servicios", hash: "servicios" },
  { name: "360", hash: "portfolio" },
  { name: "Foto", hash: "foto" },
  { name: "Video", hash: "video" },
  { name: "Blog", hash: "blog" },
  { name: "Contacto", hash: "contacto" },
];

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 100;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isPricingPage = location.pathname === "/presupuesto";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    const onMove = (e: MouseEvent) => {
      if (location.pathname === "/" && !isScrolled) setIsHoveringTop(e.clientY < 100);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, [location.pathname, isScrolled]);

  const handleNav = (hash: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate({ to: "/", hash });
    } else {
      scrollToId(hash);
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-[5%] flex items-center h-20 md:h-24",
      (isScrolled || isPricingPage || isHoveringTop)
        ? "bg-black/80 backdrop-blur-md border-b border-white/10 translate-y-0 opacity-100"
        : "bg-transparent -translate-y-full opacity-0 pointer-events-none",
    )}>
      <div className="mx-auto w-full h-full flex items-center justify-between">
        <Link to="/" className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/logo-Medium.png" alt="Patagonia Inmersiva" className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" referrerPolicy="no-referrer" />
        </Link>

        <div className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => handleNav(link.hash)} className="text-sm font-medium text-zinc-400 hover:text-white transition-all duration-300 relative h-full flex items-center">
              {link.name}
            </button>
          ))}
          <Link to="/presupuesto" className="flex items-center">
            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6 transition-transform hover:scale-105 active:scale-95">Precios</Button>
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <button className="text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 right-0 bg-zinc-900 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => handleNav(link.hash)} className="text-lg font-medium text-zinc-400 hover:text-white transition-colors text-left">
              {link.name}
            </button>
          ))}
          <Link to="/presupuesto" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-accent-blue hover:text-white transition-colors">
            Precios
          </Link>
        </motion.div>
      )}
    </nav>
  );
};
