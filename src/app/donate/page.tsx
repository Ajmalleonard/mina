import HeroSection from "@/components/hero";
import DonateForm from "@/components/DonateForm";
import ImpactStories from "@/components/ImpactStories";
import DonateFAQ from "@/components/DonateFAQ";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Mina Foundation's mission. Your donation helps us create positive change in our community.",
  keywords:
    "donate, support Mina Foundation, charitable giving, make a difference",
  openGraph: {
    title: "Donate | Mina Foundation",
    description:
      "Support Mina Foundation's mission. Your donation helps us create positive change in our community.",
    images: "/opengraph-image.png",
  },
};

export default function DonatePage() {
  // Hero images
  const heroImages = [
    { src: "/images/IMG_9003 2.jpg", alt: "Supporting our community" },
    { src: "/images/IMG_8983 2.jpg", alt: "Making a difference together" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <HeroSection
        title="Support Our Mission"
        description="Your generous donations help us provide essential support to families in need."
        primaryButtonText="Donate Now"
        primaryButtonLink="#payment-section"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
        backgroundImages={heroImages}
      />

      {/* Client Components */}
      <DonateForm />
      <ImpactStories />
      <DonateFAQ />
    </div>
  );
}
