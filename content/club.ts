/** VinnovateIT club work. Facts from the club's technical report; no individual contribution claims. */
export const club = {
  name: "VinnovateIT",
  site: "https://vinnovateit.com/",
  /** served by the club's own site, so it stays in sync with their branding */
  logo: "https://vinnovateit.com/whiteLogoViit.svg",
}

export interface ClubProject {
  id: string
  title: string
  tagline: string
  description: string
  highlights: string[]
  tech: string[]
  status: "shipped" | "in development"
  /** where people can use it */
  live?: { href: string; label: string }
  github?: string
  /** preview image; projects without one get a drawn placeholder */
  image?: string
  /** phone screenshots shown as a fanned collage instead of a single image */
  screens?: string[]
}

export const clubProjects: ClubProject[] = [
  {
    id: "latch",
    title: "Latch",
    tagline: "Auto WiFi Login App",
    description:
      "An Android app that automatically detects hostel WiFi networks and logs users in seamlessly, eliminating repetitive manual authentication and improving everyday usability.",
    highlights: ["Detects campus networks and authenticates automatically", "Native Kotlin with Jetpack Compose UI"],
    tech: ["Kotlin", "Jetpack Compose", "Firebase"],
    status: "shipped",
    live: { href: "https://play.google.com/store/apps/details?id=com.vinnovateit.latch", label: "Get it on Play Store" },
    github: "https://github.com/vinnovateit/auto-net-connector",
    image: "/project_imgs/latch.webp",
  },
  {
    id: "studyhub",
    title: "StudyHub",
    tagline: "AI-enabled student learning platform",
    description:
      "A student-facing academic resource platform for courses, notes, papers, videos and questions, with admin tooling and an MCP integration layer that lets external AI clients work with study content.",
    highlights: [
      "Go API with middleware for auth, rate limiting, CORS and security headers",
      "MCP server exposing 20 tools, 8 prompts and resources to AI clients via OAuth 2.1 / PKCE",
      "Portable Agent Skills, Redis sessions and Cloudflare R2 presigned uploads",
    ],
    tech: ["Go", "Next.js 15", "React 19", "TypeScript", "MongoDB", "Redis", "Cloudflare R2", "MCP"],
    status: "shipped",
    live: { href: "https://studyhub.vinnovateit.com/", label: "Visit StudyHub" },
    image: "/club/studyhub.webp",
  },
  {
    id: "bunkbuddies",
    title: "BunkBuddies",
    tagline: "Roommate discovery & compatibility",
    description:
      "Helps students find roommates and groups by lifestyle compatibility, combining group workflows and realtime chat with a hybrid similarity-scoring engine.",
    highlights: [
      "Hybrid score: structured preferences + MiniLM sentence-embedding cosine similarity",
      "Lexical fallback and cached inference that recomputes only changed components",
      "Join-request workflows, Google OAuth + JWT, WebSocket messaging",
    ],
    tech: ["FastAPI", "Python", "Next.js 15", "MongoDB", "Sentence Transformers", "WebSockets", "Tailwind CSS"],
    status: "shipped",
    live: { href: "https://bunkbuddies.vinnovateit.com/", label: "Visit BunkBuddies" },
    image: "/club/bunkbuddies.webp",
  },
  {
    id: "atlas",
    title: "Atlas",
    tagline: "Campus discovery & multi-floor indoor navigation",
    description:
      "A campus map and discovery app whose core is an indoor routing engine that turns floor GeoJSON into a weighted graph, with explicit costs for lifts, stairs and door traversal.",
    highlights: [
      "Multi-floor routing with turn-by-turn steps and transit labels",
      "Floor-specific GeoJSON for rooms, doors and walking paths",
      "Offline-resilient discovery with Hive caching",
    ],
    tech: ["Flutter", "Dart", "MapLibre GL", "Google Maps", "GeoJSON", "Hive"],
    status: "in development",
    // app screenshots, fanned as a collage; the middle one sits on top
    screens: [
      "/club/atlas/indoor-nav.webp",
      "/club/atlas/campus-map.webp",
      "/club/atlas/route-overview.webp",
      "/club/atlas/route-search.webp",
      "/club/atlas/academic-filter.webp",
    ],
  },
]
