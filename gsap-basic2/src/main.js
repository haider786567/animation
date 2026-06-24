import gsap from 'gsap'
import './style.css'

// ──────────────────────────────────────────────────────────────
//  TIMELINE & SEQUENCE ANIMATION — Full Reference
// ──────────────────────────────────────────────────────────────
// A timeline is a container for multiple tweens that plays in
// sequence by default. Every .to(), .from(), .fromTo(), .set()
// call adds a new step to the end of the timeline.
//
// KEY CONCEPTS:
//   • Chaining        – .to().to().to() runs one after another
//   • Position param  – 2nd argument controls WHEN a tween plays
//     "" / "+=1"      – relative offset from end of timeline
//     "-=0.5"         – overlap previous tween by 0.5 s
//     "label"         – insert at a named label
//     "<"             – align with START of previous tween
//     "label+=0.3"    – 0.3 s after a label
//   • .from()         – animate FROM given values (element is at end)
//   • .fromTo()       – animate FROM value → TO value
//   • .addLabel()     – place a named bookmark
//   • Stagger         – offset multiple targets inside one step
//   • Nesting         – add a child timeline with .add()
//   • Controls        – .play(), .pause(), .reverse(), .progress()
// ──────────────────────────────────────────────────────────────

// ── Helper: reset element to default before replay ──
function reset (el, props = {}) {
  gsap.set(el, { clearProps: 'all', ...props })
}

// ── Get all Play buttons ──
document.querySelectorAll('[data-tl]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Each button triggers a different demo function
    const fn = window[btn.getAttribute('data-tl')]
    if (fn) fn()
  })
})

// ══════════════════════════════════════════════════════════════
//  DEMO 1 — Basic Chaining
// ══════════════════════════════════════════════════════════════
// Each .to() appends to the end of the sequence.
// Move right → change colour → scale up → move back.
// ══════════════════════════════════════════════════════════════
window.demo1 = function demo1 () {
  const el = document.getElementById('box1')
  reset(el, { x: 0, scale: 1, backgroundColor: '#e94560' })

  const tl = gsap.timeline()
  tl.to(el, { x: 250, duration: 0.8, ease: 'power2.out' })
    .to(el, { backgroundColor: '#f1c40f', duration: 0.3 })
    .to(el, { scale: 1.5, duration: 0.4, ease: 'back.out(2)' })
    .to(el, { x: 0, duration: 0.8, ease: 'power2.in' })
}

// ══════════════════════════════════════════════════════════════
//  DEMO 2 — .from() and .fromTo()
// ══════════════════════════════════════════════════════════════
// .from()  → element starts at the given values, animates TO its
//            natural CSS state.
// .fromTo()→ you define BOTH start and end.
// ══════════════════════════════════════════════════════════════
window.demo2 = function demo2 () {
  const el = document.getElementById('box2')
  reset(el)

  const tl = gsap.timeline()
  // First: animate FROM off-screen left (opacity 0 → 1)
  tl.from(el, { x: -200, opacity: 0, duration: 0.7, ease: 'power3.out' })
    // Then: fromTo — explicit start & end values
    .fromTo(el,
      { backgroundColor: '#2ecc71', scale: 1 },
      { backgroundColor: '#e94560', scale: 1.4, duration: 0.5, ease: 'elastic.out(1, 0.4)' }
    )
}

