import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import appCss from "../styles.css?url";

function ScrollHandler() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const t = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        const offset = 100;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">La página que buscás no existe o fue movida.</p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-accent-blue px-4 py-2 text-sm font-medium text-white">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo salió mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">Intentá de nuevo o volvé al inicio.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-accent-blue px-4 py-2 text-sm font-medium text-white">Reintentar</button>
          <a href="/" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">Volver al inicio</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Patagonia Inmersiva | Producción 360° y Realidad Virtual" },
      { name: "description", content: "Tours virtuales 360°, fotografía inmersiva y experiencias VR en la Patagonia. Real Estate, Hotelería y Eventos." },
      { name: "keywords", content: "tours virtuales, 360, patagonia, realidad virtual, real estate, fotografia, san martin de los andes" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Patagonia Inmersiva | Producción 360° y Realidad Virtual" },
      { property: "og:description", content: "Tours virtuales 360°, fotografía inmersiva y experiencias VR en la Patagonia. Real Estate, Hotelería y Eventos." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Patagonia Inmersiva | Producción 360° y Realidad Virtual" },
      { name: "twitter:description", content: "Tours virtuales 360°, fotografía inmersiva y experiencias VR en la Patagonia. Real Estate, Hotelería y Eventos." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/02231cd3-7c50-4ea8-831d-b6e02cc6dcaa/id-preview-1840a28f--e7b09154-0d1b-4723-97af-b6fbde22c2a4.lovable.app-1779546168412.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/02231cd3-7c50-4ea8-831d-b6e02cc6dcaa/id-preview-1840a28f--e7b09154-0d1b-4723-97af-b6fbde22c2a4.lovable.app-1779546168412.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/logo-sq-low.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollHandler />
      <div className="min-h-screen bg-black selection:bg-accent-blue selection:text-white">
        <Navbar />
        <main><Outlet /></main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
