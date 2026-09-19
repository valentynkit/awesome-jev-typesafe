#!/usr/bin/env node
// Renders the title and end cards (1920x1080 PNG) with the site's own fonts, via a headless browser.
import { chromium } from "playwright";
import { readdirSync } from "node:fs";
const out = new URL("./out/", import.meta.url).pathname;
const astro = new URL("../../site/.vercel/output/static/_astro/", import.meta.url).pathname;
const font = (re) => "file://" + astro + readdirSync(astro).find((f) => re.test(f));
const css = `
@font-face{font-family:"SG";src:url("${font(/space-grotesk-latin-wght/)}") format("woff2");font-weight:300 700}
@font-face{font-family:"FC";src:url("${font(/fira-code-latin-wght/)}") format("woff2");font-weight:300 700}
@font-face{font-family:"PS";src:url("${font(/public-sans-latin-wght/)}") format("woff2");font-weight:300 700}
html,body{margin:0;width:1920px;height:1080px;background:#0B0E11;color:#E8EDF2;font-family:"PS",sans-serif;overflow:hidden}
body::before{content:"";position:fixed;inset:0;background:radial-gradient(60% 50% at 50% 0%,rgba(76,201,240,.18),transparent 70%),radial-gradient(rgba(232,237,242,.07) 1px,transparent 1px);background-size:auto,24px 24px}
.wrap{position:relative;height:100%;display:grid;place-content:center;text-align:center;gap:22px}
.eyebrow{font-family:"FC",monospace;letter-spacing:.24em;color:#4CC9F0;font-size:26px}
h1{font-family:"SG",sans-serif;font-size:132px;line-height:1;letter-spacing:-.03em;margin:0;font-weight:700}
p{font-size:38px;margin:0;color:#98A2AD}
.url{font-family:"FC",monospace;font-size:54px;color:#E8EDF2;margin-top:26px}
.pills{display:flex;gap:18px;justify-content:center;margin-top:8px}
.pill{font-family:"FC",monospace;font-size:26px;border:1.5px solid #4CC9F0;border-radius:999px;padding:12px 26px;color:#E8EDF2}
.cta{display:inline-block;margin-top:34px;background:#4CC9F0;color:#062A36;font-weight:700;font-size:34px;padding:20px 44px;border-radius:14px;font-family:"SG",sans-serif}
`;
const title = `<div class="wrap"><div class="eyebrow">TYPESAFE JEV · SYSTEM ONE</div><h1>Everything<br>built on Jev.</h1><p>The curated directory, with a live ecosystem radar.</p></div>`;
const end = `<div class="wrap"><div class="eyebrow">AWESOME JEV</div><div class="url">awesomejev.vercel.app</div><div class="pills"><span class="pill">323 entries</span><span class="pill">254 repos indexed</span><span class="pill">search reranked by Jev</span></div><div class="cta">★ Star on GitHub</div></div>`;
const b = await chromium.launch();
for (const [name, body] of [["00-title", title], ["99-end", end]]) {
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.setContent(`<!doctype html><html><head><style>${css}</style></head><body>${body}</body></html>`, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${out}${name}.png` });
  console.log("card", name);
}
await b.close();
