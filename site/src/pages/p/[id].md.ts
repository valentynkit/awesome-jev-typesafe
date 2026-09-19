import type { APIRoute } from "astro";
import { entries, byId, firstSeen, hostOf, useCasesOf, formOf, jevMeta } from "../../lib/data";

export const getStaticPaths = () => entries.map((e) => ({ params: { id: e.id } }));

// A newline inside a field would end the bullet it belongs to.
const line = (s: string) => s.replace(/\s+/g, " ").trim();

export const GET: APIRoute = ({ params, site }) => {
  const e = byId[params.id!];
  const g = e.github;
  const label = (k: string) => jevMeta.useCases?.[k] ?? k;
  const uses = useCasesOf(e);
  const form = formOf(e);
  const body = [
    `# ${line(e.name)}`,
    "",
    line(e.description),
    "",
    `- URL: ${e.url}`,
    `- Section: ${e.section}${e.subsection ? ` / ${e.subsection}` : ""}`,
    hostOf(e) ? `- Host agent: ${hostOf(e)}` : null,
    `- Type: ${e.type}`,
    g ? `- Stars: ${g.stars}` : null,
    g ? `- Pushed: ${g.pushedAt}` : null,
    g?.language ? `- Language: ${g.language}` : null,
    g?.license ? `- License: ${g.license}` : null,
    g?.archived ? "- Archived: yes" : null,
    e.maintainer ? "- By this list's maintainer" : null,
    e.trustPhrase ? `- Claim in the entry: ${line(e.trustPhrase)}` : null,
    firstSeen[e.id] ? `- First seen: ${firstSeen[e.id]}` : null,
    form ? `- Form: ${jevMeta.forms?.[form] ?? form}` : null,
    uses.length ? `- Useful for: ${uses.map(([k, p]) => `${label(k)} (${p.toFixed(2)})`).join(", ")}` : null,
    "",
    `Page: ${site!.origin}/p/${e.id}/`,
    "",
  ]
    .filter((l) => l !== null)
    .join("\n");
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8" } });
};
