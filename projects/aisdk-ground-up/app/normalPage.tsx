// this file is for normal 
// tool usage when tool is defined in next js itself
"use client"

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import React, { useState } from "react";
import { chatMessage } from "./lib/ai/types";

export default function Home(){
 const [input, setInput] = useState("");
 const {
  messages,
  sendMessage,
  status,
  error,
  stop
 } = useChat<chatMessage>({
  transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
 })

 console.log(messages)

 function handleSubmit(e: React.FormEvent){
  e.preventDefault();
  if(!input.trim()) return;

  sendMessage({
    text: input,
  })

  setInput("")
 }

 return(
  <div className="min-h-screen pb-40 pt-8">
    {messages.length > 0 && messages.map(message=>(
      <div key={message.id} className="mx-auto w-full max-w-2xl px-4 py-3">
        <strong>{message.role}</strong>
        {message.parts.map((part,index)=>{
          if(part.type === "text"){
            return <p key={index}>{part.text}</p>
          }
          if(part.type==="tool-searchJob"){
             switch(part.state){
              case "input-streaming":
                return(
                  <div key={part.toolCallId}> preparing... </div>
                )
              case "input-available" : {
                return(
                  <div key={part.toolCallId}> searching for {part.input.title} in {part.input.location}</div>
                )
              }

              case "output-available" : {
                return(
                  <div key={part.toolCallId}>
                    {part.output.map((outpt,ind)=>(
                      <div key={ind}
                      className="border border-gray-600 rounded-xl p-2 mb-2"
                      >{outpt.company} job for {outpt.title} in {outpt.location} {outpt.salary_usd ? `for salary of $${outpt.salary_usd}` : "salary not mentioned" }</div>
                    ))}
                  </div>
                )
              }
              case "output-error" : {
                return(
                  <div key={part.toolCallId} className="text-red-500">{part.errorText}</div>
                )
              }
             }
          }
        })}
     
      </div>
    ))}
   {status==="submitted" && <div className="mx-auto w-full max-w-2xl px-4 py-3 text-sm text-gray-500">Thinking...</div>}
   {error && <div className="mx-auto w-full max-w-2xl px-4 py-3  text-red-700">Some problem occured</div>}
    <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 flex justify-center gap-2 bg-background p-4">
      <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} className="w-full max-w-xl rounded-full border border-black/15 px-5 py-3 outline-none focus:border-black/40 dark:border-white/20 dark:focus:border-white/40" />


    {status === "submitted" || status === "streaming" ? (
      <button type="button" onClick={stop} className="rounded-full border border-black/15 px-6 py-3 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">stop</button>
    ) : (
      <button type="submit" className="rounded-full bg-foreground px-6 py-3 text-background hover:opacity-80">send</button>
    )}
     </form>
  </div>
 )

}