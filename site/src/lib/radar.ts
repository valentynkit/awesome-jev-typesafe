import { radarSvg, type RadarDot } from "../../../scripts/radar-svg.mjs";
import { projects, sections, firstSeen, slug, type Entry } from "./data";
import { snapshots } from "./trending";
import { localePath } from "./i18n";

export { radarSvg };
export type { RadarDot };

const hosted = projects.filter((e) => e.owner);

/** Readme order, kept so a sector sits in the same wedge on every build. */
export const radarSectors = sections.map((s) => s.name).filter((n) => hosted.some((e) => e.section === n));

// The whole list shares one firstSeen date from the day it was first parsed, and painting
// 250 seed entries amber would say nothing. Only arrivals after that day count as new.
const seeded = Object.values(firstSeen).sort()[0] ?? "";
const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
const isNew = (id: string) => {
  const d = firstSeen[id];
  return !!d && d > seeded && d >= weekAgo;
};

/**
 * Star gain per "owner/repo" over the week, newest snapshot minus the oldest still in
 * the window. Anchored on the newest snapshot the way /trending/ does it, so a stale
 * data directory reports nothing instead of nonsense. Empty until two snapshots exist.
 */
const starGain: Record<string, number> = (() => {
  const snaps = snapshots();
  const out: Record<string, number> = {};
  if (snaps.length < 2) return out;
  const newest = snaps[snaps.length - 1];
  const cut = new Date(Date.parse(`${newest.date}T00:00:00Z`) - 7 * 864e5).toISOString().slice(0, 10);
  const window = snaps.filter((s) => s.date >= cut);
  if (window.length < 2) return out;
  const oldest = window[0];
  for (const [repo, stars] of Object.entries(newest.stars)) {
    const before = oldest.stars[repo];
    if (typeof before === "number") out[repo] = stars - before;
  }
  return out;
})();

const STALE = 90 * 864e5;

/** Archived beats everything, then a week's worth of movement, then plain activity. */
function toneOf(e: Entry): RadarDot["accent"] {
  if (e.github?.archived) return "archived";
  if (isNew(e.id) || (starGain[`${e.owner}/${e.repo}`] ?? 0) >= 10) return "rising";
  const pushed = e.github ? Date.parse(e.github.pushedAt) : NaN;
  return Number.isFinite(pushed) && Date.now() - pushed < STALE ? undefined : "quiet";
}

export function radarDots(lang: string): RadarDot[] {
  return hosted
    // Oldest first, so a fresh arrival draws on top of the crowd instead of under it.
    .slice()
    .sort((a, b) => (firstSeen[a.id] ?? "").localeCompare(firstSeen[b.id] ?? ""))
    .map((e) => ({
      id: e.id,
      name: e.name,
      sector: e.section,
      stars: e.github?.stars ?? 0,
      accent: toneOf(e),
      href: localePath(lang, `/p/${e.id}/`),
    }));
}

export const sectorHref = (lang: string) => (name: string) => localePath(lang, `/c/${slug(name)}/`);
