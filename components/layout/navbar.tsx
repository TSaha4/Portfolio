"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { layers } from "@/content/layers"
import { profile } from "@/content/profile"
import { useActiveLayer } from "@/hooks/use-active-layer"
import { cn } from "@/lib/utils"

const links = layers.filter((l) => l.id !== "input")

/** Floating glass navbar: transparent over the hero, frosted once you scroll; a sheet on mobile. */
export function Navbar() {
  const { active } = useActiveLayer()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-4">
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 md:px-6",
          scrolled || open ? "border-[var(--border)] bg-[var(--glass-bg)] shadow-lg shadow-black/30 backdrop-blur-xl" : "border-transparent",
        )}
      >
        <a href="#input" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          {/* photo only appears once you scroll past the hero, where the big portrait already is */}
          <span className={cn("overflow-hidden transition-all duration-500", scrolled ? "w-10 opacity-100" : "-mr-2.5 w-0 opacity-0")}>
            <Image src={profile.photo} alt="" width={40} height={40} className="h-10 w-10 max-w-none rounded-full border-2 border-primary object-cover object-[50%_25%]" />
          </span>
          <span className="font-display text-base font-bold tracking-wide md:text-lg">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1.5 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={cn("relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors", active === l.id ? "text-primary-foreground" : "text-foreground/70 hover:bg-white/5 hover:text-foreground")}>
                {active === l.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="wobble hidden rounded-full bg-primary px-5 py-2 text-[15px] font-semibold text-primary-foreground sm:inline-block">
            Resume
          </a>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-xl lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 grid max-w-6xl gap-1 rounded-2xl border border-[var(--border)] bg-[var(--glass-bg)] p-2 backdrop-blur-xl lg:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)}
                  className={cn("flex items-center justify-between rounded-xl px-4 py-3.5 text-base", active === l.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted")}>
                  {l.name}<span className="font-mono text-[10px] opacity-60">{l.code}</span>
                </a>
              </li>
            ))}
            <li className="sm:hidden">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="block rounded-xl px-4 py-3.5 text-base text-primary">Resume ↗</a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
