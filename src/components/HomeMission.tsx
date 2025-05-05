"use client";
import React from "react";
import { motion } from "motion/react";
import { FaBriefcase, FaHandshake, FaGraduationCap } from "react-icons/fa";

export default function HomeMission() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
            Our purpose
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            Our Mission
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            At Mina Foundation, we strive to empower families through education,
            community support, and sustainable aid programs that promote dignity
            and self-reliance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Education",
              icon: (
                <FaGraduationCap className="text-4xl mx-auto text-green-600" />
              ),
              desc: "Providing access to quality education and resources for all ages.",
            },
            {
              title: "Community",
              icon: <FaHandshake className="text-4xl mx-auto text-green-600" />,
              desc: "Building strong community connections and support networks for families.",
            },
            {
              title: "Economic Empowerment",
              icon: <FaBriefcase className="text-4xl mx-auto text-green-600" />,
              desc: "Creating opportunities for financial independence and career development.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-green-50 p-8 rounded-lg border border-green-200 hover:border-green-300 transition-all text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
