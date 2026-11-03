"use client"

import { useEffect, useState } from "react"
import { layers, type LayerId } from "@/content/layers"

/** Returns the layer whose section crosses the viewport's midline, plus overall scroll progress. */
export function useActiveLayer() {
  const [active, setActive] = useState<LayerId>("input")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const mid = window.innerHeight / 2
      for (const { id } of layers) {
        const r = document.getElementById(id)?.getBoundingClientRect()
        if (r && r.top <= mid && r.bottom > mid) setActive(id)
      }
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return { active, progress }
}
