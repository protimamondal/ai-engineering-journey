from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import AsyncOpenAI
from tools import tools, search_job, estimate_salary
import json

load_dotenv()

app = FastAPI()

# Same CORS you had — lets the Next.js dev server (localhost:3000) call this.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# AsyncOpenAI (not OpenAI) so we can `await` calls inside an async route.
client = AsyncOpenAI()

available_func = {
    "search_job": search_job,
    "estimate_salary": estimate_salary,
}


# Pydantic model = the request body's shape. FastAPI validates it for you,
# the way you'd validate a form on the frontend before submit.
class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
async def chat(req: ChatRequest):
    messages = [{"role": "user", "content": req.message}]

    # Call #1 — give the model the tools; it may ask us to run one.
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        max_tokens=256,
        tools=tools,
        messages=messages,
    )

    tool_calls = response.choices[0].message.tool_calls
    if tool_calls is not None:
        messages.append(response.choices[0].message)
        for tc in tool_calls:
            func = available_func[tc.function.name]
            args = json.loads(tc.function.arguments)
            result = func(**args)
            messages.append({
                "role": "tool",
                "tool_call_id": tc.id,
                "content": result,
            })

    # Call #2 — stream the final answer back token by token.
    stream = await client.chat.completions.create(
        model="gpt-4o-mini",
        max_tokens=256,
        stream=True,
        messages=messages,
    )

    async def generate():
        async for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield delta

    return StreamingResponse(generate(), media_type="text/plain")


if __name__ == "__main__":
    # Convenience so `python main.py` still works. For dev, prefer:
    #   uv run uvicorn main:app --reload --port 8000
    import uvicorn
    uvicorn.run(app, port=8000)
