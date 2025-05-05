"use client";
import React, { useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function ImpactStories() {
  const impactRef = useRef(null);

  // Impact story images
  const impactImages = [
    {
      src: "/images/21.jpg",
      title: "Family Support Program",
      description:
        "Helping families in need with essential resources and support services.",
      stats: "500+ families helped",
    },
    {
      src: "/images/23.jpg",
      title: "Educational Initiatives",
      description: "Providing quality education and resources for all ages.",
      stats: "1,000+ students enrolled",
    },
    {
      src: "/images/26.jpg",
      title: "Community Development",
      description: "Building strong community connections and infrastructure.",
      stats: "12 community centers",
    },
  ];

  return (
    <motion.section
      ref={impactRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
            Your Impact
          </span>
          <h2 className="text-3xl font-bold text-green-800 mt-2 mb-4">
            Where Your Donations Go
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600">
            Your generosity helps us make a real difference in our community.
            Here are some of the programs your donation supports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactImages.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <div className="relative h-48">
                <Image
                  src={impact.src}
                  alt={impact.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  {impact.title}
                </h3>
                <p className="text-gray-600 mb-4">{impact.description}</p>
                <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {impact.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
