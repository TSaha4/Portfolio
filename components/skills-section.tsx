"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

import { Brain, Bot, Network, Database, Layers, Radar, Binary, Search, Eye, MessageSquareText, Workflow, BarChart, Server, Triangle } from "lucide-react"

const skills = [
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Hugging Face", icon: Brain, color: "#facc15" },
  { name: "NLP", icon: MessageSquareText, color: "#a855f7" },
  { name: "Agentic AI", icon: Bot, color: "#f97316" },
  { name: "SentenceTransformers", icon: MessageSquareText, color: "#4ade80" },
  { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "MediaPipe", icon: Eye, color: "#0ea5e9" },
  { name: "FAISS", icon: Search, color: "#6366f1" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", invertDark: true },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invertDark: true },
  { name: "REST APIs", icon: Network, color: "#64748b" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "pgvector", icon: Database, color: "#336791" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invertDark: true },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MERN Stack", icon: Layers, color: "#22c55e" },
  { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "Matplotlib", icon: BarChart, color: "#115e59" },
  { name: "Seaborn", icon: Radar, color: "#38bdf8" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Vercel", icon: Triangle },
  { name: "Streamlit", icon: Layers, color: "#ff4b4b" }
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-20 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-3 lg:gap-3.5 group/skills"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="relative w-[72px] sm:w-[84px] md:w-[90px] lg:w-[88px] xl:w-[92px] flex-shrink-0"
            >
              <div
                className="flex flex-col items-center justify-start py-3 px-1 sm:p-4 rounded-xl bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] transition-all duration-500 h-full md:grayscale md:opacity-60 md:group-hover/skills:grayscale md:group-hover/skills:opacity-30 md:hover:!grayscale-0 md:hover:!opacity-100 md:hover:scale-110 md:hover:bg-primary/10 md:hover:border-primary/50 md:hover:shadow-xl md:hover:shadow-primary/20 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center mb-2 flex-shrink-0">
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
                <span className="text-[10px] sm:text-xs font-semibold text-center text-foreground leading-tight break-words whitespace-normal w-full md:px-1">
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
