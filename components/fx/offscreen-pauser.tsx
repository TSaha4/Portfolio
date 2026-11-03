"use client"

import { useEffect } from "react"

/**
 * Marks every <section> that is off-screen with data-offscreen; globals.css pauses all CSS
 * animations inside such sections. Decorative loops (glints, pulses, dashes, marquees) then only
 * cost paint time while you can actually see them.
 */
export function OffscreenPauser() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-offscreen", !e.isIntersecting)),
      { rootMargin: "100px 0px" },
    )
    const watch = () => document.querySelectorAll("main > section, main > div").forEach((el) => io.observe(el))
    watch()
    // sections are code-split and mount a moment later; pick them up as they appear
    const mo = new MutationObserver(watch)
    const main = document.querySelector("main")
    if (main) mo.observe(main, { childList: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return null
}
