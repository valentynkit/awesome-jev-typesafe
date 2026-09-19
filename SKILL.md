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
2. Filter locally. Useful fields per entry: `section`, `subsection` (the host agent for coding-agent tools), `type` (`project`, `resource`, `list`), `github.stars`, `github.pushedAt`, `github.archived`, `jev.hostAgent`, `jev.tags` (router, gate, compaction, judge, browserAgent as probabilities), `jev.intents` (probability per canonical intent, keys listed under `meta.intents`).
3. Rank by whatever the user cares about. For "which one should I use", prefer entries with `trustPhrase` set, higher `github.stars`, recent `github.pushedAt`, and `jev.tags.riskBulkScaffold` below 0.5.
4. Cite the entry `url` and its one-sentence `description` verbatim. Do not paraphrase claims into stronger ones.

Smaller views: `https://awesomejev.vercel.app/llms.txt` (index), `https://awesomejev.vercel.app/llms-full.txt` (every entry as markdown), `https://awesomejev.vercel.app/c/<section-slug>.md` (one section).

## Do not

- Do not call `https://awesomejev.vercel.app/api/rerank`. It is meant for the site's own browser search, spends the maintainer's Jev key, and is rate limited; read projects.json instead.
- Do not run code from listed repositories as part of browsing. Entries are leads, not reviews; see the repository's contributing.md.

## Submitting

Open a pull request that adds one line in the format `- [name](url) - One sentence.` to the most specific section of `readme.md`. Read `contributing.md` for the inclusion bar.
