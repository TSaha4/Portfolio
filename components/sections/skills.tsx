"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { skills } from "@/content/skills"
import { LayerHeader } from "@/components/ui/layer-header"


export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="relative py-16 md:py-24 px-6 sm:px-12 lg:px-24" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <LayerHeader id="skills" title="Tech stack." caption="The tools I reach for. Hover to focus one." note="my toolbox" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto grid max-w-[720px] grid-cols-5 gap-2 sm:grid-cols-8 sm:gap-2.5 group/skills"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ rotate: [0, -8, 6, -4, 0], transition: { duration: 0.5 } }}
              className="relative aspect-square w-full"
            >
              <div
                className="flex flex-col items-center justify-center py-2 px-0.5 sm:py-2.5 sm:px-1 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] transition-all duration-500 h-full md:grayscale md:opacity-60 md:group-hover/skills:grayscale md:group-hover/skills:opacity-30 md:hover:!grayscale-0 md:hover:!opacity-100 md:hover:scale-115 md:hover:bg-primary/10 md:hover:border-primary/50 md:hover:shadow-xl md:hover:shadow-primary/20 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center mb-1 flex-shrink-0">
                  {typeof skill.icon === "string" ? (
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className={`object-contain ${skill.invertDark ? 'dark:invert' : 'dark:invert-0'}`}
                    />
                  ) : (
                    <skill.icon 
                      className="w-full h-full stroke-[1.5]" 
                      style={{ color: skill.color || "currentColor" }}
                    />
                  )}
                </div>
                <span className="text-[9px] sm:text-[10px] font-semibold text-center text-foreground leading-tight break-normal whitespace-normal w-full md:px-1">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
