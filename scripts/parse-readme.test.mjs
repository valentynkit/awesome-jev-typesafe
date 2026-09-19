import { test } from "node:test";
import assert from "node:assert/strict";
import { parseReadme } from "./parse-readme.mjs";

const fixture = `# Awesome Jev [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

Lede.

<table>
  <tr>
    <td align="center"><a href="https://github.com/a/one"><img src="media/one.png" width="300" alt="one"><br><sub>one</sub></a></td>
  </tr>
</table>

## Contents

- [Jev on one screen](#jev-on-one-screen)
- [Coding agents](#coding-agents)
  - [Pi](#pi)

## Jev on one screen

- Endpoint: \`POST https://api.typesafe.ai/v1/systemone\`.

## Start here

- [Docs](https://docs.typesafe.ai/) - The docs.

## Coding agents

<a href="https://github.com/a/one"><img src="media/one.png" width="600" alt="one banner"></a>

### Pi

- [one](https://github.com/a/one) - Does one thing. By this list's maintainer.
- [pi-jev by x](https://github.com/x/pi-jev) - First pi-jev.
- [pi-jev by y](https://github.com/y/pi-jev) - Second pi-jev; Chinese readme.

## Other lists

- [awesome-jev by z](https://github.com/z/awesome-jev) - Another list.

## Contributing

Read contributing.md.
`;

test("parses entries with section, subsection, type, order", () => {
  const { entries } = parseReadme(fixture);
  assert.equal(entries.length, 5);
  const one = entries.find((e) => e.name === "one");
  assert.equal(one.section, "Coding agents");
  assert.equal(one.subsection, "Pi");
  assert.equal(one.type, "project");
  assert.equal(one.owner, "a");
  assert.equal(one.repo, "one");
  assert.equal(one.maintainer, true);
  assert.equal(one.description, "Does one thing.");
  assert.equal(one.image, "media/one.png");
  assert.equal(entries.find((e) => e.name === "Docs").type, "resource");
  assert.equal(entries.find((e) => e.section === "Other lists").type, "list");
});

test("collisions get owner suffix, never dedupe", () => {
  const { entries } = parseReadme(fixture);
  const ids = entries.filter((e) => e.repo === "pi-jev").map((e) => e.id).sort();
  assert.deepEqual(ids, ["pi-jev-x", "pi-jev-y"]);
});

test("language hint from phrase", () => {
  const { entries } = parseReadme(fixture);
  assert.equal(entries.find((e) => e.id === "pi-jev-y").languageHint, "Chinese readme");
});

test("gallery tiles must match a body entry", () => {
  const bad = fixture.replace(
    'https://github.com/a/one"><img src="media/one.png" width="300"',
    'https://github.com/nobody/x"><img src="media/one.png" width="300"',
  );
  assert.throws(() => parseReadme(bad), /gallery/);
});

test("unparseable bullet in an entry section throws with line number", () => {
  const bad = fixture.replace(
    "- [one](https://github.com/a/one) - Does one thing. By this list's maintainer.",
    "- one without a link",
  );
  assert.throws(() => parseReadme(bad), /line \d+/);
});

test("duplicate url throws", () => {
  const bad = fixture + "\n## Command line\n\n- [dup](https://github.com/a/one) - Duplicate.\n";
  assert.throws(() => parseReadme(bad), /duplicate url/i);
});

test("sections carry banners and gallery order", () => {
  const { sections, gallery } = parseReadme(fixture);
  assert.equal(sections.find((s) => s.name === "Coding agents").image, "media/one.png");
  assert.deepEqual(gallery, [{ url: "https://github.com/a/one", image: "media/one.png" }]);
});
