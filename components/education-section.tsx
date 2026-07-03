"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar, Award, ExternalLink } from "lucide-react"

const education = [
  {
    degree: "B.Tech. in Computer Science (Specialization in AI/ML)",
    school: "Vellore Institute of Technology, Vellore, Tamil Nadu",
    period: "July 2023 – Present",
    description: "CGPA: 9.26",
  },
  {
    degree: "Class XII (CBSE)",
    school: "Delhi Public School, Ranchi, Jharkhand",
    period: "Apr 2020 – Mar 2022",
    description: "Percentage: 93.6%",
  },
  {
    degree: "Class X (CBSE)",
    school: "Delhi Public School, Ranchi, Jharkhand",
    period: "Apr 2018 – Mar 2020",
    description: "Percentage: 94%",
  },
]

const certifications = [
  {
    title: "IBM Generative AI Certificate",
    issuer: "VIT",
    period: "May 2025",
    linkText: "View Certificate",
    link: "https://drive.google.com/file/d/1B9xG47UtZXMmRziXadvySNTsbJ9OjihQ/view?usp=sharing"
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University, Coursera",
    period: "Completed",
    linkText: "View Certificate",
    link: "https://drive.google.com/file/d/1ERTUzOq7BtbTY7MEtl3fvJ7Zh_yFWPMg/view?usp=sharing"
  },
  {
    title: "Forage Virtual Experience Programs",
    issuer: [
      "British Airways (Data Science)",
      "Deloitte (Data Analytics)",
      "Quantium (Commercial Analytics)",
      "Tata Group (GenAI)"
    ],
    period: "Completed",
    linkText: "View All",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7412005178058637313/"
  },
]

