# GSAP (GreenSock Animation Platform) — Complete Notes

A comprehensive reference covering Days 1–3 of GSAP learning.

---

## Day 1 — Core Tweens: `to` / `from` / `fromTo`, Easing, and Callbacks

---

### 1. The Tween Family: `to`, `from`, `fromTo`, `set`

#### `gsap.to(target, vars)`
Animates **from the element's current state** to the values you define in `vars`.

```js
gsap.to(".box", { x: 200, duration: 1 });
// .box moves from wherever it is NOW to x:200
```

#### `gsap.from(target, vars)`
Animates **from the values you define** back to the element's current (natural) state.

```js
gsap.from(".box", { x: 200, duration: 1 });
// .box starts at x:200, then animates to its current/original position
```

#### `gsap.fromTo(target, fromVars, toVars)`
Animates **from explicitly defined start values** to explicitly defined end values. Most control, most verbose.

```js
gsap.fromTo(".box", { x: 0, opacity: 0 }, { x: 200, opacity: 1, duration: 1 });
// .box goes from x:0, opacity:0 → x:200, opacity:1
```

#### `gsap.set(target, vars)`
A zero-duration tween — instantly sets properties. Equivalent to `gsap.to(target, { ...vars, duration: 0 })`.

```js
gsap.set(".box", { x: 100, opacity: 0.5 });
// instantly positions .box without animation
```

#### Comparison Table

| Method | Start value | End value | Use case |
|---|---|---|---|
| `to` | Current state | You define | Move/go to a new state |
| `from` | You define | Current state | Entrance animation from off-screen |
| `fromTo` | You define | You define | Full control over both start and end |
| `set` | — | You define | Instant setup, no animation |

---

### 2. Easing: `in` / `out` / `inOut` / `outIn`

Easing controls the acceleration/deceleration of the animation. GSAP uses **Power1–Power4** (or `"none"` for linear).

#### Easing types applied to any power

| Syntax | Behaviour |
|---|---|
| `"power1.out"` (default) | Fast start, slow end — natural deceleration |
| `"power1.in"` | Slow start, fast end — acceleration |
| `"power1.inOut"` | Slow start & end, fast middle |
| `"power1.outIn"` | Fast start & end, slow middle (rarely used) |

#### Examples

```js
gsap.to(".box", { x: 500, duration: 1, ease: "power2.out" });
gsap.to(".box", { x: 500, duration: 1, ease: "power3.in" });
gsap.to(".box", { x: 500, duration: 1, ease: "power4.inOut" });
```

#### Common ease presets

| Ease | String |
|---|---|
| Linear (no easing) | `"none"` |
| Gentle deceleration | `"power1.out"` |
| Standard deceleration | `"power2.out"` (default in GSAP 3) |
| Strong deceleration | `"power3.out"` |
| Bouncy stop | `"back.out(1.7)"` |
| Elastic | `"elastic.out(1, 0.3)"` |
| Bounce | `"bounce.out"` |

> **Note:** `in` = acceleration, `out` = deceleration, `inOut` = both.

---

### 3. Callback Functions

Callbacks let you run code at specific moments in the tween's lifecycle.

#### All callbacks

| Callback | Fires when… |
|---|---|
| `onStart` | The tween begins (first frame) |
| `onUpdate` | Every time the tween updates (every frame while active) |
| `onComplete` | The tween has finished playing forward |
| `onReverseComplete` | The tween has finished reversing (from end back to start) |
| `onRepeat` | Each time a repeating tween completes one cycle |
| `onInterrupt` | The tween is interrupted (e.g. killed before completion) |

#### Syntax

```js
gsap.to(".box", {
  x: 500,
  duration: 2,
  ease: "power2.out",

  onStart: () => console.log("Started!"),
  onUpdate: () => console.log("Animating..."),
  onComplete: () => console.log("Done!"),
  onReverseComplete: () => console.log("Reversed back to start"),
  onRepeat: () => console.log("Another loop!"),
  onInterrupt: () => console.log("Interrupted"),
});
```

#### Passing parameters to callbacks

