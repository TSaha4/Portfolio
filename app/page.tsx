"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { LoadingScreen } from "@/components/loading-screen"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ScrollProgress } from "@/components/scroll-progress"
import { BackToTop } from "@/components/back-to-top"
import { Footer } from "@/components/footer"

import dynamic from "next/dynamic"

const NeuralBackground = dynamic(() => import("@/components/neural-background").then(mod => mod.NeuralBackground), { ssr: false })
const AboutSection = dynamic(() => import("@/components/about-section").then(mod => mod.AboutSection))
const ProjectsSection = dynamic(() => import("@/components/projects-section").then(mod => mod.ProjectsSection))
const ExperienceSection = dynamic(() => import("@/components/experience-section").then(mod => mod.ExperienceSection))
const EducationSection = dynamic(() => import("@/components/education-section").then(mod => mod.EducationSection))
const SkillsSection = dynamic(() => import("@/components/skills-section").then(mod => mod.SkillsSection))
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection))

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
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
        
        <BackToTop />
      </main>
    </>
  )
}
