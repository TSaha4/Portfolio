"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FileText } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-12 md:py-20 px-4 md:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 md:mb-12 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-5 md:p-12 shadow-lg"
        >
          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I got here the unglamorous way—one curious question about how something worked 
              leading to a lot of broken code and a few systems that eventually didn't break. 
              No grand plan, just a lot of iteration. Somewhere between fixing one bug and 
              designing the next feature, code stopped being an assignment and became the way 
              I think through problems.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              What I care about is whether the thing actually <em className="text-foreground font-medium italic">runs</em>—whether 
              the model generalizes, whether the system scales, whether the code someone else 
              touches makes sense six months later. I'm still learning most of this as I go, and 
              I've made peace with that. There's always a harder problem worth chasing, and a 
              better version of the last system worth building.
            </p>
          </div>

          <div className="mt-8 md:mt-12 mb-8 md:mb-10 relative">
            <div className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-primary to-primary/20 rounded-r-full hidden md:block" />
            <blockquote className="relative p-4 md:p-8 bg-muted/40 rounded-2xl border border-[var(--glass-border)] shadow-sm">
              <div className="absolute -top-3 md:-top-4 -left-1 md:-left-2 text-4xl md:text-6xl text-primary/30 font-serif leading-none select-none">
                "
              </div>
              <p className="relative z-10 text-base md:text-2xl font-serif italic text-foreground leading-snug mb-3 md:mb-4">
                Excellence is a continuous process and not an accident.
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-px bg-primary/50" />
                <span className="text-xs md:text-sm font-semibold tracking-wider text-primary uppercase">
                  A.P.J. Abdul Kalam
                </span>
              </footer>
            </blockquote>
          </div>

          <motion.a
            href="https://drive.google.com/file/d/1wNyTxpLwbgW3iSFPBVDYcv8sQM15i98y/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 text-sm md:text-base"
          >
            <FileText className="w-4.5 h-4.5 md:w-5 md:h-5" />
            Where the magic is documented.
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
