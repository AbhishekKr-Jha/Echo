
import React, { useEffect } from "react"
import Navbar from "./Navbar"
import SpeakComp from "./SpeakComp"
import {useSelector} from 'react-redux'
import { Route, Routes } from "react-router-dom";
import About from "./About";
function App() {
  
  useEffect(()=>{
  localStorage.getItem('Execution_key')?"":localStorage.setItem('Execution_key','Friday')
  },[])


  const mode = useSelector((state) => state.darkMode.dark_mode);
  return (
   <>
   
   <div id="main" className={`w-screen min-h-screen ${mode?"bg-[#2E4252]":"bg-white"}  px-3  max-w-[2000px] flex flex-col items-center`}>
<Navbar/>
{/* <SpeakComp/> */}
<Routes>
          <Route path="/" element={<SpeakComp />} />
          <Route path="about" element={<About/>} />
</Routes>
  </div>
   </>
  )
}
export default App
