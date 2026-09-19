# Awesome Jev: README face-lift, directory site, Jev-powered search

Date: 2026-09-19. Status: implemented 2026-09-19, see docs/superpowers/plans/2026-09-19-directory-site.md

## Goal

Turn the list into three things that share one source of truth:

1. A README that reads as maintained and trustworthy at first glance, still passing awesome-lint.
2. A public directory site with instant search, facets, per-category and per-project pages, a gallery, and an insights page built from repo metadata.
3. Jev used inside the site, honestly: build-time tagging of every entry, runtime reranking of a local shortlist, probabilities shown as bars.

Three tracks run in parallel. They meet at `data/projects.json`.

## Non-goals

- Generating README from JSON. README stays hand-written; the parser is the only sync direction.
- Sponsorship pages, gacha or mascot gimmicks, auto-discovery crawler.
- Hand-translated READMEs. Translations are derived artifacts, generated from data, never edited by hand.
- Any badge that is not backed by a real check. No "security verified", no OpenSSF Scorecard, no stars badge under 100 stars.
- Issue-only submission pipeline. PRs stay open. Revisit after the site ships.

## Track A: README

Above the fold, in this order, each its own markdown block separated by blank lines so awesome-lint's heading rule does not merge them:

1. Banner: `<picture>` with `media/banner-dark.svg` and `media/banner-light.svg`, 1200x300, text only: "Awesome Jev", "Typed decisions, System One", "348 projects, every link checked weekly". Verified working on GitHub by awesome-chatgpt-prompts and awesome-claude-code. Run `npx awesome-lint` locally before commit; the heading rule is subtle.
2. `# Awesome Jev [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)` unchanged.
3. Badge row, flat-square, max six: Lint (existing `lint.yml` status), Links (new `links.yml` status), Entries (static number, CI job fails if `grep -c '^- \[' README.md` disagrees), Last commit (`img.shields.io/github/last-commit`), License (`img.shields.io/github/license`), Live site (added only once the Vercel URL resolves).
4. Nav line: Search the site, Categories, Contribute, Agent skill, llms.txt.
5. One `> [!TIP]` block: "Install as an agent skill: `npx skills add valentynkit/awesome-jev-typesafe`".
6. Two-line lede (keep current), then gallery table (keep).
7. New short section before Contents is not allowed by the toc rule. Put the System 1 vs System 2 comparison table inside "Jev on one screen" as its first element, in our voice, with our numbers and caveats.
8. Trust lines as plain text in Contributing, not badges: links checked weekly, every entry hand-reviewed against contributing.md, bulk-scaffold repos flagged.

New files: `llms.txt` (sections and entries as plain markdown, generated from `data/projects.json`), `SKILL.md` (how an agent should query the list, points at `llms.txt` and `projects.json`), `.lycheeignore`.

Repo settings: `gh repo edit --add-topic llm-agents --add-topic system1 --homepage <site url>`; social preview 1280x640 uploaded by hand in Settings (no API).

awesome.re listing: blocked by the 30-day repo-age rule until 2026-10-18. Note it in a TODO, do nothing.

## Track B: data and site

### Source of truth and parser

`scripts/parse-readme.mjs`, Node 22, no dependencies. A line scanner over README tracking current H2, H3, and the last `<a href><img>` banner. Emits `data/projects.json`, sorted by README order. Any `^- ` line it cannot classify throws with the line number; the build fails. That is the drift gate.

Entry schema:

```jsonc
{
  "id": "jev-router",              // slug of name; "-<owner>" appended on collision
  "name": "jev-router",
  "url": "https://github.com/gargpratyush/jev-router",
  "owner": "gargpratyush",          // null when not github.com
  "repo": "jev-router",             // null when not github.com
  "description": "Routes each task to the cheapest Claude model that can handle it.",
  "section": "Coding agents",
  "subsection": "Claude Code",      // null when none
  "order": 42,
  "type": "project",                // project | resource | list
  "image": "media/pi-warden.png",   // null; from section banner href match or gallery
  "maintainer": false,              // "By this list's maintainer." stripped from description
  "languageHint": null,             // "Chinese readme" etc, or CJK script detected in name
  "trustPhrase": null               // raw matched phrase: "vendor-reported", "reports 44 percent"
}
```

Classification rules found in the current README:

- "Jev on one screen" and "Know before you build": bullets without links, skipped. A linked bullet there is an error.
- "Start here", "Articles and talks" and children: `type: resource`.
- "Other lists": `type: list`, excluded from charts, shown on its own page.
- Everything else: `type: project`, GitHub or not.
- Name collisions are real distinct projects (`pi-jev` x2, `jev-browser` x3, `openjev` x2, `jev-mcp`, `jev-cli`, `jeff` x2). Never dedupe.
- Gallery `<table>` tiles must each match a body entry by URL, else error.
- Section banner `<a><img>` attaches to the section and to the one entry whose URL matches its href.

