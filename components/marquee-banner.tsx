"use client"

import { motion } from "framer-motion"

const marqueeItems = [
  "AI & Machine Learning",
  "Full Stack Development",
  "Deep Learning",
  "Next.js",
  "TensorFlow",
  "React",
  "Python",
  "System Design",
]

export function MarqueeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="relative w-full overflow-hidden select-none border-y border-primary/20 bg-[#0a0a16]/60 backdrop-blur-sm py-5 md:py-6"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-[#0F0F1A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-[#0F0F1A] to-transparent" />

      {/* Row 1 — scrolls left */}
      <div className="marquee-row mb-3 md:mb-4">
        <div className="marquee-track marquee-left">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-6 md:gap-10" aria-hidden={copy === 1}>
              {marqueeItems.map((item, i) => (
                <div key={i} className="flex items-center gap-6 md:gap-10">
                  <span className="whitespace-nowrap text-sm md:text-lg font-semibold uppercase tracking-[0.2em] text-primary/70">
                    {item}
                  </span>
                  <span className="text-primary/30 text-xs md:text-sm">◆</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="marquee-row">
        <div className="marquee-track marquee-right">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-6 md:gap-10" aria-hidden={copy === 1}>
              {[...marqueeItems].reverse().map((item, i) => (
                <div key={i} className="flex items-center gap-6 md:gap-10">
                  <span className="whitespace-nowrap text-sm md:text-lg font-semibold uppercase tracking-[0.2em] text-primary/40">
                    {item}
                  </span>
                  <span className="text-primary/20 text-xs md:text-sm">◆</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
