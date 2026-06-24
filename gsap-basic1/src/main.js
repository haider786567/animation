import gsap from 'gsap'
import './style.css'

// ═══════════════════════════════════════════════════════
// 1. TWEEN FAMILY — to / from / fromTo / set
// ═══════════════════════════════════════════════════════

// --- gsap.to() ---
// Animates FROM current state TO defined values
gsap.to('.box-to', {
  x: 200,
  duration: 1.5,
  ease: 'power2.out',
  onComplete: () => console.log('[to] complete'),
})

// --- gsap.from() ---
// Animates FROM defined values back to current state
gsap.from('.box-from', {
  x: 400,
  duration: 1.5,
  ease: 'power2.out',
  onComplete: () => console.log('[from] complete'),
})

// --- gsap.fromTo() ---
// Full control over both start and end values
gsap.fromTo(
  '.box-fromto',
  { x: 0, opacity: 0.3 },
  { x: 250, opacity: 1, duration: 1.5, ease: 'power2.out', onComplete: () => console.log('[fromTo] complete') }
)

// --- gsap.set() ---
// Instant (zero-duration) property set
gsap.set('.box-set', {
  x: 300,
  backgroundColor: '#ff8800',
})

// ═══════════════════════════════════════════════════════
// 2. EASING — in / out / inOut / presets
// ═══════════════════════════════════════════════════════

gsap.to('.box-ease-out', {
  x: 400,
  duration: 2,
  ease: 'power2.out',
  onComplete: () => console.log('[ease] power2.out done'),
})

gsap.to('.box-ease-in', {
  x: 400,
  duration: 2,
  ease: 'power2.in',
  onComplete: () => console.log('[ease] power2.in done'),
})

gsap.to('.box-ease-inout', {
  x: 400,
  duration: 2,
  ease: 'power2.inOut',
  onComplete: () => console.log('[ease] power2.inOut done'),
})

gsap.to('.box-ease-back', {
  x: 400,
  duration: 2,
  ease: 'back.out(2)',
  onComplete: () => console.log('[ease] back.out(2) done'),
})

gsap.to('.box-ease-elastic', {
  x: 400,
  duration: 2,
  ease: 'elastic.out(1, 0.3)',
  onComplete: () => console.log('[ease] elastic.out done'),
})

// ═══════════════════════════════════════════════════════
// 3. CALLBACK FUNCTIONS
// ═══════════════════════════════════════════════════════

// --- All basic callbacks ---
gsap.to('.box-callback', {
  x: 350,
  duration: 2,
  ease: 'power2.out',

  onStart: () => console.log('[callback] onStart fired'),
  onUpdate: () => {
    // only log every ~30 frames to avoid flooding console
    if (Math.round(gsap.getProperty('.box-callback', 'x')) % 50 < 1) {
      console.log('[callback] onUpdate — animating...')
    }
  },
  onComplete: () => console.log('[callback] onComplete fired'),
  onReverseComplete: () => console.log('[callback] onReverseComplete fired'),
  onRepeat: () => console.log('[callback] onRepeat — another cycle'),
  onInterrupt: () => console.log('[callback] onInterrupt — animation interrupted'),
  repeat: 1,
  yoyo: true,
})

// --- Passing parameters to callbacks (onCompleteParams) ---
gsap.to('.box-callback-params', {
  x: 350,
  duration: 2,
  ease: 'power2.out',
  onComplete: (el, id) => console.log(`[callbackParams] ${id} finished`, el),
  onCompleteParams: ['.box-callback-params', 'cb-params-1'],
})

// --- Using `this` inside a callback ---
gsap.to('.box-callback-this', {
  x: 350,
  duration: 2,
  ease: 'power2.out',
  onComplete: function () {
    console.log('[callbackThis] duration:', this.duration())
    console.log('[callbackThis] progress:', this.progress())
    console.log('[callbackThis] isActive:', this.isActive())
  },
})

// ═══════════════════════════════════════════════════════
// 4. COMBINED — entrance with from + power3.in + callbacks
// ═══════════════════════════════════════════════════════

gsap.from('.box-entrance', {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: 'power3.in',
  onStart: () => {
    document.querySelector('.box-entrance')?.classList.add('entering')
    console.log('[entrance] onStart — entering animation')
  },
  onComplete: () => {
    document.querySelector('.box-entrance')?.classList.add('entered')
    console.log('[entrance] onComplete — fully entered')
  },
})

// ═══════════════════════════════════════════════════════
// 5. TIMELINE — fromTo + to + fromTo + callbacks
// ═══════════════════════════════════════════════════════

const tl = gsap.timeline({
  delay: 0.5,
  onComplete: () => console.log('[timeline] full timeline complete'),
})

tl.fromTo(
  '.box-tl-1',
  { scale: 0, rotation: -180 },
  { scale: 1, rotation: 0, duration: 1, ease: 'back.out(2)' }
)
  .to('.box-tl-2', {
    y: 40,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  })
  .fromTo(
    '.box-tl-3',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out' }
  )

console.log('✅ All GSAP examples initialised — check console for callback logs')
