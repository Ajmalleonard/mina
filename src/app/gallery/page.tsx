import GalleryHero from "@/components/GalleryHero";
import GalleryGrid from "@/components/GalleryGrid";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos from Mina Foundation's events, programs, and community impact initiatives.",
  keywords:
    "Mina Foundation gallery, event photos, community programs, visual stories",
  openGraph: {
    title: "Gallery | Mina Foundation",
    description:
      "Browse photos from Mina Foundation's events, programs, and community impact initiatives.",
    images: "/opengraph-image.png",
  },
};

export default function GalleryPage() {
  return (
    <div className="w-full">
      <GalleryHero />
      <GalleryGrid />
    </div>
  );
}