Counts today: 348 linked entries, 277 GitHub, 92 other, 24 H2, 10 H3, 5 maintainer entries, 6 gallery tiles, 18 section banners.

### Enrichment

`scripts/enrich-github.mjs`, GraphQL with aliases, 50 repos per query, about 6 queries, default `GITHUB_TOKEN`. Fields: description, homepageUrl, isArchived, isFork, pushedAt, createdAt, stargazerCount, forkCount, primaryLanguage, licenseInfo.spdxId, repositoryTopics(10), openGraphImageUrl, latestRelease, last commit date. Null alias plus NOT_FOUND error means renamed or gone; one REST HEAD on those only. Output `data/github.json` keyed by `owner/repo` with `fetchedAt`, committed daily. Health table (archived, stale over 90 days, gone) goes to the job summary, never an auto-filed issue.

### Site

Stack: Astro, static output, `@astrojs/vercel` adapter so one endpoint can opt out of prerender. Lives in `site/`. Search island only; everything else is HTML. Data read from `data/*.json` at build.

Pages:

| Page | Route | Must |
|---|---|---|
| Home | `/` | hero, search, category grid, gallery, stats strip |
| Category | `/c/<slug>/` | one per H2, H3 as anchors |
| Project | `/p/<id>/` | thin: name, description, links, image or OG thumbnail, facets, Jev tags with bars |
| Insights | `/insights/` | six build-time SVG charts |
| Other lists | `/lists/` | the `list` entries |
| About | `/about/` | "Know before you build" verbatim, contributing summary, credits from `media/sources.md` |
| Machine | `/projects.json`, `/llms.txt`, `/llms-full.txt`, `/skill.md`, `/feed.xml`, `/sitemap.xml`, markdown twins of every page | see Machine access |

Search: MiniSearch over name, description, section, subsection, owner, topics. Facets as multi-select chips, ANDed: section, host agent (from H3), language, license, has media, stars bucket (0-10, 10-100, 100-1k, 1k+), maintainer. State in URL query. `/` focuses search, `Cmd+K` opens palette, arrows and Enter navigate, Esc clears. Live "n of 369" count. Sort: relevance while searching, stars, newest, recently pushed, A to Z. Empty state echoes the query and offers clearing filters.

Insights, all SVG strings emitted at build, no chart library: entries per section, language mix, activity recency buckets (7d, 30d, 90d, stale, archived), stars histogram on a log axis, host-agent mix, additions per week from `git log --format=%aI -- README.md`. "Rising" waits for a week of `data/github.json` history.

Media: local screenshot when one exists, else `openGraphImageUrl`, else a build-time card (name, section glyph, language bar, stars) at the same aspect ratio. GIF sources stay stills. Hero is a mosaic of the real screenshots, not one image.

### Visual system: Instrument Panel

Jev's claim is calibration, so the site looks like a measuring instrument, not a workshop.

| Role | Dark (default) | Light |
|---|---|---|
| canvas | `#0B0E11` | `#F4F6F8` |
| surface | `#12161B` | `#FFFFFF` |
| text | `#E8EDF2` | `#14181D` |
| muted | `#7C8791` | `#5B6670` |
| accent | `#4CC9F0` | `#0E8FB5` |
| accent-2 | `#FFB454` | `#B8690A` |
| danger | `#FF5D5D` | `#C43030` |

Type: Space Grotesk display, Public Sans body, Fira Code mono, all self-hosted via fontsource. Tabular numerals on every number.

Motifs: every card carries a small horizontal probability bar (its top Jev tag) with tick marks; the hero shows a gauge sweeping to a probability next to a latency readout and a scrolling typed request. Faint SVG grain on canvas. `prefers-color-scheme` plus a toggle in localStorage. Light mode accents are darkened to keep 4.5:1 on text.

Techniques, all static-safe: View Transitions API on card to project, scroll-driven reveal, container queries on the grid, `@starting-style` on chips and dialog, `text-wrap: balance`, `<search>` landmark, `<dialog>` quick preview, `hidden=until-found` on collapsed lists, `content-visibility: auto` on off-screen cards, sticky filter bar. No skeletons; data is static.

Accessibility floor: 4.5:1 text contrast measured on real CSS variables, focus rings visible, reduced-motion disables the gauge sweep and reveals, all facets keyboard-operable.

### Languages

Site UI and entry descriptions in English, Simplified Chinese, Japanese, and Korean, the four with visible Jev communities in the list itself (Chinese readmes, Japanese and Korean benchmarks and articles). Astro i18n routing: `/` English, `/zh/`, `/ja/`, `/ko/`, `hreflang` links on every page, language switch in the header remembering the choice in localStorage.

