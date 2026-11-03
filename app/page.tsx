import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { Navbar } from "@/components/layout/navbar"
import { Intro } from "@/components/layout/intro"
import { Footer } from "@/components/layout/footer"
import { Marquee } from "@/components/ui/marquee"

// below-the-fold layers are split into their own chunks
const About = dynamic(() => import("@/components/sections/about").then((m) => m.About))
const Projects = dynamic(() => import("@/components/sections/projects").then((m) => m.Projects))
const Club = dynamic(() => import("@/components/sections/club").then((m) => m.Club))
const Skills = dynamic(() => import("@/components/sections/skills").then((m) => m.Skills))
const Experience = dynamic(() => import("@/components/sections/experience").then((m) => m.ExperienceSection))
const Education = dynamic(() => import("@/components/sections/education").then((m) => m.EducationSection))
const NeuralBackground = dynamic(() => import("@/components/fx/neural-background").then((m) => m.NeuralBackground))
const CustomCursor = dynamic(() => import("@/components/fx/custom-cursor").then((m) => m.CustomCursor))
const Contact = dynamic(() => import("@/components/sections/contact").then((m) => m.Contact))

export default function Page() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <Intro />
      <NeuralBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <Club />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
