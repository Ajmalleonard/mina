"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getOptimizedImageEntry, normalizeImageSrc } from "@/lib/images";

type OptimizedImageProps = ImageProps & {
  fallbackSrc?: string;
  quality?: number;
};

export default function OptimizedImage({
  src,
  alt,
  quality = 72,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
  fallbackSrc = "/images/placeholder.jpg",
  ...props
}: OptimizedImageProps) {
  const initialResolvedSrc =
    typeof src === "string" ? normalizeImageSrc(src) : src;
  const [currentSrc, setCurrentSrc] = useState<ImageProps["src"]>(initialResolvedSrc);

  useEffect(() => {
    setCurrentSrc(initialResolvedSrc);
  }, [initialResolvedSrc]);

  const resolvedImage = useMemo(() => {
    if (typeof currentSrc !== "string") {
      return {
        src: currentSrc,
        blurDataURL: undefined,
      };
    }

    return getOptimizedImageEntry(currentSrc);
  }, [currentSrc]);

  return (
    <Image
      {...props}
      src={resolvedImage.src}
      alt={alt}
      quality={quality}
      sizes={sizes}
      priority={priority}
      placeholder={resolvedImage.blurDataURL ? "blur" : "empty"}
      blurDataURL={resolvedImage.blurDataURL}
      onError={() => {
        if (typeof currentSrc === "string" && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
