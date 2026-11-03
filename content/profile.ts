export const profile = {
  name: "Tanmoy Saha",
  roles: [
    "AI & Machine Learning Engineer",
    "Building Intelligent Systems",
    "Designing Systems that Think and Adapt",
    "Turning Ideas into Real-World Impact",
  ],
  email: "s.tanmoy2004@gmail.com",
  resume: "https://drive.google.com/file/d/1drlZQt5qMjNRGgdOArVCp7oWWDukElv2/view?usp=drive_link",
  photo: "/profile.webp",
  /**
   * Illustrated avatar revealed by the flip card. Save the artwork as /public/avatar-anime.webp and
   * set this to "/avatar-anime.webp"; glint is where the lens sparkle sits (percent of width/height).
   * Empty falls back to the hand-drawn SVG avatar.
   */
  animeAvatar: { src: "/avatar-anime.webp", glint: { x: 55, y: 19 } },
  bio: [
    "I got here the unglamorous way—one curious question about how something worked leading to a lot of broken code and a few systems that eventually didn't break. No grand plan, just a lot of iteration. Somewhere between fixing one bug and designing the next feature, code stopped being an assignment and became the way I think through problems.",
    "What I care about is whether the thing actually runs—whether the model generalizes, whether the system scales, whether the code someone else touches makes sense six months later. I'm still learning most of this as I go, and I've made peace with that. There's always a harder problem worth chasing, and a better version of the last system worth building.",
  ],
  quote: { text: "Excellence is a continuous process and not an accident.", author: "A.P.J. Abdul Kalam" },
}

export type SocialLink = { id: "email" | "github" | "linkedin"; label: string; handle: string; href: string }

export const socials: SocialLink[] = [
  { id: "email", label: "Email", handle: "s.tanmoy2004@gmail.com", href: "mailto:s.tanmoy2004@gmail.com" },
  { id: "github", label: "GitHub", handle: "TSaha4", href: "https://github.com/TSaha4" },
  { id: "linkedin", label: "LinkedIn", handle: "tanmoy-saha", href: "https://www.linkedin.com/in/tanmoy-saha-4b0ab228a/" },
]
