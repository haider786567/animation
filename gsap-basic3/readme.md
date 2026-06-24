# GSAP Plugins — ScrollTrigger, Draggable, Inertia, SplitText, Flip

---

## 1. ScrollTrigger

Triggers animations based on scroll position. Makes elements animate as they enter/leave the viewport.

### Basic Setup

```js
gsap.registerPlugin(ScrollTrigger)

gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",       // element that triggers the animation
    start: "top 80%",      // when top of trigger hits 80% from top of viewport
    end: "top 30%",        // when top of trigger hits 30% from top of viewport
    scrub: true,           // animation follows scroll (1:1 mapping)
    markers: true,         // show start/end markers (debug only)
    toggleActions: "play pause reverse reset",
  },
  x: 400,
  rotation: 360,
  scale: 1.5,
})
```

### Key Properties

| Property | Description |
|---|---|
| `trigger` | The element whose scroll position drives the animation |
| `start` | When animation begins (e.g. `"top 80%"`, `"top center"`, `"bottom 100px"`) |
| `end` | When animation ends |
| `scrub` | Links animation progress to scroll bar: `true` (1:1), or a number (lag in seconds) |
| `markers` | Visual start/end markers for debugging |
| `toggleActions` | Actions on enter/leave/enterBack/leaveBack: `"play pause reverse reset"` |
| `pin` | Pins the trigger element during scroll (boolean or spacer element) |
| `pinSpacing` | Adds margin to prevent layout jump when pinned (`true` / `false`) |
| `anticipatePin` | Pre-pins slightly before reaching pin point for smoothness |
| `invalidateOnRefresh` | Recalculates on window resize |
| `scroller` | Scroll container (default: viewport). Use for horizontal scroll containers |
| `onEnter` | Callback when scrolling past start |
| `onLeave` | Callback when scrolling past end |
| `onEnterBack` | Callback when scrolling back past end |
| `onLeaveBack` | Callback when scrolling back past start |

### Common Start/End Values

```
"top top"      → trigger top aligns with viewport top
"top bottom"   → trigger top aligns with viewport bottom
"center center"→ trigger center aligns with viewport center
"bottom top"   → trigger bottom aligns with viewport top
"bottom bottom"→ trigger bottom aligns with viewport bottom
```

Percentages and px also work: `"top 80%"`, `"+=300"`, `"-=100"`

### toggleActions Breakdown

Format: `"onEnter onLeave onEnterBack onLeaveBack"`

- `play` → play animation forward
- `pause` → pause animation
- `reverse` → play animation in reverse
- `reset` → jump to start (progress 0)
- `restart` → jump to start then play
- `none` → do nothing

Example: `"play none none reset"` → plays on first enter, resets on leave back.

### ScrollTrigger in a Timeline

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top 80%",
    end: "top 30%",
    scrub: true,
  }
})

tl.to(".box1", { x: 200 })
  .to(".box2", { y: 200 })
  .to(".box3", { scale: 2 })
```

### Refresh / Cleanup

```js
ScrollTrigger.refresh()           // recalculate all ScrollTriggers
ScrollTrigger.getAll()            // array of all ScrollTrigger instances
ScrollTrigger.killAll()           // destroy all
```

---

## 2. Draggable

Makes any element draggable with mouse/touch.

### Basic Setup

```js
Draggable.create(".box", {
  type: "x,y",              // axis of movement: "x", "y", "x,y", "rotation", "scale"
  bounds: "#app",           // restrict to container (selector or element)
  inertia: true,            // enable momentum (requires InertiaPlugin)
  edgeResistance: 0.65,     // resistance when hitting bounds (0-1)
  dragResistance: 0.65,     // friction during drag (0-1)
  cursor: "grab",           // cursor style during drag
})
```

### Key Properties

| Property | Description |
|---|---|
| `type` | Axes: `"x"`, `"y"`, `"x,y"`, `"rotation"`, `"scale"`, or `"scroll"` |
| `bounds` | Restricts movement: selector, element, or `{minX, maxX, minY, maxY}` |
| `edgeResistance` | Resistance at bounds (0 = stop, 1 = no resistance) |
| `dragResistance` | Friction while dragging (0 = none, 1 = immovable) |
| `inertia` | Enable momentum (needs InertiaPlugin) — `true` or config object |
| `minimumMovement` | Minimum px to register drag (default: 2) |
| `clickableThings` | Clickable elements inside draggable (prevents drag on click) |
| `allowEventDefault` | Allow default browser behaviour for touch events |
| `liveSnap` | Snap points during drag: array, function, or `true` |
| `snap` | Snap on release: array of values or function |
| `cursor` | CSS cursor during drag |

### Callbacks

```js
Draggable.create(".box", {
  type: "x,y",
  bounds: "#app",

  onDragStart: function() {
    console.log("drag started", this.x, this.y)
  },
  onDrag: function() {
    console.log("dragging...", this.x, this.y)
  },
  onDragEnd: function() {
    console.log("drag ended", this.x, this.y)
  },
  onPress: function() {
    console.log("pressed (before drag)")
  },
  onRelease: function() {
    console.log("released")
  },
})
```

Inside callbacks, `this` refers to the Draggable instance, so you can access:
- `this.x` / `this.y` — current position
- `this.startX` / `this.startY` — position at start of drag
- `this.target` — the DOM element
- `this.deltaX` / `this.deltaY` — distance since last frame

### Draggable Instance Methods

```js
const drag = Draggable.create(".box")[0]  // returns array

