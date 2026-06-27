"use client";
import TextReveal from "@/components/TextReveal";
import { useRef } from "react";
import {projects} from "@/data/projects";
import InfiniteCarousel from "@/components/InfiniteCarousal";


export default function Home(){

 
  return(

    <main className="h-screen flex items-start w-full ">
      <InfiniteCarousel projects={projects} />
    </main>
  )


}
