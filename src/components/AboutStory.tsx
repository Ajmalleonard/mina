"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-green-500 mb-6"></div>
            <p className="text-gray-700 mb-6">
              Mina Foundation was established in 2021 with a vision to create a
              supportive ecosystem for families. What started as a small
              community initiative has grown into a comprehensive foundation
              serving over 20,000+ of families across the region.
            </p>
            <p className="text-gray-700 mb-6">
              Our founders recognized the unique challenges faced by the
              community and sought to build a platform that addresses these
              challenges while preserving cultural values and traditions.
            </p>
            <p className="text-gray-700">
              Today, Mina Foundation stands as a beacon of hope and support,
              continuously evolving to meet the changing needs of our community
              while staying true to our core values of compassion, integrity,
              and excellence.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/6.jpg"
                alt="Our foundation's journey"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 z-0 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/8.jpg"
                alt="Community support"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
