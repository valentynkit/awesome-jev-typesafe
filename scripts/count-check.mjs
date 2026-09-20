#!/usr/bin/env node
// The entries badge in readme.md is static; fail when it disagrees with the number of entry lines.
// --fix rewrites the badge instead, which is what the sync workflow does after a merge.
import { readFileSync, writeFileSync } from "node:fs";
const md = readFileSync("readme.md", "utf8");
const n = (md.match(/^- \[[^\]]+\]\([^)]+\) - /gm) || []).length;
const badge = md.match(/badge\/entries-(\d+)-/);
if (badge && Number(badge[1]) === n) {
  console.log(`entries badge ok: ${n}`);
} else if (process.argv.includes("--fix") && badge) {
  writeFileSync("readme.md", md.replace(/badge\/entries-\d+-/, `badge/entries-${n}-`));
  console.log(`entries badge set to ${n}`);
} else {
  console.error(`entries badge says ${badge ? badge[1] : "nothing"}, readme has ${n}`);
  process.exit(1);
}
