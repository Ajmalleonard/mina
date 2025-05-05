import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";

/**
 * Type definition for background image objects
 */
type BackgroundImage = {
  src: string; // Image source path
  alt: string; // Alt text for accessibility
};

/**
 * Props interface for the HeroSection component
 */
type HeroSectionProps = {
  title: string; // Main headline
  description: string; // Subtitle or description
  primaryButtonText?: string; // Text for primary action button
  primaryButtonLink?: string; // URL for primary button
  secondaryButtonText?: string; // Text for secondary action button
  secondaryButtonLink?: string; // URL for secondary button
  backgroundImages?: BackgroundImage[]; // Array of background images
};

/**
 * Hero Section Component
 * 
 * Displays a full-screen hero section with rotating background images,
 * headline, description, and call-to-action buttons.
 */
function HeroSection({
  title,
  description,
  primaryButtonText = "Donate Now",
  primaryButtonLink = "/donate",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "/about",
  backgroundImages = [],
}: HeroSectionProps) {
  // Track the current background image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate through background images
  useEffect(() => {
    // Skip if there's only 0-1 images
    if (backgroundImages.length <= 1) return;

    // Set up interval to change image every 6 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Fallback gradient backgrounds if no images are provided
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
      {/* ===== BACKGROUND SECTION ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* If we have background images, show them with animation */}
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
              {/* Image container with darkening effect */}
              <div className="relative w-full h-full">
                <Image
                  src={backgroundImages[currentImageIndex].src}
                  alt={backgroundImages[currentImageIndex].alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  style={{ filter: "brightness(0.4)" }}
                />
                {/* Dark overlay to increase text contrast */}
                <div
                  className="absolute inset-0 z-10"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          // Fallback animated gradients if no images provided
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

      {/* ===== CONTENT SECTION ===== */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
        {/* Headline with animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          {title}
        </motion.h1>

        {/* Animated separator line */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-24 h-1 bg-green-500 mx-auto mb-8"
        ></motion.div>

        {/* Description with animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>

        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary button (green) */}
          {primaryButtonText && primaryButtonLink && (
            <Link
              href={primaryButtonLink}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium text-lg inline-block border border-green-600 transition-colors"
            >
              {primaryButtonText}
            </Link>
          )}

          {/* Secondary button (white) */}
          {secondaryButtonText && secondaryButtonLink && (
            <Link
              href={secondaryButtonLink}
              className="bg-white hover:bg-gray-100 text-green-700 px-8 py-3 rounded-xl font-medium text-lg border border-white inline-block transition-colors"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>

      {/* ===== IMAGE PROGRESS INDICATORS =====
       * These indicators show which image is currently displayed and
       * allow users to manually navigate between images.
       * Positioned at the very bottom of the screen.
       */}
      {backgroundImages.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 z-30">
          <div className="flex justify-center gap-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImageIndex === index
                    ? "bg-white w-6" // Current image indicator is wider
                    : "bg-white/50 hover:bg-white/80" // Inactive indicators are semi-transparent
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default HeroSection;
