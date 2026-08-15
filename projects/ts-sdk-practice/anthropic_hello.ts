// An import with no name after it. It does not give you anything to use —
// it just runs that file, and running it is what loads your .env into the
// environment. In Python you did this by calling load_dotenv() yourself.
import "dotenv/config";

// A normal import. `Anthropic` is the name we pick for what the package
// hands back; "@anthropic-ai/sdk" is the package name, as a string.
import Anthropic from "@anthropic-ai/sdk";

// Same as Python: no key passed in. It reads ANTHROPIC_API_KEY from the
// environment, which the line above put there.
const client = new Anthropic();

// `await` is the one new idea in this file. See stage 2 in the note.
const response = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 16000,
  system: "You are a concise job-search assistant.",
  messages: [
    { role: "user", content: "Name three skills a backend engineer should learn for AI work." },
  ],
});

console.log("stop_reason:", response.stop_reason);

// Ignore the `if` for now — stage 3 is entirely about why the compiler
// forces it. For this stage it is just a line that has to be here.
for (const block of response.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}
