"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from "lucide-react"

const taglines = [
  "AI & Machine Learning Engineer",
  "Full Stack Developer",
  "Building Intelligent Systems",
  "Designing Systems that Think and Adapt",
  "Turning Ideas into Real-World Impact",
]

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
    scale: 1.15,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

const iconVariants = {
  hover: {
    rotate: [0, -18, 14, -10, 8, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
}

const marqueeItems = [
  "Python", "C/C++", "Java", "Kotlin",
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
  "Reinforcement Learning", "RAG", "PyTorch", "scikit-learn",
  "MediaPipe", "OpenCV", "FAISS", "Pandas", "NumPy",
  "SQL", "PostgreSQL", "MongoDB", "Docker",
  "Flask", "FastAPI", "REST APIs", "Jetpack Compose",
  "Data Structures", "System Design", "OOPs", "Database Systems",
]

/**
 * Playful MagneticItem: smoothly pulls element toward cursor when hovered
 */
function MagneticItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPos({ x: middleX * 0.28, y: middleY * 0.28 })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 320, damping: 20, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * FluidName – Smooth, fluid letter-by-letter hover wave across "Tanmoy Saha"
 * Gentle vertical displacement, smooth timing, soft golden illumination.
 */
function FluidName({ name }: { name: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className="inline-flex flex-wrap items-center cursor-default select-none py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name.split("").map((char, index) => (
        <FluidChar
          key={index}
          char={char}
          index={index}
          isWaveActive={isHovered}
        />
      ))}
    </span>
  )
}

function FluidChar({
  char,
  index,
  isWaveActive,
}: {
  char: string
  index: number
  isWaveActive: boolean
}) {
  const [isDirectHover, setIsDirectHover] = useState(false)

  if (char === " ") {
    return <span className="inline-block w-2.5 md:w-3.5">&nbsp;</span>
  }

  return (
    <motion.span
      className="inline-block relative select-none origin-bottom will-change-transform text-primary font-bold"
      onMouseEnter={() => setIsDirectHover(true)}
      onMouseLeave={() => setIsDirectHover(false)}
      animate={
        isDirectHover
          ? {
              y: -8,
              scale: 1.08,
              color: "#FFF59D",
              textShadow: "0 0 16px rgba(255, 229, 0, 0.7)",
            }
          : isWaveActive
          ? {
              y: [0, -6, 0],
              color: ["#D4AF37", "#FFE500", "#D4AF37"],
              textShadow: [
                "0 0 0px transparent",
                "0 0 12px rgba(255, 229, 0, 0.5)",
                "0 0 0px transparent",
              ],
            }
          : {
              y: 0,
              scale: 1,
              color: "#D4AF37",
              textShadow: "0 0 0px transparent",
            }
      }
      transition={
        isDirectHover
          ? { type: "spring", stiffness: 350, damping: 20 }
          : {
              duration: 0.75,
              delay: isWaveActive ? index * 0.045 : 0,
              ease: "easeInOut",
            }
      }
    >
      {char}
    </motion.span>
  )
}

/**
 * WavingHand – Clean, delightful waving hand with smooth natural physics.
 * - Natural wrist pivot wave
 * - Gentle scale on hover
 * - Smooth wave-back reaction when clicked
 */
