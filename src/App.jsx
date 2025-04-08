import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

function App() {
  const api_Key = import.meta.env.VITE_GEMINI_API_KEY;
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleInput = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: api_Key });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: input,
      });

      setChat([
        ...chat,
        {
          userText: input,
          aiText: response.text,
        },
      ]);
    } catch (err) {
      console.log(err);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-5">
      <h1 className="text-4xl font-bold text-blue-400 mb-5">CherryAI</h1>
      <div className="w-full max-w-2xl bg-gray-950 rounded-lg shadow-xl p-5 flex flex-col">
        <div 
          ref={chatContainerRef} 
          className="flex-grow overflow-y-auto max-h-[70vh] p-2"
        >
          {chat.map((val, i) => (
            <div key={i} className="mb-4 p-4 border border-gray-600 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-400">{val.userText}</h2>
              <p className="text-lg text-blue-400 mt-2">{val.aiText}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-2xl flex flex-col items-center mt-5">
        <input
          type="text"
          placeholder="Ask me Anything"
          className="w-full p-3 text-lg border border-gray-500 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex space-x-3 mt-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg"
            onClick={handleInput}
          >
            Send
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow-lg"
            onClick={() => setChat([])}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;