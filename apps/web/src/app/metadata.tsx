import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mina Foundation",
    template: "%s | Mina Foundation",
  },
  description:
    "Empowering the community through education, support services, and sustainable programs.",
  keywords:
    "Mina Foundation, community support, nonprofit, education, support services",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://minafoundation.org",
    siteName: "Mina Foundation",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mina Foundation",
    description:
      "Empowering the community through education, support services, and sustainable programs.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};
