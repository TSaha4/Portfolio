"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Mail, Phone, Send, Github, Linkedin } from "lucide-react"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@tanmoysaha.com",
    href: "mailto:hello@tanmoysaha.com",
    hoverClass: "hover:border-[#EA4335]/50 hover:bg-[#EA4335]/10 hover:shadow-[#EA4335]/20 border-[#EA4335]/30 md:border-[var(--glass-border)]",
    iconColor: "text-[#EA4335] md:text-muted-foreground group-hover:text-[#EA4335]",
    mobileWide: true
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 xxxxx xxxxx",
    href: "tel:+91xxxxxxxxxx",
    hoverClass: "hover:border-primary/50 hover:bg-primary/5 hover:shadow-primary/20 border-primary/30 md:border-[var(--glass-border)]",
    iconColor: "text-primary md:text-muted-foreground group-hover:text-primary",
    mobileWide: true
  },
  {
    icon: Github,
    label: "GitHub",
    value: "TSaha4",
    href: "https://github.com/TSaha4",
    hoverClass: "hover:border-foreground/50 hover:bg-muted/50 hover:shadow-foreground/20 dark:hover:bg-white/10 dark:hover:border-white/50 border-foreground/30 dark:border-white/30 md:border-[var(--glass-border)] bg-muted/20 md:bg-transparent",
    iconColor: "text-foreground dark:text-white md:text-muted-foreground group-hover:text-foreground dark:group-hover:text-white",
    mobileWide: false
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/tanmoysaha",
    href: "https://linkedin.com/in/tanmoysaha",
    hoverClass: "hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:shadow-[#0A66C2]/20 border-[#0A66C2]/30 md:border-[var(--glass-border)] bg-[#0A66C2]/5 md:bg-transparent",
    iconColor: "text-[#0A66C2] md:text-muted-foreground group-hover:text-[#0A66C2]",
    mobileWide: false
  }
]

const buttonVariants = {
  hover: {
    scale: 1.05,
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

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Have a project in mind or want to collaborate? <br />Feel free to reach out via any of my platforms.
          </p>
        </motion.div>

        {/* Expanding Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16"
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              variants={buttonVariants}
              className={`group flex items-center p-4 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border transition-[color,background-color,border-color,box-shadow] duration-300 shadow-lg ${link.hoverClass} ${link.mobileWide ? "w-full md:w-auto justify-center md:justify-start" : "w-auto justify-center"}`}
              aria-label={link.label}
            >
              <motion.div variants={iconVariants} className="flex items-center justify-center">
                <link.icon className={`w-6 h-6 transition-colors duration-300 ${link.iconColor}`} />
              </motion.div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                link.mobileWide 
                  ? "max-w-[200px] opacity-100 md:max-w-0 md:opacity-0 group-hover:md:max-w-[200px] group-hover:md:opacity-100" 
                  : "max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100"
              }`}>
                <span className={`ml-3 mr-2 font-semibold whitespace-nowrap transition-colors duration-300 ${link.iconColor}`}>
                  {link.value}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
