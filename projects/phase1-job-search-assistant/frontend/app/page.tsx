'use client'

import { useState } from "react";

export default function Home() {

  const [text, setText] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([])

 async function sendChat(){
  if(!text) return;
  setText("")
  setMessages(prev=>[...prev,text,""])
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const res = await fetch(`${apiUrl}/chat`,{
    method : "POST",
    headers : {"Content-type" : "application/json"},
    body : JSON.stringify({message : text})
  });
  //const data = await res.json();
  const reader = res.body?.getReader();
  const decoder = new TextDecoder;

  while(true){
    const {done , value } = await reader?.read();
    if(done) break;
    const chunk = decoder.decode(value);
  
    setMessages(prev => {
      const updated = [...prev]
      updated[updated.length - 1] += chunk
      return updated
    })
  }

 }

 function handlePrompts(str : string){
 // if (!str) return;

  setText(str);
 }


  return (
    <div className="flex flex-col min-h-screen w-full items-center">

      {/* response area — page itself scrolls, no inner scroll box */}
      <div className="w-[80%] flex flex-col gap-3 p-5 pb-28">
        {messages.map((message, ind) => {
          const isUser = ind % 2 === 0
          return (
            <div key={ind} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-base whitespace-pre-wrap ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-900 rounded-bl-sm"
                }`}
              >
                {message}
              </div>
            </div>
          )
        })}
      </div>

      {/* input bar fixed to bottom of viewport while page scrolls behind it */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 flex justify-center">
        <div className="flex gap-3 w-[70%] items-end">
          <textarea
            name="chat"
            id="chat"
            placeholder="Enter your query..."
            value = {text}
            onChange={(e) => { handlePrompts(e.target.value) }}
            className="flex-1 h-14 px-4 py-3 text-base rounded-lg border border-gray-300 resize-none leading-snug focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendChat}
            className="px-6 py-3 text-base bg-blue-600 text-white rounded-lg cursor-pointer whitespace-nowrap hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