Translation is text generation, which Jev cannot do. `scripts/translate.mjs` sends each new or changed description to Claude Haiku 4.5 with the section name as context, three languages in one call, output `data/i18n/<lang>.json` keyed by entry id and description hash. Unchanged hashes skip, so a daily run costs cents only when README changed. UI strings live in `site/src/i18n/<lang>.json`, hand-written once. Section names get a hand-written table too, since 24 strings do not need a model.

Derived READMEs: `README.zh-CN.md`, `README.ja.md`, `README.ko.md`, generated by `scripts/build-readme-i18n.mjs` from `data/projects.json` plus `data/i18n/`, same section order, a one-line header saying it is generated from the English list and how to contribute. awesome-lint runs on README.md only. A language nav line sits under the badge row.

Search indexes the active language's descriptions plus English names, so a Chinese query finds an English-named project through its translated one-liner.

### Machine access

Agents get everything as static files and do the searching themselves; 348 entries fit in any context window, so no server-side search exists for them and no Jev cost is incurred on their behalf.

- `/projects.json`: every entry with parser fields, GitHub metadata, Jev tags, and the intent-probability matrix. This is the API.
- `/llms.txt`: short index per llmstxt.org, one line per section with counts and the URL of each section's markdown twin. `/llms-full.txt`: the whole list as markdown.
- Markdown twins for every HTML page: `/p/<id>.md`, `/c/<slug>.md`, `/insights.md`, linked from each page with `<link rel="alternate" type="text/markdown">`. Static, generated at build.
- `/skill.md` and repo `SKILL.md`: tells an agent to fetch `projects.json` once, filter by `section`, `hostAgent`, `tags`, or the intent matrix, and never to call `/api/rerank`. Installable with `npx skills add valentynkit/awesome-jev-typesafe`.
- JSON-LD on every page so crawlers and answer engines index structure, `robots.txt` allows all known AI crawlers explicitly.
- `/api/rerank` rejects requests without the site origin and a browser `Sec-Fetch-Site: same-origin` header, so agents cannot spend the key even by accident. `SKILL.md` and `llms.txt` say so.

Later, if agents keep asking: an `npx awesome-jev` CLI and MCP server that download `projects.json` and search on the agent's machine. Zero cost to us, but not needed until the JSON alone proves insufficient.

## Track C: Jev inside

API (docs.typesafe.ai/api): `POST https://api.typesafe.ai/v1/systemone`, bearer key, `model: "jev-latest"`, `state` plus a `questions` map. Choice answers carry per-option `probabilities` and a `confidence`; Noul answers carry a probability; Score answers carry a value plus probabilities.

### Build time (Actions secret `TYPESAFE_API_KEY`)

`scripts/tag-jev.mjs`: one request per project entry, state = description plus fetched repo description, stars, pushedAt. Questions in one call: `primary_section` (Choice over 20 project sections), `host_agent` (Choice: claude_code, codex, pi, hermes, agent_zero, any, none), `maturity` (Score: toy, early, usable, solid, battle-tested), `has_measured_numbers` (Noul), `is_router`, `is_gate`, `is_compaction`, `is_judge`, `is_browser_agent` (Noul each), `risk_bulk_scaffold` (Noul), plus about 30 canonical-intent Nouls ("wants to route between models", "wants a stop hook", "wants a reranker", ...). About 700 tokens per entry, whole list about $0.01. Output `data/jev.json`, committed by the same daily workflow after enrichment. Cache by hash of the state; skip unchanged entries.

The intent matrix lets the client rank by precomputed probability when a query matches an intent label, with zero runtime calls.

### Runtime

`site/src/pages/api/rerank.ts`, `prerender = false`, deployed as a Vercel Function. Input: query plus up to 30 candidate ids chosen by MiniSearch on the client. Server rebuilds the one-liners from its own copy of `projects.json` (never trusts client text), sends one request with 30 Noul questions "is this candidate what the user wants", returns ids sorted by probability. Cap 30, matching the vendor's own reranker recipe and staying far under 32k tokens.

Guards: origin check against the site host, `@upstash/ratelimit` sliding window per IP (20 per minute) on Upstash Redis from the Vercel marketplace free tier, a daily global counter in the same Redis that flips the endpoint to 503 past a ceiling (start at 5000 calls per day, about $0.50), 3 s upstream timeout.

Client: local results render immediately, the rerank call fires debounced at 350 ms, results reorder in place when it resolves, any failure keeps local order silently. A small "ranked by Jev" indicator appears only when the rerank succeeded. Per-result bars show the returned probability.

### Demo

Project page and result cards show the build-time probabilities as bars. No standalone playground; it does not help anyone find a project.

### Caveats stated on the About page

No embeddings, cannot count, accuracy degrades with noisy state, 68 percent on the vendor eval. Jev reorders a shortlist a human scans; it never gates anything.

## CI

