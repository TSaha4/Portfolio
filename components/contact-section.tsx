"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Github, Linkedin } from "lucide-react"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    tackyName: "Ping Me",
    href: "mailto:s.tanmoy2004@gmail.com",
    color: "#e74e40ff",
    shadowColor: "#ef8b81ff",
    glowColor: "rgba(231, 78, 64, 0.466)",
  },
  {
    icon: Github,
    label: "GitHub",
    tackyName: "Raid My Repos",
    href: "https://github.com/TSaha4",
    color: "#e2e8f0",
    shadowColor: "#555",
    glowColor: "rgba(226, 232, 240, 0.2)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    tackyName: "Let's Connect",
    href: "https://www.linkedin.com/in/tanmoy-saha-4b0ab228a/",
    color: "#2683dfff",
    shadowColor: "#88c3ffff",
    glowColor: "rgba(19, 206, 234, 1)",
  },
]

interface GameButtonProps {
  link: typeof contactLinks[number]
  index: number
  isInView: boolean
}

function GameButton({ link, index, isInView }: GameButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const Icon = link.icon

  const desktopDefault = {
    opacity: 0.35,
    filter: "grayscale(100%)",
    boxShadow: `0 4px 0 rgba(100,100,100,0.2)`,
    border: `2px solid rgba(150,150,150,0.25)`,
    background: "transparent",
    color: "#6b7280",
  }

  const desktopHover = {
    opacity: 1,
    filter: "grayscale(0%)",
    boxShadow: pressed
      ? `0 2px 0 ${link.shadowColor}, 0 0 20px ${link.glowColor}`
      : `0 4px 0 ${link.shadowColor}, 0 0 20px ${link.glowColor}`,
    border: `2px solid ${link.color}`,
    background: `${link.color}18`,
    color: link.color,
  }

  const mobileStyle = {
    opacity: 1,
    filter: "grayscale(0%)",
    boxShadow: pressed
      ? `0 2px 0 ${link.shadowColor}`
      : `0 4px 0 ${link.shadowColor}`,
    border: `2px solid ${link.color}`,
    background: `${link.color}12`,
    color: link.color,
  }

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setPressed(false) }}
      onTapStart={() => setPressed(true)}
      onTap={() => setPressed(false)}
      onTapCancel={() => setPressed(false)}
      whileHover={{ scale: 1.03, y: pressed ? 2 : -1 }}
      whileTap={{ scale: 0.98, y: 2 }}
      className="flex items-center gap-2.5 px-4.5 py-3 rounded-xl select-none cursor-pointer transition-colors duration-200 text-sm"
      style={{
        // Mobile-first: always fully styled
        ...mobileStyle,
        // Will be overridden by JS-driven hovered state for desktop
      }}
      aria-label={link.label}
    >
      <motion.div
        animate={hovered ? { rotate: [0, -12, 10, -6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center"
      >
        <Icon className="w-5 h-5" style={{ color: "inherit" }} />
      </motion.div>
      <span className="font-bold whitespace-nowrap tracking-wide" style={{ color: "inherit" }}>
        {link.tackyName}
      </span>
    </motion.a>
  )
}

function DesktopGameButton({ link, index, isInView }: GameButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const Icon = link.icon

  const buttonStyle = hovered
    ? {
        opacity: 1,
        filter: "grayscale(0%)",
        boxShadow: pressed
          ? `0 2px 0 ${link.shadowColor}, 0 0 20px ${link.glowColor}`
          : `0 5px 0 ${link.shadowColor}, 0 0 20px ${link.glowColor}`,
        border: `2px solid ${link.color}`,
        background: `${link.color}18`,
        color: link.color,
        transform: pressed ? "translateY(3px)" : "translateY(0)",
      }
    : {
        opacity: 0.35,
        filter: "grayscale(100%)",
        boxShadow: `0 4px 0 rgba(100,100,100,0.2)`,
        border: `2px solid rgba(150,150,150,0.25)`,
        background: "transparent",
        color: "#6b7280",
        transform: "translateY(0)",
      }

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setPressed(false) }}
      onTapStart={() => setPressed(true)}
      onTap={() => setPressed(false)}
      onTapCancel={() => setPressed(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 px-6 py-4 rounded-xl select-none cursor-pointer"
      style={{
        transition: "all 0.2s ease",
        ...buttonStyle,
      }}
      aria-label={link.label}
    >
      <motion.div
        animate={hovered ? { rotate: [0, -12, 10, -6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center"
      >
        <Icon className="w-6 h-6" style={{ color: "inherit" }} />
      </motion.div>
      <span className="font-bold whitespace-nowrap tracking-wide" style={{ color: "inherit" }}>
        {link.tackyName}
      </span>
    </motion.a>
  )
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-12 md:py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 md:mb-8 rounded-full" />
          <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-lg mx-auto text-sm md:text-base">
            Have a project in mind or want to collaborate? <br />Feel free to reach out via any of my platforms.
          </p>
        </motion.div>

        {/* Mobile buttons — fully styled, always active */}
        <div className="flex flex-wrap justify-center gap-5 mb-16 md:hidden">
          {contactLinks.map((link, index) => (
            <GameButton key={link.label} link={link} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Desktop buttons — disabled look, activated on hover */}
        <div className="hidden md:flex flex-wrap justify-center gap-6 mb-16">
          {contactLinks.map((link, index) => (
            <DesktopGameButton key={link.label} link={link} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
