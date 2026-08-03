'use client'

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function Home(){

  const {messages, sendMessage} = useChat();
  const [input, setInput] = useState("");

  return(
    <div className="flex flex-col h-screen">

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">
        {messages.map(message=>(
          <div key={message.id}>
            <strong>{message.role}</strong>
            {message.parts.map((part,i)=>{
               console.log(part);
              if(part.type === "text"){
              return   <span key={i}>{part.text}</span> 
              }

              if(part.type==="tool-searchJob"){
                switch(part.state) {
                  case "input-streaming" :
                  case "input-available" :{
                    const input = part.input as {title? : string, location ? : string };
                    return(
                      <div key={part.toolCallId}>
                        searching {input?.title ?? "..."} in {input?.location ?? "..."}

                      </div>
                    )
                }
                  case "output-available" : {
                    const jobs = part.output as {
                        company: string;
                        title: string;
                        location: string;
                        salary_usd: number | null;
                        url: string | null;
                    }[]
                    return(
                      <div key={part.toolCallId}>
                        {jobs.map(job=>(
                           <div key={job.company} className="border rounded p-2 my-1">
                    <strong>{job.title}</strong> — {job.company}, {job.location}
                    <div>
                      {job.salary_usd !== null
                        ? `$${job.salary_usd.toLocaleString()}`
                        : "Salary not listed"}
                    </div>
                  </div>
                        ))

                        }

                      </div>
                    )
                  }
              }
              }
              return null;
            })}
          </div>
        ))

        }
        </div>
      </div>

      <div className="border-t">
        <form onSubmit={(e)=>{
          e.preventDefault();
          sendMessage({text : input});
          setInput("");
        }}
        className="max-w-2xl mx-auto px-4 py-4 flex gap-2"
        >

          <input type="text"
          value={input}
          placeholder="Say something..."
          onChange={(e)=>{
            setInput(e.target.value)
          }}
          className="flex-1 border rounded px-3 py-2"
          />
          <button type="submit" className="border rounded px-4 py-2">Send</button>

        </form>
      </div>
    </div>
  )
}