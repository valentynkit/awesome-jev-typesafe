#!/usr/bin/env node
// README.<lang>.md from data/projects.json plus data/i18n/<lang>.json. Section names come from site/src/i18n/sections.<lang>.json.
// Anything not yet translated falls back to English, so the three files always list every entry.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

// Brackets in a name and a bare ) in a url both break the link they sit in.
const label = (s) => s.replace(/[[\]]/g, "");
const href = (s) => s.replace(/\)/g, "%29");
const line = (s) => s.replace(/\s+/g, " ").trim();

const optional = (path) => (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {});
const { sections, entries } = JSON.parse(readFileSync("data/projects.json", "utf8"));
const SITE = "https://awesomejev.vercel.app";
const HEAD = {
  zh: { name: "简体中文", note: "此文件由英文列表自动生成，请勿直接编辑。贡献请修改 [readme.md](readme.md)。", site: "网站", enSite: "英文网站" },
  ja: { name: "日本語", note: "このファイルは英語のリストから自動生成されています。直接編集せず、[readme.md](readme.md) に貢献してください。", site: "サイト", enSite: "英語サイト" },
  ko: { name: "한국어", note: "이 파일은 영어 목록에서 자동 생성됩니다. 직접 수정하지 말고 [readme.md](readme.md)에 기여해 주세요.", site: "사이트", enSite: "영어 사이트" },
};
const FILE = { zh: "README.zh-CN.md", ja: "README.ja.md", ko: "README.ko.md" };

for (const lang of Object.keys(HEAD)) {
  const tr = optional(`data/i18n/${lang}.json`);
  const names = optional(`site/src/i18n/sections.${lang}.json`);
  const head = HEAD[lang];
  const nav = `[English](readme.md) · [${head.site}](${SITE}/${lang}/) · [${head.enSite}](${SITE}/)`;
  const out = [`# Awesome Jev (${head.name})\n`, `> ${head.note}\n`, `${nav}\n`];
  for (const s of sections) {
    const list = entries.filter((e) => e.section === s.name);
    if (!list.length) continue;
    out.push(`## ${names[s.name] ?? s.name}\n`);
    let sub = null;
    for (const e of list) {
      if (e.subsection !== sub) { sub = e.subsection; if (sub) out.push(`### ${names[sub] ?? sub}\n`); }
      out.push(`- [${label(e.name)}](${href(e.url)}) - ${line(tr[e.id] ?? e.description)}`);
    }
    out.push("");
  }
  writeFileSync(FILE[lang], out.join("\n"));
  console.log(`${FILE[lang]}: ${entries.length} entries, ${Object.keys(tr).length} translated, ${Object.keys(names).length} section names`);
}
