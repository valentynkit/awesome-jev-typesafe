import { test } from "node:test";
import assert from "node:assert/strict";
import { validate, dailyCap, questionsFor, order, Limiter } from "./rerank-core.mjs";

test("dailyCap falls back on anything that is not a positive number", () => {
  assert.equal(dailyCap("250"), 250);
  assert.equal(dailyCap(undefined), 5000);
  assert.equal(dailyCap(""), 5000);
  assert.equal(dailyCap("lots"), 5000);
  assert.equal(dailyCap("0"), 5000);
  assert.equal(dailyCap("-1"), 5000);
  assert.equal(dailyCap("Infinity"), 5000);
});

test("validate rejects bad shapes", () => {
  assert.equal(validate({ query: "x", ids: ["a"] }), null);
  assert.match(validate({ query: "", ids: ["a"] }), /query/);
  assert.match(validate({ query: "x", ids: Array(31).fill("a") }), /30/);
});

test("validate rejects a 201 char query and non-string ids", () => {
  assert.equal(validate({ query: "q".repeat(200), ids: ["a"] }), null);
  assert.match(validate({ query: "q".repeat(201), ids: ["a"] }), /200/);
  assert.match(validate({ query: "x", ids: [42] }), /strings/);
  assert.match(validate({ query: "x", ids: ["a", null] }), /strings/);
});

test("questions and order", () => {
  const q = questionsFor([{ id: "a", text: "A." }, { id: "b", text: "B." }]);
  assert.equal(Object.keys(q).length, 2);
  assert.deepEqual(order(["a", "b"], { c0: { noul: 0.2 }, c1: { noul: 0.9 } }), [{ id: "b", p: 0.9 }, { id: "a", p: 0.2 }]);
});

test("order scores a missing answer as zero", () => {
  assert.deepEqual(order(["a", "b"], { c1: { noul: 0.4 } }), [{ id: "b", p: 0.4 }, { id: "a", p: 0 }]);
  assert.deepEqual(order(["a"], {}), [{ id: "a", p: 0 }]);
});

test("limiter allows 20 per minute per ip and caps the day", () => {
  const l = new Limiter({ perMinute: 2, perDay: 3, now: () => 0 });
  assert.equal(l.take("ip"), true); assert.equal(l.take("ip"), true); assert.equal(l.take("ip"), false);
  assert.equal(l.take("other"), true); assert.equal(l.take("third"), false);
});

test("limiter forgets hits once the 60 s window passes", () => {
  let t = 0;
  const l = new Limiter({ perMinute: 2, now: () => t });
  assert.equal(l.take("ip"), true);
  t = 30_000;
  assert.equal(l.take("ip"), true);
  assert.equal(l.take("ip"), false);
  t = 60_000;
  assert.equal(l.take("ip"), true, "the hit at t=0 has aged out");
  assert.equal(l.take("ip"), false, "the hit at t=30000 still counts");
  t = 90_000;
  assert.equal(l.take("ip"), true);
});

test("limiter resets the daily counter on a new date", () => {
  let t = 0;
  const l = new Limiter({ perMinute: 10, perDay: 2, now: () => t });
  assert.equal(l.take("ip"), true);
  assert.equal(l.take("ip"), true);
  assert.equal(l.take("ip"), false);
  t = 86_400_000;
  assert.equal(l.take("ip"), true);
  assert.equal(l.day, "1970-01-02");
  assert.equal(l.count, 1);
});
