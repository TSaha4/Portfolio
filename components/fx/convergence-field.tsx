"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export interface TrainingStats {
  epoch: number
  loss: number
}

/** Where the learned word sits, in CSS px relative to the canvas. */
export interface TextBounds {
  top: number
  left: number
  right: number
}

interface Props {
  text: string
  /** particles drift as noise until this turns true, then start descending */
  active?: boolean
  onStats?: (s: TrainingStats) => void
  onLayout?: (b: TextBounds) => void
  className?: string
}

type Particle = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; hot: number }

const LR = 0.012 // spring strength, i.e. learning rate
const MOMENTUM = 0.86
const LENS_RADIUS = 110
const MAX_PARTICLES = 5000
const COLORS = ["#d4af37", "rgba(156,163,175,0.5)", "rgba(255,229,0,0.9)"] // converged, learning, perturbed

/** Samples the opaque pixels of `text` rendered into an offscreen canvas and returns target points. */
function sampleText(text: string, w: number, h: number, step: number) {
  const off = document.createElement("canvas")
  off.width = w
  off.height = h
  const ctx = off.getContext("2d")!
  const lines = w < 640 ? text.split(" ") : [text]
  const size = Math.min((w * 0.9) / Math.max(...lines.map((l) => l.length)) / 0.62, h / (lines.length * 1.4))
  // next/font registers a hashed family name, exposed through this CSS variable
  const family = getComputedStyle(document.body).getPropertyValue("--font-space-grotesk") || "sans-serif"
  ctx.font = `700 ${size}px ${family}`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#fff"
  const top = h * 0.42 - ((lines.length - 1) * size * 1.05) / 2
  lines.forEach((l, i) => ctx.fillText(l, w / 2, top + i * size * 1.05))
  const data = ctx.getImageData(0, 0, w, h).data
  const pts: [number, number][] = []
  for (let y = 0; y < h; y += step)
    for (let x = 0; x < w; x += step) if (data[(y * w + x) * 4 + 3] > 128) pts.push([x, y])
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width))
  const bounds: TextBounds = { top: top - size * 0.36, left: (w - widest) / 2, right: (w + widest) / 2 }
  return { pts, bounds }
}

/**
 * Particles start as noise and descend toward the letters of `text`.
 * Mean distance to target is reported as "loss"; the pointer acts as an attention lens over the letters.
 */
export function ConvergenceField({ text, active = true, onStats, onLayout, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const statsRef = useRef(onStats)
  statsRef.current = onStats
  const layoutRef = useRef(onLayout)
  layoutRef.current = onLayout
  const activeRef = useRef(active)
  activeRef.current = active

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let w = 0
    let h = 0
    let raf = 0
    let epoch = 0
    let visible = true
    let settled = false
    const pointer = { x: -999, y: -999, active: false, moved: 0 }

    const build = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      let step = w < 640 ? 3 : 4
      let sample = sampleText(text, w, h, step)
      const cap = w < 640 ? MAX_PARTICLES / 2 : MAX_PARTICLES // lighter on phones
      while (sample.pts.length > cap) sample = sampleText(text, w, h, ++step)
      const targets = sample.pts
      layoutRef.current?.(sample.bounds)
      particles = targets.map(([tx, ty]) => ({
        x: reduced ? tx : Math.random() * w,
        y: reduced ? ty : Math.random() * h,
        vx: 0,
        vy: 0,
        tx,
        ty,
        hot: 0,
      }))
      epoch = 0
      settled = false
    }

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      // once the word has converged and nothing is disturbing it, the picture is static: don't repaint it
      if (settled && (!pointer.active || performance.now() - pointer.moved > 1500)) return
      ctx.clearRect(0, 0, w, h)
      const batches: Particle[][] = [[], [], []]
      let anyHot = false
      let loss = 0
      for (const p of particles) {
        const dx = p.tx - p.x
        const dy = p.ty - p.y
        // before the intro finishes, the "learning rate" is zero and particles just drift
        const lr = activeRef.current ? LR : 0
        p.vx = p.vx * MOMENTUM + dx * lr + (lr ? 0 : (Math.random() - 0.5) * 0.3)
        p.vy = p.vy * MOMENTUM + dy * lr + (lr ? 0 : (Math.random() - 0.5) * 0.3)
        if (pointer.active) {
          // attention lens: nearby particles bulge gently outward and light up, then spring back
          const px = p.x - pointer.x
          const py = p.y - pointer.y
          const d = Math.sqrt(px * px + py * py)
          if (d < LENS_RADIUS) {
            const f = (1 - d / LENS_RADIUS) * 0.9
            p.vx += (px / (d + 0.1)) * f
            p.vy += (py / (d + 0.1)) * f
            p.hot = 1
          }
        }
        p.x += p.vx
        p.y += p.vy
        p.hot *= 0.96
        const err = Math.abs(dx) + Math.abs(dy)
        loss += err
        // converged particles glow gold; ones still "learning" are dim; perturbed ones flare
        if (p.hot > 0.01) anyHot = true
        batches[p.hot > 0.1 ? 2 : err > 20 ? 1 : 0].push(p)
      }
      batches.forEach((b, i) => {
        ctx.fillStyle = COLORS[i]
        ctx.beginPath()
        for (const p of b) ctx.rect(p.x, p.y, 2, 2)
        ctx.fill()
      })
      if (activeRef.current) epoch++
      settled = activeRef.current && !anyHot && loss / Math.max(particles.length, 1) < 0.05
      if (epoch % 6 === 0) statsRef.current?.({ epoch, loss: loss / Math.max(particles.length, 1) })
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = !reduced
      pointer.moved = performance.now()
    }
    const onLeave = () => (pointer.active = false)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(build, 200)
    }

    // wait for the display font so sampled glyphs match the real typeface
    document.fonts.ready.then(() => {
      build()
      frame()
    })
    io.observe(canvas)
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerleave", onLeave)
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      clearTimeout(resizeTimer)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("resize", onResize)
    }
  }, [text, reduced])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
