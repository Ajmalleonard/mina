"use client";
import React, { useState, useRef } from "react";
import { motion } from "motion/react";

export default function DonateFAQ() {
  const faqRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How are my donations used?",
      answer:
        "Your donations directly fund our programs supporting families through education, community development, and emergency aid. We allocate at least 90% of all donations to program expenses, with the remainder covering essential administrative costs.",
    },
    {
      question: "Is my donation tax-deductible?",
      answer:
        "Yes, Mina Foundation is a registered non-profit organization. Your donations are tax-deductible to the extent allowed by law. You'll receive an official receipt for your tax records.",
    },
    {
      question: "Can I donate monthly?",
      answer:
        "Absolutely! Our monthly giving program allows you to make a recurring impact. You can select the 'Monthly Donation' option on our donation form, and your card will be charged the same amount each month until you choose to stop.",
    },
    {
      question: "How secure is my payment information?",
      answer:
        "We take your privacy and security seriously. We use industry-standard encryption and security protocols through our payment processor, Stripe. Your financial information is never stored on our servers.",
    },
    {
      question: "Can I donate in memory or honor of someone?",
      answer:
        "Yes, you can make a tribute donation. Simply include the honoree's name in the message field when making your donation, and specify if you'd like us to notify someone of your gift.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <motion.section
      ref={faqRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
            Questions
          </span>
          <h2 className="text-3xl font-bold text-green-800 mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8">
            We&apos;re here to answer any questions you may have about donating
            to Mina Foundation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-green-800">
                  {faq.question}
                </span>
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-6 pt-0 bg-white">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Still have questions about donating?
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
