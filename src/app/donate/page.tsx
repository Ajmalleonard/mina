"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import StripePayment from "@/components/StripePayment";
import Link from "next/link";
import HeroSection from "@/components/hero";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Mina Foundation's mission. Your donation helps us create positive change in our community.",
  keywords:
    "donate, support Mina Foundation, charitable giving, make a difference",
  openGraph: {
    title: "Donate | Mina Foundation",
    description:
      "Support Mina Foundation's mission. Your donation helps us create positive change in our community.",
    images: "/opengraph-image.png",
  },
};


export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [step, setStep] = useState(1);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);

    // Scroll to payment form
    setTimeout(() => {
      const paymentElement = document.getElementById("payment-section");
      if (paymentElement) {
        paymentElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
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
    <div className="w-full">
      {/* Hero Section with Image */}
      <HeroSection
        title="Support Our Mission"
        description="Your generous donations help us provide essential support to families in need."
        primaryButtonText="Donate Now"
        primaryButtonLink="#payment-section"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
        backgroundImages={heroImages}
      />

      {/* Donation Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
        id="payment-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl overflow-hidden border border-green-200"
          >
            <div className="p-8 sm:p-10">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center"
              >
                Make a Donation
              </motion.h2>

              {/* Step indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-center items-center mb-8"
              >
                <div className="flex items-center w-full max-w-xs">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step >= 2 ? "bg-green-600" : "bg-white "
                    }`}
                  ></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2
                        ? "bg-green-600 text-white"
                        : "bg-white text-green-600"
                    }`}
                  >
                    2
                  </div>
                </div>
              </motion.div>

              {/* Slider container */}
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-all duration-500 ease-in-out"
                  style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
                >
                  {/* Step 1: Donation Form */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex-shrink-0"
                  >
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Donation Type */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="form-element"
                      >
                        <label className="block text-lg font-medium text-green-800 mb-4">
                          Donation Type
                        </label>
                        <div className="flex flex-wrap gap-4">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={() => setIsMonthly(false)}
                            className={`px-6 py-3 rounded-md font-medium transition-all ${
                              !isMonthly
                                ? "bg-green-600 text-white"
                                : "bg-white text-green-700 border border-green-300"
                            }`}
                          >
                            One-time Donation
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={() => setIsMonthly(true)}
                            className={`px-6 py-3 rounded-md font-medium transition-all ${
                              isMonthly
                                ? "bg-green-600 text-white"
                                : "bg-white text-green-700 border border-green-300"
                            }`}
                          >
                            Monthly Donation
                          </motion.button>
                        </div>
                      </motion.div>

                      {/* Donation Amount */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="form-element"
                      >
                        <label className="block text-lg font-medium text-green-800 mb-4">
                          Donation Amount
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {["25", "50", "100", "250"].map((amount) => (
                            <motion.button
                              key={amount}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={() => handleAmountSelect(amount)}
                              className={`px-6 py-3 rounded-md font-medium transition-all ${
                                donationAmount === amount
                                  ? "bg-green-600 text-white"
                                  : "bg-white text-green-700 border border-green-300"
                              }`}
                            >
                              ${amount}
                            </motion.button>
                          ))}
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="customAmount"
                            className="block text-sm font-medium text-green-700 mb-1"
                          >
                            Custom Amount
                          </label>
                          <div className="relative rounded-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">
                                $
                              </span>
                            </div>
                            <motion.input
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                              }}
                              type="number"
                              name="customAmount"
                              id="customAmount"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                              className="focus:ring-green-500  pl-5
                                block w-[98%] mx-auto p-2 sm:text-sm text-black border-gray-300 rounded-md py-3 focus:outline-none ring-1 ring-green-500"
                              placeholder="   Other amount"
                            />
                          </div>
                        </div>
                      </motion.div>

                      {/* Donor Information */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="form-element grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        <div>
                          <label
                            htmlFor="donorName"
                            className="block text-sm font-medium text-green-700 mb-1"
                          >
                            Your Name
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 15,
                            }}
                            type="text"
                            name="donorName"
                            id="donorName"
                            value={donorName}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setDonorName(e.target.value)}
                            className="focus:ring-green-500  block w-[98%] mx-auto p-2 sm:text-sm text-black border-gray-300 rounded-md py-3 focus:outline-none ring-1 ring-green-500"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-green-700 mb-1"
                          >
                            Email Address
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 15,
                            }}
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setEmail(e.target.value)}
                            className="focus:ring-green-500  block w-[98%] mx-auto p-2 sm:text-sm text-black border-gray-300 rounded-md py-3 focus:outline-none ring-1 ring-green-500"
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="form-element"
                      >
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-green-700 mb-1"
                        >
                          Message
                        </label>
                        <motion.textarea
                          whileFocus={{ scale: 1.01 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}
                          name="message"
                          id="message"
                          value={message}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => setMessage(e.target.value)}
                          className="focus:ring-green-500  block w-[98%] mx-auto p-2 sm:text-sm text-black border-gray-300 rounded-md py-3 focus:outline-none ring-1 ring-green-500"
                          rows={4}
                        />
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="form-element"
                      >
                        <motion.button
                          whileHover={{
                            scale: 1.03,
                          }}
                          whileTap={{ scale: 0.97 }}
                          type="submit"
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-md font-medium text-lg transition-all"
                        >
                          Proceed to Payment
                        </motion.button>
                      </motion.div>
                    </form>
                  </motion.div>

                  {/* Step 2: Payment Section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step === 2 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex-shrink-0"
                  >
                    <div className="mb-6">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setStep(1)}
                        className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Back to form
                      </motion.button>
                    </div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-white p-6 rounded-lg border border-green-100 mb-6"
                    >
                      <h3 className="text-xl font-semibold text-green-800 mb-4">
                        Donation Summary
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                          <span>Donation type:</span>
                          <span className="font-medium">
                            {isMonthly ? "Monthly" : "One-time"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span className="font-medium">
                            $
                            {donationAmount === "custom"
                              ? customAmount
                              : donationAmount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Donor:</span>
                          <span className="font-medium">{donorName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email:</span>
                          <span className="font-medium">{email}</span>
                        </div>
                        {message && (
                          <div className="pt-2 border-t border-gray-200">
                            <p className="text-sm text-gray-500 font-medium mb-1">
                              Message:
                            </p>
                            <p className="text-gray-700">{message}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <StripePayment
                        amount={
                          donationAmount === "custom"
                            ? customAmount
                            : donationAmount
                        }
                        isMonthly={isMonthly}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Impact Section with Images */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-green-50"
        ref={impactRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Your Impact
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Your donations make a real difference in the lives of 
              families in our community. Here are some of the ways your support
              helps:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactImages.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 h-full"
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
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {impact.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{impact.description}</p>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {impact.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="#payment-section"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-all"
            >
              Donate Now
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section with Background Images */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Testimonials
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Hear from those whose lives have been touched by the generosity of
              our donors.
            </p>
          </motion.div>

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
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-green-50 p-8 rounded-lg border border-green-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src={testimonial.image}
                    alt="Testimonial background"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <div className="text-green-600 text-4xl mb-4">&quot;</div>
                  <p className="text-gray-700 mb-6 italic text-lg">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-green-800">
                        {testimonial.author}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-green-50"
        ref={faqRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Find answers to common questions about donations and our work.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="mb-6 last:mb-0 bg-white rounded-lg overflow-hidden border border-green-200"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Have more questions about donating?
            </p>
            <Link
              href="/contact"
              className="text-green-600 hover:text-green-700 font-medium underline"
            >
              Contact us for more information
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action with Background Image */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/IMG_9014 2.jpg"
            alt="Donate call to action background"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-white mb-6"
          >
            Support Our Mission Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-white max-w-3xl mx-auto mb-8"
          >
            Your donation can help us reach more families and strengthen our
            community. Together, we can create lasting positive change.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              href="#payment-section"
              className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-md font-medium inline-block transition-all shadow-md"
            >
              Donate Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
