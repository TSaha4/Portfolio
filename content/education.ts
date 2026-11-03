export const education = [
  {
    degree: "B.Tech. in Computer Science (Specialization in AI/ML)",
    school: "Vellore Institute of Technology, Vellore, Tamil Nadu",
    period: "July 2023 – Present",
    score: "CGPA: 9.26",
  },
  {
    degree: "Class XII (CBSE)",
    school: "Delhi Public School, Ranchi, Jharkhand",
    period: "Apr 2020 – Mar 2022",
    score: "Percentage: 93.6%",
  },
  {
    degree: "Class X (CBSE)",
    school: "Delhi Public School, Ranchi, Jharkhand",
    period: "Apr 2018 – Mar 2020",
    score: "Percentage: 94%",
  },
]

export interface Certification {
  title: string
  issuer: string[]
  period: string
  linkText: string
  link: string
  logo: string
  /** optional background behind the logo tile */
  logoBg?: string
}

export const certifications: Certification[] = [
  {
    title: "Amazon ML Summer School",
    issuer: ["Amazon"],
    period: "Completed",
    linkText: "View Certificate",
    link: "https://drive.google.com/file/d/18AYIfUNirr7Aovegi4DccvNVkQQe4hgC/view?usp=drive_link",
    logo: "/project_imgs/amazon.webp",
  },
  {
    title: "AI Upskilling Certificate",
    issuer: ["Qualcomm"],
    period: "Completed",
    linkText: "View Certificate",
    link: "https://drive.google.com/file/d/1jRMMzy_lt86Og3X7aYlTq2ounNg0owzv/view?usp=drive_link",
    logo: "/project_imgs/qualcomm.webp",
  },
  {
    title: "IBM Generative AI Certificate",
    issuer: ["VIT", "IBM"],
    period: "May 2025",
    linkText: "View Certificate",
    link: "https://drive.google.com/file/d/1B9xG47UtZXMmRziXadvySNTsbJ9OjihQ/view?usp=sharing",
    logo: "/project_imgs/ibm.webp",
  },
  {
    title: "Machine Learning Specialization",
    issuer: ["Stanford University", "Coursera"],
    period: "Completed",
    linkText: "View Certificate",
    link: "https://drive.google.com/file/d/1ERTUzOq7BtbTY7MEtl3fvJ7Zh_yFWPMg/view?usp=sharing",
    logo: "/project_imgs/coursera.webp",
  },
  {
    title: "Forage Virtual Experience Programs",
    issuer: [
      "British Airways (Data Science)",
      "Deloitte (Data Analytics)",
      "Quantium (Commercial Analytics)",
      "Tata Group (GenAI)",
    ],
    period: "Completed",
    linkText: "View All",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7412005178058637313/",
    logo: "/project_imgs/forage.webp",
  },
]
