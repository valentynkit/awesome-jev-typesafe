/**
 * The ecosystem radar, as a self-contained SVG string.
 *
 * Pure string building with no dependencies, so the same function draws the README
 * banner in Node and the /radar/ page at build time. Everything is deterministic:
 * a repo id always lands on the same spot, which keeps git diffs on the banner small.
 * Rings are star buckets, inner is the brightest: 1k+, 100 to 1k, 10 to 100, under 10.
 *
 * Motion is phosphor: a dot rests as a ghost until the beam reaches it, flares, then
 * decays over about half a turn. `smil: true` builds the standalone version for the
 * README, where the sweep, the blips of the biggest repos and the halos are SMIL and
 * the resting state comes from a <style> inside the file. `smil: false` emits the bare
 * shapes plus a `data-sweep="css"` group and lets the host page drive the whole thing
 * from one clock; that is what the site does, so the beam and the blips cannot drift.
 * Either way a dot's `--d` is its angle as a fraction of the turn.
 */

const THEMES = {
  dark: { text: "#E8EDF2", dot: "#4CC9F0", amber: "#FFB454", quiet: "#3F5563", grey: "#3A434D", label: "#7C8791", canvas: "#0B0E11" },
  light: { text: "#14181D", dot: "#0E8FB5", amber: "#B8690A", quiet: "#7E96A3", grey: "#98A1AA", label: "#5B6670", canvas: "#F4F6F8" },
};
const RINGS = [0.22, 0.42, 0.62, 0.82];
const SWEEP_DEG = 40;
/** One turn of the sweep. The blip delays are this same clock, so they have to agree. */
const PERIOD = 10;
const SLOW_PERIOD = 30;
/** accent on a dot to the data-tone it paints with; anything else is an active repo. */
const TONES = { rising: "rising", quiet: "quiet", archived: "archived" };
const FILLS = { active: "dot", rising: "amber", quiet: "quiet", archived: "grey" };

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** FNV-1a over the id. Two repos only collide if they share an id, which the parser forbids. */
const hash = (s) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
};
const frac = (s) => (hash(s) % 10000) / 10000;
const ringOf = (stars) => (stars >= 1000 ? 0 : stars >= 100 ? 1 : stars >= 10 ? 2 : 3);
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

