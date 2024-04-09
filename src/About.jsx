import React, { useState } from "react";
import { useSelector } from "react-redux";

function About() {
  const mode = useSelector((state) => state.darkMode.dark_mode);
  const [word, setWord] = useState("");
  const [change,setChange]=useState(false)
  const [err,setErr]=useState("")
  const changeWord=()=>{
    if (word.trim().length >= 3) {
      setChange(true)
      localStorage.setItem("Execution_key",word)
      setChange(false)
  }
  else{
    setErr(" !!  Execution keyword length can not be less than 3 !!")
  }
  }
  return (
    <div
      className={`w-[94%]  my-5  lg:my-4 flex flex-col text-xl items-center ${
        mode ? "text-white" : "text-black"
      } `}
    >
    {!change &&  (<><h2 className="text-[10vw] md:text-5xl mb-7 text-left">
        About
        <span className=" text-[20vw] md:text-8xl font-serif text-blue-600">
          {" "}
          e
        </span>
        cho
      </h2>
      <div className="w-[96%] flex flex-col items-start justify-start text-left font-medium my-3">
        <p>Echo is an AI voice assistant.</p>
        <p>
          It is based on pre-trained low level model based on OpenAI GPT-3.5
          turbo.{" "}
        </p>
        <p>
          Functionality includes context-based suggestions, and automated code
          generation capability.
        </p>
      </div>
      <h3 className="text-2xl md:text-4xl my-3 underline underline-offset-8">
        How to use
      </h3>
      <div className="w-[96%] flex flex-col items-start  font-medium">
        <p>• At first You need to click on start.</p>
        <p>
          • Then say what you want to ask or generate with the help of echo.{" "}
        </p>
        <p>
          • To execute that thing just say{" "}
          <span className="font-bold text-[#2563EB]">' {localStorage.getItem('Execution_key')} '</span>, and it
          will get executed. 
        </p>
        <p className="text-base mt-7 mb-5">
          <span className="text-base font-bold text-[#2563EB]">[NOTE] </span>It
          has a very less capacity to generate requests per minute.
        </p>
      </div>
      <button onClick={()=>setChange(true)} type="button" className="  px-6 py-2 text-base  rounded-md bg-blue-600 hover:bg-blue-700">
         Change Keyword
        </button>
      </> )}
     {change && <div className="w-[95%] flex flex-col items-center my-10 lg:my-20 gap-y-5 px-2">
        <p className="my-7 ">Change the execution keyword. Default one is Friday.</p>
        <input
          className={`w-full max-w-[400px] text-base ${mode?"bg-[#253441]":"bg-slate-300"} px-4 py-2 rounded-md`}
          onChange={(e) => setWord(e.target.value)}
          value={word}
          type="text"
          name=""
        />
        <p className="text-red-600 text-base font-semibold w-[80%]"> !!  Execution keyword length can not be less than 3 !! <span>Try some uncommon keywords which don't have a same pronounciation ( like hello, good, google etc ).</span></p>
        <div className="flex gap-x-8 mb-7 mt-4">  
        
        <button onClick={()=>setChange(false)} type="button" className="  px-6 py-2 text-base  rounded-md bg-blue-600 hover:bg-blue-700">
         Cancel
        </button>
        <button onClick={changeWord} type="button" className="  px-6 py-2 text-base  rounded-md bg-blue-600 hover:bg-blue-700">
         Change
        </button> 
        </div>
       
      </div>}
    </div>
  );
}

export default About;
