"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from "lucide-react"
import { LayerHeader } from "@/components/ui/layer-header"
import { Reveal } from "@/components/ui/reveal"
import { club, clubProjects, type ClubProject } from "@/content/club"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 5000
const N = clubProjects.length

/** Drawn stand-in for products without a screenshot yet: a floor plan with a route being traced. */
function FloorPlanArt() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full bg-[#140c2b]" aria-hidden="true">
      <g fill="none" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="2">
        <rect x="20" y="20" width="280" height="160" rx="6" />
        <path d="M120 20 V90 M120 120 V180 M200 20 V70 M200 100 V180 M20 100 H90 M230 100 H300" />
      </g>
      <motion.path d="M50 150 H150 V60 H250 V140" fill="none" stroke="#f5d76e" strokeWidth="4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} />
      <circle cx="50" cy="150" r="7" fill="#d4af37" />
      <circle cx="250" cy="140" r="7" fill="#a78bfa" />
      <text x="160" y="196" textAnchor="middle" className="fill-violet-200 font-mono text-[10px]">floor 2 → lift → floor 3</text>
    </svg>
  )
}

/** Phone screenshots fanned out like a hand of cards, for mobile apps. */
function ScreensCollage({ screens, title }: { screens: string[]; title: string }) {
  const mid = (screens.length - 1) / 2
  return (
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_50%_60%,#2a2160,#0f0f1a_75%)]">
      {screens.slice(0, 5).map((src, i) => (
        <span key={src} className="absolute bottom-[-6%] left-1/2 aspect-[9/19] h-[92%] overflow-hidden rounded-[14px] border-2 border-foreground/80 bg-background shadow-[0_12px_30px_-8px_rgba(0,0,0,0.8)]"
          style={{ transform: `translateX(calc(-50% + ${(i - mid) * 34}%)) rotate(${(i - mid) * 7}deg)`, zIndex: 10 - Math.abs(Math.round(i - mid)) }}>
          <Image src={src} alt={`${title} screen ${i + 1}`} fill sizes="160px" className="object-cover object-top" />
        </span>
      ))}
    </div>
  )
}

/** Phones: the write-up as an ordinary description under the image banner. */
function PlainInfo({ p, front }: { p: ClubProject; front: boolean }) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col overflow-y-auto p-4 scrollbar-hide", !front && "pointer-events-none")}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-xl font-bold tracking-tight">{p.title}</h3>
        {p.status !== "shipped" && (
          <span className="animate-pulse rounded-full border border-violet-300/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-violet-200">ongoing</span>
        )}
      </div>
      <p className="font-hand text-lg leading-tight text-violet-200">{p.tagline}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{p.description}</p>
      <p className="mt-2 text-[13px] text-foreground/85"><span className="text-primary">✷ </span>{p.highlights[0]}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
        {p.live ? (
          <a href={p.live.href} target="_blank" rel="noopener noreferrer" tabIndex={front ? 0 : -1}
            className="wobble inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-2 text-sm font-semibold text-background">
            {p.live.label} <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="rounded-lg border-2 border-dashed border-violet-300/50 px-3.5 py-1.5 text-sm font-semibold text-violet-200">Launching soon</span>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer" tabIndex={front ? 0 : -1} aria-label={`${p.title} source on GitHub`}
            className="wobble grid h-9 w-9 place-items-center rounded-full border-2 border-foreground/70">
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  )
}

/** Signed shortest distance from the active slide, so the ring wraps both ways. */
const offsetOf = (i: number, active: number) => {
  let o = i - active
  if (o > N / 2) o -= N
  if (o < -N / 2) o += N
  return o
}

