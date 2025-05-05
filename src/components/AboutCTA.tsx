"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function AboutCTA() {
  return (
    <section className="py-16 relative text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/25.jpg"
          alt="Call to action background"
          fill
          className="object-cover brightness-50"
        />
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mb-4"
        >
          Join Our Community
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-green-100 max-w-2xl mx-auto mb-8"
        >
          Be part of our mission to strengthen families and build resilient
          communities.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a
            href="/contact"
            className="px-8 py-4 bg-white text-green-800 hover:bg-green-100 rounded-md font-medium text-lg inline-block shadow-md hover:shadow-lg transition-all"
          >
            Contact Us Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
