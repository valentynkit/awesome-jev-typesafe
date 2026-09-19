# Awesome Jev Directory Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, from the hand-written `readme.md`, a data pipeline, a README face-lift with honest badges, an Astro directory site on Vercel with instant search, insights, i18n, machine endpoints, and Jev-powered tagging plus browser-only reranking.

**Architecture:** `readme.md` is the only hand-edited source. `scripts/parse-readme.mjs` turns it into `data/projects.json` and fails on drift. Daily CI enriches with GitHub GraphQL, tags with Jev, translates with Claude, and commits `data/`. The Astro site in `site/` reads `data/` at build; one endpoint (`/api/rerank`) runs as a Vercel Function.

**Tech Stack:** Node 22+ (no deps for scripts except `@anthropic-ai/sdk`), Astro 7 + `@astrojs/vercel` + `@astrojs/sitemap`, MiniSearch, satori + `@resvg/resvg-js` for OG images, fontsource fonts, plain CSS custom properties, `node --test`.

Spec: `docs/superpowers/specs/2026-09-19-directory-site-design.md`. Deviation from spec, decided during planning: the rerank endpoint uses an in-process rate limiter (per function instance) plus a daily cap, and a Vercel Firewall rate-limit rule where the plan allows. Upstash is the upgrade path if abuse shows up; adding a marketplace integration needs an interactive terms acceptance the executor cannot do.

Facts the executor must not rediscover:

- The README file is `readme.md` (lowercase). `git log -- README.md` returns nothing on this case-insensitive disk.
- Entry line shape: `- [name](url) - Sentence.` Sections `## `, subsections `### `. Section banners are single lines `<a href="URL"><img src="media/FILE" ...></a>`. Gallery is a `<table>` at the top with `<td align="center"><a href="URL"><img src="media/FILE" ...>`.
- Prose-only sections: "Jev on one screen", "Know before you build". Resource sections: "Start here", "Articles and talks" (+ its H3s). List section: "Other lists". "Contents", "Contributing", "Footnotes" are not entry sections.
- Maintainer marker: description ends with ` By this list's maintainer.`
- Jev API: `POST https://api.typesafe.ai/v1/systemone`, `Authorization: Bearer`, body `{model:"jev-latest", state, questions}`; question `{type:"choice"|"score"|"noul", instructions, criteria}` where choice criteria is `{key: desc}`, score criteria is `[level0, level1, ...]`, noul criteria is `{yes, no}` optional. Answers: choice `{choice, probabilities:{key:p}, confidence}`, score `{score, probabilities, confidence}`, noul `{noul}`. Retry on 429 and 529 with backoff.
- Claude: `@anthropic-ai/sdk`, `client.messages.create({model:"claude-opus-5", max_tokens, messages, output_config:{format:{type:"json_schema", schema}}})`; the model returns JSON text in the first text block.
- Pinned action SHAs: `actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1` (v7.0.1), `actions/setup-node@820762786026740c76f36085b0efc47a31fe5020` (v7.0.0), `lycheeverse/lychee-action@e7477775783ea5526144ba13e8db5eec57747ce8` (v2.9.0).
- Vercel: personal team scope `valentyn-kit`. `vercel` CLI 54 is installed and logged in. Root Directory must be `site`.
- Package versions at planning time: astro 7.3.3, @astrojs/vercel 11.0.10, minisearch 7.2.0, satori 0.127.0, @resvg/resvg-js 2.6.2, @anthropic-ai/sdk 0.33.4, awesome-lint 2.3.0.
- Palette (dark / light): canvas `#0B0E11`/`#F4F6F8`, surface `#12161B`/`#FFFFFF`, text `#E8EDF2`/`#14181D`, muted `#7C8791`/`#5B6670`, accent `#4CC9F0`/`#0E8FB5`, accent-2 `#FFB454`/`#B8690A`, danger `#FF5D5D`/`#C43030`.

---

## File map

```
readme.md                                   hand-edited source (Track A edits header)
README.zh-CN.md README.ja.md README.ko.md   generated (C7)
SKILL.md                                    hand-written agent skill (A5)
.lycheeignore                               (A3)
.github/workflows/check.yml links.yml data.yml dependabot.yml
media/banner-dark.svg banner-light.svg      (A1)
scripts/parse-readme.mjs   + .test.mjs      README -> data/projects.json (T0)
scripts/history.mjs                         data/history.json firstSeen per id (T0)
scripts/enrich-github.mjs  + .test.mjs      data/github.json (C1)
scripts/tag-jev.mjs        + .test.mjs      data/jev.json (C2)
scripts/translate.mjs      + .test.mjs      data/i18n/{zh,ja,ko}.json (C3)
scripts/build-readme-i18n.mjs               README.<lang>.md (C4)
scripts/jev-client.mjs                      shared fetch with backoff (C2)
data/projects.json github.json jev.json history.json i18n/  committed
site/package.json astro.config.mjs tsconfig.json vercel.json
site/src/lib/data.ts        loads data/, joins, facets, slugs
site/src/lib/i18n.ts + site/src/i18n/{en,zh,ja,ko}.json
site/src/lib/charts.ts      SVG string builders
site/src/lib/og.ts          satori card
site/src/styles/global.css  theme tokens, layout, components
site/src/layouts/Base.astro
site/src/components/Header.astro Footer.astro Card.astro Bar.astro Gauge.astro SearchBox.astro
site/src/scripts/search.ts  MiniSearch island logic (plain module)
site/src/pages/[...lang]/index.astro insights.astro lists.astro about.astro
site/src/pages/[...lang]/c/[slug].astro
site/src/pages/[...lang]/p/[id].astro
site/src/pages/projects.json.ts llms.txt.ts llms-full.txt.ts skill.md.ts feed.xml.ts
site/src/pages/p/[id].md.ts c/[slug].md.ts og/[id].png.ts
site/src/pages/api/rerank.ts                Vercel Function
site/public/robots.txt favicon.svg
```

---

## Track 0: parser and data (prerequisite for all tracks)

### Task 0.1: Parser test fixtures

**Files:**
- Create: `scripts/parse-readme.test.mjs`

- [ ] **Step 1: Write the failing tests**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseReadme } from "./parse-readme.mjs";

const fixture = `# Awesome Jev [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

Lede.

<table>
  <tr>
    <td align="center"><a href="https://github.com/a/one"><img src="media/one.png" width="300" alt="one"><br><sub>one</sub></a></td>
  </tr>
</table>

## Contents

- [Jev on one screen](#jev-on-one-screen)
- [Coding agents](#coding-agents)
  - [Pi](#pi)

## Jev on one screen

- Endpoint: \`POST https://api.typesafe.ai/v1/systemone\`.

## Start here

- [Docs](https://docs.typesafe.ai/) - The docs.

## Coding agents

<a href="https://github.com/a/one"><img src="media/one.png" width="600" alt="one banner"></a>

### Pi

- [one](https://github.com/a/one) - Does one thing. By this list's maintainer.
- [pi-jev by x](https://github.com/x/pi-jev) - First pi-jev.
- [pi-jev by y](https://github.com/y/pi-jev) - Second pi-jev; Chinese readme.

## Other lists

- [awesome-jev by z](https://github.com/z/awesome-jev) - Another list.

## Contributing

Read contributing.md.
`;

test("parses entries with section, subsection, type, order", () => {
  const { entries } = parseReadme(fixture);
  assert.equal(entries.length, 5);
  const one = entries.find((e) => e.name === "one");
  assert.equal(one.section, "Coding agents");
  assert.equal(one.subsection, "Pi");
  assert.equal(one.type, "project");
  assert.equal(one.owner, "a");
  assert.equal(one.repo, "one");
  assert.equal(one.maintainer, true);
  assert.equal(one.description, "Does one thing.");
  assert.equal(one.image, "media/one.png");
  assert.equal(entries.find((e) => e.name === "Docs").type, "resource");
  assert.equal(entries.find((e) => e.section === "Other lists").type, "list");
});

test("collisions get owner suffix, never dedupe", () => {
  const { entries } = parseReadme(fixture);
  const ids = entries.filter((e) => e.repo === "pi-jev").map((e) => e.id).sort();
  assert.deepEqual(ids, ["pi-jev-x", "pi-jev-y"]);
});

test("language hint from phrase", () => {
  const { entries } = parseReadme(fixture);
  assert.equal(entries.find((e) => e.id === "pi-jev-y").languageHint, "Chinese readme");
});

test("gallery tiles must match a body entry", () => {
  const bad = fixture.replace("https://github.com/a/one\"><img src=\"media/one.png\" width=\"300\"", "https://github.com/nobody/x\"><img src=\"media/one.png\" width=\"300\"");
  assert.throws(() => parseReadme(bad), /gallery/);
});

test("unparseable bullet in an entry section throws with line number", () => {
  const bad = fixture.replace("- [one](https://github.com/a/one) - Does one thing. By this list's maintainer.", "- one without a link");
  assert.throws(() => parseReadme(bad), /line \d+/);
});

test("duplicate url throws", () => {
  const bad = fixture + "\n## Command line\n\n- [dup](https://github.com/a/one) - Duplicate.\n";
  assert.throws(() => parseReadme(bad), /duplicate url/i);
});

test("sections carry banners and gallery order", () => {
  const { sections, gallery } = parseReadme(fixture);
  assert.equal(sections.find((s) => s.name === "Coding agents").image, "media/one.png");
  assert.deepEqual(gallery, [{ url: "https://github.com/a/one", image: "media/one.png" }]);
});
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test scripts/parse-readme.test.mjs`
Expected: fails, `Cannot find module './parse-readme.mjs'`.

### Task 0.2: Parser implementation

**Files:**
- Create: `scripts/parse-readme.mjs`

- [ ] **Step 1: Implement**

```js
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
    if (b) { banner = { url: b[1], image: b[2] }; if (!section.image) section.image = b[2]; return; }
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
    description = description.replace(MAINTAINER, ".").replace(/\.\.$/, ".");
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

  // id collisions: append owner (or a counter for non-GitHub)
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
  writeFileSync("data/projects.json", JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), sections, gallery, entries }, null, 2) + "\n");
  console.log(`${entries.length} entries, ${sections.length} sections, ${gallery.length} gallery tiles`);
}
```

- [ ] **Step 2: Run tests**

Run: `node --test scripts/parse-readme.test.mjs`
Expected: 7 pass.

- [ ] **Step 3: Run on the real README**

Run: `node scripts/parse-readme.mjs && node -e 'const d=require("./data/projects.json");console.log(d.entries.length, d.entries.filter(e=>e.owner).length, d.entries.filter(e=>e.type==="project").length, d.entries.filter(e=>e.maintainer).length)'`
Expected: `348 entries, ...` then `348 277 266 5`. If it throws, the README line it names is a real drift; fix the README line (keep format) or the regex, not both.

- [ ] **Step 4: Commit**

```bash
git add scripts/parse-readme.mjs scripts/parse-readme.test.mjs data/projects.json
git commit -m "Parse readme.md into data/projects.json and fail on drift"
```

### Task 0.3: First-seen history

**Files:**
- Create: `scripts/history.mjs`

- [ ] **Step 1: Implement**

```js
#!/usr/bin/env node
// Keeps data/history.json: firstSeen date per entry id. Seeds from git history once, then adds new ids with today's date.
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
```

- [ ] **Step 2: Seed and commit**

Run: `node scripts/history.mjs --seed && node -e 'const h=require("./data/history.json");const c={};for(const d of Object.values(h.firstSeen))c[d]=(c[d]||0)+1;console.log(c)'`
Expected: counts spread over 2026-09-18 and 2026-09-19.

```bash
git add scripts/history.mjs data/history.json
git commit -m "Track first-seen date per entry"
```

### Task 0.4: Root package.json and check workflow

**Files:**
- Create: `package.json` (repo root, scripts only), `.github/workflows/check.yml`, `.github/dependabot.yml`
- Modify: `.gitignore` (create)

- [ ] **Step 1: Root package.json**

```json
{
  "name": "awesome-jev-typesafe",
  "private": true,
  "type": "module",
  "scripts": {
    "parse": "node scripts/parse-readme.mjs && node scripts/history.mjs",
    "test": "node --test scripts/*.test.mjs",
    "lint": "npx awesome-lint",
    "count-check": "node -e \"const n=(require('fs').readFileSync('readme.md','utf8').match(/^- \\\\[.+\\\\]\\\\(.+\\\\) - /gm)||[]).length;const b=require('fs').readFileSync('readme.md','utf8').match(/entries-(\\\\d+)-/);if(!b||+b[1]!==n){console.error('entries badge says',b&&b[1],'readme has',n);process.exit(1)}console.log('entries badge ok',n)\""
  }
}
```

- [ ] **Step 2: `.gitignore`**

```
node_modules/
site/dist/
site/.vercel/
site/.astro/
.env
```

- [ ] **Step 3: `.github/workflows/check.yml`**

```yaml
name: check
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version: 22
      - run: npm run parse
      - run: npm test
      - run: npm run count-check
      - name: Parsed entries must match committed data
        run: git diff --exit-code -- data/projects.json || (echo "::error::data/projects.json is stale, run npm run parse and commit" && exit 1)
