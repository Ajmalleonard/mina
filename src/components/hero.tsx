import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type BackgroundImage = {
  src: string;
  alt: string;
};

type HeroSectionProps = {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImages?: BackgroundImage[];
  accentColor?: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  primaryButtonText = "Donate Now",
  primaryButtonLink = "/donate",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "/about",
  backgroundImages = [],
  accentColor = "emerald",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Define color scheme based on accentColor prop
  const colorScheme = {
    primary: `bg-${accentColor}-600`,
    primaryHover: `hover:bg-${accentColor}-700`,
    primaryText: `text-${accentColor}-600`,
    light: `bg-${accentColor}-50`,
    accent: `bg-${accentColor}-500`,
    border: `border-${accentColor}-600`,
  };

  // Auto-rotate through background images
  useEffect(() => {
    if (backgroundImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change image every 8 seconds for better user experience

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Intersection observer to trigger animations when section comes into view
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={heroRef}
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900"
    >
      {/* Background gradient overlay base */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-900 via-gray-900/80 to-gray-900/60 z-10"></div>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full ${colorScheme.primary} opacity-20 blur-3xl`}
        ></div>
        <div
          className={`absolute top-1/4 -right-32 w-80 h-80 rounded-full ${colorScheme.primary} opacity-10 blur-3xl`}
        ></div>
        <div
          className={`absolute bottom-0 left-1/4 w-64 h-64 rounded-full ${colorScheme.primary} opacity-15 blur-3xl`}
        ></div>
      </div>

      {/* Background Images */}
      {backgroundImages.length > 0 && (
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === index ? "opacity-60" : "opacity-0"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-6xl w-full mx-auto px-6 py-24">
        <div
          className={`grid md:grid-cols-5 gap-12 items-center ${
            isInView ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        >
          {/* Text content - takes 3/5 on desktop */}
          <div className="md:col-span-3 space-y-8">
            {/* Subtle badge */}
            <div
              className={`inline-block ${
                colorScheme.light
              } px-4 py-1 rounded-md mb-2 ${
                colorScheme.primaryText
              } font-medium text-sm transition-all duration-300 transform ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Eco-friendly solutions
            </div>

            {/* Title with highlight effect */}
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-700 transform ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {title.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-3 mb-2">
                  {i % 3 === 1 ? (
                    <span className="relative">
                      {word}
                      <span
                        className={`absolute -bottom-2 left-0 w-full h-1 ${
                          colorScheme.accent
                        } transform origin-left ${
                          isInView ? "scale-x-100" : "scale-x-0"
                        } transition-transform duration-1000 delay-700`}
                      ></span>
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p
              className={`text-lg md:text-xl text-gray-300 max-w-2xl transition-all duration-700 transform ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              {description}
            </p>

            {/* Buttons */}
            <div
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 transform ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              {primaryButtonText && primaryButtonLink && (
                <Link
                  href={primaryButtonLink}
                  className={`
                relative overflow-hidden ${colorScheme.primary} ${colorScheme.primaryHover} text-white px-8 py-3 rounded-md font-medium text-lg inline-flex items-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
              `}
                >
                  {/* Button content with arrow */}
                  <span className="relative z-10 flex items-center">
                    {primaryButtonText}
                    <svg
                      className="w-3 h-3 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
              )}

              {secondaryButtonText && secondaryButtonLink && (
                <Link
                  href={secondaryButtonLink}
                  className="bg-transparent border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium text-lg inline-flex items-center transition-all duration-300 transform hover:-translate-y-1"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </div>

          {/* Visual element - takes 2/5 on desktop */}
          <div
            className={`md:col-span-2 relative transition-all duration-1000 transform ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="aspect-square relative">
              {/* Abstract decorative elements */}
              <div
                className={`absolute top-0 right-0 w-64 h-64 border ${colorScheme.border} rounded-full opacity-20`}
              ></div>
              <div
                className={`absolute bottom-12 left-12 w-48 h-48 border ${colorScheme.border} rounded-full opacity-30`}
              ></div>
              <div
                className={`absolute top-1/4 left-1/4 w-32 h-32 ${colorScheme.primary} rounded-full opacity-20 blur-lg`}
              ></div>

              {/* Central highlight circle */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 ${colorScheme.primary} rounded-full opacity-20 blur-xl animate-pulse`}
              ></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
          >
            <span className="text-white/70 text-sm mb-2">Discover More</span>
            <div className="w-8 h-12 rounded-full border border-white/30 flex items-start justify-center p-1">
              <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