Use `onStartParams`, `onUpdateParams`, `onCompleteParams`, etc. as arrays.

```js
gsap.to(".box", {
  x: 500,
  duration: 1,
  onComplete: (el, id) => console.log(`${id} finished`, el),
  onCompleteParams: [".box", "box-1"],
});
```

#### Using `this` inside callbacks

Inside a callback, `this` refers to the tween itself, so you can access its properties:

```js
gsap.to(".box", {
  x: 500,
  duration: 2,
  onComplete: function () {
    console.log(this.duration()); // 2
    console.log(this.progress()); // 1
  },
});
```

#### `onUpdate` + returning from callback

Returning `true` from an `onUpdate` callback will cause the tween to **not render** that frame — useful for custom conditional rendering.

---

### 4. Quick Reference Cheatsheet (Day 1)

```js
// ——— Tween methods ———
gsap.to(target, vars)          // current → vars
gsap.from(target, vars)        // vars → current
gsap.fromTo(target, from, to)  // from → to
gsap.set(target, vars)         // instant set

// ——— Easing ———
ease: "power1.out"      // decelerate (default)
ease: "power2.in"       // accelerate
ease: "power3.inOut"    // slow-fast-slow
ease: "back.out(2)"     // overshoot then settle
ease: "elastic.out(1, 0.3)" // stretchy bounce

// ——— Callbacks ———
onStart
onUpdate
onComplete
onReverseComplete
onRepeat
onInterrupt
// + their *Params counterparts
```

---

## Day 2 — Timelines & Sequence Animation

---

### 1. Creating a Timeline

A **timeline** (`gsap.timeline()`) is a container for multiple tweens that plays in sequence by default.

```js
const tl = gsap.timeline()
const tl = gsap.timeline({ repeat: 1, yoyo: true })   // options
const tl = gsap.timeline({ ease: 'power1.inOut' })    // default ease for all children
```

---

### 2. Adding Tweens to a Timeline

| Method | Description |
|---|---|
| `.to()` | Animate FROM current state → TO given values |
| `.from()` | Animate FROM given values → TO current state |
| `.fromTo()` | Animate FROM explicitly defined start → TO end values |
| `.set()` | Instantly set values (no animation) |

```js
const tl = gsap.timeline()
tl.to(el, { x: 250, duration: 0.8 })
tl.from(el, { x: -200, opacity: 0, duration: 0.7 })
tl.fromTo(el,
  { backgroundColor: '#2ecc71', scale: 1 },   // from
  { backgroundColor: '#e94560', scale: 1.4 }   // to
)
```

---

### 3. Chaining (Default Sequential)

Each `.to()` automatically appends after the previous tween ends.

```js
tl.to(el, { x: 250, duration: 0.8 })           // step 1
  .to(el, { backgroundColor: '#f1c40f' })      // step 2 (after step 1)
  .to(el, { scale: 1.5 })                      // step 3 (after step 2)
  .to(el, { x: 0 })                            // step 4
```

---

### 4. Position Parameter — The 3rd Argument

Controls **WHEN** a tween plays. Pass as 2nd arg to `.to()` / `.from()` / `.fromTo()`, or via `addLabel()`, `add()`.

| Syntax | Meaning |
|---|---|
| `""` / `undefined` | End of timeline (default) |
| `"+=1"` | 1 second AFTER the end |
| `"-=0.5"` | 0.5 s BEFORE the end (overlap) |
| `"<"` | Same start time as **previous** tween |
| `"label"` | At a named label |
| `"label+=0.3"` | 0.3 s after a label |
| `3` (number) | Absolute time in seconds |

```js
tl.to(el, { x: 280, duration: 1 })                   // default sequence
tl.to(el, { scale: 1.6 }, '-=0.6')                   // overlap: starts 0.6s before prev ends
tl.addLabel('big')
tl.to(el, { rotation: 180 }, 'big')                  // at label 'big'
tl.to(el, { backgroundColor: '#f1c40f' }, 'big+=0.3') // 0.3s after label
tl.to(el, { borderRadius: '50%' }, '<')              // same start as PREVIOUS tween
tl.to(el, { x: 0 }, '+=0.3')                         // wait 0.3s after prev ends
```

