import type { APIRoute } from "astro";
import { entries, byId, useCasesOf } from "../../lib/data";
import { card } from "../../lib/og";

export const getStaticPaths = () => entries.map((e) => ({ params: { id: e.id } }));

export const GET: APIRoute = async ({ params }) => {
  const e = byId[params.id!];
  const top = useCasesOf(e)[0];
  const png = await card({
    title: e.name,
    subtitle: e.description,
    meta: [e.section, e.github ? `★ ${e.github.stars}` : null].filter(Boolean).join("  ·  "),
    p: top ? top[1] : undefined,
  });
  return new Response(new Uint8Array(png), { headers: { "content-type": "image/png", "cache-control": "public, max-age=31536000, immutable" } });
};
