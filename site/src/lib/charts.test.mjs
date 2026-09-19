import { test } from "node:test";
import assert from "node:assert/strict";
import { bars, histogram, line, isoWeek, fit } from "./charts.ts";

test("bars draws one rect per datum", () => {
  const svg = bars([["a", 1], ["b", 2], ["c", 3]]);
  assert.equal(svg.match(/<rect/g).length, 3);
});

test("bars escapes labels", () => {
  assert.ok(bars([["a & <b>", 1]]).includes("a &amp; &lt;b>"));
});

test("histogram counts into the right buckets", () => {
  const svg = histogram([1, 5, 12, 400], [0, 10, 100], ["low", "mid", "high"]);
  assert.equal(svg.match(/<rect/g).length, 3);
  assert.ok(svg.includes(">2</text>"));
});

test("line draws one dot per point", () => {
  assert.equal(line([["w1", 1], ["w2", 4]]).match(/<circle/g).length, 2);
});

test("iso week of a known date", () => {
  assert.equal(isoWeek("2026-09-19"), "2026-W38");
});

test("long labels are trimmed to the gutter", () => {
  const svg = bars([["Benchmarks, evals and calibration", 3]], { label: 180 });
  assert.ok(svg.includes("…"));
  assert.ok(!svg.includes("calibration"));
});

test("cjk labels count double width", () => {
  assert.equal(fit("基准、评测与校准", 6), "基准…");
  assert.equal(fit("short", 20), "short");
});
