import type { APIRoute } from "astro";
import { sections, bySection, prose } from "../lib/data";

// Brackets in a name and a bare ) in a url both break the link they sit in.
const label = (s: string) => s.replace(/[[\]]/g, "");
const href = (s: string) => s.replace(/\)/g, "%29");
const line = (s: string) => s.replace(/\s+/g, " ").trim();

export const GET: APIRoute = () => {
  const out: string[] = ["# Awesome Jev", ""];
  for (const s of sections) {
    if (prose.has(s.name) || s.count === 0) continue;
    // Other awesome lists are not what this list is for, and the site no longer has a page for them.
    const list = bySection(s.name).filter((e) => e.type !== "list");
    if (!list.length) continue;
    out.push(`## ${s.name}`, "");
    let sub: string | null = null;
    for (const e of list) {
      if (e.subsection !== sub) {
        sub = e.subsection;
        if (sub) out.push(`### ${sub}`, "");
      }
      out.push(`- [${label(e.name)}](${href(e.url)}) - ${line(e.description)}`);
    }
    out.push("");
  }
  return new Response(out.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
};
