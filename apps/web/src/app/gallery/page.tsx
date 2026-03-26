"use client";
import React, { useMemo } from "react";
import Image from "next/image";

export default function GalleryPage() {
  // Gallery items with focus on varying shapes for the masonry grid
  const galleryItems = useMemo(() => [
    {
      id: 1,
      title: "Drone View",
      category: "Infrastructure",
      image: "/assets/MASJID/DJI_20250902124328_0005_D.JPG",
      className: "md:col-span-2 aspect-[16/10]",
    },
    {
      id: 2,
      title: "Community Journey",
      category: "Social",
      image: "/images/3.jpg",
      className: "md:col-span-1 aspect-[3/4]",
    },
    {
      id: 3,
      title: "Tanzanian Roads",
      category: "Landscape",
      image: "/images/5.jpg",
      className: "md:col-span-1 aspect-[3/4]",
    },
    {
      id: 4,
      title: "Medical Camp",
      category: "Health",
      image: "/assets/KATARAKT/JQ0G3807.JPG",
      className: "md:col-span-1 aspect-square",
    },
    {
      id: 5,
      title: "Care & Support",
      category: "Health",
      image: "/assets/KATARAKT/JQ0G3753_1.JPG",
      className: "md:col-span-1 aspect-[3/4]",
    },
    {
      id: 6,
      title: "Our Pride",
      category: "Infrastructure",
      image: "/assets/MASJID/IMG_4157.JPG",
      className: "md:col-span-1 aspect-square md:aspect-[3/4]",
    },
    {
      id: 7,
      title: "Community Roots",
      category: "Infrastructure",
      image: "/assets/MASJID/DJI_20241221122624_0083_D.JPG",
      className: "md:col-span-2 aspect-video",
    },
  ], []);

  return (
    <div className="w-full bg-white text-[#111111] min-h-screen">
      {/* Navigation Padding (since there's no hero now) */}
      <div className="h-32" />

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-[10px] uppercase font-black tracking-widest text-gray-500">
              Our Stories
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-[#111111] tracking-tighter leading-none">
              Photo <br className="hidden md:block" /> Gallery
            </h1>
          </div>
          <p className="max-w-xs text-sm font-medium text-gray-400 mb-4 md:text-right leading-relaxed">
            Captured moments from our <br /> desert projects and scenic routes <br /> across the nation.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl overflow-hidden bg-gray-50 transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                <span className="text-[#95E18A] text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                  {item.category}
                </span>
                <h3 className="text-white text-2xl font-black tracking-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
