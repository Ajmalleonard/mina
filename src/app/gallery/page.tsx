"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GalleryPage() {
  // Sample gallery items - in a real application, these would come from a database or CMS
  const galleryItems = [
    {
      id: 1,
      title: "Community Iftar",
      description: "Annual Ramadan community gathering",
      category: "Events",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      title: "Educational Workshop",
      description: "Children's Islamic education program",
      category: "Education",
      bgColor: "bg-green-200",
    },
    {
      id: 3,
      title: "Charity Drive",
      description: "Winter clothing distribution event",
      category: "Charity",
      bgColor: "bg-green-300",
    },
    {
      id: 4,
      title: "Family Support Day",
      description: "Providing resources and counseling to families",
      category: "Support",
      bgColor: "bg-green-100",
    },
    {
      id: 5,
      title: "Eid Celebration",
      description: "Community celebration of Eid al-Fitr",
      category: "Events",
      bgColor: "bg-green-200",
    },
    {
      id: 6,
      title: "Youth Leadership Program",
      description: "Developing leadership skills in Muslim youth",
      category: "Education",
      bgColor: "bg-green-300",
    },
    {
      id: 7,
      title: "Food Distribution",
      description: "Monthly food packages for families in need",
      category: "Charity",
      bgColor: "bg-green-100",
    },
    {
      id: 8,
      title: "Islamic Art Exhibition",
      description: "Showcasing traditional and contemporary Islamic art",
      category: "Culture",
      bgColor: "bg-green-200",
    },
    {
      id: 9,
      title: "Community Health Fair",
      description: "Free health screenings and education",
      category: "Health",
      bgColor: "bg-green-300",
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
  }, [activeCategory]);

  // Array of hero section background images that will slide
  const heroBackgrounds = [
    { gradient: "from-green-600/30 to-green-800/40", opacity: 0.7 },
    { gradient: "from-emerald-600/30 to-emerald-800/40", opacity: 0.6 },
    { gradient: "from-teal-600/30 to-teal-800/40", opacity: 0.65 },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 bg-green-50 overflow-hidden"
      >
        {/* Sliding background effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroBackgrounds.map((bg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: "100%" }}
              animate={{
                opacity: [0, bg.opacity, 0],
                x: ["100%", "0%", "-100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: index * 6,
                times: [0, 0.5, 1],
              }}
              className={`absolute inset-0 bg-gradient-to-r ${bg.gradient}`}
            ></motion.div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-green-900 mb-6"
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
            className="text-xl text-green-800 mb-8 max-w-3xl mx-auto"
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
                className={`gallery-item relative h-80 ${item.bgColor} rounded-xl overflow-hidden border border-green-200 transition-all duration-300`}
              >
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
                      className="text-xl font-semibold mb-2"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                      className="text-sm text-white/90"
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
                      <button className="text-sm bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors backdrop-blur-sm">
                        View Details
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-green-50/50 rounded-xl"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </motion.div>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-600 text-lg mb-4"
              >
                No gallery items found for this category.
              </motion.p>
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory("All")}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                View all items
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-b from-white to-green-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-green-600 rounded-2xl overflow-hidden border-2 border-green-500"
          >
            <div className="relative p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-16 -mt-16"
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-20 -mb-20"
              ></motion.div>

              <div className="relative z-10 text-center text-white">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Be Part of Our Story
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg text-white/90 mb-10 max-w-2xl mx-auto"
                >
                  Join us in our mission to support Islamic families through
                  your donations and volunteer work.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Link
                      href="/donate"
                      className="btn-primary bg-white hover:bg-green-50 text-green-600 px-8 py-3 rounded-md font-medium text-lg inline-block shadow-lg"
                    >
                      Donate Now
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Link
                      href="/contact"
                      className="border-2 border-white text-white hover:bg-white/20 px-8 py-3 rounded-md font-medium text-lg inline-block backdrop-blur-sm"
                    >
                      Contact Us
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
