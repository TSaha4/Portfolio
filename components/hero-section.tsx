"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"

const taglines = [
  "AI & Machine Learning Engineer",
  "Full Stack Developer",
  "Building Intelligent Systems",
  "Designing Systems that Think and Adapt",
  "Turning Ideas into Real-World Impact",
];

const socialLinks = [
  { 
    icon: Github, 
    href: "https://github.com/TSaha4", 
    label: "GitHub",
    hoverColor: "hover:!bg-[#333] dark:hover:!bg-[#f0f0f0]",
    hoverText: "hover:!text-white dark:hover:!text-[#333]",
    mobileClass: "bg-[#333] text-white dark:bg-[#f0f0f0] dark:text-[#333] md:bg-muted md:text-foreground md:dark:bg-muted md:dark:text-foreground"
  },
  { 
    icon: Linkedin, 
    href: "https://www.linkedin.com/in/tanmoy-saha-4b0ab228a/", 
    label: "LinkedIn",
    hoverColor: "hover:!bg-[#0A66C2]",
    hoverText: "hover:!text-white",
    mobileClass: "bg-[#0A66C2] text-white md:bg-muted md:text-foreground md:dark:bg-muted md:dark:text-foreground"
  },
  { 
    icon: Mail, 
    href: "mailto:s.tanmoy2004@gmail.com", 
    label: "Email",
    hoverColor: "hover:!bg-[#EA4335]",
    hoverText: "hover:!text-white",
    mobileClass: "bg-[#EA4335] text-white md:bg-muted md:text-foreground md:dark:bg-muted md:dark:text-foreground"
  },
]

const buttonVariants = {
  hover: {
    scale: 1.10,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

const iconVariants = {
  hover: {
    rotate: [0, -15, 12, -10, 7, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}

const marqueeItems = [
  // Row 1 items (left scroll)
  "Python", "C/C++", "Java", "Kotlin",
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
  "Reinforcement Learning", "RAG", "PyTorch", "scikit-learn",
  "MediaPipe", "OpenCV", "FAISS", "Pandas", "NumPy",
  "SQL", "PostgreSQL", "MongoDB", "Docker",
  "Flask", "FastAPI", "REST APIs", "Jetpack Compose",
  "Data Structures", "System Design", "OOPs", "Database Systems",
]

interface HeroSectionProps {
  onScrollPast: (isPast: boolean) => void
}

export function HeroSection({ onScrollPast }: HeroSectionProps) {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  // Typing animation
  useEffect(() => {
    const currentTagline = taglines[taglineIndex]
    const typingSpeed = isDeleting ? 15 : 30
    const pauseTime = 1500

    if (!isDeleting && displayText === currentTagline) {
      setTimeout(() => setIsDeleting(true), pauseTime)
      return
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setTaglineIndex((prev) => (prev + 1) % taglines.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentTagline.substring(0, displayText.length - 1)
          : currentTagline.substring(0, displayText.length + 1)
      )
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, taglineIndex])

  // Scroll detection for navbar transition and scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 40)
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetHeight * 0.7
        onScrollPast(window.scrollY > heroBottom)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [onScrollPast])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      const navHeight = 80
      const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-between relative overflow-hidden pt-12 md:pt-16 pb-12 md:pb-16"
    >
      {/* Main hero content — centered */}
      <div className="flex-1 flex items-center justify-center px-4 py-2 md:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-center md:text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-xl text-muted-foreground mb-1 md:mb-2"
              >
                Hello,
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4"
              >
                {"I'm "}
                <span className="text-primary">Tanmoy Saha</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-2xl lg:text-3xl text-muted-foreground mb-6 md:mb-8 h-8 md:h-10"
              >
                <span className="typing-cursor">{displayText}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center md:justify-start"
              >
                <button
                  onClick={scrollToAbout}
                  className="px-6 py-2.5 md:px-8 md:py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25 text-sm md:text-base"
                >
                  About Me
                </button>

                <div className="flex items-center gap-3 md:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover="hover"
                      variants={buttonVariants}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`p-2.5 md:p-3 rounded-full transition-[color,background-color,border-color,box-shadow] duration-300 ${social.mobileClass} ${social.hoverColor} ${social.hoverText}`}
                      aria-label={social.label}
                    >
                      <motion.div variants={iconVariants} className="flex items-center justify-center">
                        <social.icon className="w-4.5 h-4.5 md:w-5 md:h-5" />
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-44 h-44 md:w-72 md:h-72 lg:w-[320px] lg:h-[320px]">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                <div className="absolute inset-3 rounded-full border-2 border-secondary/30" />

                {/* Profile image */}
                <div className="absolute inset-4 md:inset-6 rounded-full overflow-hidden border-4 border-primary shadow-2xl shadow-primary/20">
                  <Image
                    src="/profile.webp"
                    alt="Tanmoy Saha"
                    fill
                    sizes="(max-w-768px) 176px, (max-w-1024px) 288px, 320px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/20 backdrop-blur-sm"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary/30 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee Band — slim ribbon layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative w-full overflow-hidden select-none border-y border-primary/30 bg-primary/[0.04] py-2 -mt-10 mb-6"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-36 bg-gradient-to-r from-[#0F0F1A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-36 bg-gradient-to-l from-[#0F0F1A] to-transparent" />

        {/* Row 1 — scrolls left */}
        <div className="marquee-row mb-1">
          <div className="marquee-track marquee-left">
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-6 md:gap-12" aria-hidden={copy === 1}>
                {marqueeItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 md:gap-12">
                    {i % 2 === 0 ? (
                      // Yellow words - Sixtyfour
                      <span className="marquee-word yellow whitespace-nowrap text-sm md:text-base uppercase text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]">
                        {item}
                      </span>
                    ) : (
                      // White words - Sixtyfour
                      <span className="marquee-word white whitespace-nowrap text-sm md:text-base uppercase text-foreground/90">
                        {item}
                      </span>
                    )}
                    <span className="text-primary/40 text-xs md:text-sm">✦</span>
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
              <div key={copy} className="flex shrink-0 items-center gap-6 md:gap-12" aria-hidden={copy === 1}>
                {[...marqueeItems].reverse().map((item, i) => (
                  <div key={i} className="flex items-center gap-6 md:gap-12">
                    {i % 2 === 0 ? (
                      // White words for this row starts with Sixtyfour
                      <span className="marquee-word white whitespace-nowrap text-sm md:text-base uppercase text-foreground/90">
                        {item}
                      </span>
                    ) : (
                      // Yellow words - Sixtyfour
                      <span className="marquee-word yellow whitespace-nowrap text-sm md:text-base uppercase text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.4)]">
                        {item}
                      </span>
                    )}
                    <span className="text-primary/30 text-xs md:text-sm">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — vanishes when scrolled */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isAtTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 ${isAtTop ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-[11px] md:text-xs font-medium">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
