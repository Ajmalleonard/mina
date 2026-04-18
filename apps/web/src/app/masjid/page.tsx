import CampaignLandingPage from "@/components/CampaignLandingPage";
import { Heart, Users, Globe, Target } from "lucide-react";

const config = {
  heroImage: "/assets/MASJID/DJI_20250902124328_0005_D.JPG",
  heroAlt: "Masjid Construction in Progress",
  category: "CONSTRUCTION_PROJECTS",
  story:
    "A Masjid is far more than a building — it is the spiritual, educational, and social heart of a community. In rural Tanzania, many communities lack a proper place for worship, religious education, and communal gathering. Our Masjid Construction program builds structurally sound, large-capacity Mosques designed to serve communities for generations. Each project includes not just the main prayer hall but also facilities for Quran education and community meetings. Every contribution to this program is an investment in Sadaqah Jariyah — ongoing charity whose rewards continue even after the donor passes away. We use local labor and materials wherever possible, ensuring the project benefits the community economically as well.",
  storyImage: "/assets/MASJID/IMG_4157.JPG",
  storyImageAlt: "Community gathered for prayer in new Masjid",
  impactStats: [
    {
      value: "8",
      icon: <Heart className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "5,000+",
      icon: <Users className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "6",
      icon: <Globe className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "Sadaqah",
      icon: <Target className="w-8 h-8 text-[#95E18A]" />,
    },
  ],
  ctaLink: "/donate",
  secondaryCtaLink: "/campaigns?category=CONSTRUCTION_PROJECTS",
};

export default function MasjidPage() {
  return <CampaignLandingPage config={config} />;
}
