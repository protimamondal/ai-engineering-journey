from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()

messages = [
    {"role" : "user","content" : "I'm a senior backend engineer with 10 years experience. Find me jobs in Berlin and tell me what I should be earning."}
]

response = client.messages.create(
    model= "claude-opus-5",
    system="consider yourself as sort and direct job assitant",
    max_tokens=  16000,
    messages= messages
)

for block in response.content :
    print(block.type)
    if block.type == "text" :
        print(block.text)

#print(response.content)

