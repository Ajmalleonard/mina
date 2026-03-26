"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type OptimizedImageProps = Omit<ImageProps, "onLoadingComplete"> & {
  fallbackSrc?: string;
  containerClassName?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  quality?: number;
};

export default function OptimizedImage({
  src,
  alt,
  className,
  quality = 75,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  loading = priority ? "eager" : "lazy",
  fallbackSrc = "/images/placeholder.jpg",
  containerClassName,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Enhanced LQIP with better shimmer effect
  const shimmerEffect = `
    <svg width="${width || 700}" height="${height || 475}" viewBox="0 0 ${
    width || 700
  } ${height || 475}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stop-color="#f3f4f6" offset="0%" />
          <stop stop-color="#e5e7eb" offset="50%" />
          <stop stop-color="#f3f4f6" offset="100%" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <Image
        src={isError ? fallbackSrc : src}
        alt={alt}
        quality={quality}
        sizes={sizes}
        priority={priority}
        loading={loading}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmerEffect)}`}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoadingComplete={handleLoad}
        onError={handleError}
        width={width}
        height={height}
        {...props}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}