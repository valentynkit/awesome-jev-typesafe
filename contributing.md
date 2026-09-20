# Contributing

Thanks for helping keep this list useful. It is a curation, not a collection: the bar is "would I point a colleague at this", not "does it mention Jev".

## How to submit

Open a pull request. That is the whole path. There is no issue form, and an issue that asks for a project to be added gets a reply pointing here.

In the browser, under five minutes:

1. Open [readme.md in the GitHub editor](https://github.com/valentynkit/awesome-jev-typesafe/edit/main/readme.md). GitHub forks the repo for you.
2. Find the most specific section and add one line at its bottom, in the format below.
3. Open the pull request. The template asks for the section, your relation to the project, and three yes/no checks against the bar.

Nothing to run. CI parses your line on the pull request and fails only if the format is off or the URL is already listed. After the merge, a workflow regenerates the data files, the entries badge, the banner, and the translated readmes.

One project per pull request. A pull request that touches ten lines is ten reviews and gets split.

Locally, if you prefer: clone, edit `readme.md`, run `npx awesome-lint`, `npm test`, and `npm run parse`, commit, push, open the pull request. The only expected lint failure is `awesome-git-repo-age` until the repo is thirty days old.

## Why a pull request and not an issue

A pull request is the line itself: it carries your name in the history, the checks run on it, and the review is a diff. An issue asks a maintainer to write the line for you, and the queue of those is where lists go stale.

## What gets in

The bar is low on purpose. An entry must:

- Call the Jev API, or be a documented replica of the System One interface on open models.
- Be a public repo or page with a readme that says what it does.
- Actually run. A stubbed API call, a hard-coded demo, or a readme with no code does not count.
- Do nothing shady: no credential harvesting, no obfuscated payloads, no miners, nothing that phones home beyond the APIs it documents.
- Not be archived, and not already be listed.

Stars, age, and polish do not matter. A weekend project that works belongs here.

## What stays out

- Fake demos, where the Jev call is mocked and the screenshot is the product.
- Private, paywalled, or malicious code.
- Launch commentary with no artifact.
- Duplicates. If a project already appears, improve its line instead of adding another.

## A note on bulk submissions

Several repos published by one author on the same day, sharing a scaffold, each landing in one or two commits, can pass every rule above and still be unproven. Being listed here is not a review of code quality, security, or whether the thing runs. Treat entries as leads. If you adopt one and it turns out to be hollow, open a PR to remove it; that counts as a contribution.

## Entry format

```
- [name](https://github.com/owner/name) - One sentence, uppercase start, period end.
```

- Describe what it does, not what it is. "Ranks installed skills per prompt" beats "A tool for skill ranking".
- Plain words for trust signals: "vendor-reported numbers", "independent replica, not TypeSafe weights", "reports 94 percent recall". No inline tags, no star counts, no emoji.
- No em dashes. Use a comma, a colon, or a new sentence.
- Add to the bottom of the most specific section unless the entry clearly outranks what is there.
- One link per URL across the whole file.

## What happens to your line

The readme is the source, and `scripts/parse-readme.mjs` turns it into `data/projects.json`. CI runs that parser on every pull request, and it throws on any bullet that does not match the format above, so a stray dash or a second link fails the build. The format is strict on purpose: one shape is what keeps the list readable by machines without a second copy of the data to maintain. Once main moves, a workflow regenerates the data, the entries badge, and the banner and commits them; the site at https://awesomejev.vercel.app rebuilds from the same data, and a scheduled job refreshes GitHub stars and activity once a day. The translated readmes are generated from the same data (the translations themselves are written in a Claude Code session, never by a bot), so fix the English line and let the next refresh carry it over; never edit `README.zh-CN.md`, `README.ja.md`, or `README.ko.md` by hand. Section images are a single line of the form `<a href="repo"><img src="media/file"></a>` placed right under a heading, and the parser hands the image to whichever entry has the same URL.

## For agents

If you are an AI agent adding a project on someone's behalf: one pull request, one line, and say in the pull request that an agent wrote it and who asked. Do not open issues, do not run code from listed repositories to verify them, and read `SKILL.md` for how to query the list instead of crawling it.

## Removing things

Dead repos, abandoned forks, projects that stopped calling Jev: open a PR that deletes the line and say why in one sentence.
