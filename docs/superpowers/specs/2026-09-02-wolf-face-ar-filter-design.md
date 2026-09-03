# Wolf Face: Parametric AR Transformation Filter — Design

## Status

Personal project, private use only (not for public distribution). Target: a
presentable working demo within a ~2-day (~16 hour) full-time sprint.

## Concept

Inspired by _Wolfwalkers_ and Celtic mythology: transform a real face into a
personalized wolf face, shaped by that face's own proportions, in the film's
hand-drawn watercolor/woodcut visual language — not a generic, one-size-fits-all
AR mask.

## Visual & interaction philosophy

Most AR filters (Spider-Man webs, generic animal masks) rely on a flashy
triggered gesture and a single static overlay. That doesn't fit the tone of
the source material. Instead:

- **Trigger:** closing your eyes and lowering your head, held for 3+ seconds
  (echoing the soul-leaving-the-body / sleep transformation in
  _Wolfwalkers_), rather than a hand gesture. (Stretch goal — see Build plan
  below.)
- **Transition:** a watercolor bloom / Celtic knotwork line tracing the face
  outline, rather than a geometric "portal" effect. (Stretch goal.)
- **Palette:** deep greens, ochre, moonlit blue-violet — not saturated
  cyberpunk neon.
- **Personalization:** the wolf's ear angle, muzzle length, and eye shape are
  derived from the user's own facial proportions, not a fixed asset (see Art
  approach below).

## Approach

**Approach A (rule-based parametric mapping)**, confirmed over generative/AI
style transfer. Extract proportions from face landmarks and use them to drive
a pre-designed, parameterized wolf-face template (layered SVG/Canvas: ears,
eyes, muzzle as separate components). No AI generation in the runtime path;
mapping rules are handwritten and fully controllable.

## Art approach

The single biggest risk to the 2-day timeline is not code, it's whether the
film's watercolor/woodcut art style can be executed from scratch quickly
enough. Resolved as follows:

- **Base line structure**: adapted/redrawn from the film's two wolf-cub
  characters (Mebh and Robyn's wolf forms), used as a starting template for
  line quality, proportions, and style. This is private, non-commercial,
  personal use only — not to be published or distributed. This removes the
  "design from zero" risk and lets the sprint focus on execution, not
  invention.
- **Algorithmic personalization (preserves the "not one-size-fits-all" core
  idea)**: that base template is still deformed per-user by the landmark-driven
  mapping rules below (ear angle, muzzle length, etc.) — it is a starting
  point for shape, not a fixed final asset.
- **True personalization layer**: user-specific facial details (e.g. a mole
  near the eye) are detected from the user's own photo and overlaid onto the
  wolf face; fur color is user-customizable. These have no equivalent in the
  film and are what make the result feel like "your" wolf rather than a
  reskin of an existing character.

Before committing Day 2's art time, do a ~20-30 minute feasibility test: trace
the two film wolf cubs once, time it, and judge whether the linework/color
can be executed at that quality within the available time. If a full
watercolor render proves too slow, fall back to ink line art with flat/simple
digital color (line quality carries most of the film's visual identity;
watercolor rendering is the most time-expensive part for the least payoff).

## Tech stack

Confirmed installed already, no runtime downloads needed: Node v22.13.1, npm
11.2.0, Python 3.13.14, Git 2.51.0.

Going straight to the web stack (skipping a Python prototyping detour, since
the end target is a web filter and the author already knows React):

| Layer | Tool |
|---|---|
| Scaffold | Vite + React |
| Face landmark detection | `@mediapipe/tasks-vision` (FaceLandmarker) — modern web SDK, browser-native, replaces the older `face_mesh` package |
| Feature extraction | Custom JS: distances/angles between landmark points |
| Rendering | Layered SVG/Canvas wolf-face components |
| Mapping logic | Handwritten rules: facial proportions → visual parameters |
| (Stretch) Real-time filter deployment | Meta Spark Studio or TikTok Effect House |

All project dependencies install via `npm install` as part of Day 1, Segment 1
— not a separate download step.

## Build plan (segmented, with time estimates)

Estimates assume full-time-equivalent focus (~16h total budget across 2 days).

### Day 1 — pipeline end-to-end, placeholder art

| # | Segment | Est. |
|---|---|---|
| 1 | Scaffold Vite+React project, install `@mediapipe/tasks-vision`, get camera permission working | 0.5–1h |
| 2 | Run FaceLandmarker, visualize the 468 landmarks live, confirm data is stable | 1.5–2h |
| 3 | Feature extraction functions: face width/height ratio, eye spacing/tilt, jaw angle, etc. from landmark coordinates | 2h |
| 4 | Build 2–3 discrete style "tiers" for ears/eyes/muzzle using simple geometric placeholder shapes (not final art), wire mapping rules, get static "photo in → wolf face out" working end-to-end | 2–3h |

### Day 2 — real art + polish

| # | Segment | Est. |
|---|---|---|
| 5 | Hand-draw at least one full set of layered components (ears/eyes/muzzle) based on the wolf-cub template, in the film's line/color style; swap in for the placeholders | 3–4h |
| 6 | Integration pass: confirm mapping logic still works correctly with real art; tune thresholds/parameters | 1–2h |
| 7 | Polish + record demo | 1–2h |

### Stretch goals (out of scope for the 2-day sprint, separate follow-up)

- Eye-close trigger (echoing the film's soul-leaving-the-body transformation) + Celtic knotwork / watercolor-bloom transition animation
- Port to a real-time filter via Spark AR Studio or TikTok Effect House

## Reference material to source/create

- Screenshot key frames of the wolf-cub forms from _Wolfwalkers_ for style
  and structure reference (line weight, color palette, proportions) —
  private use only
- Hand-drawn layered wolf-face component set (transparent PNG/SVG: ears,
  eyes, muzzle, outline)
- Celtic knotwork reference for the (stretch) transition-line motif

## Learning tutorials to reference

- LearnOpenCV — "Create Snapchat/Instagram Filters Using Mediapipe" (landmark-based triangle warping for overlay deformation)
- GitHub: `gerdablum/basic-face-filter` — minimal working example to fork/adapt
- MediaPipe Face Mesh / Tasks Vision official docs (google-ai-edge/mediapipe)
- Talk: "Using MediaPipe to Create Cross-Platform ML Applications with React" (Shivay Lamba, React Advanced)

## Out of scope for this spec

- Python/OpenCV prototyping path (superseded by going straight to the web stack)
- Full 2–3 tier hand-drawn variant library (deferred to a later iteration; Day 2 targets one complete set)
- Anything requiring public distribution/publishing of art derived from the film's character designs
