"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { FileText } from "lucide-react"
import { AvatarFlip } from "@/components/persona/avatar-flip"
import { LayerHeader } from "@/components/ui/layer-header"
import { LinkButton } from "@/components/ui/link-button"
import { Reveal } from "@/components/ui/reveal"
import { profile } from "@/content/profile"

/**
 * Hand-picked attention map: hovering a key token draws arcs to the words it "attends" to.
 * Keys are lower-case words from the bio; values are the words they link to.
 */
const ATTENTION: Record<string, string[]> = {
  curious: ["question", "iteration", "learning"],
  code: ["problems", "systems", "think"],
  runs: ["generalizes", "scales", "sense"],
  model: ["generalizes", "runs"],
  system: ["scales", "systems", "building"],
  learning: ["curious", "harder", "better"],
  iteration: ["broken", "bug", "better"],
}
// first alphabetic run, so "runs—whether" maps to "runs"
const norm = (w: string) => w.toLowerCase().match(/[a-z]+/)?.[0] ?? ""

type Arc = { x1: number; y1: number; x2: number; y2: number; w: number }

function AttentionText() {
  const wrap = useRef<HTMLDivElement>(null)
  const [focus, setFocus] = useState<string | null>(null)
  const [arcs, setArcs] = useState<Arc[]>([])

  useLayoutEffect(() => {
    const root = wrap.current
    if (!root || !focus) return setArcs([])
    const box = root.getBoundingClientRect()
    const center = (el: Element) => {
      const r = el.getBoundingClientRect()
      return [r.left - box.left + r.width / 2, r.top - box.top] as const
    }
    const src = root.querySelector(`[data-tok="${focus}"]`)
    if (!src) return
    const [x1, y1] = center(src)
    const next: Arc[] = []
    ATTENTION[focus].forEach((t, i) => {
      root.querySelectorAll(`[data-tok="${t}"]`).forEach((el) => {
        const [x2, y2] = center(el)
        next.push({ x1, y1, x2, y2, w: 1 - i * 0.25 })
      })
    })
    setArcs(next)
  }, [focus])

  const targets = focus ? new Set(ATTENTION[focus]) : new Set<string>()

  return (
    <div ref={wrap} className="relative">
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {arcs.map((a, i) => {
          const lift = Math.min(60, Math.abs(a.x2 - a.x1) / 3 + 20)
          return (
            <path
              key={i}
              d={`M${a.x1},${a.y1} C${a.x1},${a.y1 - lift} ${a.x2},${a.y2 - lift} ${a.x2},${a.y2}`}
              fill="none"
              stroke="var(--glow)"
              strokeOpacity={0.3 + a.w * 0.6}
              strokeWidth={1 + a.w * 1.5}
              className="edge-flow"
            />
          )
        })}
      </svg>
      {profile.bio.map((para, pi) => (
        <p key={pi} className="mb-5 text-base leading-[2] text-muted-foreground md:text-lg">
          {para.split(" ").map((word, wi) => {
            const n = norm(word)
            const isKey = n in ATTENTION
            const lit = n === focus || targets.has(n)
            return (
              <span key={wi}>
                <span
                  data-tok={n}
                  onMouseEnter={isKey ? () => setFocus(n) : undefined}
                  onMouseLeave={isKey ? () => setFocus(null) : undefined}
                  onClick={isKey ? () => setFocus(focus === n ? null : n) : undefined}
                  className={`rounded px-0.5 transition-colors duration-300 ${
                    lit ? "bg-primary/20 text-secondary" : isKey ? "cursor-help text-foreground underline decoration-primary/50 decoration-dotted underline-offset-4" : ""
                  }`}
                >
                  {word}
                </span>{" "}
              </span>
            )
          })}
        </p>
      ))}
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-16 sm:px-12 lg:px-24 md:py-24">
      <div className="mx-auto max-w-6xl">
        <LayerHeader id="about" title="About me, tokenised." caption="Hover the underlined tokens to see what each one attends to." note="hello there!" />
        <div className="grid items-start gap-14 md:grid-cols-[1fr_300px]">
          <div>
            <Reveal><AttentionText /></Reveal>
            <Reveal delay={0.1}>
              <blockquote className="my-8 border-l-2 border-primary pl-5">
                <p className="font-display text-xl italic md:text-2xl">“{profile.quote.text}”</p>
                <footer className="mt-2 font-mono text-xs uppercase tracking-widest text-primary">— {profile.quote.author}</footer>
              </blockquote>
              <LinkButton href={profile.resume} variant="solid">
                <FileText className="h-4 w-4" /> View the magic, documented.
              </LinkButton>
            </Reveal>
          </div>
          <Reveal delay={0.15}><AvatarFlip /></Reveal>
        </div>

      </div>
    </section>
  )
}
