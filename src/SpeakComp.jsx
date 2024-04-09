import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

import { openApi } from "./openAi_func";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function SpeakComp() {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const [question, setQuestion] = useState([]);
  const [response,setResponse]=useState({
    err:false,
    info:""
  })
  const [show,setShow]=useState(true)

  const startListen = () => {
    setResponse({err:false,info:""})
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListen = () => {
    SpeechRecognition.abortListening();
    fetchAndSetResponse(transcript);
    resetTranscript();
  };

  const fetchAndSetResponse = async (transcript) => {
    setResponse({...response,info:"Generating..."})
    setShow(false)
    try {
      const originalTranscript=transcript.split("use")
      const response = await openApi(transcript.includes("use")?originalTranscript[0]:transcript);
      setResponse({...response,info:""})
      setShow(true)
      setQuestion([...question, { que: transcript.includes("use")?originalTranscript[0]:transcript, reply: response }]);
      console.log(response);
    } catch (error) {
      setShow(true)
      setResponse({err:true,info:error.message.includes("Rate limit reached")?"!!Rate limit reached for requests per minute.Try after some time!!":"!!Server is facing some issues.Try after few minutes.!!"})
      console.error("Error fetching response:", error.message);
    }
  };

    if(transcript.includes("use"))stopListen()


  return (
    <>
      <div className=" w-full   mt-[30px] flex justify-center flex-col items-center">
        <div
          className=" bg-gray-500  w-full md:[80%] max-w-[600px] p-5 rounded-lg  h-[200px]"
        >{transcript}</div>
       

       {show &&    <div className="my-6 flex gap-14 justify-center">
         <button
            className=" px-7 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
            onClick={startListen}
          >
            Start
          </button>
        </div>}
          <p className={`font-semibold text-lg ${response.err && " text-red-600"}`}>hello goor ons noe found iy</p>
        {/* {question.map((item, index) => (
          <div
            key={index}
            className="flex-col gap-y-9 bg-gray-500 my-3 px-3 py-1 rounded-md w-[97%] max-w-[700px]"
          >
            <p> {item.que}</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reply:{item.reply}</p>
          </div>
        ))} */}
        <div
            className="flex-col gap-y-9 bg-gray-500 my-3 px-3 py-1 rounded-md w-[97%] max-w-[700px]"
          >
            <p> hello how are you </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reply: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, laboriosam? Fuga iste veritatis mollitia quisquam, ratione voluptate corrupti accusantium maiores?</p>
          </div>
      </div>
    </>
  );
}

export default SpeakComp;
