"use client"

import { useEffect, useState } from "react"

/** The forward pass ends: report how long this visitor's "inference" ran. */
export function Footer() {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const t = setInterval(() => setSeconds(Math.round((performance.now() - start) / 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <footer className="border-t border-border px-4 pb-10 pt-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground md:flex-row">
        <p><span className="text-primary">OUTPUT</span> · inference complete in {seconds}s · thanks for running me</p>
        <p>© {new Date().getFullYear()} Tanmoy Saha</p>
      </div>
    </footer>
  )
}
