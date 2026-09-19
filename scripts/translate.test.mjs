import { test } from "node:test";
import assert from "node:assert/strict";
import { pending, finalize, hashOf, GUIDE } from "./translate.mjs";

const entries = [{ id: "a", description: "One." }, { id: "b", description: "Two." }];
const full = { zh: { a: "一", b: "二" }, ja: { a: "いち", b: "に" }, ko: { a: "하나", b: "둘" } };

test("pending lists entries missing in any language", () => {
  const files = { zh: { a: "一", b: "二" }, ja: { a: "いち" }, ko: { a: "하나", b: "둘" } };
  const hashes = { a: hashOf("One."), b: hashOf("Two.") };
  assert.deepEqual(pending(entries, files, hashes).map((e) => e.id), ["b"]);
});

test("pending lists entries whose description changed", () => {
  const hashes = { a: hashOf("One, revised."), b: hashOf("Two.") };
  assert.deepEqual(pending(entries, full, hashes).map((e) => e.id), ["a"]);
});

test("finalize records hashes only for fully translated ids", () => {
  const files = { zh: { a: "一" }, ja: { a: "いち" }, ko: { a: "하나" } };
  const next = finalize(entries, files, { b: "stale" });
  assert.deepEqual(next, { a: hashOf("One.") });
});

test("guide pins the glossary and registers", () => {
  for (const term of ["概率", "確率", "확률", "です/ます", "격식체"]) assert.ok(GUIDE.includes(term));
});
