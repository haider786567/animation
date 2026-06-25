"use client";
import TextReveal from "@/components/TextReveal";
import { useRef } from "react";
import projects from "@/data/project";
import InfiniteCarousel from "@/components/InfiniteCarousal";


export default function Home(){

 
  return(

    <main className="h-[300vh] bg-black w-full">
      <InfiniteCarousel projects={projects} />
    </main>
  )


}