```

- [ ] **Step 4: `.github/dependabot.yml`**

```yaml
version: 2
updates:
  - package-ecosystem: github-actions
    directory: /
    schedule: { interval: weekly }
  - package-ecosystem: npm
    directory: /site
    schedule: { interval: weekly }
    groups:
      all: { patterns: ["*"] }
```

- [ ] **Step 5: Run locally and commit**

Run: `npm run parse && npm test && npm run count-check`
Expected: parse ok, tests pass, count-check fails until Task A2 adds the badge. That is fine now; commit anyway, A2 fixes it.

```bash
git add package.json .gitignore .github/workflows/check.yml .github/dependabot.yml
git commit -m "Add check workflow: parser drift gate, tests, entries badge check"
```

The `generatedAt` field in `data/projects.json` changes daily and would trip the stale check. Fix now: in `parse-readme.mjs` drop `generatedAt` from the output (the daily workflow commit date is the timestamp). Re-run parse, amend the earlier data commit is unnecessary, just commit the change.

---

## Track A: README face-lift

### Task A1: Banner SVGs

**Files:**
- Create: `media/banner-dark.svg`, `media/banner-light.svg`

- [ ] **Step 1: Write both SVGs**

`media/banner-dark.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="300" viewBox="0 0 1200 300" role="img" aria-label="Awesome Jev: typed decisions, System One">
  <rect width="1200" height="300" fill="#0B0E11"/>
  <g stroke="#1E262E" stroke-width="1">
    <path d="M0 60H1200M0 120H1200M0 180H1200M0 240H1200"/>
  </g>
  <g fill="#E8EDF2" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">
    <text x="72" y="130" font-size="64" font-weight="700" letter-spacing="-2">Awesome Jev</text>
    <text x="72" y="178" font-size="24" fill="#7C8791">Typed decisions with TypeSafe's Jev, the first System One model</text>
    <text x="72" y="226" font-size="20" fill="#4CC9F0">state in, calibrated probabilities out, no text to parse</text>
  </g>
  <g transform="translate(900 80)">
    <circle cx="90" cy="90" r="82" fill="none" stroke="#1E262E" stroke-width="10"/>
    <path d="M90 90 m-82 0 a82 82 0 1 1 116 58" fill="none" stroke="#4CC9F0" stroke-width="10" stroke-linecap="round"/>
    <line x1="90" y1="90" x2="146" y2="36" stroke="#FFB454" stroke-width="6" stroke-linecap="round"/>
    <circle cx="90" cy="90" r="8" fill="#FFB454"/>
    <text x="90" y="150" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="18" fill="#E8EDF2">p = 0.93</text>
  </g>
</svg>
```

`media/banner-light.svg`: same markup with `#0B0E11`→`#F4F6F8`, `#1E262E`→`#D9DEE3`, `#E8EDF2`→`#14181D`, `#7C8791`→`#5B6670`, `#4CC9F0`→`#0E8FB5`, `#FFB454`→`#B8690A`.

- [ ] **Step 2: Check rendering**

Run: `qlmanage -p media/banner-dark.svg >/dev/null 2>&1 || open media/banner-dark.svg` (visual check), then `git add media/banner-*.svg && git commit -m "Add dark and light README banners"`.

### Task A2: README header

**Files:**
- Modify: `readme.md:1-6`

- [ ] **Step 1: Replace lines 1 through 5 (H1, lede, blank) with**

```markdown
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="media/banner-dark.svg">
  <img src="media/banner-light.svg" alt="Awesome Jev: typed decisions, System One" width="100%">
</picture>

# Awesome Jev [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[![Lint](https://github.com/valentynkit/awesome-jev-typesafe/actions/workflows/lint.yml/badge.svg)](https://github.com/valentynkit/awesome-jev-typesafe/actions/workflows/lint.yml)
[![Links](https://github.com/valentynkit/awesome-jev-typesafe/actions/workflows/links.yml/badge.svg)](https://github.com/valentynkit/awesome-jev-typesafe/actions/workflows/links.yml)
[![Entries](https://img.shields.io/badge/entries-348-4CC9F0?style=flat-square&labelColor=0B0E11)](#contents)
[![Last commit](https://img.shields.io/github/last-commit/valentynkit/awesome-jev-typesafe?style=flat-square&labelColor=0B0E11&color=E8EDF2)](https://github.com/valentynkit/awesome-jev-typesafe/commits/main)
[![License](https://img.shields.io/github/license/valentynkit/awesome-jev-typesafe?style=flat-square&labelColor=0B0E11&color=E8EDF2)](license)

[Search the site](https://awesomejev.vercel.app) · [Categories](#contents) · [Contribute](contributing.md) · [Agent skill](SKILL.md) · [llms.txt](https://awesomejev.vercel.app/llms.txt) · [中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

> [!TIP]
> Agents can install this list as a skill: `npx skills add valentynkit/awesome-jev-typesafe`. It teaches them to fetch [projects.json](https://awesomejev.vercel.app/projects.json) once and filter locally.

Typed decisions from TypeSafe's Jev, the first System One model: state in, calibrated probabilities out, no text to parse.

Jev does not write. You hand it some state and a list of typed questions, and it answers each one with a probability, a pick from options you defined, or a position on a scale you defined. One request, about 100 ms, $0.042 per million input tokens, output free, every question scored in parallel. This list is where people are putting that to work, sorted by what you would install.
```

Keep the existing `<table>` gallery and everything after it unchanged. The "Live site" badge is added in Task B12 after the URL resolves. The translated README links point at files Task C4 generates; until then they 404 on GitHub, which is acceptable for a few hours.

- [ ] **Step 2: Lint and count-check**

Run: `npx awesome-lint && npm run count-check`
Expected: awesome-lint reports only `awesome-git-repo-age`. If it reports a heading error, move the `<picture>` block to directly after the H1 instead and re-run. count-check prints `entries badge ok 369`.

- [ ] **Step 3: Commit**

```bash
git add readme.md && git commit -m "Add banner, status badges, nav line, and agent-skill tip to the README header"
```

### Task A3: Link check workflow

**Files:**
- Create: `.github/workflows/links.yml`, `.lycheeignore`

- [ ] **Step 1: Workflow**

```yaml
name: links
on:
  pull_request:
    paths: [readme.md, README.*.md]
  schedule:
    - cron: "0 6 * * 1"
  workflow_dispatch:
permissions:
  contents: read
jobs:
  lychee:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false
      - uses: lycheeverse/lychee-action@e7477775783ea5526144ba13e8db5eec57747ce8 # v2.9.0
        with:
          args: --no-progress --max-concurrency 8 --accept 200,203,206,301,302,307,308,429 readme.md README.*.md
          fail: true
```

- [ ] **Step 2: `.lycheeignore`**

```
https://x.com/
https://twitter.com/
https://www.linkedin.com/
https://discord.gg/
```

- [ ] **Step 3: Local dry run and commit**

Run: `brew list lychee >/dev/null 2>&1 || brew install lychee; lychee --no-progress --accept 200,203,206,301,302,307,308,429 readme.md | tail -5`
Expected: summary line with errors count. Note any dead link in the commit message body; do not edit entries in this task.

```bash
git add .github/workflows/links.yml .lycheeignore && git commit -m "Check links weekly and on README pull requests"
```

### Task A4: System 1 vs System 2 table in our voice

**Files:**
- Modify: `readme.md` section "Jev on one screen" (first line after the heading's intro sentence)

- [ ] **Step 1: Insert after the sentence "Copied from the vendor's pages..." and before the bullets**

```markdown
| | Chat model | Jev |
| --- | --- | --- |
| Output | Text you parse | A probability, a pick, or a scale position, per question |
| Latency | Seconds | 70 to 500 ms, vendor reported |
| Price | Dollars per million tokens | $0.042 per million input tokens, output free |
| Hallucination | Any string | Only values you defined; still confidently wrong at times |
| Fits | Planning, writing, open answers | Routing, gating, ranking, judging, anything with a finite answer |
```

- [ ] **Step 2: Lint and commit**

Run: `npx awesome-lint`
Expected: only the repo-age warning.

```bash
git add readme.md && git commit -m "Add a chat model versus Jev table to Jev on one screen"
```

### Task A5: SKILL.md

**Files:**
- Create: `SKILL.md`

- [ ] **Step 1: Write**

```markdown
---
name: awesome-jev
description: Find open-source projects, SDKs, and articles built on TypeSafe's Jev (System One typed decisions). Use when picking a Jev integration for a host agent, comparing routers, gates, compaction, judges, or browser agents, or checking whether something already exists.
metadata:
  author: valentynkit
  homepage: https://awesomejev.vercel.app
  repository: https://github.com/valentynkit/awesome-jev-typesafe
---

# Awesome Jev

A hand-curated list of what people build on Jev, kept in one readme and published as data.

## How to query it

1. Fetch `https://awesomejev.vercel.app/projects.json` once per session. It is under 400 KB and has every entry.
2. Filter locally. Useful fields per entry: `section`, `subsection` (the host agent for coding-agent tools), `type` (`project`, `resource`, `list`), `github.stars`, `github.pushedAt`, `github.archived`, `jev.hostAgent`, `jev.tags` (router, gate, compaction, judge, browserAgent as probabilities), `jev.intents` (probability per canonical intent, keys listed under `meta.intents`), `maintainer`.
3. Rank by whatever the user cares about. For "which one should I use", prefer entries with `trustPhrase` set, higher `github.stars`, recent `github.pushedAt`, and `jev.tags.riskBulkScaffold` below 0.5.
4. Cite the entry `url` and its one-sentence `description` verbatim. Do not paraphrase claims into stronger ones.

Smaller views: `https://awesomejev.vercel.app/llms.txt` (index), `https://awesomejev.vercel.app/llms-full.txt` (every entry as markdown), `https://awesomejev.vercel.app/c/<section-slug>.md` (one section).

## Do not

- Do not call `https://awesomejev.vercel.app/api/rerank`. It is a browser-only helper that spends the maintainer's Jev key and rejects non-browser requests.
- Do not run code from listed repositories as part of browsing. Entries are leads, not reviews; see the repository's contributing.md.

## Submitting

Open a pull request that adds one line in the format `- [name](url) - One sentence.` to the most specific section of `readme.md`. Read `contributing.md` for the inclusion bar.
```

- [ ] **Step 2: Verify the skills CLI sees it and commit**

Run: `npx -y skills add valentynkit/awesome-jev-typesafe --dry-run 2>&1 | tail -5` (if `--dry-run` is unsupported, run `npx -y skills add . -y -a claude-code` inside a temp dir and confirm `.claude/skills/awesome-jev/SKILL.md` appears, then delete the temp dir).

```bash
git add SKILL.md && git commit -m "Add an agent skill that reads projects.json instead of the rerank endpoint"
```

### Task A6: Trust lines and topics

**Files:**
- Modify: `readme.md` section "Contributing"
- Repo settings via `gh`

- [ ] **Step 1: Replace the Contributing section body with**

```markdown
Read [contributing.md](contributing.md) first. Removal is as welcome as addition.

What "curated" means here: every link is checked weekly by CI, every entry is read by a person against the bar in contributing.md before it lands, and repos that look like a batch of same-day scaffolds are noted as such rather than listed as proven. Nothing here is a security review.
```

- [ ] **Step 2: Topics and commit**

Run: `gh repo edit valentynkit/awesome-jev-typesafe --add-topic llm-agents --add-topic system1 --add-topic directory`
Expected: repo updated. Homepage is set in Task B12.

```bash
git add readme.md && git commit -m "Say plainly what curated means"
```

---

## Track B: site

All commands in this track run inside `site/` unless stated.

### Task B1: Scaffold Astro

**Files:**
- Create: `site/package.json`, `site/astro.config.mjs`, `site/tsconfig.json`, `site/vercel.json`, `site/public/robots.txt`, `site/public/favicon.svg`

- [ ] **Step 1: package.json**

```json
{
  "name": "awesome-jev-site",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "node ../scripts/parse-readme.mjs && astro build",
    "preview": "astro preview",
    "test": "node --test src/**/*.test.mjs"
  },
  "dependencies": {
    "@astrojs/sitemap": "^4.0.0",
    "@astrojs/vercel": "^11.0.10",
    "@fontsource-variable/fira-code": "^5.3.0",
    "@fontsource-variable/public-sans": "^5.3.0",
    "@fontsource-variable/space-grotesk": "^5.3.0",
    "@fontsource/space-grotesk": "^5.2.0",
    "@resvg/resvg-js": "^2.6.2",
    "astro": "^7.3.3",
    "minisearch": "^7.2.0",
    "satori": "^0.127.0"
  }
}
```

Run `npm install` and let npm pin what exists; if `@astrojs/sitemap` major differs, take what `npx astro add sitemap` installs.

- [ ] **Step 2: astro.config.mjs**

```js
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://awesomejev.vercel.app",
  output: "static",
  adapter: vercel(),
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh", "ja", "ko"],
    routing: { prefixDefaultLocale: false },
  },
  vite: { server: { fs: { allow: [".."] } } },
});
```

- [ ] **Step 3: tsconfig.json, vercel.json, robots.txt, favicon**

`tsconfig.json`: `{ "extends": "astro/tsconfigs/strict", "compilerOptions": { "resolveJsonModule": true } }`

`vercel.json`: `{ "framework": "astro", "installCommand": "npm ci", "buildCommand": "npm run build" }`

`public/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://awesomejev.vercel.app/sitemap-index.xml
```

`public/favicon.svg`: a 32x32 SVG with a `#0B0E11` circle and a `#4CC9F0` three-quarter arc plus an amber needle, same motif as the banner gauge.

