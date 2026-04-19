import CampaignLandingPage from "@/components/CampaignLandingPage";
import { Heart, Users, Globe, Target, CheckCircle } from "lucide-react";

const config = {
  baseKey: "zakat",
  title: "Zakat Distribution",
  description:
    "Purify your wealth. We ensure your Zakat reaches the most eligible families strictly under Islamic guidelines.",
  heroImage: "/assets/ZAKAT/IMG_5555.jpg",
  heroAlt: "Zakat Distribution to Families",
  category: "ZAKAT_AND_SADAKA",
  storyTitle: "Ensuring Your Zakat Reaches Those in Need",
  story:
    "Zakat is one of the Five Pillars of Islam — an obligatory act of worship that purifies wealth and uplifts the less fortunate. At Mina Foundation, we take this responsibility seriously. Our dedicated Zakat committee carefully identifies and verifies eligible recipients across Tanzania, including widows, orphans, the disabled, and those affected by hardship. We ensure every cent of your Zakat is distributed in accordance with Islamic jurisprudence, reaching families who truly need it. We provide transparent reporting on how your Zakat was distributed, giving you peace of mind that your worship has been fulfilled correctly.",
  storyImage: "/assets/ZAKAT/IMG_4444.jpg",
  storyImageAlt: "Zakat being distributed to beneficiaries",
  impactStats: [
    {
      value: "2,000+",
      icon: <Heart className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "100%",
      icon: <CheckCircle className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "8",
      icon: <Globe className="w-8 h-8 text-[#95E18A]" />,
    },
    {
      value: "Sharia",
      icon: <Target className="w-8 h-8 text-[#95E18A]" />,
    },
  ],
  ctaLink: "/donate",
  secondaryCtaLink: "/campaigns?category=ZAKAT_AND_SADAKA",
  translations: {
    title: "Zakat Distribution",
    lead: "Purify your wealth. We ensure your Zakat reaches the most eligible families strictly under Islamic guidelines.",
    cta: "Pay Zakat",
    storyTitle: "Ensuring Your Zakat Reaches Those in Need",
    labelPrefix: "zakat",
    activitiesTitle: "Zakat Distribution Impact",
    viewCampaigns: "View Campaigns",
    donate: "Pay Zakat",
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

export default function ZakatPage() {
  return <CampaignLandingPage config={config} />;
}
