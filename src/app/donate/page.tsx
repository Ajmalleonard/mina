"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import StripePayment from "@/components/StripePayment";
import Link from "next/link";
import HeroSection from "@/components/hero";

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
    { src: "/donate_page.webp", alt: "Supporting hands in unity" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <HeroSection
        title="Support Our Mission"
        description="Your generous donations help us provide essential support to Islamic families in need."
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

      {/* Impact Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-b from-white to-green-50"
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
            <h2 className="section-title text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Our Impact
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="section-description text-lg text-gray-700 max-w-3xl mx-auto">
              Discover how your contributions make a difference in the lives of
              Islamic families.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: "money",
                title: "Financial Support",
                description:
                  "Providing financial assistance to families facing economic hardship.",
              },
              {
                icon: "education",
                title: "Educational Programs",
                description:
                  "Funding Islamic education programs for children and adults in the community.",
              },
              {
                icon: "community",
                title: "Community Services",
                description:
                  "Supporting community events and services that bring people together.",
              },
            ].map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{
                  y: -10,
                }}
                className="impact-card bg-white p-8 rounded-xl border-2 border-green-100 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {impact.icon === "money" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                    {impact.icon === "education" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    )}
                    {impact.icon === "community" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-3 text-center">
                  {impact.title}
                </h3>
                <p className="text-gray-700 text-center">
                  {impact.description}
                </p>
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
            <h2 className="section-title text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
            <p className="section-description text-lg text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about our donation process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              {
                question: "Is my donation tax-deductible?",
                answer:
                  "Yes, all donations to Mina Foundation are tax-deductible as we are a registered 501(c)(3) non-profit organization.",
              },
              {
                question: "How is my donation used?",
                answer:
                  "Your donation directly supports our programs providing financial assistance, educational resources, and community services to Islamic families in need.",
              },
              {
                question: "Can I make a donation in someone's honor?",
                answer:
                  "Yes, you can make a tribute donation. Just include the honoree's name in the message field when making your donation.",
              },
              {
                question: "How secure is the online donation process?",
                answer:
                  "We use industry-standard encryption and secure payment processing through Stripe to ensure your personal and financial information is protected.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="faq-item bg-white p-6 rounded-lg border border-green-100"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-700 mb-6">
              Have more questions about donating? We&apos;re here to help!
            </p>
            <Link
              href="/contact"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-all"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
