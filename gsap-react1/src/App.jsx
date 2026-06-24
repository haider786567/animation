// import gsap from 'gsap'
// import {useGSAP} from '@gsap/react'
// import  {useRef}from 'react'
import { motion } from "motion/react"

const App = () => {
  // const boxRef = useRef([])
  // const containerRef = useRef(null)
  // useGSAP(() => {
  //   gsap.to( boxRef.current ,{
  //       x: 400,
  //       duration: 2,
  //       repeat: -1,
  //       yoyo: true

  //   })
  // },  
  // {
  //   scope: containerRef,
  //   dependencies:[],
  //   revertOnUpdate:true
  // })
  const boxVarient = {
    hidden: { opacity: 0, scale: 1.2, x: -100 },
    visible: { opacity: 1, x: 400, scale: 0.9 },
  }

  return <>
 
    <motion.div
    variants={boxVarient}
      initial="hidden"
      animate="visible"
      transition={{ duration: 2, ease: "easeInOut"}}
      // viewport={{ once: false, amount: 0.8 }}
      // whileInView={{opacity:1,scale:1}}
      
      // whileTap={{scale:0.8}}
      className='box'
    >
    </motion.div>
    <motion.div
    variants={boxVarient}
      initial="hidden"
      animate="visible"
      transition={{ duration: 2, ease: "easeInOut"}}
      // viewport={{ once: false, amount: 0.8 }}
      // whileInView={{opacity:1,scale:1}}
      
      // whileTap={{scale:0.8}}
      className='box'
    >
    </motion.div>
    <motion.div
    variants={boxVarient}
      initial="hidden"
      animate="visible"
      transition={{ duration: 2, ease: "easeInOut"}}
      // viewport={{ once: false, amount: 0.8 }}
      // whileInView={{opacity:1,scale:1}}
      
      // whileTap={{scale:0.8}}
      className='box'
    >
    </motion.div>
   
  </>
}

export default App
