import { test } from "node:test";
import assert from "node:assert/strict";
import { questionsFor, stateFor, META, USE_CASES, FORMS, HOSTS, AUDIENCES, INTENTS, hashOf } from "./tag-jev.mjs";

test("every use case is its own noul", () => {
  const q = questionsFor();
  for (const [k, , want] of USE_CASES) {
    assert.equal(q[`use_case_${k}`].type, "noul");
    assert.equal(q[`use_case_${k}`].instructions, `Is this project useful when you want to ${want}?`);
  }
});

test("form, host, and audience are choices over their key sets", () => {
  const q = questionsFor();
  for (const [name, rows] of [["form", FORMS], ["host", HOSTS], ["audience", AUDIENCES]]) {
    assert.equal(q[name].type, "choice");
    assert.deepEqual(Object.keys(q[name].criteria), rows.map(([k]) => k));
  }
  assert.ok(q.form.criteria.mcp_server);
  assert.ok(q.host.criteria.claude_code);
  assert.ok(q.audience.criteria.researchers);
});

test("maturity and docs quality are five-level scores", () => {
  const q = questionsFor();
  assert.equal(q.maturity.type, "score");
  assert.equal(q.maturity.criteria.length, 5);
  assert.equal(q.docs_quality.type, "score");
  assert.equal(q.docs_quality.criteria.length, 5);
});

test("the three quality checks are nouls", () => {
  const q = questionsFor();
  for (const k of ["has_numbers", "looks_templated", "calls_jev_for_real"]) assert.equal(q[k].type, "noul");
});

test("the question count is the use cases, the six fixed questions, the three checks, and the intents", () => {
  const q = questionsFor();
  for (const it of INTENTS) assert.equal(q[`intent_${hashOf(it)}`].type, "noul");
  assert.equal(Object.keys(q).length, USE_CASES.length + 3 + 2 + 3 + INTENTS.length);
});

test("keys are unique inside every set and intent hashes do not collide", () => {
  for (const rows of [USE_CASES, FORMS, HOSTS, AUDIENCES]) assert.equal(new Set(rows.map(([k]) => k)).size, rows.length);
  assert.equal(new Set(INTENTS.map(hashOf)).size, INTENTS.length);
});

test("meta carries a label for every key the site can meet", () => {
  for (const [rows, bucket] of [[USE_CASES, "useCases"], [FORMS, "forms"], [HOSTS, "hosts"], [AUDIENCES, "audiences"]]) {
    assert.deepEqual(Object.keys(META[bucket]), rows.map(([k]) => k));
    for (const [k, label] of rows) assert.equal(META[bucket][k], label);
  }
});

test("state carries the readme excerpt and the topics", () => {
  const s = stateFor({ name: "x", description: "Does y.", section: "S", subsection: null }, {
    stars: 12, pushedAt: "2026-09-01", language: "Go", topics: ["jev", "mcp"], readmeExcerpt: "Gates tool calls.",
  });
  assert.match(s, /12 stars/);
  assert.match(s, /Topics: jev, mcp/);
  assert.match(s, /Readme:\nGates tool calls\./);
});

test("state drops the github lines when the entry is not on github", () => {
  const s = stateFor({ name: "x", description: "Does y.", section: "S", subsection: "Sub" }, null);
  assert.equal(s, "Project: x\nListed under: S / Sub\nDescription: Does y.");
});

test("cache key changes when the readme changes and not otherwise", () => {
  const q = Object.keys(questionsFor());
  const cacheKey = (state) => hashOf(state + JSON.stringify(q));
  const base = { name: "x", description: "Does y.", section: "S", subsection: null };
  const a = stateFor(base, { stars: 12, pushedAt: "2026-09-01", language: "Go", readmeExcerpt: "one" });
  const b = stateFor(base, { stars: 12, pushedAt: "2026-09-01", language: "Go", readmeExcerpt: "two" });
  assert.equal(cacheKey(a), cacheKey(a));
  assert.notEqual(cacheKey(a), cacheKey(b));
});
