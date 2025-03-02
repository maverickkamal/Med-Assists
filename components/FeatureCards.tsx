"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "Multimodal Data Processing",
    icon: "🔍",
    models: ["Gemini 2.0 flash thinking"],
    description: "Analyze medical images, EHRs, test results, and physician notes for comprehensive diagnostic support.",
  },
  {
    title: "Privacy-First Approach",
    icon: "🎯",
    models: ["On device redaction", "HIPAA compliance"],
    description: "On-device processing ensures patient data privacy and security while maintaining high performance.",
  },
  {
    title: "Real-Time Research Access",
    icon: "📚",
    models: ["normal research", "Deep research"],
    description: "Stay updated with the latest medical research and standards for informed decision-making.",
  },
  {
    title: "Explainable AI",
    icon: "📊",
    models: ["XAI"],
    description: "Understand the reasoning behind each recommendation with clear explanations and evidence.",
  },
]

export function FeatureCards() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#f4f1ea] rounded-lg p-6 border border-[#7b3f00]/20 hover:border-[#7b3f00]/50 transition-colors shadow-sm hover:shadow-md"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7b3f00] to-[#a05000] opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 bg-[#7b3f00]/10 rounded-lg flex items-center justify-center mb-4 border border-[#7b3f00]/20">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#7b3f00]">{feature.title}</h3>
                <p className="text-[#7b3f00]/70 text-sm mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.models.map((model) => (
                    <span
                      key={model}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#7b3f00]/10 border border-[#7b3f00]/20 text-[#7b3f00]/80"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}