"use client"

import { useSyncExternalStore } from "react"

/** Tiny shared flag: flips once the welcome loader has left, so the hero can start its entrance. */
let done = false
const listeners = new Set<() => void>()

export function markIntroDone() {
  if (done) return
  done = true
  listeners.forEach((l) => l())
}

export function useIntroDone() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => done,
    () => false,
  )
}
