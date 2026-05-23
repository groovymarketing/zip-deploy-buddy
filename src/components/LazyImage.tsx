import { type ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  fallbackSrc?: string;
}

export const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc = "/headerpic.jpeg",
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-zinc-900", wrapperClassName)}>
      {!isLoaded && !error && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900"
          style={{ backgroundSize: "200% 100%" }}
        />
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => { if (!error) setError(true); }}
        loading="lazy"
        className={cn(
          "transition-all duration-700 ease-in-out",
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg",
          className,
        )}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
