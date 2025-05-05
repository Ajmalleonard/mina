import HeroSection from "@/components/hero";
import HomeDonationShortcuts from "@/components/HomeDonationShortcuts";
import HomeMission from "@/components/HomeMission";
import HomeImpact from "@/components/HomeImpact";
import HomeGallery from "@/components/HomeGallery";
import HomeTestimonials from "@/components/HomeTestimonials";
import HomeCTA from "@/components/HomeCTA";

export default function Home() {
  // Images for hero slider from images folder
  const heroImages = [
    { src: "/images/IMG_2479 2.jpg", alt: "Community gathering" },
    { src: "/images/IMG_9003 2.jpg", alt: "Community event" },
    { src: "/images/IMG_8967 2.jpg", alt: "Foundation activities" },
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

      {/* Client Components */}
      <HomeDonationShortcuts />
      <HomeMission />
      <HomeImpact />
      <HomeGallery />
      <HomeTestimonials />
      <HomeCTA />
    </main>
  );
}
