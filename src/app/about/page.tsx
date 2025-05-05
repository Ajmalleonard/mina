"use client";
import React from "react";
import { motion } from "motion/react";
import HeroSection from "@/components/hero";
import { team } from "@/constants/data";
import { HeartHandshake, Scale, Star } from "lucide-react";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mina Foundation's mission, values, and the team dedicated to serving our community.",
  keywords: "Mina Foundation, community support, nonprofit, foundation team",
  openGraph: {
    title: "About Us | Mina Foundation",
    description:
      "Learn about Mina Foundation's mission, values, and the team dedicated to serving our community.",
    images: "/opengraph-image.png",
  },
};


export default function About() {
  // Images for hero slider from images folder
  const heroImages = [
    { src: "/images/IMG_2525 2.jpg", alt: "Community gathering" },
    { src: "/images/IMG_2530 2.jpg", alt: "Foundation activities" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="About Mina Foundation"
        description="Our mission is to empower the community through education, support services, and sustainable programs."
        primaryButtonText="Get Involved"
        primaryButtonLink="/contact"
        secondaryButtonText="Donate"
        secondaryButtonLink="/donate"
        backgroundImages={heroImages}
      />

      {/* Our Story Section */}
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
                Mina Foundation was established in 2021 with a vision to create
                a supportive ecosystem for families. What started as a small
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
                continuously evolving to meet the changing needs of our
                community while staying true to our core values of compassion,
                integrity, and excellence.
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

      {/* Our Values */}
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
                  <item.Icon
                    className="mx-auto mb-4 text-green-600"
                    size={40}
                  />
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

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-green-800 mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">
              Meet the dedicated individuals who work tirelessly to fulfill our
              mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-green-50 rounded-lg overflow-hidden border border-green-200"
              >
                <div className="aspect-square bg-green-200 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-semibold">
                    {member.name.charAt(0)}
                    {member.name.split(" ")[1]?.charAt(0)}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-xl text-green-800">
                    {member.name}
                  </h3>
                  <p className="text-green-600 mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
    </main>
  );
}