- [ ] **Step 4: Verify dev boots and commit**

Run: `npm install && npx astro check 2>&1 | tail -3` (no pages yet, expect 0 errors), then from repo root:

```bash
git add site/package.json site/package-lock.json site/astro.config.mjs site/tsconfig.json site/vercel.json site/public
git commit -m "Scaffold the Astro site with the Vercel adapter"
```

### Task B2: Data loader

**Files:**
- Create: `site/src/lib/data.ts`, `site/src/lib/data.test.mjs`

- [ ] **Step 1: Test (runs against the real data files)**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const projects = JSON.parse(readFileSync(new URL("../../../data/projects.json", import.meta.url)));
test("data has sections and entries", () => {
  assert.ok(projects.entries.length > 300);
  assert.ok(projects.sections.some((s) => s.name === "Coding agents"));
});
```

- [ ] **Step 2: Implement `data.ts`**

```ts
import projectsRaw from "../../../data/projects.json";
import history from "../../../data/history.json";
import { readFileSync, existsSync } from "node:fs";

const optional = (p: string) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : {});
const github: Record<string, GithubMeta> = optional("../data/github.json").repos ?? {};
const jev: JevFile = optional("../data/jev.json");
const i18n: Record<string, Record<string, string>> = {
  zh: optional("../data/i18n/zh.json"), ja: optional("../data/i18n/ja.json"), ko: optional("../data/i18n/ko.json"),
};

export type GithubMeta = { stars: number; forks: number; pushedAt: string; createdAt: string; language: string | null; license: string | null; archived: boolean; ogImage: string | null; topics: string[]; description: string | null; homepage: string | null; gone?: boolean };
export type JevTags = { section: string; sectionP: number; hostAgent: string; hostAgentP: number; maturity: number; hasNumbers: number; router: number; gate: number; compaction: number; judge: number; browserAgent: number; riskBulkScaffold: number; intents: Record<string, number> };
type JevFile = { intents?: string[]; entries?: Record<string, JevTags> };
export type Entry = (typeof projectsRaw.entries)[number] & { github: GithubMeta | null; jev: JevTags | null; slugSection: string };

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const sections = projectsRaw.sections.map((s) => ({ ...s, slug: slug(s.name) }));
export const gallery = projectsRaw.gallery;
export const intents = jev.intents ?? [];
export const entries: Entry[] = projectsRaw.entries.map((e) => ({
  ...e,
  github: e.owner ? github[`${e.owner}/${e.repo}`] ?? null : null,
  jev: jev.entries?.[e.id] ?? null,
  slugSection: slug(e.section),
}));
export const projects = entries.filter((e) => e.type === "project");
export const bySection = (name: string) => entries.filter((e) => e.section === name);
export const byId = Object.fromEntries(entries.map((e) => [e.id, e]));
export const firstSeen: Record<string, string> = history.firstSeen;
export const describe = (e: Entry, lang: string) => (lang === "en" ? e.description : i18n[lang]?.[e.id] ?? e.description);
export const starsBucket = (n: number | undefined) => (n == null ? "unknown" : n < 10 ? "0-10" : n < 100 ? "10-100" : n < 1000 ? "100-1k" : "1k+");
export const hostOf = (e: Entry) => (e.section === "Coding agents" && e.subsection && e.subsection !== "Skills for writing Jev code" ? e.subsection : null);
export const image = (e: Entry) => (e.image ? `/media/${e.image.replace(/^media\//, "")}` : e.github?.ogImage ?? `/og/${e.id}.png`);
export const newSince = (days: number) => { const cut = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10); return entries.filter((e) => (firstSeen[e.id] ?? "9999") >= cut); };
```

`data/github.json` shape is `{ fetchedAt, repos: { "owner/repo": GithubMeta } }` (Task C1). Astro's Vite root is `site/`, so `../data/...` in `readFileSync` resolves from `site/` when running `astro build` there.

- [ ] **Step 3: Serve media**

Symlink is not portable on Vercel; copy at build: add to `site/package.json` scripts `"build": "node ../scripts/parse-readme.mjs && node -e \"require('fs').cpSync('../media','public/media',{recursive:true})\" && astro build"` and add `public/media/` to `.gitignore`.

- [ ] **Step 4: Test and commit**

Run: `npm test`
Expected: pass.

```bash
git add site/src/lib/data.ts site/src/lib/data.test.mjs site/package.json .gitignore
git commit -m "Load list data, GitHub metadata, Jev tags, and translations for the site"
```

### Task B3: Theme and layout

**Files:**
- Create: `site/src/styles/global.css`, `site/src/layouts/Base.astro`, `site/src/components/Header.astro`, `site/src/components/Footer.astro`, `site/src/lib/i18n.ts`, `site/src/i18n/en.json`, `zh.json`, `ja.json`, `ko.json`

- [ ] **Step 1: global.css tokens (top of file; the rest of the file holds component styles added in later tasks)**

```css
@import "@fontsource-variable/space-grotesk";
@import "@fontsource-variable/public-sans";
@import "@fontsource-variable/fira-code";