drag.disable()
drag.enable()
drag.kill()
```

---

## 3. InertiaPlugin

Adds momentum/physics to Draggable — throw the element and it continues with deceleration.

### Basic Usage

```js
Draggable.create(".box", {
  type: "x,y",
  bounds: "#app",
  inertia: true,              // basic: throw with default friction
})
```

### Advanced Inertia Config

```js
Draggable.create(".box", {
  type: "rotation,x",
  inertia: {
    minimumMovement: 10,      // min velocity to trigger inertia
    maxDuration: 2,           // max throw duration (seconds)
    minDuration: 0.1,         // min throw duration
    overshoot: true,          // allow overshooting bounds (with resistance)
    resistance: 30,           // resistance to slow down (higher = faster stop)
    throwResistance: 1000,    // resistance during throw phase (higher = less distance)
    smoothEnd: true,          // smooth ending
  },
  snap: {
    x: [0, 100, 200, 300],   // snap x to these values on release
    y: [0, 100, 200],         // snap y to these values
    rotation: endValue => Math.round(endValue / 45) * 45,  // snap rotation to nearest 45°
  },
})
```

### Inertia without Draggable (throw tweens)

```js
InertiaPlugin.to(".box", {
  x: 500,
  throwProps: {
    velocity: 500,            // initial velocity
    resistance: 30,           // deceleration
    min: 0,
    max: 500,
  },
})
```

> **Note:** InertiaPlugin must be registered BEFORE Draggable.create when using `inertia: true`.

---

## 4. SplitText

Splits text into characters, words, and/or lines for individual animation.

### Basic Setup

```js
const split = new SplitText(".title h1", {
  type: "chars,words,lines",     // what to split into
  charsClass: "titleChar",       // custom class for <span> elements
  wordsClass: "titleWord",
  linesClass: "titleLine",
})
```

### Key Properties

| Property | Description |
|---|---|
| `type` | Comma-separated: `"chars"`, `"words"`, `"lines"`, `"lines,words"` |
| `charsClass` | CSS class added to each character `<span>` |
| `wordsClass` | CSS class added to each word `<span>` |
| `linesClass` | CSS class added to each line `<span>` |
| `position` | `"absolute"` or `"relative"` for line positioning |
| `wordsAreDelimiter` | Treat spaces as delimiters (default: true) |
| `delimiter` | Custom delimiter string |

### Resulting Properties

```js
const split = new SplitText("h1", { type: "chars,words,lines" })

split.chars       // array of character <span> elements
split.words       // array of word <span> elements
split.lines       // array of line <span> elements
```

### Animating Split Text

```js
const split = new SplitText(".title h1", {
  type: "chars,words,lines",
  charsClass: "titleChar",
  wordsClass: "titleWord",
  linesClass: "titleLine",
})

