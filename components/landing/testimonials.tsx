// components/landing/testimonials.tsx

"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Product Designer",
    content:
      "MindPattern has completely transformed how I process my emotions. The AI insights help me recognize patterns I never noticed before.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "James Chen",
    role: "Software Engineer",
    content:
      "As someone who struggles with anxiety, having a private space to journal with intelligent feedback has been life-changing.",
    rating: 5,
    avatar: "JC",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    content:
      "The mood tracking features are incredible. I can finally see what triggers my stress and take action before it becomes overwhelming.",
    rating: 5,
    avatar: "ER",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Loved by
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Thousands
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See what our users have to say about their journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}>
              <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