function WavingHand() {
  const [isHovered, setIsHovered] = useState(false)
  const [isWaved, setIsWaved] = useState(false)

  const handleClick = () => {
    setIsWaved(true)
    setTimeout(() => setIsWaved(false), 1400)
  }

  return (
    <span className="relative inline-flex items-center ml-1.5 align-middle">
      <motion.span
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-block origin-[70%_75%] cursor-pointer select-none text-2xl md:text-3xl"
        animate={
          isWaved
            ? {
                rotate: [0, 18, -12, 18, -10, 14, 0],
                scale: [1, 1.25, 1.2, 1.25, 1],
              }
            : isHovered
            ? {
                rotate: [0, 14, -8, 14, -6, 10, 0],
                scale: 1.15,
              }
            : {
                rotate: 0,
                scale: 1,
              }
        }
        transition={{
          duration: isWaved ? 1.0 : 0.8,
          ease: "easeInOut",
          repeat: isHovered && !isWaved ? Infinity : 0,
          repeatDelay: 0.6,
        }}
        title="Click to wave back!"
      >
        👋
      </motion.span>

      {/* Clean, subtle feedback pill on click */}
      <AnimatePresence>
        {isWaved && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.85 }}
            animate={{ opacity: 1, y: -26, scale: 1 }}
            exit={{ opacity: 0, y: -32, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-background/90 border border-primary/40 backdrop-blur-md text-[10px] font-semibold text-foreground whitespace-nowrap pointer-events-none flex items-center gap-1 shadow-lg shadow-primary/20 z-30"
          >
            <span>Waved back!</span>
            <span className="text-[#FFE500]">✨</span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

interface HeroSectionProps {
  onScrollPast: (isPast: boolean) => void
}

export function HeroSection({ onScrollPast }: HeroSectionProps) {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  // ── 3D Tilt & Coin-Spin State for Profile Avatar ──
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 })
  const [isProfileHovered, setIsProfileHovered] = useState(false)
  const [isCoinSpinning, setIsCoinSpinning] = useState(false)

  const handleProfileClick = () => {
    if (isCoinSpinning) return
    setIsCoinSpinning(true)
    setTimeout(() => {
      setIsCoinSpinning(false)
    }, 1050)
  }

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCoinSpinning) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // ±16 degrees max 3D tilt
    const rotateX = ((y - centerY) / centerY) * -16
    const rotateY = ((x - centerX) / centerX) * 16
    const shineX = (x / rect.width) * 100
    const shineY = (y / rect.height) * 100

    setTilt({ rotateX, rotateY, shineX, shineY })
    setIsProfileHovered(true)
  }

  const handleProfileMouseLeave = () => {
    if (isCoinSpinning) return
    setTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 })
    setIsProfileHovered(false)
  }

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
      <div className="flex-1 flex items-center justify-center px-4 py-2 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-center md:text-left"
            >
              {/* Greeting with clean animated wave */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-xl text-muted-foreground mb-1 md:mb-2 inline-flex items-center gap-1"
              >
                <span>Hello,</span>
                <WavingHand />
              </motion.p>

              {/* Fluid Letter-Wise Name Header – ONLY at name, gentle ripple */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 tracking-tight"
              >
                <span>{"I'm "}</span>
                <span className="relative inline-flex items-center group">
                  <FluidName name="Tanmoy Saha" />
                  
                  {/* Subtle animated underline sheen */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-[#FFE500] to-transparent group-hover:w-full transition-all duration-500 rounded-full pointer-events-none" />
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-2xl lg:text-3xl text-muted-foreground mb-6 md:mb-8 h-8 md:h-10"
              >
                <span className="typing-cursor">{displayText}</span>
              </motion.div>

              {/* Magnetic Interactive CTA and Social Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 justify-center md:justify-start"
              >
                <MagneticItem>
                  <motion.button
                    onClick={scrollToAbout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative group px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-[#9E7F25] to-[#7D631B] hover:from-[#B09030] hover:to-[#8E7222] text-[#0F0F1A] border border-[#D4AF37]/35 rounded-full font-semibold shadow-md shadow-black/40 text-sm md:text-base overflow-hidden transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      About Me
                      <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </span>
                    {/* Subtle shimmer sweep effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </motion.button>
                </MagneticItem>

                <div className="flex items-center gap-3 md:gap-4">
                  {socialLinks.map((social, index) => (
                    <MagneticItem key={social.label}>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover="hover"
                        whileTap={{ scale: 0.9 }}
                        variants={buttonVariants}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className={`p-2.5 md:p-3 rounded-full block transition-[color,background-color,border-color,box-shadow] duration-300 shadow-md ${social.mobileClass} ${social.hoverColor} ${social.hoverText}`}
                        aria-label={social.label}
                      >
                        <motion.div variants={iconVariants} className="flex items-center justify-center">
                          <social.icon className="w-4.5 h-4.5 md:w-5 md:h-5" />
                        </motion.div>
                      </motion.a>
                    </MagneticItem>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Tilt Profile Avatar with Coin-Spin on Click + Shines */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative perspective-1000"
            >
              <motion.div
                onClick={handleProfileClick}
                onMouseMove={handleProfileMouseMove}
                onMouseLeave={handleProfileMouseLeave}
                animate={{
                  rotateY: isCoinSpinning ? 360 : tilt.rotateY,
                  rotateX: isCoinSpinning ? 0 : tilt.rotateX,
                }}
                transition={
                  isCoinSpinning
                    ? { duration: 1.0, ease: [0.34, 1.25, 0.64, 1] }
                    : { type: "spring", stiffness: 300, damping: 25 }
                }
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-56 h-56 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] cursor-pointer group"
                title="Click to spin coin!"
              >
                {/* Decorative rotating rings with golden pulse */}
                <motion.div
                  animate={{
                    borderColor: isCoinSpinning ? ["rgba(212,175,55,0.4)", "rgba(255,229,0,1)", "rgba(212,175,55,0.4)"] : "rgba(212,175,55,0.2)",
                    boxShadow: isCoinSpinning ? ["0 0 0px #FFE500", "0 0 35px 10px rgba(255,229,0,0.8)", "0 0 0px #FFE500"] : "none",
                  }}
                  transition={{ duration: 1.0 }}
                  className="absolute inset-0 rounded-full border-2 border-primary/20 pointer-events-none"
                />

                <div
                  className="absolute inset-2 md:inset-3 rounded-full border-2 border-secondary/40 transition-transform duration-300 pointer-events-none"
                  style={{
                    transform: `translateZ(${isProfileHovered || isCoinSpinning ? 25 : 10}px)`,
                  }}
                />

                {/* Profile image container with 3D depth */}
                <div
                  className="absolute inset-4 md:inset-6 rounded-full overflow-hidden border-4 border-primary shadow-2xl shadow-primary/30 transition-transform duration-300"
                  style={{
                    transform: `translateZ(${isProfileHovered || isCoinSpinning ? 40 : 15}px)`,
                  }}
                >
                  <Image
                    src="/profile.webp"
                    alt="Tanmoy Saha"
                    fill
                    sizes="(max-w-768px) 224px, (max-w-1024px) 320px, 380px"
                    className="object-cover scale-105 transition-transform duration-500"
                    priority
                    unoptimized
                  />

                  {/* Dynamic interactive light sheen across photo when hovered */}
                  {isProfileHovered && !isCoinSpinning && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`,
                      }}
                    />
                  )}

                  {/* ── Brilliant Specular Light Sweep Shine on Coin Spin ── */}
                  <AnimatePresence>
                    {isCoinSpinning && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-full z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.0 }}
                      >
                        {/* Radiant Diagonal Light Sweep */}
                        <motion.div
                          className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12"
                          initial={{ x: "-120%" }}
                          animate={{ x: "120%" }}
                          transition={{ duration: 0.95, ease: "easeInOut" }}
                        />
                        {/* Golden flash halo */}
                        <div className="absolute inset-0 rounded-full border-4 border-[#FFE500] shadow-[inset_0_0_20px_5px_rgba(255,229,0,0.6)]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ── Playful Interactive Floating Badge: AI / ML ── */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: -4 }}
                  className="absolute -top-3 -left-3 md:-top-4 md:-left-6 px-3 py-1 md:px-3.5 md:py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-primary/40 shadow-lg text-[11px] md:text-xs font-semibold text-foreground flex items-center gap-1.5 select-none transition-shadow hover:shadow-primary/30"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <span className="text-[#FFE500]">🧠</span>
                  <span>AI & ML</span>
                </motion.div>

                {/* ── Playful Interactive Floating Badge: Autonomous Systems ── */}
                <motion.div
                  animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ scale: 1.15, rotate: 4 }}
                  className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-6 px-3 py-1 md:px-3.5 md:py-1.5 rounded-full bg-background/85 backdrop-blur-md border border-[#F5D76E]/40 shadow-lg text-[11px] md:text-xs font-semibold text-foreground flex items-center gap-1.5 select-none transition-shadow hover:shadow-[#F5D76E]/30"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <span className="text-primary">🚀</span>
                  <span>Full-Stack</span>
                </motion.div>

                {/* Floating celestial decorative star orb */}
                <motion.div
                  animate={{
                    scale: isCoinSpinning ? [1, 1.4, 1] : [1, 1.25, 1],
                    rotate: isCoinSpinning ? [0, 360, 720] : [0, 180, 360],
                  }}
                  transition={{ duration: isCoinSpinning ? 1.0 : 6, repeat: isCoinSpinning ? 0 : Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-primary/40 to-[#F5D76E]/30 backdrop-blur-sm border border-primary/30 flex items-center justify-center text-xs text-[#FFF9C4] pointer-events-none"
                  style={{ transform: "translateZ(45px)" }}
                >
                  ✦
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee Band — slim ribbon layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative w-full overflow-hidden select-none border-y border-primary/30 bg-primary/[0.04] py-2 -mt-10 mb-6 z-10"
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
                      <span className="marquee-word yellow whitespace-nowrap text-sm md:text-base uppercase text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform cursor-pointer">
                        {item}
                      </span>
                    ) : (
                      <span className="marquee-word white whitespace-nowrap text-sm md:text-base uppercase text-foreground/90 hover:scale-110 transition-transform cursor-pointer">
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
                      <span className="marquee-word white whitespace-nowrap text-sm md:text-base uppercase text-foreground/90 hover:scale-110 transition-transform cursor-pointer">
                        {item}
                      </span>
                    ) : (
                      <span className="marquee-word yellow whitespace-nowrap text-sm md:text-base uppercase text-primary drop-shadow-[0_0_6px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform cursor-pointer">
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
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-10 ${isAtTop ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
          onClick={scrollToAbout}
        >
          <span className="text-[11px] md:text-xs font-medium">Scroll Down</span>
          <ArrowDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