// ══════════════════════════════════════════════════════════════
//  DEMO 3 — Labels & Position Parameter
// ══════════════════════════════════════════════════════════════
// The position parameter is the 2nd argument (or a property in
// the vars object). It controls WHERE in the timeline the tween
// is placed.
//
//   ""        – end of timeline (default)
//   "+=0.5"   – 0.5 s AFTER the end
//   "-=0.3"   – 0.3 s BEFORE the end (overlap)
//   "<"       – same start as PREVIOUS tween
//   "label"   – at a named label
//   "label+=1" – 1 s after a label
// ══════════════════════════════════════════════════════════════
window.demo3 = function demo3 () {
  const el = document.getElementById('box3')
  reset(el, { x: 0 })

  const tl = gsap.timeline()

  // Step 1 – right (baseline)
  tl.to(el, { x: 280, duration: 1, ease: 'power2.inOut' })

  // Step 2 – overlaps the last 0.4 s of step 1 (starts 0.6 s in)
  tl.to(el, { scale: 1.6, duration: 0.5, ease: 'power2.out' }, '-=0.6')

  // Place a label here
  tl.addLabel('big')

  // Step 3 – happens at label 'big' (simultaneous with step 2 end)
  tl.to(el, { rotation: 180, duration: 0.6 }, 'big')

  // Step 4 – 0.3 s after 'big'
  tl.to(el, { backgroundColor: '#f1c40f', duration: 0.3 }, 'big+=0.3')

  // Step 5 – same start as PREVIOUS tween (step 4)
  tl.to(el, { borderRadius: '50%', duration: 0.4 }, '<')

  // Step 6 – reset, 0.3 s after step 5 ends
  tl.to(el, { x: 0, scale: 1, rotation: 0, borderRadius: '8px', duration: 0.8, ease: 'power2.in' }, '+=0.3')
}

// ══════════════════════════════════════════════════════════════
//  DEMO 4 — Stagger inside a Timeline
// ══════════════════════════════════════════════════════════════
// Stagger offsets the start of each target's animation within
// ONE tween call. Use stagger: { each: 0.15 } to delay each
// element by 0.15 s.
// ══════════════════════════════════════════════════════════════
window.demo4 = function demo4 () {
  const dots = document.querySelectorAll('.dot')
  reset(dots, { x: 0, scale: 1, opacity: 1 })

  const tl = gsap.timeline()
  tl.to(dots, {
    x: 280,
    duration: 0.6,
    ease: 'power2.out',
    stagger: { each: 0.15, from: 'start' }
  })
    .to(dots, {
      scale: 1.8,
      backgroundColor: '#3498db',
      duration: 0.3,
      stagger: { each: 0.1, from: 'center' }
    }, '-=0.3')  // overlap with previous
    .to(dots, {
      x: 0,
      scale: 1,
      backgroundColor: '#e94560',
      duration: 0.5,
      ease: 'power2.in',
      stagger: { each: 0.08, from: 'end' }
    })
}

// ══════════════════════════════════════════════════════════════
//  DEMO 5 — Nested Timelines
// ══════════════════════════════════════════════════════════════
// Use .add(childTL) to embed a timeline inside another.
// The parent plays the child as a single block.
// ══════════════════════════════════════════════════════════════
window.demo5 = function demo5 () {
  const el = document.getElementById('box5')
  reset(el, { x: 0, scale: 1, rotation: 0 })

  // ── Child timeline: bounce ──
  const bounce = gsap.timeline()
  bounce.to(el, { y: -60, duration: 0.3, ease: 'power2.out' })
    .to(el, { y: 0, duration: 0.3, ease: 'bounce.out' })

  // ── Child timeline: spin ──
  const spin = gsap.timeline()
  spin.to(el, { rotation: 360, duration: 0.8, ease: 'power4.out' })

  // ── Parent timeline ──
  const parent = gsap.timeline()
  parent.to(el, { x: 240, duration: 0.7, ease: 'power2.out' })
    .add(bounce)                     // ← nested: bounce in place
    .to(el, { scale: 1.6, duration: 0.3 })
    .add(spin)                       // ← nested: spin while scaled
    .to(el, { scale: 1, x: 0, duration: 0.6, ease: 'power2.in' })
}

// ══════════════════════════════════════════════════════════════
//  DEMO 6 — Timeline Controls
// ══════════════════════════════════════════════════════════════
// Timelines have .play(), .pause(), .reverse(), .progress()
// and more. We also use .timeScale() to slow down for demo.
// ══════════════════════════════════════════════════════════════
let demo6tl = null

