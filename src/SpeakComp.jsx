import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

import {useSelector} from 'react-redux'

import { openApi } from "./openAi_func";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function SpeakComp() {
  const mode = useSelector((state) => state.darkMode.dark_mode);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const [question, setQuestion] = useState([]);
  const [response, setResponse] = useState({
    err: false,
    info: "",
  });
  const [show, setShow] = useState(true);

  const startListen = () => {
    setResponse({ err: false, info: "" });
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    if(!localStorage.getItem("Execution_key") || localStorage.getItem("Execution_key")?.length>=3){
      localStorage.setItem('Execution_key','Friday')
    }
  };

  const stopListen = () => {
    SpeechRecognition.abortListening();
    fetchAndSetResponse(transcript);
    resetTranscript();
  };

  const fetchAndSetResponse = async (transcript) => {
    setResponse({ ...response, info: "Generating..." });
    setShow(false);
    try {
      const originalTranscript = transcript.split(localStorage.getItem("Execution_key") );
      const response = await openApi(
        transcript.includes(localStorage.getItem("Execution_key") ) ? originalTranscript[0] : transcript
      );
      setResponse({ ...response, info: "" });
      setShow(true);
      setQuestion([
        ...question,
        {
          que: transcript.includes(localStorage.getItem("Execution_key") ) ? originalTranscript[0] : transcript,
          reply: response,
        },
      ]);
      console.log(response);
    } catch (error) {
      setShow(true);
      setResponse({
        err: true,
        info: error.message.includes("Rate limit reached")
          ? "!! Rate limit reached for requests per minute.Try after some time !!"
          : "!! Server is facing some issues.Try after few minutes. !!",
      });
      console.error("Error fetching response:", error.message);
    }
  };

  if (transcript.includes(localStorage.getItem("Execution_key") )) stopListen();
  // else if(transcript.includes("112")){SpeechRecognition.abortListening();}

  return (
    <>
      <div className={` w-full mt-[60px]   flex flex-col xl:flex-row xl:items-start  xl:justify-center justify-start items-center ${mode?"text-white":"text-black"}`}>
   
       <div className="w-[97%]  xl:w-[50%] max-w-[700px] px-1 flex flex-col  justify-start">

       <div className=" w-[99%] flex flex-col  justify-start items-center  ">

          <div className={` flex flex-col ${mode?"bg-[#253441]":"bg-gray-300"} text-base  w-full md:w-[88%] max-w-[600px] p-5 rounded-lg  h-[170px] `}>
            <div  className="text-sm mb-2 font-bold">Your Execution Key is {localStorage.getItem('Execution_key')}</div>
            <div>{transcript}</div>
          </div>

          {show && (
            <div className="my-6 flex gap-14 justify-center font-semibold">
               {/* <button
               title="If you want to turn off your mic .Then Click!"
               className=" px-7 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
                onClick={()=>SpeechRecognition.abortListening()}
              >
              Stop Mic
              </button> */}
              <button
                className=" px-7 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
                onClick={startListen}
              >
                Start
              </button>
             
            </div>
          )}
          <p
            className={` my-2 font-semibold text-center text-lg ${
              response.err && " text-red-600"
            }`}
          >
            {response.info}
          </p>

          </div>

       </div>



          <div className="w-[98%] min-h-[100px]  xl:h-[440px]   xl:w-[40%] xl:pl-6 xl:border-gray-600  xl:border-l-[1px] flex flex-col items-center justify-center  ">
           <div id="responseContainer" className="w-[99%] h-full xl:overflow-y-scroll   ">
           { question.length>0 ? (question.map((item, index) => (
              <div
                key={index}
                className={`${mode?"bg-[#253441]":"bg-slate-200"} p-2 text-base flex-col  gap-y-9    my-3 px-4 py-2 rounded-md w-[97%] max-w-[500px]`}
              >
                <p className=" ">
                  <span className="font-semibold">You&nbsp;</span> {item.que}{" "}
                </p>
                <p className=" ">
                  <span className="font-bold">-</span> {item.reply}
                </p>
              </div>
            ))):<div className="text-xl font-semibold text-center my-8">
              <span>Nothing to show.</span>&nbsp;<br/>              <span>To use Echo read how to use it in its about section.</span>
              </div>}
           </div>
       
        </div>
      </div>
      {/* [#2E4252] */}
      {/* text-white bg-black border-white border-2 */}
    </>
  );
}

export default SpeakComp;
