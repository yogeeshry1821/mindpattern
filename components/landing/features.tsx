// components/landing/features.tsx

"use client";

import { motion } from "framer-motion";
import {
  FaBrain,
  FaChartLine,
  FaShieldAlt,
  FaLightbulb,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: FaBrain,
    title: "AI-Powered Insights",
    description:
      "Advanced pattern recognition analyzes your entries to uncover emotional trends and recurring themes in your mental health journey.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FaChartLine,
    title: "Mood Tracking",
    description:
      "Visualize your emotional journey over time with intuitive charts and personalized analytics that reveal your patterns.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FaShieldAlt,
    title: "Private & Secure",
    description:
      "Your thoughts are encrypted and completely private. We never share your data with anyone, ever.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: FaLightbulb,
    title: "Trigger Identification",
    description:
      "Discover what triggers different emotional states and learn to recognize patterns before they impact your well-being.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: FaCalendarAlt,
    title: "Daily Reflections",
    description:
      "Build a consistent journaling habit with gentle reminders and streak tracking to maintain your mental health routine.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: FaLock,
    title: "End-to-End Encryption",
    description:
      "Military-grade encryption ensures your journal entries remain completely private and accessible only by you.",
    color: "from-indigo-500 to-purple-500",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:40px_40px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your Personal Mental Health
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Companion
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to understand your mind and improve your
            emotional well-being
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}>
              <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-200 group cursor-pointer">
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity`}
                  />
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center relative`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
