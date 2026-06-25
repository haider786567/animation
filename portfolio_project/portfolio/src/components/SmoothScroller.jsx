"use client"
import useLenis from '@/hooks/uselenis'
import { Children } from 'react'


const SmoothScroller = ({ children }) => {
    useLenis()
  return <>
  {children}
  
  </>
}

export default SmoothScroller
