/**
 * Rankings for /trending/. Everything here reads the data files directly rather than
 * going through data.ts, so the pure helpers stay importable from `node --test`, and it
 * returns ids and numbers only: the page joins them back to entries for the display text.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

export type Snapshot = { date: string; stars: Record<string, number> };
export type Row = { id: string; repo: string; stars: number; delta?: number; pushedAt?: string; firstSeen?: string };

// cwd is site/ under astro, but node --test and the Vercel builder can start elsewhere.
const locate = (rel: string) => {
  for (const p of [`../${rel}`, fileURLToPath(new URL(`../../../${rel}`, import.meta.url))]) {
    if (existsSync(p)) return p;
  }
  return null;
};
const readJson = (rel: string) => {
  const p = locate(rel);
  return p ? JSON.parse(readFileSync(p, "utf8")) : null;
};

type Meta = { stars: number; pushedAt: string; archived: boolean; gone?: boolean };
type Ent = { id: string; owner: string | null; repo: string | null; type: string };

const entries: Ent[] = readJson("data/projects.json")?.entries ?? [];
const repos: Record<string, Meta> = readJson("data/github.json")?.repos ?? {};
const firstSeen: Record<string, string> = readJson("data/history.json")?.firstSeen ?? {};

const key = (e: Ent) => `${e.owner}/${e.repo}`;
const hosted = entries.filter((e) => e.type === "project" && e.owner && e.repo && !repos[key(e)]?.gone);
/** "owner/repo" to entry id, the join between a stars snapshot and the list. */
export const entriesByRepo: Record<string, string> = Object.fromEntries(hosted.map((e) => [key(e), e.id]));

/** One file per day in data/stars, oldest first. Empty until the first refresh lands. */
export function snapshots(): Snapshot[] {
  const dir = locate("data/stars");
  if (!dir) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => ({ date: f.slice(0, -5), stars: JSON.parse(readFileSync(`${dir}/${f}`, "utf8")) }));
}

/**
 * Star delta over the window, newest snapshot minus the oldest one still inside it.
 * The window is anchored on the newest snapshot rather than on today, so a stale data
 * directory still ranks something instead of going blank.
 */
export function rising(snaps: Snapshot[], byRepo: Record<string, string>, days = 7, top = 12): Row[] {
  if (snaps.length < 2) return [];
  const newest = snaps[snaps.length - 1];
  const cut = new Date(Date.parse(newest.date + "T00:00:00Z") - days * 864e5).toISOString().slice(0, 10);
  const window = snaps.filter((s) => s.date >= cut);
  if (window.length < 2) return [];
  const oldest = window[0];
  const rows: Row[] = [];
  for (const [repo, stars] of Object.entries(newest.stars)) {
    const before = oldest.stars[repo];
    const id = byRepo[repo];
    if (before == null || !id) continue;
    rows.push({ id, repo, stars, delta: stars - before });
  }
  return rows
    .filter((r) => r.delta! > 0)
    .sort((a, b) => b.delta! - a.delta! || b.stars - a.stars)
    .slice(0, top);
}

export const risingWeek = (top = 12) => rising(snapshots(), entriesByRepo, 7, top);

const withMeta = () => hosted.map((e) => ({ e, m: repos[key(e)] })).filter((x): x is { e: Ent; m: Meta } => !!x.m);

export const mostStarred = (n = 12): Row[] =>
  withMeta()
    .sort((a, b) => b.m.stars - a.m.stars)
    .slice(0, n)
    .map(({ e, m }) => ({ id: e.id, repo: key(e), stars: m.stars }));

export const recentlyPushed = (n = 12): Row[] =>
  withMeta()
    .filter(({ m }) => m.pushedAt)
    .sort((a, b) => Date.parse(b.m.pushedAt) - Date.parse(a.m.pushedAt))
    .slice(0, n)
    .map(({ e, m }) => ({ id: e.id, repo: key(e), stars: m.stars, pushedAt: m.pushedAt }));

export function newThisMonth(days = 30): Row[] {
  const cut = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
  return entries
    .filter((e) => (firstSeen[e.id] ?? "9999") >= cut)
    .map((e) => ({ id: e.id, repo: e.owner ? key(e) : "", stars: repos[key(e)]?.stars ?? 0, firstSeen: firstSeen[e.id] }))
    .sort((a, b) => (b.firstSeen ?? "").localeCompare(a.firstSeen ?? "") || b.stars - a.stars);
}

const repoById: Record<string, string> = Object.fromEntries(hosted.map((e) => [e.id, key(e)]));

/** Star counts for one entry across every snapshot, oldest first. */
export function sparkline(id: string, snaps: Snapshot[] = snapshots()): number[] {
  const repo = repoById[id];
  if (!repo) return [];
  return snaps.map((s) => s.stars[repo]).filter((v): v is number => typeof v === "number");
}
