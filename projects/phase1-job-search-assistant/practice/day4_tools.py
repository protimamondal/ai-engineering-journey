from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()
client = OpenAI()

tools = [
    {
        "type": "function",
        "function": {
            "name": "search_job",
            "description": "Search for job listings matching a title and location.",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string", "description": "Job title to search for"},
                    "location": {"type": "string", "description": "City or 'remote'"},
                },
                "required": ["title", "location"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "estimate_salary",
            "description": "Estimate salary range for a role and years of experience.",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "years_exp": {"type": "integer"},
                },
                "required": ["title", "years_exp"],
            },
        },
    },
]

def search_job(title : str, location: str)->str:
 return f"Found 3 jobs for {title} in {location}"

def estimate_salary(title :str, years_exp:int) -> str:
 base = 100000 + years_exp * 5000
 return f"estimated salary for {title} with {years_exp} yrs :  ${base} - ${base + 20000}"

available_funcs = {
  "search_job" : search_job,
  "estimate_salary" : estimate_salary,
 }

messages = [
 {
    "role": "user",
    "content": "I'm a senior backend engineer with 10 years experience. Find me jobs in Berlin and tell me what I should be earning.",
 }
]

response = client.chat.completions.create(
 model = "gpt-4o-mini",
 max_tokens=256,
 tools= tools,
 messages= messages
)

if response.choices[0].message.tool_calls is not None :
 messages.append(response.choices[0].message)

 for tc in response.choices[0].message.tool_calls :
  func = available_funcs[tc.function.name]
  args = json.loads(tc.function.arguments)
  result = func(**args)

  messages.append({
   "role" : "tool",
   "tool_call_id" : tc.id,
   "content" : result
  }  
  )

 final = client.chat.completions.create(
   model = "gpt-4o-mini",
   max_tokens= 256,
   messages = messages
  )
 print(final.choices[0].message.content)

else :
 print(response.choices[0].message.content)
 

#reply =  response.choices[0].message.content

#print(reply)