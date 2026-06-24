import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import './style.css'

gsap.registerPlugin(ScrollTrigger, InertiaPlugin, SplitText, Draggable, Flip);

// ═══════════════════════════════════════════════════════════════════════════════
//  DAY-3 MASTER DEMO — Concepts from Day 1 + Day 2 + Day 3
// ═══════════════════════════════════════════════════════════════════════════════
//  DAY 1:  gsap.to() / .from() / .fromTo() / .set() — tween basics
//          Easing functions (in / out / inOut / back / elastic)
//          Callbacks (onStart, onUpdate, onComplete, onReverseComplete)
//          Timeline basics (chaining with defaults)
//
//  DAY 2:  Timeline chaining & sequencing
//          Position parameter ( "", "+=N", "-=N", "<", "label", "label+=N" )
//          .from() & .fromTo() inside timelines
//          Stagger (offset multiple targets within one tween)
//          Nested timelines (.add(childTL))
//          Timeline controls (.play(), .pause(), .reverse(), .progress(), .seek())
//          Labels as synchronization points
//
//  DAY 3:  ScrollTrigger (scroll-driven animation)
//          SplitText (break text into chars/words/lines)
//          Draggable (drag elements with inertia)
//          Flip (FLIP animation for layout changes)
// ═══════════════════════════════════════════════════════════════════════════════

// ── Phase 1: Build the page structure ──
// Dynamically add boxes, buttons, and sections so the HTML stays clean.
function buildDemoUI() {
  const app = document.getElementById('app')
  if (!app) return

  // Clear content — we'll rebuild fully
  app.innerHTML = ''

  // ── Section: Title (SplitText target) ──
  const titleSection = document.createElement('section')
  titleSection.id = 'section-title'
  titleSection.className = 'page'
  titleSection.innerHTML = `
    <div class="center-content">
      <div class="title">
        <h1 id="split-target">ANIMATION<br>MASTERCLASS</h1>
      </div>
      <p class="subtitle">DAY 1 · DAY 2 · DAY 3</p>
    </div>
  `
  app.appendChild(titleSection)

  // ── Section: Tween Demos (Day 1 concepts) ──
  const tweenSection = document.createElement('section')
  tweenSection.id = 'section-tween'
  tweenSection.className = 'page'
  tweenSection.innerHTML = `
    <div class="center-content">
      <h2 class="section-heading">── DAY 1 · TWEENS & EASING ──</h2>
      <div class="demo-row">
        <div class="box" id="tween-to"></div>
        <span class="label">gsap.to()</span>
      </div>
      <div class="demo-row">
        <div class="box box-from-demo" id="tween-from"></div>
        <span class="label">gsap.from()</span>
      </div>
      <div class="demo-row">
        <div class="box box-fromto-demo" id="tween-fromto"></div>
        <span class="label">gsap.fromTo()</span>
      </div>
      <div class="demo-row">
        <div class="box" id="tween-ease"></div>
        <span class="label">Easing: back.out(2)</span>
      </div>
      <div class="demo-row">
        <div class="box" id="tween-elastic"></div>
        <span class="label">Easing: elastic.out(1,0.3)</span>
      </div>
    </div>
  `
  app.appendChild(tweenSection)

  // ── Section: Timeline Chaining (Day 2 concept) ──
  const timelineSection = document.createElement('section')
  timelineSection.id = 'section-timeline'
  timelineSection.className = 'page'
  timelineSection.innerHTML = `
    <div class="center-content">
      <h2 class="section-heading">── DAY 2 · TIMELINE CHAINING ──</h2>
      <div class="demo-row">
        <div class="box" id="tl-box"></div>
      </div>
      <div class="button-row">
        <button data-tl="runTimelineDemo">▶ RUN</button>
        <button id="pause-tl">⏸ PAUSE</button>
        <button id="resume-tl">▶ RESUME</button>
        <button id="reverse-tl">↻ REVERSE</button>
        <button id="seek-tl">⏮ SEEK 50%</button>
      </div>
    </div>
  `
  app.appendChild(timelineSection)

  // ── Section: Stagger (Day 1 + Day 2 concept) ──
  const staggerSection = document.createElement('section')
  staggerSection.id = 'section-stagger'
  staggerSection.className = 'page'
  staggerSection.innerHTML = `
    <div class="center-content">
      <h2 class="section-heading">── STAGGER (DAY 1 + 2) ──</h2>
      <div class="stagger-container" id="stagger-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <button id="run-stagger">▶ RUN STAGGER</button>
    </div>
  `
  app.appendChild(staggerSection)

  // ── Section: Draggable with Inertia (Day 3 concept) ──
  const dragSection = document.createElement('section')
  dragSection.id = 'section-drag'
  dragSection.className = 'page'
  dragSection.innerHTML = `
    <div class="center-content">
      <h2 class="section-heading">── DAY 3 · DRAGGABLE + INERTIA ──</h2>
      <p class="instruction">Drag the red box!</p>
      <div class="drag-area" id="drag-area">
        <div class="box" id="drag-box"></div>
      </div>
    </div>
  `
  app.appendChild(dragSection)
}

