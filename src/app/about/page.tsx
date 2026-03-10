"use client";
import React from "react";
import HeroSection from "@/components/hero";
import { team } from "@/constants/data";
import { HeartHandshake, Scale, Star } from "lucide-react";
import Image from "next/image";

export default function About() {
  // Images for hero slider from images folder
  const heroImages = [
    { src: "/images/IMG_2525 2.jpg", alt: "Community gathering" },
    { src: "/images/IMG_2530 2.jpg", alt: "Foundation activities" },
  ];

  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
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
            <div>
              <h2 className="text-3xl font-bold text-[#111111] mb-4">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-[#111111] mb-6"></div>
              <p className="text-gray-700 mb-6 font-medium">
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
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-sm overflow-hidden border border-black/5">
                <Image
                  src="/images/6.jpg"
                  alt="Our foundation's journey"
                  width={600}
                  height={400}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 z-0 rounded-sm overflow-hidden border border-black/5">
                <Image
                  src="/images/8.jpg"
                  alt="Community support"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#FFFBF2]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-[#111111] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">
              These principles guide everything we do and every decision we make
              as an organization.
            </p>
          </div>

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
              <div
                key={index}
                className="bg-white p-8 rounded-sm border border-black/5 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src={item.image}
                    alt={`${item.value} value`}
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div className="relative z-10">
                  <item.Icon
                    className="mx-auto mb-4 text-[#111111]"
                    size={40}
                  />
                  <h3 className="text-xl font-bold text-[#111111] mb-3">
                    {item.value}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-[#111111] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">
              Meet the dedicated individuals who work tirelessly to fulfill our
              mission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-[#FFFBF2] rounded-sm overflow-hidden border border-black/5"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center border-b border-black/5">
                  <div className="w-24 h-24 rounded-full bg-[#111111] flex items-center justify-center text-white text-3xl font-semibold">
                    {member.name.charAt(0)}
                    {member.name.split(" ")[1]?.charAt(0)}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-[#111111]">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 mt-1 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/25.jpg"
            alt="Call to action background"
            fill
            className="object-cover brightness-50 grayscale"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 font-light">
            Be part of our mission to strengthen families and build resilient
            communities.
          </p>
          <div>
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-[#111111] hover:bg-gray-100 rounded-full font-bold text-lg inline-block transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}