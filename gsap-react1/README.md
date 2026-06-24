# GSAP React 3 Notes

Date: June 25, 2026

These notes cover React + GSAP cleanup patterns, reusable animation components, and Framer Motion basics.

---

## 1. `useRef` in Animation

`useRef` gives direct access to a DOM element without causing a re-render.

```jsx
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function Box() {
  const boxRef = useRef(null);

  useGSAP(() => {
    gsap.to(boxRef.current, {
      x: 200,
      duration: 1,
      ease: "power2.out",
    });
  });

  return <div ref={boxRef} className="box" />;
}
```

Use `ref.current` when animating one specific element.

---

## 2. `scope` in `useGSAP`

`scope` limits GSAP selector text to one component area.

```jsx
function Cards() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
      });
    },
    { scope: container }
  );

  return (
    <section ref={container}>
      <div className="card">One</div>
      <div className="card">Two</div>
      <div className="card">Three</div>
    </section>
  );
}
```

Without `scope`, `".card"` can select matching elements outside the component. With `scope`, GSAP only finds `.card` elements inside `container`.

---

## 3. `dependencies`

`dependencies` tell `useGSAP` when to run the animation again.

```jsx
function CounterBox({ count }) {
  const box = useRef(null);

  useGSAP(
    () => {
      gsap.to(box.current, {
        scale: 1 + count * 0.05,
        duration: 0.4,
      });
    },
    { dependencies: [count] }
  );

  return <div ref={box}>{count}</div>;
}
```

Use dependencies when the animation depends on props, state, or changing values.

---

## 4. `revertOnUpdate`

By default, GSAP cleans up when the component unmounts. `revertOnUpdate: true` also cleans up before the hook runs again because of dependency changes.

```jsx
useGSAP(
  () => {
    gsap.from(".item", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
    });
  },
  {
    scope: container,
    dependencies: [items],
    revertOnUpdate: true,
  }
);
```

Use `revertOnUpdate` when dependency changes create a new animation and the old animation should be fully reset first.

---

## 5. `contextSafe`

`contextSafe` connects delayed animation code to the GSAP context, so cleanup still works.

Use it for event handlers, timeouts, promises, or any animation that runs after the main `useGSAP` function.

```jsx
function ButtonAnimation() {
  const root = useRef(null);

  const { contextSafe } = useGSAP({ scope: root });

  const handleClick = contextSafe(() => {
    gsap.to(".box", {
      rotation: 360,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  });

  return (
    <div ref={root}>
      <button onClick={handleClick}>Animate</button>
      <div className="box" />
    </div>
  );
}
```

If the component unmounts, animations created inside `contextSafe` are cleaned up correctly.

---

## 6. Reusable Animation Component

You can reuse animation logic by wrapping children in a component.

```jsx
function FadeUp({ children, delay = 0 }) {
  const el = useRef(null);

  useGSAP(() => {
    gsap.from(el.current, {
      y: 35,
      opacity: 0,
      delay,
      duration: 0.7,
      ease: "power3.out",
    });
  });

  return <div ref={el}>{children}</div>;
}

export default function App() {
  return (
    <>
      <FadeUp>
        <h1>Hello</h1>
      </FadeUp>
      <FadeUp delay={0.2}>
        <p>This paragraph uses the same animation component.</p>
      </FadeUp>
    </>
  );
}
```

Reusable animation components keep the app cleaner and avoid copying the same GSAP code many times.

---

## 7. Framer Motion Basics

Framer Motion uses motion components like `motion.div`.

```jsx
import { motion } from "framer-motion";

function BasicMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      Hello Motion
    </motion.div>
  );
}
```

Common props:

| Prop | Meaning |
|---|---|
| `initial` | Starting animation state |
| `animate` | Final animation state |
| `exit` | Animation before leaving, commonly with `AnimatePresence` |
| `transition` | Timing, delay, ease, spring settings |
| `whileHover` | Animation during hover |
| `whileTap` | Animation during tap/click |
| `whileInView` | Animation when element enters viewport |

---

## 8. `whileInView`

`whileInView` runs when the element appears in the viewport.

```jsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  Scroll reveal
</motion.div>
```

Useful viewport options:

| Option | Meaning |
|---|---|
| `once: true` | Animate only the first time |
| `amount: 0.3` | Start when 30% of element is visible |
| `margin` | Add offset around the viewport trigger area |

---

## 9. Variants

Variants store named animation states in one object.

```jsx
const boxVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function VariantBox() {
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
    >
      Variant animation
    </motion.div>
  );
}
```

Variants are useful when many components should share the same animation states.

---

## 10. Parent Variants

Parent variants can control child variants. This is very useful for stagger animations.

```jsx
const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function List() {
  return (
    <motion.ul
      variants={parentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {["HTML", "CSS", "React"].map((item) => (
        <motion.li variants={childVariants} key={item}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

The parent starts the animation, and each child follows its own variant with stagger timing.

---

## Quick Revision

```txt
useRef             -> select one DOM element
scope              -> limit selector text inside one component
dependencies       -> rerun animation when values change
revertOnUpdate     -> clean old animation before rerun
contextSafe        -> safe animations in event handlers or delayed code
reusable component -> wrap repeated animation logic
whileInView        -> animate on scroll into viewport
variants           -> named animation states
parent variants    -> parent controls children, useful for stagger
```
