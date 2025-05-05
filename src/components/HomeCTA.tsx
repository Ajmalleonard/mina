"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="py-20 relative text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/IMG_2512 2.jpg"
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
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Join Us in Making a Difference
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-green-100 max-w-3xl mx-auto mb-8"
        >
          Your support can help us reach more families and strengthen our
          community. Together, we can create lasting positive change.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/donate"
            className="px-8 py-4 bg-white text-green-800 hover:bg-green-100 rounded-md font-medium text-lg inline-block border border-white transition-all"
          >
            Donate Now
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-green-800 rounded-md font-medium text-lg inline-block transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
