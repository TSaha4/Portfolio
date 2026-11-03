"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/** Green wax seal with a tick, pressed onto a finished item when it scrolls into view. */
export function WaxStamp({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("pointer-events-none absolute z-20", className)}
      initial={{ scale: 1.6, rotate: -40, opacity: 0 }}
      whileInView={{ scale: [1.6, 0.92, 1.04, 1], rotate: [-40, -8, -14, -12], opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: 0.5, times: [0, 0.6, 0.8, 1], ease: "easeOut" }}
      aria-label="Completed"
      role="img"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_6px_8px_rgba(0,0,0,0.55)]">
        {/* irregular blob: melted wax */}
        <path d="M50 4 C62 3 66 11 76 12 C88 14 90 26 94 36 C99 47 92 55 95 65 C98 78 86 84 78 90 C69 97 60 93 50 97 C40 99 32 92 23 89 C11 85 9 74 6 64 C2 52 8 44 5 33 C3 21 14 16 22 10 C31 4 40 5 50 4 Z" fill="#1f7a45" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#2fa863" strokeWidth="3" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="26" fill="#23894e" stroke="#145c33" strokeWidth="2" />
        <motion.path d="M37 51 L46 60 L64 40" fill="none" stroke="#d8f5e2" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.1 }} />
        {/* glossy highlight */}
        <path d="M28 24 C36 16 50 14 58 16" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

/** Ongoing: a spinning ring plus an indeterminate progress bar. */
export function InProgress({ label = "in progress", compact }: { label?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", compact ? "mt-3" : "mt-4")}>
      <span className="relative h-5 w-5 shrink-0">
        <span className="absolute inset-0 rounded-full border-2 border-primary/25" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
      </span>
      <div className="flex-1">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-primary/15">
          <span className="loading-bar absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary/80">{label}…</p>
      </div>
      <style>{`.loading-bar { animation: loading-bar 1.6s ease-in-out infinite; } @keyframes loading-bar { from { transform: translateX(-105%); } to { transform: translateX(300%); } }`}</style>
    </div>
  )
}
