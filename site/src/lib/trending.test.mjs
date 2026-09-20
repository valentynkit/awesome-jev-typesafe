import { test } from "node:test";
import assert from "node:assert/strict";
import { rising, mostStarred, recentlyPushed, newThisMonth, snapshots, sparkline, entriesByRepo } from "./trending.ts";

const byRepo = { "a/one": "one", "a/two": "two", "a/three": "three" };
const older = { date: "2026-09-14", stars: { "a/one": 100, "a/two": 40, "a/three": 10 } };
const newer = { date: "2026-09-19", stars: { "a/one": 110, "a/two": 90, "a/three": 10, "a/ghost": 900 } };

test("rising ranks by delta and drops repos missing from either end", () => {
  const rows = rising([older, newer], byRepo);
  assert.deepEqual(
    rows.map((r) => [r.id, r.delta]),
    [["two", 50], ["one", 10]],
  );
});

test("rising is empty with a single snapshot", () => {
  assert.deepEqual(rising([newer], byRepo), []);
});

test("rising ignores snapshots older than the window", () => {
  const ancient = { date: "2026-08-01", stars: { "a/one": 1 } };
  assert.deepEqual(rising([ancient, newer], byRepo), []);
});

test("rising breaks delta ties on stars", () => {
  const a = { date: "2026-09-18", stars: { "a/one": 10, "a/two": 20 } };
  const b = { date: "2026-09-19", stars: { "a/one": 15, "a/two": 25 } };
  assert.deepEqual(
    rising([a, b], byRepo).map((r) => r.id),
    ["two", "one"],
  );
});

test("rising caps the board", () => {
  const ids = Array.from({ length: 30 }, (_, i) => `r${i}`);
  const map = Object.fromEntries(ids.map((id) => [`a/${id}`, id]));
  const a = { date: "2026-09-18", stars: Object.fromEntries(ids.map((id) => [`a/${id}`, 1])) };
  const b = { date: "2026-09-19", stars: Object.fromEntries(ids.map((id, i) => [`a/${id}`, 1 + i])) };
  assert.equal(rising([a, b], map).length, 12);
});

test("the boards read the repo data", () => {
  const top = mostStarred(12);
  assert.equal(top.length, 12);
  assert.ok(top[0].stars >= top[11].stars);
  assert.ok(entriesByRepo[top[0].repo] === top[0].id);

  const pushed = recentlyPushed(12);
  assert.equal(pushed.length, 12);
  assert.ok(Date.parse(pushed[0].pushedAt) >= Date.parse(pushed[11].pushedAt));

  assert.ok(newThisMonth().length > 0);
});

test("a sparkline has one point per snapshot holding that repo", () => {
  const snaps = snapshots();
  // A repo added after the first snapshot has fewer points, so pick one every snapshot holds.
  const repo = Object.keys(snaps[0].stars).find((r) => snaps.every((s) => r in s.stars) && r in entriesByRepo);
  assert.equal(sparkline(entriesByRepo[repo]).length, snaps.length);
  assert.deepEqual(sparkline("not-a-repo"), []);
});
