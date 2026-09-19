import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("./global.css", import.meta.url), "utf8");
const block = (sel) => css.slice(css.indexOf(sel)).match(/\{([^}]*)\}/)[1];
const vars = (b) => Object.fromEntries([...b.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [m[1], m[2]]));
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

for (const [name, v] of [["dark", vars(block(":root {"))], ["light", vars(block(':root[data-theme="light"]'))]]) {
  test(`${name}: text and muted on canvas, surface and raised >= 4.5`, () => {
    for (const bg of ["canvas", "surface", "raised"])
      for (const fg of ["text", "muted", "accent"])
        assert.ok(ratio(v[fg], v[bg]) >= 4.5, `${name} ${fg} on ${bg} = ${ratio(v[fg], v[bg]).toFixed(2)}`);
  });
  test(`${name}: accent-2 and danger carry 4.5 on surface too`, () => {
    for (const fg of ["accent-2", "danger"])
      assert.ok(ratio(v[fg], v.surface) >= 4.5, `${name} ${fg} on surface = ${ratio(v[fg], v.surface).toFixed(2)}`);
  });
  test(`${name}: accent-ink reads on accent`, () => {
    assert.ok(ratio(v["accent-ink"], v.accent) >= 4.5, `${name} accent-ink on accent = ${ratio(v["accent-ink"], v.accent).toFixed(2)}`);
  });
}
