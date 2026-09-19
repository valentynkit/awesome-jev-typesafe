#!/usr/bin/env node
// Ask Jev what a project is, who it is for, and what you would reach for it to do.
// One call per project: a Noul per use case, three choices, two scores, three checks,
// and one Noul per canonical intent. Cached by state hash in data/jev.json.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { ask } from "./jev-client.mjs";

// The navigation axis. A project can sit on several of these at once, so each one is
// its own yes/no rather than a slice of a single choice.
export const USE_CASES = [
  ["model_routing", "Model routing", "send each task to the right model"],
  ["tool_gating", "Tool gating and guardrails", "gate tool calls or put guardrails on an agent"],
  ["context_compaction", "Context compaction", "compact or prune an agent's context"],
  ["output_verification", "Output verification", "verify or judge what a model produced"],
  ["browser_computer_use", "Browser and computer use", "drive a browser or a desktop"],
  ["mobile_automation", "Mobile automation", "automate a phone or a mobile app"],
  ["code_review", "Code review", "review code or pull requests"],
  ["content_moderation", "Moderation and safety", "moderate content or catch abuse"],
  ["search_reranking", "Search reranking", "rerank search results"],
  ["classification_extraction", "Classification and extraction", "classify text or pull structured fields out of it"],
  ["data_pipelines", "Data pipelines and SQL", "run decisions inside a data pipeline or SQL"],
  ["benchmarks_evals", "Benchmarks and evals", "benchmark, evaluate, or calibrate a model"],
  ["open_replicas", "Open-model replicas", "run a System One model on open weights"],
  ["playgrounds_demos", "Playgrounds and demos", "play with Jev and see what it does"],
  ["cli_tooling", "Command line tooling", "make a decision from the command line"],
  ["sdk_library", "SDK or client library", "call the API from your own code"],
  ["mcp_integration", "MCP and agent integration", "plug Jev into an agent over MCP"],
  ["games_simulation", "Games and simulation", "build a game or a simulation"],
  ["finance_trading", "Finance and trading", "score financial signals or trade on them"],
  ["voice_realtime", "Voice and realtime", "decide in a voice or realtime loop"],
  ["learning", "Learning resources", "read or watch something and understand Jev"],
];

export const FORMS = [
  ["hook_or_plugin", "Hook or plugin", "A hook, plugin, or extension that loads into an existing agent or editor"],
  ["mcp_server", "MCP server", "An MCP server"],
  ["cli", "CLI", "A command line tool"],
  ["library_sdk", "Library or SDK", "A library or SDK you import into your own code"],
  ["web_app", "Web app", "A hosted web app or site you open in a browser"],
  ["browser_extension", "Browser extension", "A browser extension"],
  ["proxy_or_service", "Proxy or service", "A proxy, gateway, or service you run and point traffic at"],
  ["dataset_or_benchmark", "Dataset or benchmark", "A dataset, benchmark, or eval suite"],
  ["article_or_talk", "Article or talk", "An article, talk, or written explainer rather than software"],
  ["other", "Other", "None of these"],
];

export const HOSTS = [
  ["claude_code", "Claude Code", "Claude Code"],
  ["codex", "Codex", "OpenAI Codex"],
  ["cursor", "Cursor", "Cursor"],
  ["pi", "Pi", "Pi"],
  ["hermes", "Hermes", "Hermes"],
  ["agent_zero", "Agent Zero", "Agent Zero"],
  ["opencode", "OpenCode", "OpenCode"],
  ["gemini_cli", "Gemini CLI", "Gemini CLI"],
  ["any_agent", "Any agent", "Any agent, over MCP, ACP, or a generic adapter"],
  ["standalone", "Standalone", "Nothing: it runs on its own"],
];

export const AUDIENCES = [
  ["agent_builders", "Agent builders", "People building agents and the plumbing around them"],
  ["app_developers", "App developers", "Developers adding decisions to an ordinary application"],
  ["researchers", "Researchers", "Researchers measuring, comparing, or calibrating models"],
  ["end_users", "End users", "People who just want to use the thing, not build on it"],
];

export const INTENTS = [
  "route between models by task difficulty", "gate or approve tool calls before they run", "compact or prune agent context",
  "judge or verify an agent's output", "stop an agent from finishing early", "pick which skill or prompt to load",
  "drive a browser or GUI with an agent", "control a phone or mobile app", "review code or pull requests",
  "moderate content or detect abuse", "rerank search results", "classify support tickets or messages",
  "extract structured fields from text", "run Jev on open models without the vendor", "benchmark or calibrate Jev",
  "build a game or simulation on Jev", "trade or score financial signals", "call Jev from the command line",
  "call Jev from a language SDK", "serve Jev over MCP to any agent", "learn how Jev works", "compare Jev with an LLM",
  "route requests through a gateway or proxy", "detect prompt injection or risky commands", "score or rank candidates in a pipeline",
  "label data or build a dataset", "run Jev inside a database or SQL", "add Jev to a chat bot or Discord", "voice or realtime decisions", "monitor or observe Jev usage and cost",
];

export const hashOf = (s) => createHash("sha1").update(s).digest("hex").slice(0, 8);
const NOUL = (instructions) => ({ type: "noul", instructions });

const criteria = (rows) => Object.fromEntries(rows.map(([k, , desc]) => [k, desc]));
const labels = (rows) => Object.fromEntries(rows.map(([k, label]) => [k, label]));

