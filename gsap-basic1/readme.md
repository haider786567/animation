# GSAP Notes — `to` / `from` / `fromTo` Family, `in` / `out` / `inOut` Easing, and Callback Functions

---

## 1. The Tween Family: `to`, `from`, `fromTo`, `set`

### `gsap.to(target, vars)`
Animates **from the element's current state** to the values you define in `vars`.

```js
gsap.to(".box", { x: 200, duration: 1 });
// .box moves from wherever it is NOW to x:200
```

### `gsap.from(target, vars)`
Animates **from the values you define** back to the element's current (natural) state.

```js
gsap.from(".box", { x: 200, duration: 1 });
// .box starts at x:200, then animates to its current/original position
```

### `gsap.fromTo(target, fromVars, toVars)`
Animates **from explicitly defined start values** to explicitly defined end values. Most control, most verbose.

```js
gsap.fromTo(".box", { x: 0, opacity: 0 }, { x: 200, opacity: 1, duration: 1 });
// .box goes from x:0, opacity:0 → x:200, opacity:1
```

### `gsap.set(target, vars)`
A zero-duration tween — instantly sets properties. Equivalent to `gsap.to(target, { ...vars, duration: 0 })`.

```js
gsap.set(".box", { x: 100, opacity: 0.5 });
// instantly positions .box without animation
```

---

### Comparison Table

| Method | Start value | End value | Use case |
|---|---|---|---|
| `to` | Current state | You define | Move/go to a new state |
| `from` | You define | Current state | Entrance animation from off-screen |
| `fromTo` | You define | You define | Full control over both start and end |
| `set` | — | You define | Instant setup, no animation |

---

## 2. Easing: `in` / `out` / `inOut` / `outIn`

Easing controls the acceleration/deceleration of the animation. GSAP uses **Power1–Power4** (or `"none"` for linear).

### Easing types applied to any power

| Syntax | Behaviour |
|---|---|
| `"power1.out"` (default) | Fast start, slow end — natural deceleration |
| `"power1.in"` | Slow start, fast end — acceleration |
| `"power1.inOut"` | Slow start & end, fast middle |
| `"power1.outIn"` | Fast start & end, slow middle (rarely used) |

### Examples

```js
gsap.to(".box", { x: 500, duration: 1, ease: "power2.out" });
gsap.to(".box", { x: 500, duration: 1, ease: "power3.in" });
gsap.to(".box", { x: 500, duration: 1, ease: "power4.inOut" });
```

### Common ease presets

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

## 3. Callback Functions

Callbacks let you run code at specific moments in the tween's lifecycle.

### All callbacks

| Callback | Fires when… |
|---|---|
| `onStart` | The tween begins (first frame) |
| `onUpdate` | Every time the tween updates (every frame while active) |
| `onComplete` | The tween has finished playing forward |
| `onReverseComplete` | The tween has finished reversing (from end back to start) |
| `onRepeat` | Each time a repeating tween completes one cycle |
| `onInterrupt` | The tween is interrupted (e.g. killed before completion) |

### Syntax

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

### Passing parameters to callbacks

Use `onStartParams`, `onUpdateParams`, `onCompleteParams`, etc. as arrays.

```js
gsap.to(".box", {
  x: 500,
  duration: 1,
  onComplete: (el, id) => console.log(`${id} finished`, el),
  onCompleteParams: [".box", "box-1"],
});
```

### Using `this` inside callbacks

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

### `onUpdate` + returning from callback

Returning `true` from an `onUpdate` callback will cause the tween to **not render** that frame — useful for custom conditional rendering.

---

## 4. Putting It All Together — Examples

### Entrance with `from` + `in` ease

```js
gsap.from(".card", {
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: "power3.in",  // accelerates inward
  onStart: () => document.querySelector(".card").classList.add("entering"),
  onComplete: () => document.querySelector(".card").classList.add("entered"),
});
```

### Complex timeline using `fromTo` + callbacks

```js
const tl = gsap.timeline({
  onComplete: () => console.log("Timeline done"),
});

tl.fromTo(".logo",   { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 1, ease: "back.out(2)" })
  .to(".title",      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
  .fromTo(".button", { opacity: 0, y: 20 },         { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" });
```

---

## 5. Quick Reference Cheatsheet

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
