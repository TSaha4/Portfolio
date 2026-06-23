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

interface HeroSectionProps {
  onScrollPast: (isPast: boolean) => void
}

export function HeroSection({ onScrollPast }: HeroSectionProps) {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
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

  // Scroll detection for navbar transition
  useEffect(() => {
    const handleScroll = () => {
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
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
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
              className="text-lg md:text-xl text-muted-foreground mb-2"
            >
              Hi There,
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              {"I'm "}
              <span className="text-primary">Tanmoy Saha</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 h-10"
            >
              <span className="typing-cursor">{displayText}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start"
            >
              <button
                onClick={scrollToAbout}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                About Me
              </button>

              <div className="flex items-center gap-4">
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
                    className={`p-3 rounded-full transition-[color,background-color,border-color,box-shadow] duration-300 ${social.mobileClass} ${social.hoverColor} ${social.hoverText}`}
                    aria-label={social.label}
                  >
                    <motion.div variants={iconVariants} className="flex items-center justify-center">
                      <social.icon className="w-5 h-5" />
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
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
              <div className="absolute inset-3 rounded-full border-2 border-secondary/30" />
              
              {/* Profile image */}
              <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-primary shadow-2xl shadow-primary/20">
                <Image
                  src="/profile.jpg"
                  alt="Tanmoy Saha"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-secondary/30 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
