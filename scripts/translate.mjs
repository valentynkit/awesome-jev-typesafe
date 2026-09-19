#!/usr/bin/env node
// Translations are written by hand in a Claude Code session, one file per language:
// data/i18n/zh.json, ja.json, ko.json map entry id to the translated one-liner.
// This script only says what is missing and records what was done.
//   node scripts/translate.mjs             counts per language
//   node scripts/translate.mjs --pending   JSON list of {id, section, en} needing work
//   node scripts/translate.mjs --finalize  write data/i18n/hashes.json for fully translated ids
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

export const LANGS = ["zh", "ja", "ko"];
export const hashOf = (s) => createHash("sha1").update(s).digest("hex").slice(0, 10);

export const GUIDE = `One sentence out for one sentence in; match the source register, terse and declarative, no added hedging. Keep unchanged: product and company names (Jev, TypeSafe, System One, Claude Code, Codex, Cursor, GitHub), the primitive names (Choice, Score, Noul), language and runtime names, code identifiers, file paths, model names, version strings, numbers, and units. Translate consistently: probability -> 概率/確率/확률; calibrated, calibration -> 校准/較正/보정; host agent -> 宿主智能体/ホストエージェント/호스트 에이전트; maintainer -> 维护者/メンテナ/관리자. Japanese: です/ます register, never だ/である, never keigo. Korean: formal 격식체 (-습니다/-입니다), never 해요체. Simplified Chinese: keep the glossary terms consistent.`;

// An entry is pending when any language lacks it or its description changed since it was recorded.
export const pending = (entries, files, hashes) =>
  entries.filter((e) => hashes[e.id] !== hashOf(e.description) || LANGS.some((l) => !files[l]?.[e.id]));

export const finalize = (entries, files, hashes) => {
  const next = { ...hashes };
  for (const e of entries) {
    if (LANGS.every((l) => files[l]?.[e.id])) next[e.id] = hashOf(e.description);
    else delete next[e.id];
  }
  return next;
};

const load = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {});

if (import.meta.url === `file://${process.argv[1]}`) {
  const { entries } = JSON.parse(readFileSync("data/projects.json", "utf8"));
  mkdirSync("data/i18n", { recursive: true });
  const files = Object.fromEntries(LANGS.map((l) => [l, load(`data/i18n/${l}.json`)]));
  const hashes = load("data/i18n/hashes.json");
  const todo = pending(entries, files, hashes);
  if (process.argv.includes("--pending")) {
    console.log(JSON.stringify(todo.map((e) => ({ id: e.id, section: e.section, en: e.description })), null, 1));
  } else if (process.argv.includes("--finalize")) {
    const next = finalize(entries, files, hashes);
    writeFileSync("data/i18n/hashes.json", JSON.stringify(next, null, 1) + "\n");
    console.log(`${Object.keys(next).length} of ${entries.length} entries translated in all languages, ${todo.length} pending before this run`);
  } else {
    for (const l of LANGS) console.log(`${l}: ${entries.filter((e) => files[l][e.id]).length} of ${entries.length}`);
    console.log(`${todo.length} pending; run with --pending to list them`);
  }
}
