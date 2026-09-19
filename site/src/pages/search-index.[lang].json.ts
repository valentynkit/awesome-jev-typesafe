import type { APIRoute } from "astro";
import { projects, hostOfJev, useCasesOf, formOf, starsBucket, firstSeen, describe } from "../lib/data";
import { locales } from "../lib/i18n";

export const getStaticPaths = () => locales.map((lang) => ({ params: { lang } }));

export const GET: APIRoute = ({ params }) => {
  const lang = params.lang ?? "en";
  const docs = projects.map((e) => ({
    id: e.id,
    name: e.name,
    description: describe(e, lang),
    section: e.section,
    subsection: e.subsection ?? "",
    host: hostOfJev(e),
    owner: e.owner,
    topics: e.github?.topics?.join(" ") ?? "",
    language: e.github?.language ?? "unknown",
    license: e.github?.license ?? "unknown",
    stars: e.github?.stars ?? 0,
    starsBucket: starsBucket(e.github?.stars),
    hasMedia: !!e.image,
    maintainer: e.maintainer,
    useCases: useCasesOf(e).map(([k]) => k),
    form: formOf(e),
    jevHost: e.jev?.host ?? null,
    intents: e.jev?.intents ?? {},
    firstSeen: firstSeen[e.id] ?? "",
    pushedAt: e.github?.pushedAt ?? "",
  }));
  return new Response(JSON.stringify(docs), { headers: { "content-type": "application/json" } });
};
