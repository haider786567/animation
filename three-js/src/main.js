import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Scene
const scene = new THREE.Scene()

const camera  = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)

//mesh
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

scene.add(cube)

//canvas
const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
const controll = new OrbitControls(camera, renderer.domElement)
controll.enableDamping = true

renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.z = 3

function animate() {
  
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  controll.update()
  
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

