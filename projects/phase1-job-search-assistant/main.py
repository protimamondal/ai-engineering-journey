from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()  # reads OPENAI_API_KEY from env

# messages = [
#     {"role": "user", "content" : "my name is protima"} 
# ]

# response = client.chat.completions.create(
#     model="gpt-4o-mini",
#     max_tokens=256,
#     messages=messages
# )

# reply = response.choices[0].message.content

# #print(reply)

# messages.append({"role": "assistant", "content": reply})

# messages.append({"role": "user", "content": "what is my name"})

# messages2 = client.chat.completions.create(
#                 model="gpt-4o-mini",
#                 max_tokens=256,
#                 messages=messages
#             )

# print(messages2.choices[0].message.content)


# response = client.chat.completions.create(
#       model="gpt-4o-mini",
#     max_tokens=64,
#     temperature=2.0,   # try 0.0, then 1.5
#     messages=[{"role": "user", "content": "Give me a one-line tagline for a job search assistant."}]
# )

# reply = response.choices[0].message.content

# print(reply)

name : str = "protima"
age : int = 32
score : float = 9.5
active : bool = True
Person : str 

tag : list[str] = ["python","ai"]
config : dict[str,str]={"model":"gpt-4o-mini"}

middle_name : str | None = None

def greet(name: str,formal: bool =False) -> str:
    return f"Hello {name}"

print(greet("protima"))