export function questionsFor() {
  const q = {};
  for (const [k, , want] of USE_CASES) q[`use_case_${k}`] = NOUL(`Is this project useful when you want to ${want}?`);
  q.form = { type: "choice", instructions: "What kind of thing is this, as a visitor would install or open it?", criteria: criteria(FORMS) };
  q.host = { type: "choice", instructions: "Which coding agent does this project run inside?", criteria: criteria(HOSTS) };
  q.audience = { type: "choice", instructions: "Who is this built for?", criteria: criteria(AUDIENCES) };
  q.maturity = {
    type: "score", instructions: "How far along is this project, judging by the readme, the description, stars, and activity?",
    criteria: ["a toy, demo, or weekend sketch", "early and still moving", "usable for real work", "solid and maintained", "battle tested in production"],
  };
  q.docs_quality = {
    type: "score", instructions: "How good is the documentation in the readme excerpt?",
    criteria: ["none: no prose at all", "thin: a title and a sentence", "adequate: what it does and how to install it", "good: install, usage, and options with examples", "excellent: thorough, with examples and caveats"],
  };
  q.has_numbers = NOUL("Does this project report a measured number such as accuracy, latency, throughput, or cost?");
  q.looks_templated = NOUL("Does this look like one of many near-identical scaffolds, generated in a batch with little original work?");
  q.calls_jev_for_real = NOUL("Does the code path actually call the TypeSafe API, rather than mocking or stubbing the decision?");
  for (const it of INTENTS) q[`intent_${hashOf(it)}`] = NOUL(`Would a developer who wants to ${it} find this project useful?`);
  return q;
}

export const stateFor = (e, gh) => [
  `Project: ${e.name}`, `Listed under: ${e.section}${e.subsection ? " / " + e.subsection : ""}`, `Description: ${e.description}`,
  gh?.description ? `Repo description: ${gh.description}` : null,
  gh?.topics?.length ? `Topics: ${gh.topics.join(", ")}` : null,
  gh?.stars != null ? `${gh.stars} stars, last push ${gh.pushedAt?.slice(0, 10)}, language ${gh.language ?? "unknown"}` : null,
  gh?.readmeExcerpt ? `Readme:\n${gh.readmeExcerpt}` : null,
].filter(Boolean).join("\n");

export const META = {
  useCases: labels(USE_CASES),
  forms: labels(FORMS),
  hosts: labels(HOSTS),
  audiences: labels(AUDIENCES),
};

export function load() {
  const { entries } = JSON.parse(readFileSync("data/projects.json", "utf8"));
  const gh = existsSync("data/github.json") ? JSON.parse(readFileSync("data/github.json", "utf8")).repos : {};
  return { entries, gh, projects: entries.filter((e) => e.type === "project") };
}

/** The winning key of a choice answer and how sure Jev was about it. */
const pick = (a) => [a.choice, a.probabilities[a.choice]];

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const { gh, projects } = load();
  const questions = questionsFor();

  if (dryRun) {
    const e = projects[0];
    const state = stateFor(e, e.owner ? gh[`${e.owner}/${e.repo}`] : null);
    console.log(`dry run: ${projects.length} project entries, ${Object.keys(questions).length} questions per call\n`);
    console.log(`--- state for ${e.id} ---\n${state}\n`);
    console.log(`--- questions for ${e.id} ---\n${JSON.stringify(questions, null, 1)}`);
    return;
  }
  if (!process.env.TYPESAFE_API_KEY) {
    console.log("TYPESAFE_API_KEY is not set, skipping Jev tagging. data/jev.json is left as it is.");
    return;
  }

  const file = existsSync("data/jev.json") ? JSON.parse(readFileSync("data/jev.json", "utf8")) : { intents: INTENTS, entries: {} };
  file.intents = INTENTS;
  file.meta = META;
  let calls = 0, tokens = 0;
  for (const e of projects) {
    const state = stateFor(e, e.owner ? gh[`${e.owner}/${e.repo}`] : null);
    const h = hashOf(state + JSON.stringify(questions, Object.keys(questions).sort()));
    if (file.entries[e.id]?.hash === h) continue;
    const { answers, usage } = await ask(state, questions);
    calls++; tokens += usage?.input_tokens ?? 0;
    const [form, formP] = pick(answers.form);
    const [host, hostP] = pick(answers.host);
    const [audience, audienceP] = pick(answers.audience);
    file.entries[e.id] = {
      hash: h,
      useCases: Object.fromEntries(USE_CASES.map(([k]) => [k, answers[`use_case_${k}`].noul])),
      form, formP, host, hostP, audience, audienceP,
      maturity: answers.maturity.score, docsQuality: answers.docs_quality.score,
      hasNumbers: answers.has_numbers.noul, looksTemplated: answers.looks_templated.noul,
      callsJevForReal: answers.calls_jev_for_real.noul,
      intents: Object.fromEntries(INTENTS.map((it) => [it, answers[`intent_${hashOf(it)}`].noul])),
    };
    if (calls % 25 === 0) { writeFileSync("data/jev.json", JSON.stringify(file, null, 1) + "\n"); console.log(`${calls} calls, ${tokens} tokens`); }
  }
  writeFileSync("data/jev.json", JSON.stringify(file, null, 1) + "\n");
  console.log(`done: ${calls} calls, ${tokens} input tokens, about $${((tokens / 1e6) * 0.042).toFixed(4)}`);
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e); process.exit(1); });
