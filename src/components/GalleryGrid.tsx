"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GalleryGrid() {
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
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(
        galleryItems.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory, galleryItems]);

  return (
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
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Browse by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md text-sm md:text-base ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-green-50 text-green-700 border border-green-200"
                } transition-all`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative overflow-hidden rounded-lg shadow-md border border-gray-200 group"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={375}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xs px-2 py-1 bg-green-600 rounded-md inline-block w-fit mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-500"
          >
            <p>No gallery items found in this category.</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