---

### 5. Labels

Named bookmarks in the timeline.

```js
tl.addLabel('middle')
tl.addLabel('end', '+=2')        // label 2s from now
tl.to(el, { x: 200 }, 'middle') // tween fires at label
```

**Key insight: Multiple tweens at the SAME label fire simultaneously.**

```js
tl.addLabel('go')
tl.to(el1, { rotation: 360 }, 'go')   // both fire at
tl.to(el2, { scale: 2 }, 'go')        // the same time
```

---

### 6. Stagger in a Timeline

Offset multiple targets within ONE tween step.

```js
tl.to(dots, {
  x: 280,
  duration: 0.6,
  stagger: { each: 0.15, from: 'start' }  // 0.15s delay between each
})
```

Stagger options: `from: 'start' | 'center' | 'end'`, `each: 0.15`, `amount: 1` (total stagger time).

---

### 7. Nested Timelines

Embed a child timeline inside a parent with `.add()`.

```js
const bounce = gsap.timeline()
bounce.to(el, { y: -60, duration: 0.3 })
  .to(el, { y: 0, duration: 0.3, ease: 'bounce.out' })

const parent = gsap.timeline()
parent.to(el, { x: 240 })
  .add(bounce)                     // child plays as a block
  .to(el, { scale: 1.6 })
```

---

### 8. Timeline Controls

| Method | Description |
|---|---|
| `.play()` | Play forward from current position |
| `.pause()` | Pause at current position |
| `.reverse()` | Play in reverse |
| `.progress(0.5)` | Seek to 50% (0–1), then `.pause()` |
| `.timeScale(2)` | Play at 2× speed |
| `.seek(2)` | Go to 2-second mark |
| `.kill()` | Destroy the timeline |
| `.restart()` | Reset and play from start |

```js
tl.play()
tl.pause()
tl.reverse()
tl.progress(0.5).pause()   // seek halfway and stop
```

---

### 9. Helper: Reset Before Replay

```js
function reset(el, props = {}) {
  gsap.set(el, { clearProps: 'all', ...props })
}
```

Always call `reset(el)` at the start of a demo function to avoid stale state.

---

### 10. Quick Reference Cheatsheet (Day 2)

```
┌─────────────────────────────────────────────────────┐
│  GSAP Timeline API Quick Reference                  │
├─────────────────────────────────────────────────────┤
│  tl = gsap.timeline({ repeat, yoyo, ease, ... })    │
│                                                      │
│  Adding tweens:                                      │
│    .to(target, vars, position)                       │
│    .from(target, vars, position)                     │
│    .fromTo(target, fromVars, toVars, position)       │
│    .set(target, vars, position)                      │
│                                                      │
│  Labels:                                            │
│    .addLabel('name', position)                      │
│    .addPause('label')                               │
│                                                      │
│  Nesting:                                           │
│    .add(childTL, position)                          │
│                                                      │
│  Controls:                                          │
│    .play() .pause() .reverse() .restart() .kill()   │
│    .progress(0-1) .timeScale(n) .seek(seconds)      │
│    .totalDuration() .duration()                     │
│                                                      │
│  Events:                                            │
│    .eventCallback('onComplete', fn)                 │
│    .eventCallback('onUpdate', fn)                   │
└─────────────────────────────────────────────────────┘
```

> **Remember:** The position parameter is always the **last argument** (3rd for `.to()`, `.from()`, `.fromTo()`; 2nd for `.add()`, `.addLabel()`).

---

## Day 3 — GSAP Plugins: ScrollTrigger, Draggable, Inertia, SplitText, Flip

---

### 1. Plugin Registration

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

### 2. ScrollTrigger

Triggers animations based on scroll position. Makes elements animate as they enter/leave the viewport.

#### Basic Setup

```js
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top 80%",
    end: "top 30%",
    scrub: true,
    markers: true,
    toggleActions: "play pause reverse reset",
  },
  x: 400,
  rotation: 360,
  scale: 1.5,
})
```