Four workflows plus Vercel, all actions pinned to SHAs, least privilege per job:

| File | Trigger | Permissions | Does | On failure |
|---|---|---|---|---|
| `lint.yml` (exists) | push, PR | read | awesome-lint on README.md | PR red |
| `check.yml` | PR, push | read | parser on README (drift gate), duplicate-URL check, entries-count badge check, `node --test` for scripts and site, contrast assertion on both themes | PR red, comment names the offending README line |
| `links.yml` | PR touching README, weekly Monday, manual | read | lychee over README and generated READMEs | job summary lists dead links |
| `data.yml` | daily 06:00 UTC, manual | contents write in commit step only | enrich GitHub, tag with Jev, translate changed entries, regenerate derived READMEs, llms.txt, one commit "data: daily refresh" | no commit, summary shows error and the health table |
| Vercel Git integration | push to main, every PR | none in repo | production deploy, preview URL on the PR | last good deploy stays |

Dependabot for npm in `site/` and for GitHub Actions, weekly, grouped. Branch protection on main requires lint and check. Secrets: `TYPESAFE_API_KEY`, `ANTHROPIC_API_KEY`, default `GITHUB_TOKEN`; Vercel holds `TYPESAFE_API_KEY` and the Upstash pair.

## Smart improvements

Ship with the site:

- New-this-week strip on home and `/feed.xml`, both from README git history, so the list has a heartbeat without a crawler.
- Archived, gone, and stale entries get a small label on their card from `data/github.json`; the daily summary lists prune candidates so removals become one-line PRs.
- Per-project Open Graph image at build (name, one-liner, section, stars, probability bar) so any shared project link renders a card.
- JSON-LD `ItemList` on category pages, `SoftwareSourceCode` on project pages, sitemap, robots.
- Copy-to-clipboard install line on project pages when the repo publishes an npm, PyPI, or crates package (detected from the enrichment topics and homepage).
- PR preview comment: `check.yml` renders the parsed new entries as a table under the Vercel preview link so a reviewer sees the card before merge.
- Duplicate-URL and duplicate-name-without-owner checks in the parser, matching contributing.md rules.

Later, once data accumulates:

- Rising entries from seven-day star deltas in `data/github.json` history.
- Star sparkline per project from the same history.
- Issue form for submissions that pre-validates the entry line; PRs still accepted.

## Repo layout

```
README.md, contributing.md, license, media/      unchanged
llms.txt, SKILL.md                                new, generated then committed
README.zh-CN.md, README.ja.md, README.ko.md       generated, committed
scripts/parse-readme.mjs, enrich-github.mjs, tag-jev.mjs, translate.mjs,
        build-readme-i18n.mjs, build-llms.mjs
data/projects.json, github.json, jev.json, i18n/  generated, committed
site/                                             Astro project, own package.json
site/dist/                                        gitignored
docs/superpowers/specs/, plans/
```

`awesome-lint` ignores non-README files, so `site/` and `data/` do not affect it. Vercel project root is `site/`, build command `node ../scripts/parse-readme.mjs && astro build`.

## Testing

- `scripts/*.test.mjs` with `node --test`: parser fixtures for every edge case above, a fixture README that must throw, enrichment response mapping, tag request shape and cache skip.
- Build gate: `parse-readme` exits non-zero on drift; `links.yml` count check.
- Site: one Playwright smoke run in CI-less local use: home renders 348 entries in `projects.json`, search for "compaction" returns fast-jev-compaction first, facet chip filters, project page has bars.
- Contrast: a script that resolves the CSS variables and asserts 4.5:1 for text roles in both themes.
- Rerank endpoint: local run with a fake upstream, asserts cap 30, origin rejection, 429 after 20, 503 after the daily ceiling.

## Sequencing

Parallel tracks with one shared prerequisite: the parser and `data/projects.json` land first (half a day). Then:

- A: banner, badges, `links.yml`, `check.yml`, llms/SKILL, System 1 vs 2 table, topics, language nav.
- B: Astro scaffold, visual system, i18n routing and UI strings, pages, search, insights, media fallbacks, OG images, Vercel deploy.
- C: enrich, tag, translate, derived READMEs, `data.yml`, rerank endpoint, client wiring, bars.

New projects the maintainer lists go straight into README at any time; the parser picks them up on next build.

## Deviations

What shipped differs from the design above in four places:

- Entry count is 348, not the 369 quoted for the live search counter. The larger number counted table-of-contents lines as entries.
- Rerank rate limiting is an in-process limiter in the endpoint plus a Vercel WAF rule, not Upstash Redis. One less service to hold a secret for, at the cost of per-instance counters.
- Translations are produced with claude-opus-5.
- The entries badge is unlinked and the nav "Contribute" points at the readme's own section anchor rather than contributing.md. Both are awesome-lint's no-duplicate-links rule, not a preference.
