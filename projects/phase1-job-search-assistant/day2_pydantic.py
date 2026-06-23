from openai import OpenAI
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()

client = OpenAI()

class JobListing(BaseModel):
    title: str
    company: str
    remote: bool
    salary_range: str | None

response = client.chat.completions.create(
    model="gpt-4o-mini",
    max_tokens = 256,
    messages = [{
        "role": "user",
        "content": """Return a fake job listing as JSON with these fields:
        title, company, location, remote (true/false), salary_range (int).
        Return only the JSON, nothing else."""
    }]
)

raw = response.choices[0].message.content
print(repr(raw))


import json
#data = json.loads(response.choices[0].message.content)

raw = response.choices[0].message.content
raw = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
data = json.loads(raw)

job = JobListing(**data)
print(job.title)
print(job.company)
print(job.remote)