#### Key Properties

| Property | Description |
|---|---|
| `trigger` | The element whose scroll position drives the animation |
| `start` | When animation begins (e.g. `"top 80%"`, `"top center"`) |
| `end` | When animation ends |
| `scrub` | Links animation progress to scroll: `true` (1:1), or number (lag seconds) |
| `markers` | Visual start/end markers for debugging |
| `toggleActions` | Actions on enter/leave/enterBack/leaveBack |
| `pin` | Pins the trigger element during scroll |
| `pinSpacing` | Adds margin to prevent layout jump when pinned |
| `anticipatePin` | Pre-pins slightly before reaching pin point |
| `scroller` | Scroll container (default: viewport) |
| `onEnter` / `onLeave` / `onEnterBack` / `onLeaveBack` | Callbacks |

#### Common Start/End Values

```
"top top"      → trigger top aligns with viewport top
"top bottom"   → trigger top aligns with viewport bottom
"center center"→ trigger center aligns with viewport center
"bottom top"   → trigger bottom aligns with viewport top
"bottom bottom"→ trigger bottom aligns with viewport bottom
```

#### toggleActions Breakdown

Format: `"onEnter onLeave onEnterBack onLeaveBack"`

- `play` → play animation forward
- `pause` → pause animation
- `reverse` → play animation in reverse
- `reset` → jump to start (progress 0)
- `restart` → jump to start then play
- `none` → do nothing

#### ScrollTrigger in a Timeline

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

#### Refresh / Cleanup

```js
ScrollTrigger.refresh()           // recalculate all
ScrollTrigger.getAll()            // array of all instances
ScrollTrigger.killAll()           // destroy all
```

---

### 3. Draggable

Makes any element draggable with mouse/touch.

#### Basic Setup

```js
Draggable.create(".box", {
  type: "x,y",
  bounds: "#app",
  inertia: true,
  edgeResistance: 0.65,
  dragResistance: 0.65,
})
```

#### Key Properties

| Property | Description |
|---|---|
| `type` | Axes: `"x"`, `"y"`, `"x,y"`, `"rotation"`, `"scale"`, or `"scroll"` |
| `bounds` | Restricts movement: selector, element, or `{minX, maxX, minY, maxY}` |
| `edgeResistance` | Resistance at bounds (0 = stop, 1 = no resistance) |
| `dragResistance` | Friction while dragging (0 = none, 1 = immovable) |
| `inertia` | Enable momentum (needs InertiaPlugin) — `true` or config object |
| `liveSnap` | Snap points during drag |
| `snap` | Snap on release |
| `cursor` | CSS cursor during drag |

#### Callbacks

```js
Draggable.create(".box", {
  type: "x,y",
  bounds: "#app",
  onDragStart: function() { console.log("drag started", this.x, this.y) },
  onDrag: function() { console.log("dragging...", this.x, this.y) },
  onDragEnd: function() { console.log("drag ended", this.x, this.y) },
  onPress: function() { console.log("pressed") },
  onRelease: function() { console.log("released") },
})
```

Inside callbacks, `this` refers to the Draggable instance:
- `this.x` / `this.y` — current position
- `this.startX` / `this.startY` — position at drag start
- `this.target` — the DOM element
- `this.deltaX` / `this.deltaY` — distance since last frame

#### Instance Methods

```js
const drag = Draggable.create(".box")[0]
drag.disable()
drag.enable()
drag.kill()
```

---

### 4. InertiaPlugin

Adds momentum/physics to Draggable — throw the element and it continues with deceleration.

#### Basic Usage

```js
Draggable.create(".box", {
  type: "x,y",
  bounds: "#app",
  inertia: true,
})
```

#### Advanced Inertia Config

```js
Draggable.create(".box", {
  type: "rotation,x",
  inertia: {
    minimumMovement: 10,
    maxDuration: 2,
    minDuration: 0.1,
    overshoot: true,
    resistance: 30,
    throwResistance: 1000,
    smoothEnd: true,
  },
  snap: {
    x: [0, 100, 200, 300],
    rotation: endValue => Math.round(endValue / 45) * 45,
  },
})
```

