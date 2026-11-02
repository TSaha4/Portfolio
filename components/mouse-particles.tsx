"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * MouseParticles – Creates interactive sparkle/particle effects that follow mouse movement.
 * Renders gold-themed particles that burst on click and trail on move.
 */
export function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const lastSpawnRef = useRef(0)

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.update()
      if (p.alpha <= 0) return false
      p.draw(ctx)
      return true
    })

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      const now = Date.now()
      // Spawn trail particles (throttled)
      if (now - lastSpawnRef.current > 50) {
        lastSpawnRef.current = now
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push(
            new Particle(
              e.clientX + (Math.random() - 0.5) * 10,
              e.clientY + (Math.random() - 0.5) * 10,
              "trail"
            )
          )
        }
      }
    }

    const handleClick = (e: MouseEvent) => {
      // Burst of particles on click
      for (let i = 0; i < 12; i++) {
        particlesRef.current.push(
          new Particle(e.clientX, e.clientY, "burst")
        )
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ mixBlendMode: "screen" }}
    />
  )
}

/** Single particle with physics */
class Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  size: number
  decay: number
  color: string
  type: "trail" | "burst"
  rotation: number
  rotSpeed: number
  shape: "circle" | "diamond" | "star"

  constructor(x: number, y: number, type: "trail" | "burst") {
    this.x = x
    this.y = y
    this.type = type
    this.rotation = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.15

    if (type === "burst") {
      const angle = Math.random() * Math.PI * 2
      const speed = 1.5 + Math.random() * 3
      this.vx = Math.cos(angle) * speed
      this.vy = Math.sin(angle) * speed
      this.alpha = 0.9
      this.size = 2 + Math.random() * 4
      this.decay = 0.015 + Math.random() * 0.01
      this.shape = ["circle", "diamond", "star"][Math.floor(Math.random() * 3)] as "circle" | "diamond" | "star"
    } else {
      this.vx = (Math.random() - 0.5) * 0.5
      this.vy = -0.5 - Math.random() * 1
      this.alpha = 0.6 + Math.random() * 0.3
      this.size = 1.5 + Math.random() * 2
      this.decay = 0.02 + Math.random() * 0.015
      this.shape = Math.random() > 0.5 ? "circle" : "diamond"
    }

    // Gold palette
    const colors = [
      "212, 175, 55",   // Gold
      "245, 215, 110",  // Light gold
      "255, 235, 160",  // Pale gold
      "180, 140, 40",   // Dark gold
    ]
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.alpha -= this.decay
    this.vy += this.type === "burst" ? 0.03 : -0.01 // gravity for burst, float up for trail
    this.vx *= 0.98
    this.size *= 0.995
    this.rotation += this.rotSpeed
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.globalAlpha = Math.max(0, this.alpha)
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)

    if (this.shape === "diamond") {
      // Diamond shape (rotated square)
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`
      ctx.beginPath()
      const s = this.size
      ctx.moveTo(0, -s)
      ctx.lineTo(s, 0)
      ctx.lineTo(0, s)
      ctx.lineTo(-s, 0)
      ctx.closePath()
      ctx.fill()
      
      // Glow
      ctx.shadowColor = `rgba(${this.color}, ${this.alpha * 0.5})`
      ctx.shadowBlur = this.size * 2
      ctx.fill()
    } else if (this.shape === "star") {
      // 4-point star
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`
      ctx.beginPath()
      const s = this.size
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2
        ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s)
        const midAngle = angle + Math.PI / 4
        ctx.lineTo(Math.cos(midAngle) * s * 0.35, Math.sin(midAngle) * s * 0.35)
      }
      ctx.closePath()
      ctx.fill()
      
      ctx.shadowColor = `rgba(${this.color}, ${this.alpha * 0.4})`
      ctx.shadowBlur = this.size * 3
      ctx.fill()
    } else {
      // Circle with glow
      ctx.beginPath()
      ctx.arc(0, 0, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`
      ctx.fill()

      // Outer glow
      ctx.beginPath()
      ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.15})`
      ctx.fill()
    }

    ctx.restore()
  }
}
