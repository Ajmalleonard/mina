"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GalleryPage() {
  // Gallery items with images from the images folder
  const galleryItems = [
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
      title: "Food Distribution",
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
  ];

  // Categories for filtering
  const categories = [
    "All",
    "Events",
    "Education",
    "Charity",
    "Support",
    "Culture",
    "Health",
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
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentHeroImage === index ? 1 : 0,
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-green-800/60"></div>
            </motion.div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Our Gallery
          </motion.h1>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-24 h-1 bg-green-500 mx-auto mb-8"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-white mb-8 max-w-3xl mx-auto"
          >
            Explore the impact of our work through images of our events,
            programs, and community activities.
          </motion.p>
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Browse by Category
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mt-6"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`filter-button px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="gallery-item relative h-80 rounded-xl overflow-hidden border border-green-200 transition-all duration-300 shadow-sm hover:shadow-md"
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
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent flex items-end"
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 text-white w-full">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      className="text-xs font-semibold bg-green-600 px-2 py-1 rounded-full mb-3 inline-block"
                    >
                      {item.category}
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                      className="text-xl font-bold mb-2"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                      className="text-gray-200 text-sm"
                    >
                      {item.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredItem === item.id ? 1 : 0,
                        y: hoveredItem === item.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <Link
                        href="#"
                        className="text-white border border-white hover:bg-white hover:text-green-800 px-3 py-1 rounded-full text-sm inline-block transition-all"
                      >
                        View Larger
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_2530 2.jpg"
            alt="Call to action background"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get Involved</h2>
          <p className="text-xl text-white max-w-2xl mx-auto mb-8">
            Join us in our mission to support the community through our various
            programs and initiatives.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/contact"
              className="bg-white text-green-800 px-8 py-4 rounded-md font-medium hover:bg-green-50 transition-all shadow-md"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
