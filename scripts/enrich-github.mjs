#!/usr/bin/env node
// Fetch repo metadata for every GitHub entry with GraphQL aliases. Writes data/github.json.
// Readme blobs are big, so a query carries 25 repos instead of 50 when they are asked for.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";

export const batches = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

/** Readme markdown reduced to prose Jev can read: no badges, images, html, or code. */
export const excerpt = (md, n = 900) =>
  String(md)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\[!\[[^\]]*\](\([^)]*\)|\[[^\]]*\])\](\([^)]*\)|\[[^\]]*\])/g, "")
    .replace(/!\[[^\]]*\](\([^)]*\)|\[[^\]]*\])/g, "")
    .replace(/\[([^\]]*)\](\([^)]*\)|\[[^\]]*\])/g, "$1")
    .replace(/^\[[^\]]+\]:.*$/gm, "")
    .replace(/^[ \t]*([-*_=])(\s*\1){2,}[ \t]*$/gm, "")
    .replace(/^#{1,6}[ \t]+/gm, "")
    .replace(/[*_`>|]/g, "")
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .replace(/\n{2,}/g, "\n")
    .trim()
    .slice(0, n);

export const toMeta = (r) => ({
  stars: r.stargazerCount, forks: r.forkCount, pushedAt: r.pushedAt, createdAt: r.createdAt,
  language: r.primaryLanguage?.name ?? null, license: r.licenseInfo?.spdxId ?? null, archived: r.isArchived,
  ogImage: r.openGraphImageUrl ?? null, topics: (r.repositoryTopics?.nodes ?? []).map((n) => n.topic.name),
  description: r.description ?? null, homepage: r.homepageUrl || null,
  ...(r.readme?.text ? { readmeExcerpt: excerpt(r.readme.text) } : {}),
});

const FIELDS = `nameWithOwner description homepageUrl isArchived pushedAt createdAt stargazerCount forkCount primaryLanguage{name} licenseInfo{spdxId} openGraphImageUrl repositoryTopics(first:10){nodes{topic{name}}}`;
const blob = (alias, path) => `${alias}: object(expression:"HEAD:${path}"){... on Blob{text}}`;

export const repoQuery = (batch, fields) =>
  `{ ${batch.map((full, i) => { const [o, n] = full.split("/"); return `r${i}: repository(owner:${JSON.stringify(o)}, name:${JSON.stringify(n)}) { ${fields} }`; }).join("\n")} rateLimit { remaining cost } }`;

async function gql(query, token) {
  const res = await fetch("https://api.github.com/graphql", { method: "POST", headers: { authorization: `bearer ${token}`, "content-type": "application/json" }, body: JSON.stringify({ query }) });
  if (!res.ok) throw new Error(`GraphQL ${res.status}: ${await res.text()}`);
  return res.json();
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is required");
  const wantReadme = !process.argv.includes("--no-readme");
  const { entries } = JSON.parse(readFileSync("data/projects.json", "utf8"));
  const repos = [...new Set(entries.filter((e) => e.owner).map((e) => `${e.owner}/${e.repo}`))];
  const out = existsSync("data/github.json") ? JSON.parse(readFileSync("data/github.json", "utf8")).repos : {};
  // Yesterday's excerpt beats no excerpt when a repo renames or moves its readme.
  const priorExcerpt = Object.fromEntries(Object.entries(out).filter(([, m]) => m.readmeExcerpt).map(([k, m]) => [k, m.readmeExcerpt]));
  const gone = [], misses = [];
  const fields = wantReadme ? `${FIELDS} ${blob("readme", "README.md")}` : FIELDS;
  for (const batch of batches(repos, wantReadme ? 25 : 50)) {
    const { data, errors } = await gql(repoQuery(batch, fields), token);
    const notFound = new Set((errors ?? []).filter((e) => e.type === "NOT_FOUND").map((e) => e.path?.[0]));
    batch.forEach((full, i) => {
      const node = data?.[`r${i}`];
      if (node) {
        out[full] = toMeta(node);
        if (wantReadme && !node.readme?.text) misses.push(full);
      } else if (notFound.has(`r${i}`)) { gone.push(full); out[full] = { ...(out[full] ?? {}), gone: true }; }
      // any other null (rate limit, server error) keeps yesterday's data
    });
    if (errors?.some((e) => e.type !== "NOT_FOUND")) console.error(JSON.stringify(errors.filter((e) => e.type !== "NOT_FOUND"), null, 1));
    console.log(`batch done, rate limit remaining ${data?.rateLimit?.remaining}`);
  }
  // Repos that spell the file readme.md or Readme.md, asked for in one cheap second pass.
  for (const batch of batches(misses, 25)) {
    const { data } = await gql(repoQuery(batch, `${blob("lower", "readme.md")} ${blob("title", "Readme.md")}`), token);
    batch.forEach((full, i) => {
      const text = data?.[`r${i}`]?.lower?.text ?? data?.[`r${i}`]?.title?.text;
      if (text && out[full]) out[full].readmeExcerpt = excerpt(text);
    });
  }
  for (const [full, text] of Object.entries(priorExcerpt)) if (out[full] && !out[full].readmeExcerpt) out[full].readmeExcerpt = text;
  const withReadme = Object.values(out).filter((m) => m.readmeExcerpt).length;

  const today = new Date().toISOString().slice(0, 10);
  writeFileSync("data/github.json", JSON.stringify({ fetchedAt: today, repos: out }, null, 1) + "\n");
  // one small star snapshot per day feeds the trending page; keep the last 60
  mkdirSync("data/stars", { recursive: true });
  writeFileSync(`data/stars/${today}.json`, JSON.stringify(Object.fromEntries(Object.entries(out).filter(([, m]) => m.stars != null).map(([k, m]) => [k, m.stars]))) + "\n");
  for (const f of readdirSync("data/stars").sort().slice(0, -60)) unlinkSync(`data/stars/${f}`);

  const stale = Object.entries(out).filter(([, m]) => m.pushedAt && Date.now() - Date.parse(m.pushedAt) > 90 * 864e5).map(([k]) => k);
  const archived = Object.entries(out).filter(([, m]) => m.archived).map(([k]) => k);
  const summary = `## GitHub enrichment\n\n${repos.length} repos. Gone: ${gone.length}. Archived: ${archived.length}. Stale over 90 days: ${stale.length}. Readme excerpts: ${withReadme}.\n\n${[["Gone", gone], ["Archived", archived], ["Stale", stale]].map(([t, l]) => `### ${t}\n\n${l.map((x) => `- ${x}`).join("\n") || "none"}`).join("\n\n")}\n`;
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, summary, { flag: "a" });
  else console.log(summary);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e); process.exit(1); });
