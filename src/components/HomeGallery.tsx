"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function HomeGallery() {
  // Gallery images data
  const galleryImages = [
    {
      src: "/images/2.jpg",
      alt: "Mina Foundation event",
      title: "Community Event",
      description: "Members of our community gathering to support one another.",
    },
    {
      src: "/images/5.jpg",
      alt: "Foundation activities",
      title: "Outreach Program",
      description:
        "Our outreach program bringing joy and education to the community.",
    },
    {
      src: "/images/7.jpg",
      alt: "Community support",
      title: "Support Services",
      description: "Providing essential support to families in need.",
    },
    {
      src: "/images/12.jpg",
      alt: "Educational activities",
      title: "Education Initiative",
      description:
        "Fostering education and knowledge sharing within our community.",
    },
    {
      src: "/images/17.jpg",
      alt: "Community gathering",
      title: "Community Gathering",
      description:
        "Building connections and strengthening our community bonds.",
    },
    {
      src: "/images/24.jpg",
      alt: "Foundation event",
      title: "Special Event",
      description:
        "A memorable moment during one of our foundation's special events.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
            See our work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            Our Gallery
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Witness the impact of our work through these moments captured at our
            events and programs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.slice(0, 6).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="overflow-hidden rounded-lg border border-green-200 transition-all"
            >
              <div className="aspect-[4/3] flex items-center justify-center">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-medium text-lg text-green-800">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-block px-6 py-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-md font-medium transition-colors border border-green-200"
          >
            View Full Gallery →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
