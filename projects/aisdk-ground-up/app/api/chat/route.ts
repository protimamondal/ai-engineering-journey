import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream ,
    type UIMessage , stepCountIs
} from "ai";
import { createMCPClient } from "@ai-sdk/mcp";

//import { tools } from "@/app/lib/ai/tools";

export async function POST(req:Request) {
    const {messages} : {messages : UIMessage[]}= await req.json();

    const mcpClient = await createMCPClient({
        transport : {
            type : "http",
            url : "http://127.0.0.1:8001/mcp",
        }
    })

    const tools = await mcpClient.tools();
    const result = streamText({
        model : openai('gpt-4o-mini'),
        messages : await convertToModelMessages(messages),
        tools,
        stopWhen: stepCountIs(5),
        onFinish : async () =>{
            await mcpClient.close()
        },
        onError : async () =>{
            await mcpClient.close()
        }
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