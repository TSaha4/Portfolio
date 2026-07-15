"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const isMobileRef = useRef<boolean>(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const createParticles = useCallback((width: number, height: number, isMobile: boolean) => {
    const particleCount = isMobile ? 30 : 60
    const particles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        radius: Math.random() * 2 + 1,
      })
    }
    
    return particles
  }, [])

  // Detect prefers-reduced-motion query
  useEffect(() => {
    if (typeof window === "undefined") return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const isMobile = window.innerWidth < 768
      isMobileRef.current = isMobile
      particlesRef.current = createParticles(canvas.width, canvas.height, isMobile)
    }

    resizeCanvas()
    
    // Throttle resize events
    let resizeFrame: number
    const handleResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(resizeCanvas)
    }
    window.addEventListener("resize", handleResize)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = true
      const particles = particlesRef.current
      const connectionDistance = 150
      const isMobile = isMobileRef.current

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position only if motion is allowed
        if (!prefersReducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        }

        // Draw particle
        if (isDark) {
          // Double-arc outer/inner drawing to simulate glow without using costly CPU shadowBlur
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 255, 255, 0.12)"
          ctx.fill()

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 255, 255, 0.75)"
          ctx.fill()
        } else {
          // Light mode (fallback)
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(124, 58, 237, 0.4)"
          ctx.fill()
        }

        // Draw connections (skip on mobile for performance)
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[j].x - particle.x
            const dy = particles[j].y - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < connectionDistance) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(particles[j].x, particles[j].y)
              
              const opacity = (1 - distance / connectionDistance) * 0.3
              ctx.strokeStyle = isDark 
                ? `rgba(212, 175, 55, ${opacity})`
                : `rgba(124, 58, 237, ${opacity})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      })

      if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(resizeFrame)
      cancelAnimationFrame(animationRef.current)
    }
  }, [createParticles, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
