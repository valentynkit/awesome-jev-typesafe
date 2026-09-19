const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const wide = (c: string) => c.charCodeAt(0) > 0x2e7f;
/** Trim a label to the pixels the gutter can hold; CJK glyphs cost two columns. */
export function fit(s: string, cols: number) {
  let used = 0;
  for (let i = 0; i < s.length; i++) {
    used += wide(s[i]) ? 2 : 1;
    if (used > cols) return s.slice(0, Math.max(1, i - 1)) + "\u2026";
  }
  return s;
}

export function bars(data: [string, number][], { width = 720, row = 26, label = 300, warn = [] as string[] } = {}) {
  const max = Math.max(1, ...data.map((d) => d[1]));
  const h = data.length * row + 8;
  const rows = data.map(([k, v], i) => {
    const w = Math.round(((width - label - 60) * v) / max);
    const y = i * row + 4;
    return `<text x="${label - 8}" y="${y + 17}" text-anchor="end" class="lbl">${esc(fit(k, Math.floor((label - 12) / 7.2)))}</text><rect x="${label}" y="${y}" width="${w}" height="${row - 8}" rx="3" class="${warn.includes(k) ? "fill warn" : "fill"}"/><text x="${label + w + 6}" y="${y + 17}" class="num">${v}</text>`;
  });
  return `<svg viewBox="0 0 ${width} ${h}" width="100%" role="img" class="chart">${rows.join("")}</svg>`;
}

export function histogram(values: number[], edges: number[], labels: string[]) {
  const counts = edges.map((e, i) => values.filter((v) => v >= e && (i === edges.length - 1 || v < edges[i + 1])).length);
  return bars(labels.map((l, i) => [l, counts[i]]));
}

export function line(points: [string, number][], { width = 720, height = 200 } = {}) {
  const max = Math.max(1, ...points.map((p) => p[1]));
  const step = (width - 40) / Math.max(1, points.length - 1);
  const at = (p: [string, number], i: number) => [20 + i * step, height - 20 - ((height - 40) * p[1]) / max] as const;
  const d = points.map((p, i) => { const [x, y] = at(p, i); return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`; }).join(" ");
  const dots = points.map((p, i) => { const [x, y] = at(p, i); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" class="fill"/>`; }).join("");
  const ends = points.length
    ? `<text x="20" y="${height - 4}" class="num">${esc(points[0][0])}</text><text x="${width - 20}" y="${height - 4}" text-anchor="end" class="num">${esc(points[points.length - 1][0])}</text>`
    : "";
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" class="chart"><path d="${d}" fill="none" class="stroke" stroke-width="2"/>${dots}${ends}</svg>`;
}

/** ISO week key, e.g. 2026-W38. */
export const isoWeek = (date: string) => {
  const d = new Date(date + "T00:00:00Z");
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const first = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d.getTime() - first.getTime()) / 864e5 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
};
