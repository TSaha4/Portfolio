import { cn } from "@/lib/utils"

const DEFAULT_ROWS = [
  ["Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "Computer Vision", "NLP", "Reinforcement Learning", "RAG"],
  ["Python", "PyTorch", "OpenCV", "FAISS", "FastAPI", "Next.js", "MongoDB", "Docker", "C/C++", "Java", "Kotlin"],
]

/**
 * Two counter-scrolling bands. The track is duplicated so translating it by -50% loops seamlessly.
 * Hovering pauses a band; words wobble individually.
 */
export function Marquee({ rows = DEFAULT_ROWS, tilt = -2, className }: { rows?: string[][]; tilt?: number; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden py-6", className)} aria-hidden="true">
      <div style={{ transform: `rotate(${tilt}deg)` }} className="-mx-8">
        {rows.map((words, r) => (
          <div key={r} className={cn("group flex overflow-hidden border-y py-3", r === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted/60 text-foreground")}>
            <div
              className="flex w-max shrink-0 group-hover:[animation-play-state:paused]"
              style={{ animation: `${r % 2 ? "marquee-right" : "marquee-left"} ${40 + r * 10}s linear infinite` }}
            >
              {[...words, ...words].map((w, i) => (
                <span key={i} className="flex items-center">
                  <span className={cn("wobble inline-block px-5 uppercase", r === 0 ? "font-display text-2xl font-bold tracking-tight md:text-4xl" : "font-pixel text-sm md:text-base")}>{w}</span>
                  <span className={r === 0 ? "text-2xl md:text-3xl" : "text-primary"}>✷</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
