import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";

type BackgroundImage = {
  src: string;
  alt: string;
};

type HeroSectionProps = {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImages?: BackgroundImage[];
};

function HeroSection({
  title,
  description,
  primaryButtonText = "Donate Now",
  primaryButtonLink = "/donate",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "/about",
  backgroundImages = [],
}: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate through background images
  useEffect(() => {
    if (backgroundImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Fallback to gradient backgrounds if no images provided
  const heroBackgrounds = [
    { gradient: "from-green-600/40 to-green-800/50", opacity: 0.8 },
    { gradient: "from-emerald-600/40 to-emerald-800/50", opacity: 0.75 },
    { gradient: "from-teal-600/40 to-teal-800/50", opacity: 0.7 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-green-50"
    >
      {/* Background Image/Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundImages.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <Image
                src={backgroundImages[currentImageIndex].src}
                alt={backgroundImages[currentImageIndex].alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30" />
            </motion.div>
          </AnimatePresence>
        ) : (
          // Fallback gradient animations if no images provided
          heroBackgrounds.map((bg, index) => (
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
          ))
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          {title}
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
          className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {primaryButtonText && primaryButtonLink && (
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href={primaryButtonLink}
                className="btn-primary bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-md font-medium text-lg inline-block border border-green-600 transition-all"
              >
                {primaryButtonText}
              </Link>
            </motion.div>
          )}

          {secondaryButtonText && secondaryButtonLink && (
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Link
                href={secondaryButtonLink}
                className="px-8 py-4 rounded-md font-medium text-lg border-2 border-white text-white hover:bg-white hover:text-green-700 inline-block transition-all"
              >
                {secondaryButtonText}
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.8 },
            y: {
              delay: 1.2,
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HeroSection;
