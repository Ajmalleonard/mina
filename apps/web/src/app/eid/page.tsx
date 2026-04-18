import CampaignLandingPage from "@/components/CampaignLandingPage";
import { Heart, Users, Globe, Target } from "lucide-react";

const config = {
  title: "Eid Clothing Appeal",
  description:
    "Gift a child the joy of Eid with brand new clothes. Ensure they feel valued and celebrated.",
  heroImage: "/assets/EID/eid-clothing-hero.jpg",
  heroAlt: "Children in New Eid Clothes",
  category: "WE_ARE_TOGETHER_WITH_OUR_ORPHANS",
  storyTitle: "Every Child Deserves to Celebrate",
  story:
    "For children growing up in poverty, Eid is often just another day — without new clothes, without the excitement that other children experience. Our Eid Clothing Appeal changes that. Each year, we source and distribute brand new clothing sets to orphaned and vulnerable children across Tanzania, ensuring they can join in the celebrations with pride and joy. Beyond the clothes, this program restores a sense of belonging and dignity. When a child puts on new clothes for Eid, they're reminded that someone cares about their happiness.",
  storyImage: "/assets/EID/eid-clothing-distribution.jpg",
  storyImageAlt: "Children receiving Eid clothing packages",
  impactStats: [
    {
      value: "1,500+",
      label: "Children Clothed",
      icon: <Heart className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "500+",
      label: "Orphans Supported",
      icon: <Users className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "12",
      label: "Communities Reached",
      icon: <Globe className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "3",
      label: "Years Running",
      icon: <Target className="w-8 h-8 text-[#95E18A]" />,
    },
  ],
  ctaText: "Donate Clothes",
  ctaLink: "/donate",
  secondaryCtaText: "View Campaigns",
  secondaryCtaLink: "/campaigns?category=WE_ARE_TOGETHER_WITH_OUR_ORPHANS",
};

export default function EidPage() {
  return <CampaignLandingPage config={config} />;
}
