# Decisions

Architecture and scope decisions, with the reasoning, recorded when they were
made. The point is that they do not get quietly relitigated three phases later,
and that deferred work stays visible as deferred rather than disappearing.

---

### 2026-06-15 — The flagship is a job-search assistant

One product carried across all six phases rather than six unrelated exercises.

Chosen because I am the target user, so product decisions are fast and do not
need research; because it has a genuinely rich tool-calling surface; because a
resume corpus plus job descriptions plus application history is a natural
retrieval layer for Phase 4; and because the multi-step loop — search, match,
draft, approve, send — is a real agent problem rather than a contrived one.

---

### 2026-06-30 — Lock the `search_jobs` tool contract early

```python
def search_jobs(title: str, location: str) -> list[JobListing]: ...

class JobListing(BaseModel):
    company: str
    title: str
    location: str
    salary_usd: int | None   # annual salary in USD; None if undisclosed
    url: str | None          # link to the posting; None for stub data
```

Fake data was fine at this stage. The **shape** was the thing being fixed, so
that the Phase 3 backend integration would not become a rewrite. Nullable
fields were in the contract from the start, and one sample job deliberately has
no salary so the null branch is actually exercised rather than assumed.

---

### 2026-07-05 — Phase 1 backend: Flask → FastAPI

Flask had crept into the build in an unlogged session. Rewritten to FastAPI —
about twenty lines — for three reasons: it is async-native, so `async`/`await`
arrives in its natural minimal dose instead of being bolted on as a topic later;
it is Pydantic-native, which the tool contract above already depends on; and
Phase 3 is a FastAPI phase, so Flask would have been throwaway learning.

---

### 2026-07-05 — Phase 1 SDK scope narrowed to OpenAI in Python

The roadmap asks for both Anthropic and OpenAI SDKs in both Python and
TypeScript. That was **relocated to Phase 2, not dropped** — its natural home is
next to the Vercel AI SDK work, where the comparison actually means something.
Cramming it into Phase 1 would have been bad sequencing.

Recorded here rather than by editing `ROADMAP.md`, which is a fixed reference.

---

### 2026-08-22 — Align on Python `mcp` 2.0

The Phase 1 server pinned `mcp[cli]>=1.28.1` and used `FastMCP`, which 2.0
removed. Moved forward to 2.0 and `MCPServer` rather than pinning back: working
2.0 code already existed, and every 1.x tutorial online is now stale.

---

### 2026-08-22 — The Phase 2 project: a job pipeline with two AI surfaces

**It is the flagship frontend, not a demo.** Phase 3 attaches a real backend to
whatever is built here, Phase 4 adds RAG to it, Phase 5 turns it into an agent.
So it was built to be extended, not thrown away.

**The product shape.** Phase 1 was a chat page — the AI *was* the product. The
Phase 2 goal is explicitly an AI feature *embedded in* a real product, so this
became a job pipeline (list, detail, status) with the chat copilot demoted to a
side panel and a cover-letter assistant added as a second surface. The shell is
deliberately cheap; it exists to give the AI somewhere to live.

**Why two surfaces and not one.** The six craft items are the specification, and
one surface cannot host them honestly. The copilot carries optimistic tool-call
UI; the drafter carries streaming markdown, copy/regenerate/edit, versioning and
citations. A copilot-only project would have left three items to build as filler.

**The `Job` type needs three fields the tool contract does not carry:**

```ts
type Job = {
  company: string; title: string; location: string;   // locked contract
  salary_usd: number | null; url: string | null;       // locked contract
  id: string;          // stable key — becomes the DB primary key in Phase 3
  description: string; // full posting text; the drafter and citations need it
  status: JobStatus;   // "saved" | "applied" | "interviewing" | "rejected"
};
```

Open boundary question, deliberately left open for Phase 3: `id` and
`description` clearly belong to whatever serves the jobs, but `status` is the
*user's* pipeline state, not the job's. Either `search_jobs` grows these fields
or the product keeps its own record alongside the tool result.

**Explicitly out of scope**, named up front so it does not creep: no database,
no real job API, no auth (Phase 3); no embeddings or RAG (Phase 4); no agent
loop or approvals (Phase 5).

---

### 2026-08-22 — Message branching ships as draft versions, not a chat tree

Same data structure — a `parentId` turning a flat array into a tree — and the
same lesson, which is that the array is a lie the moment editing exists. But in
a framing users understand, at a fraction of the work.

A deliberate substitution, recorded so it does not read later as a corner cut.

---

### 2026-08-27 — Version navigation UI deferred

Copy, edit and regenerate plus full draft-version branching was turning into
product polish rather than AI engineering. The **concept** is kept — editing or
regenerating from earlier state creates a tree, not a list — but the version
strip and chips are not built. Regenerate replaces the visible draft.

Time went instead to partial-failure handling and citation UX, which are the
harder and more transferable problems.

This is a deferral, not a hidden incomplete feature.

---

### 2026-08-28 — Four citation polish items deferred

Two of them are real bugs, and they are listed in the project README rather than
left to be discovered:

- copy and edit still carry the converted citation link syntax;
- a citation marker can flash raw while only part of it has streamed;
- an unrecognised marker is not dropped;
- citations resolve to a whole source rather than to individual lines.

Citation *accuracy* is deliberately not measured yet: the prompt permits only
two fixed source identifiers, so a number would be meaningless. Validating a
citation per retrieved chunk is a retrieval problem and belongs with the Phase 4
RAG work.
