#!/usr/bin/env node
// The entries badge in readme.md is static; fail when it disagrees with the number of entry lines.
import { readFileSync } from "node:fs";
const md = readFileSync("readme.md", "utf8");
const n = (md.match(/^- \[[^\]]+\]\([^)]+\) - /gm) || []).length;
const badge = md.match(/badge\/entries-(\d+)-/);
if (!badge || Number(badge[1]) !== n) {
  console.error(`entries badge says ${badge ? badge[1] : "nothing"}, readme has ${n}`);
  process.exit(1);
}
console.log(`entries badge ok: ${n}`);
