import HeroSection from "@/components/hero";
import AboutStory from "@/components/AboutStory";
import AboutValues from "@/components/AboutValues";
import AboutTeam from "@/components/AboutTeam";
import AboutCTA from "@/components/AboutCTA";

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

      {/* Client Components */}
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutCTA />
    </main>
  );
}
