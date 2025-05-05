"use client";
import React from "react";
import { motion } from "motion/react";
import { HeartHandshake, Scale, Star } from "lucide-react";
import Image from "next/image";

export default function AboutValues() {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Our Core Values
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            These principles guide everything we do and every decision we make
            as an organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              value: "Integrity",
              Icon: Scale,
              desc: "We uphold the highest ethical standards and transparency in all our operations.",
              image: "/images/13.jpg",
            },
            {
              value: "Compassion",
              Icon: HeartHandshake,
              desc: "We approach our work with empathy and genuine care for those we serve.",
              image: "/images/18.jpg",
            },
            {
              value: "Excellence",
              Icon: Star,
              desc: "We strive for quality and continuous improvement in all our programs and services.",
              image: "/images/20.jpg",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg border border-green-200 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <Image
                  src={item.image}
                  alt={`${item.value} value`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative z-10">
                <item.Icon className="mx-auto mb-4 text-green-600" size={40} />
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  {item.value}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