// Animate words with stagger
gsap.from(split.words, {
  yPercent: 100,
  duration: 1,
  stagger: {
    each: 0.04,
    from: "edges",      // start from edges toward center
  },
  ease: "back.out(1.7)",
})
```

### CSS for Split Text

```css
.titleChar,
.titleWord,
.titleLine {
  display: inline-block;    /* required for transforms */
  overflow: hidden;         /* hide overflow when using yPercent */
}
```

### Reverting SplitText

```js
split.revert()   // restores original DOM structure
```

### Important Notes

- SplitText modifies the DOM — call `revert()` if you need to re-split
- Lines class works best with `display: inline-block` to prevent layout issues
- For `yPercent` animations, elements need `overflow: hidden` on the parent
- Each split part is wrapped in a `<span>` with the specified class

---

## 5. Flip Plugin

FLIP = **F**irst, **L**ast, **I**nvert, **P**lay. Animates DOM elements from one state to another seamlessly — great for layout reflow, list reordering, grid shuffling.

### Basic Workflow

```js
// 1. Get current state
const state = Flip.getState(".card")

// 2. Change the DOM (add/remove/move elements)
cardsContainer.append(card)       // or any DOM mutation

// 3. Animate from old state to new state
Flip.from(state, {
  duration: 0.8,
  ease: "power2.inOut",
})
```

### Flip Methods

| Method | Description |
|---|---|
| `Flip.getState(targets)` | Capture current positions/dimensions of elements |
| `Flip.from(state, vars)` | Animate from captured state to new positions |
| `Flip.to(targets, vars)` | Inline animation from current → new state |
| `Flip.fromTo(targets, fromVars, toVars)` | Full control start → end |

### Key Properties

```js
Flip.from(state, {
  duration: 0.8,
  ease: "power2.inOut",
  scale: true,             // animate scale changes too
  absolute: true,          // use position:absolute during animation (avoids layout collisions)
  simple: false,           // simpler calculations for less edge cases
  targets: ".card",        // filter which elements from state to animate
  nested: false,           // include nested elements
  zIndex: 5,               // set z-index during animation
  stagger: 0.05,           // stagger between elements
  onEnter: (elements, animation) => { },  // new elements fade in
  onLeave: (elements, animation) => { },  // removed elements fade out
})
```

### Common Use Cases

**Grid shuffle:**
```js
grid.addEventListener("click", () => {
  const state = Flip.getState(".card")
  shuffleArray(cards)      // reorder DOM
  Flip.from(state, {
    duration: 0.6,
    stagger: 0.03,
    ease: "power2.out",
  })
})
```

**Layout expand/collapse:**
```js
const state = Flip.getState(".item")
item.classList.toggle("expanded")
Flip.from(state, { duration: 0.5, ease: "power3.inOut" })
```

### Advanced: onEnter / onLeave

```js
Flip.from(state, {
  duration: 0.6,
  onEnter: (els, tl) => {
    gsap.fromTo(els,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03 }
    )
  },
  onLeave: (els, tl) => {
    gsap.to(els, {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      onComplete: () => els.forEach(el => el.remove())
    })
  },
})
```

### Flip with Stagger

```js
Flip.from(state, {
  duration: 0.6,
  stagger: {
    each: 0.05,
    from: "center",       // "start", "center", "end", "edges", "random"
    grid: "auto",          // auto-detect grid dimensions
    axis: "y",             // stagger on y-axis first
  },
})
```

---

## 6. Registration & Imports

All GSAP plugins must be registered before use.

```js
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { InertiaPlugin } from "gsap/InertiaPlugin"
import { SplitText } from "gsap/SplitText"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"

gsap.registerPlugin(ScrollTrigger, InertiaPlugin, SplitText, Draggable, Flip)
```

---

## 7. Quick Reference Cheatsheet

```js
// ——— ScrollTrigger ———
gsap.to(el, { scrollTrigger: { trigger, start, end, scrub, toggleActions, pin, markers } })

// ——— Draggable ———
Draggable.create(el, { type: "x,y", bounds, edgeResistance, dragResistance, inertia, onDrag, onDragEnd })

// ——— InertiaPlugin ———
Draggable.create(el, { inertia: true })
InertiaPlugin.to(el, { throwProps: { velocity, resistance, min, max } })

// ——— SplitText ———
const split = new SplitText(el, { type: "chars,words,lines" })
gsap.from(split.words, { yPercent: 100, stagger: 0.04 })

// ——— Flip ———
const state = Flip.getState(elements)
// mutate DOM
Flip.from(state, { duration: 0.8, ease: "power2.inOut" })
