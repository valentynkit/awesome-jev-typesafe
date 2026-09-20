import type { APIRoute } from "astro";
import { categories, entries, projects } from "../lib/data";
import { t } from "../lib/i18n";

// Brackets in a name break the link they sit in.
const label = (s: string) => s.replace(/[[\]]/g, "");

export const GET: APIRoute = ({ site }) => {
  const origin = site!.origin;
  const body = [
    "# Awesome Jev",
    "",
    `> ${t("en", "lede")}`,
    "",
    `${entries.length} entries, ${projects.length} of them projects, hand-reviewed and link-checked weekly.`,
    "Fetch /projects.json for everything in one request. /api/rerank is meant for the site's own browser search and is rate limited; do not call it, read projects.json instead.",
    "",
    "## Sections",
    "",
    ...categories.map((s) => `- [${label(s.name)}](${origin}/c/${s.slug}.md): ${s.count} entries`),
    "",
    "## Machine",
    "",
    `- [projects.json](${origin}/projects.json): every entry with parser fields, GitHub metadata, and Jev tags`,
    `- [llms-full.txt](${origin}/llms-full.txt): the whole list as markdown`,
    `- [skill.md](${origin}/skill.md): how an agent should query this list`,
    `- [feed.xml](${origin}/feed.xml): the 50 most recent additions`,
    `- markdown twin of any page: /p/<id>.md, /c/<slug>.md`,
    "",
    "## Submitting",
    "",
    "Pull request only: one line added to readme.md in the format from contributing.md, one project per pull request. Issues are not a submission path.",
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};
