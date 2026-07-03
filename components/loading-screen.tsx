"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const languages = [
  {
    greeting: "Welcome",
    sysInit: "SYS_INIT",
    step: "Initializing Portfolio...",
    name: "Tanmoy Saha"
  },
  {
    greeting: "স্বাগতম",
    sysInit: "সিস্টেম_চালু",
    step: "পোর্টফোলিও আরম্ভ করা হচ্ছে...",
    name: "তময় সাহা"
  },
  {
    greeting: "स्वागत है",
    sysInit: "सिस्टम_प्रारंभ",
    step: "पोर्टफोलियो प्रारंभ किया जा रहा है...",
    name: "तन्मय साहा"
  }
]

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [currentLang, setCurrentLang] = useState(0)
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("hasVisitedPortfolio")
      if (hasVisited) {
        setIsFirstVisit(false)
      } else {
        setIsFirstVisit(true)
      }
    }
  }, [])

  useEffect(() => {
    if (isFirstVisit === null) return

    if (!isFirstVisit) {
      const timer = setTimeout(() => {
        onComplete()
      }, 800)
      return () => clearTimeout(timer)
    }

    // First visit loading progress animation (duration 1200ms)
    const duration = 1200
    const interval = 30
    const steps = duration / interval
    let currentStepCount = 0

    const langInterval = setInterval(() => {
      setCurrentLang((prev) => (prev + 1) % languages.length)
    }, duration / 4)

    const progressInterval = setInterval(() => {
      currentStepCount++
      const currentProgress = (currentStepCount / steps) * 100
      setProgress(currentProgress)

      if (currentStepCount >= steps) {
        clearInterval(progressInterval)
        clearInterval(langInterval)
        try {
          sessionStorage.setItem("hasVisitedPortfolio", "true")
        } catch (e) {
          console.error(e)
        }
        setTimeout(onComplete, 200)
      }
    }, interval)

    return () => {
      clearInterval(progressInterval)
      clearInterval(langInterval)
    }
  }, [isFirstVisit, onComplete])

  if (isFirstVisit === null) {
    return <div className="fixed inset-0 z-[9999] bg-background" />
  }

  if (!isFirstVisit) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-6 border-b-2 border-primary"
      >
        <div className="max-w-md w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center">
            Welcome
          </h1>
          <div className="mt-6 text-lg md:text-xl font-bold uppercase tracking-[2px] text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              TANMOY SAHA's Portfolio
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-6 border-b-2 border-primary"
    >
      <div className="max-w-md w-full flex flex-col items-center">
        
        {/* Animated Greetings */}
        <div className="h-24 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentLang}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-foreground text-center"
            >
              {languages[currentLang].greeting}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Loading Steps text */}
        <motion.div 
          className="h-8 mb-4 text-primary font-mono text-sm md:text-base text-center"
        >
          {languages[currentLang].step}
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden relative border border-primary/20">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        <div className="w-full flex justify-between mt-2 text-xs font-mono text-muted-foreground">
          <span>{languages[currentLang].sysInit}</span>
          <span>{Math.floor(progress)}%</span>
        </div>

        {/* Identity Section */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <motion.div 
            className="text-2xl md:text-3xl font-bold uppercase"
            initial={{ opacity: 0, letterSpacing: "15px" }}
            animate={{ 
              opacity: progress > 30 ? 1 : 0,
              letterSpacing: progress > 70 ? "2px" : "15px"
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              TANMOY SAHA
            </span>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}
