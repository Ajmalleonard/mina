"use client";
import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import StripePayment from "@/components/StripePayment";

export default function DonateForm() {
  const [donationAmount, setDonationAmount] = useState("25");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [step, setStep] = useState(1);

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

  return (
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
                          className="block text-gray-700 mb-2"
                        >
                          Custom Amount:
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-500">
                            $
                          </span>
                          <input
                            type="number"
                            id="customAmount"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            className="pl-8 pr-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter amount"
                            min="1"
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
                      className="form-element"
                    >
                      <label className="block text-lg font-medium text-green-800 mb-4">
                        Your Information
                      </label>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-gray-700 mb-2"
                          >
                            Full Name:
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            className="px-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-gray-700 mb-2"
                          >
                            Email Address:
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-gray-700 mb-2"
                          >
                            Message (Optional):
                          </label>
                          <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="px-4 py-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            placeholder="Share why you're donating (optional)"
                            rows={3}
                          ></textarea>
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-md font-medium shadow-md transition-colors"
                      >
                        Continue to Payment
                      </motion.button>
                    </motion.div>
                  </form>
                </motion.div>

                {/* Step 2: Payment Form */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step === 2 ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex-shrink-0"
                >
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-6 border border-green-200 mb-6">
                      <h3 className="font-medium text-gray-800 mb-4">
                        Donation Summary
                      </h3>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium text-gray-800">
                          $
                          {donationAmount === "custom"
                            ? customAmount
                            : donationAmount}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium text-gray-800">
                          {isMonthly ? "Monthly" : "One-time"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Donor:</span>
                        <span className="font-medium text-gray-800">
                          {donorName || "Anonymous"}
                        </span>
                      </div>
                    </div>

                    <StripePayment
                      amount={
                        donationAmount === "custom"
                          ? customAmount
                          : donationAmount
                      }
                      isMonthly={isMonthly}
                    />

                    <div className="text-center mt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        &larr; Go Back
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
