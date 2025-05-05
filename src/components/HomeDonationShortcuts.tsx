"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function HomeDonationShortcuts() {
  const [activeAmount, setActiveAmount] = useState<string | null>(null);

  const donationOptions = [
    { amount: "10", label: "$10" },
    { amount: "25", label: "$25" },
    { amount: "50", label: "$50" },
    { amount: "100", label: "$100" },
  ];

  const handleDonationSelect = (amount: string) => {
    setActiveAmount(amount);
    // In a real application, you might want to navigate to the donation page with the selected amount
    // or open a modal to complete the donation process
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
            Make a difference today
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            Quick Donation
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Your contribution makes a real impact. Choose an amount below to
            quickly support our mission.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {donationOptions.map((option) => (
              <motion.button
                key={option.amount}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDonationSelect(option.amount)}
                className={`px-8 py-4 rounded-md text-lg font-medium transition-all border ${
                  activeAmount === option.amount
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-green-700 border-green-300 hover:border-green-500"
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Link
              href="/donate"
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
            >
              Proceed to Donate
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
