#!/usr/bin/env node
// readme.md -> data/projects.json. Throws on any line it cannot classify: that is the drift gate.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const PROSE = new Set(["Jev on one screen", "Know before you build"]);
const RESOURCE = new Set(["Start here", "Articles and talks"]);
const LIST = new Set(["Other lists"]);
const SKIP = new Set(["Contents", "Contributing", "Footnotes"]);
const ENTRY = /^- \[([^\]]+)\]\((\S+?)\) - (.+)$/;
const BANNER = /^<a href="([^"]+)"><img src="(media\/[^"]+)"[^>]*><\/a>$/;
const TILE = /<td[^>]*><a href="([^"]+)"><img src="(media\/[^"]+)"/;
const GITHUB = /^https:\/\/github\.com\/([^/]+)\/([^/#?]+)\/?$/;
const MAINTAINER = / By this list's maintainer\.$/;
const LANG_PHRASE = /\b(Chinese|Japanese|Korean) readme\b/i;
const CJK = /[぀-ヿ一-鿿가-힯]/;
const TRUST = /(vendor[- ]reported|independent replica|pre-registered|reports \d+ percent[^,.;]*)/i;

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function parseReadme(text) {
  const lines = text.split("\n");
  const entries = [];
  const sections = [];
  const gallery = [];
  let section = null, sub = null, banner = null, inTable = false, order = 0;
  const seen = new Map();

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const n = i + 1;
    if (line === "<table>") { inTable = true; return; }
    if (line === "</table>") { inTable = false; return; }
    if (inTable) { const m = line.match(TILE); if (m) gallery.push({ url: m[1], image: m[2] }); return; }
    if (line.startsWith("## ")) { section = { name: line.slice(3), image: null, subs: [] }; sections.push(section); sub = null; banner = null; return; }
    if (line.startsWith("### ")) { sub = line.slice(4); section.subs.push(sub); return; }
    const b = line.match(BANNER);
    if (b) { if (!section) return; banner = { url: b[1], image: b[2] }; if (!section.image) section.image = b[2]; return; }
    if (!line.startsWith("- ")) return;
    if (!section || SKIP.has(section.name) || PROSE.has(section.name)) {
      if (section && PROSE.has(section.name) && ENTRY.test(line)) throw new Error(`line ${n}: linked bullet inside prose section "${section.name}"`);
      return;
    }
    const m = line.match(ENTRY);
    if (!m) throw new Error(`line ${n}: cannot parse bullet in "${section.name}": ${line}`);
    let [, name, url, description] = m;
    if (seen.has(url)) throw new Error(`line ${n}: duplicate url ${url} (first at line ${seen.get(url)})`);
    seen.set(url, n);
    const maintainer = MAINTAINER.test(description);
    description = description.replace(MAINTAINER, "");
    const gh = url.match(GITHUB);
    const type = LIST.has(section.name) ? "list" : RESOURCE.has(section.name) ? "resource" : "project";
    const lang = description.match(LANG_PHRASE);
    entries.push({
      id: slug(gh ? gh[2] : name), name, url,
      owner: gh ? gh[1] : null, repo: gh ? gh[2] : null,
      description, section: section.name, subsection: sub, order: order++, type,
      image: banner && banner.url === url ? banner.image : null,
      maintainer,
      languageHint: lang ? `${lang[1][0].toUpperCase()}${lang[1].slice(1).toLowerCase()} readme` : CJK.test(name) ? "Non-Latin title" : null,
      trustPhrase: (description.match(TRUST) || [null])[0],
      line: n,
    });
  });

  // id collisions are distinct projects: append owner, or a counter for non-GitHub urls
  const byId = new Map();
  for (const e of entries) byId.set(e.id, [...(byId.get(e.id) || []), e]);
  for (const group of byId.values()) if (group.length > 1) group.forEach((e, k) => { e.id = `${e.id}-${e.owner ? slug(e.owner) : k + 1}`; });

  for (const g of gallery) {
    const hit = entries.find((e) => e.url === g.url);
    if (!hit) throw new Error(`gallery tile ${g.url} has no matching body entry`);
    if (!hit.image) hit.image = g.image;
  }
  return { entries, sections: sections.filter((s) => !SKIP.has(s.name)), gallery };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { entries, sections, gallery } = parseReadme(readFileSync("readme.md", "utf8"));
  mkdirSync("data", { recursive: true });
  writeFileSync("data/projects.json", JSON.stringify({ sections, gallery, entries }, null, 2) + "\n");
  console.log(`${entries.length} entries, ${sections.length} sections, ${gallery.length} gallery tiles`);
}
