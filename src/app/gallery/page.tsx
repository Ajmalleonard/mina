"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function GalleryPage() {
  // Gallery items with images from the images folder
  const galleryItems = useMemo(() => [
    {
      id: 1,
      title: "Community Iftar",
      description: "Annual Ramadan community gathering",
      category: "Events",
      image: "/images/2.jpg",
    },
    {
      id: 2,
      title: "Educational Workshop",
      description: "Children's education program",
      category: "Education",
      image: "/images/3.jpg",
    },
    {
      id: 3,
      title: "Charity Drive",
      description: "Winter clothing distribution event",
      category: "Charity",
      image: "/images/5.jpg",
    },
    {
      id: 4,
      title: "Family Support Day",
      description: "Providing resources and counseling to families",
      category: "Support",
      image: "/images/7.jpg",
    },
    {
      id: 5,
      title: "Eid Celebration",
      description: "Community celebration of Eid al-Fitr",
      category: "Events",
      image: "/images/10.jpg",
    },
    {
      id: 6,
      title: "Youth Leadership Program",
      description: "Developing leadership skills in Muslim youth",
      category: "Education",
      image: "/images/12.jpg",
    },
    {
      id: 7,
      title: " Kurban ",
      description: "Monthly food packages for families in need",
      category: "Charity",
      image: "/images/14.jpg",
    },
    {
      id: 8,
      title: "Art Exhibition",
      description: "Showcasing traditional and contemporary art",
      category: "Culture",
      image: "/images/16.jpg",
    },
    {
      id: 9,
      title: "Community Health Fair",
      description: "Free health screenings and education",
      category: "Health",
      image: "/images/18.jpg",
    },
    {
      id: 10,
      title: "Community Center Opening",
      description: "Grand opening of our new community center",
      category: "Events",
      image: "/images/20.jpg",
    },
    {
      id: 11,
      title: "Women's Empowerment Workshop",
      description: "Supporting women in our community",
      category: "Education",
      image: "/images/22.jpg",
    },
    {
      id: 12,
      title: "Orphan Sponsorship Program",
      description: "Supporting orphans through education and care",
      category: "Charity",
      image: "/images/24.jpg",
    },
    {
      id: 13,
      title: "Family Counseling Services",
      description: "Professional support for families in need",
      category: "Support",
      image: "/images/26.jpg",
    },
    {
      id: 14,
      title: "Cultural Heritage Day",
      description: "Celebrating our rich cultural heritage",
      category: "Culture",
      image: "/images/IMG_2480 2.jpg",
    },
    {
      id: 15,
      title: "Health Awareness Campaign",
      description: "Educating our community on important health topics",
      category: "Health",
      image: "/images/IMG_2509 2.jpg",
    },
    // MASJID IMAGES
    {
      id: 16,
      title: "Mosque Drone View",
      description: "Aerial view of one of our newly constructed Masjids in rural Tanzania",
      category: "Infrastructure",
      image: "/assets/MASJID/DJI_20250902124328_0005_D.JPG",
    },
    {
      id: 17,
      title: "Masjid Construction",
      description: "Workers finalizing the structure of a new community Mosque",
      category: "Infrastructure",
      image: "/assets/MASJID/IMG_4157.JPG",
    },
    {
      id: 18,
      title: "Rural Mosque Center",
      description: "Serving as a spiritual and educational hub for the village",
      category: "Infrastructure",
      image: "/assets/MASJID/DJI_20241221122624_0083_D.JPG",
    },
    // KATARAKT IMAGES
    {
      id: 19,
      title: "Cataract Medical Camp",
      description: "Pre-operative vision screening for elderly patients",
      category: "Health",
      image: "/assets/KATARAKT/JQ0G3807.JPG",
    },
    {
      id: 20,
      title: "Restoring Sight",
      description: "Life-changing cataract surgery being performed",
      category: "Health",
      image: "/assets/KATARAKT/JQ0G3753_1.JPG",
    },
    {
      id: 21,
      title: "Post-Surgery Joy",
      description: "A patient experiencing clear vision for the first time in years",
      category: "Health",
      image: "/assets/KATARAKT/JQ0G4907_1.JPG",
    },
  ], []);

  // Categories for filtering
  const categories = [
    "All",
    "Events",
    "Education",
    "Charity",
    "Support",
    "Culture",
    "Health",
    "Infrastructure",
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Filter gallery items based on selected category
  React.useEffect(() => {
    if (activeCategory === "All") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(
        galleryItems.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory, galleryItems]);

  // Array of hero section background images
  const heroImages = [
    { src: "/images/IMG_2525 2.jpg", alt: "Community gathering" },
    { src: "/images/IMG_8967 2.jpg", alt: "Foundation activities" },
    { src: "/images/IMG_9003 2.jpg", alt: "Community support" },
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="w-full bg-[#FFFBF2] text-[#111111]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentHeroImage === index ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover grayscale brightness-50"
              />
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Gallery
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Explore the impact of our work through images of our events,
            programs, and community activities.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-[#FFFBF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">
              Browse by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-none text-sm font-bold border ${
                    activeCategory === category
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-[#111111] border-[#111111] hover:bg-[#111111] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#111111]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="group relative h-80 rounded-none overflow-hidden border-b border-r border-[#111111] bg-gray-100"
              >
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Always-on label instead of hovering opacity to match static look */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-[#111111] p-4 text-[#111111]">
                  <span className="text-[10px] uppercase tracking-wider font-bold border border-[#111111] px-2 py-1 bg-white mb-2 inline-block">
                      {item.category}
                  </span>
                  <h3 className="text-lg font-bold mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-gray-600 text-xs line-clamp-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_2530 2.jpg"
            alt="Call to action background"
            fill
            className="object-cover brightness-50 grayscale"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get Involved</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join us in our mission to support the community through our various
            programs and initiatives.
          </p>
          <div className="inline-block">
            <Link
              href="/contact"
              className="bg-white text-[#111111] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
