"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FileText } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="space-y-6">
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
              I didn't start out trying to "learn AI" or "become a developer." I just kept chasing 
              ideas that felt too interesting to ignore. One project led to another—first small 
              experiments, then systems that actually did something real. Somewhere along the way, 
              writing code stopped being about assignments and started becoming a way to build things 
              that <em className="text-foreground font-medium italic">move</em>—systems that see, 
              decide, and adapt. From mapping flood zones into drone missions to building AI that 
              understands human input, I found myself drawn to problems where logic meets uncertainty, 
              and solutions aren't handed to you—you carve them out.
            </p>
            <p className="text-[17px] md:text-lg text-muted-foreground leading-relaxed">
              Now, I build at that intersection—where machine learning meets real-world constraints, 
              where systems aren't just accurate but usable, efficient, and alive in their own way. 
              I like the challenge of turning rough ideas into something complete—something that works, 
              scales, and holds up outside a lab. And I know I'm still early in the journey, but that's 
              the best part—there's always a bigger system to build, a harder problem to chase, and a 
              horizon that keeps moving forward.
            </p>
          </div>

          <div className="mt-12 mb-10 relative">
            <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-primary to-primary/20 rounded-r-full hidden md:block" />
            <blockquote className="relative p-6 md:px-8 bg-muted/40 rounded-2xl border border-[var(--glass-border)] shadow-sm">
              <div className="absolute -top-4 -left-2 text-6xl text-primary/30 font-serif leading-none select-none">
                "
              </div>
              <p className="relative z-10 text-xl md:text-2xl font-serif italic text-foreground leading-snug mb-4">
                Excellence is a continuous process and not an accident.
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-px bg-primary/50" />
                <span className="text-sm font-semibold tracking-wider text-primary uppercase">
                  A.P.J. Abdul Kalam
                </span>
              </footer>
            </blockquote>
          </div>

          <motion.a
            href="https://drive.google.com/file/d/1piZfJcQFF-LolASV__BS2TNlLnDTHkH2/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            <FileText className="w-5 h-5" />
            Where the magic is documented.
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
