"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion"
import { Github, Play } from "lucide-react"
import { LayerHeader } from "@/components/ui/layer-header"
import { projects, type Project } from "@/content/projects"
import { cn } from "@/lib/utils"

/** bookmark ribbon colours, each with a text colour that stays readable on it */
const RIBBONS = [
  { bg: "#d4af37", fg: "#1a1406" },
  { bg: "#c0392b", fg: "#fff7e6" },
  { bg: "#f5d76e", fg: "#1a1406" },
  { bg: "#8e6bbf", fg: "#fff7e6" },
  { bg: "#3f8f7a", fg: "#fff7e6" },
]
const caseNo = (i: number) => `#${String(i + 1).padStart(3, "0")}`

/** Left-hand page: the project's evidence photo, paper-clipped to the sheet. */
function EvidencePage({ project, index }: { project: Project; index: number }) {
  return (
    <div className="flex h-full flex-col p-6 lg:p-8">
      <p className="font-mono text-[10px] tracking-[0.3em] text-[#8a6d1d]">EXHIBIT A · CASE {caseNo(index)}</p>
      <figure className="relative mt-4 rotate-[-2deg] bg-white p-2 pb-8 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]">
        <span className="absolute -top-3 left-8 z-10 h-8 w-3 rounded-full border-2 border-[#8d8d8d] bg-transparent" />
        <div className="relative aspect-[4/3] overflow-hidden bg-[#ddd]">
          <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(max-width: 1024px) 90vw, 420px" className="object-cover" />
        </div>
        <figcaption className="absolute bottom-1.5 left-3 font-hand text-lg text-[#2a2416]">{project.title}, the build</figcaption>
      </figure>
      <p className="mt-auto font-hand text-xl leading-snug text-[#7a1f15]">
        stack → {project.tech.slice(0, 4).join(", ")}
      </p>
    </div>
  )
}

/** Right-hand page: the case notes, typed up. */
function NotesPage({ project, index, withPhoto }: { project: Project; index: number; withPhoto?: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto p-5 scrollbar-hide lg:p-8">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.3em] text-[#8a6d1d] lg:text-xs">{project.tagline.toUpperCase()}</p>
        <span className="shrink-0 -rotate-6 border-2 border-[#c0392b] px-1.5 font-mono text-[10px] font-bold tracking-widest text-[#c0392b]">CLOSED</span>
      </div>
      <h3 className="mt-2 font-display text-3xl font-bold text-[#1a1406] lg:text-4xl">{project.title}</h3>
      {withPhoto && (
        <div className="relative mt-3 aspect-video overflow-hidden rounded-sm bg-[#ddd]">
          <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="90vw" className="object-cover" />
        </div>
      )}
      <p className="mt-3 font-mono text-[13px] leading-relaxed text-[#2a2416] sm:text-sm lg:text-[15px] lg:leading-7">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1">
        {project.tech.map((t) => <span key={t} className="border border-[#2a2416]/40 px-2 py-0.5 font-mono text-[11px] text-[#2a2416] lg:text-xs">{t}</span>)}
      </div>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="wobble inline-flex items-center gap-1.5 bg-[#1a1406] px-3 py-1.5 font-mono text-xs text-[#f5d76e]">
          <Github className="h-3.5 w-3.5" /> source
        </a>
        {project.video && (
          <a href={project.video} target="_blank" rel="noopener noreferrer" className="wobble inline-flex items-center gap-1.5 border border-[#1a1406] px-3 py-1.5 font-mono text-xs text-[#1a1406]">
            <Play className="h-3.5 w-3.5" /> demo video
          </a>
        )}
      </div>
    </div>
  )
}

const paper = "bg-[#f4efe2] [background-image:repeating-linear-gradient(0deg,transparent_0_27px,rgba(42,36,22,0.07)_27px_28px)]"

/**
 * A leaf hinged on the spine. Front = notes for project k (right page);
 * back = evidence for project k+1 (it lands as the left page once turned).
 */
