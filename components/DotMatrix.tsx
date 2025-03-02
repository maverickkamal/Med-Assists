"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface DotMatrixProps {
  text: string
}

export function DotMatrix({ text }: DotMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dotSize = 3
    const spacing = 6
    const fontSize = 80

    canvas.width = 600
    canvas.height = 100

    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.fillStyle = "#fff"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Draw text to measure
    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width
    const textHeight = fontSize

    // Clear and prepare for dots
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    // Clear canvas again
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw dots where text was
    ctx.fillStyle = "#0a2472" // Cyan base color
    for (let y = 0; y < canvas.height; y += spacing) {
      for (let x = 0; x < canvas.width; x += spacing) {
        const i = (y * canvas.width + x) * 4
        if (pixels[i + 3] > 128) {
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, dotSize)
          gradient.addColorStop(0, "#0a2472") // Cyan
          gradient.addColorStop(1, "#a855f7") // Purple
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }, [text])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative w-full max-w-3xl mx-auto"
    >
      <canvas ref={canvasRef} className="w-full h-auto" />
    </motion.div>
  )
}

