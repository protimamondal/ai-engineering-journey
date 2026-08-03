import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages, createUIMessageStreamResponse, toUIMessageStream, tool, stepCountIs } from "ai";
import { z } from "zod";

const searchJob = tool({
    description : "search for job openings by title and location",
    inputSchema : z.object({
        title : z.string().describe("the job title to search for"),
        location : z.string().describe("the city to look in"),
    }),
    execute : async ({title, location})=>{
        return [
            { company: "Acme Corp", title, location, salary_usd: 120000, url: null },
            { company: "Globex", title, location, salary_usd: null, url: null },
        ]
    }
})

export async function POST(req : Request){
    const {messages} : {messages : UIMessage[]} = await req.json();

    const result = streamText({
        model : openai("gpt-4o-mini"),
        messages : await convertToModelMessages(messages),
        tools : {searchJob},
        stopWhen : stepCountIs(5)
    })

    return createUIMessageStreamResponse({
        stream : toUIMessageStream({ stream : result.stream})
    })
    
}