function Slide({ p, index, offset, narrow, onSelect }: { p: ClubProject; index: number; offset: number; narrow: boolean; onSelect: () => void }) {
  const d = Math.abs(offset)
  const front = offset === 0
  return (
    <motion.div
      onClick={front ? undefined : onSelect}
      role={front ? "group" : "button"}
      tabIndex={front ? undefined : 0}
      aria-label={front ? p.title : `Show ${p.title}`}
      onKeyDown={(e) => { if (!front && (e.key === "Enter" || e.key === " ")) onSelect() }}
      className={cn("absolute left-1/2 top-0 h-full w-[84%] overflow-hidden rounded-3xl border-2 border-foreground/80 bg-muted shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] md:w-[62%]", narrow && "flex flex-col", !front && "cursor-pointer")}
      animate={{
        // phones: neighbours slide fully aside instead of peeking behind the front card
        x: `calc(-50% + ${offset * (narrow ? 112 : 62)}%)`,
        scale: 1 - Math.min(d, 2) * (narrow ? 0.08 : 0.14),
        rotateY: offset * (narrow ? -10 : -24),
        opacity: d > 1.5 ? 0 : 1 - d * 0.4,
        zIndex: 10 - d,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      style={{ pointerEvents: d > 1.5 ? "none" : "auto" }}
    >
      {/* the image is the card (desktop); a banner above the description (phones) */}
      <div className={cn("z-0 bg-background", narrow ? "relative h-[42%] shrink-0 overflow-hidden border-b-2 border-foreground/80" : "absolute inset-0")}>
        {p.screens?.length ? (
          <ScreensCollage screens={p.screens} title={p.title} />
        ) : p.image ? (
          <Image src={p.image} alt={`${p.title} preview`} fill sizes="(max-width: 768px) 90vw, 760px" className="object-cover object-top" />
        ) : (
          <FloorPlanArt />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-0.5 font-mono text-[11px] text-secondary">
          {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </span>
      </div>

      {narrow && <PlainInfo p={p} front={front} />}

      {/* sticky note with the write-up, taped on top; drops in when this card comes to the front */}
      {!narrow && <motion.div
        initial={false}
        animate={front ? { opacity: 1, y: 0, rotate: index % 2 ? 2.5 : -2.5, scale: 1 } : { opacity: 0, y: -40, rotate: index % 2 ? 10 : -10, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: front ? 0.25 : 0 }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        className={cn(
          "absolute bottom-4 left-4 right-4 z-10 max-h-[62%] overflow-y-auto bg-[#fdf3b0] p-4 text-[#2a2416] shadow-[0_18px_30px_-10px_rgba(0,0,0,0.7)] scrollbar-hide",
          "[background-image:linear-gradient(transparent_0_calc(100%-1px),rgba(42,36,22,0.08)_0)] [background-size:100%_26px]",
          "md:bottom-5 md:left-auto md:right-5 md:max-h-[88%] md:w-[50%] md:p-4",
          !front && "pointer-events-none",
        )}
      >
        {/* strip of tape */}
        <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-white/50 shadow-sm" />
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-2xl font-bold tracking-tight">{p.title}</h3>
          {p.status !== "shipped" && (
            <span className="rounded-full border border-[#7a1f15]/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#7a1f15]">ongoing</span>
          )}
        </div>
        <p className="font-hand text-xl leading-tight text-[#7a4b0f]">{p.tagline}</p>
        <p className="mt-2 text-[13px] leading-relaxed md:text-sm">{p.description}</p>
        <p className="mt-2 font-hand text-lg leading-snug text-[#7a1f15]">→ {p.highlights[0]}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {p.live ? (
            <a href={p.live.href} target="_blank" rel="noopener noreferrer" tabIndex={front ? 0 : -1}
              className="wobble inline-flex items-center gap-1.5 rounded-lg bg-[#2a2416] px-3.5 py-2 text-sm font-semibold text-[#fdf3b0]">
              {p.live.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <span className="rounded-lg border-2 border-dashed border-[#2a2416]/50 px-3.5 py-1.5 text-sm font-semibold">Launching soon</span>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" tabIndex={front ? 0 : -1} aria-label={`${p.title} source on GitHub`}
              className="wobble grid h-9 w-9 place-items-center rounded-full border-2 border-[#2a2416]">
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>}
    </motion.div>
  )
}

/** VinnovateIT products as a 3D coverflow: the front slide's details resolve underneath. */
export function Club() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])
  const go = (dir: number) => setActive((a) => (a + dir + N) % N)

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused])

  return (
    <section id="club" className="relative overflow-x-clip px-6 py-16 sm:px-12 md:py-24 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <LayerHeader id="club" title="Club endeavors." caption="Products built by the team at VinnovateIT, VIT's tech club." note="built with my club" />
          <Reveal className="mb-8 md:mb-12">
            <div className="flex items-center gap-3">
              <span className="-rotate-3 font-hand text-2xl text-secondary md:text-3xl">explore →</span>
              <a href={club.site} target="_blank" rel="noopener noreferrer" aria-label="Explore VinnovateIT"
                className="wobble group inline-flex items-center gap-4 rounded-full border-2 border-violet-400/50 bg-[#140c2b]/80 py-3.5 pl-6 pr-5 shadow-[0_0_30px_-10px_rgba(167,139,250,0.7)] transition-colors hover:border-violet-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={club.logo} alt={`${club.name} logo`} className="h-9 w-auto md:h-10" />
                <ArrowUpRight className="h-5 w-5 text-violet-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1) }}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Club projects"
            className="outline-none"
          >
            {/* the stage: drag or swipe to rotate the ring */}
            <motion.div
              className="relative mx-auto h-[500px] w-full touch-pan-y [perspective:1600px] sm:h-[460px] md:h-[390px]"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 60) go(info.offset.x < 0 ? 1 : -1) }}
            >
              {clubProjects.map((c, i) => <Slide key={c.id} p={c} index={i} offset={offsetOf(i, active)} narrow={narrow} onSelect={() => setActive(i)} />)}
            </motion.div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="wobble grid h-11 w-11 place-items-center rounded-full border-2 border-foreground/70 hover:border-primary hover:text-primary">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {clubProjects.map((c, i) => (
                  <button key={c.id} type="button" onClick={() => setActive(i)} aria-label={`Go to ${c.title}`}
                    className={cn("h-2.5 rounded-full transition-all duration-300", i === active ? "w-8 bg-primary" : "w-2.5 bg-foreground/30 hover:bg-foreground/60")} />
                ))}
              </div>
              <button type="button" onClick={() => go(1)} aria-label="Next project" className="wobble grid h-11 w-11 place-items-center rounded-full border-2 border-foreground/70 hover:border-primary hover:text-primary">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  )
}
