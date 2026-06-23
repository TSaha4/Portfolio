"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"

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
  const { resolvedTheme } = useTheme()

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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const isMobile = window.innerWidth < 768
      particlesRef.current = createParticles(canvas.width, canvas.height, isMobile)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = resolvedTheme === "dark"
      const particles = particlesRef.current
      const connectionDistance = 150
      const isMobile = window.innerWidth < 768

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        
        if (isDark) {
          // Dark mode: glowing white dots
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
          ctx.shadowBlur = 10
          ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
        } else {
          // Light mode: grey dots
          ctx.fillStyle = "rgba(124, 58, 237, 0.4)"
          ctx.shadowBlur = 0
        }
        ctx.fill()
        ctx.shadowBlur = 0

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

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [resolvedTheme, createParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
