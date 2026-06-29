import { Environment, useGLTF, useTexture } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"


const Exp = () => {
  const cubeRef = useRef()
  useFrame((state, delta) => {
    cubeRef.current.rotation.x += delta
    cubeRef.current.rotation.y += delta

  })
  const handleClick = () => {
    cubeRef.current.material.color.set('blue')
  }
  // const dreiTexture = useTexture("https://plus.unsplash.com/premium_photo-1673513508497-bab3caca8221?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
  //  const texture = useLoader(THREE.TextureLoader, "https://plus.unsplash.com/premium_photo-1673513508497-bab3caca8221?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
  // const {scene} = useGLTF("./Robot.glb")
  return (
    <>
    <mesh  onClick={handleClick} position={[0,0,0]} ref={cubeRef}>
        <boxGeometry args={[1,1,1]}/>
        <meshStandardMaterial color={'red'} roughness={0.1} metalness={0.9}  />
    </mesh>
    <Environment files="./envMap.hdr"/>
    {/* <ambientLight intensity={4} color={'white'}/> */}
    {/* <primitive object={scene} position={[0,-2,0]} /> */}

    
    </>
  )
}

export default Exp
