import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Mina Foundation. We're here to answer your questions and help you get involved.",
  keywords: "contact Mina Foundation, get in touch, contact form, inquiries",
  openGraph: {
    title: "Contact Us | Mina Foundation",
    description:
      "Get in touch with Mina Foundation. We're here to answer your questions and help you get involved.",
    images: "/opengraph-image.png",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <ContactHero />
      <ContactForm />
    </div>
  );
}
