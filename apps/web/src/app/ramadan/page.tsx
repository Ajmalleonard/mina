import CampaignLandingPage from "@/components/CampaignLandingPage";
import { Heart, Users, Globe, Target, CheckCircle } from "lucide-react";

const config = {
  baseKey: "ramadan",
  title: "Ramadan Relief",
  description:
    "Providing Suhoor and Iftar food packages to impoverished families throughout the holy month of Ramadan.",
  heroImage: "/assets/FOOD_PACKAGES/IMG_0101.jpg",
  heroAlt: "Ramadan Food Package Distribution",
  category: "RAMADAN_CAMPAIGN",
  storyTitle: "Feeding Families During the Holy Month",
  story:
    "Ramadan is a time of spiritual reflection, prayer, and communal sharing. For many families in Tanzania, the ability to observe proper fasting is a struggle due to food insecurity. Our Ramadan Relief program provides carefully curated food packages containing staples for both Suhoor (pre-dawn meal) and Iftar (breaking of fast). Each package is designed to sustain a family of 5-6 members throughout the entire month. We work with local partners and volunteers to ensure timely distribution across Dar es Salaam and rural regions, bringing not just nourishment but also the joy of observing Ramadan with dignity.",
  storyImage: "/assets/FOOD_PACKAGES/IMG_0248.JPG",
  storyImageAlt: "Families receiving Ramadan food packages",
  impactStats: [
    {
      value: "5,000+",
      icon: <Heart className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "25,000",
      icon: <Users className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "15+",
      icon: <Globe className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "5",
      icon: <Target className="w-8 h-8 text-[#95E18A]" />,
    },
  ],
  ctaLink: "/donate",
  secondaryCtaLink: "/campaigns?category=RAMADAN_CAMPAIGN",
  translations: {
    title: "Ramadan Relief",
    lead: "Providing Suhoor and Iftar food packages to impoverished families throughout the holy month of Ramadan.",
    cta: "Support Ramadan",
    storyTitle: "Feeding Families During the Holy Month",
    labelPrefix: "ramadan",
    activitiesTitle: "Ramadan Relief Impact",
    viewCampaigns: "View Campaigns",
    donate: "Support Ramadan",
    contactTitle: "Contact Us",
    form: {
      name: "Your Name",
      namePlaceholder: "Enter your name",
      email: "Email Address",
      emailPlaceholder: "Enter your email",
      subject: "Subject",
      subjectPlaceholder: "Enter subject",
      message: "Message",
      messagePlaceholder: "Type your message here...",
      send: "Send Message",
      success: "Your message has been sent successfully!"
    }
  }
};

export default function RamadanPage() {
  return <CampaignLandingPage config={config} />;
}