function Leaf({ k, turn, front, back }: { k: number; turn: MotionValue<number>; front: React.ReactNode; back?: React.ReactNode }) {
  const amount = useTransform(turn, (t) => Math.min(Math.max(t - k, 0), 1))
  const rotateY = useTransform(amount, [0, 1], [0, -180])
  const zIndex = useTransform(amount, (a) => (a > 0.5 ? 10 + k : 100 - k))
  const shade = useTransform(amount, [0, 0.5, 1], [0, 0.25, 0])
  return (
    <motion.div style={{ rotateY, zIndex }} className="absolute inset-y-0 right-0 w-full origin-left [transform-style:preserve-3d] lg:w-1/2">
      <div className={cn("absolute inset-0 overflow-hidden rounded-r-md [backface-visibility:hidden]", paper)}>
        {front}
        <motion.div style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-black" />
      </div>
      <div className={cn("absolute inset-0 hidden overflow-hidden rounded-l-md [backface-visibility:hidden] [transform:rotateY(180deg)] lg:block", paper)}>
        {back}
      </div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const last = projects.length - 1
  // desktop: scroll turns pages (holding briefly on the first and last spreads)
  // phones: the book sits in the flow and a horizontal swipe turns the page
  const [touchBook, setTouchBook] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)")
    const sync = () => setTouchBook(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])
  const scrollTurn = useTransform(scrollYProgress, [0.05, 0.9], [0, last])
  const swipeTurn = useMotionValue(0)
  const turn = touchBook ? swipeTurn : scrollTurn
  const [current, setCurrent] = useState(0)
  useMotionValueEvent(scrollTurn, "change", (t) => { if (!touchBook) setCurrent(Math.min(last, Math.max(0, Math.round(t)))) })

  const turnTo = (i: number) => {
    const next = Math.min(last, Math.max(0, i))
    setCurrent(next)
    animate(swipeTurn, next, { duration: 0.7, ease: [0.4, 0, 0.2, 1] })
  }

  const jump = (i: number) => {
    if (touchBook) return turnTo(i)
    const el = ref.current
    if (!el) return
    const span = el.offsetHeight - window.innerHeight
    const p = 0.05 + (i / last) * 0.85
    // page-relative top (offsetTop would be relative to the section, which sent bookmarks astray)
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + span * p, behavior: "smooth" })
  }

  return (
    <section id="projects" className="relative px-6 pt-16 sm:px-12 lg:px-24 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <LayerHeader id="projects" title="The case files." caption="My projects, bound as a dossier. Turn the pages (scroll, or swipe on phones) or jump straight to one with a bookmark." note="explore my work!" />
      </div>

      <div ref={ref} className="relative -mx-2 sm:-mx-6 lg:-mx-16" style={touchBook ? undefined : { height: `${projects.length * 60 + 60}vh` }}>
        <div className={cn("flex items-center justify-center", touchBook ? "py-4" : "sticky top-0 h-[100svh] pb-8 pt-24")}>
          <div className="relative flex w-full max-w-[1320px] items-stretch">
            {/* bookmarks sticking out of the left edge */}
            <nav aria-label="Project bookmarks" className="relative z-0 -mr-1.5 flex flex-col justify-center gap-2">
              {projects.map((p, i) => (
                <button key={p.id} type="button" onClick={() => jump(i)} aria-current={current === i}
                  style={{ background: RIBBONS[i % RIBBONS.length].bg, color: RIBBONS[i % RIBBONS.length].fg }}
                  className={cn(
                    "rounded-l-lg font-mono font-bold shadow-[-4px_4px_0_rgba(0,0,0,0.35)] transition-all duration-300",
                    "px-2 py-3 text-xs [writing-mode:vertical-rl] rotate-180 lg:rotate-0 lg:px-4 lg:py-3 lg:text-left lg:text-sm lg:[writing-mode:horizontal-tb] lg:w-44",
                    current === i ? "-translate-x-3 ring-2 ring-[#1a1406]/40" : "opacity-80 hover:-translate-x-1.5 hover:opacity-100",
                  )}>
                  <span className="hidden opacity-70 lg:inline">{caseNo(i)} </span>{p.title}
                </button>
              ))}
            </nav>

            {/* the book */}
            <motion.div
              onPanEnd={(_, info) => {
                // only clearly horizontal swipes turn pages; vertical drags keep scrolling the page
                if (!touchBook || Math.abs(info.offset.x) < 50 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return
                turnTo(current + (info.offset.x < 0 ? 1 : -1))
              }}
              style={{ touchAction: "pan-y" }}
              className="relative h-[min(80svh,820px)] flex-1 lg:h-[min(calc(100svh-9rem),860px)] rounded-lg [&_*]:[touch-action:pan-y] border-4 border-[#5a4512] bg-[#3a2c0c] p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] [perspective:2200px] sm:p-3">
              <div className="relative h-full w-full">
                {/* base left page: evidence of the first case (desktop only) */}
                <div className={cn("absolute inset-y-0 left-0 hidden w-1/2 overflow-hidden rounded-l-md lg:block", paper)}>
                  <EvidencePage project={projects[0]} index={0} />
                </div>
                {/* the spine */}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[200] hidden w-8 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.25),transparent)] lg:block" />
                {projects.map((p, k) => (
                  <Leaf key={p.id} k={k} turn={turn}
                    front={
                      <>
                        <div className="hidden h-full lg:block"><NotesPage project={p} index={k} /></div>
                        <div className="h-full lg:hidden"><NotesPage project={p} index={k} withPhoto /></div>
                      </>
                    }
                    back={projects[k + 1] && <EvidencePage project={projects[k + 1]} index={k + 1} />}
                  />
                ))}
              </div>
              <p className="absolute -bottom-7 right-2 font-mono text-[10px] text-muted-foreground">
                {touchBook && <span className="mr-2 text-secondary">← swipe to turn →</span>}page {current + 1} / {projects.length}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pb-4 pt-6">
        <a href="https://github.com/TSaha4" target="_blank" rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border-2 border-foreground/80 bg-muted py-3 pl-3 pr-6 shadow-[5px_5px_0_var(--primary)] transition-all hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--glow)]">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-foreground text-background transition-transform group-hover:-rotate-6"><Github className="h-6 w-6" /></span>
          <span>
            <span className="block font-hand text-lg leading-none text-secondary">the archive goes deeper</span>
            <span className="block font-display text-lg font-bold">More cases on GitHub</span>
            <span className="block font-mono text-xs text-muted-foreground">github.com/TSaha4</span>
          </span>
          <svg viewBox="0 0 48 24" className="ml-2 h-6 w-12 text-primary transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12h44" /><path d="m36 5 10 7-10 7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
