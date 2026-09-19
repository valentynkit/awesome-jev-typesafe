import { test } from "node:test";
import assert from "node:assert/strict";
import { toMeta, batches, excerpt, repoQuery } from "./enrich-github.mjs";

test("maps a GraphQL repository node", () => {
  const m = toMeta({
    stargazerCount: 5,
    forkCount: 1,
    pushedAt: "2026-09-01T00:00:00Z",
    createdAt: "2026-08-01T00:00:00Z",
    primaryLanguage: { name: "Rust" },
    licenseInfo: { spdxId: "MIT" },
    isArchived: false,
    openGraphImageUrl: "https://x/og.png",
    repositoryTopics: { nodes: [{ topic: { name: "jev" } }] },
    description: "d",
    homepageUrl: "",
  });
  assert.equal(m.language, "Rust");
  assert.equal(m.license, "MIT");
  assert.deepEqual(m.topics, ["jev"]);
  assert.equal(m.homepage, null);
});

test("maps a node with every optional field missing", () => {
  const m = toMeta({ stargazerCount: 0, forkCount: 0, pushedAt: null, createdAt: null, isArchived: true });
  assert.equal(m.language, null);
  assert.equal(m.license, null);
  assert.equal(m.ogImage, null);
  assert.deepEqual(m.topics, []);
  assert.equal(m.description, null);
  assert.equal(m.archived, true);
});

test("batches of 50", () => {
  assert.equal(batches(Array.from({ length: 120 }), 50).length, 3);
  assert.equal(batches([], 50).length, 0);
});

test("readme text becomes an excerpt on the meta", () => {
  const m = toMeta({ stargazerCount: 0, forkCount: 0, isArchived: false, readme: { text: "# jev-thing\n\nRoutes tasks.\n" } });
  assert.equal(m.readmeExcerpt, "jev-thing\nRoutes tasks.");
});

test("a repo with no readme has no excerpt key", () => {
  assert.equal("readmeExcerpt" in toMeta({ stargazerCount: 0, forkCount: 0, isArchived: false }), false);
});

test("excerpt strips badges, images, html, and code fences", () => {
  const md = [
    "# Title",
    "",
    "[![build](https://img.shields.io/x.svg)](https://ci.example/x)",
    "![screenshot](docs/shot.png)",
    "<p align=\"center\">centered</p>",
    "",
    "Gates tool calls with [Jev](https://typesafe.ai).",
    "",
    "```bash",
    "npm i jev-gate",
    "```",
    "",
    "Done.",
  ].join("\n");
  assert.equal(excerpt(md), "Title\ncentered\nGates tool calls with Jev.\nDone.");
});

test("excerpt keeps reference link text and drops the definitions", () => {
  assert.equal(excerpt("[![ci][badge]][ci]\nSee [the docs][docs].\n\n[docs]: https://example.com\n"), "See the docs.");
});

test("excerpt caps at 900 characters", () => {
  assert.equal(excerpt("word ".repeat(400)).length, 900);
});

test("readme batches are 25 wide", () => {
  assert.equal(batches(Array.from({ length: 120 }), 25).length, 5);
});

test("the repo query asks for the readme blob once per repo", () => {
  const q = repoQuery(["a/b", "c/d"], 'x readme: object(expression:"HEAD:README.md"){... on Blob{text}}');
  assert.match(q, /r0: repository\(owner:"a", name:"b"\)/);
  assert.match(q, /r1: repository\(owner:"c", name:"d"\)/);
  assert.equal(q.match(/HEAD:README\.md/g).length, 2);
});
