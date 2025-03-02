"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedDiagnosis } from "./AnimatedDiagnosis"
import Link from "next/link"

export function Hero() {
  return (
    <section
      className="pt-32 pb-20 text-center"
      style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-[#7b3f00]"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How doctors leverage
        </motion.h1>

        <div className="h-16 mb-6 flex items-center justify-center text-[#7b3f00]">
          <AnimatedDiagnosis />
        </div>

        <motion.p
          className="text-xl mb-12 max-w-2xl mx-auto text-gray-400"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          An open-source platform to enhance medical diagnostics with AI-powered analysis and insights.
        </motion.p>

        <div className="flex items-center justify-center space-x-4">
          <Link href="/signup">
            <Button className="bg-[#7b3f00] text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-[#7b3f00] hover:bg-[#f2eadd] rounded-xl">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

