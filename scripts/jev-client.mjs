// One function: post a state and questions to Jev with backoff on 429 and 529.
export async function ask(state, questions, { key = process.env.TYPESAFE_API_KEY, model = "jev-latest", fetchImpl = fetch, sleep = (ms) => new Promise((r) => setTimeout(r, ms)) } = {}) {
  if (!key) throw new Error("TYPESAFE_API_KEY is required");
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetchImpl("https://api.typesafe.ai/v1/systemone", {
      method: "POST", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ model, state, questions }),
    });
    if (res.status === 429 || res.status === 529) { await sleep(500 * 2 ** attempt); continue; }
    if (!res.ok) throw new Error(`Jev ${res.status}: ${await res.text()}`);
    return res.json();
  }
  throw new Error("Jev: gave up after 5 attempts");
}
