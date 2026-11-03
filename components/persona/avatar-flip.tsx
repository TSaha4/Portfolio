"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { profile } from "@/content/profile"
import { AnimeAvatar } from "./anime-avatar"

/** Animated anime "ting!": a sweeping light band plus a four-point star popping on the lens. */
function LensGlint({ x, y }: { x: number; y: number }) {
  return (
    <span className="pointer-events-none absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <svg viewBox="-20 -20 40 40" className="lens-star absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <path d="M0 -18 L3 -3 L18 0 L3 3 L0 18 L-3 3 L-18 0 L-3 -3 Z" fill="#fff" />
        <circle r="3" fill="#cfe8ff" />
      </svg>
      <style>{`
        .lens-star { animation: lens-star 2.8s ease-out infinite; filter: drop-shadow(0 0 6px #8ec5ff); }
        @keyframes lens-star { 0%, 45% { transform: translate(-50%,-50%) scale(0) rotate(0); opacity: 0; }
          55% { transform: translate(-50%,-50%) scale(1.15) rotate(45deg); opacity: 1; }
          75%, 100% { transform: translate(-50%,-50%) scale(0) rotate(90deg); opacity: 0; } }
      `}</style>
    </span>
  )
}

/**
 * Photo frame that flips to reveal the anime avatar.
 * Hover-capable pointers flip on hover; touch and keyboard toggle on tap/Enter.
 * Left alone, it flips itself every few seconds, holds the reveal, then turns back.
 */
const IDLE_MS = 5000
const HOLD_MS = 3500
export function AvatarFlip() {
  const [flipped, setFlipped] = useState(false)
  // every flip spins 2.5 turns (900°) like a tossed card, so odd counts land on the back face
  const [spins, setSpins] = useState(0)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    setSpins((n) => n + 1)
  }, [flipped])
  const [reveals, setReveals] = useState(0)
  const touched = useRef(false)

  // auto-reveal loop; any manual interaction stops it so it never fights the visitor
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let t: ReturnType<typeof setTimeout>
    const cycle = (show: boolean) => {
      t = setTimeout(() => {
        if (touched.current) return
        if (show) setReveals((n) => n + 1)
        setFlipped(show)
        cycle(!show)
      }, show ? IDLE_MS : HOLD_MS)
    }
    cycle(true)
    return () => clearTimeout(t)
  }, [])

  const flip = (next: boolean) => {
    touched.current = true
    if (next && !flipped) setReveals((n) => n + 1) // remount the back so the glint plays on reveal
    setFlipped(next)
  }
  const canHover = () => window.matchMedia("(hover: hover)").matches
  // hover intent: a brief grace period so a card that shifts under the pointer doesn't spin back instantly
  const btnRef = useRef<HTMLButtonElement>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(leaveTimer.current), [])
  const onEnter = () => {
    if (!canHover()) return
    clearTimeout(leaveTimer.current)
    if (!flipped) flip(true)
  }
  const onLeave = () => {
    if (!canHover()) return
    clearTimeout(leaveTimer.current)
    leaveTimer.current = setTimeout(() => {
      // spurious leaves happen while the card is still sliding in; only spin back if truly un-hovered
      if (!btnRef.current?.matches(":hover")) flip(false)
    }, 450)
  }

  return (
    <div className="relative mx-auto w-[240px] sm:w-[280px]">
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={flipped ? "Show photo of Tanmoy" : "Flip to reveal anime Tanmoy"}
        onClick={() => flip(!flipped)}
        ref={btnRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="group block aspect-[5/6] w-full [perspective:1200px]"
      >
        <span
          className="relative block h-full w-full transition-transform duration-[1400ms] [transform-style:preserve-3d]"
          style={{
            transform: `rotateY(${spins * 900}deg) rotateZ(${flipped ? -2 : 2}deg)`,
            transitionTimingFunction: "cubic-bezier(.2,.7,.2,1)",
          }}
        >
          {/* front: real photo */}
          <span className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-primary/60 bg-muted shadow-[0_20px_60px_-20px_rgba(212,175,55,0.5)] [backface-visibility:hidden]">
            <Image src={profile.photo} alt="Tanmoy Saha" fill sizes="280px" className="object-cover object-[50%_25%]" priority />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-left font-mono text-[10px] tracking-widest text-secondary">
              INPUT · RAW PIXELS
            </span>
          </span>
          {/* back: anime avatar */}
          <span className="absolute inset-0 overflow-hidden rounded-2xl border-2 border-glow bg-[radial-gradient(circle_at_50%_35%,rgba(245,215,110,0.45),rgba(26,26,46,0.95)_65%)] shadow-[0_0_50px_-10px_var(--glow)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {profile.animeAvatar.src ? (
              <span key={reveals} className="relative block h-full w-full">
                <Image src={profile.animeAvatar.src} alt="Anime-style Tanmoy in sunglasses giving a thumbs-up" fill sizes="280px" className="object-cover object-top" />
                <LensGlint x={profile.animeAvatar.glint.x} y={profile.animeAvatar.glint.y} />
              </span>
            ) : (
              <AnimeAvatar key={reveals} className="h-full w-full" />
            )}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-left font-mono text-[10px] tracking-widest text-glow">
              OUTPUT · STYLE TRANSFER
            </span>
          </span>
        </span>
      </button>
      <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
        {flipped ? "↺ tap again to go back" : "↻ hover or tap to run style transfer"}
      </p>
    </div>
  )
}
