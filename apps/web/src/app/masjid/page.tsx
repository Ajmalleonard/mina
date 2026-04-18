import CampaignLandingPage from "@/components/CampaignLandingPage";
import { Heart, Users, Globe, Target } from "lucide-react";

const config = {
  title: "Masjid Construction",
  description:
    "Building a Masjid is an ongoing charity (Sadaqah Jariyah). Help us bring places of worship to rural communities.",
  heroImage: "/assets/MASJID/DJI_20250902124328_0005_D.JPG",
  heroAlt: "Masjid Construction in Progress",
  category: "CONSTRUCTION_PROJECTS",
  storyTitle: "Building the Heart of Communities",
  story:
    "A Masjid is far more than a building — it is the spiritual, educational, and social heart of a community. In rural Tanzania, many communities lack a proper place for worship, religious education, and communal gathering. Our Masjid Construction program builds structurally sound, large-capacity Mosques designed to serve communities for generations. Each project includes not just the main prayer hall but also facilities for Quran education and community meetings. Every contribution to this program is an investment in Sadaqah Jariyah — ongoing charity whose rewards continue even after the donor passes away. We use local labor and materials wherever possible, ensuring the project benefits the community economically as well.",
  storyImage: "/assets/MASJID/IMG_4157.JPG",
  storyImageAlt: "Community gathered for prayer in new Masjid",
  impactStats: [
    {
      value: "8",
      label: "Masjids Built",
      icon: <Heart className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "5,000+",
      label: "Worshippers Served",
      icon: <Users className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "6",
      label: "Regions",
      icon: <Globe className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "Sadaqah",
      label: "Jariyah",
      icon: <Target className="w-8 h-8 text-[#95E18A]" />,
    },
  ],
  ctaText: "Fund a Masjid",
  ctaLink: "/donate",
  secondaryCtaText: "View Campaigns",
  secondaryCtaLink: "/campaigns?category=CONSTRUCTION_PROJECTS",
};

export default function MasjidPage() {
  return <CampaignLandingPage config={config} />;
}
