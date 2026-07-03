"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Work Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

interface NavbarProps {
  showNav: boolean
  profileInNav: boolean
}

export function Navbar({ showNav, profileInNav }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1))
      let current = ""
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section
          }
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const navHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Desktop Navbar Container */}
      <div className="fixed top-4 left-4 right-4 z-50 hidden md:block">
        <AnimatePresence mode="wait">
          {!showNav ? (
            // Standalone toggle when navbar is hidden - positioned to the right
            <motion.div
              key="standalone-toggle-container"
              className="flex justify-end gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-lg hover:bg-primary/20 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </motion.button>
            </motion.div>
          ) : (
            // Full navbar - full width
            <motion.nav
              key="full-navbar"
              className="w-full rounded-2xl bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-lg overflow-hidden"
              initial={{ 
                opacity: 0,
                y: -20,
              }}
              animate={{ 
                opacity: 1,
                y: 0,
              }}
              exit={{ 
                opacity: 0,
                y: -20,
              }}
              transition={{ 
                duration: 0.3, 
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div className="px-6 py-3 flex items-center justify-between">
                {/* Left: Profile + Name */}
                <motion.button 
                  onClick={scrollToTop}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-primary shrink-0 w-10 h-10"
                  />
                  <span className="text-lg font-semibold text-foreground whitespace-nowrap">
                    Tanmoy Saha
                  </span>
                </motion.button>

                {/* Center: Nav Links */}
                <div className="flex items-center gap-8 flex-1 justify-center">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.substring(1)
                    return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`text-sm font-medium transition-colors relative group whitespace-nowrap ${isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      {link.name}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </motion.a>
                  )})}
                </div>


              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navbar - Conditional visibility based on showNav */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden pointer-events-none">
        <nav className="mx-4 mt-4 transition-all duration-300 pointer-events-none">
          <div className={`flex items-center ${showNav ? 'justify-between' : 'justify-end'} gap-3`}>
            <AnimatePresence>
              {showNav && (
                <motion.button 
                  onClick={scrollToTop} 
                  className="flex items-center pointer-events-auto bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-lg rounded-full pr-4 pl-2 py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {profileInNav && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <Image
                        src="/profile.jpg"
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full object-cover border-2 border-primary shrink-0 w-8 h-8"
                      />
                      <span className="text-sm font-semibold text-foreground">Tanmoy Saha</span>
                    </motion.div>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-1 pointer-events-auto transition-all duration-300 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-lg rounded-full px-1.5 py-1.5">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full transition-colors flex items-center justify-center hover:bg-primary/20 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-64 bg-[var(--glass-bg)] backdrop-blur-xl border-l border-[var(--glass-border)] p-6 pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1)
                  return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-lg font-medium transition-colors relative w-fit group ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </motion.a>
                )})}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
