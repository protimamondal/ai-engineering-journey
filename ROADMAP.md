# Primary Roadmap — AI Application Engineer Track

> A fixed six-month curriculum, written up front and followed phase by phase.
> It is deliberately not edited to match what actually happened — where reality
> diverged, that is recorded in the build log instead.

The spine: Python + LLM basics → frontend AI patterns → real backend → RAG →
agents + deployment → evals + polish. The end state is being able to ship an AI
feature end to end, specialised in product-facing AI UX and RAG.

---

## Phase 1 — Foundations (Month 1)

**Python and TypeScript fluency for AI.** Python idioms, type hints, async/await, Pydantic models, virtual envs. TypeScript was already strong going in; the gap was Python and the
AI SDK ergonomics.

**Core LLM concepts.** Tokens, context windows, embeddings, temperature, structured output, function/tool calling, streaming. Hands-on with both Anthropic and OpenAI SDKs in both Python and TypeScript.

**Reading.** Anthropic "Building Effective Agents". OpenAI "A Practical Guide to Building Agents". Skim the MCP spec.

**Project.** A streaming chat app with tool calling — frontend + simple Python backend, one model, one tool (web search or calculator). Deployed.

**Exit:** see `PHASE.md` Phase 1 gate.

---

## Phase 2 — Frontend AI Patterns (Month 2)

**Vercel AI SDK end-to-end.** Streaming, `useChat`, `useCompletion`, tool calls rendered as UI, generative UI, server actions, edge runtime tradeoffs.

**Frontend craft for AI features.** Streaming markdown rendering, optimistic UI for tool calls, partial-failure handling, citation UX, copy/regenerate/edit affordances, message branching.

**MCP from the client side.** Consume an MCP server from a Next.js app.

**Project.** A polished AI feature embedded in a real product (writing assistant / support widget / data-explorer copilot). The UX is the differentiator, not the model.

---

## Phase 3 — FastAPI Backend (Month 3)

**FastAPI properly.** Async endpoints, Pydantic models, dependency injection, JWT auth, background tasks, streaming responses (SSE), structured logging, basic rate limiting.

**Persistence.** Postgres via SQLAlchemy or SQLModel. Redis for caching and simple queuing. Alembic migrations.

**Observability.** Langfuse from day one — every LLM call traced, every tool call logged.

**Project.** Replace the Phase 1 toy backend with a real FastAPI service the Phase 2 frontend talks to: streaming chat endpoint, tool-calling endpoint, one external-service integration.

---

## Phase 4 — RAG End-to-End (Month 4)

**The full pipeline.** Document ingestion, chunking (recursive, semantic, structural), embedding model choice and cost, pgvector storage, hybrid search (vector + full-text), reranking with a cross-encoder, metadata filtering, citation grounding, query rewriting.

**Evals — retrieval separately from answer.** Hit rate, MRR, faithfulness, answer relevance.

**Memory layer.** Mem0 drop-in. The app remembers users across sessions: preferences, prior questions, prior documents.

**Project.** A document Q&A app on real docs, deployed, with eval numbers in the README.

---

## Phase 5 — Agents and Deployment (Month 5)

**Agent SDK.** Claude Agent SDK or OpenAI Agents SDK (application-engineer mode, less ops overhead than raw LangGraph). Multi-step tool use, retries, human-in-the-loop checkpoints.

**Build one MCP server.** Expose something useful (the Phase 3 Postgres DB, or a custom domain tool).

**Containerization.** Multi-stage Dockerfiles for frontend and FastAPI. docker-compose for local dev. `.dockerignore` done right. Secrets via env vars.

**Deployment.** Deploy the whole stack to a **managed** Kubernetes cluster (GKE Autopilot / DO Kubernetes). Basic manifests: deployment, service, ingress, configmap, secret. TLS, health checks, resource limits, rolling deployments. **Stop there** — no operators / service mesh / GitOps rabbit holes.

**Project.** Upgrade the Phase 4 RAG app into an agent that searches docs, drafts responses, takes actions via the MCP server, and asks for human approval on writes.

---

## Phase 6 — Evals and Product Polish (Month 6)

**Eval harness.** Golden dataset construction, LLM-as-judge graders, regression testing in CI, A/B prompt comparison, cost and latency dashboards. Langfuse or LangSmith.

**Production hardening.** Prompt versioning, fallback chains (model A fails → model B), token budget caps, PII redaction, basic guardrails.

**Portfolio polish.** README architecture diagrams, published eval results, design-decision write-ups, Loom walkthroughs.

**Output.** Three deployed projects, public on GitHub, each with eval numbers and a one-page case study. The interview portfolio.

---

## After Phase 6

The programme ends here: a **senior AI application engineer** who owns the full
stack end to end, specialised in product-facing AI UX and RAG.

## The flagship project

The phases are not six unrelated exercises. They build **one product** — a
job-search assistant — which each phase takes further: a chat app in Phase 1, a
real product with two AI surfaces in Phase 2, a FastAPI service behind it in
Phase 3, RAG in Phase 4, an agent in Phase 5.
