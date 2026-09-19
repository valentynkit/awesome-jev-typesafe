import projectsRaw from "../../../data/projects.json";
import historyRaw from "../../../data/history.json";
import { readFileSync, existsSync } from "node:fs";
import { t } from "./i18n";
import { fileURLToPath } from "node:url";

export type RawEntry = {
  id: string; name: string; url: string; owner: string | null; repo: string | null;
  description: string; section: string; subsection: string | null; order: number;
  type: "project" | "resource" | "list"; image: string | null; maintainer: boolean;
  languageHint: string | null; trustPhrase: string | null; line: number;
};
export type RawSection = { name: string; image: string | null; subs: string[] };
export type Gallery = { url: string; image: string };
type ProjectsFile = { sections: RawSection[]; gallery: Gallery[]; entries: RawEntry[] };

export type GithubMeta = {
  stars: number; forks: number; pushedAt: string; createdAt: string;
  language: string | null; license: string | null; archived: boolean;
  ogImage: string | null; topics: string[]; description: string | null;
  homepage: string | null; gone?: boolean;
  /** Build-time tagging input only. Stripped before anything reaches the browser. */
  readmeExcerpt?: string;
};
/** The live shape. Entries tagged before the question set changed carry only what
 * they carried then, so everything the new questions added is optional. */
export type JevTags = {
  hash?: string;
  useCases?: Record<string, number>;
  form?: string; formP?: number;
  host?: string; hostP?: number;
  audience?: string; audienceP?: number;
  maturity: number; docsQuality?: number;
  hasNumbers: number; looksTemplated?: number; callsJevForReal?: number;
  intents: Record<string, number>;
};
export type JevMeta = { useCases?: Labels; forms?: Labels; hosts?: Labels; audiences?: Labels };
type Labels = Record<string, string>;
type JevFile = { intents?: string[]; meta?: JevMeta; entries?: Record<string, JevTags> };

// Track C writes these; the site has to build before they exist. cwd is site/ under
// astro, but node --test and the Vercel builder can start elsewhere, so try both roots.
const optional = (name: string): any => {
  for (const p of [`../data/${name}`, fileURLToPath(new URL(`../../../data/${name}`, import.meta.url))]) {
    if (existsSync(p)) return JSON.parse(readFileSync(p, "utf8"));
  }
  return {};
};

const raw = projectsRaw as unknown as ProjectsFile;
const history = historyRaw as unknown as { firstSeen: Record<string, string> };
const github: Record<string, GithubMeta> = optional("github.json").repos ?? {};
const jev: JevFile = optional("jev.json");
const i18nDesc: Record<string, Record<string, string>> = {
  zh: optional("i18n/zh.json"),
  ja: optional("i18n/ja.json"),
  ko: optional("i18n/ko.json"),
};

export type Entry = RawEntry & { github: GithubMeta | null; jev: JevTags | null; slugSection: string };

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const gallery = raw.gallery;
export const intents = jev.intents ?? [];
export const jevMeta: JevMeta = jev.meta ?? {};

export const entries: Entry[] = raw.entries.map((e) => ({
  ...e,
  github: e.owner && !github[`${e.owner}/${e.repo}`]?.gone ? github[`${e.owner}/${e.repo}`] ?? null : null,
  jev: jev.entries?.[e.id] ?? null,
  slugSection: slug(e.section),
}));

export const projects = entries.filter((e) => e.type === "project");
export const byId: Record<string, Entry> = Object.fromEntries(entries.map((e) => [e.id, e]));
export const bySection = (name: string) => entries.filter((e) => e.section === name);

export const sections = raw.sections.map((s) => ({
  ...s,
  slug: slug(s.name),
  count: raw.entries.filter((e) => e.section === s.name).length,
}));
export const prose = new Set(["Jev on one screen", "Know before you build"]);
export const categories = sections.filter((s) => s.count > 0 && s.name !== "Other lists");

/** Sections that hold shippable code. Prose and reading lists are not project categories. */
export const notCategories = new Set([...prose, "Start here", "Articles and talks", "Other lists"]);
export const projectSections = categories.filter(
  (s) => !notCategories.has(s.name) && entries.some((e) => e.section === s.name && e.type === "project"),
);
export const resourceSections = categories.filter((s) => s.name === "Start here" || s.name === "Articles and talks");

export const firstSeen: Record<string, string> = history.firstSeen;
export const dataFetchedAt: string | null = optional("github.json").fetchedAt ?? null;

export const describe = (e: Entry, lang: string) =>
  lang === "en" ? e.description : i18nDesc[lang]?.[e.id] ?? e.description;

