
import { Canvas } from "@react-three/fiber"
import Exp from "./components/Exp"
import {OrbitControls} from "@react-three/drei"

function App() {
  return (
    <>
    <div className="parent h-screen w-full">
    <Canvas>
      <OrbitControls/>
      <Exp></Exp>
    </Canvas>

    </div>
    
    </>
  )
}

export default App
