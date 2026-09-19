import type { APIRoute } from "astro";
import { repoText, entries, projects, sections } from "../lib/data";

// SKILL.md is hand-written in the repo root (Track A). Until it lands, serve the same contract.
const fallback = (origin: string) => `# Awesome Jev

A curated list of ${entries.length} things built on TypeSafe's Jev, ${projects.length} of them projects, in ${sections.filter((s) => s.count > 0).length} sections.

## How to query it

1. Fetch \`${origin}/projects.json\` once. It is the whole list, about 200 KB, and it fits in any context window.
2. Filter in your own process on \`section\`, \`subsection\`, \`type\`, \`maintainer\`, the GitHub metadata, or the Jev intent matrix.
3. Fetch \`${origin}/llms-full.txt\` instead if you only want the markdown.

## Do not

- Do not call \`/api/rerank\`. It is meant for the site's own browser search, it spends the maintainer's API key, and it is rate limited. Read \`projects.json\` instead.
- Do not crawl the HTML pages. Every one of them has a markdown twin at \`/p/<id>.md\` and \`/c/<slug>.md\`.

## Submitting

The readme is the only hand-edited source. Open a pull request against \`readme.md\` with one entry, one sentence, and a link that resolves.
`;

export const GET: APIRoute = ({ site }) => {
  const body = repoText("SKILL.md") || fallback(site!.origin);
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
};
