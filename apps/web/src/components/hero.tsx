"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

type HeroSectionProps = {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
};

const SLIDES = [
  { id: 1, image: "/assets/FOOD_PACKAGES/IMG_0101.jpg", title: "Providing Essential Food Packages", description: "Delivering vital nutrition to families who need it most, ensuring no one goes to bed hungry.", category: "Food Packages", slug: "food-package-ramadan" },
  { id: 2, image: "/assets/FOOD_PACKAGES/IMG_0248.JPG", title: "Nourishing Families in Need", description: "Providing sustainable food security and restoring dignity for vulnerable communities.", category: "Food Packages", slug: "wefa-dinner-group" },
  { id: 3, image: "/assets/FOOD_PACKAGES/IMG_6955.JPG", title: "Together Against Hunger", description: "Every contribution helps us reach more tables. Stand with us to fight starvation.", category: "Food Packages", slug: "iftar-donation" },
  { id: 4, image: "/assets/KATARAKT/JQ0G3807.jpg", title: "Restoring Vision, Restoring Hope", description: "Giving the gift of sight through life-changing cataract surgeries for the elderly.", category: "Healthcare", slug: "cataract-surgery" },
  { id: 5, image: "/assets/KATARAKT/JQ0G4644_1.JPG", title: "Bringing Light to Those in Darkness", description: "Empowering individuals to regain their independence by curing preventable blindness.", category: "Healthcare", slug: "cataract-surgery" },
  { id: 6, image: "/assets/MASJID/IMG_4157.JPG", title: "Building Places of Worship", description: "Constructing strong, enduring mosques that serve as the spiritual heart of the community.", category: "Community", slug: "masjid-construction-zanzibar" },
  { id: 7, image: "/assets/MASJID/IMG_4293.JPG", title: "Creating Safe Community Spaces", description: "Providing centers for gathering, education, and strengthening the bonds of brotherhood.", category: "Community", slug: "masjid-construction-zanzibar" },
  { id: 8, image: "/assets/MASJID/DJI_20250902124357_0008_D.JPG", title: "Uniting Communities Through Faith", description: "Establishing lasting structures that will benefit generations to come in rural areas.", category: "Community", slug: "masjid-construction-zanzibar" },
  { id: 9, image: "/assets/QUR_DISTRIBUTION/IMG_4076.JPG", title: "Spreading the Word of Faith", description: "Distributing the Holy Quran to students and families, illuminating hearts with guidance.", category: "Education", slug: "student-scholarship" },
  { id: 10, image: "/assets/QUR_DISTRIBUTION/IMG_4340.JPG", title: "Distributing Qurans to the Faithful", description: "Ensuring access to religious texts for all, nurturing spiritual growth across generations.", category: "Education", slug: "student-scholarship" },
];

