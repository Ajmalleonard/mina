import CampaignLandingPage from "@/components/CampaignLandingPage";
import { Heart, Globe, Target, CheckCircle } from "lucide-react";

const config = {
  title: "Restoring Sight",
  description:
    "Thousands in Tanzania suffer from preventable blindness. Our medical camps provide free, life-changing cataract surgeries.",
  heroImage: "/assets/KATARAKT/JQ0G4907_1.JPG",
  heroAlt: "Cataract Surgery Patient After Procedure",
  category: "HEALTH",
  storyTitle: "Giving the Gift of Sight",
  story:
    "Cataracts are the leading cause of blindness in Tanzania, yet the condition is entirely treatable with a simple 20-minute surgery. For elderly individuals living in poverty, this surgery is simply out of reach. Our Cataract Relief program organizes medical camps across Tanzania, bringing together skilled ophthalmologists, nurses, and volunteers to perform free surgeries. Each $75 donation covers the entire cost of one surgery — including pre-operative screening, the procedure itself, and post-operative medications and follow-up. When an elderly person's sight is restored, they regain their independence. They can cook, walk, and care for themselves and their families again. The transformation is profound and immediate.",
  storyImage: "/assets/KATARAKT/JQ0G3807.jpg",
  storyImageAlt: "Medical team performing cataract surgery",
  impactStats: [
    {
      value: "500+",
      label: "Surgeries Performed",
      icon: <Heart className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "$75",
      label: "Per Surgery",
      icon: <Target className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "20 min",
      label: "Procedure Time",
      icon: <CheckCircle className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "10",
      label: "Districts Reached",
      icon: <Globe className="w-8 h-8 text-[#95E18A]" />,
    },
  ],
  ctaText: "Give the Gift of Sight",
  ctaLink: "/donate",
  secondaryCtaText: "View Campaigns",
  secondaryCtaLink: "/campaigns?category=HEALTH",
};

export default function KataraktPage() {
  return <CampaignLandingPage config={config} />;
}
