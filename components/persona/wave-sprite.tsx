"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Flat, outlined cartoon of Tanmoy (messy brown hair, sunglasses, clean-shaven, from the anime avatar; grey blazer over a
 * black shirt, from /public/profile.webp) waving next to a hand-lettered speech bubble.
 * Pure SVG + CSS: the arm group rotates about the shoulder.
 */
export function WaveSprite({ className, greeting = "hey, i am tanmoy" }: { className?: string; greeting?: string }) {
  const [waving, setWaving] = useState(true)

  // wave on arrival, then idle; hover or tap waves again
  useEffect(() => {
    if (!waving) return
    const t = setTimeout(() => setWaving(false), 2600)
    return () => clearTimeout(t)
  }, [waving])

  const ink = "#0f0f1a"
  return (
    <button
      type="button"
      onClick={() => setWaving(true)}
      onMouseEnter={() => setWaving(true)}
      aria-label={`Cartoon Tanmoy waving: ${greeting}. Click to wave again.`}
      data-cursor-label="waving"
      className={cn("group relative flex items-end", className)}
    >
      {/* speech bubble */}
      <span className="relative order-2 mb-16 ml-[-8px] sm:mb-20 rounded-[26px] border-[3px] border-foreground bg-background px-3 py-1 font-hand text-lg font-bold text-foreground shadow-[4px_4px_0_var(--primary)] transition-transform group-hover:-rotate-2 sm:text-2xl">
        {greeting}
        <span className="absolute -bottom-[11px] left-5 h-4 w-4 rotate-45 border-b-[3px] border-r-[3px] border-foreground bg-background" />
      </span>

      <svg viewBox="0 0 120 220" className="h-28 w-auto shrink-0 sm:h-36" aria-hidden="true">
        <g stroke={ink} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          {/* legs + shoes */}
          <path d="M42 142 L40 204 L57 204 L60 150 L64 204 L81 204 L79 142 Z" fill="#1c1c2a" />
          <path d="M60 152 L60 200" />
          <path d="M36 204 h22 v8 h-24 Z M62 204 h22 l2 8 h-24 Z" fill="#f5f5f5" />
          {/* blazer + shirt */}
          <path d="M36 86 Q60 74 84 86 L86 146 L34 146 Z" fill="#a3a3ad" />
          <path d="M51 80 L60 112 L69 80 Z" fill="#141420" />
          <path d="M51 80 L46 100 L58 108 Z M69 80 L74 100 L62 108 Z" fill="#8a8a95" />
          <circle cx="60" cy="122" r="1.6" fill={ink} />
          <circle cx="60" cy="132" r="1.6" fill={ink} />
          {/* left arm, relaxed at the side, drawn over the blazer so it reads clearly */}
          <path d="M37 88 Q24 108 26 138 L36 139 Q36 112 45 96 Z" fill="#a3a3ad" />
          <circle cx="31" cy="143" r="6.5" fill="#ecb991" />
          {/* neck + head, scaled down a touch around the neck for friendlier proportions */}
          <g transform="translate(60 78) scale(0.82) translate(-60 -78)">
          <path d="M53 66 h14 v14 q-7 5 -14 0 Z" fill="#d9a07a" />
          <path d="M42 44 C42 24 78 24 78 44 L77 58 C75 70 67 76 60 76 C53 76 45 70 43 58 Z" fill="#ecb991" />
          <path d="M53 61 Q60 68 67 61" fill="none" stroke="#7a3b2a" strokeWidth="2.2" />
          {/* hair: swept up and to the side */}
          <path d="M40 48 C32 28 44 12 58 13 C64 9 76 12 79 20 C86 26 84 38 80 46 L77 34 L72 37 L69 27 L62 33 L56 26 L50 33 L46 30 L44 40 Z" fill="#3b2419" />
          {/* sunglasses, like the avatar, with a glint that pops now and then */}
          <path d="M44 44 h14 l-1 7 q-6 4 -12 0 Z M62 44 h14 l-1 7 q-6 4 -12 0 Z" fill="#14121c" />
          <path d="M58 46 h4" fill="none" />
          <path className="shade-glint" d="M70 45 l1 2.2 l2.2 1 l-2.2 1 l-1 2.2 l-1 -2.2 l-2.2 -1 l2.2 -1 Z" fill="#cfe8ff" stroke="none" />
          </g>
        </g>
        {/* waving arm: rotates about the shoulder */}
        <g className={waving ? "wave-arm is-waving" : "wave-arm"} stroke={ink} strokeWidth="2.5" strokeLinejoin="round">
          <path d="M80 90 Q94 72 98 50 L108 54 Q104 80 88 98 Z" fill="#a3a3ad" />
          <circle cx="104" cy="44" r="8" fill="#ecb991" />
          <path d="M100 36 v-6 M104 35 v-7 M108 36 v-6" stroke="#ecb991" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </svg>
      <style>{`
        .wave-arm { transform-origin: 82px 92px; transform-box: view-box; transition: transform .4s; }
        .wave-arm.is-waving { animation: wave-arm .5s ease-in-out infinite alternate; }
        .shade-glint { transform-box: fill-box; transform-origin: center; animation: shade-glint 3s ease-out infinite; }
        @keyframes shade-glint { 0%, 70% { transform: scale(0); } 80% { transform: scale(1.4) rotate(45deg); } 100% { transform: scale(0); } }
        @keyframes wave-arm { from { transform: rotate(-12deg); } to { transform: rotate(14deg); } }
      `}</style>
    </button>
  )
}