const HeroSection: React.FC<HeroSectionProps> = ({
  primaryButtonText = "Donate Now",
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [donationAmount, setDonationAmount] = useState<string>("100");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [activities, setActivities] = useState<any[]>([]);

  // Fetch campaigns from database to link slides
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.minafoundationtz.org";
        const res = await fetch(`${apiUrl}/activities`);
        if (res.ok) {
          const data = await res.json();
          setActivities(data);
        }
      } catch (err) {
        console.error("Failed to load activities for hero", err);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 30000); // 30 seconds
    return () => clearInterval(timer);
  }, []);

  const handleAmountClick = (amount: string) => {
    setDonationAmount(amount);
    if (amount !== "custom") {
      setCustomAmount("");
    }
  };

  const handleDonate = () => {
    const amountToDonate = donationAmount === "custom" ? customAmount : donationAmount;
    const parsedAmount = parseInt(amountToDonate) || 10;
    
    // Find matching campaign from DB using the slide's slug
    const currentSlideData = SLIDES[currentSlide];
    const activity = activities.find((a) => a.slug === currentSlideData.slug);

    if (activity) {
      // It's a real DB activity with a proper UUID/CUID, we can safely checkout
      addToCart(activity, parsedAmount);
      router.push("/checkout");
    } else {
      // DB hasn't loaded or campaign isn't matched; optionally you can show an alert here.
      alert("Loading campaign details, please wait a moment...");
    }
  };

  const currentDisplayAmount = donationAmount === "custom" ? customAmount : donationAmount;

  return (
    <div className="relative w-full h-[95vh] min-h-[850px] overflow-hidden bg-black flex items-center justify-center">
      {SLIDES.map((slide, index) => {
        // Merge local image with real database content if available
        const dbActivity = activities.find(a => a.slug === slide.slug);
        const displayTitle = dbActivity ? dbActivity.title : slide.title;
        const displayDescription = dbActivity ? dbActivity.description : slide.description;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={displayTitle}
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent mix-blend-multiply" />
            </div>

            {/* Slide Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 sm:px-16 lg:px-24 pb-48">
              <span className="text-[#95E18A] font-bold tracking-widest uppercase text-sm mb-4 drop-shadow-md">
                {slide.category}
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-2xl font-extrabold text-white mb-6 drop-shadow-xl max-w-5xl leading-tight tracking-tight">
                {displayTitle}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl drop-shadow-md font-light">
                {displayDescription}
              </p>

            </div>
          </div>
        );
      })}

      {/* Floating Donation Card */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-5xl bg-[#F5A623] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center gap-8">
        {/* Left text */}
        <div className="w-full md:w-1/3 text-[#111111]">
          <h2 className="text-2xl font-bold uppercase mb-2">Make a Donation</h2>
          <p className="text-sm font-medium opacity-80 leading-relaxed">
            Your generous contribution to our campaigns ensures direct impact for those who need it most.
          </p>
        </div>

        {/* Right controls */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {/* Amount selectors */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {["10", "25", "50", "100", "250"].map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`flex-1 sm:flex-none min-w-[60px] px-4 py-2 text-sm font-bold transition-colors rounded-full border ${donationAmount === amount
                  ? "bg-white text-[#F5A623] border-white"
                  : "bg-transparent text-white border-white/40 hover:border-white/80 hover:bg-white/10"
                  }`}
              >
                ${amount}
              </button>
            ))}
            <button
              onClick={() => handleAmountClick("custom")}
              className={`flex-1 sm:flex-none min-w-[120px] px-4 py-2 text-sm font-bold transition-colors rounded-full border ${donationAmount === "custom"
                ? "bg-white text-[#F5A623] border-white"
                : "bg-transparent text-white border-white/40 hover:border-white/80 hover:bg-white/10"
                }`}
            >
              Custom Amount
            </button>
          </div>

          {/* Input & Submit Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <div className="relative w-full sm:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#111111] font-bold">
                <span className="bg-[#111111] text-[#F5A623] rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">$</span>
              </div>
              <input
                type="number"
                value={currentDisplayAmount}
                onChange={(e) => {
                  setDonationAmount("custom");
                  setCustomAmount(e.target.value);
                }}
                className="w-full pl-12 pr-4 py-3 bg-transparent border-2 border-[#111111] rounded-full text-[#111111] font-bold text-lg focus:outline-none focus:bg-white/10 transition-colors"
                placeholder={donationAmount === "custom" ? "Enter amount" : currentDisplayAmount}
              />
            </div>
            <button
              onClick={handleDonate}
              className="w-full sm:w-1/2 flex items-center justify-center bg-[#111111] hover:bg-black text-white font-bold uppercase tracking-wider py-4 px-6 rounded-full transition-colors shadow-lg"
            >
              {primaryButtonText}
            </button>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-3">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-500 ease-in-out rounded-full shadow-lg ${currentSlide === index
              ? "w-10 h-2 bg-[#95E18A]"
              : "w-2 h-2 bg-white/50 hover:bg-white"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
