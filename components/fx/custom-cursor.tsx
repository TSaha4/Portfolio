"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], input, textarea, select, [data-cursor]'

type Box = { x: number; y: number; w: number; h: number; label: string; score: string } | null
type Spark = { x: number; y: number; vx: number; vy: number; life: number }
type Ring = { x: number; y: number; life: number }

/** Faceted gold arrow from the original portfolio, unchanged in shape. */
function Arrow() {
  return (
    <svg width="15" height="25" viewBox="0 0 108 144" fill="none" className="drop-shadow-[0_0_8px_rgba(255,229,0,0.95)] drop-shadow-[0_2px_5px_rgba(0,0,0,0.85)]">
      <defs>
        <linearGradient id="cur-l" x1="10%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="25%" stopColor="#FFF266" /><stop offset="70%" stopColor="#FFC800" /><stop offset="100%" stopColor="#FF9900" />
        </linearGradient>
        <linearGradient id="cur-r" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#FFFFF5" /><stop offset="30%" stopColor="#FFE833" /><stop offset="80%" stopColor="#FFB700" /><stop offset="100%" stopColor="#E67E00" />
        </linearGradient>
        <linearGradient id="cur-b" x1="50%" y1="0%" x2="30%" y2="100%">
          <stop offset="0%" stopColor="#FF8C00" /><stop offset="50%" stopColor="#E65100" /><stop offset="100%" stopColor="#BF3600" />
        </linearGradient>
      </defs>
      <path d="M 5 5 L 8 136 L 45 95 L 102 91 Z" fill="#050301" stroke="#050301" strokeWidth="8" strokeLinejoin="round" />
      <path d="M 8 136 L 45 95 L 101 91 L 39 80 Z" fill="url(#cur-b)" />
      <path d="M 5 6 L 8 136 L 39 80 Z" fill="url(#cur-l)" />
      <path d="M 5 6 L 39 80 L 101 91 Z" fill="url(#cur-r)" />
      <path d="M 5 6 L 39 80" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.95" />
    </svg>
  )
}

/**
 * Cursor = gold arrow + a "neural comet" trail (recent points linked like a network) +
 * click shockwaves with spark bursts + a CV-style detection box that locks onto hovered controls.
 * Only mounts on fine pointers; touch devices keep their native behaviour.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [box, setBox] = useState<Box>(null)
  const [pressed, setPressed] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    setEnabled(fine.matches)
    const onChange = () => setEnabled(fine.matches)
    fine.addEventListener("change", onChange)
    return () => fine.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add("has-custom-cursor")
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const trail: { x: number; y: number; t: number }[] = []
    const sparks: Spark[] = []
    const rings: Ring[] = []
    let target: Element | null = null
    let raf = 0

    const resize = () => {
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const lock = (el: Element | null) => {
      target = el
      if (!el) return setBox(null)
      const r = el.getBoundingClientRect()
      // an element can name itself for the cursor with data-cursor-label; otherwise use its aria-label or text
      const label = (el as HTMLElement).dataset.cursorLabel || el.getAttribute("aria-label")?.split(/[.:]/)[0] || (el as HTMLElement).innerText?.trim().split("\n")[0] || el.tagName.toLowerCase()
      // a fresh "detection confidence" each lock-on, like a real model's jittery score
      const score = (0.8 + Math.random() * 0.19).toFixed(2)
      setBox({ x: r.left - 6, y: r.top - 6, w: r.width + 12, h: r.height + 12, label: label.slice(0, 22).toLowerCase(), score })
    }

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      trail.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      const el = (e.target as Element).closest?.(INTERACTIVE) ?? null
      if (el !== target) lock(el)
    }
    const onDown = (e: PointerEvent) => {
      setPressed(true)
      rings.push({ x: e.clientX, y: e.clientY, life: 1 })
      if (!reduced)
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2 + Math.random() * 0.4
          const s = 2 + Math.random() * 3
          sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 })
        }
    }
    const onUp = () => setPressed(false)
    const onScroll = () => target && lock(target)

    const frame = () => {
      raf = requestAnimationFrame(frame)
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      const now = performance.now()
      while (trail.length && now - trail[0].t > 380) trail.shift()
      if (!reduced) {
        // comet: fading gold segments, plus faint "synapses" between points a few steps apart
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1], b = trail[i]
          const k = i / trail.length
          ctx.strokeStyle = `rgba(255,214,64,${k * 0.8})`
          ctx.lineWidth = k * 3
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          if (i % 4 === 0 && i > 6) {
            const c = trail[i - 6]
            ctx.strokeStyle = `rgba(245,215,110,${k * 0.25})`
            ctx.lineWidth = 1
            ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            ctx.fillStyle = `rgba(255,229,0,${k})`
            ctx.fillRect(b.x - 1.5, b.y - 1.5, 3, 3)
          }
        }
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx; s.y += s.vy; s.vx *= 0.92; s.vy *= 0.92; s.life -= 0.04
        if (s.life <= 0) { sparks.splice(i, 1); continue }
        ctx.fillStyle = `rgba(255,229,0,${s.life})`
        ctx.beginPath(); ctx.arc(s.x, s.y, 2.2 * s.life, 0, Math.PI * 2); ctx.fill()
      }
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i]
        r.life -= 0.05
        if (r.life <= 0) { rings.splice(i, 1); continue }
        ctx.strokeStyle = `rgba(212,175,55,${r.life})`
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(r.x, r.y, (1 - r.life) * 36, 0, Math.PI * 2); ctx.stroke()
      }
    }

    resize()
    frame()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("scroll", onScroll)
    }
  }, [enabled, reduced, x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* detection box: corner brackets + class label, springs onto the hovered control */}
      <motion.div
        className="absolute left-0 top-0"
        initial={false}
        animate={box ? { x: box.x, y: box.y, width: box.w, height: box.h, opacity: 1 } : { opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
      >
        {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "left-0 bottom-0 border-l-2 border-b-2", "right-0 bottom-0 border-r-2 border-b-2"].map((c) => (
          <span key={c} className={`absolute h-3 w-3 border-glow ${c}`} />
        ))}
        {box && (
          <span className="absolute -top-6 left-0 whitespace-nowrap rounded-sm bg-glow px-1.5 font-mono text-[11px] font-semibold leading-5 text-background">
            {box.label} · {box.score}
          </span>
        )}
      </motion.div>
      <motion.div className="absolute left-0 top-0 origin-[1px_1px]" style={{ x, y, marginLeft: -1, marginTop: -1 }}
        animate={{ scale: pressed ? 0.85 : box ? 1.15 : 1, rotate: pressed ? -4 : box ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 25 }}>
        <Arrow />
      </motion.div>
    </div>
  )
}
