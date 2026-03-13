import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../style/globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mina Foundation",
  description: "non-profit organization helping families through donations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white w-full overflow-x-hidden `}
      >
        <Navbar />
        <main className="pt-16 overflow-x-hidden ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
