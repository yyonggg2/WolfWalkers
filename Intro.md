# Wolf Face: Parametric AR Transformation Filter

## Concept

Inspired by _Wolfwalkers_ and Celtic mythology, this project explores what
it would mean to be transformed into a wolf - not as a generic AR mask,
but as a _personalized_ one, shaped by your own facial features, in the
hand-drawn, watercolor-and-woodcut visual language of the film rather than
the neon/CGI aesthetic of typical Marvel-style filters.

The core idea: just as characters in animated films often share visual
DNA with their animal companions, this system maps a real face's
proportions onto a parametric wolf-face template - so the resulting wolf
isn't one-size-fits-all, it's _yours_.

## Why this instead of a typical face filter

Most AR filters (Spider-Man webs, generic animal masks) rely on a flashy
triggered gesture and a single static overlay. That doesn't fit the tone
of the source material. Instead:

- **Trigger:** closing your eyes (echoing the soul-leaving-the-body /
  sleep transformation in _Wolfwalkers_), rather than a hand gesture
- **Transition:** a watercolor bloom / Celtic knotwork line tracing the
  face outline, rather than a geometric "portal" effect
- **Palette:** deep greens, ochre, moonlit blue-violet - not saturated
  cyberpunk neon
- **Personalization:** the wolf's ear angle, muzzle length, and eye shape
  are derived from the user's own facial proportions, not a fixed asset

## Two possible technical approaches

### Approach A - Rule-based parametric mapping (recommended first)

Extract proportions from face landmarks (face width/height ratio, eye
spacing/tilt, brow angle, jaw angle) and use them to drive a
pre-designed, parameterized wolf-face template (layered SVG/Canvas:
ears, eyes, muzzle as separate components). No AI generation involved
the mapping rules are handwritten and fully controllable, which keeps
the art style consistent with the source material.

### Approach B: Generative/AI style transfer

Use a diffusion model (e.g. Stable Diffusion + ControlNet conditioned on
face landmarks) to generate a stylized wolf face. More "impressive" on
paper, but harder to keep visually consistent frame-to-frame, and not
realistically real-time. Better suited to generating a one-off static
portrait than a live filter.

**Decision: start with Approach A.** It's faster to build, fully
controllable, and better demonstrates original design work rather than
prompting a black-box model.

## Tech stack

| Layer                                 | Tool                                                                  |
| ------------------------------------- | --------------------------------------------------------------------- |
| Face landmark detection               | MediaPipe Face Mesh (468 3D landmarks, real-time, single camera)      |
| Feature extraction                    | Custom JS/Python functions - distances/angles between landmark points |
| Rendering                             | React + SVG or Canvas (layered wolf-face components)                  |
| Mapping logic                         | Handwritten rules: facial proportions visual parameters               |
| (Stretch) Real-time filter deployment | Meta Spark Studio or TikTok Effect House                              |

## Build plan

1. Get MediaPipe Face Mesh running, log/visualize landmark data
2. Design 2-3 discrete variants each for ears, eyes, and muzzle
   (start with discrete style "tiers," not continuous parameters)
3. Write feature-extraction code: compute face width/height ratio, eye
   tilt, jaw angle from landmarks
4. Write mapping rules connecting those ratios to which wolf-face
   variant/parameter gets used
5. Wire it up: photo in to wolf face out (static version first)
6. (Stretch) Add the eye-close trigger + watercolor transition animation
7. (Stretch) Port to a real-time filter using Spark AR / Effect House

## Reference material to source/create

- Screenshot key frames of the wolf form from _Wolfwalkers_ for style
  reference (line weight, color palette, proportions), for reference
  only, redraw rather than reuse directly
- Hand-drawn or Procreate-illustrated wolf-face component set
  (transparent PNG, layered: ears / eyes / muzzle / outline)
- Celtic knotwork reference for the transition-line motif

## Learning tutorials to reference

- LearnOpenCV - "Create Snapchat/Instagram Filters Using Mediapipe"
  (covers landmark-based triangle warping for overlay deformation)
- GitHub: `gerdablum/basic-face-filter` - minimal working example to
  fork/adapt
- MediaPipe Face Mesh official docs (google-ai-edge/mediapipe)
- Talk: "Using MediaPipe to Create Cross-Platform ML Applications with
  React" (Shivay Lamba, React Advanced)

## Status

Early concept stage - no code written yet.
