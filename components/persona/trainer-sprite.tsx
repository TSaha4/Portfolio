/**
 * Top-down 16×20 pixel mini-me in the style of handheld-RPG overworld sprites: dark outline,
 * two-tone shading, big head. Messy brown hair, eyes and a smile, grey blazer over a black shirt.
 * Four facings with a two-step walk cycle; "right" is the mirrored "left".
 * Passing `wave` (a frame counter) raises the right arm and waggles the hand.
 */
export type Facing = "down" | "up" | "left" | "right"

const PALETTE: Record<string, string> = {
  O: "#1a1218", // outline
  H: "#4a2c1d", // hair
  h: "#73492f", // hair highlight
  S: "#f6c9a3", // skin
  s: "#e0a982", // skin shade
  E: "#1d1410", // pupils
  W: "#ffffff", // eye whites
  C: "#f19a8b", // cheeks
  M: "#b5523f", // mouth
  B: "#b8b8c4", // blazer
  b: "#8d8d9b", // blazer shade
  K: "#1c1c2a", // shirt
  P: "#2e2e44", // trousers
  L: "#ffffff", // shoes
}

const HEAD_DOWN = [
  ".....OOOOOO.....",
  "...OOHHhHHHOO...",
  "..OHHHHHhHHHHO..",
  "..OHhHHHHHHhHO..",
  ".OHHHSHHSSHHHHO.",
  ".OHSSSSSSSSSSHO.",
  "..OSWESSSSEWSO..",
  "..OSWESSSSEWSO..",
  "..OCSSSMMSSSCO..",
  "...OsSSSSSSsO...",
  "....OOSSSSOO....",
]
const HEAD_UP = [
  ".....OOOOOO.....",
  "...OOHHhHHHOO...",
  "..OHHHHHhHHHHO..",
  "..OHhHHHHHHhHO..",
  ".OHHHHHHHHHHHHO.",
  ".OHHhHHHHHHhHHO.",
  "..OHHHHHHHHHHO..",
  "..OHHHHhHHHHHO..",
  "..OHHHHHHHHHHO..",
  "...OsHHHHHHsO...",
  "....OOSSSSOO....",
]
const BODY_DOWN = [
  "...OBBBKKBBBO...",
  "..OBBbBKKBbBBO..",
  ".OSOBBBKKBBBOSO.",
  ".OSOBBBKKBBBOSO.",
  "..OObBBBBBBbOO..",
]
const BODY_UP = [
  "...OBBBBBBBBO...",
  "..OBBbBBBBbBBO..",
  ".OSOBBBBBBBBOSO.",
  ".OSOBBBbbBBBOSO.",
  "..OObBBBBBBbOO..",
]
const LEGS_FRONT = [
  ["...OPPPPPPPPO...", "...OPPPOOPPPO...", "...OPPO..OPPO...", "...OLLO..OLLO..."],
  ["...OPPPPPPPPO...", "...OPPPOOPPPO...", "....OPPO.OPPO...", "....OLLO..OLLO.."],
]

const SIDE = [
  "......OOOOO.....",
  "....OOHHhHHO....",
  "...OHHHHHHHHO...",
  "..OHHhHHHHHHHO..",
  "..OHSSHHHHHHHO..",
  ".OSSSSSSSHHHO...",
  ".OSEESSSSSHHO...",
  ".OSEESSSSSSHO...",
  ".OSSSCSSSSSO....",
  "..OMSSSSSsO.....",
  "...OOSSSOO......",
  "....OBBBBO......",
  "...OBBBBbBO.....",
  "...OBSBBBbO.....",
  "...OBSBBBbO.....",
  "...OBbBBBBO.....",
]
const LEGS_SIDE = [
  ["....OPPPPO......", "....OPPPPO......", "....OPOOPO......", "....OLO.OLO....."],
  ["....OPPPPO......", "...OPPOOPPO.....", "...OPO..OPO.....", "..OLLO...OLO...."],
]

type Px = [number, number, string]
/** Raised right arm (viewer's right) in two hand positions; the resting hand is hidden while waving. */
const ARM: Px[] = [
  // hide the resting right hand
  [13, 13, "."], [14, 13, "."], [13, 14, "."], [14, 14, "."],
  // sleeve rising from the shoulder
  [13, 12, "B"], [14, 12, "O"], [13, 11, "B"], [14, 11, "O"], [13, 10, "O"], [14, 10, "B"], [15, 10, "O"],
]
const WAVE_ARM: Px[][] = [
  [...ARM, [14, 9, "S"], [14, 8, "S"], [13, 9, "O"], [13, 8, "O"], [15, 9, "O"], [15, 8, "O"], [14, 7, "O"]],
  [...ARM, [15, 9, "S"], [15, 8, "S"], [14, 9, "O"], [14, 8, "O"], [15, 7, "O"]],
]

function rows(facing: Facing, step: number) {
  if (facing === "down") return [...HEAD_DOWN, ...BODY_DOWN, ...LEGS_FRONT[step]]
  if (facing === "up") return [...HEAD_UP, ...BODY_UP, ...LEGS_FRONT[step]]
  return [...SIDE, ...LEGS_SIDE[step]]
}

export function TrainerSprite({ facing, step, wave, className }: { facing: Facing; step: number; wave?: number; className?: string }) {
  const waving = wave !== undefined
  const grid = (waving ? rows("down", 0) : rows(facing, step % 2)).map((r) => [...r])
  if (waving) for (const [x, y, c] of WAVE_ARM[wave % 2]) grid[y][x] = c
  return (
    <svg viewBox="0 0 16 20" className={className} shapeRendering="crispEdges" style={{ transform: !waving && facing === "right" ? "scaleX(-1)" : undefined }} aria-hidden="true">
      {grid.flatMap((row, y) =>
        row.map((c, x) => (c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={PALETTE[c]} />)),
      )}
    </svg>
  )
}
