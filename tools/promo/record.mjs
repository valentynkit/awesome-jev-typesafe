#!/usr/bin/env node
// Records the promo scenes from the live site as one webm per scene under tools/promo/out/.
// Usage: node tools/promo/record.mjs [baseUrl]   (default https://awesomejev.vercel.app)
import { chromium } from "playwright";
import { mkdirSync, renameSync, readdirSync, rmSync } from "node:fs";

const base = process.argv[2] || "https://awesomejev.vercel.app";
const out = new URL("./out/", import.meta.url).pathname;
mkdirSync(out, { recursive: true });
const W = 1536, H = 864; // recorded at 16:9 and upscaled so the UI reads large
const NUDGE_KEY = "star-nudge";

// A visible cursor: Playwright renders none, so a dot follows the mouse we drive.
const cursorCss = `#promo-cursor{position:fixed;z-index:99999;width:22px;height:22px;border-radius:50%;background:rgba(76,201,240,.9);box-shadow:0 0 0 6px rgba(76,201,240,.25);pointer-events:none;transform:translate(-50%,-50%);transition:transform .08s}`;
const injectCursor = (page) => page.evaluate((css) => {
  const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
  const c = document.createElement("div"); c.id = "promo-cursor"; c.style.left = "-100px"; c.style.top = "-100px"; document.body.appendChild(c);
  window.addEventListener("mousemove", (e) => { c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px"; });
}, cursorCss);

const glide = async (page, from, to, steps = 30, ms = 12) => {
  for (let i = 1; i <= steps; i++) {
    const t = i / steps, e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    await page.mouse.move(from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e);
    await page.waitForTimeout(ms);
  }
};
const smoothScroll = async (page, to, ms = 1400) => {
  await page.evaluate(([to, ms]) => new Promise((r) => {
    const y0 = scrollY, t0 = performance.now();
    const step = (t) => { const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : -1 + (4 - 2 * k) * k; scrollTo(0, y0 + (to - y0) * e); k < 1 ? requestAnimationFrame(step) : r(); };
    requestAnimationFrame(step);
  }), [to, ms]);
};

async function scene(name, fn) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, recordVideo: { dir: out, size: { width: W, height: H } }, colorScheme: "dark" });
  await ctx.addInitScript((k) => { localStorage.setItem(k, "shown"); localStorage.setItem("theme", "dark"); }, NUDGE_KEY);
  const page = await ctx.newPage();
  await fn(page);
  const video = page.video();
  await ctx.close();
  const path = await video.path();
  renameSync(path, `${out}${name}.webm`);
  await browser.close();
  console.log("recorded", name);
}

for (const f of readdirSync(out)) if (f.endsWith(".webm")) rmSync(out + f);

await scene("01-hero", async (page) => {
  await page.goto(base + "/", { waitUntil: "load" });
  await injectCursor(page);
  await page.mouse.move(-100, -100);
  await page.waitForTimeout(5200);
});

await scene("02-search", async (page) => {
  await page.goto(base + "/", { waitUntil: "load" });
  await injectCursor(page);
  await page.mouse.move(760, 160);
  await smoothScroll(page, 470, 1100);
  const box = await page.locator("#q").boundingBox();
  await glide(page, [760, 160], [box.x + 140, box.y + box.height / 2], 28);
  await page.mouse.click(box.x + 140, box.y + box.height / 2);
  await page.waitForTimeout(250);
  await page.keyboard.type("compaction", { delay: 95 });
  await page.waitForTimeout(2600);
  await smoothScroll(page, 980, 1300);
  await page.waitForTimeout(1200);
});

await scene("03-radar", async (page) => {
  await page.goto(base + "/radar/", { waitUntil: "load" });
  await injectCursor(page);
  await page.mouse.move(-100, -100);
  await smoothScroll(page, 260, 900);
  await page.waitForTimeout(3600);
  await smoothScroll(page, 1500, 1500);
  await page.waitForTimeout(600);
});

await scene("04-trending", async (page) => {
  await page.goto(base + "/trending/", { waitUntil: "load" });
  await injectCursor(page);
  await page.mouse.move(-100, -100);
  await page.waitForTimeout(500);
  await smoothScroll(page, 900, 2200);
  await page.waitForTimeout(500);
});
