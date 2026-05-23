import { useEffect, useRef } from "react";

interface Props {
  image: string;
  title?: string;
  author?: string;
  autoLoad?: boolean;
  pitch?: number;
  yaw?: number;
}

let pannellumLoader: Promise<void> | null = null;
function loadPannellum(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).pannellum) return Promise.resolve();
  if (pannellumLoader) return pannellumLoader;
  pannellumLoader = new Promise<void>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    document.head.appendChild(css);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    s.crossOrigin = "anonymous";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load pannellum"));
    document.head.appendChild(s);
  });
  return pannellumLoader;
}

export const ThreeSixtyViewer = ({ image, autoLoad = true, pitch = 0, yaw = 0 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const instance = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    loadPannellum().then(() => {
      if (cancelled || !ref.current) return;
      const p = (window as any).pannellum;
      if (!p?.viewer) return;
      if (instance.current) {
        try { instance.current.destroy(); } catch {}
      }
      instance.current = p.viewer(ref.current, {
        type: "equirectangular",
        panorama: image,
        autoLoad,
        hfov: 120,
        pitch,
        yaw,
        vaov: 180,
        haov: 360,
        compass: true,
        mouseZoom: false,
        crossOrigin: image.startsWith("http") ? "anonymous" : undefined,
      });
      const branding = document.createElement("div");
      branding.style.cssText = "position:absolute;bottom:16px;left:16px;z-index:1000;pointer-events:none;";
      const img = document.createElement("img");
      img.src = "/logo-Medium.png";
      img.style.cssText = `width:${window.innerWidth < 768 ? "100px" : "160px"};height:auto;opacity:0.6;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.5));`;
      branding.appendChild(img);
      ref.current.appendChild(branding);
    }).catch((e) => console.error("Pannellum load error", e));

    return () => {
      cancelled = true;
      if (instance.current) {
        try { instance.current.destroy(); } catch {}
        instance.current = null;
      }
    };
  }, [image, autoLoad, pitch, yaw]);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black group/viewer">
      <div ref={ref} className="w-full h-full" />
    </div>
  );
};
