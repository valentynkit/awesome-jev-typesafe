import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const projects = JSON.parse(readFileSync(new URL("../../../data/projects.json", import.meta.url)));

test("data has sections and entries", () => {
  assert.ok(projects.entries.length > 300);
  assert.ok(projects.sections.some((s) => s.name === "Coding agents"));
});

test("every gallery tile matches an entry url", () => {
  const urls = new Set(projects.entries.map((e) => e.url));
  for (const g of projects.gallery) assert.ok(urls.has(g.url), g.url);
});

test("entry ids are unique", () => {
  const ids = projects.entries.map((e) => e.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("the home page category grid drops prose and reading sections", () => {
  const skipped = ["Jev on one screen", "Know before you build", "Start here", "Articles and talks", "Other lists"];
  const withProjects = projects.sections
    .map((s) => s.name)
    .filter((n) => !skipped.includes(n))
    .filter((n) => projects.entries.some((e) => e.section === n && e.type === "project"));
  assert.equal(withProjects.length, 16);
  for (const n of skipped) assert.ok(!withProjects.includes(n), n);
});

test("card images come from media we host, never from opengraph.githubassets", () => {
  const src = readFileSync(new URL("./data.ts", import.meta.url), "utf8");
  const body = src.slice(src.indexOf("export const image ="), src.indexOf("export const newSince"));
  assert.ok(!body.includes("ogImage"), "image() still falls back to the GitHub social card");
});
