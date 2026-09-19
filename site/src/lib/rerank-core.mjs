export function validate(body) {
  if (!body || typeof body.query !== "string" || !body.query.trim() || body.query.length > 200) return "query must be 1 to 200 chars";
  if (!Array.isArray(body.ids) || !body.ids.length || body.ids.length > 30 || !body.ids.every((s) => typeof s === "string" && s.length < 80)) return "ids must be 1 to 30 strings";
  return null;
}

// An unset or garbage JEV_DAILY_CAP must not turn into NaN, which would let every request through.
export const dailyCap = (raw, fallback = 5000) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export const questionsFor = (cands) =>
  Object.fromEntries(
    cands.map((c, i) => [`c${i}`, { type: "noul", instructions: `Is this project what the user is looking for? Project: ${c.text}` }]),
  );

export const order = (ids, answers) =>
  ids.map((id, i) => ({ id, p: answers?.[`c${i}`]?.noul ?? 0 })).sort((a, b) => b.p - a.p);

// ponytail: per-instance memory limiter, so the ceiling is one function instance and a cold start forgets everyone; upgrade to Upstash if abuse shows up in the Jev bill
export class Limiter {
  constructor({ perMinute = 20, perDay = 5000, now = Date.now } = {}) {
    this.perMinute = perMinute;
    this.perDay = perDay;
    this.now = now;
    this.ips = new Map();
    this.day = "";
    this.count = 0;
  }

  take(ip) {
    const t = this.now();
    const d = new Date(t).toISOString().slice(0, 10);
    if (d !== this.day) {
      this.day = d;
      this.count = 0;
    }
    if (this.count >= this.perDay) return false;
    const hits = (this.ips.get(ip) || []).filter((x) => t - x < 60_000);
    if (hits.length >= this.perMinute) return false;
    hits.push(t);
    this.ips.set(ip, hits);
    this.count++;
    return true;
  }
}
