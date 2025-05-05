"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GalleryHero() {
  // Array of hero section background images
  const heroImages = [
    { src: "/images/IMG_2525 2.jpg", alt: "Community gathering" },
    { src: "/images/IMG_8967 2.jpg", alt: "Foundation activities" },
    { src: "/images/IMG_9003 2.jpg", alt: "Community support" },
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
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
          Explore the impact of our work through images of our events, programs,
          and community activities.
        </motion.p>
      </div>
    </motion.section>
  );
}
