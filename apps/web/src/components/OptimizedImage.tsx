"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type OptimizedImageProps = Omit<ImageProps, "onLoadingComplete"> & {
  fallbackSrc?: string;
};

export default function OptimizedImage({
  src,
  alt,
  className,
  quality = 75,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  fallbackSrc = "/images/placeholder.jpg",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Use LQIP (Low Quality Image Placeholder) effect
  const shimmerEffect = `
    <svg width="100%" height="100%" viewBox="0 0 ${props.width || 700} ${
    props.height || 475
  }" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6" />
      <rect id="r" width="100%" height="100%" fill="url(#g)" />
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f3f4f6" offset="0%" />
          <stop stop-color="#eaecf0" offset="50%" />
          <stop stop-color="#f3f4f6" offset="100%" />
        </linearGradient>
      </defs>
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      <Image
        src={isError ? fallbackSrc : src}
        alt={alt}
        quality={quality}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmerEffect)}`}
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsError(true);
          setIsLoading(false);
        }}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}
