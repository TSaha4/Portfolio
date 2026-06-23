import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
