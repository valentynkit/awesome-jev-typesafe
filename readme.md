# Awesome Jev [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

Typed decisions from TypeSafe's Jev, the first System One model: state in, calibrated probabilities out, no text to parse.

Jev does not write. You hand it some state and a list of typed questions, and it answers each one with a probability, a pick from options you defined, or a position on a scale you defined. One request, about 100 ms, $0.042 per million input tokens, output free, every question scored in parallel. This list is where people are putting that to work, sorted by what you would install.

<table>
  <tr>
    <td align="center"><a href="https://github.com/browser-use/jev-ultrafast"><img src="media/jev-ultrafast.png" width="300" alt="jev-ultrafast booking a flight in 7.1 seconds"><br><sub>jev-ultrafast</sub></a></td>
    <td align="center"><a href="https://github.com/ChetasLua/jevmeter"><img src="media/jevmeter.png" width="300" alt="jevmeter scoring every sentence of a debate"><br><sub>jevmeter</sub></a></td>
    <td align="center"><a href="https://github.com/RomanSlack/jev-drone"><img src="media/jev-drone.png" width="300" alt="jev-drone chasing through a course"><br><sub>jev-drone</sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/devagrawal09/jev-review"><img src="media/jev-review.png" width="300" alt="jev-review dashboard"><br><sub>jev-review</sub></a></td>
    <td align="center"><a href="https://github.com/phyous/tsai-sc"><img src="media/tsai-sc.png" width="300" alt="StarCraft victory screen"><br><sub>tsai-sc</sub></a></td>
    <td align="center"><a href="https://github.com/AbdelStark/heist-one"><img src="media/heist-one.png" width="300" alt="heist-one stealth game"><br><sub>heist-one</sub></a></td>
  </tr>
</table>

## Contents