window.demo6 = function demo6 () {
  const el = document.getElementById('box6')
  reset(el, { x: 0 })

  if (demo6tl) demo6tl.kill()

  demo6tl = gsap.timeline()
  demo6tl.to(el, { x: 260, duration: 1.5, ease: 'power2.inOut' })
    .to(el, { backgroundColor: '#2ecc71', duration: 0.3 })
    .to(el, { scale: 1.5, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    .to(el, { x: 0, scale: 1, backgroundColor: '#9b59b6', duration: 1, ease: 'power2.in' })

  demo6tl.play()
}

// Control buttons
document.getElementById('pause6').addEventListener('click', () => {
  if (demo6tl) demo6tl.pause()
})
document.getElementById('reverse6').addEventListener('click', () => {
  if (demo6tl) {
    demo6tl.reverse()
    demo6tl.play()
  }
})
document.getElementById('seek6').addEventListener('click', () => {
  if (demo6tl) {
    demo6tl.progress(0.5).pause()
  }
})

// ══════════════════════════════════════════════════════════════
//  DEMO 7 — Practical: Square Path
// ══════════════════════════════════════════════════════════════
// Four .to() calls make the box trace a square.
// This is the classic use-case for timeline chaining — complex
// multi-step motion from simple building blocks.
// ══════════════════════════════════════════════════════════════
window.demo7 = function demo7 () {
  const el = document.getElementById('box7')
  reset(el, { x: 0, y: 0 })

  const tl = gsap.timeline({ ease: 'power1.inOut' })
  tl.to(el, { x: 240, duration: 1 })    // right
    .to(el, { y: 200, duration: 1 })    // down
    .to(el, { x: 0,   duration: 1 })    // left
    .to(el, { y: 0,   duration: 1 })    // up
}

// ══════════════════════════════════════════════════════════════
//  DEMO 8 — Position Parameter Visual Comparison
// ══════════════════════════════════════════════════════════════
// Four lanes, each with two tweens. The FIRST tween is identical
// on all lanes (move right, 1 s). The SECOND tween uses different
// position values so you can see the timing difference.
//
//   default ""   → starts after first ends
//   "+=0.5"      → starts 0.5 s AFTER first ends
//   "-=0.5"      → overlaps the LAST 0.5 s of first tween
//   "<"          → starts at SAME time as first tween
// ══════════════════════════════════════════════════════════════
window.demo8 = function demo8 () {
  const ids = ['p-default', 'p-plus', 'p-minus', 'p-same']
  ids.forEach(id => {
    const el = document.getElementById(id)
    gsap.set(el, { clearProps: 'all', x: 0 })
  })

  // Each timeline has 2 tweens per lane.
  // All first-tweens start at time 0 and run for 1 s.
  const tl = gsap.timeline()

  // Lane 1 — default (end of timeline)
  tl.to('#p-default', { x: 220, duration: 1, ease: 'power2.out' })
    .to('#p-default', { backgroundColor: '#f1c40f', duration: 0.3 }, '')  // default

  // Lane 2 — "+=0.5" (0.5 s gap after first ends)
  tl.to('#p-plus', { x: 220, duration: 1, ease: 'power2.out' }, 0)
    .to('#p-plus', { backgroundColor: '#e94560', duration: 0.3 }, '+=0.5')

  // Lane 3 — "-=0.5" (overlap: starts when first is halfway)
  tl.to('#p-minus', { x: 220, duration: 1, ease: 'power2.out' }, 0)
    .to('#p-minus', { backgroundColor: '#e94560', duration: 0.3 }, '-=0.5')

  // Lane 4 — "<" (same start as first tween!)
  tl.to('#p-same', { x: 220, duration: 1, ease: 'power2.out' }, 0)
    .to('#p-same', { backgroundColor: '#e94560', duration: 0.3 }, '<')
}

document.getElementById('reset8').addEventListener('click', () => {
  const ids = ['p-default', 'p-plus', 'p-minus', 'p-same']
  ids.forEach(id => {
    const el = document.getElementById(id)
    gsap.set(el, { clearProps: 'all' })
  })
})

// ══════════════════════════════════════════════════════════════
//  DEMO 9 — Same Label = Simultaneous Start
// ══════════════════════════════════════════════════════════════
// Three boxes, three different animations.
// ALL are pinned to the SAME label "go".
//
// The timeline first moves all boxes to the right.
// Then at label "go" ALL three tweens fire simultaneously:
//   - Rotate box spins 360°
//   - Scale box scales up 2×
//   - Move & Fade box moves further right + fades to 0.3
//
// This shows that labels act as a synchronization point:
// ANY tween placed at the same label starts at the exact same time.
// ══════════════════════════════════════════════════════════════
window.demo9 = function demo9 () {
  const ids = ['l9-r', 'l9-s', 'l9-m']
  ids.forEach(id => {
    const el = document.getElementById(id)
    gsap.set(el, { clearProps: 'all', x: 0, scale: 1, rotation: 0, opacity: 1 })
  })

  const tl = gsap.timeline({ ease: 'power2.out' })

  // Phase 1 — all 3 boxes slide right (sequentially to start)
  tl.to('#l9-r', { x: 160, duration: 0.6 })
    .to('#l9-s', { x: 160, duration: 0.6 })
    .to('#l9-m', { x: 160, duration: 0.6 })

  // Place label "go" at this point
  tl.addLabel('go')

  // Phase 2 — ALL THREE fire at label "go" simultaneously
  // Same label → same start time, regardless of how many tweens
  tl.to('#l9-r', { rotation: 360, duration: 0.8, ease: 'power4.out' }, 'go')
  tl.to('#l9-s', { scale: 2, duration: 0.8, ease: 'elastic.out(1, 0.4)' }, 'go')
  tl.to('#l9-m', { x: 300, opacity: 0.3, duration: 0.8, ease: 'power2.out' }, 'go')

  // Phase 3 — reset all back after a pause
  tl.to(ids.map(id => document.getElementById(id)), {
    x: 0, scale: 1, rotation: 0, opacity: 1,
    duration: 0.6,
    ease: 'power2.in'
  }, '+=0.5')
}

document.getElementById('reset9').addEventListener('click', () => {
  ;['l9-r', 'l9-s', 'l9-m'].forEach(id => {
    gsap.set(document.getElementById(id), { clearProps: 'all' })
  })
})

// ══════════════════════════════════════════════════════════════
//  POSITION PARAMETER — Extra Reference (logged on load)
// ══════════════════════════════════════════════════════════════
// The position parameter is the SECOND argument you pass to
// .to(), .from(), .fromTo(), .set(), .addLabel(), .add().
//
//  ┌────────────────────────────┬──────────────────────────┐
//  │        Syntax              │     Meaning              │
//  ├────────────────────────────┼──────────────────────────┤
//  │  (no arg / undefined)      │ end of timeline          │
//  │  "+=1"                     │ 1 s AFTER end            │
//  │  "-=0.5"                   │ 0.5 s BEFORE end (overlap)│
//  │  "<"                       │ same start as previous   │
//  │  "label"                   │ at a named label         │
//  │  "label+=0.3"              │ 0.3 s after label        │
//  │  3                         │ absolute seconds         │
//  └────────────────────────────┴──────────────────────────┘
//
//  Examples:
//    tl.to(el, { x: 100 }, "+=2")       // wait 2 s, then run
//    tl.to(el, { x: 200 }, "-=0.5")     // overlap prev by 0.5 s
//    tl.to(el, { x: 300 }, "<")         // run at same time as prev
//    tl.addLabel("middle")
//    tl.to(el, { x: 400 }, "middle+=0.2") // 0.2 s after "middle"

console.log(`
╔═════════════════════════════════════════════════╗
║  GSAP Timeline · Position Parameter Reference  ║
╚═════════════════════════════════════════════════╝

  .to(target, vars, POSITION)

  ""         → end of timeline (default)
  "+=N"      → N seconds AFTER the end
  "-=N"      → N seconds BEFORE the end (overlap)
  "<"        → same start time as the PREVIOUS tween
  "label"    → at a named label
  "label+=N" → N seconds after a label
  N (number) → absolute time in seconds

  Nested timeline:
  .add(childTL, POSITION)

  Labels:
  .addLabel("name", POSITION)
  .addPause("label")
`)
