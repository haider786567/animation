import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const AnimateComponent = ({children}) => {
    const containerRef = useRef(null)
    useGSAP(() => {
        gsap.to(containerRef.current, {
            x: 400,
            duration: 2,
            repeat: -1,
            yoyo: true
        })
       
    }, {
        scope: containerRef,
        dependencies: [],
        revertOnUpdate: true
    })

    return (
        <div ref={containerRef}>
            {children}
        </div>
    )


}

export default AnimateComponent
