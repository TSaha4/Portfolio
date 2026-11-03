/** The page is one forward pass: each section is a layer. Shared by the rail, palette and headers. */
export const layers = [
  { id: "input", code: "L0", name: "Input" },
  { id: "about", code: "L1", name: "About" },
  { id: "projects", code: "L2", name: "Projects" },
  { id: "experience", code: "L3", name: "Experience" },
  { id: "club", code: "L4", name: "Club" },
  { id: "checkpoints", code: "L5", name: "Education" },
  { id: "skills", code: "L6", name: "Stack" },
  { id: "contact", code: "L7", name: "Contact" },
] as const

export type LayerId = (typeof layers)[number]["id"]
