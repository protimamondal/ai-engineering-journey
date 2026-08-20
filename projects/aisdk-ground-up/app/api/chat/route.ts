import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream ,
    type UIMessage , stepCountIs
} from "ai";

import { tools } from "@/app/lib/ai/tools";

export async function POST(req:Request) {
    const {messages} : {messages : UIMessage[]}= await req.json();

    const result = streamText({
        model : openai('gpt-4o-mini'),
        messages : await convertToModelMessages(messages),
        tools,
        stopWhen: stepCountIs(5)
    });

    //return result.toTextStreamResponse()

/*     return createTextStreamResponse({
        stream: toTextStream({
            stream : result.stream,
        })
    }); */

    return createUIMessageStreamResponse({
        stream : toUIMessageStream({
            stream : result.stream
        })
    })
}  