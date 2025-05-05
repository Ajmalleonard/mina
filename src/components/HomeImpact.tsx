"use client";
import React from "react";
import { motion } from "motion/react";

export default function HomeImpact() {
  return (
    <section className="py-16 bg-green-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-green-300 font-medium">
            Our reach
          </span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-6">
            Our Impact in Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2,500+", label: "Families Supported" },
            { value: "12", label: "Community Centers" },
            { value: "18,000+", label: "Volunteer Hours" },
            { value: "95%", label: "Donation Efficiency" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </span>
              <span className="text-green-300">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