#### Inertia without Draggable (throw tweens)

```js
InertiaPlugin.to(".box", {
  throwProps: {
    velocity: 500,
    resistance: 30,
    min: 0,
    max: 500,
  },
})
```

---

### 5. SplitText

Splits text into characters, words, and/or lines for individual animation.

#### Basic Setup

```js
const split = new SplitText(".title h1", {
  type: "chars,words,lines",
  charsClass: "titleChar",
  wordsClass: "titleWord",
  linesClass: "titleLine",
})
```

#### Key Properties

| Property | Description |
|---|---|
| `type` | Comma-separated: `"chars"`, `"words"`, `"lines"` |
| `charsClass` | CSS class added to each character `<span>` |
| `wordsClass` | CSS class added to each word `<span>` |
| `linesClass` | CSS class added to each line `<span>` |
| `position` | `"absolute"` or `"relative"` for line positioning |

#### Resulting Properties

```js
split.chars   // array of character <span> elements
split.words   // array of word <span> elements
split.lines   // array of line <span> elements
```

#### Animating Split Text

```js
const split = new SplitText(".title h1", { type: "chars,words,lines" })

gsap.from(split.words, {
  yPercent: 100,
  duration: 1,
  stagger: { each: 0.04, from: "edges" },
  ease: "back.out(1.7)",
})
```

#### CSS for Split Text

```css
.titleChar, .titleWord, .titleLine {
  display: inline-block;
  overflow: hidden;
}
```

#### Reverting SplitText

```js
split.revert()   // restores original DOM structure
```

---

### 6. Flip Plugin

FLIP = **F**irst, **L**ast, **I**nvert, **P**lay. Animates DOM elements from one state to another seamlessly — great for layout reflow, list reordering, grid shuffling.

#### Basic Workflow

```js
// 1. Get current state
const state = Flip.getState(".card")

// 2. Change the DOM (add/remove/move elements)
cardsContainer.append(card)

// 3. Animate from old state to new state
Flip.from(state, {
  duration: 0.8,
  ease: "power2.inOut",
})
```

#### Flip Methods

| Method | Description |
|---|---|
| `Flip.getState(targets)` | Capture current positions/dimensions |
| `Flip.from(state, vars)` | Animate from captured state to new positions |
| `Flip.to(targets, vars)` | Inline animation current → new |
| `Flip.fromTo(targets, fromVars, toVars)` | Full control start → end |

#### Key Properties

```js
Flip.from(state, {
  duration: 0.8,
  ease: "power2.inOut",
  scale: true,             // animate scale changes
  absolute: true,          // use position:absolute during animation
  targets: ".card",        // filter which elements to animate
  nested: false,           // include nested elements
  stagger: 0.05,           // stagger between elements
  onEnter: (els, tl) => { /* new elements fade in */ },
  onLeave: (els, tl) => { /* removed elements fade out */ },
})
```

#### Common Use Cases

**Grid shuffle:**
```js
const state = Flip.getState(".card")
shuffleArray(cards)
Flip.from(state, { duration: 0.6, stagger: 0.03, ease: "power2.out" })
```

**Layout expand/collapse:**
```js
const state = Flip.getState(".item")
item.classList.toggle("expanded")
Flip.from(state, { duration: 0.5, ease: "power3.inOut" })
```

---

### 7. Quick Reference Cheatsheet (Day 3)

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
```

---

## Appendix: Package Setup (Vite + GSAP)

```json
{
  "dependencies": {
    "gsap": "^3.12.x"
  }
}
```

```js
// main.js (entry point)
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { InertiaPlugin } from "gsap/InertiaPlugin"
import { SplitText } from "gsap/SplitText"
import { Draggable } from "gsap/Draggable"
import { Flip } from "gsap/Flip"

gsap.registerPlugin(ScrollTrigger, InertiaPlugin, SplitText, Draggable, Flip)
```

> All GSAP Club plugins (SplitText, InertiaPlugin, Flip, Draggable) require a **GSAP Club membership** for production use. ScrollTrigger is free.
