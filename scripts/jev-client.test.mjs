import { test } from "node:test";
import assert from "node:assert/strict";
import { ask } from "./jev-client.mjs";

const ok = (body) => ({ ok: true, status: 200, json: async () => body });

test("posts model, state, and questions to the systemone endpoint", async () => {
  let seen;
  const res = await ask("state", { r: { type: "noul", instructions: "?" } }, {
    key: "k",
    fetchImpl: async (url, init) => { seen = { url, init }; return ok({ answers: { r: { noul: 0.9 } } }); },
  });
  assert.equal(seen.url, "https://api.typesafe.ai/v1/systemone");
  assert.equal(seen.init.headers.authorization, "Bearer k");
  assert.deepEqual(JSON.parse(seen.init.body), { model: "jev-latest", state: "state", questions: { r: { type: "noul", instructions: "?" } } });
  assert.equal(res.answers.r.noul, 0.9);
});

test("retries 429 and 529 then returns the good response", async () => {
  const codes = [429, 529, 200];
  let calls = 0;
  const waits = [];
  const res = await ask("s", {}, {
    key: "k",
    sleep: async (ms) => { waits.push(ms); },
    fetchImpl: async () => { const c = codes[calls++]; return c === 200 ? ok({ answers: {} }) : { ok: false, status: c, text: async () => "" }; },
  });
  assert.equal(calls, 3);
  assert.deepEqual(waits, [500, 1000]);
  assert.deepEqual(res, { answers: {} });
});

test("gives up after five attempts", async () => {
  await assert.rejects(
    ask("s", {}, { key: "k", sleep: async () => {}, fetchImpl: async () => ({ ok: false, status: 429, text: async () => "" }) }),
    /gave up after 5 attempts/,
  );
});

test("throws the body on any other error status", async () => {
  await assert.rejects(
    ask("s", {}, { key: "k", fetchImpl: async () => ({ ok: false, status: 400, text: async () => "bad question" }) }),
    /Jev 400: bad question/,
  );
});

test("requires a key", async () => {
  await assert.rejects(ask("s", {}, { key: undefined }), /TYPESAFE_API_KEY is required/);
});
