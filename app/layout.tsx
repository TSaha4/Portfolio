import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Sixtyfour, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
})

const sixtyfour = Sixtyfour({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sixtyfour",
})

const spaceGrotesk = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: 'Tanmoy Saha Portfolio',
  description: 'Portfolio of Tanmoy Saha - CSE Student with an interest in AI and Machine Learning and is also proficient in Web Development, and GenAI',
  keywords: ['developer', 'portfolio', 'aiml', 'full stack', 'web development'],
  authors: [{ name: 'Tanmoy Saha' }],
  openGraph: {
    title: 'Tanmoy Saha Portfolio',
    description: 'Portfolio of Tanmoy Saha - CSE Student with an interest in AI and Machine Learning and is also proficient in Web Development, and GenAI',
    type: 'website',
  },
  icons: {
    icon: '/project_imgs/monogram.webp',
    apple: '/project_imgs/monogram.webp',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F3FF' },
    { media: '(prefers-color-scheme: dark)', color: '#0F0F1A' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&family=Space+Grotesk:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${sixtyfour.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
