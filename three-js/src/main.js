import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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

const envMap = new  RGBELoader()
envMap.load('./envMap.hdr',(envMap)=>{
  envMap.mapping = THREE.EquirectangularReflectionMapping
   //scene.background = envMap
  scene.environment = envMap
})
// let mixer ;

// const gltfLoader = new GLTFLoader()
// gltfLoader.load('./Robot.glb', (gltf) => {
//   const model = gltf.scene
//   model.position.set(0, -1, 0)

//   model.scale.set(0.5, 0.5 , 0.5)
//   mixer = new THREE.AnimationMixer(model)
//   const action = mixer.clipAction(gltf.animations[0])
//   action.play()
//   scene.add(model)
// })
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  // new THREE.MeshBasicMaterial({ color: 'red'})
  new THREE.MeshStandardMaterial({ 
    color: 'red' ,
    metalness: 0.6,
    roughness: 0.1,
  })
)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX / size.width * 2 - 1
  mouse.y = -(e.clientY / size.height) * 2 + 1
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObject(cube)
  if(intersects.length > 0){
    cube.material.color.set('blue')
  }else{
    cube.material.color.set('red')
  }
})
// cube.position.set(0, 0, 0)const 
// cube.scale.set(1, 1, 1)

const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)
const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
// scene.add(directionalLight)

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
  const newdelta = clock.getDelta()
  cube.rotation.x = delta 
  cube.rotation.y = delta 
  // if(mixer){
  //   mixer.update(delta * 0.01)
  // }

  controll.update()
  
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()



