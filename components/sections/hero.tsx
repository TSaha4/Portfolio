"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, FileText } from "lucide-react"
import { ConvergenceField, type TextBounds, type TrainingStats } from "@/components/fx/convergence-field"
import { WaveSprite } from "@/components/persona/wave-sprite"
import { LinkButton } from "@/components/ui/link-button"
import { profile } from "@/content/profile"
import { useIntroDone } from "@/lib/intro"

function useRotatingRole(roles: string[], ms = 2800) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), ms)
    return () => clearInterval(t)
  }, [roles.length, ms])
  return roles[i]
}

export function Hero() {
  const ready = useIntroDone()
  const [stats, setStats] = useState<TrainingStats>({ epoch: 0, loss: 1 })
  const [bounds, setBounds] = useState<TextBounds | null>(null)
  const role = useRotatingRole(profile.roles)
  const converged = stats.epoch > 0 && stats.loss < 2

  return (
    <section id="input" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* the name, learned by particles once the welcome curtain lifts */}
      <ConvergenceField text={profile.name.toUpperCase()} active={ready} onStats={setStats} onLayout={setBounds} className="absolute inset-0 h-full w-full" />

      {/* mini-me drops in from the top and lands on the first letter of the name */}
      {bounds && (
        <motion.div
          className="absolute z-10"
          style={{ left: bounds.left, top: bounds.top, translateY: "-100%" }}
          initial={{ y: "-110vh" }}
          animate={ready ? { y: 0 } : undefined}
          transition={{ type: "spring", stiffness: 140, damping: 11, mass: 1.1, delay: 1.1 }}
        >
          <WaveSprite />
        </motion.div>
      )}

      {/* cut-out portrait standing in front of the type */}
      <div className="pointer-events-none absolute bottom-0 right-[-12%] h-[56%] w-[78%] sm:right-[2%] sm:h-[80%] sm:w-[46%] lg:right-[5%] lg:w-[34%]">
        <Image
          src="/profile-cutout-4k.webp"
          alt="Tanmoy Saha"
          fill
          priority
          quality={90}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 34vw"
          className="object-contain object-bottom"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-background via-background/70 to-transparent sm:h-28 sm:via-transparent" />

      <div className="absolute bottom-8 left-6 right-6 max-w-md sm:left-12 md:bottom-12 lg:left-24">
        <p className="font-display text-3xl font-bold leading-tight md:text-5xl">
          I build systems that <span className="text-primary">learn</span>, <span className="text-primary">reason</span> &amp; <span className="text-primary">act</span>.
        </p>
        <p key={role} className="caret mt-3 animate-[fadein_.5s] font-mono text-xs uppercase tracking-widest text-muted-foreground">{role}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="#projects" variant="solid">See my work <ArrowDown className="h-4 w-4" /></LinkButton>
          <LinkButton href={profile.resume}><FileText className="h-4 w-4" /> Resume</LinkButton>
        </div>
        {/* live training readout from the particle field */}
        <p className="mt-5 hidden font-mono text-[11px] tracking-widest text-muted-foreground sm:block">
          epoch <span className="text-secondary">{String(stats.epoch).padStart(4, "0")}</span> · loss <span className="text-secondary">{stats.loss.toFixed(3)}</span> ·{" "}
          <span className={converged ? "text-primary" : "text-glow"}>{converged ? "converged" : ready ? "training…" : "waiting…"}</span>
        </p>
      </div>
      <style>{`@keyframes fadein { from { opacity: 0; transform: translateY(4px); } }`}</style>
    </section>
  )
}
