import React, { useState } from "react";
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
  // const [reply, setReply] = useState([]);

  const startListen = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListen = () => {
    SpeechRecognition.abortListening();
    fetchAndSetResponse(transcript)
    resetTranscript();
    // console.log(import.meta.env.VITE_SECRET_KEY)
  };

  const fetchAndSetResponse = async (transcript) => {
    try {
      const response =await openApi(transcript);
      setQuestion( [
        ...question,
        { que: transcript, reply: response}
      ]);
      console.log(response)
      // stopListen();
    } catch (error) {
      console.error("Error fetching response:", error);
    } 
  };

  if (transcript.includes("use")) {
    stopListen()
  }

  return (
    <>
      <div className="w-full bg-red mt-[30px] flex flex-col items-center">
        <div className=" bg-red-300  w-full rounded-lg max-w-[800px] h-[200px]">
          {transcript}
        </div>

        <div className="my-4 flex gap-14 justify-center">
          <button
            className="m-3 px-7 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
            onClick={startListen}
          >
            Start
          </button>
          <button
            className="m-3 px-7 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
            onClick={stopListen}
          >
            Stop
          </button>
        </div>
        {question.map((item, index) => (
<div key={index}  className="flex-col gap-y-9 bg-gray-500 my-3 px-3 py-1 rounded-md w-[97%] max-w-[700px]">
  <p> {item.que}</p>
  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reply:{item.reply}</p>
</div>
        ))}
      </div>
    </>
  );
}

export default SpeakComp;
