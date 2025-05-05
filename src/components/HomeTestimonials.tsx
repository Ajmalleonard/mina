"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export default function HomeTestimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-green-600 font-medium">
            Voices from our community
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            Testimonials
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Hear from those whose lives have been touched by the work of Mina
            Foundation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "The Mina Foundation has been a blessing for my family during our difficult times. Their support helped us establish ourselves in a new community.",
              author: "Fatima K.",
              role: "Program Beneficiary",
              image: "/images/15.jpg",
            },
            {
              quote:
                "Volunteering with Mina has been the most rewarding experience. Seeing the direct impact of our work on families is truly inspiring.",
              author: "Ahmed J.",
              role: "Volunteer",
              image: "/images/10.jpg",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg border border-gray-200 relative overflow-hidden"
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
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-green-800">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
