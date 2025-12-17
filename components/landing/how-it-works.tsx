// components/landing/how-it-works.tsx

"use client";

import { motion } from "framer-motion";
import { FaPencilAlt, FaChartBar, FaLightbulb } from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: FaPencilAlt,
    title: "Journal Daily",
    description:
      "Write freely about your thoughts, feelings, and experiences. No judgment, just honest reflection.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: FaChartBar,
    title: "Track Your Mood",
    description:
      "Log your emotional state throughout the day and identify what triggers different feelings.",
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: FaLightbulb,
    title: "Discover Patterns",
    description:
      "Receive personalized AI insights about your mental health journey and emotional patterns.",
    color: "from-orange-500 to-red-500",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, Yet
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Powerful
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Start your mental health journey in three easy steps
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-16 last:mb-0">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-12`}>
                <div className="flex-1 relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} blur-3xl opacity-20`}
                  />
                  <div
                    className={`relative w-full aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-r ${step.color} p-1`}>
                    <div className="w-full h-full bg-white rounded-3xl flex items-center justify-center">
                      <step.icon className="w-32 h-32 text-slate-300" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div
                    className={`inline-block text-8xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4 opacity-20`}>
                    {step.number}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
