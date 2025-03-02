"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DotMatrix } from "./DotMatrix"

const diagnosisTypes = ["AI Diagnosis", "Smart Analysis", "Neural Insights", "Deep Learning"]

export function AnimatedDiagnosis() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % diagnosisTypes.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    // Changed "text-[#0a2472]" to "text-inherit" so the color can be inherited from the parent
    <div className="h-16 flex items-center justify-center text-inherit">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <DotMatrix text={diagnosisTypes[currentIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

