export interface Experience {
  role: string
  company: string
  location: string
  period: string
  summary: string
  points: string[]
  tech: string[]
  logo: string
  github?: string
  certificate?: string
  /** headline metric shown in the training log, taken from the points above */
  metric?: { label: string; from: number; to: number; unit: string }
}

export const experiences: Experience[] = [
  {
    role: "Tech Intern",
    company: "NTPC Vindhyachal",
    location: "Madhya Pradesh",
    period: "May – June 2026",
    summary: "Built an enterprise RAG chatbot with automated ticket resolution and email notifications",
    points: [
      "Built a Gemini 2.5 Flash & sentence-transformer RAG pipeline to automate support ticket resolution and email notifications.",
      "Cut repeat-query response latency by 90% (from ~3s to ~300ms) by implementing semantic caching and confidence-scoring filters.",
      "Established a self-improving flow: resolved tickets are auto-embedded and indexed, allowing the chatbot to answer future queries without human intervention.",
    ],
    tech: ["Next.js", "TypeScript", "MongoDB Atlas", "Sentence Transformers", "Gemini", "FastAPI", "RAG"],
    logo: "/NTPC-logo.webp",
    github: "https://github.com/TSaha4/AI_Based_Chatbot.git",
    certificate: "https://drive.google.com/file/d/10jLsp7Rw76crBcsecQvkyheBMKCCNkp9/view?usp=drive_link",
    metric: { label: "repeat-query latency", from: 3000, to: 300, unit: "ms" },
  },
  {
    role: "Data Analytics Intern",
    company: "Pegasus Mortgage",
    location: "Remote",
    period: "May – June 2026",
    summary:
      "Developed a Python-based broker analytics pipeline for data cleaning, feature engineering, and pattern identification in broker activity",
    points: [
      "Developed a Python-based broker analytics pipeline using Pandas and scikit-learn for data cleaning, feature engineering, and identifying patterns in broker activity.",
      "Performed exploratory data analysis and statistical analysis to uncover broker performance trends, segment activity patterns, and generate actionable insights from mortgage datasets.",
    ],
    tech: ["Python", "Pandas", "scikit-learn", "Data Analytics", "Feature Engineering"],
    logo: "/project_imgs/pegasus.webp",
    certificate: "https://drive.google.com/file/d/1VpX5aVBOJr2sxxWYyr7QESAljO21sfkL/view?usp=drive_link",
  },
]
