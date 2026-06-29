import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
// Scene
const scene = new THREE.Scene()
const clock = new THREE.Clock()
const camera  = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)

//mesh
const texture = new THREE.TextureLoader().load('https://images.unsplash.com/photo-1782233941435-7d4c3cdac42a?q=80&w=1360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  // new THREE.MeshBasicMaterial({ color: 'red'})
  new THREE.MeshStandardMaterial({ color: 'red' })
)
// cube.position.set(0, 0, 0)
// cube.scale.set(1, 1, 1)

const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)
const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
scene.add(directionalLight)

scene.add(cube)

//canvas
const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
const controll = new OrbitControls(camera, renderer.domElement)
controll.enableDamping = true


renderer.setSize(size.width, size.height)
camera.position.z = 3
window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
})



function animate() {
  
  const delta = clock.getElapsedTime()
  cube.rotation.x = delta 
  cube.rotation.y = delta 

  controll.update()
  
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()



