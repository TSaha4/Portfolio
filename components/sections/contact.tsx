"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { LayerHeader } from "@/components/ui/layer-header"
import { Reveal } from "@/components/ui/reveal"
import { TrainerSprite, type Facing } from "@/components/persona/trainer-sprite"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { astar, type Cell } from "@/lib/astar"
import { socials, type SocialLink } from "@/content/profile"
import { cn } from "@/lib/utils"

type Id = SocialLink["id"]
const COLS = 20
const ROWS = 11
const START: Cell = [3, 5]
/** Each channel is a building; walking onto its door tile rings the bell. */
const DEST: Record<Id, { building: Cell; door: Cell; label: string }> = {
  email: { building: [16, 1], door: [16, 2], label: "Post Office" },
  github: { building: [18, 5], door: [17, 5], label: "Code Lab" },
  linkedin: { building: [16, 8], door: [16, 9], label: "Guild Hall" },
}
const IDS = Object.keys(DEST) as Id[]
const ICONS = { email: Mail, github: Github, linkedin: Linkedin }
const STEP_MS = 55
const SEARCH_MS = 3
const key = (c: Cell) => c.join(",")

/** Seeded trees so server and client render the same map. */
function makeTrees() {
  const trees = new Set<string>()
  let seed = 11
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  for (let x = 0; x < COLS; x++) { trees.add(`${x},0`); trees.add(`${x},${ROWS - 1}`) }
  for (let y = 0; y < ROWS; y++) { trees.add(`0,${y}`); trees.add(`${COLS - 1},${y}`) }
  for (let i = 0; i < 30; i++) trees.add(`${5 + Math.floor(rand() * 9)},${1 + Math.floor(rand() * (ROWS - 2))}`)
  for (const [x, y] of [START, ...IDS.map((id) => DEST[id].door)])
    for (const dx of [-1, 0, 1]) trees.delete(`${x + dx},${y}`)
  for (const id of IDS) trees.delete(key(DEST[id].building))
  return trees
}

const facingOf = (a: Cell, b: Cell): Facing => (b[0] > a[0] ? "right" : b[0] < a[0] ? "left" : b[1] > a[1] ? "down" : "up")
/** Tap-to-wave: returns the current wave frame (undefined when idle) and a trigger. */
function useWave() {
  const [frame, setFrame] = useState<number | undefined>(undefined)
  const t = useRef<ReturnType<typeof setInterval> | undefined>(undefined)
  useEffect(() => () => clearInterval(t.current), [])
  const wave = () => {
    clearInterval(t.current)
    let n = 0
    setFrame(0)
    t.current = setInterval(() => {
      n++
      if (n > 7) { clearInterval(t.current); setFrame(undefined) } else setFrame(n)
    }, 160)
  }
  return [frame, wave] as const
}

const doorAt = (c: Cell) => IDS.find((id) => key(DEST[id].door) === key(c))

