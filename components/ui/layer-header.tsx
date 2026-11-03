import { layers, type LayerId } from "@/content/layers"
import { Reveal } from "./reveal"

/** Section heading: layer code, a hand-written margin note, the title and a one-line caption. */
export function LayerHeader({ id, title, caption, note }: { id: LayerId; title: string; caption: string; note?: string }) {
  const layer = layers.find((l) => l.id === id)!
  return (
    <Reveal className="mb-8 md:mb-12">
      <p className="hidden font-mono text-[13px] uppercase tracking-[0.3em] text-primary/80 sm:block">
        {layer.code} <span className="text-muted-foreground">·</span> {layer.name}
      </p>
      {note && <p className="-rotate-2 font-hand text-2xl text-secondary sm:mt-3">{note} ↘</p>}
      <h2 className="mt-2 font-display text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl">{title}</h2>
      <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">{caption}</p>
    </Reveal>
  )
}
