"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import HeroSection from "@/components/hero";
import Image from "next/image";
import { FaBriefcase, FaHandshake } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";

export default function Home() {
  const [activeAmount, setActiveAmount] = useState<string | null>(null);

  const donationOptions = [
    { amount: "10", label: "$10" },
    { amount: "25", label: "$25" },
    { amount: "50", label: "$50" },
    { amount: "100", label: "$100" },
  ];

  const handleDonationSelect = (amount: string) => {
    setActiveAmount(amount);
    // In a real application, you might want to navigate to the donation page with the selected amount
    // or open a modal to complete the donation process
  };

  // Images for hero slider from images folder
  const heroImages = [
    { src: "/images/IMG_2479 2.jpg", alt: "Community gathering" },
    { src: "/images/IMG_9003 2.jpg", alt: "Community event" },
    { src: "/images/IMG_8967 2.jpg", alt: "Foundation activities" },
  ];

  // Random selection of images for gallery
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
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Supporting families Through Compassion"
        description="Mina Foundation is dedicated to providing support, resources, and community services to families in need."
        primaryButtonText="Donate Now"
        primaryButtonLink="/donate"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
        backgroundImages={heroImages}
      />

      {/* Donation Shortcuts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
              Make a difference today
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              Quick Donation
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Your contribution makes a real impact. Choose an amount below to
              quickly support our mission.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {donationOptions.map((option) => (
                <motion.button
                  key={option.amount}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDonationSelect(option.amount)}
                  className={`px-8 py-4 rounded-md text-lg font-medium transition-all border ${
                    activeAmount === option.amount
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-green-700 border-green-300 hover:border-green-500"
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Link
                href="/donate"
                className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
              >
                Proceed to Donate
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
              Our purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              At Mina Foundation, we strive to empower families through
              education, community support, and sustainable aid programs that
              promote dignity and self-reliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Education",
                icon: (
                  <FaGraduationCap className="text-4xl mx-auto text-green-600" />
                ),
                desc: "Providing access to quality education and resources for all ages.",
              },
              {
                title: "Community",
                icon: (
                  <FaHandshake className="text-4xl mx-auto text-green-600" />
                ),
                desc: "Building strong community connections and support networks for families.",
              },
              {
                title: "Economic Empowerment",
                icon: (
                  <FaBriefcase className="text-4xl mx-auto text-green-600" />
                ),
                desc: "Creating opportunities for financial independence and career development.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-green-50 p-8 rounded-lg border border-green-200 hover:border-green-300 transition-all text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers Section */}
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

      {/* Image Gallery Preview Section */}
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
              Witness the impact of our work through these moments captured at
              our events and programs.
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

      {/* Testimonials Section with Background Images */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
              Voices from our community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              Testimonials
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Hear from those whose lives have been touched by the work of Mina
              Foundation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "The Mina Foundation has been a blessing for my family during our difficult times. Their support helped us establish ourselves in a new community.",
                author: "Fatima K.",
                role: "Program Beneficiary",
                image: "/images/15.jpg",
              },
              {
                quote:
                  "Volunteering with Mina has been the most rewarding experience. Seeing the direct impact of our work on families is truly inspiring.",
                author: "Ahmed J.",
                role: "Volunteer",
                image: "/images/10.jpg",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg border border-gray-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src={testimonial.image}
                    alt="Testimonial background"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <div className="text-green-600 text-4xl mb-4">&quot;</div>
                  <p className="text-gray-700 mb-6 italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-green-800">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action with Background Image */}
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
    </main>
  );
}
