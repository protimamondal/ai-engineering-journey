# AI Engineering Journey

A six-month, self-directed programme to move from senior frontend engineering
into AI engineering. The curriculum was written up front in
[`ROADMAP.md`](ROADMAP.md) and is followed phase by phase, each phase ending in
something deployed rather than something read.

This repository is the record: the plan, the decisions, and the code from each
phase. The finished Phase 2 product lives in its own repository.

**Background:** ~13 years in frontend engineering (JavaScript, TypeScript,
React, Redux), with C++ earlier in my career. Worked through alongside a study
partner, which is why some early commits carry a second author.

## Where the work is

| | What it is | Status |
|---|---|---|
| **[job-pipeline](https://github.com/protimamondal/job-pipeline)** | **Phase 2 flagship.** Job-application product with two AI surfaces: an MCP-backed copilot and a streaming cover-letter assistant. Next.js 16, Vercel AI SDK 7, Python MCP 2.0 server. | Built; deploying |
| [`projects/phase1-job-search-assistant`](projects/phase1-job-search-assistant) | **Phase 1 project.** Streaming chat app with tool calling — Next.js frontend, FastAPI backend, Dockerised, deployed to Vercel + Render. | Deployed |
| [`projects/aisdk-ground-up`](projects/aisdk-ground-up) | Vercel AI SDK learned from scratch — streaming, `useChat`, tool calls rendered as UI, generative UI, MCP client. | Reference |
| [`projects/ts-sdk-practice`](projects/ts-sdk-practice) | Anthropic and OpenAI SDKs in TypeScript, side by side. | Reference |
| [`projects/aisdk-lab`](projects/aisdk-lab) | First pass at tool-call UI as generative UI. | Reference |
| [`notes/`](notes) | Working notes written while building each topic. | Working notes |

## Progress

| Phase | Focus | State |
|---|---|---|
| 1 | Foundations — Python, LLM basics, first streaming app | **Complete**, deployed and verified live |
| 2 | Frontend AI patterns — Vercel AI SDK, AI UX, client-side MCP | **Built**, deployment in progress |
| 3 | FastAPI backend — real service, Postgres, observability | Next |
| 4 | RAG end to end — ingestion, hybrid search, reranking, evals | Planned |
| 5 | Agents and deployment — Agent SDK, Docker, managed Kubernetes | Planned |
| 6 | Evals and product polish | Planned |

## How this is structured

Three rules the programme holds itself to, which are the reason it has produced
deployed work rather than tutorials:

1. **Every phase ends in something deployed.** Not a notebook, not a local demo.
   A public URL that other people can open.
2. **The projects compound.** Each phase extends the same product rather than
   starting a new toy. The Phase 1 chat app became the Phase 2 product; Phase 3
   puts a real backend behind it.
3. **Decisions get written down with their reasoning**, in
   [`DECISIONS.md`](DECISIONS.md), so they are not silently relitigated later.
   Deferred work is recorded as deferred, not quietly dropped.

## Notes on the notes

`notes/` are working notes written during the build, for my own reference. They
are kept because they are an honest record of how each topic was actually
worked through, not because they are polished writing.
