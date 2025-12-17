// components/landing/faq.tsx

"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const faqs = [
  {
    question: "Is my data really private?",
    answer:
      "Absolutely. Your journal entries are encrypted and stored securely. We never share your data with third parties, and you can delete your account and all data at any time.",
  },
  {
    question: "How does the AI analysis work?",
    answer:
      "Our AI analyzes patterns in your writing to identify emotional trends, recurring themes, and potential triggers. It uses advanced natural language processing while keeping your data completely private.",
  },
  {
    question: "Can I use MindPattern on mobile?",
    answer:
      "Yes! MindPattern is fully responsive and works great on all devices. We also have native mobile apps coming soon for an even better experience.",
  },
  {
    question: "Is MindPattern a replacement for therapy?",
    answer:
      "No. MindPattern is a tool for self-reflection and awareness, not a replacement for professional mental health care. If you're struggling, please reach out to a qualified therapist or counselor.",
  },
  {
    question: "How much does it cost?",
    answer:
      "MindPattern is free forever for basic journaling and mood tracking. Premium features with advanced AI insights will be available in the future, but core functionality will always remain free.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes! You can export all your journal entries and data at any time in multiple formats including PDF, JSON, and CSV.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Questions
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about MindPattern
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}>
              <Card
                className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary-200"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 pr-8">
                    {faq.question}
                  </h3>
                  <FaChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden">
                  <p className="text-slate-600 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