export function Contact() {
  const trees = useMemo(makeTrees, [])
  const walls = useMemo(() => new Set([...trees, ...IDS.map((id) => key(DEST[id].building))]), [trees])
  const reduced = useReducedMotion()
  const [pos, setPos] = useState<Cell>(START)
  const [facing, setFacing] = useState<Facing>("down")
  const [step, setStep] = useState(0)
  const [explored, setExplored] = useState<Set<string>>(new Set())
  const [path, setPath] = useState<Set<string>>(new Set())
  const [rung, setRung] = useState<Id | null>(null)
  const [confused, setConfused] = useState(false)
  const [waveFrame, wave] = useWave()
  const [blocked, setBlocked] = useState<SocialLink | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const posRef = useRef(pos)
  posRef.current = pos

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => clear, [])

  /** Ring a building: wobble it, then open its link (still inside the click's user-activation window). */
  const ring = (id: Id) => {
    const s = socials.find((x) => x.id === id)!
    const { door, building } = DEST[id]
    setRung(id)
    setFacing(facingOf(door, building))
    later(() => setRung(null), 900)
    // then step back off the doorstep (away from the building if possible) so it never looks stuck
    later(() => {
      const away: Cell = [door[0] * 2 - building[0], door[1] * 2 - building[1]]
      const options: Cell[] = [away, [door[0] - 1, door[1]], [door[0] + 1, door[1]], [door[0], door[1] + 1], [door[0], door[1] - 1]]
      const next = options.find((c) => !walls.has(key(c)))
      if (!next) return
      setFacing(facingOf(door, next))
      setStep((n) => n + 1)
      setPos(next)
      later(() => setFacing("down"), STEP_MS + 120)
    }, 700)
    if (id === "email") window.location.href = s.href
    else if (!window.open(s.href, "_blank", "noopener,noreferrer")) setBlocked(s)
  }

  /** Plan with A*, show the frontier, walk the route; arriving on a door rings it. */
  const goTo = (target: Cell) => {
    clear()
    setConfused(false)
    setBlocked(null)
    setExplored(new Set())
    setPath(new Set())
    const { visited, path: route } = astar(COLS, ROWS, walls, posRef.current, target)
    if (!route.length) return
    const search = reduced ? 0 : SEARCH_MS
    const walk = reduced ? 0 : STEP_MS
    visited.forEach((c, i) => later(() => setExplored((e) => new Set(e).add(key(c))), i * search))
    const t0 = visited.length * search
    later(() => setPath(new Set(route.map(key))), t0)
    route.slice(1).forEach((c, i) => later(() => { setFacing(facingOf(route[i], c)); setStep(i); setPos(c) }, t0 + (i + 1) * walk))
    const id = doorAt(target)
    const arrive = t0 + route.length * walk + 80
    if (id) later(() => ring(id), arrive)
    // nothing here: a puzzled "?" while facing the visitor
    else if (route.length > 1) {
      later(() => { setConfused(true); setFacing("down") }, arrive)
      later(() => setConfused(false), arrive + 900)
    }
  }

  const onTile = (c: Cell) => {
    if (!walls.has(key(c))) goTo(c)
  }

  /** Arrow keys / WASD walk one tile; stepping onto a door rings it. */
  const onKey = (e: React.KeyboardEvent) => {
    const d = ({ ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] } as Record<string, Cell>)[e.key]
    if (!d) return
    e.preventDefault()
    clear()
    setPath(new Set())
    const from = posRef.current
    const next: Cell = [from[0] + d[0], from[1] + d[1]]
    setFacing(facingOf(from, next))
    if (walls.has(key(next))) return
    setStep((s) => s + 1)
    setPos(next)
    const id = doorAt(next)
    if (id) ring(id)
  }

  const tile = (x: number, y: number) => ({ left: `${(x / COLS) * 100}%`, top: `${(y / ROWS) * 100}%`, width: `${100 / COLS}%`, height: `${100 / ROWS}%` })

  return (
    <section id="contact" className="relative px-6 py-16 sm:px-12 lg:px-24 md:py-24">
      <div className="mx-auto max-w-6xl">
        <LayerHeader id="contact" title="Let's build something intelligent." caption="Tap a building and mini-me plans a route with A*, walks over and rings the bell. Tap anywhere to roam, use the arrow keys, or tap mini-me to say hi." note="come say hi!" />

        <Reveal className="mx-auto hidden max-w-3xl md:block">
          <div
            role="application"
            aria-label="Contact map. Use arrow keys to walk; buildings are Email, GitHub and LinkedIn."
            tabIndex={0}
            onKeyDown={onKey}
            className="relative aspect-[20/11] w-full touch-manipulation select-none overflow-hidden rounded-2xl border-4 border-foreground/80 bg-[#16213a] shadow-[6px_6px_0_var(--primary)] outline-none focus-visible:ring-4 focus-visible:ring-primary/60"
          >
            <div className="absolute inset-0 [background-image:repeating-conic-gradient(#1a2744_0_25%,#16213a_0_50%)] [background-size:calc(200%/20)_calc(200%/11)]" />
            {/* click targets for every tile */}
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS},1fr)`, gridTemplateRows: `repeat(${ROWS},1fr)` }}>
              {Array.from({ length: COLS * ROWS }, (_, i) => {
                const c: Cell = [i % COLS, Math.floor(i / COLS)]
                return <span key={i} onClick={() => onTile(c)} className={cn(!walls.has(key(c)) && "hover:bg-glow/15")} />
              })}
            </div>
            {[...explored].map((k) => { const [x, y] = k.split(",").map(Number); return <span key={`e${k}`} className="pointer-events-none absolute bg-primary/15" style={tile(x, y)} /> })}
            {[...path].map((k) => {
              const [x, y] = k.split(",").map(Number)
              return <span key={`p${k}`} className="pointer-events-none absolute flex items-center justify-center" style={tile(x, y)}><span className="h-1/4 w-1/4 rounded-full bg-secondary/80" /></span>
            })}
            {[...trees].map((k) => {
              const [x, y] = k.split(",").map(Number)
              return (
                <span key={`t${k}`} className="pointer-events-none absolute flex items-end justify-center" style={tile(x, y)}>
                  {/* outlined pixel-style tree: round canopy with highlight, short trunk */}
                  <span className="relative h-full w-full">
                    <span className="absolute bottom-0 left-1/2 h-[30%] w-[26%] -translate-x-1/2 border-2 border-[#0b1220] bg-[#5a3d2b]" />
                    <span className="absolute left-[6%] top-[4%] h-[72%] w-[88%] rounded-[45%] border-2 border-[#0b1220] bg-[#2c4a74] shadow-[inset_-3px_-4px_0_#1d3354,inset_3px_3px_0_#3f6699]" />
                  </span>
                </span>
              )
            })}
            {IDS.map((id) => {
              const [bx, by] = DEST[id].building
              const Icon = ICONS[id]
              return (
                <button key={id} type="button" onClick={() => goTo(DEST[id].door)} aria-label={`Walk to ${DEST[id].label} (${id})`}
                  className={cn("absolute z-10 flex items-center justify-center rounded-md border-2 border-[#0b1220] text-primary-foreground shadow-[0_3px_0_#0b1220] transition-colors hover:bg-secondary",
                    rung === id ? "wobble-now bg-glow" : "bg-primary")} style={tile(bx, by)}>
                  <Icon className="h-[55%] w-[55%]" />
                  <span className={cn("pointer-events-none absolute left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-background/90 px-2 py-0.5 font-mono text-xs text-secondary sm:block",
                    id === "linkedin" ? "-top-6" : "-bottom-6")}>{DEST[id].label}</span>
                  {rung === id && <span className="absolute -top-5 font-mono text-sm font-bold text-glow">!</span>}
                </button>
              )
            })}
            <span className="absolute z-20 transition-all ease-linear" style={{ ...tile(pos[0], pos[1]), transitionDuration: `${reduced ? 0 : STEP_MS}ms` }}>
              {/* tap mini-me to get a wave */}
              <button type="button" onClick={(e) => { e.stopPropagation(); wave() }} aria-label="Wave at mini-me" className="absolute inset-0 z-10 cursor-pointer" />
              {/* taller than its tile, like overworld sprites that overlap the row above */}
              <TrainerSprite facing={facing} step={step} wave={waveFrame} className="absolute bottom-0 left-[-12%] h-[135%] w-[124%] drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]" />
              {confused && (
                <span className="absolute -top-[95%] left-1/2 grid h-[90%] min-h-5 w-[90%] min-w-5 -translate-x-1/2 animate-bounce place-items-center rounded-md border-2 border-[#0b1220] bg-foreground font-mono text-sm font-bold text-background">?</span>
              )}
            </span>
          </div>
        </Reveal>

        <Reveal className="md:hidden"><MobileStrip /></Reveal>

        {/* plain-text fallback so contact details are always one glance away */}
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-sm text-muted-foreground">
          {socials.map((s) => (
            <a key={s.id} href={s.href} {...(s.id !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hover:text-secondary">
              {s.label.toLowerCase()} · {s.handle}
            </a>
          ))}
          {blocked && <a href={blocked.href} target="_blank" rel="noopener noreferrer" className="text-primary underline">popup blocked · open {blocked.label} ↗</a>}
        </div>
      </div>
    </section>
  )
}

/** Phones: no map, just mini-me walking along three big buttons and pressing the one you tap. */
function MobileStrip() {
  const [at, setAt] = useState(1)
  const [facing, setFacing] = useState<Facing>("down")
  const [step, setStep] = useState(0)
  const [pressed, setPressed] = useState<Id | null>(null)
  const [blocked, setBlocked] = useState<SocialLink | null>(null)
  const [waveFrame, wave] = useWave()
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const press = (i: number) => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setBlocked(null)
    const s = socials[i]
    const dist = Math.abs(i - at)
    setFacing(i > at ? "right" : i < at ? "left" : "up")
    // walk animation frames while gliding over, then face the button and press it
    for (let k = 0; k < dist * 4; k++) timers.current.push(setTimeout(() => setStep((n) => n + 1), k * 70))
    setAt(i)
    timers.current.push(setTimeout(() => {
      setFacing("up")
      setPressed(s.id)
      if (s.id === "email") window.location.href = s.href
      else if (!window.open(s.href, "_blank", "noopener,noreferrer")) setBlocked(s)
      timers.current.push(setTimeout(() => setPressed(null), 700))
    }, dist * 280 + 60))
  }

  return (
    <div className="rounded-2xl border-2 border-foreground/80 bg-muted p-4 shadow-[5px_5px_0_var(--primary)]">
      <div className="relative h-16">
        <button type="button" onClick={wave} aria-label="Wave at mini-me"
          className="absolute bottom-0 h-16 w-12 -translate-x-1/2 transition-[left] ease-linear" style={{ left: `${(at * 2 + 1) * (100 / 6)}%`, transitionDuration: `${280}ms` }}>
          <TrainerSprite facing={facing} step={step} wave={waveFrame} className="h-full w-full" />
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3">
        {socials.map((s, i) => {
          const Icon = ICONS[s.id]
          return (
            <button key={s.id} type="button" onClick={() => press(i)}
              className={cn("wobble flex flex-col items-center gap-1.5 rounded-xl border-2 border-foreground/80 py-3 shadow-[0_4px_0_#0b1220] transition-colors",
                pressed === s.id ? "wobble-now bg-glow text-background" : "bg-primary text-primary-foreground")}>
              <Icon className="h-6 w-6" />
              <span className="text-sm font-bold">{s.label}</span>
            </button>
          )
        })}
      </div>
      {blocked && <a href={blocked.href} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center font-mono text-xs text-primary underline">popup blocked · open {blocked.label} ↗</a>}
    </div>
  )
}