export function radarSvg({
  dots = [],
  sectors = [],
  size = 800,
  sweep = true,
  labels = true,
  dotLabels = 0,
  theme = "dark",
  period = PERIOD,
  smil = true,
  smilBlips = 30,
  href = () => null,
  labelHref = () => null,
} = {}) {
  const th = THEMES[theme] ?? THEMES.dark;
  const c = size / 2;
  // Labels sit outside the last ring, so the rings give up room for the gutter when they show.
  const R = c * (labels ? 0.68 : 0.95);
  // Strokes, dots and type scale with the canvas: the 260px banner radar reads like the 900px one.
  const k = size / 800;
  const n = Math.max(1, sectors.length);
  const span = (Math.PI * 2) / n;
  const startOf = (i) => -Math.PI / 2 + i * span;
  const f = (x) => x.toFixed(1);
  const at = (a, r) => [c + Math.cos(a) * r, c + Math.sin(a) * r];
  const uid = `jr-${theme}-${size}`;
  const line = f(Math.max(0.6, k));

  // Without our CSS the banner can only blip a handful of dots before the file turns into
  // a thousand SMIL clocks, so only the loudest repos get found there.
  const blipIds = new Set(
    smil && smilBlips > 0
      ? dots
          .slice()
          .sort((a, b) => (Number(b.stars) || 0) - (Number(a.stars) || 0))
          .slice(0, smilBlips)
          .map((d) => d.id)
      : [],
  );

  const rings = RINGS.map(
    (t) =>
      `<circle class="ring" cx="${c}" cy="${c}" r="${f(R * t)}" fill="none" stroke="${th.text}" stroke-opacity="0.35" stroke-width="${line}"/>`,
  ).join("");
  // The rim carries the eye around the disc, so it gets a blurred double under the stroke.
  const rim =
    `<circle class="ring rim" cx="${c}" cy="${c}" r="${f(R * RINGS[3])}" fill="none" stroke="${th.dot}" stroke-opacity="0.3" stroke-width="${f(Math.max(1, 2 * k))}" filter="url(#${uid}-b)"/>`;

  const spokes = sectors
    .map((_, i) => {
      const [x, y] = at(startOf(i), R * 0.92);
      return `<line class="spoke" x1="${c}" y1="${c}" x2="${f(x)}" y2="${f(y)}" stroke="${th.text}" stroke-opacity="0.18" stroke-width="${line}"/>`;
    })
    .join("");

  const sectorLabels = labels
    ? sectors
        .map((name, i) => {
          const a = startOf(i) + span / 2;
          const [x0, y] = at(a, R + 18 * k);
          const cos = Math.cos(a);
          const anchor = cos > 0.08 ? "start" : cos < -0.08 ? "end" : "middle";
          const text = clip(name, 22);
          // Mono at 11px runs about 0.62em per column, so the run can be kept off the edge.
          const w = text.length * 6.9 * k;
          const pad = 10 * k;
          const x =
            anchor === "start" ? Math.min(x0, size - pad - w) : anchor === "end" ? Math.max(x0, pad + w) : x0;
          const el = `<text class="slabel" x="${f(x)}" y="${f(y)}" fill="${th.label}" text-anchor="${anchor}" dominant-baseline="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${f(11 * k)}">${esc(text)}</text>`;
          const url = labelHref(name);
          return url ? `<a href="${esc(url)}" class="sector">${el}</a>` : el;
        })
        .join("")
    : "";

  // Boxes of the names already drawn, so a crowded corner stacks instead of overprinting.
  const placed = [];
  const marks = dots
    .map((d) => {
      const stars = Number(d.stars) || 0;
      const i = Math.max(0, sectors.indexOf(d.sector));
      const a = startOf(i) + (0.1 + 0.8 * frac(d.id)) * span;
      const jitter = (frac(d.id + "|j") - 0.5) * 0.12 * R;
      const [x, y] = at(a, RINGS[ringOf(stars)] * R + jitter);
      const r = (2.5 + 2.5 * Math.log10(stars + 1)) * k;
      const tone = TONES[d.accent] ?? "active";
      const fill = th[FILLS[tone]];
      // Degrees clockwise from twelve, which is where the sweep's leading edge sits at t=0.
      // The blip then fires exactly as the edge crosses the dot.
      const deg = (((a + Math.PI / 2) * 180) / Math.PI + 360) % 360;
      const at0 = ((deg / 360) * period).toFixed(2);
      const delay = `--d:${at0}s`;
      const named = dotLabels > 0 && stars >= dotLabels;

      // One expanding ring per named dot: enough to read as a detection, few enough that
      // the site is not animating a second circle for all 250 repos.
      let halo = "";
      if (named) {
        const smilHalo = smil
          ? `<animate attributeName="opacity" values="0;0.55;0;0" keyTimes="0;0.005;0.12;1" dur="${period}s" begin="${at0}s" repeatCount="indefinite"/>` +
            `<animate attributeName="r" values="${f(r)};${f(r)};${f(r * 3)};${f(r * 3)}" keyTimes="0;0.005;0.12;1" dur="${period}s" begin="${at0}s" repeatCount="indefinite"/>`
          : "";
        halo =
          `<circle class="halo" cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${fill}" stroke-width="${line}" vector-effect="non-scaling-stroke" opacity="0" data-tone="${tone}">${smilHalo}</circle>`;
      }

      const blipAnim = blipIds.has(d.id)
        ? `<animate attributeName="opacity" values="0.15;1;0.3;0.15" keyTimes="0;0.02;0.5;1" dur="${period}s" begin="${at0}s" repeatCount="indefinite"/>`
        : "";
      // A canvas-colored hairline keeps overlapping dots readable where a category is crowded.
      // The colours are inline for the standalone banner; data-tone lets the site retheme them.
      const dot =
        `<circle class="dot" cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" stroke="${th.canvas}" stroke-width="${line}"${blipAnim ? ' data-blip="1"' : ""} data-tone="${tone}" style="${delay}"><title>${esc(d.name)} · ${stars}★</title>${blipAnim}</circle>`;

      let label = "";
      if (named) {
        const text = clip(d.name, 18);
        // Floored, because the 260px banner would otherwise name its dots at three pixels.
        const fs = Math.max(7, 10 * k);
        const w = text.length * 0.61 * fs;
        const pad = 4 * k;
        // Names read outward, away from the middle, so they never cross the dot they name.
        const out = Math.cos(a) >= 0;
        const x0 = x + (out ? r + 5 * k : -(r + 5 * k));
        const lx = out ? Math.min(x0, size - pad - w) : Math.max(x0, pad + w);
        const left = out ? lx : lx - w;
        const fits = (v) => !placed.some((b) => left < b.x1 && left + w > b.x0 && Math.abs(v - b.y) < fs * 1.2);
        const clampY = (v) => Math.min(size - pad, Math.max(pad + fs, v));
        let ly = clampY(y);
        for (const step of [0, 1.4, -1.4, 2.8, -2.8, 4.2, -4.2]) {
          ly = clampY(y + step * fs);
          if (fits(ly)) break;
        }
        placed.push({ x0: left, x1: left + w, y: ly });
        // paint-order puts the canvas-coloured stroke under the glyphs, so a name stays
        // readable where it crosses the dots it is not naming.
        label = `<text class="dot-label" x="${f(lx)}" y="${f(ly)}" fill="${th.text}" stroke="${th.canvas}" stroke-width="${f(fs * 0.28)}" paint-order="stroke" text-anchor="${out ? "start" : "end"}" dominant-baseline="middle" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${f(fs)}">${esc(text)}</text>`;
      }

      const url = href(d);
      const body = url ? `<a href="${esc(url)}">${halo}${dot}${label}</a>` : halo + dot + label;
      return `<g class="dot-group" style="${delay}">${body}</g>`;
    })
    .join("");

  // The wedge trails its leading edge, which starts at twelve o'clock and turns clockwise.
  const lead = -Math.PI / 2;
  const tail = lead - (SWEEP_DEG * Math.PI) / 180;
  const glowFrom = lead - (75 * Math.PI) / 180;
  const [tx, ty] = at(tail, R);
  const [lx, ly] = at(lead, R);
  const [gx, gy] = at(glowFrom, R);
  const beam =
    // A faint half-disc brightening ahead of the wedge, so the turn reads even on a crowded radar.
    `<circle cx="${c}" cy="${c}" r="${f(R)}" fill="url(#${uid}-scan)"/>` +
    `<path d="M${f(gx)},${f(gy)} A${f(R)},${f(R)} 0 0 1 ${f(lx)},${f(ly)}" fill="none" stroke="url(#${uid}-g)" stroke-width="${f(Math.max(1.2, 2.5 * k))}" stroke-linecap="round"/>` +
    `<path d="M${c},${c} L${f(tx)},${f(ty)} A${f(R)},${f(R)} 0 0 1 ${f(lx)},${f(ly)} Z" fill="url(#${uid}-s)"/>` +
    `<line x1="${c}" y1="${c}" x2="${f(lx)}" y2="${f(ly)}" stroke="${th.dot}" stroke-opacity="0.75" stroke-width="${f(Math.max(0.8, 1.4 * k))}"/>`;
  const spin = (dur) =>
    `<animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="${dur}s" repeatCount="indefinite"/>`;
  // Standalone: two SMIL clocks, one calm, and the embedded media query picks. On the site
  // there is one CSS group instead, because the beam has to share the blips' timeline.
  const sweepEls = !sweep
    ? ""
    : smil
      ? `<g class="sweep-fast" data-sweep="fast">${beam}${spin(period)}</g>` +
        `<g class="sweep-slow" data-sweep="slow">${beam}${spin(SLOW_PERIOD)}</g>`
      : `<g class="sweep" data-sweep="css">${beam}</g>`;

  // Ripples off the middle. SMIL grows the radius standalone; on the site they are two more
  // CSS clocks scaling in place, which keeps the hosted radar free of SMIL altogether.
  const pulse = (begin) =>
    smil
      ? `<circle class="pulse" cx="${c}" cy="${c}" r="0" fill="none" stroke="${th.dot}" stroke-width="${line}" opacity="0">` +
        `<animate attributeName="r" values="0;${f(R)}" dur="${period}s" begin="${begin}" repeatCount="indefinite"/>` +
        `<animate attributeName="opacity" values="0.3;0" dur="${period}s" begin="${begin}" repeatCount="indefinite"/></circle>`
      : `<circle class="pulse" cx="${c}" cy="${c}" r="${f(R)}" fill="none" stroke="${th.dot}" stroke-width="${line}" vector-effect="non-scaling-stroke" opacity="0" style="animation-delay:${begin}"/>`;
  const pulses = sweep ? `<g class="pulse-ring" data-pulse="1">${pulse("0s")}${pulse(`-${period / 2}s`)}</g>` : "";

  // Only the standalone file carries rules; on the site pages.css owns the whole timeline
  // and a second copy of the keyframes here would just be a name collision waiting to happen.
  const css = !smil
    ? ""
    : `<style>` +
      `svg[data-radar] .dot{opacity:.45}` +
      `svg[data-radar] .dot[data-blip]{opacity:.15}` +
      `svg[data-radar] .dot-label{opacity:.85}` +
      `svg[data-radar] .sweep-slow{display:none}` +
      `@media (prefers-reduced-motion:reduce){` +
      `svg[data-radar] .dot{opacity:.85}` +
      `svg[data-radar] .dot-label{opacity:1}` +
      `svg[data-radar] .halo,svg[data-radar] .pulse-ring{display:none}` +
      `svg[data-radar] .sweep-fast{display:none}` +
      `svg[data-radar] .sweep-slow{display:block}}` +
      `</style>`;

  const gradient = (id, a1, a2, r, to) =>
    `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f(at(a1, r)[0])}" y1="${f(at(a1, r)[1])}" x2="${f(at(a2, r)[0])}" y2="${f(at(a2, r)[1])}">` +
    `<stop offset="0" stop-color="${th.dot}" stop-opacity="0"/><stop offset="1" stop-color="${th.dot}" stop-opacity="${to}"/></linearGradient>`;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" data-radar="1" style="--period:${period}s" role="img" aria-label="Radar of ${dots.length} repos across ${n} categories, rings are star counts">` +
    css +
    `<defs>` +
    // One glow over the whole mark layer rather than 250 per-dot filters: same bloom, one pass.
    `<filter id="${uid}" x="-6%" y="-6%" width="112%" height="112%"><feGaussianBlur stdDeviation="${f(2 * k)}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` +
    `<filter id="${uid}-b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${f(Math.max(1, 3 * k))}"/></filter>` +
    gradient(`${uid}-s`, tail, lead, R * 0.6, "0.45") +
    gradient(`${uid}-g`, glowFrom, lead, R, "0.5") +
    gradient(`${uid}-scan`, lead + Math.PI, lead, R, "0.1") +
    `</defs>${rings}${rim}${spokes}${pulses}${sweepEls}${sectorLabels}` +
    `<g class="marks" filter="url(#${uid})">${marks}</g></svg>`
  );
}