- [Jev on one screen](#jev-on-one-screen)
- [Know before you build](#know-before-you-build)
- [Start here](#start-here)
- [Official SDKs and framework support](#official-sdks-and-framework-support)
- [Coding agents](#coding-agents)
  - [Claude Code](#claude-code)
  - [Codex](#codex)
  - [Pi](#pi)
  - [Hermes](#hermes)
  - [Agent Zero](#agent-zero)
  - [Any agent via MCP](#any-agent-via-mcp)
  - [Skills for writing Jev code](#skills-for-writing-jev-code)
- [Browser and computer use](#browser-and-computer-use)
- [Open models and replicas](#open-models-and-replicas)
- [Code review and quality](#code-review-and-quality)
- [Routing and gateways](#routing-and-gateways)
- [Search, reranking and RAG](#search-reranking-and-rag)
- [Data and ops](#data-and-ops)
- [Safety, moderation and verification](#safety-moderation-and-verification)
- [Applications and extensions](#applications-and-extensions)
- [Games, robotics and simulation](#games-robotics-and-simulation)
- [Finance and trading](#finance-and-trading)
- [Benchmarks, evals and calibration](#benchmarks-evals-and-calibration)
- [Playgrounds and demos](#playgrounds-and-demos)
- [Command line](#command-line)
- [Community clients](#community-clients)
- [Articles and talks](#articles-and-talks)
  - [Launch coverage](#launch-coverage)
  - [Independent measurements](#independent-measurements)
  - [Essays and threads](#essays-and-threads)
- [Other lists](#other-lists)

## Jev on one screen

Copied from the vendor's pages on 2026-09-18; every page is linked under Start here.

- Endpoint: `POST https://api.typesafe.ai/v1/systemone` with a `model`, a `state`, and a map of `questions`.
- Model alias: `jev-latest`, currently `jev-1.13.0`.
- Questions: `Choice` picks one of up to 255 options you define, `Score` places the state on a scale you describe, `Noul` is a calibrated yes/no probability. All questions in a request are scored in parallel against the same state.
- Input: text or JSON state. No images, audio, or video yet.
- Price: $0.042 per million input tokens; output tokens are free.
- Limits: 250,000 tokens per second, 1,200 requests per minute, 32k tokens per request, all subject to change during early access.
- Latency: 70 to 500 ms end to end, vendor reported.
- Training: RLCD, reinforcement learning for calibrated decisions. Weights and architecture are unpublished.

## Know before you build

- Type safe is not the same as correct. A schema-valid answer can still be confidently wrong. The "cannot hallucinate" claim means no out-of-schema output, nothing more.
- On the vendor's own four-workflow eval Jev lands around 68 percent, close to mid-tier LLMs. Keep irreversible actions behind a threshold and a human.
- It cannot count, do arithmetic, reason about dates, or produce a value that is not in your option list. Ask it to pick from a deck, never to name a card.
- Accuracy drops as the state fills with unrelated content. Curating what you send is your job, and it is most of the work.
- The vendor publishes its known failure modes on the model jaggedness page linked below. Read it before you pick your first threshold.
- Access is a waitlist. Open replicas and third-party gateways exist below if you cannot wait, or would rather not depend on one vendor.

## Start here

- [Introduction](https://docs.typesafe.ai/introduction) - The mental model in two pages: state plus typed questions in, typed answers with probabilities out.
- [Quick start](https://docs.typesafe.ai/introduction/quickstart) - First request in Python, TypeScript, or curl.
- [Primitives](https://docs.typesafe.ai/primitives) - Choice, Score, and Noul, and when each one fits.
- [State](https://docs.typesafe.ai/concepts/state) - How to package what Jev judges, and why less is more.
- [API reference](https://docs.typesafe.ai/api) - The request and response contract.
- [Models](https://docs.typesafe.ai/models) - Aliases, current version, price, and rate limits.
- [Model jaggedness: jev-1.13](https://docs.typesafe.ai/model-jaggedness/jev-1.13) - Known failure modes, straight from the vendor.
- [System One](https://docs.typesafe.ai/concepts/system-one) - What the category means and how it differs from a chat model.
- [How to build with System One](https://docs.typesafe.ai/concepts/how-to-build-with-system-one) - Decompose a judgment into atomic questions and keep the control flow in code.
- [Confidence](https://docs.typesafe.ai/confidence) - What the confidence field means and how to turn it into act, review, or fall back.
- [Patterns](https://docs.typesafe.ai/patterns) - Speculative fan-out, confidence routing, composite scoring, intent routing.
- [Use-case map](https://docs.typesafe.ai/concepts/use-case-map) - The vendor's own catalogue of where Jev fits and where it does not.
- [Cookbooks](https://docs.typesafe.ai/cookbooks/parallel_questions) - Worked recipes, starting with batching many questions into one request; the sidebar has the rest.
- [Workflow evals](https://evals.typesafe.ai/) - The vendor's benchmark on four workflows, with the caveats printed on the page.
- [Manifesto](https://typesafe.ai/manifesto) - The product thesis, summed up as build prod, not god.
- [llms.txt](https://docs.typesafe.ai/llms.txt) - Every documentation page as plain Markdown, for feeding to an agent.
- [Console](https://console.typesafe.ai/) - Waitlist, API keys, and usage.
- [Jev on Vercel AI Gateway](https://vercel.com/ai-gateway/models/jev) - Model id `typesafe-ai/jev`, billed through Vercel, no TypeSafe waitlist.
- [Jev on Cloudflare Workers AI](https://developers.cloudflare.com/ai/models/typesafe/jev/) - Call `typesafe/jev` from a Worker through `env.AI.run`.
- [Discord](https://discord.gg/typesafe) - Official server; builder demos live in the show-and-tell channel.

## Official SDKs and framework support

- [typesafe-sdk-js](https://github.com/typesafe-ai/typesafe-sdk-js) - TypeScript and JavaScript client with answer types inferred from your questions.
- [typesafe-sdk-python](https://github.com/typesafe-ai/typesafe-sdk-python) - Python client, sync and async.
- [system-one-adapter-python](https://github.com/typesafe-ai/system-one-adapter-python) - Same `TypeSafeClient` interface backed by an LLM API, so you can compare Jev against a chat model on identical questions.
- [skills](https://github.com/typesafe-ai/skills) - Agent skills for designing questions, building workflows, and evaluating them.
- [Agent skill](https://docs.typesafe.ai/agent-skill) - How to install the official skill in Claude Code, Cursor, and friends.
- [Vercel AI SDK provider](https://ai-sdk.dev/providers/ai-sdk-providers/typesafe-ai) - `@ai-sdk/typesafe-ai` exposes Jev through `experimental_evaluate`.
- [eve](https://github.com/vercel/eve) - Vercel's agent framework; Jev is the typed judge in its evaluate step.
- [ai-cli](https://github.com/vercel-labs/ai-cli) - The Vercel AI SDK in your terminal, with an evaluate path that runs on Jev.

## Coding agents

<a href="https://github.com/DevMortimer/pi-warden"><img src="media/pi-warden.png" width="600" alt="pi-warden: rules in a Markdown file, judged by Jev on every write"></a>

### Claude Code

- [fast-jev-compaction](https://github.com/tamaratran/fast-jev-compaction) - Replaces the compaction summary with Jev decisions: every tool call and result scored in one request, stale ones dropped, everything kept stays verbatim.
- [jev-router](https://github.com/gargpratyush/jev-router) - Routes each task to the cheapest Claude model that can handle it.
- [winnow](https://github.com/GhalebDweikat/winnow) - Judges every tool result before it enters context, so the window fills slower instead of being cleaned later.
- [yoshi](https://github.com/compozy/yoshi) - Context-pruning proxy for Claude Code and Codex, with the savings measured rather than claimed.
- [skillranker](https://github.com/Dicklesworthstone/skillranker) - Rust CLI and hooks that rank installed skills for the next step using live session context, with abstention.
- [jcm-router](https://github.com/adarshmishra07/jcm-router) - Local proxy that picks model and effort per message and leaves the cached main chat alone.
- [jev-skillful](https://github.com/bestagentkits/jev-skillful) - Per-prompt router over skills, MCP servers, agents, and commands, and it measures whether the injection helped.
- [limpet](https://github.com/noplan-inc/limpet) - A Stop hook that keeps the agent from stopping too early, judged against plain-language rules.
- [jevwire](https://github.com/Brainwires/jevwire) - MCP server, embeddable decision model, and an escalate-only plugin that can make the harness stricter but never looser.

### Codex

- [jev-codex-router](https://github.com/0xNatoshi/jev-codex-router) - Picks model, thinking depth, and speed mode for every Codex turn.

### Pi

- [pi-jev by y0usaf](https://github.com/y0usaf/pi-jev) - A measured tool-call gate plus a `jev_ask` tool for typed answers inside Pi.
- [pi-warden](https://github.com/DevMortimer/pi-warden) - Guardrails that steer instead of interrupt: irreversible calls, off-task calls, stuck loops, unverified done claims, about 250 ms each.
- [pi-jev-auto-mode](https://github.com/jomatsu/pi-jev-auto-mode) - Auto-approves bash, write, and edit calls semantically and fails closed when it cannot decide.
- [pi-jev by TheoOliveira](https://github.com/TheoOliveira/pi-jev) - Semantic tool routing and typed decisions as Pi tools.
- [pi-jev-router](https://github.com/mejiasd3v/pi-jev-router) - Automatic model routing for Pi through the Vercel AI Gateway.
- [pi-fast-jev-compaction](https://github.com/joelhooks/pi-fast-jev-compaction) - The verbatim compaction idea, ported to Pi.

### Hermes

- [typesafe-skill-router](https://github.com/DECRUX9812/typesafe-skill-router) - Names the one skill worth loading before the model call; stdlib only, about a tenth of a cent per turn.
- [jev-agent-skill-router](https://github.com/GodsBoy/jev-agent-skill-router) - Confidence-aware skill routing with an abstain path.
- [hermes-jev](https://github.com/keeltrace/hermes-jev) - Typed decisions, ranking, verification, and an opt-in tool gate.
- [ask-jev-skill](https://github.com/shantanugoel/ask-jev-skill) - Lets Hermes and similar agents ask Jev directly.

### Agent Zero

- [a0-typesafe-ai](https://github.com/3clyp50/a0-typesafe-ai) - Typed tools and probability cards for Agent Zero.

### Any agent via MCP

- [skillbox](https://github.com/kitze/skillbox) - Self-hosted, versioned skills library served over MCP, with Jev recommending which skill to load.
- [jev-mcp by jkudish](https://github.com/jkudish/jev-mcp) - The first MCP server for Jev, and still the most linked.
- [typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp) - Go MCP connector.
- [jev-mcp by blakestone-x](https://github.com/blakestone-x/jev-mcp) - Classify, score, check, match, and screen, with confidence on every answer.
- [Jevbridge](https://github.com/gamesonrblx/Jevbridge) - ACP and MCP adapter that pairs Jev with any LLM for computer use and typed decisions.

### Skills for writing Jev code

- [building-with-jev-skill](https://github.com/dbreunig/building-with-jev-skill) - Skill for writing and improving programs that call Jev.
- [jev-system-architect](https://github.com/samtay32/jev-system-architect) - Finds the fuzzy judgment in a system and turns it into small Choice, Score, and Noul primitives.
- [jev-judgment](https://github.com/HyunjunJeon/jev-judgment) - Sends a coding agent's closed judgments to Jev instead of the chat model.

## Browser and computer use

<a href="https://github.com/droidrun/mobile-jev"><img src="media/mobile-jev.jpg" width="400" alt="mobile-jev driving the Uber app on a real Android phone"></a>

- [jev-ultrafast](https://github.com/browser-use/jev-ultrafast) - One request picks both the operation and the target element from an indexed DOM table; a small LLM only writes typed text. Zürich to London booked in 7.1 seconds.
- [typesafe-computer-use](https://github.com/awlevin/typesafe-computer-use) - OCR the screen, classify the next action, click; about $0.0002 a step on macOS.
- [mobile-jev](https://github.com/droidrun/mobile-jev) - The same loop on a real Android phone; nine Uber actions in 21 seconds in the demo.
- [jev-browser by jkudish](https://github.com/jkudish/jev-browser) - The first community browser agent on Jev, with a demo GIF.
- [jev-voice-browser](https://github.com/moritzkremb/jev-voice-browser) - Intent and target decided per spoken word in about 300 ms, often before the sentence ends.
- [jev-browser by Ying-Kai-Liao](https://github.com/Ying-Kai-Liao/jev-browser) - An LLM plans, Jev decides; library, CLI, and MCP server.
- [jev-browser by tontoko](https://github.com/tontoko/jev-browser) - One grounded Jev and Playwright core behind a typed SDK, a persistent CLI, and an MCP server.

## Open models and replicas

<a href="https://github.com/TheoLeeCJ/SemIf"><img src="media/semif.png" width="400" alt="SemIf: no waitlist, runs in your browser"></a>

None of these ship TypeSafe's weights. They reproduce the interface, the parallel scoring trick, or both, on open models.

- [SemIf](https://github.com/TheoLeeCJ/SemIf) - Semantic ifs from open models on a single 3090; the most starred independent replica, formerly openjev.
- [jevlike](https://github.com/vinnylarouge/jevlike) - Open option scorer that reads candidate logits instead of generating JSON.
- [NanoJev](https://github.com/TianyuCodings/NanoJev) - 0.6B replica with parallel decisions, dynamic candidates, and an end-to-end training pipeline.
- [openjev-sglang](https://github.com/ekzhang/openjev-sglang) - Jev-compatible API endpoint on SGLang, prefill only.
- [jev-visual](https://github.com/hr98w/jev-visual) - Educational visual-inference variant on Apple Silicon: shared context, direct candidate scoring.
- [reflex](https://github.com/kshetrajna12/reflex) - Small open decision model on Qwen3.5: state plus typed questions to calibrated probabilities.
- [decider](https://github.com/Mapika/decider) - One-pass typed decisions fine-tuned from Qwen3.5-2B.
- [jevmlx](https://github.com/bnsd55/jevmlx) - Parallel constrained decisions for any MLX model on Apple Silicon, one forward pass.
- [mini-jev](https://github.com/r-ms/mini-jev) - Preregistered experiment on a frozen Qwen3-4B: read the option letter's logits, skip the JSON.
- [system-one-open](https://github.com/mithalouni/system-one-open) - Typed calibrated decisions in one forward pass on Gemma 4 E2B and Gemma 3 270M.
- [Verdict-open-jev](https://github.com/Heman10x-NGU/Verdict-open-jev) - Non-autoregressive decision engine on ModernBERT with calibrated uncertainty and an in-browser WebGPU playground.
- [jevfire](https://github.com/kikoncuo/jevfire) - Parallel decisions for CUDA LLMs through a vLLM API, with game-agent examples and benchmarks.
- [jevbetter](https://github.com/olanotolu/jevbetter) - A stronger one-pass scorer with a head-to-head benchmark against the jevlike starter design.
- [open-alternative-jev](https://github.com/ikermoel/open-alternative-jev) - Typed, calibrated decisions from any open-weights model in one forward pass, on Hugging Face and vLLM.
- [openjev by zhihz](https://github.com/zhihz/openjev) - Bilingual local decisions from context, questions, and candidate answers.
- [jev-on-a-laptop](https://github.com/rorshopping/jev-on-a-laptop) - Study of Jev-style decisions on stock 1.5B to 8B models on a laptop, with a Hugging Face demo.
- [typesafe-ai-benchmark](https://github.com/iammrduncan/typesafe-ai-benchmark) - LLM gateway that mimics the TypeSafe response shape, useful as a stand-in while you wait for a key.
- [Parallel constrained decoding](https://huggingface.co/spaces/drinkmoonshine/parallel-constrained-decoding) - Hugging Face Space demonstrating RLCD-style parallel decoding on Qwen2.5-1B.

## Code review and quality

- [jev-review by devagrawal09](https://github.com/devagrawal09/jev-review) - Staged code-review workflow with a local dashboard.
- [jev-review by NiazMorshed2007](https://github.com/NiazMorshed2007/jev-review) - Local-first MCP plugin for continuous quality review by coding agents.
- [foreman](https://github.com/thruwire/foreman) - Supervises a software factory of agents, with Jev making the go and no-go calls.
- [supercov](https://github.com/supercorp-ai/supercov) - Code quality and coverage signals for coding agents.
- [diffjury](https://github.com/raihankhan-rk/diffjury) - PR risk router and review coach.
- [clean-code-review](https://github.com/frostney/clean-code-review) - Every file in a PR judged against Clean Code rules, then reviewed by an LLM.
- [JevLint](https://github.com/huntedman/JevLint) - Configurable semantic linting with file-level Noul judgments.
- [commit-miner](https://github.com/devanshbatham/commit-miner) - Classifies commit diffs and messages: bug fixes, security fixes with CWEs, change types.

## Routing and gateways

- [tiershift](https://github.com/iamvatsalpatel/tiershift) - Shifts every LLM call to the cheapest model that can handle it, policy in YAML, decision in about 180 ms.
- [jev-router by prismhq](https://github.com/prismhq/jev-router) - LLM router on top of LiteLLM.
- [agent-router](https://github.com/nidhi-singh02/agent-router) - Picks Cursor, Claude Code, Codex, or OpenCode plus model and effort for a task, then launches it.
- [Janus](https://github.com/FirasSX914/Janus) - Measures on your data when Jev beats other models, then routes accordingly.
- [hono-jev-router](https://github.com/yusukebe/hono-jev-router) - Route HTTP requests by meaning in Hono.

## Search, reranking and RAG

- [jev-search](https://github.com/superagents-lab/jev-search) - Source selection, query understanding, and relevance ranking for web search.
- [blink](https://github.com/ellipsis-dev/blink) - Codebase search where Jev scores the candidates.
- [reranker](https://github.com/hev/reranker) - Jev as a calibrated reranker: one call, up to 30 documents, a probability per document.
- [llama-index-jev](https://github.com/WiktorB2004/llama-index-jev) - LlamaIndex reranker and router, cheaper than an LLM judge.
- [jev-tree](https://github.com/reachjalil/jev-tree) - Recursive choice over a taxonomy, past the 255-option cap.
- [neo4jev](https://github.com/jexp/neo4jev) - Walks a Neo4j graph by classifying neighbouring relationships.

## Data and ops

- [pg-jev](https://github.com/realZachi/pg-jev) - PostgreSQL extension that answers plain-language questions about your tables.
- [vgi-typesafe](https://github.com/Query-farm/vgi-typesafe) - DuckDB worker that exposes choice, noul, and score as lateral-joinable table functions in SQL.
- [jevsql](https://github.com/EugeneBoondock/jevsql) - SQL with natural-language predicates over SQLite: filter, rank, and classify rows by meaning, batched and cost-guarded.
- [sqlite-jev](https://github.com/mgaitan/sqlite-jev) - Adds Jev Noul, Choice, and Score judgments to SQLite through a loadable C extension and Python wrapper, with scalar functions and batched virtual-table queries.
- [jevlogs](https://github.com/reachjalil/jevlogs) - Scores OpenTelemetry log signal before paying for LLM analysis.
- [jev-curate](https://github.com/AkashPriyadarshii/jev-curate) - Sifts Parquet and JSONL training data at more than 1,500 rows a second.
- [HA-Jev](https://github.com/AboveColin/HA-Jev) - Home Assistant integration: ask a question about your house, get a probability, choice, or score as an entity.
- [typesafe-migration-guard](https://github.com/opaielsheikh/typesafe-migration-guard) - Reviews database migrations for safety before they run.
- [jev-for-engineers](https://github.com/Foadsf/jev-for-engineers) - Eight small examples from mechanical and electrical engineering: CAD routing, FEM triage, DFM screening, BOM alignment.
- [jlink](https://github.com/keltokhy/jlink) - Links records across two datasets from a match rule written in plain English, from Python, the shell, Stata, or R, and reports F1 0.73 against 0.69 for tuned string matching on NBER patent assignees to Compustat.

## Safety, moderation and verification

- [jev-shield](https://github.com/caiovicentino/jev-shield) - Semantic MCP firewall that screens every tool call, result, and description; reports 94 percent block recall at about $0.00002 a check.
- [jev-guard](https://github.com/leepokai/jev-guard) - Auto mode for Claude Code, Codex, Cursor, Gemini CLI, Pi, and OpenCode: risk-scores each tool call as deny, ask, or allow and flags prompt injection in results.
- [Jev-Moderation-Bot](https://github.com/brainstormity/Jev-Moderation-Bot) - Chat moderation with editable rules.
- [citation-verifier](https://github.com/MarissaFamularo/citation-verifier) - Does the cited paper support the sentence citing it? Claude finds the quote, Jev scores it, a human decides.
- [human-compiler](https://github.com/asfarsadewa/human-compiler) - Paste text, get diagnostics, like a compiler for prose.
- [snifftest](https://github.com/DanRWilloughby/snifftest) - Prose linter for AI writing tells: countable rules plus one judgment model.
- [riff](https://github.com/scale-venture-partners/riff) - Ruff-style rule codes for writing.

## Applications and extensions

- [unclutter](https://github.com/kitze/unclutter) - Browser extension that removes page clutter with reusable template rules.
- [typesafe-adblock](https://github.com/realZachi/typesafe-adblock) - Chrome extension that asks "is this element an ad?" per DOM node; a toy, and it says so.
- [vibecheck](https://github.com/RafalWilinski/vibecheck) - Vibe-check your X post before you hit publish.
- [xtags](https://github.com/manifoldor/xtags) - Labels every post in your X timeline with what it wants you to do.
- [jevibe-check](https://github.com/sriganesh/jevibe-check) - Live tone labels for Bluesky posts and drafts.
- [jevmeter](https://github.com/ChetasLua/jevmeter) - Puts a live meter on any video: every sentence scored on five questions, rendered as a 16:9 edit, a whole debate for about two cents.
- [killmyidea](https://github.com/monteduro/killmyidea) - Describe your startup idea; Jev says kill it, fix it, or ship it.
- [notra](https://github.com/usenotra/notra) - Turns work into content, with Jev deciding what is worth posting.
- [slidepilot](https://github.com/harshil1712/slidepilot) - Voice-driven auto-advance for Slidev on Cloudflare Agents.
- [should-ai-kill-us-all](https://github.com/hellogumbo/should-ai-kill-us-all) - Asks Jev the question every ten minutes, using the actual headlines.
- [Privacy Facts](https://github.com/thenewpotato/privacy-facts) - Turns privacy policies into nutrition-style labels with plain-language answers, Jev confidence scores, and suggested source clauses.

## Games, robotics and simulation

<a href="https://github.com/AbdelStark/heist-one"><img src="media/heist-one-gameplay.png" width="600" alt="heist-one: guards patrol on Jev judgments, the world stays deterministic"></a>

- [typesafe-mario](https://github.com/fhshaik/typesafe-mario) - Plays Super Mario Bros. from structured emulator state; Jev picks the NES controller input directly.
- [jev-drone](https://github.com/RomanSlack/jev-drone) - Camera-only drone in MuJoCo with Jev in the loop at 2.5 Hz.
- [tsai-sc](https://github.com/phyous/tsai-sc) - Plays the original StarCraft shareware through keyboard and mouse, action probabilities recorded.
- [tsai-civ2](https://github.com/phyous/tsai-civ2) - Civilization II in a browser, full-game harness, live action probabilities.
- [heist-one](https://github.com/AbdelStark/heist-one) - Stealth game where Jev makes the guards' judgments and deterministic code owns the world.
- [typesafe-snake](https://github.com/sorrycc/typesafe-snake) - One Choice per tick; legal moves and facts generated in code.
- [jev-doom-agent](https://github.com/lukaske/jev-doom-agent) - Browser-native Doom agent with structured spatial state and live decision telemetry.
- [OneVOneJev](https://github.com/emrickgarrett/OneVOneJev) - 1v1 quickscope arena in Three.js.
- [JevPlaysPokemon](https://github.com/anxkhn/JevPlaysPokemon) - Generation 3 Pokémon through Showdown and a real FireRed ROM.
- [jev-askable-arm](https://github.com/TarunTomar122/jev-askable-arm) - Zero-shot English goals on a simulated Franka arm; Jev chains hardcoded primitives.

## Finance and trading

- [jev-trader](https://github.com/jarrodwatts/jev-trader) - One trade decision every Monad block, on Kuru MON-USDC, about 300 ms each.
- [trade-jev](https://github.com/justinhe16/trade-jev) - Backtests Jev as a buy, sell, or hold trader on NQ order-book data.
- [Jev-Trades](https://github.com/zadescoxp/Jev-Trades) - Crypto trading bot with backtesting.

## Benchmarks, evals and calibration

<a href="https://github.com/abhixhek/jevcal"><img src="media/jevcal.png" width="600" alt="jevcal calibration report"></a>

- [jev-benchmarks](https://github.com/AbdelStark/jev-benchmarks) - Probability-aware evaluation for typed decision models: calibration, selective risk, latency, reproducible.
- [jevcal](https://github.com/abhixhek/jevcal) - Stop guessing thresholds: calibrate, threshold, and drift-check against an LLM teacher.
- [jev-harness](https://github.com/AntonioCoppe/jev-harness) - Confidence gates, shadow mode, recipes, and evals; reports Claude CLI at 48.9 s against Jev at 1.3 s on the same row-filter job.
- [jev-rerank-bench](https://github.com/anessbelbati/jev-rerank-bench) - Jev against Cohere Rerank, ZeroEntropy, and a chat baseline on 14 datasets, raw responses included.
- [jev-search-rerank-eval](https://github.com/zhuyansen/jev-search-rerank-eval) - Does a Jev rerank beat embedding search? 9,831 graded pairs, with the judge-circularity bias measured.
- [jev-sec-bench](https://github.com/Gaurav-Gosain/jev-sec-bench) - Blind benchmarks for prompt injection and vulnerable-code detection.
- [jev-phishing-bench](https://github.com/anisselbd/jev-phishing-bench) - Jev against Claude Haiku on 2,000 phishing emails: accuracy, calibration, latency, cost.
- [jev-spam-eval](https://github.com/bitnovus/jev-spam-eval) - Zero-shot spam filtering with Noul questions against TF-IDF baselines.
- [jev-agent-failure-benchmark](https://github.com/TokenTrim/jev-agent-failure-benchmark) - Jev against a strong LLM on the Who and When agent-failure-attribution benchmark.
- [jev-korean-benchmark](https://github.com/mahlernim/jev-korean-benchmark) - Korean understanding and medical text, with runtime and cost evidence.
- [jev-behavior-study](https://github.com/RINNECODER/jev-behavior-study) - Controlled prompt experiments on jev-1.13.0, raw results and offline verification.
- [jev-report](https://github.com/HackSing/jev-report) - Independent Chinese research report: 52 pages, 50 reproducible tests, 143 traceable data rows.

## Playgrounds and demos

<a href="https://github.com/BunsDev/typesafe-ai-playground"><img src="media/typesafe-ai-playground.jpg" width="600" alt="typesafe-ai-playground A/B comparison view"></a>

- [typesafe-ai-playground by BunsDev](https://github.com/BunsDev/typesafe-ai-playground) - 110 use cases, games, and model challenges with editable prompts and A/B comparisons.
- [typesafe-playground by kavehmz](https://github.com/kavehmz/typesafe-playground) - From support routing to a 3D driving simulation with visible sensor inputs.
- [jev-experiments](https://github.com/dabit3/jev-experiments) - Nader Dabit's grab bag of small Jev experiments.
- [TypeSafe Typewriter](https://typesafe-demo.val.run/) - Sixteen typed judgments update as you type, on Val Town.
- [Yes / No](https://yesno.coderai.dev) - Ask a question, get yes, no, or maybe, with web search when needed; no signup.
- [Jev Pac-Man](https://jev-pacman.ephraimduncan.com) - The maze as JSON; Jev picks the turn at every junction.
- [Jev Tetris](https://jev-omega.vercel.app) - Rotation and column chosen from holes, stack height, and bumpiness.
- [Hollow Creek](https://hollow-creek-sigma.vercel.app) - Village NPCs that judge you each tick instead of chatting.
- [Crowdcheck](https://crowdcheck-ai.vercel.app/) - Test a post against 10,000 synthetic personas before you publish it.
- [Magic-8-Jev](https://github.com/willprout/magic-8-ball) - Ask a question, one choice over twenty answers picks the reply and shows the click-to-answer latency; [live demo](https://willprout.github.io/magic-8-ball/).

## Command line

- [jev-axi](https://github.com/shiftynick/jev-axi) - Shell verbs for agents and humans: pick, rate, check, rank, triage, guard.
- [semdecide](https://github.com/sharziki/semdecide) - Typed semantic decisions for Unix pipelines and CI.
- [every](https://github.com/sufianetaouil/every) - Ask a yes/no question of every function in a codebase; grep whose pattern is a question.
- [typesafe-cli](https://github.com/y0usaf/typesafe-cli) - Noul, choice, and score answers as numbers from the shell.
- [jev-shell-history](https://github.com/mrnugget/jev-shell-history) - Fish-style zsh history suggestions, ranked by Jev.
- [jgrep](https://github.com/keltokhy/jgrep) - Prints the lines that fit a plain-English description, streaming from `tail -f` under a spend cap, and reports F1 0.91 on SMS spam against 0.72 for a keyword grep.

## Community clients

- [jev-go](https://github.com/Gaurav-Gosain/jev-go) - Go client that returns typed judgments and probabilities.
- [typesafe-go](https://github.com/zhirschtritt/typesafe-go) - Idiomatic Go SDK for the TypeSafe API.
- [typesafe-ai](https://github.com/Twister915/typesafe-ai) - Rust client with async and blocking backends and observable retries.
- [typesafe-ai-rs](https://github.com/gilljon/typesafe-ai-rs) - Independent async and blocking Rust SDK.
- [jev](https://github.com/dannote/jev) - Elixir client built for OTP: reply to Jev from a GenServer and pattern match on the answer.
- [typesafe-sdk](https://github.com/joshmn/typesafe-sdk) - Ruby client.
- [ruby_llm-typesafe](https://github.com/kieranklaassen/ruby_llm-typesafe) - TypeSafe as a structured-output provider for RubyLLM 2.
- [laravel-typesafe-jev](https://github.com/Butochnikov/laravel-typesafe-jev) - Laravel integration with typed responses, async requests, and testing fakes.
- [typesafe-sdk-java](https://github.com/Premo-Cloud/typesafe-sdk-java) - Java client.
- [typesafe-sdk-swift](https://github.com/alterhq/typesafe-sdk-swift) - Swift client.
- [TypeSafeAI.Net](https://github.com/Hawxy/TypeSafeAI.Net) - .NET SDK.
- [zio-typesafe-ai](https://github.com/jamesward/zio-typesafe-ai) - Scala client on ZIO.
- [jev-dsl](https://github.com/inanna-malick/jev-dsl) - Haskell DSL with typed packets and inferred answer types.
- [advocaat](https://github.com/pithings/advocaat) - Small TypeScript client for asking questions about your own data.
- [jod](https://github.com/mateonunez/jod) - Zod-style schemas over Jev: validate the state locally, then project typed answers.
- [n8n-nodes-typesafe-ai](https://github.com/DomMonte/n8n-nodes-typesafe-ai) - n8n community node for yes/no, choice, and score questions.

## Articles and talks

### Launch coverage

- [Introducing System One Models and Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) - The launch post: architecture, RLCD, benchmarks, pricing, and the FAQ.
- [Launch thread by Diogo Almeida](https://x.com/CompleteSkeptic/status/2099925682726002904) - The founder's case that RLCD-trained decision models are a shorter path to value than chat.
- [Hacker News launch thread](https://news.ycombinator.com/item?id=49717558) - Where the sceptical reading of the benchmarks lives.
- [The Register](https://www.theregister.com/ai-and-ml/2026/09/16/typesafe-ai-debuts-model-for-machines-that-plays-doom/5296711) - Launch coverage, the Doom demo, and the $40M seed round.
- [Latent Space](https://www.latent.space/p/ainews-jev-a-system-one-model-that) - Launch-day roundup.
- [TypeSafe AI emerges from stealth with $40M](https://finance.yahoo.com/technology/ai/articles/typesafe-ai-emerges-stealth-40m-190000776.html) - The funding announcement.
- [The Rundown](https://www.therundown.ai/news/typesafe-jev-ai-decisions-software) - Short launch summary.
- [DataCamp](https://www.datacamp.com/blog/system-one-models-jev) - Third-party explainer of the primitives, pricing, and vendor evals.
- [How does Jev work? RLCD and parallel inference](https://www.explainx.ai/blog/how-does-jev-work-rlcd-system-one-model-explained-2026) - What is public about the training method.
- [TypeSafe Jev: the first decision-only model class](https://www.developersdigest.tech/blog/typesafe-jev-system-one-models-release-guide-2026) - Release-week technical roundup: API, evals, adapter, and skill.

### Independent measurements

- [Testing Jev on public and private data](https://amankumar.ai/blogs/jev-measured) - 16,000 calls against two GPT models: where it wins, where it breaks, and a threshold procedure.
- [One judge call, or twelve dimension scores?](https://agentjournal.dev/blog/llm-judge-vs-feature-extraction/) - Three classification tasks, one direct question against a dozen scored dimensions with fitted weights.
- [Jev vs Mistral and Gemini for event validation](https://nearhere.events/blog/typesafe-jev-mistral-gemini-event-validation) - Head to head on local event listings, with cost and latency.
- [Mini-Vibe Check](https://every.to/also-true-for-humans/mini-vibe-check-typesafe-s-jev-judged-everything-i-ve-written-in-0-7-seconds) - Every runs 1,709 judgments over a writing archive for under a cent.
- [TypeSafe Jev played chess](https://dev.to/maximsaplin/typesafe-jev-played-chess-and-landed-next-to-reasoning-models-28ga) - Legal-move Choices land it next to reasoning models.
- [Jev, Sorted](https://pearpages.com/blog/2026/09/16/jev-sorted-what-typesafes-system-one-model-actually-is-and-what-is-still-just-a-claim) - Which launch claims survive a reading of the primary sources.
- [Typed decisions, not chat](https://warmersun.com/jev/) - Separates the published claims from what public evidence establishes.
- [TypeSafeのJevを正しく驚く](https://zenn.dev/nwn/articles/824026c76116e0) - Japanese; reproduces the logit shortcut on Gemma and compares against LLMs on the Mario harness.

### Essays and threads

- [Building a harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev) - LangChain on model routing and gating dangerous tool calls behind a typed decision.
- [Jev, from a developer's angle](https://flaviocopes.com/jev/) - Triage, RAG filtering, citation checks, and confidence gates, with code.
- [Jev is the fish at the poker table](https://backnotprop.com/blog/jev-poker/) - An essay on what a calibrated, non-generating model is for.
- [Jev as a command safety reviewer](https://x.com/rauchg/status/2100307962262872105) - Guillermo Rauch on Jev reviewing every fx command.
- [Jev Typewriter](https://x.com/stevekrouse/status/2100287368221659289) - Steve Krouse's sixteen-judgment demo and video.
- [He says he co-invented ChatGPT. His new AI will not write a word](https://dev.to/gabrielanhaia/he-says-he-co-invented-chatgpt-his-new-ai-jev-wont-write-a-word-e3c) - Walkthrough of the Vercel AI SDK integration.
- [Testing Jev for Pi extensions](https://reddit.com/r/PiCodingAgent/comments/1whsav6/anyone_else_testing_out_typesafe_ais_new_system/) - Builders using Jev as a tool-use safety layer.
- [jev 同士に五目並べで対戦させた](https://zenn.dev/mizchi/articles/jev-plays-gomoku) - Japanese; Jev against Jev at gomoku, with source and timing logs.

## Other lists

Twenty-plus awesome-jev lists appeared in the first three days. Each has an angle; this one aims to be lint-clean, curated, and organized by what you would actually install.

- [awesomejev.com](https://awesomejev.com/) - The firehose: about 490 entries, refreshed daily, backed by hellogumbo's list below.
- [typesafeai.app](https://typesafeai.app/) - Independent directory where each record states what Jev was shown doing and carries an evidence level.
- [awesome-jev-by-typesafe](https://github.com/Anil-matcha/awesome-jev-by-typesafe) - The most starred; a guide with patterns and starter code more than a list.
- [awesome-typesafe](https://github.com/AbdelStark/awesome-typesafe) - Official and community split, well organized.
- [awesome-jev by yibie](https://github.com/yibie/awesome-jev) - Strict inclusion rules and the clearest warning about bulk-scaffolded repos.
- [awesome-jev by cobanov](https://github.com/cobanov/awesome-jev) - Source-backed and the closest to awesome-lint clean of the early lists.
- [awesome-jev by fatwang2](https://github.com/fatwang2/awesome-jev) - Directory with a reusable Jev-only GitHub review workflow.
- [awesome-jev by AnotiaWang](https://github.com/AnotiaWang/awesome-jev) - Broad coverage in a flat structure.
- [awesome-jev by hellogumbo](https://github.com/hellogumbo/awesome-jev) - The repository behind awesomejev.com.
- [awesome-jev-projects](https://github.com/logicrw/awesome-jev-projects) - Ecosystem radar with automatic GitHub discovery.
- [awesome-jev by OmniJev](https://github.com/OmniJev/awesome-jev) - Papers, open reproductions, and independent evaluations.
- [awesome-jev-usecases by anandi1989](https://github.com/anandi1989/awesome-jev-usecases) - Use cases grouped by decision pattern.
- [awesome-jev-use-cases](https://github.com/SeeAPI/awesome-jev-use-cases) - Long-form write-up per use case.
- [awesome-jev by MrJev](https://github.com/MrJev/awesome-jev) - Nineteen fine-grained categories.
- [awesome-jev-zh](https://github.com/yzfly/awesome-jev-zh) - Chinese, with a sober section on what the evaluations do and do not show.
- [anosomejev](https://github.com/majiayu000/anosomejev) - Must-include 30 with trust labels, plus a Chinese weekly radar.
- [awesome-typesafe-jev by thevibeworks](https://github.com/thevibeworks/awesome-typesafe-jev) - A GIF and a "know before you use it" note per project.
- [awesome-jev-live](https://github.com/wh000wh000/awesome-jev-live) - Evidence-graded index rebuilt every two hours.
- [awesome-jev by kraayenjon](https://github.com/kraayenjon/awesome-jev) - Featured builds with real numbers and an FAQ.
- [awesome-jev by rhc98](https://github.com/rhc98/awesome-jev) - Curated by Jev itself.
- [awesome-jev by sontakey](https://github.com/sontakey/awesome-jev) - Organized by what the projects do rather than what they are.
- [awesome-jev by daftAI2026](https://github.com/daftAI2026/awesome-jev) - GitHub projects and posts around typed decisions.
- [awesome-jev by JohnDotOwl](https://github.com/JohnDotOwl/awesome-jev) - Mirror of the awesomejev.com categories.
- [awesome-jev by oxwen11](https://github.com/oxwen11/awesome-jev) - Short, grouped by scenario.
- [awesome-jev-usecases by aliaihub](https://github.com/aliaihub/awesome-jev-usecases) - The sixty-second version and a use-case catalogue.

## Contributing

Read [contributing.md](contributing.md) first. Removal is as welcome as addition.

## Footnotes

Gallery and section images belong to the linked projects; licenses and original paths are in [media/sources.md](media/sources.md). This list is independent and not affiliated with TypeSafe AI. Prices, limits, and model aliases are copied from the vendor's pages on 2026-09-18 and will drift.
