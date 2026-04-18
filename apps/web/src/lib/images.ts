import { imageManifest } from "@/generated/image-manifest";

const IMAGE_ALIASES: Record<string, string> = {
  "/assets/KATARAKT/JQ0G3807.JPG": "/assets/KATARAKT/JQ0G3807.jpg",
  "/images/IMG_2525 2.jpg": "/images/IMG_2525_2.jpg",
  "/images/IMG_2530 2.jpg": "/images/IMG_2530_2.jpg",
  "/images/IMG_9003 2.jpg": "/images/IMG_9003_2.jpg",
  "/images/IMG_8983 2.jpg": "/images/IMG_8983_2.jpg",
  "/images/IMG_9014 2.jpg": "/images/IMG_9014_2.jpg",
  "/images/IMG_2479 2.jpg": "/images/IMG_2479_2.jpg",
  "/images/IMG_2512 2.jpg": "/images/IMG_2512_2.jpg",
  "/images/hands.jpg": "/hands.jpg",
  "/children.jpg": "/images/21.jpg",
  "/images/children.jpg": "/images/21.jpg",
  "/meals.jpg": "/assets/FOOD_PACKAGES/IMG_0101.jpg",
  "/images/meals.jpg": "/assets/FOOD_PACKAGES/IMG_0101.jpg",
  "/assets/QUR_DISTRIBUTION/IMG_4157.JPG": "/assets/QUR_DISTRIBUTION/IMG_4337.JPG",
  "/placeholder.jpg": "/images/placeholder.jpg",
};

type ManifestEntry = (typeof imageManifest)[keyof typeof imageManifest];

export function normalizeImageSrc(src: string) {
  return IMAGE_ALIASES[src] ?? src;
}

export function getOptimizedImageEntry(src: string) {
  const normalizedSrc = normalizeImageSrc(src);
  const entry = imageManifest[normalizedSrc as keyof typeof imageManifest] as
    | ManifestEntry
    | undefined;

  return {
    src: entry?.src ?? normalizedSrc,
    blurDataURL: entry?.blurDataURL,
    width: entry?.width,
    height: entry?.height,
  };
}
