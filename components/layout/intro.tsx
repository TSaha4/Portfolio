"use client"

import { useCallback, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { markIntroDone } from "@/lib/intro"
import { LoadingScreen } from "./loading-screen"

/** Shows the welcome loader, then hands off to the hero (which starts converging as the curtain lifts). */
export function Intro() {
  const [loading, setLoading] = useState(true)
  const finish = useCallback(() => {
    setLoading(false)
    markIntroDone()
  }, [])
  return <AnimatePresence>{loading && <LoadingScreen onComplete={finish} />}</AnimatePresence>
}
