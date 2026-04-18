
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HeroSection from "@/components/hero";
import CheckoutOverlay from "@/components/CheckoutOverlay";
import { ArrowRight, Activity as ActivityIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { DonationCard } from "@/components/DonationCard";
import ImpactMapSection from "@/components/ImpactMapSection";
import OptimizedImage from "@/components/OptimizedImage";

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  goalAmount?: number;
  raisedAmount: number;
  slug: string;
}


export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [amounts, setAmounts] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch dynamic activities from Neon DB via NestJS API
    const fetchActivities = async () => {
      setIsLoading(true);
      setFetchError(false);
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.minafoundationtz.org";
      try {
        const res = await fetch(`${apiUrl}/activities`);
        if (res.ok) {
          const data: Activity[] = await res.json();
          setActivities(data);

          // Initialize default donation amounts to 5 for all fetched activities
          const initialAmounts: { [key: string]: number } = {};
          data.forEach((act) => {
            initialAmounts[act.id] = 5;
          });
          setAmounts(initialAmounts);
        } else {
          setFetchError(true);
        }
      } catch (err) {
        console.error("Failed to load activities", err);
        setFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const updateAmount = (id: string, delta: number) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 5) + delta),
    }));
  };

  const setExactAmount = (id: string, value: number) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: Math.max(1, value),
    }));
  };

  // For the homepage, we feature the first 3 activities to fit the 3-column grid
  const featuredActivities = activities.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
      <HeroSection
        title="Your Empathy Transforms Lives"
        description="Empowering communities by transforming lives and fostering sustainable change through compassionate giving across Tanzania."
      />
      {/* Our Activities Section */}
      <section className="py-24 bg-[#FFFBF2] border-b border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Campaigns</h2>
              <p className="text-lg text-gray-700 max-w-2xl">
                Immediate relief and long-term empowerment initiatives making a tangible difference across Tanzania.
              </p>
            </div>
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 bg-[#111111] text-white px-8 py-4 font-bold text-sm tracking-wide rounded-full hover:bg-black/80 transition-colors"
            >
              View All Campaigns
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl flex flex-col h-full overflow-hidden animate-pulse border border-black/5"
                >
                  <div className="w-full aspect-square relative bg-gray-50"></div>
                  <div className="p-8 flex flex-col justify-center gap-4">
                    <div className="h-6 bg-gray-50 rounded-lg w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-50 rounded w-full"></div>
                      <div className="h-3 bg-gray-50 rounded w-5/6"></div>
                    </div>
                    <div className="h-12 bg-gray-50 rounded-2xl w-full mt-4"></div>
                  </div>
                </div>
              ))
            ) : fetchError ? (
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-black/5">
                <p className="text-lg text-gray-600 mb-4">
                  Unable to load activities. Please try again later.
                </p>
                <Button onClick={() => window.location.reload()} variant="primary" className="rounded-full px-8">
                  Retry
                </Button>
              </div>
            ) : (
              featuredActivities.map((activity) => (
                <DonationCard
                  key={activity.id}
                  activity={activity}
                  amount={amounts[activity.id] || 5}
                  onUpdateAmount={updateAmount}
                  onSetExactAmount={setExactAmount}
                  onDonate={addToCart}
                />
              ))
            )}
          </div>
        </div>
      </section>
      {/* Impact Text Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-[#111111]">
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wide inline-block">
              Our Positive Impact
            </h3>
            <div className="space-y-1">
              <p className="text-xs font-medium opacity-60">
                Across Tanzania
              </p>
              <p className="text-xs font-medium">
                Core Values Guiding <br /> Our National Mission
              </p>
            </div>
          </div>

          <div className="md:col-span-8">
            <p className="text-2xl md:text-3xl font-medium leading-tight mb-8">
              Over 80,000 lives have been touched by our charity's work. We
              focus on empowering individuals, improving communities, and
              fostering sustainable development across Tanzania. Through
              targeted initiatives, we have enabled access to education,
              healthcare, and economic opportunities.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Spreading Hope",
                "Inspiring Action",
                "Building Futures",
                "Fostering Unity",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-6 py-2 rounded-full   bg-white text-sm font-medium hover:bg-[#111111] hover:text-white cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Achievements Section */}
      <section className="py-16 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-10 bg-white/5 rounded-3xl">
              <h3 className="text-5xl font-bold mb-4 text-[#95E18A]">15</h3>
              <p className="text-xl font-medium uppercase tracking-wide">
                Masjids Across Nation
              </p>
              <p className="text-sm mt-3 text-white/70">
                Built to serve rural communities as spiritual and educational
                centers.
              </p>
            </div>
            <div className="p-10 bg-white/5 rounded-3xl">
              <h3 className="text-5xl font-bold mb-4 text-[#95E18A]">2,348</h3>
              <p className="text-xl font-medium uppercase tracking-wide">
                Cataract Surgeries
              </p>
              <p className="text-sm mt-3 text-white/70">
                Successfully performed, restoring sight to the elderly and
                vulnerable.
              </p>
            </div>
            <div className="p-10 bg-white/5 rounded-3xl">
              <h3 className="text-5xl font-bold mb-4 text-[#95E18A]">500+</h3>
              <p className="text-xl font-medium uppercase tracking-wide">
                Orphans Sponsored
              </p>
              <p className="text-sm mt-3 text-white/70">
                Receiving comprehensive care, education, and family support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Campaigns: Ramadan, Zakat, Eid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Core Islamic Campaigns</h2>
          <p className="text-lg text-gray-700 max-w-2xl">
            Fulfilling specific community obligations and spreading joy during
            holy months in Tanzania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ramadan Card */}
          <div className="bg-white p-10 rounded-3xl flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4">Ramadan Relief</h3>
            <p className="text-sm text-gray-700 mb-8 min-h-15 flex-1">
              Providing Suhoor and Iftar food packages to impoverished families
              throughout the holy month of Ramadan.
            </p>
            <Link
              href="/ramadan"
              className="inline-block py-4 px-8 bg-[#111111] text-white text-center font-bold text-sm rounded-2xl"
            >
              Support Ramadan
            </Link>
          </div>

          {/* Zakat Card */}
          <div className="bg-[#95E18A] p-10 rounded-3xl flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4">Zakat Distribution</h3>
            <p className="text-sm text-[#111111] mb-8 font-medium min-h-15 flex-1">
              Purify your wealth. We ensure your Zakat reaches the most eligible
              families strictly under Islamic guidelines.
            </p>
            <Link
              href="/zakat"
              className="inline-block py-4 px-8 bg-[#111111] text-white text-center font-bold text-sm rounded-2xl"
            >
              Pay Zakat
            </Link>
          </div>

          {/* Eid Clothing Card */}
          <div className="bg-white p-10 rounded-3xl flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-4">Eid Clothing</h3>
            <p className="text-sm text-gray-700 mb-8 min-h-15 flex-1">
              Gift a child the joy of Eid with brand new clothes. Ensure they
              feel valued and celebrated.
            </p>
            <Link
              href="/eid"
              className="inline-block py-4 px-8 bg-[#111111] text-white text-center font-bold text-sm rounded-2xl"
            >
              Donate Clothes
            </Link>
          </div>
        </div>
      </section>

      {/* Masjid Construction Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-[#111111]">Masjid Construction</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Building a Masjid is an ongoing charity (Sadaqah Jariyah). Across
                rural Tanzania, many communities lack a proper place for worship,
                education, and gathering. Our construction projects aim to provide
                structurally sound, large-capacity Mosques that serve as the heart
                of the community.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Providing safe spiritual centers.",
                "Serving as educational hubs for children.",
                "Building with durable, modern materials.",
              ].map((text) => (
                <li key={text} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-[#95E18A] flex items-center justify-center text-[#111111] font-bold text-xs">
                    ✓
                  </span>
                  <span className="font-medium text-gray-800">{text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/masjid"
              className="inline-flex items-center gap-3 bg-[#111111] text-white px-10 py-5 font-bold text-sm tracking-widest uppercase rounded-2xl hover:bg-[#333333] transition-colors"
            >
              Fund a Masjid
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-4/5 relative rounded-3xl overflow-hidden">
              <OptimizedImage
                src="/assets/MASJID/DJI_20250902124328_0005_D.JPG"
                alt="Masjid Construction"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <div className="grid grid-rows-2 gap-6">
              <div className="relative rounded-3xl overflow-hidden">
                <OptimizedImage
                  src="/assets/MASJID/IMG_4157.JPG"
                  alt="Masjid Workers"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="relative rounded-3xl overflow-hidden">
                <OptimizedImage
                  src="/assets/MASJID/DJI_20241221122624_0083_D.JPG"
                  alt="Masjid Drone View"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cataract Surgeries (Katarakt) Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-6 order-2 md:order-1">
            <div className="grid grid-rows-2 gap-6">
              <div className="relative rounded-3xl overflow-hidden">
                <OptimizedImage
                  src="/assets/KATARAKT/JQ0G3807.jpg"
                  alt="Medical Exam"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="relative rounded-3xl overflow-hidden">
                <OptimizedImage
                  src="/assets/KATARAKT/JQ0G3753_1.JPG"
                  alt="Elderly Patient"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
            <div className="aspect-4/5 relative rounded-3xl overflow-hidden">
              <OptimizedImage
                src="/assets/KATARAKT/JQ0G4907_1.JPG"
                alt="Restored Sight"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-8">
            <h2 className="text-5xl font-bold text-[#111111] leading-tight">
              Restoring Sight: <br /> Cataract Relief
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Thousands in Tanzania suffer from preventable blindness due to
              cataracts. For many elderly individuals, this means a loss of
              independence and severe hardship. Our medical camps provide free,
              life-changing cataract surgeries that restore sight in under 30
              minutes.
            </p>
            <div className="bg-[#e6f7e4] p-8 rounded-3xl space-y-3">
              <h4 className="font-bold text-xl text-[#2D5A27]">Impact per $75</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Funds an entire surgery, including pre-operative screening, the
                procedure itself, and post-operative medications.
              </p>
            </div>
            <Link
              href="/katarakt"
              className="inline-flex items-center gap-3 bg-[#111111] text-white px-10 py-5 font-bold text-sm tracking-widest uppercase rounded-2xl hover:bg-[#333333] transition-colors"
            >
              Give the Gift of Sight
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Standard Donation Cards Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#111111]">Urgent General Appeals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-10 bg-white rounded-4xl flex flex-col h-full">
              <div className="w-14 h-14 bg-[#95E18A]/20 rounded-2xl mb-8 flex items-center justify-center text-[#2D5A27]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-[#111111] leading-tight flex-1">
                Empower Vulnerable Youth Through Education
              </h3>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase mb-3 text-[#111111]">
                  <span>Fund Raised</span>
                  <span className="text-[#95E18A]">76%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full bg-[#95E18A] rounded-full"
                    style={{ width: "76%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] mb-8">
                  <span>$75,000</span>
                  <span className="opacity-40">$100,000</span>
                </div>

                <Link
                  href="/donate"
                  className="block w-full py-5 bg-[#111111] text-white text-center font-bold text-sm rounded-2xl hover:bg-[#333333] transition-colors"
                >
                  Donate Now
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-10 bg-[#F5A623] rounded-4xl flex flex-col h-full">
              <div className="w-14 h-14 bg-black/10 rounded-2xl mb-8 flex items-center justify-center text-[#111111]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 12.5l5 5L20 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-[#111111] leading-tight flex-1">
                Support Local Families in Crisis Today
              </h3>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase mb-3 text-[#111111]">
                  <span>Fund Raised</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-3 bg-black/10 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full bg-[#111111] rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] mb-8">
                  <span>$45,000</span>
                  <span className="opacity-40">$100,000</span>
                </div>

                <Link
                  href="/donate"
                  className="block w-full py-5 bg-[#111111] text-white text-center font-bold text-sm rounded-2xl hover:bg-black/80 transition-colors"
                >
                  Donate Now
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-10 bg-white rounded-4xl flex flex-col h-full">
              <div className="w-14 h-14 bg-[#95E18A]/20 rounded-2xl mb-8 flex items-center justify-center text-[#2D5A27]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0118 0v6M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 21v-2a2 2 0 10-4 0v2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-[#111111] leading-tight flex-1">
                Provide Nutritious Meals to Hungry Children
              </h3>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase mb-3 text-[#111111]">
                  <span>Fund Raised</span>
                  <span className="text-[#95E18A]">63%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full bg-[#95E18A] rounded-full"
                    style={{ width: "63%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] mb-8">
                  <span>$63,000</span>
                  <span className="opacity-40">$100,000</span>
                </div>

                <Link
                  href="/donate"
                  className="block w-full py-5 bg-[#111111] text-white text-center font-bold text-sm rounded-2xl hover:bg-[#333333] transition-colors"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-20">
            <Link
              href="/donate"
              className="inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] group"
            >
              <span className="border-b-2 border-[#111111] pb-1 group-hover:opacity-60 transition-opacity">Join the Movement, and Change a Life</span>
              <span className="bg-[#111111] text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Map Section */}
      <ImpactMapSection />
    </main>
  );
}
