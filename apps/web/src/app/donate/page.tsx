"use client";

import React, { useState, useRef } from "react";

import Link from "next/link";
import HeroSection from "@/components/hero";
import Image from "next/image";
import PaymentModal from "@/components/PaymentModal";

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const impactRef = useRef(null);
  const faqRef = useRef(null);

  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setDonationAmount("custom");
  };

  /* Step 1: Donation Form */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/payments/pesapal/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: donationAmount === "custom" ? customAmount : donationAmount,
          description: `Donation to Mina Foundation (${isMonthly ? 'Monthly' : 'One-time'})`,
          email: email,
          firstName: donorName.split(" ")[0], // Simple split for now
          lastName: donorName.split(" ").slice(1).join(" ") || "",
          isMonthly: isMonthly
        }),
      });

      const data = await response.json();

      if (data.redirect_url) {
        // Instead of redirecting window, open modal
        setPaymentUrl(data.redirect_url);
        setIsPaymentModalOpen(true);
      } else {
        // Show specific error if available
        const errorMessage = data.details || data.error || "Failed to initiate payment. Please try again.";
        alert(`Payment Error: ${errorMessage}`);
        console.error("Payment Error:", data);
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred. Please check your connection and try again.");
    }
  };

  const heroImages = [
    { src: "/images/IMG_9003 2.jpg", alt: "Supporting our community" },
    { src: "/images/IMG_8983 2.jpg", alt: "Making a difference together" },
  ];

  // Impact story images
  const impactImages = [
    {
      src: "/images/21.jpg",
      title: "Family Support Program",
      description:
        "Helping families in need with essential resources and support services.",
      stats: "500+ families helped",
    },
    {
      src: "/images/23.jpg",
      title: "Educational Initiatives",
      description: "Providing quality education and resources for all ages.",
      stats: "1,000+ students enrolled",
    },
    {
      src: "/images/26.jpg",
      title: "Community Development",
      description: "Building strong community connections and infrastructure.",
      stats: "12 community centers",
    },
  ];

  return (
    <div className="w-full bg-[#FFFBF2] text-[#111111]">
      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        redirectUrl={paymentUrl}
      />

      {/* Hero Section with Image */}


      {/* Donation Form Section */}
      <section className="py-16 bg-[#FFFBF2]" id="payment-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-sm overflow-hidden border border-black/5 p-8 sm:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-6 text-center">
              Make a Donation
            </h2>

            {/* Form Content */}
            <div className="relative">
              <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Donation Type */}
                  <div className="form-element">
                    <label className="block text-lg font-bold text-[#111111] mb-4">
                      Donation Type
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <button
                        type="button"
                        onClick={() => setIsMonthly(false)}
                        className={`px-6 py-3 rounded-full font-medium transition-colors border ${!isMonthly
                            ? "bg-[#111111] text-white border-[#111111]"
                            : "bg-white text-[#111111] border-gray-300 hover:border-black"
                          }`}
                      >
                        One-time Donation
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMonthly(true)}
                        className={`px-6 py-3 rounded-full font-medium transition-colors border ${isMonthly
                            ? "bg-[#111111] text-white border-[#111111]"
                            : "bg-white text-[#111111] border-gray-300 hover:border-black"
                          }`}
                      >
                        Monthly Donation
                      </button>
                    </div>
                  </div>

                  {/* Donation Amount */}
                  <div className="form-element">
                    <label className="block text-lg font-bold text-[#111111] mb-4">
                      Donation Amount
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {["25", "50", "100", "250"].map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => handleAmountSelect(amount)}
                            className={`px-6 py-3 rounded-full font-medium transition-colors border ${donationAmount === amount
                                ? "bg-[#95E18A] text-[#111111] border-[#95E18A]"
                                : "bg-white text-[#111111] border-gray-300 hover:border-black"
                              }`}
                          >
                            ${amount}
                          </button>
                        ))}
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="customAmount"
                        className="block text-sm font-medium text-gray-600 mb-1"
                      >
                        Custom Amount
                      </label>
                      <div className="relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="customAmount"
                          id="customAmount"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="bg-gray-50 block w-full pl-8 p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                          placeholder="Other amount"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="form-element grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="donorName"
                        className="block text-sm font-medium text-gray-600 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="donorName"
                        id="donorName"
                        value={donorName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setDonorName(e.target.value)
                        }
                        className="bg-gray-50 block w-full p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                        className="bg-gray-50 block w-full p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-element">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-600 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setMessage(e.target.value)
                      }
                      className="bg-gray-50 block w-full p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-element pt-4 border-t border-[#111111]">
                    <button
                      type="submit"
                      className="w-full bg-[#111111] hover:bg-[#333333] text-white px-6 py-4 rounded-none font-bold text-lg border border-[#111111]"
                    >
                      Proceed to Payment
                    </button>
                  </div>

                  {/* Security Badge */}
                  <div className="pt-6 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 text-[#111111] bg-gray-50 border border-[#111111] px-4 py-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <rect x="3" y="11" width="18" height="11" rx="0" ry="0"></rect>
                        <path d="M7 11V7a5 5 0 0110 0v4"></path>
                      </svg>
                      <span className="font-bold text-xs uppercase tracking-wide">Payments Protected by Square Security</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Direct Bank Transfer Section */}
            <div className="mt-16 pt-16 border-t border-[#111111]">
              <h3 className="text-xl md:text-2xl font-bold text-[#111111] mb-6 text-center">
                Or Give via Direct Bank Transfer
              </h3>
              <p className="text-center text-[#111111] mb-8 max-w-2xl mx-auto">
                You can make a direct deposit to our KCB Tanzania accounts. We currently accept <strong>USD</strong>, <strong>EUR</strong>, and <strong>TZS</strong> (Tanzanian Shillings).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-[#111111] bg-white">
                {/* Bank Info Block */}
                <div className="p-6 border-r border-b border-[#111111]">
                  <h4 className="font-bold text-[#111111] mb-4 uppercase text-sm tracking-wide border-b border-[#111111] pb-2 inline-block">Bank Details</h4>
                  <ul className="space-y-3 mt-4 text-[#111111]">
                    <li className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase font-bold">Bank Name</span>
                      <span className="font-medium">KCB Tanzania Ltd (Lumumba Branch)</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase font-bold">Bank Address</span>
                      <span className="font-medium">P.O. Box 804, Lumumba, Tanzania</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase font-bold">Account Name</span>
                      <span className="font-medium">Mina Foundation</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase font-bold">SWIFT Code</span>
                      <span className="font-medium tracking-widest bg-gray-100 border border-[#111111] px-2 py-1 inline-block w-fit mt-1">Kcbl TzTz</span>
                    </li>
                  </ul>
                </div>

                {/* Account Numbers Block */}
                <div className="p-6 border-r border-b border-[#111111] bg-[#e6f7e4]">
                  <h4 className="font-bold text-[#111111] mb-4 uppercase text-sm tracking-wide border-b border-[#111111] pb-2 inline-block">Account Numbers</h4>
                  <ul className="space-y-6 mt-4 text-[#111111]">
                    <li className="flex flex-col">
                      <span className="text-xs text-[#111111] uppercase font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
                        USD Account
                      </span>
                      <span className="text-2xl font-bold font-mono tracking-wider mt-1">3390715967</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs text-[#111111] uppercase font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
                        EUR Account
                      </span>
                      <span className="text-2xl font-bold font-mono tracking-wider mt-1">3390715983</span>
                    </li>
                    <li className="border-t border-[#111111] pt-4 mt-4">
                      <p className="text-xs font-bold uppercase text-gray-700">Note For TZS Transfers</p>
                      <p className="text-sm mt-1">Please use either account above; the bank will automatically convert TZS deposits at the daily exchange rate.</p>
                    </li>
                  </ul>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section with Images */}
      <section className="py-16 bg-[#F4F1E8]" ref={impactRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">
              Your Impact
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Your donations make a real difference in the lives of families in
              our community. Here are some of the ways your support helps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactImages.map((impact, index) => (
              <div
                key={index}
                className="bg-white rounded-sm overflow-hidden border border-black/5 h-full"
              >
                <div className="relative h-48">
                  <Image
                    src={impact.src}
                    alt={impact.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#111111] mb-2">
                    {impact.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{impact.description}</p>
                  <div className="bg-[#95E18A] text-[#111111] px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {impact.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="#payment-section"
              className="bg-[#111111] hover:opacity-90 text-white font-medium py-3 px-8 rounded-full transition-opacity inline-block"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">
              Testimonials
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Hear from those whose lives have been touched by the generosity of
              our donors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "The educational support my children received has transformed their lives. We are forever grateful for your generosity.",
                author: "Sara M.",
                image: "/images/14.jpg",
              },
              {
                quote:
                  "As a single parent, the assistance provided by the Mina Foundation has been invaluable. Thank you to all who donate.",
                author: "Ahmed K.",
                image: "/images/19.jpg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#FFFBF2] p-8 rounded-sm border border-black/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10 grayscale">
                  <Image
                    src={testimonial.image}
                    alt="Testimonial background"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <div className="text-[#95E18A] text-4xl mb-4 font-serif">
                    &quot;
                  </div>
                  <p className="text-[#111111] mb-6 italic text-lg">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#95E18A] rounded-full flex items-center justify-center text-[#111111] font-bold text-xl">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold text-[#111111]">
                        {testimonial.author}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#FFFBF2]" ref={faqRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111111] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Find answers to common questions about donations and our work.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Is my donation tax-deductible?",
                answer:
                  "Yes, all donations to Mina Foundation are tax-deductible as we are a registered 501(c)(3) nonprofit organization.",
              },
              {
                question: "How is my donation used?",
                answer:
                  "Your donation directly supports our programs for families, including education, social services, and community development. 95% of all donations go directly to our programs.",
              },
              {
                question: "Can I make a monthly recurring donation?",
                answer:
                  "Yes, you can select the 'Monthly Donation' option on our donation form to set up a recurring contribution.",
              },
              {
                question: "Is my payment information secure?",
                answer:
                  "Absolutely. We use industry-standard encryption and secure payment processors to ensure your personal and financial information is protected.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-sm overflow-hidden border border-black/5"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#111111] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have more questions about donating?
            </p>
            <Link
              href="/contact"
              className="text-[#111111] font-bold underline hover:opacity-70"
            >
              Contact us for more information
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action with Background Image */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_9014 2.jpg"
            alt="Donate call to action background"
            fill
            className="object-cover brightness-50 grayscale"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Support Our Mission Today
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-light">
            Your donation can help us reach more families and strengthen our
            community. Together, we can create lasting positive change.
          </p>
          <div>
            <Link
              href="#payment-section"
              className="bg-white text-[#111111] hover:bg-gray-100 px-8 py-4 rounded-full font-bold inline-block transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

