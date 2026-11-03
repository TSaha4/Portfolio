# FORWARD PASS — Creative Direction

> The portfolio *is* a neural network. Visiting it runs one inference: your scroll is the signal,
> each section is a layer, and the output is a person.

## 1. Creative concept

Most AI portfolios decorate themselves with a glowing brain. This one borrows the **mechanics** of
ML instead: convergence, attention, embeddings, training logs, pathfinding. Each section takes one
real ML idea and uses it as the interface for one kind of information.

| Layer | Section | ML mechanic used as UI |
|------|---------|------------------------|
| `L0 · INPUT` | Hero | **Gradient descent**: noisy particles optimise into my name while a live loss value drops toward 0. Your cursor injects noise and the field re-converges. |
| `L1 · ATTENTION` | About | **Self-attention**: the bio is tokenised. Hovering a token draws attention arcs to the words it attends to. |
| `L2 · EMBEDDING` | Projects | **Latent space**: projects are points in a 2-D embedding, clustered by domain. Selecting one opens an "inference inspector" that runs a CV-style detection scan over the screenshot. |
| `L3 · GRAPH` | Skills | **Knowledge graph**: skills are nodes with a force layout. Selecting one propagates activation to the projects that use it. |
| `L4 · TRAINING` | Experience | **Training log**: each internship is an epoch in a terminal, with a loss curve drawn as you scroll. |
| `L5 · CHECKPOINTS` | Education + certs | **Model checkpoints**: saved weights along a timeline. Certificates sit as stacked `.ckpt` files that fan out. |
| `L6 · AGENT` | Contact | **Pathfinding agent**: pick a channel and an A* agent plans a route across an obstacle grid to reach it. |
| `OUTPUT` | Footer | `inference complete · {ms} ms`, the actual time you spent on the page. |

The gold-on-midnight palette is kept. Gold is reinterpreted as **activation**: whatever is "firing"
is gold and everything idle is muted indigo. That gives the colour a meaning instead of just decoration.

## 2. Inspiration board

None of these are copied. Each one contributes a single idea.

- **TensorFlow Playground**: playground.tensorflow.org. Neurons as tiny live heat-maps. Inspired gold-as-activation.
- **Transformer Explainer** (Georgia Tech Polo Club): poloclub.github.io/transformer-explainer. Hoverable attention made legible. Inspired the About tokens.
- **CNN Explainer**: poloclub.github.io/cnn-explainer. Smooth zoom from overview to one unit's detail. Inspired the project inspector.
- **Distill.pub**: distill.pub. Interactive diagrams that explain instead of decorate. This is the tone bar.
- **Bruno Simon**: bruno-simon.com. A portfolio you play with rather than read. Inspired the agent contact.
- **Lusion**: lusion.co. Particle systems that respond to the cursor with weight and inertia. Inspired the hero physics.
- **Embedding Projector**: projector.tensorflow.org. Points in latent space as navigation. Inspired the project map.
- **Pathfinding.js visualiser** (qiao.github.io/PathFinding.js/visual). Open/closed set waves. Inspired the A* animation.

## 3. Design breakdown

- **Hero:** full-bleed canvas of convergence particles that spell `TANMOY SAHA` in gold. A HUD shows `epoch`, `loss` and `lr`. The waving pixel sprite and the role line sit beside it.
- **Navigation:** a right-edge **layer rail**. One node per layer, with a gold signal pulse that travels the edges as you scroll. Nodes are clickable and their labels appear on hover. `Ctrl/⌘ K` opens a **query palette** ("ask the model") for jumping to sections and links. On mobile the rail becomes a bottom bar.
- **About:** attention text with an avatar flip card. Photo on the front, anime me on the back. Resume CTA.
- **Skills:** SVG force graph grouped by domain (Languages, ML/AI, Web/Backend, Tools), plus an accessible list fallback.
- **Projects:** latent map with an inspector panel. Mobile uses a swipeable "dataset" stack with the same inspector.
- **Experience:** a terminal where you click an epoch to expand it. Metrics (e.g. the 90% latency cut) render as loss drops.
- **Education & achievements:** checkpoint timeline with fanned certificate files.
- **Contact:** A* grid agent plus plain, always-visible links.
- **Footer:** inference summary and a copyright line.

## 4. Interaction & animation strategy

- Motion always *means* something: converge = learn, arcs = attend, pulse = propagate, scan = detect.
- The cursor is a **perturbation source** in the hero and a **query** everywhere else.
- Entries use a shared `Reveal` built from "denoising" (blur and noise resolve to sharp), which echoes diffusion models.
- Everything respects `prefers-reduced-motion`: particles snap to their converged state, arcs show statically and the agent jumps straight to its goal.

## 5. Technical plan

- Keep **Next 16 / React 19 / Tailwind 4 / framer-motion** and the Vercel config.
- Canvas 2-D for particles (requestAnimationFrame, paused off-screen, DPR-capped). SVG for the graph, arcs and avatar. No WebGL or three.js, to keep the bundle lean.
- `content/` holds all facts as typed data. `components/{layout,sections,fx,persona,ui}` and `hooks/` hold the code.
- Below-the-fold sections are lazy via `next/dynamic`.
- Drop ~40 unused dependencies (Radix, recharts, zod…), the 3.5 s loading screen, the custom cursor and the stray zip.

## 6. What makes it unique

The UI isn't themed as AI. It runs on small, honest ML algorithms (gradient steps, attention
weights, force layouts, A*), each chosen because it presents that section's information better.
A recruiter still finds projects, experience, the resume and contact within one click.
