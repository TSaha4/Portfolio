export type Cell = [number, number]

/**
 * Grid A* with Manhattan heuristic. Returns the cells in expansion order (for visualising the
 * search frontier) and the final path, or an empty path if the goal is unreachable.
 */
export function astar(cols: number, rows: number, walls: Set<string>, start: Cell, goal: Cell) {
  const key = ([x, y]: Cell) => `${x},${y}`
  const h = ([x, y]: Cell) => Math.abs(x - goal[0]) + Math.abs(y - goal[1])
  const open: { c: Cell; f: number }[] = [{ c: start, f: h(start) }]
  const g = new Map([[key(start), 0]])
  const came = new Map<string, Cell>()
  const visited: Cell[] = []
  const closed = new Set<string>()

  while (open.length) {
    open.sort((a, b) => a.f - b.f)
    const { c } = open.shift()!
    const k = key(c)
    if (closed.has(k)) continue
    closed.add(k)
    visited.push(c)
    if (k === key(goal)) {
      const path: Cell[] = [c]
      let cur = k
      while (came.has(cur)) {
        const prev = came.get(cur)!
        path.unshift(prev)
        cur = key(prev)
      }
      return { visited, path }
    }
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n: Cell = [c[0] + dx, c[1] + dy]
      const nk = key(n)
      if (n[0] < 0 || n[1] < 0 || n[0] >= cols || n[1] >= rows || walls.has(nk) || closed.has(nk)) continue
      const ng = g.get(k)! + 1
      if (ng < (g.get(nk) ?? Infinity)) {
        g.set(nk, ng)
        came.set(nk, c)
        open.push({ c: n, f: ng + h(n) })
      }
    }
  }
  return { visited, path: [] as Cell[] }
}
