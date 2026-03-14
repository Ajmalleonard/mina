import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

type HeroSectionProps = {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
    backgroundImages?: { src: string; alt: string }[];
  accentColor?: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  primaryButtonText = "Donate Now",
    primaryButtonLink = "/donate",
}) => {
  return (
    <div className="w-full bg-[#FFFBF2] pt-24 pb-0 relative overflow-hidden">
      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        {/* Top Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 text-[#111111]">
            Mina Foundation
          </h2>
          {/* The Reference uses a mix of fonts, we'll use structure to mimic the layout */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#111111] leading-[0.9] tracking-tight mb-8">
            Your Empathy <br />
            <span className="font-serif italic font-light">
              Transforms
            </span>{" "}
            Lives
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Empowering communities by transforming lives and fostering
            sustainable changes through compassionate giving across Tanzania.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              href={primaryButtonLink}
              size="lg"
              className="px-8 py-6 rounded-xl font-medium text-lg flex items-center gap-2 h-auto"
            >
              Join the Movement
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.75 6.75L19.25 12L13.75 17.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12H4.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Green Stats Section matching the image */}
        <div className="w-full bg-[#95E18A] rounded-xl p-0 grid grid-cols-1 md:grid-cols-12 min-h-62.5 relative overflow-hidden">
          {/* Left: Big Stat */}
          <div className="md:col-span-5 p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#111111]/10">
            <h3 className="text-6xl font-bold text-[#111111] mb-2">80,000+</h3>
            <p className="text-[#111111] font-medium text-lg leading-tight mb-6">
              People Reached in Tanzania, <br /> and We're Just Getting Started
            </p>
            <Link
              href="/about"
              className="text-[#111111] text-sm font-bold underline decoration-2 underline-offset-4 hover:opacity-80"
            >
              Learn More
            </Link>
          </div>

          {/* Middle: Goal */}
          <div className="md:col-span-3 p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#111111]/10 bg-[#8ce68c]">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">✻</span>
              <span className="font-bold text-sm uppercase tracking-wider">
                Our Next Goal
              </span>
            </div>
            <ul className="space-y-3 text-sm font-medium text-[#111111]">
              <li className="flex justify-between w-full opacity-80">
                <span>Raise</span>
                <span>$250,000</span>
              </li>
              <li className="flex justify-between w-full opacity-80">
                <span>Distribute</span>
                <span>10,000 Meals</span>
              </li>
              <li className="flex justify-between w-full opacity-80">
                <span>Award</span>
                <span>200 Scholarships</span>
              </li>
            </ul>
          </div>

          {/* Right: Testimonial/Image */}
          <div className="md:col-span-4 p-8 flex items-center relative overflow-hidden bg-white/10">
            <div className="flex gap-4 items-start relative z-10">
              <div className="w-20 h-20 bg-gray-200 shrink-0 overflow-hidden relative grayscale rounded-xl shadow-md">
                <Image
                  src="/images/21.jpg" // Placeholder until dynamic
                  alt="Child"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium leading-relaxed mb-3">
                  "Supporting this charity has been life-changing. I've seen
                  firsthand the positive impact it has on communities in need.
                  Truly inspiring!"
                </p>
                <p className="text-xs font-bold">— Robin Steve</p>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Strip */}
        <div className="mt-12 pt-8 border-t border-[#111111] flex justify-between items-center text-gray-500 text-sm grayscale opacity-80">
          <span className="font-medium text-[#111111]">
            Our Partners & Supporters
          </span>
          <div className="flex gap-8 text-[#111111]">
            <span className="font-bold text-lg">CHealth</span>
            <span className="font-bold text-lg">American Red Cross</span>
            <span className="font-bold text-lg">unicef</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
