import CampaignLandingPage from "@/components/CampaignLandingPage";
import { Heart, Globe, Target, CheckCircle } from "lucide-react";

const config = {
  baseKey: "katarakt",
  title: "Restoring Sight",
  description: "Thousands in Tanzania suffer from preventable blindness. Our medical camps provide free, life-changing cataract surgeries.",
  heroImage: "/assets/KATARAKT/JQ0G4907_1.JPG",
  heroAlt: "Cataract Surgery Patient After Procedure",
  category: "HEALTH",
  storyTitle: "Giving the Gift of Sight",
  story: "Cataracts are the leading cause of blindness in Tanzania, yet the condition is entirely treatable with a simple 20-minute surgery. For elderly individuals living in poverty, this surgery is simply out of reach. Our Cataract Relief program organizes medical camps across Tanzania, bringing together skilled ophthalmologists, nurses, and volunteers to perform free surgeries. Each $75 donation covers the entire cost of one surgery — including pre-operative screening, the procedure itself, and post-operative medications and follow-up. When an elderly person's sight is restored, they regain their independence. They can cook, walk, and care for themselves and their families again. The transformation is profound and immediate.",
  storyImage: "/assets/KATARAKT/JQ0G3807.jpg",
  storyImageAlt: "Medical team performing cataract surgery",
  impactStats: [
    { value: "500+", icon: <Heart className="w-8 h-8 text-[#95E18A]" /> },
    { value: "$75", icon: <Target className="w-8 h-8 text-[#95E18A]" /> },
    { value: "20 min", icon: <CheckCircle className="w-8 h-8 text-[#95E18A]" /> },
    { value: "10", icon: <Globe className="w-8 h-8 text-[#95E18A]" /> },
  ],
  ctaLink: "/donate",
  secondaryCtaLink: "/campaigns?category=HEALTH",
  translations: {
    title: "Restoring Sight: Cataract Relief",
    lead: "Thousands in Tanzania suffer from preventable blindness due to cataracts. For many elderly individuals, this means a loss of independence and severe hardship. Our medical camps provide free, life-changing cataract surgeries that restore sight in under 30 minutes.",
    cta: "Give the Gift of Sight",
    storyTitle: "Giving the Gift of Sight",
    labelPrefix: "katarakt",
    activitiesTitle: "Cataract Relief Impact",
    viewCampaigns: "View Campaigns",
    donate: "Give the Gift of Sight",
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
      success: "Your message has been sent successfully!",
    },
  },
};

export default function KataraktPage() {
  return <CampaignLandingPage config={config} />;
}
