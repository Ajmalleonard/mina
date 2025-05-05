"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function ContactHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-20"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/4.jpg"
          alt="Contact page hero background"
          fill
          className="object-cover brightness-[0.85]"
        />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-green-600/40 to-green-800/50"
        ></motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Contact Us
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
          We&apos;d love to hear from you. Reach out with questions, feedback,
          or to learn more about our work.
        </motion.p>
      </div>
    </motion.section>
  );
}
