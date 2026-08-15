import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [
    // On OpenAI the system prompt is an item in this list, with role "system".
    // On Anthropic it was a separate `system:` argument. You knew this from
    // step 1 — nothing new, just the same difference in a new language.
    { role: "system", content: "You are a concise job-search assistant." },
    { role: "user", content: "Name three skills a backend engineer should learn for AI work." },
  ],
});

// No loop, no block types. One string... except it is not quite a string.
// Hover over `.content` in the editor and read the type it shows you.
console.log(response.choices[0].message.content);
