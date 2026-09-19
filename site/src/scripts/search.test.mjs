import { test } from "node:test";
import assert from "node:assert/strict";
import { buildIndex, applyFacets, expandQuery, facetCounts, facetValue, matchIntent, sortDocs } from "./search-core.mjs";

const docs = [
  { id: "a", name: "fast-jev-compaction", description: "Replaces the compaction summary with Jev decisions.", section: "Coding agents", host: "Claude Code", language: "TypeScript", license: "MIT", stars: 50, starsBucket: "10-100", hasMedia: false, maintainer: false, intents: { "compact context": 0.9 }, useCases: ["context_compaction", "tool_gating"], form: "hook_or_plugin" },
  { id: "b", name: "jev-router", description: "Routes each task to the cheapest model.", section: "Coding agents", host: "Claude Code", language: "Python", license: "MIT", stars: 5, starsBucket: "0-10", hasMedia: true, maintainer: true, intents: { "route between models": 0.95 }, useCases: ["model_routing", "tool_gating"], form: "cli" },
];

test("text search finds compaction first", () => {
  const idx = buildIndex(docs);
  assert.equal(idx.search("compaction")[0].id, "a");
});

test("facets AND together", () => {
  assert.deepEqual(applyFacets(docs, { language: ["Python"], maintainer: ["yes"] }).map((d) => d.id), ["b"]);
});

test("an empty facet list does not filter", () => {
  assert.equal(applyFacets(docs, { language: [] }).length, 2);
});

test("intent match ranks by precomputed probability", () => {
  const hit = matchIntent("how do I route between models", ["compact context", "route between models"]);
  assert.equal(hit, "route between models");
});

test("no intent matches an unrelated query", () => {
  assert.equal(matchIntent("robot arm simulator", ["compact context", "route between models"]), null);
});

test("sort by stars puts the bigger repo first", () => {
  assert.deepEqual(sortDocs(docs, "stars").map((d) => d.id), ["a", "b"]);
});

test("a synonym word expands to an OR subquery", () => {
  assert.deepEqual(expandQuery("router"), { queries: ["router", "routing", "route"], combineWith: "OR" });
});

test("two words AND together, synonyms expanded in place", () => {
  assert.deepEqual(expandQuery("stop hook"), {
    combineWith: "AND",
    queries: ["stop", { queries: ["hook", "hooks"], combineWith: "OR" }],
  });
});

test("a plain word stays a plain query", () => {
  assert.equal(expandQuery("drone"), "drone");
});

test("compaction also finds the repo that says pruning", () => {
  const idx = buildIndex([
    { id: "a", name: "fast-jev-compaction", description: "Rewrites the compaction summary.", section: "Coding agents" },
    { id: "b", name: "jev-prune", description: "Context pruning driven by Jev.", section: "Coding agents" },
  ]);
  assert.deepEqual(idx.search(expandQuery("compaction")).map((r) => r.id).sort(), ["a", "b"]);
});

test("subsection text is searchable", () => {
  const idx = buildIndex([
    { id: "a", name: "jev-thing", description: "Does a thing.", section: "Coding agents", subsection: "Sandboxing" },
    { id: "b", name: "jev-other", description: "Does another thing.", section: "Coding agents", subsection: "Routing" },
  ]);
  assert.deepEqual(idx.search("sandboxing").map((r) => r.id), ["a"]);
});

test("facet counts ignore that facet's own selection", () => {
  const counts = facetCounts(docs, { language: ["Python"] }, "language");
  assert.equal(counts.get("Python"), 1);
  assert.equal(counts.get("TypeScript"), 1);
});

test("facet counts follow the other facets", () => {
  const counts = facetCounts(docs, { maintainer: ["yes"] }, "language");
  assert.equal(counts.get("Python"), 1);
  assert.equal(counts.get("TypeScript"), undefined);
});

test("a use case facet matches a doc that holds it among several", () => {
  assert.deepEqual(applyFacets(docs, { useCase: ["model_routing"] }).map((d) => d.id), ["b"]);
  assert.deepEqual(applyFacets(docs, { useCase: ["tool_gating"] }).map((d) => d.id), ["a", "b"]);
});

test("several chips of a multi-valued facet are any of, not all of", () => {
  assert.deepEqual(applyFacets(docs, { useCase: ["model_routing", "context_compaction"] }).map((d) => d.id), ["a", "b"]);
});

test("a doc with no use cases drops out of every use case chip", () => {
  const bare = [...docs, { id: "c", name: "plain", description: "No tags yet.", section: "Data and ops" }];
  assert.deepEqual(applyFacets(bare, { useCase: ["tool_gating"] }).map((d) => d.id), ["a", "b"]);
  assert.deepEqual(facetValue(bare[2], "useCase"), []);
});

test("counts for a multi-valued facet count a doc once per value", () => {
  const counts = facetCounts(docs, {}, "useCase");
  assert.equal(counts.get("tool_gating"), 2);
  assert.equal(counts.get("model_routing"), 1);
  assert.equal(counts.get("context_compaction"), 1);
});

test("a multi-valued facet count still follows the other facets", () => {
  const counts = facetCounts(docs, { language: ["Python"] }, "useCase");
  assert.equal(counts.get("tool_gating"), 1);
  assert.equal(counts.get("context_compaction"), undefined);
});

test("form stays a single-valued facet", () => {
  assert.deepEqual(applyFacets(docs, { form: ["cli"] }).map((d) => d.id), ["b"]);
  assert.equal(facetCounts(docs, {}, "form").get("hook_or_plugin"), 1);
});
