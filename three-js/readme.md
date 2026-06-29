# Three.js

A minimal Three.js project demonstrating the core concepts of 3D rendering on the web: **Scene**, **Camera**, **Renderer**, geometry, materials, and animation loop with OrbitControls.

Built with [Three.js](https://threejs.org/) and [Vite](https://vitejs.dev/).

---

## 📚 Table of Contents

1. [What is Three.js?](#-what-is-threejs)
2. [Project Structure](#-project-structure)
3. [Installation](#-installation)
4. [Running the Project](#-running-the-project)
5. [Three.js Basics](#-threejs-basics)
   - [Scene](#scene)
   - [Camera](#camera)
   - [Renderer](#renderer)
   - [Mesh (Geometry + Material)](#mesh-geometry--material)
   - [Position, Rotation & Scale (Transforms)](#position-rotation--scale-transforms)
   - [Lights](#lights)
   - [Textures](#textures)
   - [Clock (Time & Animation)](#clock-time--animation)
   - [Animation Loop](#animation-loop)
   - [OrbitControls](#orbitcontrols)
6. [How It All Fits Together](#-how-it-all-fits-together)
7. [Next Steps](#-next-steps)

---

## 🧊 What is Three.js?

**Three.js** is a JavaScript 3D library that makes it easy to create and display animated 3D graphics in the browser using **WebGL**. It abstracts away the complexity of WebGL so you can focus on building scenes with objects, lights, cameras, and animations.

At the heart of every Three.js project are three building blocks:

| Block | Role |
| ----- | ---- |
| **Scene** | The 3D world that holds all your objects, lights, and the camera. |
| **Camera** | The "eye" that views the scene. Determines what is visible and how it's projected. |
| **Renderer** | The engine that draws the scene from the camera's perspective onto a `<canvas>`. |

---

## 📁 Project Structure

```
three-js/
├── index.html         # Entry HTML — contains the <canvas> element
├── package.json       # Dependencies and npm scripts
├── public/            # Static assets served as-is
├── src/
│   ├── main.js        # Three.js scene setup and animation loop
│   └── style.css      # Page styling
└── readme.md          # You are here
```

---

## ⚙️ Installation

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Steps

1. **Clone the repository** (or download the project):

   ```bash
   git clone <your-repo-url>
   cd animation/three-js
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   This installs:
   - `three` — the Three.js library
   - `vite` — the dev server / bundler (dev dependency)

---

## 🚀 Running the Project

Start the Vite dev server with hot-reload:

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

### Other Scripts

| Command | What it does |
| ------- | ------------ |
| `npm run dev` | Starts the Vite dev server with HMR |
| `npm run build` | Builds the project for production into `dist/` |
| `npm run preview` | Serves the production build locally to preview |

---

## 🎓 Three.js Basics

Below is a walkthrough of every concept used in `src/main.js`.

### Scene

The `Scene` is the container for everything you want to render — meshes, lights, groups, helpers, and more.

```js
import * as THREE from 'three'

const scene = new THREE.Scene()
```

Anything you want visible must be added to the scene with `scene.add(object)`.

### Camera

Three.js ships with several cameras. The most common is the **`PerspectiveCamera`**, which mimics how human eyes see — objects farther away appear smaller.

```js
const camera = new THREE.PerspectiveCamera(
  75,                                  // FOV (field of view) in degrees
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1,                                 // near clipping plane
  100                                  // far clipping plane
)

camera.position.z = 3   // move the camera back along the Z axis
```

- **FOV** — how wide the camera "sees". 75° is a good default.
- **Aspect ratio** — should match your canvas to avoid stretching.
- **Near / Far** — objects outside this range are not rendered (for performance).

### Renderer

The `WebGLRenderer` is what actually draws the scene to a `<canvas>` using WebGL.

```js
const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
```

You can pass `{ antialias: true }` for smoother edges:

```js
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
```

To render a frame:

```js
renderer.render(scene, camera)
```

### Mesh (Geometry + Material)

A **Mesh** is a visible object in the scene. It combines two things:

- **Geometry** — the shape (e.g. `BoxGeometry`, `SphereGeometry`).
- **Material** — how the surface looks (color, texture, shading).

```js
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

scene.add(cube)
```

- `MeshBasicMaterial` ignores lights (great for flat-shaded demos).
- For realistic lighting, try `MeshStandardMaterial` or `MeshPhysicalMaterial`.

### Position, Rotation & Scale (Transforms)

Every `Object3D` in Three.js (meshes, lights, cameras, groups…) inherits a 3D transform made of three properties. These are the equivalent of moving, spinning, and resizing an object in 3D space.

| Property | What it controls | Common methods |
| -------- | ---------------- | -------------- |
| `position` | Where the object lives in the scene (X, Y, Z) | `.set(x, y, z)` or `object.position.x = …` |
| `rotation` | How the object is rotated (in **radians**, around X/Y/Z) | `.set(x, y, z)` or `object.rotation.x = …` |
| `scale`    | How big the object is (1 = original size) | `.set(x, y, z)` or `object.scale.x = …` |

```js
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 'red' })
)

// 1) Position — move the cube 2 units right, 1 unit up, and 3 units toward the camera
cube.position.set(2, 1, 3)

// 2) Rotation — spin around the X and Y axes
cube.rotation.set(Math.PI / 4, Math.PI / 4, 0)

// 3) Scale — make it twice as wide, half as tall, and keep depth unchanged
cube.scale.set(2, 0.5, 1)
```

#### Why this matters

- **Position** is how you *place* things in the world (e.g. moving a light above a desk).
- **Rotation** is how you *orient* things (e.g. spinning a coin or pointing an arrow).
- **Scale** is how you *size* things — `1` is identity, `2` doubles, `0.5` halves.
- All three are relative to the **parent's** transform, so a child inside a `Group` inherits the group's position/rotation/scale.

> 💡 **Tip:** `THREE.MathUtils.degToRad(deg)` converts degrees → radians, which is handy when you'd rather think in degrees.

### Lights

By default, materials like `MeshBasicMaterial` are **unlit** (flat color). To get realistic shading you switch to a light-aware material (e.g. `MeshStandardMaterial`) and add at least one **light**.

Three.js gives you a handful of light types — each one is useful in different situations:

| Light | Behavior | Typical use |
| ----- | -------- | ----------- |
| `AmbientLight` | Lights every surface equally from all directions | Cheap "fill" so shadows aren't pitch black |
| `DirectionalLight` | Parallel rays from one direction (like the sun) | Sunlight, key lights |
| `PointLight` | Emits in every direction from a single point | Light bulbs, fires |
| `SpotLight` | A cone of light from a point (like a flashlight) | Stage lighting, headlights |
| `HemisphereLight` | Sky color from above, ground color from below | Outdoor ambient |

```js
// Soft fill — applies equally to every face of every object
const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)

// A bright "sun" — direction defaults to (0, 0, 0) → (0, -1, 0) (straight down)
const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.position.set(2, 3, 4) // tilt it so it casts from the top-right
scene.add(directionalLight)
```

> ⚠️ `MeshBasicMaterial` **ignores lights** entirely. If your object looks flat, you forgot to switch to `MeshStandardMaterial` / `MeshPhysicalMaterial` / `MeshLambertMaterial`.

### Textures

**Textures** are images applied to the surface of a mesh — they're what turn a plain white cube into a brick, a wooden plank, or a photograph.

#### Loading a texture

Use `THREE.TextureLoader` to asynchronously fetch an image:

```js
import * as THREE from 'three'

const texture = new THREE.TextureLoader().load(
  'https://images.unsplash.com/photo-1782233941435-7d4c3cdac42a'
)
```

#### Applying a texture to a material

Pass it as the `map` property of a material:

```js
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ map: texture }) // ← texture becomes the surface
)
scene.add(cube)
```

#### Other useful texture slots

| Slot | What it controls |
| ---- | ---------------- |
| `map`            | The base color of the surface |
| `normalMap`      | Bumps / dents (fakes surface detail without geometry) |
| `roughnessMap`   | Per-pixel "shininess" (works with `MeshStandardMaterial`) |
| `metalnessMap`   | Per-pixel metalness |
| `aoMap`          | Ambient occlusion shading |

```js
// Example: texture + custom base color
const material = new THREE.MeshStandardMaterial({
  map: texture,
  color: 0xffffff // tint applied on top of the texture (white = no tint)
})
```

> 💡 **Tip:** When loading from a URL, set `texture.colorSpace = THREE.SRGBColorSpace` so colors render correctly.

### Clock (Time & Animation)

`THREE.Clock` gives you a reliable timer — perfect for animations, physics, or anything that depends on *time elapsed since the page loaded*.

```js
const clock = new THREE.Clock()
```

It exposes two important methods:

| Method | Returns | Use it for |
| ------ | ------- | ---------- |
| `getElapsedTime()` | Total seconds since the clock started | Continuous motion (rotations, oscillations) |
| `getDelta()` | Seconds since the **last** call to `getDelta()` | Frame-rate-independent step-based updates |

#### Continuous rotation example

```js
function animate() {
  const elapsed = clock.getElapsedTime()

  // Rotate one full turn every ~6.28s (2π radians)
  cube.rotation.x = elapsed
  cube.rotation.y = elapsed

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
```

#### Frame-rate-independent physics-style update

```js
function animate() {
  const delta = clock.getDelta() // seconds since last frame

  cube.position.x += 1 * delta  // moves 1 unit per second regardless of FPS
  cube.rotation.y += 1 * delta  // spins 1 rad/s regardless of FPS

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()
```

> 💡 **Why not just `+= 0.01`?** Hard-coded increments look different on a 60Hz monitor vs a 144Hz monitor. Multiplying by `delta` keeps motion consistent across devices.

### Animation Loop

To create motion, re-render the scene on every frame using `requestAnimationFrame`:

```js
function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
```

This loop runs ~60 times per second and is the heart of any real-time 3D app.

### OrbitControls

`OrbitControls` lets the user rotate, pan, and zoom the camera with the mouse — perfect for inspecting a scene.

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true   // smooths out the motion
```

> ⚠️ Don't forget to call `controls.update()` **inside** your animation loop when damping is enabled, otherwise the controls will feel "stuck".

---

## 🧩 How It All Fits Together

The order of operations in `src/main.js` is the classic Three.js pipeline:

```
1. Create Scene
2. Create Camera (position it)
3. Create Mesh(es) from Geometry + Material
4. Add Mesh to Scene
5. Create Renderer bound to <canvas>
6. Add OrbitControls (optional, for interactivity)
7. Start animation loop:
       update object transforms
       controls.update()
       renderer.render(scene, camera)
```

That's it — every Three.js project, no matter how complex, builds on this skeleton.

---

## 🔭 Next Steps

Once you're comfortable with the basics, try:

- 🎨 **Lights** — add `AmbientLight`, `DirectionalLight`, or `PointLight` and switch to `MeshStandardMaterial`.
- 📦 **More geometries** — `SphereGeometry`, `TorusGeometry`, `CylinderGeometry`, etc.
- 🖼️ **Textures** — load images with `THREE.TextureLoader` and apply them as maps.
- 🎬 **Animations** — drive rotations/positions with `Clock` and delta time.
- 🧱 **Groups** — group multiple meshes with `THREE.Group` to transform them together.
- 📦 **Models** — load `.gltf` / `.glb` models via `GLTFLoader`.
- ⚡ **Shaders** — write custom `ShaderMaterial` for full visual control.

---

## 📜 License

This project is for learning purposes. Three.js is licensed under [MIT](https://github.com/mrdoob/three.js/blob/master/LICENSE).