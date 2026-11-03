import type { Metadata, Viewport } from "next"
import { Caveat, Inter, Sixtyfour, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sixtyfour = Sixtyfour({ weight: "400", subsets: ["latin"], variable: "--font-sixtyfour" })
const caveat = Caveat({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-caveat" })
const spaceGrotesk = Space_Grotesk({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-grotesk" })

const description =
  "Tanmoy Saha: AI/ML engineer building intelligent systems across GenAI, agentic AI, computer vision, NLP and autonomous systems."

export const metadata: Metadata = {
  title: "Tanmoy Saha · AI/ML Engineer",
  description,
  keywords: ["Tanmoy Saha", "AI", "machine learning", "GenAI", "agentic AI", "computer vision", "NLP", "portfolio"],
  authors: [{ name: "Tanmoy Saha" }],
  metadataBase: new URL("https://tanmoysaha.cv"),
  openGraph: { title: "Tanmoy Saha · AI/ML Engineer", description, type: "website", images: ["/profile.webp"] },
  icons: { icon: "/project_imgs/monogram.webp", apple: "/project_imgs/monogram.webp" },
}

export const viewport: Viewport = { themeColor: "#0F0F1A", width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${sixtyfour.variable} ${spaceGrotesk.variable} ${caveat.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