export const starsBucket = (n: number | undefined) =>
  n == null ? "unknown" : n < 10 ? "0-10" : n < 100 ? "10-100" : n < 1000 ? "100-1k" : "1k+";

export const hostOf = (e: Entry) =>
  e.section === "Coding agents" && e.subsection && e.subsection !== "Skills for writing Jev code"
    ? e.subsection
    : null;

/** Screenshots we host ourselves. GitHub's auto-generated social cards are white and unreadable here. */
export const image = (e: Entry) => (e.image ? `/media/${e.image.replace(/^media\//, "")}` : null);

export const hasOwnImage = (e: Entry) => !!e.image;

export const newSince = (days: number) => {
  const cut = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
  return entries.filter((e) => (firstSeen[e.id] ?? "9999") >= cut);
};

/** Jev answers in keys; the label maps live next to them in data/jev.json so a new
 * key shows up here with a readable name before anyone writes a translation for it. */
const labelBucket: Record<JevNs, keyof JevMeta> = {
  useCase: "useCases", form: "forms", host: "hosts", audience: "audiences",
};
export type JevNs = "useCase" | "form" | "host" | "audience";
export const jevText = (lang: string, ns: JevNs, key: string) => {
  const path = `${ns}.${key}`;
  const translated = t(lang, path);
  return translated === path ? jevMeta[labelBucket[ns]]?.[key] ?? key : translated;
};

/** Use cases Jev is at least `threshold` sure about, strongest first. */
// Top three only: broad Nouls such as playgrounds fire on most of the list, and a facet needs to discriminate.
export const useCasesOf = (e: Entry, threshold = 0.6): [string, number][] =>
  Object.entries(e.jev?.useCases ?? {})
    .filter(([, p]) => p >= threshold)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

export const formOf = (e: Entry) => e.jev?.form ?? null;

/** What the readme says the project plugs into, and only then what Jev guessed. */
export const hostOfJev = (e: Entry) => {
  const sub = hostOf(e);
  if (sub) return sub.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return e.jev?.host && (e.jev.hostP ?? 0) >= 0.6 ? e.jev.host : null;
};

export const tally = (values: (string | null | undefined)[]): [string, number][] => {
  const m = new Map<string, number>();
  for (const v of values) if (v) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
};

/** Chip lists for the two facets that exist only because Jev answered. */
export const facetsFromJev = (list: Entry[]) => ({
  useCase: tally(list.flatMap((e) => useCasesOf(e).map(([k]) => k))),
  form: tally(list.map((e) => formOf(e))),
});

export const readmePath = (e: Entry) =>
  `https://github.com/valentynkit/awesome-jev-typesafe/blob/main/readme.md?plain=1#L${e.line}`;

/** Repo file read at build (readme.md, media/sources.md). Empty string when missing. */
export const repoText = (name: string) => {
  for (const p of [`../${name}`, fileURLToPath(new URL(`../../../${name}`, import.meta.url))]) {
    if (existsSync(p)) return readFileSync(p, "utf8");
  }
  return "";
};

/** Bullets under an H2 in readme.md, markdown stripped to plain text. */
export const readmeBullets = (heading: string) => {
  const body = repoText("readme.md").split(`\n## ${heading}\n`)[1] ?? "";
  return body
    .split("\n## ")[0]
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2).replace(/`([^`]+)`/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));
};

const stars = (e: Entry) => (Number.isFinite(e.github?.stars) ? e.github!.stars : 0);
const repos = entries.filter((e) => e.owner && e.github);

export const stats = {
  entries: entries.filter((e) => e.type !== "list").length,
  projects: projects.length,
  repos: repos.length,
  sections: projectSections.length,
  stars: repos.reduce((n, e) => n + stars(e), 0),
  updated: dataFetchedAt,
};

/** 12.4k, 1,234, 987. Tabular numerals make the k form line up with the plain one. */
export const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 1 : 2).replace(/\.?0+$/, "")}k` : String(n);

export const topStarred = (n: number) =>
  projects.filter((e) => e.github).sort((a, b) => stars(b) - stars(a)).slice(0, n);


/** Real projects, real questions taken from their one-liners. The probabilities are illustrative. */

/** Star count for the header button. One call per build, and the header survives a miss. */
let starCall: Promise<number | null> | null = null;
export const repoStars = () =>
  (starCall ??= fetch("https://api.github.com/repos/valentynkit/awesome-jev-typesafe", {
    headers: { accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(3000),
  })
    .then((r) => (r.ok ? r.json() : null))
    .then((d: any) => (typeof d?.stargazers_count === "number" ? d.stargazers_count : null))
    .catch(() => null));
