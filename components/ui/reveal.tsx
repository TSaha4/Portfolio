"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Entrance: content fades and rises into place. Deliberately no blur filter: animating blur over
 * large text blocks forced full repaints every frame and caused scroll hitches on laptops.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
