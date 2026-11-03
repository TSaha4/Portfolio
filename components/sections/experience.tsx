"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Award, Github, MapPin } from "lucide-react"
import { LayerHeader } from "@/components/ui/layer-header"
import { experiences, type Experience } from "@/content/experience"

/** Ring beside each entry; its gold arc fills as the entry scrolls past the middle of the screen. */
function Marker({ target }: { target: React.RefObject<HTMLLIElement | null> }) {
  const { scrollYProgress } = useScroll({ target, offset: ["center end", "center center"] })
  return (
    <figure className="absolute -left-[47px] top-1 md:-left-[79px]" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-12 w-12 -rotate-90 md:h-14 md:w-14">
        <circle cx="50" cy="50" r="22" className="fill-background stroke-primary" strokeWidth="2" />
        <motion.circle cx="50" cy="50" r="22" className="fill-none stroke-glow" strokeWidth="6" style={{ pathLength: scrollYProgress }} />
        <circle cx="50" cy="50" r="9" className="animate-pulse fill-primary" />
      </svg>
    </figure>
  )
}

function Entry({ exp }: { exp: Experience }) {
  const ref = useRef<HTMLLIElement>(null)
  return (
    <li ref={ref} className="relative">
      <Marker target={ref} />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
        className="rounded-2xl border border-border bg-muted/60 p-4 md:p-7"
      >
        <div className="flex flex-wrap items-start gap-4">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white md:h-14 md:w-14">
            <Image src={exp.logo} alt={`${exp.company} logo`} fill sizes="56px" className="object-contain p-1.5" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-bold leading-snug md:text-3xl">
              {exp.role} <span className="text-primary">@{exp.company}</span>
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted-foreground md:text-sm">
              <span>{exp.period}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{exp.location}</span>
            </p>
          </div>
          {exp.metric && (
            <span className="basis-full rounded-xl border border-primary/50 bg-primary/10 px-3 py-2 text-center sm:basis-auto">
              <span className="block font-display text-xl font-bold text-glow md:text-2xl">−{Math.round((1 - exp.metric.to / exp.metric.from) * 100)}%</span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{exp.metric.label}</span>
            </span>
          )}
        </div>

        <p className="mt-3 text-sm font-medium text-foreground/90 md:mt-4 md:text-base">{exp.summary}</p>
        <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-muted-foreground md:mt-3 md:space-y-2 md:text-base">
          {exp.points.map((pt) => <li key={pt} className="flex gap-2"><span className="mt-0.5 text-primary">▹</span>{pt}</li>)}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((t) => <span key={t} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-foreground/80">{t}</span>)}
          </div>
          <div className="flex gap-2">
            {exp.github && (
              <a href={exp.github} target="_blank" rel="noopener noreferrer" className="wobble inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm hover:border-primary hover:text-secondary">
                <Github className="h-4 w-4" /> Repo
              </a>
            )}
            {exp.certificate && (
              <a href={exp.certificate} target="_blank" rel="noopener noreferrer" className="wobble inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground">
                <Award className="h-4 w-4" /> Certificate
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </li>
  )
}

/** CodeBucks-style experience timeline: a rail that draws itself as you scroll, one ring per role. */
export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center start"] })

  return (
    <section id="experience" className="relative px-6 py-16 sm:px-12 md:py-24 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <LayerHeader id="experience" title="Experience." caption="Where I've shipped real systems for real teams." note="where i've worked" />
        <div ref={ref} className="relative mx-auto max-w-4xl pl-12 md:pl-20">
          <span className="absolute left-[23px] top-0 h-full w-[3px] rounded-full bg-border md:left-[27px]" />
          <motion.span style={{ scaleY: scrollYProgress }} className="absolute left-[23px] top-0 h-full w-[3px] origin-top rounded-full bg-primary shadow-[0_0_12px_var(--primary)] md:left-[27px]" />
          <ul className="space-y-10 md:space-y-14">
            {experiences.map((exp) => <Entry key={exp.company} exp={exp} />)}
          </ul>
        </div>
      </div>
    </section>
  )
}
