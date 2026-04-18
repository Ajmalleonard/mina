"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

import { Megaphone, AlertCircle, Moon, Gift, Soup, Baby, Users, Droplets, HandCoins, GraduationCap, Eye, MapPin, Coins, HandHeart, Hammer } from "lucide-react";

import { CampaignCard, type Activity } from "@/components/CampaignCard";
import Sidebar from "@components/Sidebar";

const CATEGORIES = [
  { id: "PROMOTIONS", label: "PROMOTIONS", icon: Megaphone },
  { id: "EMERGENCY_AID", label: "EMERGENCY AID", icon: AlertCircle },
  { id: "RAMADAN_CAMPAIGN", label: "RAMADAN CAMPAIGN", icon: Moon },
  { id: "NAFL_OFFERING", label: "NAFL OFFERING", icon: Gift },
  { id: "MINA_MEAL", label: "MINA's MEAL", icon: Soup },
  { id: "ORPHAN", label: "ORPHAN", icon: Baby },
  { id: "WE_ARE_TOGETHER_WITH_OUR_ORPHANS", label: "WE ARE TOGETHER WITH OUR ORPHANS", icon: Users },
  { id: "WATER_WELL_PROJECT", label: "WATER WELL PROJECT", icon: Droplets },
  { id: "ZAKAT_AND_SADAKA", label: "ZAKAT AND SADAKA", icon: HandCoins },
  { id: "EDUCATION_AID", label: "EDUCATION AID", icon: GraduationCap },
  { id: "HEALTH", label: "HEALTH", icon: Eye },
  { id: "TURKEY_AIDS", label: "TANZANIA AIDS", icon: MapPin },
  { id: "INCOME_SUPPORT", label: "INCOME SUPPORT", icon: Coins },
  { id: "GENERAL_HELPS", label: "GENERAL HELPS", icon: HandHeart },
  { id: "CONSTRUCTION_PROJECTS", label: "CONSTRUCTION PROJECTS", icon: Hammer },
];

export default function CampaignsPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      if (categoryParam) {
        setActiveCategory(categoryParam);
      }
    }
  }, []);

  const filteredActivities = activeCategory === "ALL" 
    ? activities 
    : activities.filter(a => a.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#f0f2f5]  text-[#111111]">
     


      <section className="py-16 bg-[#f8f9fa] relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar */}
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={CATEGORIES} />

            {/* Activities Grid */}
            <div className="flex-1 w-full">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl flex flex-col h-full overflow-hidden animate-pulse"
                    >
                      <div className="aspect-video relative overflow-hidden bg-gray-50"></div>
                      <div className="p-6 flex flex-col grow">
                        <div className="h-8 bg-gray-50 rounded-lg w-3/4 mb-4"></div>
                        <div className="space-y-3 mb-8 grow">
                          <div className="h-4 bg-gray-50 rounded w-full"></div>
                          <div className="h-4 bg-gray-50 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : fetchError ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-black/5">
                  <p className="text-lg text-gray-600 mb-4">
                    Unable to load activities. Please try again later.
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="primary"
                    className="rounded-full px-8"
                  >
                    Retry
                  </Button>
                </div>
              ) : filteredActivities.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border border-black/5">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No projects found</h3>
                  <p className="text-gray-500">
                    There are currently no active projects in this category.
                  </p>
                  <Button
                    onClick={() => setActiveCategory("ALL")}
                    variant="outline"
                    className="mt-6 rounded-full"
                  >
                    View All Projects
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredActivities.map((activity) => (
                    <CampaignCard
                      key={activity.id}
                      activity={activity}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
