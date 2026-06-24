# GSAP Timeline & Sequence Animation — Fast Revision

A **timeline** (`gsap.timeline()`) is a container for multiple tweens that plays in sequence by default. Every `.to()`, `.from()`, `.fromTo()`, `.set()` call appends a new step to the end of the timeline.

---

## 1. Creating a Timeline

```js
const tl = gsap.timeline()
const tl = gsap.timeline({ repeat: 1, yoyo: true })   // options
const tl = gsap.timeline({ ease: 'power1.inOut' })    // default ease for all children
```

---

## 2. Adding Tweens to a Timeline

| Method        | Description                                          |
|---------------|------------------------------------------------------|
| `.to()`       | Animate FROM current state → TO given values          |
| `.from()`     | Animate FROM given values → TO current state          |
| `.fromTo()`   | Animate FROM explicitly defined start → TO end values |
| `.set()`      | Instantly set values (no animation)                   |

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

## 3. Chaining (Default Sequential)

Each `.to()` automatically appends after the previous tween ends.

```js
tl.to(el, { x: 250, duration: 0.8 })           // step 1
  .to(el, { backgroundColor: '#f1c40f' })      // step 2 (after step 1)
  .to(el, { scale: 1.5 })                      // step 3 (after step 2)
  .to(el, { x: 0 })                            // step 4
```

---

## 4. Position Parameter — The 3rd Argument

Controls **WHEN** a tween plays. Pass as 2nd arg to `.to()` / `.from()` / `.fromTo()`, or via `addLabel()`, `add()`.

| Syntax              | Meaning                                   |
|---------------------|-------------------------------------------|
| `""` / `undefined`  | End of timeline (default)                 |
| `"+=1"`             | 1 second AFTER the end                     |
| `"-=0.5"`           | 0.5 s BEFORE the end (overlap)            |
| `"<"`               | Same start time as **previous** tween     |
| `"label"`           | At a named label                          |
| `"label+=0.3"`      | 0.3 s after a label                       |
| `3` (number)        | Absolute time in seconds                  |

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

## 5. Labels

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

## 6. Stagger in a Timeline

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

## 7. Nested Timelines

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

## 8. Timeline Controls

| Method                      | Description                            |
|----------------------------|----------------------------------------|
| `.play()`                  | Play forward from current position     |
| `.pause()`                 | Pause at current position              |
| `.reverse()`               | Play in reverse                        |
| `.progress(0.5)`           | Seek to 50% (0–1), then `.pause()`     |
| `.timeScale(2)`            | Play at 2× speed                       |
| `.seek(2)`                 | Go to 2-second mark                    |
| `.kill()`                  | Destroy the timeline                   |
| `.restart()`               | Reset and play from start              |

```js
tl.play()
tl.pause()
tl.reverse()
tl.progress(0.5).pause()   // seek halfway and stop
```

---

## 9. Example: Square Path

```js
const tl = gsap.timeline({ ease: 'power1.inOut' })
tl.to(el, { x: 240, duration: 1 })    // right
  .to(el, { y: 200, duration: 1 })    // down
  .to(el, { x: 0,   duration: 1 })    // left
  .to(el, { y: 0,   duration: 1 })    // up
```

---

## 10. Helper: Reset Before Replay

```js
function reset(el, props = {}) {
  gsap.set(el, { clearProps: 'all', ...props })
}
```

Always call `reset(el)` at the start of a demo function to avoid stale state.

---

## Summary Cheatsheet

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