export function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="education" className="py-12 px-4 md:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Education Block */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4">
              <span className="text-primary">Education</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 md:mb-12 rounded-full" />
          </motion.div>

          <div className="w-full">
            {/* Mobile Vertical Timeline */}
            <div className="relative md:hidden mt-6 space-y-6 pb-8">
              {/* Timeline line with arrow */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-t from-primary/20 via-primary/50 to-primary">
                <div className="absolute -top-1 -left-[5px] w-3 h-3 border-t-2 border-l-2 border-primary transform rotate-45" />
              </div>

              {education.map((item, index) => {
                const isVIT = index === 0; // VIT is first in the original array
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-10 pr-2"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                      className={`relative rounded-full bg-primary shadow-lg shadow-primary/50 ring-4 ring-background ${isVIT ? 'w-5 h-5 ring-4' : 'w-3.5 h-3.5'}`}
                    >
                      {isVIT && <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className={`relative bg-[var(--glass-bg)] backdrop-blur-xl border rounded-xl p-3.5 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${isVIT ? 'border-primary shadow-primary/20' : 'border-[var(--glass-border)] hover:border-primary/30'}`}
                  >
                    {isVIT && (
                      <div className="absolute -top-2.5 -right-1 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg z-10">
                        CURRENT
                      </div>
                    )}
                    
                    {/* Period badge */}
                    <div className={`flex items-center gap-1.5 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit mb-2 ${isVIT ? 'bg-primary/20' : ''}`}>
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </div>

                    {/* Degree */}
                    <div className="flex items-start gap-2 mb-1.5">
                      <GraduationCap className={`text-primary mt-0.5 shrink-0 ${isVIT ? 'w-5 h-5' : 'w-4 h-4'}`} />
                      <h3 className={`font-bold text-foreground leading-tight ${isVIT ? 'text-sm text-primary' : 'text-xs'}`}>
                        {item.degree}
                      </h3>
                    </div>

                    {/* School */}
                    <p className="text-primary/80 font-medium mb-1.5 text-xs">{item.school}</p>

                    {/* Description */}
                    <p className="text-muted-foreground text-xs font-semibold">{item.description}</p>
                  </motion.div>
                </motion.div>
              )})}
            </div>

            {/* Desktop Horizontal Wavy Timeline */}
            <div className="hidden md:block relative w-full h-[600px] mt-10">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 400">
                {/* Wavy line connecting the dots */}
                <path 
                  d="M 50,200 Q 275,50 500,200 T 950,200" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeDasharray="10 10" 
                  strokeWidth="3" 
                  className="text-primary/50" 
                />
                {/* Lines extending outwards to edges */}
                <path d="M -50,200 L 50,200" fill="none" stroke="currentColor" strokeDasharray="10 10" strokeWidth="3" className="text-primary/20" />
                <path d="M 950,200 L 1050,200" fill="none" stroke="currentColor" strokeDasharray="10 10" strokeWidth="3" className="text-primary/20" />
              </svg>

              {[...education].reverse().map((item, index) => {
                const positions = ["left-[5%]", "left-[50%]", "left-[95%]"];
                const isVIT = index === 2; // VIT is the 3rd one in reversed array
                const isTop = index === 1; // Class XII goes top

                return (
                  <div key={index} className={`absolute top-[50%] ${positions[index]} -translate-x-1/2 -translate-y-1/2 z-10`}>
                    
                    {/* The Dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.3 }}
                      className={`relative rounded-full bg-primary shadow-lg shadow-primary/50 ring-4 ring-background mx-auto z-20 ${isVIT ? 'w-8 h-8 ring-8' : 'w-5 h-5'}`}
                    >
                      {isVIT && <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />}
                    </motion.div>

                    {/* The Card */}
                    <motion.div
                      initial={{ opacity: 0, y: isTop ? 30 : -30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
                      className={`absolute w-[300px] lg:w-[350px] bg-[var(--glass-bg)] backdrop-blur-xl border ${isVIT ? 'border-primary shadow-primary/20' : 'border-[var(--glass-border)]'} rounded-xl p-6 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:z-30 ${isTop ? 'bottom-full mb-8' : 'top-full mt-8'} ${index === 0 ? 'left-[-20px] lg:left-[-40px]' : index === 2 ? 'right-[-20px] lg:right-[-40px]' : 'left-1/2 -translate-x-1/2'} ${isVIT ? 'scale-105 hover:scale-110 origin-top-right' : ''}`}
                    >
                      {isVIT && (
                        <div className="absolute -top-4 -right-3 bg-primary text-primary-foreground text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                          CURRENT
                        </div>
                      )}
                      <div className={`flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-3 ${isVIT ? 'bg-primary/20' : ''}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </div>

                      <div className="flex items-start gap-3 mb-2">
                        <GraduationCap className={`text-primary mt-0.5 shrink-0 ${isVIT ? 'w-7 h-7' : 'w-5 h-5'}`} />
                        <h3 className={`font-semibold text-foreground leading-tight ${isVIT ? 'text-xl text-primary' : 'text-base'}`}>
                          {item.degree}
                        </h3>
                      </div>

                      <p className="text-primary/80 font-medium mb-3 text-sm ml-8 lg:ml-10">{item.school}</p>
                      
                      <p className="text-muted-foreground text-sm ml-8 lg:ml-10 font-semibold">{item.description}</p>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Certifications Block */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4">
              Certifications & <span className="text-primary">Training</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-8 md:mb-12 rounded-full" />
          </motion.div>

          {/* Mobile: single column, equal-height rectangular cards */}
          <div className="grid grid-cols-1 gap-6 mt-8 px-1 md:hidden">
            {certifications.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Tape */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-muted-foreground/25 rotate-[-2deg] shadow-sm z-10" />

                <div className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl p-4 shadow-lg hover:shadow-xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden flex flex-col gap-3">
                  {/* Glow blob */}
                  <div className="absolute -right-6 -top-6 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

                  {/* Top row: icon + title + period badge */}
                  <div className="relative z-10 flex items-start gap-3">
                    <Award className="w-6 h-6 text-primary/60 group-hover:text-primary shrink-0 mt-0.5 transition-colors duration-300" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-foreground leading-snug">{item.title}</h3>
                    </div>
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">{item.period}</span>
                  </div>

                  {/* Issuer — wraps freely, no truncation */}
                  <div className="relative z-10 pl-9">
                    {Array.isArray(item.issuer) ? (
                      <ul className="text-primary/80 text-xs font-medium space-y-1 list-disc list-outside pl-3">
                        {item.issuer.map((iss, idx) => (
                          <li key={idx}>{iss}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-primary/80 text-xs font-medium">{item.issuer}</p>
                    )}
                  </div>

                  {/* Link button */}
                  <div className="relative z-10 pl-9 pt-1">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground bg-[var(--glass-bg)] border border-[var(--glass-border)] px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.linkText}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: original tilted note-card grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4">
            {certifications.map((item, index) => {
              const rotateClass = index % 2 === 0 ? "rotate-2" : "-rotate-2";
              const hoverRotateClass = index % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1";

              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group ${rotateClass} transition-transform duration-500`}
              >
                {/* Slam book tape effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-muted-foreground/20 backdrop-blur-sm rotate-[-3deg] shadow-sm z-10" />

                <motion.div
                  className={`h-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 ${hoverRotateClass} hover:-translate-y-2 relative overflow-hidden`}
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full items-start text-left">
                    <div className="flex justify-between items-start mb-6 w-full">
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </div>
                      <Award className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground leading-tight mb-2">
                      {item.title}
                    </h3>
                    
                    {Array.isArray(item.issuer) ? (
                      <ul className="text-primary/80 font-medium mb-6 text-sm list-disc list-outside pl-4 space-y-1.5 text-left w-full">
                        {item.issuer.map((iss, idx) => (
                          <li key={idx}>{iss}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-primary/80 font-medium mb-6 text-sm">{item.issuer}</p>
                    )}

                    <div className="mt-auto pt-4 flex w-full justify-start">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-foreground bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-sm px-5 py-2.5 rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn"
                      >
                        {item.linkText}
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}
