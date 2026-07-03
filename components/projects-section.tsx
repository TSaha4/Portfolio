"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Github, ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from "lucide-react"

const projects = [
  {
    title: "Drone Flood-Relief Mission Planner",
    description: "Converts flood maps into executable drone missions by detecting safe drop zones and generating optimized flight paths using geometric analysis and TSP heuristics. Outputs MAVLink waypoint files ready for real-world UAV deployment.",
    image: "/project_imgs/drone.png",
    tech: ["Python", "OpenCV", "NumPy", "Matplotlib"],
    github: "https://github.com/TSaha4/AI-Powered-Drone-Path-Planning-System-for-Flood-Relief",
  },
  {
    title: "Latch – Auto WiFi Login App",
    description: "An Android app that automatically detects hostel WiFi networks and logs users in seamlessly, eliminating repetitive manual authentication and improving everyday usability.",
    image: "/project_imgs/latch.png",
    tech: ["Kotlin", "Jetpack Compose", "Firebase"],
    github: "https://github.com/vinnovateit/auto-net-connector",
  },
  {
    title: "UPRYT – RL-Based Posture Correction System",
    description: "A real-time posture analysis system that uses reinforcement learning to deliver adaptive feedback. Learns user behavior to optimize correction strategies, reducing alert fatigue while improving posture over time.",
    image: "/project_imgs/upryt.png",
    tech: ["Python", "PyTorch", "OpenCV", "MediaPipe"],
    github: "https://github.com/TSaha4/Real_Time_Posture_Analysis_RL_Project",
  },
  {
    title: "MediBot – AI Medical Chatbot",
    description: "An AI chatbot that predicts diseases from symptoms using a hybrid NLP pipeline combining semantic embeddings, fuzzy matching, and vector search for accurate, real-time responses.",
    image: "/project_imgs/medibot.png",
    tech: ["Python", "Flask", "IBM Watson", "FAISS", "SentenceTransformers"],
    github: "https://github.com/TSaha4/MediBot---Virtual-medical-Chatbot",
  },
  {
    title: "College Feedback Classifier",
    description: "A dual-model NLP system using DeBERTa and RoBERTa to classify feedback by category and sentiment, achieving 90%+ accuracy and enabling deeper insights into user opinions.",
    image: "/project_imgs/college.png",
    tech: ["PyTorch", "Hugging Face Transformers", "scikit-learn"],
    github: "https://github.com/TSaha4/College_Feedback_Classifier",
  }
]

