"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Building, Calendar, MapPin, Briefcase, Github, ExternalLink } from "lucide-react"

const experiences = [
  {
    role: "Tech Intern",
    company: "NTPC Vindhyachal",
    location: "Madhya Pradesh",
    period: "May – June 2026",
    summary: "Built an enterprise RAG chatbot with automated ticket resolution and email notifications",
    points: [
      "Built a Gemini 2.5 Flash & sentence-transformer RAG pipeline to automate support ticket resolution and email notifications.",
      "Cut repeat-query response latency by 90% (from ~3s to ~300ms) by implementing semantic caching and confidence-scoring filters.",
      "Established a self-improving flow: resolved tickets are auto-embedded and indexed, allowing the chatbot to answer future queries without human intervention."
    ],
    tech: ["Next.js", "TypeScript", "MongoDB Atlas", "Sentence Transformers", "Gemini", "FastAPI", "RAG"],
    // Links and images customizable by user
    bannerImg: "/project_imgs/ntpc.png", 
    logoImg: "/NTPC-logo.png",
    github: "https://github.com/TSaha4/AI_Based_Chatbot.git",
    certificate: "https://drive.google.com/file/d/1B9xG47UtZXMmRziXadvySNTsbJ9OjihQ/view?usp=sharing"
  }
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [bannerError, setBannerError] = useState<Record<number, boolean>>({})
  const [logoError, setLogoError] = useState<Record<number, boolean>>({})

  return (
    <section id="experience" className="py-12 md:py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 md:mb-12 rounded-full" />
        </motion.div>

        {/* Experience List Container */}
        <div className="flex flex-col items-center gap-8">
          {experiences.map((exp, index) => {
            const hasBanner = exp.bannerImg && !bannerError[index]
            const hasLogo = exp.logoImg && !logoError[index]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="w-full max-w-2xl bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-primary/40 hover:scale-[1.01] transition-all duration-300 group"
              >
                {/* Banner / Header Image Area */}
                <div className="relative h-44 md:h-64 w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-[var(--glass-border)]">
                  {hasBanner ? (
                    <img
                      src={exp.bannerImg}
                      alt={`${exp.company} Banner`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => setBannerError(prev => ({ ...prev, [index]: true }))}
                    />
                  ) : (
                    /* Elegant CSS Animated Cyberpunk Banner Placeholder */
                    <div className="absolute inset-0 bg-grid-pattern opacity-25 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10" />
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-primary/10 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Badge layout wrapper: Content area with Company Logo overlap */}
                <div className="relative px-4 pb-4 pt-12 md:px-6 md:pb-6 md:pt-14 flex flex-col">
                  
                  {/* Company Logo in rectangular frame overlapping banner */}
                  <div className="absolute -top-8 md:-top-10 left-4 md:left-6 z-20">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-background border-2 border-primary overflow-hidden shadow-lg flex items-center justify-center">
                      {hasLogo ? (
                        <img
                          src={exp.logoImg}
                          alt={`${exp.company} Logo`}
                          className="w-full h-full object-cover"
                          onError={() => setLogoError(prev => ({ ...prev, [index]: true }))}
                        />
                      ) : (
                        /* Elegant Rectangular Logo Placeholder */
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Header Title Information */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2.5 mb-3 md:mb-4">
                    <div>
                      <h3 className="text-lg md:text-2xl font-extrabold text-primary">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 md:gap-x-3 gap-y-0.5 mt-0.5 text-xs md:text-sm font-semibold text-primary/95">
                        <span className="text-sm md:text-base font-bold text-foreground/90">{exp.company}</span>
                        <span className="text-muted-foreground opacity-60">•</span>
                        <span className="flex items-center gap-1 font-medium text-muted-foreground/80">
                          <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Duration Badge inside card */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/5 text-xs font-bold text-primary w-fit self-start md:self-center shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Internship Summary */}
                  <p className="text-xs md:text-sm font-semibold text-foreground/90 mb-3 md:mb-4 bg-primary/5 border border-primary/10 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-2.5 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Detailed Accomplishments */}
                  <ul className="space-y-2 mb-4 md:mb-6 text-xs md:text-sm text-muted-foreground/95 pl-4 list-disc list-outside">
                    {exp.points.map((point, ptIdx) => (
                      <li key={ptIdx} className="leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    {exp.github && (
                      <a
                        href={exp.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-background/85 backdrop-blur-md border border-[var(--glass-border)] text-xs md:text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md hover:-translate-y-0.5"
                      >
                        <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span>GitHub Repo</span>
                        <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3 opacity-60" />
                      </a>
                    )}
                    {exp.certificate && (
                      <a
                        href={exp.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-background/85 backdrop-blur-md border border-[var(--glass-border)] text-xs md:text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md hover:-translate-y-0.5"
                      >
                        <Briefcase className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        <span>Certificate</span>
                        <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3 opacity-60" />
                      </a>
                    )}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 pt-3 md:pt-4 border-t border-[var(--glass-border)] mt-auto">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 md:px-3 md:py-1 text-[11px] md:text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
