/**
 * Builds media/banner-dark.svg and media/banner-light.svg from the data files.
 *
 * Every number on the banner is read from data/, so it should run right after the parse
 * and enrich steps of the daily refresh. Add to .github/workflows/data.yml, after
 * `node scripts/enrich-github.mjs`:
 *
 *     - run: node scripts/build-banner.mjs
 *
 * and include `media` in the `git add` of the commit step.
 *
 * The output is self-contained: no external fonts, no embedded images, so GitHub renders
 * it inside an <img> and the SMIL sweep and blips still animate there.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { radarSvg } from "./radar-svg.mjs";

const root = new URL("../", import.meta.url);
const read = (name) => JSON.parse(readFileSync(new URL(name, root), "utf8"));

// Single quotes inside, so the stacks drop straight into an XML attribute.
const SANS = "-apple-system, 'Segoe UI', Inter, Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
const W = 1200;
const H = 300;
const LEDE = "What people build on TypeSafe's Jev, the first System One model";

const THEMES = {
  dark: { name: "dark", canvas: "#0B0E11", text: "#E8EDF2", muted: "#7C8791", cyan: "#4CC9F0", amber: "#FFB454", grey: "#3A434D" },
  light: { name: "light", canvas: "#F4F6F8", text: "#14181D", muted: "#5B6670", cyan: "#0E8FB5", amber: "#B8690A", grey: "#98A1AA" },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const { entries } = read("data/projects.json");
const { repos } = read("data/github.json");
const { firstSeen } = read("data/history.json");

const hosted = entries.filter((e) => e.owner && e.repo);
const repoCount = new Set(hosted.map((e) => `${e.owner}/${e.repo}`)).size;
// The same set the site calls categories: a heading with at least one entry, minus the
// pointer section to other lists.
const sectionCount = new Set(entries.filter((e) => e.section !== "Other lists").map((e) => e.section)).size;

const radarEntries = hosted.filter((e) => e.type === "project");
const sectors = [...new Set(radarEntries.map((e) => e.section))];

/**
 * Star gain per "owner/repo" over the week, on the same rule /trending/ uses: newest
 * snapshot minus the oldest one still inside the window, anchored on the newest file.
 * Nothing to report until two snapshots exist.
 */
const starGain = (() => {
  const dir = new URL("data/stars/", root);
  const out = {};
  if (!existsSync(dir)) return out;
  const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  if (files.length < 2) return out;
  const snaps = files.map((f) => ({ date: f.slice(0, -5), stars: JSON.parse(readFileSync(new URL(f, dir), "utf8")) }));
  const newest = snaps[snaps.length - 1];
  const cut = new Date(Date.parse(`${newest.date}T00:00:00Z`) - 7 * 864e5).toISOString().slice(0, 10);
  const window = snaps.filter((s) => s.date >= cut);
  if (window.length < 2) return out;
  for (const [repo, stars] of Object.entries(newest.stars)) {
    const before = window[0].stars[repo];
    if (typeof before === "number") out[repo] = stars - before;
  }
  return out;
})();

// The list arrived in one import, so its shared firstSeen day is the seed, not an arrival.
const seeded = Object.values(firstSeen).sort()[0] ?? "";
const weekAgo = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
const STALE = 90 * 864e5;

/** Archived beats everything, then a week's worth of movement, then plain activity. */
const toneOf = (e, meta) => {
  if (meta?.archived) return "archived";
  const seen = firstSeen[e.id];
  if ((seen && seen > seeded && seen >= weekAgo) || (starGain[`${e.owner}/${e.repo}`] ?? 0) >= 10) return "rising";
  const pushed = meta ? Date.parse(meta.pushedAt) : NaN;
  return Number.isFinite(pushed) && Date.now() - pushed < STALE ? undefined : "quiet";
};

const dots = radarEntries
  // Oldest first, so a fresh arrival draws on top of the crowd instead of under it.
  .sort((a, b) => (firstSeen[a.id] ?? "").localeCompare(firstSeen[b.id] ?? ""))
  .map((e) => {
    const meta = repos[`${e.owner}/${e.repo}`];
    return {
      id: e.id,
      name: e.name,
      sector: e.section,
      stars: meta?.stars ?? 0,
      accent: toneOf(e, meta),
    };
  });

/** Mono runs at about 0.6em per column, which is close enough to size a pill. */
const pill = (label, x, th) => {
  const w = Math.round(label.length * 8.4 + 30);
  return {
    w,
    svg:
      `<rect x="${x}" y="190" width="${w}" height="34" rx="17" fill="none" stroke="${th.cyan}" stroke-opacity="0.65"/>` +
      `<text x="${x + 15}" y="212" font-family="${MONO}" font-size="14" fill="${th.text}">${esc(label)}</text>`,
  };
};

const banner = (th) => {
  const labels = [`${repoCount} repos indexed`, `${sectionCount} categories`, "links checked weekly"];
  let x = 64;
  const pills = labels
    .map((l) => {
      const p = pill(l, x, th);
      x += p.w + 12;
      return p.svg;
    })
    .join("");
  // smil because a README image cannot borrow the site's keyframes: the beam turns on its
  // own clock and the thirty loudest repos blip as it reaches them, the rest just sit there.
  const radar = radarSvg({
    dots,
    sectors,
    size: 260,
    labels: false,
    sweep: true,
    dotLabels: 1500,
    theme: th.name,
    period: 10,
    smil: true,
    smilBlips: 30,
  }).replace("<svg ", '<svg x="880" y="20" ');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Awesome Jev: ${repoCount} repos across ${sectionCount} categories">` +
    `<title>Awesome Jev</title>` +
    `<defs>` +
    `<radialGradient id="glow" cx="12%" cy="8%" r="58%"><stop offset="0" stop-color="${th.cyan}" stop-opacity="0.18"/><stop offset="1" stop-color="${th.cyan}" stop-opacity="0"/></radialGradient>` +
    `<pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.9" fill="${th.muted}" fill-opacity="0.12"/></pattern>` +
    `</defs>` +
    `<rect width="${W}" height="${H}" fill="${th.canvas}"/>` +
    `<rect width="${W}" height="${H}" fill="url(#grid)"/>` +
    `<rect width="${W}" height="${H}" fill="url(#glow)"/>` +
    `<text x="64" y="120" font-family="${SANS}" font-size="60" font-weight="700" letter-spacing="-1.5" fill="${th.text}">Awesome Jev</text>` +
    `<text x="64" y="164" font-family="${SANS}" font-size="20" fill="${th.muted}">${esc(LEDE)}</text>` +
    pills +
    radar +
    `</svg>`
  );
};

for (const th of Object.values(THEMES)) {
  const out = new URL(`media/banner-${th.name}.svg`, root);
  writeFileSync(out, banner(th) + "\n");
  console.log(`wrote media/banner-${th.name}.svg (${repoCount} repos, ${sectionCount} categories, ${dots.length} dots)`);
}