// ── Phase 2: Helper to reset element(s) ──
function reset(el, props = {}) {
  gsap.set(el, { clearProps: 'all', ...props })
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DEMO A — SplitText Title Entrance  (Day 3: SplitText + Day 2: Stagger)
// ── Uses SplitText to break heading into words, then staggers them in
//    using gsap.from() (Day 1 concept) with back.out easing (Day 1 concept).
// ═══════════════════════════════════════════════════════════════════════════════
function initSplitText() {
  const target = document.getElementById('split-target')
  if (!target) return

  // SplitText (Day 3): breaks text into characters, words, and lines
  // so each piece can be animated independently.
  const split = new SplitText(target, {
    type: 'words,chars',
    wordsClass: 'split-word',
    charsClass: 'split-char',
  })

  // gsap.from() (Day 1): animates FROM the defined values TOWARD the current state.
  // Stagger (Day 2): each word starts with a 0.06s delay after the previous one.
  // Easing back.out(1.7) (Day 1): overshoots slightly then settles.
  gsap.from(split.words, {
    yPercent: 120,
    opacity: 0,
    rotationX: -90,
    duration: 1.2,
    stagger: { each: 0.08, from: 'start' },
    ease: 'back.out(1.7)',
    onStart: () => console.log('[SplitText] onStart — words entering'),
    onComplete: () => console.log('[SplitText] onComplete — all words visible'),
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DEMO B — ScrollTrigger + Tween Demos (Day 1 + Day 3)
// ── Each box in the tween section triggers when scrolled into view.
//    Demonstrates .to(), .from(), .fromTo(), and different ease presets.
// ═══════════════════════════════════════════════════════════════════════════════
function initScrollTweens() {
  // ── gsap.to() (Day 1): animates FROM current state TO defined values.
  //    Here the box starts at its CSS position (x:0) and moves to x:300.
  //    ScrollTrigger (Day 3): fires when the element's top hits 85% of viewport.
  gsap.to('#tween-to', {
    x: 300,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#tween-to',
      start: 'top 85%',
      toggleActions: 'play none none reset',
    },
    onStart: () => console.log('[tween-to] started — power2.out'),
    onComplete: () => console.log('[tween-to] complete'),
  })

  // ── gsap.from() (Day 1): element starts at x:300, animates BACK to x:0 (its CSS).
  //    The element must be positioned at its final state in CSS; .from() supplies the start.
  gsap.from('#tween-from', {
    x: 300,
    backgroundColor: '#ff6b6b',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#tween-from',
      start: 'top 85%',
      toggleActions: 'play none none reset',
    },
    onStart: () => console.log('[tween-from] started — from right edge'),
  })

  // ── gsap.fromTo() (Day 1): full control over both start AND end values.
  //    Start: x:-100, scale:0.5, opacity:0.3
  //    End:   x:250,  scale:1,   opacity:1
  gsap.fromTo('#tween-fromto',
    { x: -100, scale: 0.5, opacity: 0.3 },
    {
      x: 250, scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out',
      scrollTrigger: {
        trigger: '#tween-fromto',
        start: 'top 85%',
        toggleActions: 'play none none reset',
      },
    }
  )

  // ── Easing: back.out(2) (Day 1) — overshoots past target then settles back.
  gsap.to('#tween-ease', {
    x: 300,
    duration: 1.5,
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: '#tween-ease',
      start: 'top 85%',
      toggleActions: 'play none none reset',
    },
  })

  // ── Easing: elastic.out(1, 0.3) (Day 1) — bounces several times before settling.
  gsap.to('#tween-elastic', {
    x: 300,
    duration: 2,
    ease: 'elastic.out(1, 0.3)',
    scrollTrigger: {
      trigger: '#tween-elastic',
      start: 'top 85%',
      toggleActions: 'play none none reset',
    },
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DEMO C — Timeline Chaining + Controls (Day 1 + Day 2 combined)
// ── A single timeline chains multiple .to() calls to move a box in a square path.
//    Position parameters (Day 2) control overlap/timing.
//    Callbacks (Day 1) fire at each step.
//    Buttons allow play/pause/reverse/seek (Day 2 timeline controls).
// ═══════════════════════════════════════════════════════════════════════════════
let masterTL = null

window.runTimelineDemo = function runTimelineDemo() {
  if (masterTL) {
    masterTL.kill()
    masterTL = null
  }

  const el = document.getElementById('tl-box')
  reset(el, { x: 0, y: 0, scale: 1, rotation: 0, backgroundColor: '#e94560' })

  // ── Create timeline (Day 2) ──
  // A timeline groups multiple tweens into a sequence.
  // Each .to() appends to the end by default.
  masterTL = gsap.timeline({
    // Defaults apply to ALL steps unless overridden
    defaults: { duration: 0.8, ease: 'power2.out' },
    // Callbacks (Day 1): fire at timeline level
    onStart: () => console.log('[TL] timeline started'),
    onComplete: () => console.log('[TL] timeline complete — full square traversed'),
    onUpdate: () => {
      // Only log at ~50% intervals to keep console clean
      const p = masterTL ? Math.round(masterTL.progress() * 100) : 0
      if (p % 25 === 0 && p > 0) console.log(`[TL] progress: ${p}%`)
    },
  })

  // ── Step 1: move RIGHT (Day 2: basic .to() chaining) ──
  masterTL.to(el, { x: 240, backgroundColor: '#f1c40f' })

  // ── Step 2: move DOWN, overlap by 0.4s (Day 2: position parameter "-=0.4") ──
  //    The minus sign means "this many seconds BEFORE the timeline would end",
  //    creating overlap with the previous tween.
  masterTL.to(el, { y: 180, backgroundColor: '#2ecc71', rotation: 180 }, '-=0.4')

  // ── Place a label (Day 2: addLabel for synchronization) ──
  masterTL.addLabel('corner')

  // ── Step 3: move LEFT, starts at label 'corner' (Day 2: label positioning) ──
  //    This runs simultaneously with any other tweens placed at the same label.
  masterTL.to(el, { x: 0, backgroundColor: '#3498db', rotation: 270 }, 'corner')

  // ── Step 4: move UP, 0.3s after 'corner' label (Day 2: label+=N) ──
  masterTL.to(el, { y: 0, backgroundColor: '#e94560', rotation: 360, scale: 1.3 }, 'corner+=0.3')

  // ── Step 5: scale back down, aligns with START of previous tween (Day 2: "<")
  //    "<" means "same start time as the immediately preceding tween".
  masterTL.to(el, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, '<')
}

// ── Timeline control buttons (Day 2) ──
//    .pause()    — freezes timeline at current position
//    .play()     — resumes from current position
//    .reverse()  — plays backward from current position
//    .progress() — jumps to a specific fraction (0 = start, 1 = end)
function setupTimelineControls() {
  document.getElementById('pause-tl')?.addEventListener('click', () => {
    if (masterTL) {
      masterTL.pause()
      console.log('[TL] paused at progress:', masterTL.progress().toFixed(2))
    }
  })
  document.getElementById('resume-tl')?.addEventListener('click', () => {
    if (masterTL) {
      masterTL.play()
      console.log('[TL] resumed')
    }
  })
  document.getElementById('reverse-tl')?.addEventListener('click', () => {
    if (masterTL) {
      masterTL.reverse()
      console.log('[TL] reversing')
    }
  })
  document.getElementById('seek-tl')?.addEventListener('click', () => {
    if (masterTL) {
      masterTL.progress(0.5).pause()
      console.log('[TL] seeked to 50%')
    }
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DEMO D — Stagger with Timeline (Day 2 stagger + Day 1 callbacks)
// ── A timeline staggers 5 dots across the screen with overlapping steps.
//    stagger: { each: 0.15 } means each dot starts 0.15s after the previous one.
//    from: 'start' / 'center' / 'end' controls which dot fires first.
// ═══════════════════════════════════════════════════════════════════════════════
function setupStagger() {
  document.getElementById('run-stagger')?.addEventListener('click', () => {
    const dots = document.querySelectorAll('.dot')
    reset(dots, { x: 0, scale: 1, opacity: 1, backgroundColor: '#e94560' })

    // Timeline with nested stagger tweens (Day 2)
    const tl = gsap.timeline({
      onComplete: () => console.log('[Stagger] demo complete'),
    })

    // Step 1: stagger dots to the RIGHT
    //    stagger.each: each dot delays 0.15s more than the last
    //    stagger.from: 'start' — first dot (index 0) moves first
    tl.to(dots, {
      x: 260,
      duration: 0.5,
      ease: 'power2.out',
      stagger: { each: 0.15, from: 'start' },
      onComplete: () => console.log('[Stagger] phase 1 — moved right'),
    })

    // Step 2: stagger SCALE up + colour change
    //    stagger.from: 'center' — middle dot scales first, then outward
    tl.to(dots, {
      scale: 1.8,
      backgroundColor: '#3498db',
      duration: 0.3,
      stagger: { each: 0.1, from: 'center' },
    }, '-=0.3')  // Overlap with end of phase 1 (Day 2 position param)

    // Step 3: stagger BACK to origin
    //    stagger.from: 'end' — last dot moves first (reverse order)
    tl.to(dots, {
      x: 0,
      scale: 1,
      backgroundColor: '#e94560',
      duration: 0.5,
      ease: 'power2.in',
      stagger: { each: 0.1, from: 'end' },
    })
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DEMO E — Draggable with Inertia (Day 3)
// ── Makes the box draggable within the drag-area.
//    Inertia (Day 3): the box keeps moving after release, slowing down naturally.
//    edgeResistance: resists dragging past the container bounds.
//    Callbacks (Day 1): onDragStart / onDragEnd fire at those events.
// ═══════════════════════════════════════════════════════════════════════════════
function initDraggable() {
  Draggable.create('#drag-box', {
    type: 'x,y',
    bounds: '#drag-area',
    inertia: true,
    edgeResistance: 0.65,
    dragResistance: 0.3,
    onDragStart: function() {
      console.log('[Draggable] drag started')
      gsap.to(this.target, { scale: 1.2, duration: 0.2 })
    },
    onDragEnd: function() {
      console.log('[Draggable] drag ended at', Math.round(this.x), Math.round(this.y))
      gsap.to(this.target, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' })
    },
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DEMO F — Flip Animation (Day 3)
// ── FLIP: First, Last, Invert, Play.
//    Used to animate elements between layout states smoothly.
//    Here we toggle the dot container between a row and a grid layout.
// ═══════════════════════════════════════════════════════════════════════════════
let flipState = 'row'

function initFlip() {
  // Add a toggle button and grid-style for stagger container
  const container = document.getElementById('stagger-container')
  if (!container) return

  const toggleBtn = document.createElement('button')
  toggleBtn.id = 'flip-toggle'
  toggleBtn.textContent = '↕ TOGGLE LAYOUT'
  container.parentNode?.insertBefore(toggleBtn, container.nextSibling)

  toggleBtn.addEventListener('click', () => {
    // Record the current ("First") state via Flip.getState()
    const state = Flip.getState('.dot')

    // Toggle layout class
    flipState = flipState === 'row' ? 'grid' : 'row'
    container.classList.toggle('layout-grid', flipState === 'grid')
    container.classList.toggle('layout-row', flipState === 'row')

    // Flip.from() animates from the old state to the new ("Last") state
    // The plugin automatically calculates the delta.
    Flip.from(state, {
      duration: 0.6,
      ease: 'power2.inOut',
      // stagger: { each: 0.03 },  // uncomment for cascading effect
      onStart: () => console.log('[Flip] layout change starting'),
      onComplete: () => console.log(`[Flip] layout changed to ${flipState}`),
    })
  })
}

// ═══════════════════════════════════════════════════════════════════════════════
//  INIT — run everything on DOM ready
// ═══════════════════════════════════════════════════════════════════════════════
function init() {
  console.log('╔══════════════════════════════════════════╗')
  console.log('║   DAY 3 — Animation Masterclass         ║')
  console.log('║   Concepts: Day 1 + Day 2 + Day 3       ║')
  console.log('╚══════════════════════════════════════════╝')

  buildDemoUI()
  initSplitText()
  initScrollTweens()
  setupTimelineControls()
  setupStagger()
  initDraggable()
  initFlip()

  // ── Auto-run the timeline demo after a short delay ──
  setTimeout(() => {
    if (window.runTimelineDemo) window.runTimelineDemo()
  }, 1000)

  console.log('✅ All demos initialised — scroll, drag, click & watch the console.')
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
