"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import OptimizedImage from "@/components/OptimizedImage";
import { CampaignCard, type Activity } from "@/components/CampaignCard";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle, Heart, Users, Globe, Target } from "lucide-react";

type CampaignConfig = {
  baseKey: string;
  heroImage: string;
  heroAlt: string;
  category: string;
  story: string;
  storyImage: string;
  storyImageAlt: string;
  impactStats: { value: string; icon: React.ReactNode }[];
  ctaLink: string;
  secondaryCtaLink?: string;
  translations: {
    title: string;
    lead: string;
    cta: string;
    storyTitle: string;
    labelPrefix: string;
    activitiesTitle: string;
    viewCampaigns: string;
    donate: string;
    contactTitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      subject: string;
      subjectPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      success: string;
    };
  };
};

type CampaignLandingPageProps = {
  config: CampaignConfig;
};

export default function CampaignLandingPage({ config }: CampaignLandingPageProps) {
  const { t, locale } = useI18n();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      setFetchError(false);
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.minafoundationtz.org";
      try {
        const res = await fetch(`${apiUrl}/activities`);
        if (res.ok) {
          const data: Activity[] = await res.json();
          const filtered = data.filter(
            (a) => a.category === config.category && a.isActive !== false
          );
          setActivities(filtered);
        } else {
          setFetchError(true);
        }
      } catch {
        setFetchError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, [config.category]);

  return (
    <main className="min-h-screen bg-[#FFFBF2] text-[#111111]">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-150 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={config.heroImage}
            alt={config.heroAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight drop-shadow-xl">
            {config.translations.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md font-light">
            {config.translations.lead}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={config.ctaLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#95E18A] text-[#111111] hover:bg-white rounded-full font-bold text-lg transition-colors"
            >
              {config.translations.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
            {config.secondaryCtaLink && (
              <Link
                href={config.secondaryCtaLink}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#111111] rounded-full font-bold text-lg transition-colors"
              >
                {config.translations.viewCampaigns}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {config.impactStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                  {config.translations.activitiesTitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[#95E18A] font-bold tracking-widest uppercase text-xs mb-4">
              {t('about.story.title')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] mb-6 uppercase tracking-tight">
              {config.translations.storyTitle}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {config.story}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={config.ctaLink}>
                <Button className="rounded-xl font-bold px-8 py-6 text-base bg-[#111111] text-white hover:bg-[#333]">
                  {config.translations.cta}
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button
                  variant="outline"
                  className="rounded-xl font-bold px-8 py-6 text-base border-2"
                >
                  {config.translations.viewCampaigns}
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
            <OptimizedImage
              src={config.storyImage}
              alt={config.storyImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[#95E18A] font-bold tracking-widest uppercase text-xs mb-4">
              {t('campaigns.core.title')}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] uppercase tracking-tight">
              {t(`${config.baseKey}.activitiesTitle`)}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="bg-[#f0f2f5] rounded-3xl flex flex-col h-full overflow-hidden animate-pulse"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-100" />
                  <div className="p-6 flex flex-col grow">
                    <div className="h-6 bg-gray-100 rounded-lg w-3/4 mb-4" />
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-gray-100 rounded w-full" />
                      <div className="h-4 bg-gray-100 rounded w-2/3" />
                    </div>
                    <div className="h-10 bg-gray-100 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : fetchError ? (
            <div className="text-center py-16 bg-[#f0f2f5] rounded-3xl">
              <p className="text-lg text-gray-600 mb-4">
                Unable to load campaigns. Please try again later.
              </p>
              <Button onClick={() => window.location.reload()} className="rounded-full px-8">
                Retry
              </Button>
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500 mb-4">
                No active campaigns in this category right now.
              </p>
              <Link href="/campaigns">
                <Button variant="outline" className="rounded-full px-8">
                  View All Campaigns
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <CampaignCard
                  key={activity.id}
                  activity={activity}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#111111] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Heart className="w-12 h-12 text-[#95E18A] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase mb-6">
            {config.translations.donate}
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            Your generosity creates lasting change. Every donation, no matter the size, brings hope to those who need it most.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={config.ctaLink}
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#95E18A] text-[#111111] hover:bg-white rounded-2xl font-bold text-lg transition-colors"
            >
              {t(`${config.baseKey}.donate`)}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-[#111111] rounded-2xl font-bold text-lg transition-colors"
            >
              {t('contact.hero.title')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