export function ProjectsSection() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Progress bar drag state
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [isDraggingBar, setIsDraggingBar] = useState(false)

  const handleProgressBarInteraction = useCallback((clientX: number, isDragging: boolean) => {
    if (!progressBarRef.current || !scrollRef.current) return
    
    const { left, width } = progressBarRef.current.getBoundingClientRect()
    let newProgress = (clientX - left) / width
    newProgress = Math.max(0, Math.min(1, newProgress))
    
    const { scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    
    scrollRef.current.scrollTo({
      left: newProgress * maxScroll,
      behavior: isDragging ? "auto" : "smooth"
    })
  }, [])

  useEffect(() => {
    if (!isDraggingBar) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault() // prevent selection while dragging
      handleProgressBarInteraction(e.clientX, true)
    }

    const handleGlobalMouseUp = () => {
      setIsDraggingBar(false)
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    window.addEventListener("mouseup", handleGlobalMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove)
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDraggingBar, handleProgressBarInteraction])

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0
      setScrollProgress(progress)
    }
  }, [])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      checkScrollButtons()
      scrollElement.addEventListener("scroll", checkScrollButtons)
      window.addEventListener("resize", checkScrollButtons)
      return () => {
        scrollElement.removeEventListener("scroll", checkScrollButtons)
        window.removeEventListener("resize", checkScrollButtons)
      }
    }
  }, [checkScrollButtons])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 420 + 24 : 340 + 24 // card width + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section id="projects" className="py-12 md:py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 md:mb-12 rounded-full" />
        </motion.div>
      </div>

      {/* Projects container with arrows */}
      <div className="relative">
        {/* Left Arrow - Desktop only */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollLeft ? 1 : 0 }}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-lg hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 disabled:pointer-events-none"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </motion.button>

        {/* Right Arrow - Desktop only */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollRight ? 1 : 0 }}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-lg hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 disabled:pointer-events-none"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </motion.button>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto px-6 pb-6 md:px-16 lg:px-24 scrollbar-hide ${isDraggingBar ? "snap-none" : "snap-x snap-mandatory"}`}
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
           {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[290px] sm:w-[340px] md:w-[420px] snap-center"
            >
              <div className="group h-[390px] sm:h-[430px] md:h-[470px] flex flex-col bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative">
                {/* Mobile Click Overlay */}
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="absolute inset-x-0 top-0 h-[65%] z-10 md:hidden" aria-label={`View ${project.title} on GitHub`} />
                
                {/* Project Image */}
                <div className="relative h-[55%] sm:h-[65%] w-full overflow-hidden shrink-0 pointer-events-none md:pointer-events-auto">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Bottom Right GitHub Link Badge */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20 hidden md:block">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-background/90 backdrop-blur-md border border-[var(--glass-border)] shadow-lg hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 group/btn"
                      aria-label="View on GitHub"
                    >
                      <span className="text-xs md:text-sm font-bold">GitHub</span>
                      <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 md:p-6 flex flex-col flex-1 overflow-y-auto scrollbar-hide">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-primary">{project.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 md:px-3 md:py-1 text-[11px] md:text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* GitHub Explore More Link - Desktop & Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: projects.length * 0.1 }}
            className="flex flex-shrink-0 items-center justify-center pl-4 pr-12 md:pl-8 md:pr-16 snap-center"
          >
            <a 
              href="https://github.com/TSaha4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 text-primary md:text-muted-foreground transition-all duration-300"
            >
              <span className="text-sm font-semibold tracking-widest uppercase opacity-100 md:opacity-70 group-hover:opacity-100 md:group-hover:text-primary transition-all duration-300">Explore more</span>
              <Github className="w-10 h-10 transition-all duration-500 md:group-hover:scale-125 md:group-hover:-translate-y-2 text-[#24292f] dark:text-white md:text-muted-foreground md:group-hover:text-[#24292f] dark:md:group-hover:text-white md:group-hover:drop-shadow-xl" />
              
              {/* Long-tailed solid arrow matching lucide-react style */}
              <svg 
                className="w-12 h-6 md:w-16 md:h-6 transition-transform duration-500 md:group-hover:translate-x-3 text-primary opacity-100 md:opacity-50 md:group-hover:opacity-100 mt-1" 
                viewBox="0 0 48 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12h44" />
                <path d="m36 5 10 7-10 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Pill Progress Bar - Desktop only */}
        <div className="hidden md:flex justify-center mt-8">
          <div 
            className="w-48 h-8 flex items-center justify-center cursor-pointer group touch-none"
            onMouseDown={(e) => {
              setIsDraggingBar(true)
              handleProgressBarInteraction(e.clientX, false)
            }}
          >
            <div 
              ref={progressBarRef}
              className="w-full h-2 rounded-full bg-muted/50 overflow-hidden relative"
            >
              <motion.div 
                className="absolute left-0 top-0 h-full rounded-full bg-primary group-hover:bg-primary/80 transition-colors"
                style={{ width: `${scrollProgress * 100}%` }}
                transition={{ duration: isDraggingBar ? 0 : 0.1 }}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator dots - Mobile only */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {projects.map((_, index) => {
            const isActive = Math.round(scrollProgress * (projects.length - 1)) === index;
            return (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${isActive ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
            />
          )})}
        </div>
      </div>
    </section>
  )
}
