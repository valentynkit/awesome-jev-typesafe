# Contributing

Thanks for helping keep this list useful. It is a curation, not a collection: the bar is "would I point a colleague at this", not "does it mention Jev".

## What gets in

An entry must:

- Actually call the Jev API, or be a documented replica of the System One interface on open models. A router or classifier that merely resembles the pattern does not count.
- Be public, have a readme that explains what it does, and not be archived.

And meet at least one of:

- Listed in five or more other Jev lists.
- Twenty or more stars.
- Fills a gap in a category nobody else covers.
- Publishes measured numbers (accuracy, latency, cost) with a method someone else could repeat.

## What stays out

- Repos with no code, or with more prose than code and no runnable check.
- Anything private, paywalled, or too vague to categorize.
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

## Before you open a PR

Run `npx awesome-lint` in the repo root and fix what it reports. The only expected failure is `awesome-git-repo-age` until the repo is thirty days old.

## Removing things

Dead repos, abandoned forks, projects that stopped calling Jev: open a PR that deletes the line and say why in one sentence.
