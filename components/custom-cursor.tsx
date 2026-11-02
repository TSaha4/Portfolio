"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

/**
 * CustomCursor – Authentic 3D Faceted Golden Arrow Pointer (Genshin Impact Style).
 * Matches the user-provided geometry:
 * - 3D chiseled gold facets (light left, luminous right wing, rich amber bottom fold)
 * - Solid black contour outline for sharp contrast against all backgrounds
 * - Brightened with celestial golden bloom & sparkle flares
 * - Precision tip hotspot at cursor click coordinates
 */
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Subtle spring physics for smooth, responsive cursor feel
  const springConfig = { damping: 28, stiffness: 450, mass: 0.2 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Detect touch-only devices
    const isTouch = ("ontouchstart" in window || navigator.maxTouchPoints > 0) && window.innerWidth < 768
    setIsTouchDevice(isTouch)
    if (isTouch) return

    const moveCursor = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover], .clickable'
      )
      setIsHovering(!!isInteractive)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [mouseX, mouseY, hasMoved])

  if (isTouchDevice || !hasMoved) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999999] overflow-hidden select-none">
      {/* ── 3D Faceted Golden Arrowhead Pointer ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none origin-[1px_1px]"
        style={{
          x: mouseX,
          y: mouseY,
          marginLeft: -1,
          marginTop: -1,
        }}
        animate={{
          scale: isClicking ? 0.88 : isHovering ? 1.15 : 1,
          rotate: isClicking ? -3 : isHovering ? -6 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 25,
        }}
      >
        <svg
          width="15"
          height="25"
          viewBox="0 0 108 144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(255,229,0,0.95)] drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]"
        >
          <defs>
            {/* Left facet: Bright Radiant Sun-Gold Gradient */}
            <linearGradient id="facetLeft" x1="10%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FFF266" />
              <stop offset="70%" stopColor="#FFC800" />
              <stop offset="100%" stopColor="#FF9900" />
            </linearGradient>

            {/* Right wing facet: Luminous Vivid Yellow-Gold */}
            <linearGradient id="facetRight" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#FFFFF5" />
              <stop offset="30%" stopColor="#FFE833" />
              <stop offset="80%" stopColor="#FFB700" />
              <stop offset="100%" stopColor="#E67E00" />
            </linearGradient>

            {/* Bottom notch fold: 3D Deep Amber/Orange Shadow Facet */}
            <linearGradient id="facetBottom" x1="50%" y1="0%" x2="30%" y2="100%">
              <stop offset="0%" stopColor="#FF8C00" />
              <stop offset="50%" stopColor="#E65100" />
              <stop offset="100%" stopColor="#BF3600" />
            </linearGradient>
          </defs>

          {/* Solid Black Contour Outline matching uploaded reference */}
          <path
            d="M 5 5 L 8 136 L 45 95 L 102 91 Z"
            fill="#050301"
            stroke="#050301"
            strokeWidth="8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Bottom Facet (3D Shadow Notch) */}
          <path
            d="M 8 136 L 45 95 L 101 91 L 39 80 Z"
            fill="url(#facetBottom)"
          />

          {/* Left Facet */}
          <path
            d="M 5 6 L 8 136 L 39 80 Z"
            fill="url(#facetLeft)"
          />

          {/* Right Wing Facet */}
          <path
            d="M 5 6 L 39 80 L 101 91 Z"
            fill="url(#facetRight)"
          />

          {/* Crisp White Spine Ridge (Genshin Shimmer highlight) */}
          <path
            d="M 5 6 L 39 80"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.95"
          />

          {/* Outer Leading Edge Highlight */}
          <path
            d="M 5 6 L 7 70"
            stroke="#FFFFE0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
        </svg>
      </motion.div>
    </div>
  )
}
