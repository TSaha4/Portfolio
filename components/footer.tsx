"use client"

import { Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-primary fill-primary" /> by Tanmoy Saha
        </p>
        <p className="text-muted-foreground/60 text-xs mt-2">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
