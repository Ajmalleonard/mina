"use client";
import React from "react";
import { motion } from "motion/react";
import { team } from "@/constants/data";

export default function AboutTeam() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-4">Our Team</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            Meet the dedicated individuals who work tirelessly to fulfill our
            mission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-green-50 rounded-lg overflow-hidden border border-green-200"
            >
              <div className="aspect-square bg-green-200 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-semibold">
                  {member.name.charAt(0)}
                  {member.name.split(" ")[1]?.charAt(0)}
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-semibold text-xl text-green-800">
                  {member.name}
                </h3>
                <p className="text-green-600 mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