:root {
  color-scheme: dark;
  --canvas: #0B0E11; --surface: #12161B; --raised: #171C22; --line: #222A33;
  --text: #E8EDF2; --muted: #7C8791; --accent: #4CC9F0; --accent-2: #FFB454; --danger: #FF5D5D;
  --accent-ink: #062A36;
  --display: "Space Grotesk Variable", system-ui, sans-serif;
  --body: "Public Sans Variable", system-ui, sans-serif;
  --mono: "Fira Code Variable", ui-monospace, monospace;
  --radius: 10px; --max: 1200px;
}
:root[data-theme="light"] {
  color-scheme: light;
  --canvas: #F4F6F8; --surface: #FFFFFF; --raised: #FFFFFF; --line: #D9DEE3;
  --text: #14181D; --muted: #5B6670; --accent: #0E8FB5; --accent-2: #B8690A; --danger: #C43030;
  --accent-ink: #FFFFFF;
}
@media (prefers-color-scheme: light) { :root:not([data-theme]) { color-scheme: light;
  --canvas: #F4F6F8; --surface: #FFFFFF; --raised: #FFFFFF; --line: #D9DEE3;
  --text: #14181D; --muted: #5B6670; --accent: #0E8FB5; --accent-2: #B8690A; --danger: #C43030; --accent-ink: #FFFFFF; } }

* { box-sizing: border-box; }
html { background: var(--canvas); color: var(--text); font-family: var(--body); font-size: 16px; line-height: 1.5; -webkit-font-smoothing: antialiased; }
body { margin: 0; min-height: 100dvh; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.55 0 0 0 0 0.6 0 0 0 0.035 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"); }
h1, h2, h3 { font-family: var(--display); letter-spacing: -0.02em; text-wrap: balance; margin: 0 0 .4em; }
h1 { font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.05; }
h2 { font-size: 1.5rem; } h3 { font-size: 1.15rem; }
a { color: var(--accent); text-decoration: none; } a:hover { text-decoration: underline; }
code, .mono, .num { font-family: var(--mono); font-variant-numeric: tabular-nums; }
.wrap { max-width: var(--max); margin: 0 auto; padding: 0 20px; }
.muted { color: var(--muted); }
:focus-visible { outline: 2px solid var(--accent-2); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
```

- [ ] **Step 2: i18n strings**

`site/src/i18n/en.json`:

```json
{
  "tagline": "Typed decisions, calibrated.",
  "lede": "What people build on TypeSafe's Jev, the first System One model: state in, probabilities out, no text to parse.",
  "search": "Search projects", "searchHint": "Press / to search", "results": "{n} of {total}",
  "categories": "Categories", "insights": "Insights", "lists": "Other lists", "about": "About",
  "contribute": "Contribute", "rankedByJev": "ranked by Jev", "noResults": "Nothing matches \"{q}\".", "clear": "Clear filters",
  "stars": "stars", "pushed": "pushed", "archived": "archived", "maintainer": "by the maintainer",
  "sort": "Sort", "relevance": "Relevance", "newest": "Newest", "recent": "Recently pushed", "az": "A to Z",
  "facets": { "section": "Section", "host": "Host agent", "language": "Language", "license": "License", "media": "Has media", "stars": "Stars", "maintainer": "Maintainer" },
  "newThisWeek": "New this week", "gallery": "In the wild", "knowBefore": "Know before you build",
  "projectsCount": "{n} projects", "sectionsCount": "{n} sections", "checkedWeekly": "links checked weekly",
  "theme": "Toggle theme", "language": "Language", "source": "Source", "openOnGithub": "Open on GitHub",
  "jevSays": "Jev tags", "probability": "probability", "intentMatches": "Best intent matches", "section": "Section",
  "generated": "This page is generated from the English list."
}
```

`zh.json`, `ja.json`, `ko.json`: same keys, translated by the executor (a native-quality single pass is fine; these are 40 UI strings). Keep `{n}`, `{total}`, `{q}` placeholders intact.

`site/src/lib/i18n.ts`:

```ts
import en from "../i18n/en.json"; import zh from "../i18n/zh.json"; import ja from "../i18n/ja.json"; import ko from "../i18n/ko.json";
export const locales = ["en", "zh", "ja", "ko"] as const;
export type Locale = (typeof locales)[number];
export const names: Record<Locale, string> = { en: "English", zh: "中文", ja: "日本語", ko: "한국어" };
const dict: Record<Locale, typeof en> = { en, zh, ja, ko };
export const t = (lang: string, key: string, vars: Record<string, string | number> = {}) => {
  const d = dict[(lang as Locale)] ?? en;
  let s: any = key.split(".").reduce((o: any, k) => o?.[k], d) ?? key.split(".").reduce((o: any, k) => o?.[k], en) ?? key;
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s as string;
};
export const localePath = (lang: string, path: string) => (lang === "en" ? path : `/${lang}${path}`);
export const langFromParams = (p: Record<string, string | undefined>) => (p.lang && locales.includes(p.lang as Locale) ? (p.lang as Locale) : "en");
export const staticLangs = () => [{ params: { lang: undefined } }, ...locales.filter((l) => l !== "en").map((lang) => ({ params: { lang } }))];
```

- [ ] **Step 3: Base.astro**

```astro
---
import "../styles/global.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import { locales, localePath } from "../lib/i18n";
interface Props { title: string; description: string; lang: string; path: string; image?: string; jsonld?: unknown }
const { title, description, lang, path, image = "/og/site.png", jsonld } = Astro.props;
const site = Astro.site!.origin;
---
<!doctype html>
<html lang={lang === "zh" ? "zh-CN" : lang}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="canonical" href={site + localePath(lang, path)} />
  {locales.map((l) => <link rel="alternate" hreflang={l === "zh" ? "zh-CN" : l} href={site + localePath(l, path)} />)}
  <link rel="alternate" type="text/markdown" href={site + (path === "/" ? "/llms.txt" : path.replace(/\/$/, "") + ".md")} />
  <link rel="alternate" type="application/atom+xml" href={site + "/feed.xml"} />
  <meta property="og:title" content={title} /><meta property="og:description" content={description} />
  <meta property="og:image" content={site + image} /><meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#0B0E11" />
  <script is:inline>const t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t;</script>
  {jsonld && <script type="application/ld+json" set:html={JSON.stringify(jsonld)} />}
</head>
<body>
  <Header lang={lang} path={path} />
  <main class="wrap"><slot /></main>
  <Footer lang={lang} />
</body>
</html>
```

- [ ] **Step 4: Header.astro and Footer.astro**

Header: `<header class="hdr wrap">` with logo link to `localePath(lang,"/")` reading "Awesome Jev", nav links (`categories` → `/#categories`, `insights`, `lists`, `about`, GitHub), a `<button id="theme">` toggling `document.documentElement.dataset.theme` between `light`/`dark` and storing it, and a `<select id="lang">` listing `names` that navigates to `localePath(value, path)` and stores the choice in `localStorage.lang`. On first visit with no stored choice and `navigator.language` starting with zh/ja/ko while on `/`, redirect once to that locale (client script, guarded by `sessionStorage.redirected`).

Footer: source link, "CC0", `t(lang,"checkedWeekly")`, links to `/llms.txt`, `/projects.json`, `/skill.md`, `/feed.xml`.

CSS for both goes in `global.css`: sticky header with `backdrop-filter: blur(8px)`, border-bottom `var(--line)`.

- [ ] **Step 5: Verify build and commit**

Run: `npx astro check && npx astro build 2>&1 | tail -5` (no pages yet, so an empty build passes).

```bash
git add site/src && git commit -m "Add theme tokens, base layout, header, footer, and UI strings in four languages"
```

### Task B4: Card, Bar, Gauge components

**Files:**
- Create: `site/src/components/Card.astro`, `Bar.astro`, `Gauge.astro`

- [ ] **Step 1: Bar.astro (probability bar with ticks)**

```astro
---
interface Props { p: number; label?: string; small?: boolean }
const { p, label, small } = Astro.props;
const pct = Math.round(p * 100);
---
<div class:list={["bar", { small }]} role="img" aria-label={`${label ?? "probability"} ${pct}%`}>
  {label && <span class="bar-label">{label}</span>}
  <span class="bar-track"><span class="bar-fill" style={`width:${pct}%`}></span></span>
  <span class="bar-num num">{(p).toFixed(2)}</span>
</div>
```

CSS: `.bar{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;font-size:.8rem}` `.bar-track{height:8px;background:var(--line);border-radius:4px;position:relative;background-image:repeating-linear-gradient(90deg,transparent 0 24%,var(--surface) 24% 25%)}` `.bar-fill{position:absolute;inset:0 auto 0 0;background:var(--accent);border-radius:4px}` `.bar-num{color:var(--muted)}`.

- [ ] **Step 2: Gauge.astro (hero dial, SVG, animated sweep)**

An SVG 200x200 with a 270-degree track arc, a fill arc using `stroke-dasharray` set to `p * length`, a needle rotated by `-135 + 270 * p` degrees, and the number in the middle. Animate the fill and needle once on load with a CSS `@keyframes sweep` (1.2 s, ease-out), disabled under reduced motion. Props: `p: number`, `label: string`.

- [ ] **Step 3: Card.astro**

```astro
---
import Bar from "./Bar.astro";
import { describe, image, hostOf, type Entry } from "../lib/data";
import { localePath, t } from "../lib/i18n";
interface Props { e: Entry; lang: string }
const { e, lang } = Astro.props;
const top = e.jev ? Object.entries({ router: e.jev.router, gate: e.jev.gate, compaction: e.jev.compaction, judge: e.jev.judge, "browser agent": e.jev.browserAgent }).sort((a, b) => b[1] - a[1])[0] : null;
---
<article class="card" data-id={e.id}>
  <a class="card-img" href={localePath(lang, `/p/${e.id}/`)} tabindex="-1" aria-hidden="true"><img src={image(e)} alt="" loading="lazy" width="640" height="336" /></a>
  <div class="card-body">
    <h3><a href={localePath(lang, `/p/${e.id}/`)}>{e.name}</a></h3>
    <p>{describe(e, lang)}</p>
    <div class="card-meta muted num">
      {e.github && <span>★ {e.github.stars.toLocaleString()}</span>}
      {e.github?.archived && <span class="tag danger">{t(lang, "archived")}</span>}
      {hostOf(e) && <span class="tag">{hostOf(e)}</span>}
      {e.maintainer && <span class="tag accent">{t(lang, "maintainer")}</span>}
      {e.github?.language && <span>{e.github.language}</span>}
    </div>
    {top && top[1] >= 0.5 && <Bar p={top[1]} label={top[0]} small />}
  </div>
</article>
```

CSS: `.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;transition:translate .15s,border-color .15s;container-type:inline-size}` `.card:hover{translate:0 -2px;border-color:var(--accent)}` `.card-img img{display:block;width:100%;aspect-ratio:1.9;object-fit:cover;background:var(--raised)}` `.card-body{padding:14px 16px;display:grid;gap:8px}` `.tag{border:1px solid var(--line);border-radius:999px;padding:0 8px;font-size:.75rem}` `.tag.accent{border-color:var(--accent);color:var(--accent)}` `.tag.danger{border-color:var(--danger);color:var(--danger)}` `.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;content-visibility:auto}`.

- [ ] **Step 4: Commit**

```bash
git add site/src/components site/src/styles/global.css && git commit -m "Add card, probability bar, and gauge components"
```

### Task B5: Search island

**Files:**
- Create: `site/src/scripts/search.ts`, `site/src/components/SearchBox.astro`, `site/src/scripts/search.test.mjs`

- [ ] **Step 1: Test the pure ranking helpers**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildIndex, applyFacets, matchIntent } from "./search-core.mjs";
const docs = [
  { id: "a", name: "fast-jev-compaction", description: "Replaces the compaction summary with Jev decisions.", section: "Coding agents", host: "Claude Code", language: "TypeScript", license: "MIT", stars: 50, hasMedia: false, maintainer: false, intents: { "compact context": 0.9 } },
  { id: "b", name: "jev-router", description: "Routes each task to the cheapest model.", section: "Coding agents", host: "Claude Code", language: "Python", license: "MIT", stars: 5, hasMedia: true, maintainer: true, intents: { "route between models": 0.95 } },
];
test("text search finds compaction first", () => {
  const idx = buildIndex(docs);
  assert.equal(idx.search("compaction")[0].id, "a");
});
test("facets AND together", () => {
  assert.deepEqual(applyFacets(docs, { language: ["Python"], maintainer: ["yes"] }).map((d) => d.id), ["b"]);
});
test("intent match ranks by precomputed probability", () => {
  const hit = matchIntent("how do I route between models", ["compact context", "route between models"]);
  assert.equal(hit, "route between models");
});
```

- [ ] **Step 2: `site/src/scripts/search-core.mjs` (framework-free, testable)**

```js
import MiniSearch from "minisearch";

export function buildIndex(docs) {
  const ms = new MiniSearch({
    fields: ["name", "description", "section", "host", "owner", "topics"],
    storeFields: ["id"],
    searchOptions: { boost: { name: 3, description: 1.5 }, prefix: true, fuzzy: 0.2, combineWith: "AND" },
  });
  ms.addAll(docs);
  return ms;
}

export function applyFacets(docs, facets) {
  return docs.filter((d) =>
    Object.entries(facets).every(([k, vals]) => {
      if (!vals?.length) return true;
      const v = k === "media" ? (d.hasMedia ? "yes" : "no") : k === "maintainer" ? (d.maintainer ? "yes" : "no") : k === "stars" ? d.starsBucket : d[k];
      return vals.includes(v);
    }),
  );
}

const words = (s) => new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2));
export function matchIntent(query, intents) {
  const q = words(query);
  let best = null, score = 0;
  for (const it of intents) {
    const w = words(it);
    const overlap = [...w].filter((x) => q.has(x)).length / w.size;
    if (overlap > score) { score = overlap; best = it; }
  }
  return score >= 0.5 ? best : null;
}
```

Also update `site/package.json` test glob to include `src/scripts/*.test.mjs`.

- [ ] **Step 3: `site/src/scripts/search.ts` (browser)**

Behaviour:
- On load, fetch `/search-index.json` (built by `site/src/pages/search-index.json.ts`, an endpoint emitting the doc array `{id,name,description,section,host,owner,topics,language,license,stars,starsBucket,hasMedia,maintainer,intents,firstSeen,pushedAt}` in the page's language) and `buildIndex`.
- Read `q`, `sort`, and facet params from `location.search`; render results into `#results` by cloning pre-rendered cards: the home page renders every card once inside `<template id="cards">` keyed by `data-id`, so search only reorders and shows/hides existing DOM, no client templating.
- Debounce input 120 ms for local search; update URL with `history.replaceState`; show `t("results")` count; `/` focuses the input unless typing in a field; `Escape` clears.
- Sort: relevance when `q` non-empty (MiniSearch score; if `matchIntent` hits, add `2 * intents[intent]` to the score), else `stars` desc default; `newest` by `firstSeen`; `recent` by `pushedAt`; `az`.
- Facet chips: `<details>` groups rendered server-side with counts; clicking a chip toggles it and re-renders.
- Rerank hook: when `q.length >= 3`, after local results render, POST `{ query, ids: top30 }` to `/api/rerank` (debounced 350 ms, `AbortController` cancels the previous). On 200 `{ranked:[{id,p}]}` reorder those ids to the top and set each card's `.bar-fill` width to `p` and reveal `#ranked-by-jev`. On any failure, keep local order and hide the indicator.
- `Cmd/Ctrl+K` focuses the input.

- [ ] **Step 4: SearchBox.astro**

```astro
---
import { t } from "../lib/i18n";
interface Props { lang: string; total: number; facets: Record<string, [string, number][]> }
const { lang, total, facets } = Astro.props;
---
<search class="searchbox">
  <input id="q" type="search" placeholder={t(lang, "search")} aria-label={t(lang, "search")} autocomplete="off" />
  <span class="muted"><kbd>/</kbd> {t(lang, "searchHint")}</span>
  <label class="sort">{t(lang, "sort")}
    <select id="sort">
      <option value="relevance">{t(lang, "relevance")}</option><option value="stars">{t(lang, "stars")}</option>
      <option value="newest">{t(lang, "newest")}</option><option value="recent">{t(lang, "recent")}</option><option value="az">{t(lang, "az")}</option>
    </select>
  </label>
  <span id="count" class="num muted"></span>
  <span id="ranked-by-jev" class="tag accent" hidden>{t(lang, "rankedByJev")}</span>
</search>
<div class="facets">
  {Object.entries(facets).map(([key, vals]) => (
    <details class="facet" open={key === "section"}>
      <summary>{t(lang, `facets.${key}`)}</summary>
      <div class="chips">{vals.map(([v, n]) => <button class="chip" data-facet={key} data-value={v}>{v} <span class="num muted">{n}</span></button>)}</div>
    </details>
  ))}
</div>
<script>
  import { mount } from "../scripts/search";
  mount(document.documentElement.lang.startsWith("zh") ? "zh" : document.documentElement.lang);
</script>
```

Sticky `.searchbox` at top under header, chips with `@starting-style` fade, `.chip[aria-pressed=true]` in accent.

- [ ] **Step 5: Run tests and commit**

Run: `npm test`
Expected: search-core tests pass.

```bash
git add site/src/scripts site/src/components/SearchBox.astro site/package.json
git commit -m "Add MiniSearch search with facets, URL state, intent boost, and rerank hook"
```

### Task B6: Home page

**Files:**
- Create: `site/src/pages/[...lang]/index.astro`, `site/src/pages/search-index.json.ts`

- [ ] **Step 1: index.astro**

Sections in order: hero (`h1` = `t("tagline")`, lede, stats strip with `projectsCount`, `sectionsCount`, `checkedWeekly`, a `<Gauge p={0.93} label="Noul">` and a `<pre class="mono">` showing a real four-line Jev request, plus a `<span class="num">72 ms</span>` readout), `SearchBox`, `#categories` grid of section tiles (name, count, first three entry names, link to `/c/<slug>/`), `t("newThisWeek")` strip using `newSince(7)` (hidden when empty), `t("gallery")` mosaic from `gallery` (six tiles, `<img>` with `<a>`), then `<div id="results" class="grid">` containing every `project` entry as a `Card` (so no-JS users still get the whole list, and search reorders in place), and `<template id="cards">` is not needed since cards are in the DOM already.

`getStaticPaths` = `staticLangs()`. `lang = langFromParams(Astro.params)`. Facets computed from `projects`: section, host (`hostOf`), language, license, media yes/no, starsBucket, maintainer yes/no, each as `[value, count][]` sorted by count.

JSON-LD: `{"@type":"ItemList", itemListElement: projects.slice(0,50).map(...)}`.

- [ ] **Step 2: search-index.json.ts**

```ts
import type { APIRoute } from "astro";
import { projects, hostOf, starsBucket, firstSeen } from "../lib/data";
export const GET: APIRoute = () => new Response(JSON.stringify(projects.map((e) => ({
  id: e.id, name: e.name, description: e.description, section: e.section, host: hostOf(e), owner: e.owner,
  topics: e.github?.topics?.join(" ") ?? "", language: e.github?.language ?? "unknown", license: e.github?.license ?? "unknown",
  stars: e.github?.stars ?? 0, starsBucket: starsBucket(e.github?.stars), hasMedia: !!e.image, maintainer: e.maintainer,
  intents: e.jev?.intents ?? {}, firstSeen: firstSeen[e.id] ?? "", pushedAt: e.github?.pushedAt ?? "",
}))), { headers: { "content-type": "application/json" } });
```

Translated descriptions for search: emit `search-index.<lang>.json` variants by making this a `[lang]` dynamic endpoint (`src/pages/search-index.[lang].json.ts` with `getStaticPaths` over locales and `describe(e, lang)`); the client fetches the one for its page language.

- [ ] **Step 3: Build, view, commit**

Run: `npx astro build && npx astro preview` then open `http://localhost:4321/`, `http://localhost:4321/zh/`. Check: all 300+ cards render, search "compaction" puts fast-jev-compaction first, facet chip filters, URL updates, theme toggle works, `/` focuses.

```bash
git add site/src/pages && git commit -m "Add the home page: hero, search, categories, new this week, gallery, all cards"
```

### Task B7: Category, project, lists, about pages

**Files:**
- Create: `site/src/pages/[...lang]/c/[slug].astro`, `site/src/pages/[...lang]/p/[id].astro`, `site/src/pages/[...lang]/lists.astro`, `site/src/pages/[...lang]/about.astro`

- [ ] **Step 1: c/[slug].astro**

`getStaticPaths`: for each lang × section (excluding list section) → `{params:{lang, slug}}`. Renders: h1 section name, section banner image if any, sub-headings for each H3 with their entries as `Card`s, JSON-LD ItemList. Breadcrumb to home.

- [ ] **Step 2: p/[id].astro**

`getStaticPaths`: lang × entries. Renders: h1 name, `describe`, big image (`image(e)`), meta list (section link, host, owner link, stars, forks, pushed date, license, language, archived flag, `trustPhrase` if any, `languageHint` if any, `maintainer` tag), buttons `Open on GitHub` and `Source` (readme line anchor `https://github.com/valentynkit/awesome-jev-typesafe/blob/main/readme.md?plain=1#L{line}`), a "Jev tags" panel with `Bar`s for `router, gate, compaction, judge, browserAgent, hasNumbers, riskBulkScaffold` and the `section`/`hostAgent` choice with its probability, "Best intent matches": top 5 intents by probability as `Bar`s, an install line if `github.topics` includes `npm`/`pypi`/`crates` or homepage matches npmjs/pypi (button copies to clipboard). JSON-LD `SoftwareSourceCode` with `codeRepository`, `name`, `description`, `programmingLanguage`. OG image `/og/${id}.png`.

- [ ] **Step 3: lists.astro and about.astro**

lists: entries of type `list` as a simple list with descriptions. about: the "Know before you build" bullets copied verbatim from `readme.md` (read at build via `readFileSync("../readme.md")` and slice the section), a contributing summary, credits table from `media/sources.md` rendered as-is (read file, convert the markdown table with a 10-line converter), and the Jev caveats paragraph from the spec ("No embeddings, cannot count...").

- [ ] **Step 4: Build and commit**

Run: `npx astro build 2>&1 | tail -3` Expected: `~1500 page(s) built`.

```bash
git add site/src/pages && git commit -m "Add category, project, other-lists, and about pages"
```

### Task B8: Insights page and charts

**Files:**
- Create: `site/src/lib/charts.ts`, `site/src/lib/charts.test.mjs` (tests `bars()` output contains one `<rect>` per datum), `site/src/pages/[...lang]/insights.astro`

- [ ] **Step 1: charts.ts**

```ts
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
export function bars(data: [string, number][], { width = 720, row = 26, label = 180 } = {}) {
  const max = Math.max(1, ...data.map((d) => d[1]));
  const h = data.length * row + 8;
  const rows = data.map(([k, v], i) => {
    const w = Math.round(((width - label - 60) * v) / max);
    const y = i * row + 4;
    return `<text x="${label - 8}" y="${y + 17}" text-anchor="end" class="lbl">${esc(k)}</text><rect x="${label}" y="${y}" width="${w}" height="${row - 8}" rx="3" class="fill"/><text x="${label + w + 6}" y="${y + 17}" class="num">${v}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${h}" width="100%" role="img" class="chart">${rows.join("")}</svg>`;
}
export function histogram(values: number[], edges: number[], labels: string[]) {
  const counts = edges.map((e, i) => values.filter((v) => v >= e && (i === edges.length - 1 || v < edges[i + 1])).length);
  return bars(labels.map((l, i) => [l, counts[i]]));
}
export function line(points: [string, number][], { width = 720, height = 200 } = {}) {
  const max = Math.max(1, ...points.map((p) => p[1]));
  const step = (width - 40) / Math.max(1, points.length - 1);
  const d = points.map((p, i) => `${i ? "L" : "M"}${20 + i * step},${height - 20 - ((height - 40) * p[1]) / max}`).join(" ");
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" class="chart"><path d="${d}" fill="none" class="stroke" stroke-width="2"/>${points.map((p, i) => `<circle cx="${20 + i * step}" cy="${height - 20 - ((height - 40) * p[1]) / max}" r="3" class="fill"/>`).join("")}</svg>`;
}
```

CSS: `.chart .fill{fill:var(--accent)} .chart .stroke{stroke:var(--accent)} .chart text{fill:var(--muted);font:12px var(--mono)}`.

- [ ] **Step 2: insights.astro**

Six charts from `projects` and `firstSeen`: entries per section (`bars`), language mix (top 10), activity recency buckets from `pushedAt` (7d, 30d, 90d, stale, archived), stars histogram edges `[0,10,50,100,500,1000,5000]`, host-agent mix, additions per week (`firstSeen` grouped by ISO week, `line`). Each with a heading and a one-line note on the source of the numbers. Plus a table: top 3 by stars per section. Data date line from `data/github.json` `fetchedAt`.

- [ ] **Step 3: Test, build, commit**

Run: `npm test && npx astro build 2>&1 | tail -2`

```bash
git add site/src/lib/charts.ts site/src/lib/charts.test.mjs site/src/pages && git commit -m "Add the insights page with six build-time SVG charts"
```

### Task B9: Machine endpoints

**Files:**
- Create: `site/src/pages/projects.json.ts`, `llms.txt.ts`, `llms-full.txt.ts`, `skill.md.ts`, `feed.xml.ts`, `site/src/pages/p/[id].md.ts`, `site/src/pages/c/[slug].md.ts`

- [ ] **Step 1: projects.json.ts**

```ts
import type { APIRoute } from "astro";
import { entries, sections, intents, firstSeen } from "../lib/data";
export const GET: APIRoute = ({ site }) => new Response(JSON.stringify({
  meta: { source: "https://github.com/valentynkit/awesome-jev-typesafe/blob/main/readme.md", site: site!.origin, license: "CC0-1.0", intents, sections: sections.map((s) => s.name) },
  entries: entries.map(({ line, ...e }) => ({ ...e, firstSeen: firstSeen[e.id] ?? null })),
}, null, 1), { headers: { "content-type": "application/json; charset=utf-8" } });
```

- [ ] **Step 2: llms.txt.ts and llms-full.txt.ts**

`llms.txt`: `# Awesome Jev\n\n> ...lede...\n\nFetch /projects.json for everything. Do not call /api/rerank.\n\n## Sections\n\n- [Name](/c/slug.md): N entries\n...` and a `## Machine` block listing projects.json, llms-full.txt, skill.md, feed.xml.

`llms-full.txt`: every section as `## Name` followed by `- [name](url) - description` lines, same as the readme minus header and prose sections.

- [ ] **Step 3: skill.md.ts**

Reads `../SKILL.md` at build (`readFileSync("../SKILL.md")`) and serves it as `text/markdown`.

- [ ] **Step 4: feed.xml.ts**

Atom feed: entries sorted by `firstSeen` desc, latest 50, `<entry>` with title, link, id (url), updated (firstSeen), summary (description). Header `content-type: application/atom+xml`.

- [ ] **Step 5: Markdown twins**

`p/[id].md.ts`: `getStaticPaths` over entries; body: `# name\n\ndescription\n\n- URL: ...\n- Section: ...\n- Stars: ...\n- Pushed: ...\n- Jev tags: router 0.81, gate 0.12, ...\n`. `c/[slug].md.ts`: section heading, subsections, entry lines.

- [ ] **Step 6: Build, curl, commit**

Run: `npx astro build && npx astro preview & sleep 2; curl -s localhost:4321/projects.json | head -c 300; curl -s localhost:4321/llms.txt | head -20; curl -s localhost:4321/p/jev-belay.md; kill %1`

```bash
git add site/src/pages && git commit -m "Add projects.json, llms.txt, llms-full.txt, skill.md, Atom feed, and markdown twins"
```

### Task B10: OG images

**Files:**
- Create: `site/src/lib/og.ts`, `site/src/pages/og/[id].png.ts`, `site/src/pages/og/site.png.ts`

- [ ] **Step 1: og.ts**

```ts
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
const bold = readFileSync("node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff");
const regular = readFileSync("node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff");
export async function card({ title, subtitle, meta, p }: { title: string; subtitle: string; meta: string; p?: number }) {
  const svg = await satori(
    { type: "div", props: { style: { width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#0B0E11", color: "#E8EDF2", fontFamily: "Space Grotesk" }, children: [
      { type: "div", props: { style: { fontSize: 28, color: "#7C8791" }, children: "Awesome Jev" } },
      { type: "div", props: { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
        { type: "div", props: { style: { fontSize: 72, fontWeight: 700, letterSpacing: -2 }, children: title } },
        { type: "div", props: { style: { fontSize: 32, color: "#C5CDD5", lineHeight: 1.3 }, children: subtitle.slice(0, 140) } },
      ] } },
      { type: "div", props: { style: { display: "flex", alignItems: "center", gap: 24, fontSize: 24, color: "#7C8791" }, children: [
        { type: "div", props: { children: meta } },
        ...(p == null ? [] : [{ type: "div", props: { style: { display: "flex", width: 300, height: 12, background: "#222A33", borderRadius: 6 }, children: [{ type: "div", props: { style: { width: Math.round(300 * p), height: 12, background: "#4CC9F0", borderRadius: 6 } } }] } }]),
      ] } },
    ] } },
    { width: 1200, height: 630, fonts: [{ name: "Space Grotesk", data: bold, weight: 700, style: "normal" }, { name: "Space Grotesk", data: regular, weight: 400, style: "normal" }] },
  );
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
```

Satori needs `display: flex` on every div with more than one child; the sketch above respects that.

- [ ] **Step 2: Endpoints**

`og/[id].png.ts`: `getStaticPaths` over `entries`; `GET` returns `card({ title: e.name, subtitle: e.description, meta: [e.section, e.github ? `★ ${e.github.stars}` : null].filter(Boolean).join("  ·  "), p: top tag probability or undefined })` with `content-type: image/png`. `og/site.png.ts`: `card({ title: "Awesome Jev", subtitle: t("en","lede"), meta: `${projects.length} projects` })`.

- [ ] **Step 3: Build time check and commit**

Run: `time npx astro build 2>&1 | tail -2` Expected: under 2 minutes total. If satori for 370 images exceeds that, cache by writing PNGs to `site/.astro/og/` keyed by a hash of the inputs.

```bash
git add site/src/lib/og.ts site/src/pages/og && git commit -m "Generate an Open Graph card per project at build time"
```

### Task B11: Contrast check

**Files:**
- Create: `site/src/styles/contrast.test.mjs`

- [ ] **Step 1: Test**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const css = readFileSync(new URL("./global.css", import.meta.url), "utf8");
const block = (sel) => css.slice(css.indexOf(sel)).match(/\{([^}]*)\}/)[1];
const vars = (b) => Object.fromEntries([...b.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));
const lum = (hex) => { const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
for (const [name, v] of [["dark", vars(block(":root {"))], ["light", vars(block(':root[data-theme="light"]'))]]) {
  test(`${name}: text and muted on canvas and surface >= 4.5`, () => {
    for (const bg of ["canvas", "surface"]) for (const fg of ["text", "muted", "accent"]) assert.ok(ratio(v[fg], v[bg]) >= 4.5, `${name} ${fg} on ${bg} = ${ratio(v[fg], v[bg]).toFixed(2)}`);
  });
}
```

- [ ] **Step 2: Run; adjust `--muted` or `--accent` if a pair fails; commit**

Run: `npm test` (add `src/styles/*.test.mjs` to the test glob).

```bash
git add site/src/styles/contrast.test.mjs site/package.json && git commit -m "Assert 4.5:1 contrast for text roles in both themes"
```

### Task B12: Deploy to Vercel

**Files:**
- Modify: `readme.md` badge row (Live site badge), repo homepage

- [ ] **Step 1: Link and configure the project (repo root)**

```bash
cd site && vercel link --yes --scope valentyn-kit --project awesome-jev
cd .. && vercel git connect --yes --scope valentyn-kit 2>&1 | tail -3
```

If `vercel link` from `site/` sets the root correctly, the Root Directory is `site`. Verify: `vercel project inspect awesome-jev --scope valentyn-kit 2>/dev/null | grep -i root` or use the API:

```bash
TOKEN=$(node -e "console.log(JSON.parse(require('fs').readFileSync(process.env.HOME+'/Library/Application Support/com.vercel.cli/auth.json')).token)")
TEAM=$(curl -s -H "Authorization: Bearer $TOKEN" https://api.vercel.com/v2/teams | node -e "process.stdin.on('data',d=>console.log(JSON.parse(d).teams.find(t=>t.slug==='valentyn-kit').id))")
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "content-type: application/json" "https://api.vercel.com/v9/projects/awesome-jev?teamId=$TEAM" -d '{"rootDirectory":"site","framework":"astro"}' | head -c 200
```

- [ ] **Step 2: Secrets**

`vercel env add TYPESAFE_API_KEY production --scope valentyn-kit` reads from stdin; pipe the key from the maintainer's environment (`printenv TYPESAFE_API_KEY` or `security find-generic-password -s typesafe -w`). If neither exists, deploy without it: the endpoint returns 503 and the client falls back to local order. Also `vercel env add JEV_DAILY_CAP production` with `5000`.

- [ ] **Step 3: Deploy and verify**

```bash
cd site && vercel deploy --prod --yes --scope valentyn-kit 2>&1 | tail -3
curl -s -o /dev/null -w "%{http_code}\n" https://awesomejev.vercel.app/
curl -s https://awesomejev.vercel.app/llms.txt | head -5
```

If `awesomejev.vercel.app` is taken, the deploy output shows the actual URL; replace `https://awesomejev.vercel.app` in `site/astro.config.mjs`, `readme.md`, `SKILL.md`, `site/public/robots.txt` with it.

- [ ] **Step 4: Live badge and homepage**

Append to the badge row in `readme.md`:

```markdown
[![Site](https://img.shields.io/badge/site-awesome--jev.vercel.app-4CC9F0?style=flat-square&labelColor=0B0E11)](https://awesomejev.vercel.app)
```

Run: `gh repo edit valentynkit/awesome-jev-typesafe --homepage https://awesomejev.vercel.app && npx awesome-lint`

```bash
git add readme.md && git commit -m "Link the live site from the badge row"
```

---

## Track C: data enrichment, Jev tagging, translation, rerank

### Task C1: GitHub enrichment

**Files:**
- Create: `scripts/enrich-github.mjs`, `scripts/enrich-github.test.mjs`

- [ ] **Step 1: Test the pure mapping**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { toMeta, batches } from "./enrich-github.mjs";
test("maps a GraphQL repository node", () => {
  const m = toMeta({ stargazerCount: 5, forkCount: 1, pushedAt: "2026-09-01T00:00:00Z", createdAt: "2026-08-01T00:00:00Z", primaryLanguage: { name: "Rust" }, licenseInfo: { spdxId: "MIT" }, isArchived: false, openGraphImageUrl: "https://x/og.png", repositoryTopics: { nodes: [{ topic: { name: "jev" } }] }, description: "d", homepageUrl: "" });
  assert.equal(m.language, "Rust"); assert.equal(m.license, "MIT"); assert.deepEqual(m.topics, ["jev"]); assert.equal(m.homepage, null);
});
test("batches of 50", () => { assert.equal(batches(Array.from({ length: 120 }), 50).length, 3); });
```

- [ ] **Step 2: Implement**

```js
#!/usr/bin/env node
// Fetch repo metadata for every GitHub entry with GraphQL aliases, ~50 repos per query. Writes data/github.json.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

export const batches = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));
export const toMeta = (r) => ({
  stars: r.stargazerCount, forks: r.forkCount, pushedAt: r.pushedAt, createdAt: r.createdAt,
  language: r.primaryLanguage?.name ?? null, license: r.licenseInfo?.spdxId ?? null, archived: r.isArchived,
  ogImage: r.openGraphImageUrl ?? null, topics: (r.repositoryTopics?.nodes ?? []).map((n) => n.topic.name),
  description: r.description ?? null, homepage: r.homepageUrl || null,
});

const FIELDS = `nameWithOwner description homepageUrl isArchived pushedAt createdAt stargazerCount forkCount primaryLanguage{name} licenseInfo{spdxId} openGraphImageUrl repositoryTopics(first:10){nodes{topic{name}}}`;

async function gql(query, token) {
  const res = await fetch("https://api.github.com/graphql", { method: "POST", headers: { authorization: `bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ query }) });
  if (!res.ok) throw new Error(`GraphQL ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is required");
  const { entries } = JSON.parse(readFileSync("data/projects.json", "utf8"));
  const repos = [...new Set(entries.filter((e) => e.owner).map((e) => `${e.owner}/${e.repo}`))];
  const out = existsSync("data/github.json") ? JSON.parse(readFileSync("data/github.json", "utf8")).repos : {};
  const gone = [];
  for (const batch of batches(repos, 50)) {
    const q = `{ ${batch.map((full, i) => { const [o, n] = full.split("/"); return `r${i}: repository(owner:${JSON.stringify(o)}, name:${JSON.stringify(n)}) { ${FIELDS} }`; }).join("\n")} rateLimit { remaining cost } }`;
    const { data, errors } = await gql(q, token);
    batch.forEach((full, i) => {
      const node = data?.[`r${i}`];
      if (node) out[full] = toMeta(node);
      else { gone.push(full); if (out[full]) out[full].gone = true; else out[full] = { gone: true }; }
    });
    if (errors?.some((e) => e.type !== "NOT_FOUND")) console.error(JSON.stringify(errors.filter((e) => e.type !== "NOT_FOUND"), null, 1));
    console.log(`batch done, rate limit remaining ${data?.rateLimit?.remaining}`);
  }
  writeFileSync("data/github.json", JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), repos: out }, null, 1) + "\n");

  const stale = Object.entries(out).filter(([, m]) => m.pushedAt && Date.now() - Date.parse(m.pushedAt) > 90 * 864e5).map(([k]) => k);
  const archived = Object.entries(out).filter(([, m]) => m.archived).map(([k]) => k);
  const summary = `## GitHub enrichment\n\n${repos.length} repos. Gone: ${gone.length}. Archived: ${archived.length}. Stale over 90 days: ${stale.length}.\n\n${[["Gone", gone], ["Archived", archived], ["Stale", stale]].map(([t, l]) => `### ${t}\n\n${l.map((x) => `- ${x}`).join("\n") || "none"}`).join("\n\n")}\n`;
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, summary, { flag: "a" });
  else console.log(summary);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 3: Test, run locally, commit**

Run: `node --test scripts/enrich-github.test.mjs && GITHUB_TOKEN=$(gh auth token) node scripts/enrich-github.mjs | tail -8`
Expected: 6 batches, summary with counts; `data/github.json` has ~277 keys.

```bash
git add scripts/enrich-github.mjs scripts/enrich-github.test.mjs data/github.json
git commit -m "Enrich GitHub entries daily with stars, activity, license, and thumbnails"
```

### Task C2: Jev tagging

**Files:**
- Create: `scripts/jev-client.mjs`, `scripts/tag-jev.mjs`, `scripts/tag-jev.test.mjs`

- [ ] **Step 1: jev-client.mjs**

```js
// One function: post a state and questions to Jev with backoff on 429 and 529.
export async function ask(state, questions, { key = process.env.TYPESAFE_API_KEY, model = "jev-latest", fetchImpl = fetch } = {}) {
  if (!key) throw new Error("TYPESAFE_API_KEY is required");
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetchImpl("https://api.typesafe.ai/v1/systemone", {
      method: "POST", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ model, state, questions }),
    });
    if (res.status === 429 || res.status === 529) { await new Promise((r) => setTimeout(r, 500 * 2 ** attempt)); continue; }
    if (!res.ok) throw new Error(`Jev ${res.status}: ${await res.text()}`);
    return res.json();
  }
  throw new Error("Jev: gave up after 5 attempts");
}
```

- [ ] **Step 2: Test the question builder and cache skip**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { questionsFor, stateFor, INTENTS, hashOf } from "./tag-jev.mjs";
test("questions cover tags and intents", () => {
  const q = questionsFor(["Coding agents", "Routing and gateways"]);
  assert.equal(q.section.type, "choice"); assert.ok(q.section.criteria["coding_agents"]);
  assert.equal(q.router.type, "noul"); assert.equal(q.maturity.type, "score");
  for (const it of INTENTS) assert.equal(q[`intent_${hashOf(it)}`].type, "noul");
});
test("state includes description and stars", () => {
  assert.match(stateFor({ name: "x", description: "Does y.", section: "S", subsection: null }, { stars: 12, pushedAt: "2026-09-01", language: "Go" }), /12 stars/);
});
```

- [ ] **Step 3: Implement tag-jev.mjs**

```js
#!/usr/bin/env node
// Ask Jev ten tag questions plus one Noul per canonical intent for every project entry. Cached by state hash in data/jev.json.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { ask } from "./jev-client.mjs";

export const INTENTS = [
  "route between models by task difficulty", "gate or approve tool calls before they run", "compact or prune agent context",
  "judge or verify an agent's output", "stop an agent from finishing early", "pick which skill or prompt to load",
  "drive a browser or GUI with an agent", "control a phone or mobile app", "review code or pull requests",
  "moderate content or detect abuse", "rerank search results", "classify support tickets or messages",
  "extract structured fields from text", "run Jev on open models without the vendor", "benchmark or calibrate Jev",
  "build a game or simulation on Jev", "trade or score financial signals", "call Jev from the command line",
  "call Jev from a language SDK", "serve Jev over MCP to any agent", "learn how Jev works", "compare Jev with an LLM",
  "route requests through a gateway or proxy", "detect prompt injection or risky commands", "score or rank candidates in a pipeline",
  "label data or build a dataset", "run Jev inside a database or SQL", "add Jev to a chat bot or Discord", "voice or realtime decisions", "monitor or observe Jev usage and cost",
];
export const hashOf = (s) => createHash("sha1").update(s).digest("hex").slice(0, 8);
const key = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const NOUL = (instructions) => ({ type: "noul", instructions });

export function questionsFor(sectionNames) {
  const q = {
    section: { type: "choice", instructions: "Which section of a directory of Jev projects fits this project best?", criteria: Object.fromEntries(sectionNames.map((s) => [key(s), s])) },
    host_agent: { type: "choice", instructions: "Which coding agent does this project plug into?", criteria: { claude_code: "Claude Code hooks, plugins, or config", codex: "OpenAI Codex CLI", pi: "Pi coding agent", hermes: "Hermes agent", agent_zero: "Agent Zero", any: "Any agent via MCP, ACP, or a generic adapter", none: "Not a coding-agent integration" } },
    maturity: { type: "score", instructions: "How mature does this project look from its description, stars, and activity?", criteria: ["toy or demo", "early", "usable", "solid", "battle-tested"] },
    has_numbers: NOUL("Does the description report a measured number such as accuracy, latency, cost, or recall?"),
    router: NOUL("Does this project route requests between models, tools, or paths based on a judgment?"),
    gate: NOUL("Does this project gate, approve, block, or steer actions before they run?"),
    compaction: NOUL("Does this project prune, compact, or filter agent context or tool output?"),
    judge: NOUL("Does this project verify, review, or judge outputs after they are produced?"),
    browser_agent: NOUL("Does this project drive a browser, desktop, or mobile UI?"),
    risk_bulk_scaffold: NOUL("Does this look like one of many templated repos published in a batch with little original work?"),
  };
  for (const it of INTENTS) q[`intent_${hashOf(it)}`] = NOUL(`Would a developer who wants to ${it} find this project useful?`);
  return q;
}

export const stateFor = (e, gh) => [
  `Project: ${e.name}`, `Listed under: ${e.section}${e.subsection ? " / " + e.subsection : ""}`, `Description: ${e.description}`,
  gh?.description ? `Repo description: ${gh.description}` : null,
  gh?.stars != null ? `${gh.stars} stars, last push ${gh.pushedAt?.slice(0, 10)}, language ${gh.language ?? "unknown"}` : null,
].filter(Boolean).join("\n");

async function main() {
  const { entries, sections } = JSON.parse(readFileSync("data/projects.json", "utf8"));
  const gh = existsSync("data/github.json") ? JSON.parse(readFileSync("data/github.json", "utf8")).repos : {};
  const file = existsSync("data/jev.json") ? JSON.parse(readFileSync("data/jev.json", "utf8")) : { intents: INTENTS, entries: {} };
  file.intents = INTENTS;
  const sectionNames = sections.map((s) => s.name).filter((n) => !["Start here", "Articles and talks", "Other lists"].includes(n));
  const questions = questionsFor(sectionNames);
  let calls = 0, tokens = 0;
  for (const e of entries.filter((x) => x.type === "project")) {
    const state = stateFor(e, e.owner ? gh[`${e.owner}/${e.repo}`] : null);
    const h = hashOf(state + JSON.stringify(Object.keys(questions)));
    if (file.entries[e.id]?.hash === h) continue;
    const { answers, usage } = await ask(state, questions);
    calls++; tokens += usage?.input_tokens ?? 0;
    const sectionKey = answers.section.choice;
    file.entries[e.id] = {
      hash: h,
      section: sectionNames.find((s) => key(s) === sectionKey) ?? sectionKey, sectionP: answers.section.probabilities[sectionKey],
      hostAgent: answers.host_agent.choice, hostAgentP: answers.host_agent.probabilities[answers.host_agent.choice],
      maturity: answers.maturity.score, hasNumbers: answers.has_numbers.noul,
      router: answers.router.noul, gate: answers.gate.noul, compaction: answers.compaction.noul, judge: answers.judge.noul,
      browserAgent: answers.browser_agent.noul, riskBulkScaffold: answers.risk_bulk_scaffold.noul,
      intents: Object.fromEntries(INTENTS.map((it) => [it, answers[`intent_${hashOf(it)}`].noul])),
    };
    if (calls % 25 === 0) { writeFileSync("data/jev.json", JSON.stringify(file, null, 1) + "\n"); console.log(`${calls} calls, ${tokens} tokens`); }
  }
  writeFileSync("data/jev.json", JSON.stringify(file, null, 1) + "\n");
  console.log(`done: ${calls} calls, ${tokens} input tokens, about $${((tokens / 1e6) * 0.042).toFixed(4)}`);
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 4: Test, run on three entries first, then all, commit**

Run: `node --test scripts/tag-jev.test.mjs`, then a smoke: `node -e 'import("./scripts/jev-client.mjs").then(async m=>console.log(JSON.stringify(await m.ask("jev-router routes each task to the cheapest Claude model.",{r:{type:"noul",instructions:"Is this a router?"}}))))'`
Expected: `{"model":"jev-...","answers":{"r":{"type":"noul","noul":0.9...}},"usage":{...}}`. If the key is missing locally, ask the maintainer's shell: `printenv TYPESAFE_API_KEY`; if absent, skip the full run, commit the scripts, and let `data.yml` do the first run in CI with the secret.

Then `node scripts/tag-jev.mjs` (about 360 calls, a minute or two).

```bash
git add scripts/jev-client.mjs scripts/tag-jev.mjs scripts/tag-jev.test.mjs data/jev.json
git commit -m "Tag every project with Jev: section, host agent, maturity, roles, risk, and thirty intents"
```

### Task C3: Translation

**Files:**
- Create: `scripts/translate.mjs`, `scripts/translate.test.mjs`
- Modify: root `package.json` dependencies: add `"@anthropic-ai/sdk": "^0.33.4"`

- [ ] **Step 1: Test the batching and cache logic**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { pending, hashOf } from "./translate.mjs";
test("pending skips entries whose hash matches", () => {
  const entries = [{ id: "a", description: "One." }, { id: "b", description: "Two." }];
  const cache = { a: { hash: hashOf("One."), zh: "一", ja: "一", ko: "일" } };
  assert.deepEqual(pending(entries, cache).map((e) => e.id), ["b"]);
});
```

- [ ] **Step 2: Implement**

```js
#!/usr/bin/env node
// Translate new or changed descriptions into zh, ja, ko with Claude. Cached by description hash in data/i18n/cache.json.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";

export const hashOf = (s) => createHash("sha1").update(s).digest("hex").slice(0, 10);
export const pending = (entries, cache) => entries.filter((e) => cache[e.id]?.hash !== hashOf(e.description));
const LANGS = { zh: "Simplified Chinese", ja: "Japanese", ko: "Korean" };

async function main() {
  const { entries } = JSON.parse(readFileSync("data/projects.json", "utf8"));
  mkdirSync("data/i18n", { recursive: true });
  const cachePath = "data/i18n/cache.json";
  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};
  const todo = pending(entries, cache);
  console.log(`${todo.length} descriptions to translate`);
  const client = new Anthropic();
  const schema = { type: "object", additionalProperties: false, required: ["items"], properties: { items: { type: "array", items: { type: "object", additionalProperties: false, required: ["id", "zh", "ja", "ko"], properties: { id: { type: "string" }, zh: { type: "string" }, ja: { type: "string" }, ko: { type: "string" } } } } } };
  for (let i = 0; i < todo.length; i += 25) {
    const batch = todo.slice(i, i + 25);
    const res = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 16000,
      system: `You translate one-sentence descriptions of open-source software projects that use Jev, TypeSafe's typed-decision model, for a directory. Keep product names, code identifiers, model names, numbers, and units unchanged. Keep each translation one sentence, plain, and as terse as the source. Targets: ${Object.values(LANGS).join(", ")}.`,
      messages: [{ role: "user", content: JSON.stringify(batch.map((e) => ({ id: e.id, section: e.section, en: e.description }))) }],
      output_config: { format: { type: "json_schema", schema } },
    });
    const text = res.content.find((b) => b.type === "text")?.text ?? "{}";
    for (const item of JSON.parse(text).items) {
      const src = batch.find((e) => e.id === item.id);
      if (src) cache[item.id] = { hash: hashOf(src.description), zh: item.zh, ja: item.ja, ko: item.ko };
    }
    writeFileSync(cachePath, JSON.stringify(cache, null, 1) + "\n");
    console.log(`${Math.min(i + 25, todo.length)}/${todo.length}`);
  }
  for (const lang of Object.keys(LANGS)) {
    writeFileSync(`data/i18n/${lang}.json`, JSON.stringify(Object.fromEntries(entries.filter((e) => cache[e.id]).map((e) => [e.id, cache[e.id][lang]])), null, 1) + "\n");
  }
}
if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 3: Install, test, run, commit**

Run: `npm install @anthropic-ai/sdk && node --test scripts/translate.test.mjs && node scripts/translate.mjs` (needs `ANTHROPIC_API_KEY` or an `ant auth login` profile; check `ant auth status` first). If `output_config.format` is rejected by the installed SDK version, replace it with a system-prompt instruction "Respond with only the JSON object" and keep `JSON.parse`.

```bash
git add package.json package-lock.json scripts/translate.mjs scripts/translate.test.mjs data/i18n
git commit -m "Translate entry descriptions into Chinese, Japanese, and Korean, cached by hash"
```

### Task C4: Derived READMEs

**Files:**
- Create: `scripts/build-readme-i18n.mjs`

- [ ] **Step 1: Implement**

```js
#!/usr/bin/env node
// README.<lang>.md from data/projects.json plus data/i18n/<lang>.json. Section names come from site/src/i18n/sections.<lang>.json.
import { readFileSync, writeFileSync } from "node:fs";
const { sections, entries } = JSON.parse(readFileSync("data/projects.json", "utf8"));
const readme = readFileSync("readme.md", "utf8");
const HEAD = { zh: ["简体中文", "此文件由英文列表自动生成，请勿直接编辑。贡献请修改 [readme.md](readme.md)。"], ja: ["日本語", "このファイルは英語のリストから自動生成されています。直接編集せず、[readme.md](readme.md) に貢献してください。"], ko: ["한국어", "이 파일은 영어 목록에서 자동 생성됩니다. 직접 수정하지 말고 [readme.md](readme.md)에 기여해 주세요."] };
const FILE = { zh: "README.zh-CN.md", ja: "README.ja.md", ko: "README.ko.md" };
for (const lang of Object.keys(HEAD)) {
  const tr = JSON.parse(readFileSync(`data/i18n/${lang}.json`, "utf8"));
  const names = JSON.parse(readFileSync(`site/src/i18n/sections.${lang}.json`, "utf8"));
  const out = [`# Awesome Jev (${HEAD[lang][0]})\n`, `> ${HEAD[lang][1]}\n`, `[English](readme.md) · [网站 / サイト / 사이트](https://awesomejev.vercel.app/${lang}/)\n`];
  for (const s of sections) {
    const list = entries.filter((e) => e.section === s.name);
    if (!list.length) continue;
    out.push(`## ${names[s.name] ?? s.name}\n`);
    let sub = null;
    for (const e of list) {
      if (e.subsection !== sub) { sub = e.subsection; if (sub) out.push(`### ${names[sub] ?? sub}\n`); }
      out.push(`- [${e.name}](${e.url}) - ${tr[e.id] ?? e.description}`);
    }
    out.push("");
  }
  writeFileSync(FILE[lang], out.join("\n"));
}
```

`site/src/i18n/sections.{zh,ja,ko}.json`: hand-written map of the 24 section and 10 subsection names.

- [ ] **Step 2: Run and commit**

Run: `node scripts/build-readme-i18n.mjs && head -20 README.zh-CN.md`

```bash
git add scripts/build-readme-i18n.mjs site/src/i18n/sections.*.json README.zh-CN.md README.ja.md README.ko.md
git commit -m "Generate Chinese, Japanese, and Korean readmes from the data"
```

### Task C5: Daily data workflow

**Files:**
- Create: `.github/workflows/data.yml`

- [ ] **Step 1: Workflow**

```yaml
name: data
on:
  schedule:
    - cron: "0 6 * * *"
  workflow_dispatch:
permissions:
  contents: read
jobs:
  refresh:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: true
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version: 22
      - run: npm ci
      - run: npm run parse
      - run: node scripts/enrich-github.mjs
        env:
          GITHUB_TOKEN: ${{ github.token }}
      - run: node scripts/tag-jev.mjs
        env:
          TYPESAFE_API_KEY: ${{ secrets.TYPESAFE_API_KEY }}
      - run: node scripts/translate.mjs
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      - run: node scripts/build-readme-i18n.mjs
      - name: Commit refreshed data
        run: |
          git config user.name 'github-actions[bot]'
          git config user.email '41898282+github-actions[bot]@users.noreply.github.com'
          git add data README.zh-CN.md README.ja.md README.ko.md
          if ! git diff --cached --quiet; then
            git commit -m "data: daily refresh"
            git push origin HEAD:main
          fi
```

- [ ] **Step 2: Secrets and a manual run**

```bash
gh secret set TYPESAFE_API_KEY --repo valentynkit/awesome-jev-typesafe --body "$TYPESAFE_API_KEY"
gh secret set ANTHROPIC_API_KEY --repo valentynkit/awesome-jev-typesafe --body "$ANTHROPIC_API_KEY"
git push && gh workflow run data --repo valentynkit/awesome-jev-typesafe && sleep 90 && gh run list --workflow data --limit 1
```

The `git push` from the workflow triggers Vercel's Git integration, which rebuilds the site with the fresh data.

```bash
git add .github/workflows/data.yml && git commit -m "Refresh GitHub metadata, Jev tags, and translations daily"
```

### Task C6: Rerank endpoint

**Files:**
- Create: `site/src/pages/api/rerank.ts`, `site/src/lib/rerank-core.mjs`, `site/src/lib/rerank-core.test.mjs`

- [ ] **Step 1: Test the core**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { validate, questionsFor, order, Limiter } from "./rerank-core.mjs";
test("validate rejects bad shapes", () => {
  assert.equal(validate({ query: "x", ids: ["a"] }), null);
  assert.match(validate({ query: "", ids: ["a"] }), /query/);
  assert.match(validate({ query: "x", ids: Array(31).fill("a") }), /30/);
});
test("questions and order", () => {
  const q = questionsFor([{ id: "a", text: "A." }, { id: "b", text: "B." }]);
  assert.equal(Object.keys(q).length, 2);
  assert.deepEqual(order(["a", "b"], { c0: { noul: 0.2 }, c1: { noul: 0.9 } }), [{ id: "b", p: 0.9 }, { id: "a", p: 0.2 }]);
});
test("limiter allows 20 per minute per ip and caps the day", () => {
  const l = new Limiter({ perMinute: 2, perDay: 3, now: () => 0 });
  assert.equal(l.take("ip"), true); assert.equal(l.take("ip"), true); assert.equal(l.take("ip"), false);
  assert.equal(l.take("other"), true); assert.equal(l.take("third"), false);
});
```

- [ ] **Step 2: rerank-core.mjs**

```js
export function validate(body) {
  if (!body || typeof body.query !== "string" || !body.query.trim() || body.query.length > 200) return "query must be 1 to 200 chars";
  if (!Array.isArray(body.ids) || !body.ids.length || body.ids.length > 30 || !body.ids.every((s) => typeof s === "string" && s.length < 80)) return "ids must be 1 to 30 strings";
  return null;
}
export const questionsFor = (cands) => Object.fromEntries(cands.map((c, i) => [`c${i}`, { type: "noul", instructions: `Is this project what the user is looking for? Project: ${c.text}` }]));
export const order = (ids, answers) => ids.map((id, i) => ({ id, p: answers[`c${i}`]?.noul ?? 0 })).sort((a, b) => b.p - a.p);

// ponytail: per-instance memory limiter; upgrade to Upstash if abuse shows up in the Jev bill
export class Limiter {
  constructor({ perMinute = 20, perDay = 5000, now = Date.now } = {}) { this.perMinute = perMinute; this.perDay = perDay; this.now = now; this.ips = new Map(); this.day = ""; this.count = 0; }
  take(ip) {
    const t = this.now(), d = new Date(t).toISOString().slice(0, 10);
    if (d !== this.day) { this.day = d; this.count = 0; }
    if (this.count >= this.perDay) return false;
    const hits = (this.ips.get(ip) || []).filter((x) => t - x < 60_000);
    if (hits.length >= this.perMinute) return false;
    hits.push(t); this.ips.set(ip, hits); this.count++;
    return true;
  }
}
```

- [ ] **Step 3: rerank.ts**

```ts
import type { APIRoute } from "astro";
import { byId } from "../../lib/data";
import { validate, questionsFor, order, Limiter } from "../../lib/rerank-core.mjs";
export const prerender = false;
const limiter = new Limiter({ perDay: Number(import.meta.env.JEV_DAILY_CAP ?? process.env.JEV_DAILY_CAP ?? 5000) });
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export const POST: APIRoute = async ({ request, site }) => {
  const origin = request.headers.get("origin");
  if (origin !== site?.origin || request.headers.get("sec-fetch-site") !== "same-origin") return json({ error: "browser only" }, 403);
  const key = process.env.TYPESAFE_API_KEY;
  if (!key) return json({ error: "no key" }, 503);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!limiter.take(ip)) return json({ error: "rate limited" }, 429);
  const body = await request.json().catch(() => null);
  const bad = validate(body);
  if (bad) return json({ error: bad }, 400);
  const cands = body.ids.map((id: string) => byId[id]).filter(Boolean).map((e: any) => ({ id: e.id, text: `${e.name}: ${e.description}` }));
  if (!cands.length) return json({ ranked: [] });
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 3000);
  try {
    const res = await fetch("https://api.typesafe.ai/v1/systemone", {
      method: "POST", signal: ctrl.signal,
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ model: "jev-latest", state: `User query: ${body.query}`, questions: questionsFor(cands) }),
    });
    if (!res.ok) return json({ error: "upstream" }, 502);
    const { answers } = await res.json();
    return json({ ranked: order(cands.map((c: any) => c.id), answers) }, 200);
  } catch {
    return json({ error: "timeout" }, 504);
  } finally { clearTimeout(timer); }
};
```

- [ ] **Step 4: Local test with a fake upstream, then deploy**

Run: `npm test` for the core. For the route: `npx astro dev &` then

```bash
curl -s -X POST localhost:4321/api/rerank -H 'content-type: application/json' -d '{"query":"compaction","ids":["fast-jev-compaction"]}' -w " %{http_code}\n"
```
Expected: `{"error":"browser only"} 403`. Then with headers `-H 'origin: https://awesomejev.vercel.app' -H 'sec-fetch-site: same-origin'` and `TYPESAFE_API_KEY` set in the dev env: `{"ranked":[{"id":"fast-jev-compaction","p":0.9...}]} 200`.

Deploy: `cd site && vercel deploy --prod --yes --scope valentyn-kit`. In the browser on the live site, search "compaction" and confirm the "ranked by Jev" tag appears and bars update.

```bash
git add site/src/pages/api site/src/lib/rerank-core.mjs site/src/lib/rerank-core.test.mjs
git commit -m "Add the browser-only Jev rerank endpoint with a per-instance limiter and daily cap"
```

### Task C7: Vercel firewall rate limit (best effort)

- [ ] **Step 1: Try to add a rule via API**

```bash
curl -s -X PUT -H "Authorization: Bearer $TOKEN" -H "content-type: application/json" "https://api.vercel.com/v1/security/firewall/config?projectId=$(cat site/.vercel/project.json | node -pe 'JSON.parse(require("fs").readFileSync(0)).projectId')&teamId=$TEAM" -d '{"firewallEnabled":true,"rules":[{"name":"rerank-rate","active":true,"conditionGroup":[{"conditions":[{"type":"path","op":"eq","value":"/api/rerank"}]}],"action":{"mitigate":{"action":"rateLimit","rateLimit":{"algo":"fixed_window","window":60,"limit":30,"keys":["ip"],"action":"deny"}}}}]}' | head -c 300
```

If the API answers with a plan restriction, record that in the commit message of the next commit and move on; the in-process limiter and daily cap remain.

---

## Final: verification and handoff

- [ ] Run everything: root `npm run parse && npm test && npm run count-check && npx awesome-lint`; `cd site && npm test && npx astro check && npx astro build`.
- [ ] `gh run list --limit 5` shows lint, check, links green on main.
- [ ] Live checks: `/`, `/zh/`, `/c/coding-agents/`, `/p/jev-belay/`, `/insights/`, `/projects.json`, `/llms.txt`, `/feed.xml`, `/og/jev-belay.png`, `/p/jev-belay.md` all 200.
- [ ] Search on the live site: "compaction" → fast-jev-compaction first; the rerank tag appears within a second.
- [ ] Open a GitHub PR from a branch that adds a malformed bullet and confirm `check` fails with the line number; close it.
- [ ] Update `docs/superpowers/specs/...` "Status" line to "implemented 2026-09-19" and note the limiter deviation.
