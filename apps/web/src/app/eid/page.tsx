import CampaignLandingPage from "@/components/CampaignLandingPage";
import { Heart, Users, Globe, Target } from "lucide-react";

const config = {
  baseKey: "eid",
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
      icon: <Heart className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "500+",
      icon: <Users className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "12",
      icon: <Globe className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "3",
      icon: <Target className="w-8 h-8 text-[#95E18A]" />,
    },
  ],
  ctaLink: "/donate",
  secondaryCtaLink: "/campaigns?category=WE_ARE_TOGETHER_WITH_OUR_ORPHANS",
  translations: {
    title: "Eid Clothing Appeal",
    lead: "Gift a child the joy of Eid with brand new clothes. Ensure they feel valued and celebrated.",
    cta: "Donate Clothes",
    storyTitle: "Every Child Deserves to Celebrate",
    labelPrefix: "eid",
    activitiesTitle: "Eid Clothing Impact",
    viewCampaigns: "View Campaigns",
    donate: "Donate Clothes",
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

export default function EidPage() {
  return <CampaignLandingPage config={config} />;
}
