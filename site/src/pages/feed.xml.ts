import type { APIRoute } from "astro";
import { entries, firstSeen } from "../lib/data";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = ({ site }) => {
  const origin = site!.origin;
  // Other awesome lists are not additions to this list.
  const latest = entries
    .filter((e) => e.type !== "list")
    .sort((a, b) => (firstSeen[b.id] ?? "").localeCompare(firstSeen[a.id] ?? "") || b.order - a.order)
    .slice(0, 50);
  const updated = (firstSeen[latest[0]?.id] ?? new Date().toISOString().slice(0, 10)) + "T00:00:00Z";
  const body = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Awesome Jev</title>
  <link href="${origin}/"/>
  <link rel="self" href="${origin}/feed.xml"/>
  <id>${origin}/</id>
  <updated>${updated}</updated>
${latest
  .map(
    (e) => `  <entry>
    <title>${esc(e.name)}</title>
    <link href="${origin}/p/${e.id}/"/>
    <id>${esc(e.url)}</id>
    <updated>${(firstSeen[e.id] ?? "2026-01-01")}T00:00:00Z</updated>
    <category term="${esc(e.section)}"/>
    <summary>${esc(e.description)}</summary>
  </entry>`,
  )
  .join("\n")}
</feed>
`;
  return new Response(body, { headers: { "content-type": "application/atom+xml; charset=utf-8" } });
};
