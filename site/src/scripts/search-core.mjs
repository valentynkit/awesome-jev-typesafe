import MiniSearch from "minisearch";

export function buildIndex(docs) {
  const ms = new MiniSearch({
    fields: ["name", "description", "section", "subsection", "host", "owner", "topics", "useCases", "form"],
    storeFields: ["id"],
    searchOptions: { boost: { name: 3, description: 1.5 }, prefix: true, fuzzy: 0.2, combineWith: "AND" },
  });
  ms.addAll(docs);
  return ms;
}

// Maintainer and stars are derived; every other facet maps onto a doc field. A facet
// may answer with an array, and then the doc counts as having every value in it.
export const facetValue = (d, k) =>
  k === "maintainer" ? (d.maintainer ? "yes" : "no")
  : k === "stars" ? d.starsBucket
  : k === "useCase" ? d.useCases ?? []
  : d[k];

const values = (v) => (Array.isArray(v) ? v : [v]);

export function applyFacets(docs, facets) {
  return docs.filter((d) =>
    Object.entries(facets).every(([k, vals]) => !vals?.length || values(facetValue(d, k)).some((v) => vals.includes(v))),
  );
}

// What each chip of one facet would yield: the pool minus that facet's own selection,
// so picking a value never zeroes out its siblings.
export function facetCounts(docs, facets, key) {
  const counts = new Map();
  for (const d of applyFacets(docs, { ...facets, [key]: [] })) {
    for (const v of values(facetValue(d, key))) {
      if (v == null) continue;
      counts.set(String(v), (counts.get(String(v)) ?? 0) + 1);
    }
  }
  return counts;
}

const words = (s) => new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2));

export function matchIntent(query, intents) {
  const q = words(query);
  let best = null, score = 0;
  for (const it of intents) {
    const w = words(it);
    if (!w.size) continue;
    const overlap = [...w].filter((x) => q.has(x)).length / w.size;
    if (overlap > score) { score = overlap; best = it; }
  }
  return score >= 0.5 ? best : null;
}

export function sortDocs(docs, sort) {
  const by = {
    stars: (a, b) => (b.stars ?? 0) - (a.stars ?? 0),
    newest: (a, b) => String(b.firstSeen).localeCompare(String(a.firstSeen)),
    recent: (a, b) => String(b.pushedAt).localeCompare(String(a.pushedAt)),
    az: (a, b) => a.name.localeCompare(b.name),
  };
  return by[sort] ? [...docs].sort(by[sort]) : docs;
}

// A handful of words people type instead of the word the README uses. Expanded as
// nested OR subqueries so the AND between the typed words still holds.
export const SYNONYMS = {
  compaction: ["compaction", "pruning"], pruning: ["pruning", "compaction"],
  router: ["router", "routing", "route"], routing: ["routing", "router", "route"], route: ["route", "router", "routing"],
  gate: ["gate", "guard", "approve", "approval"], guard: ["guard", "gate", "approve", "approval"],
  mcp: ["mcp", "model", "context", "protocol"],
  cli: ["cli", "command", "terminal"],
  rerank: ["rerank", "reranker", "ranking", "rank"], reranker: ["reranker", "rerank", "ranking", "rank"],
  hook: ["hook", "hooks"], skill: ["skill", "skills"], judge: ["judge", "verify", "verifier", "review"],
};

export function expandQuery(q) {
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const parts = words.map((w) => (SYNONYMS[w] ? { queries: SYNONYMS[w], combineWith: "OR" } : w));
  return parts.length > 1 ? { queries: parts, combineWith: "AND" } : (parts[0] ?? q);
}
