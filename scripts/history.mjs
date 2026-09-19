#!/usr/bin/env node
// Keeps data/history.json: firstSeen date per entry id. --seed reads the date each url first appeared in git history.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const projects = JSON.parse(readFileSync("data/projects.json", "utf8"));
const path = "data/history.json";
const history = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : { firstSeen: {} };
const today = new Date().toISOString().slice(0, 10);

for (const e of projects.entries) {
  if (history.firstSeen[e.id]) continue;
  let date = today;
  if (process.argv.includes("--seed")) {
    const out = execFileSync("git", ["log", "--format=%aI", "--reverse", "-S", e.url, "--", "readme.md"], { encoding: "utf8" }).trim();
    if (out) date = out.split("\n")[0].slice(0, 10);
  }
  history.firstSeen[e.id] = date;
}
writeFileSync(path, JSON.stringify(history, null, 2) + "\n");
console.log(`${Object.keys(history.firstSeen).length} ids in history`);
