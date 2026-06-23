"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { LoadingScreen } from "@/components/loading-screen"
import { NeuralBackground } from "@/components/neural-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { EducationSection } from "@/components/education-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { BackToTop } from "@/components/back-to-top"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  const [showNav, setShowNav] = useState(false)
  const [profileInNav, setProfileInNav] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already seen the loading screen in this session
    // UNCOMMENT THESE LINES TO REVERT TO ONCE-PER-SESSION
    // const hasSeenLoading = sessionStorage.getItem("hasSeenLoading")
    // if (hasSeenLoading) {
    //   setIsLoading(false)
    // }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // UNCOMMENT THIS LINE TO REVERT TO ONCE-PER-SESSION
    // sessionStorage.setItem("hasSeenLoading", "true")
  }

  const handleScrollPast = (isPast: boolean) => {
    setShowNav(isPast)
    setProfileInNav(isPast)
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      <main className={`relative min-h-screen ${isLoading ? "h-screen overflow-hidden" : ""}`}>
        <NeuralBackground />
        <ScrollProgress />
        <Navbar showNav={showNav} profileInNav={profileInNav} />
        
        <HeroSection onScrollPast={handleScrollPast} />
        <AboutSection />
        <ProjectsSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
        
        <BackToTop />
      </main>
    </>
  )
}
