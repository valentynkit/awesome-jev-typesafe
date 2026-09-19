// Copies ../media into public/media, shrinking screenshots on the way. Originals stay
// full size in the repo; only what the site serves gets resized and recompressed.
import { cpSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SRC = fileURLToPath(new URL("../../media/", import.meta.url));
const DEST = fileURLToPath(new URL("../public/media/", import.meta.url));
const MAX_WIDTH = 1200;

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;

async function shrink(file, from, to) {
  const ext = extname(file).toLowerCase();
  const before = statSync(from).size;
  if (![".png", ".jpg", ".jpeg"].includes(ext)) {
    cpSync(from, to);
    return { file, before, after: before, note: "copied" };
  }

  const img = sharp(from);
  const { width } = await img.metadata();
  const wide = (width ?? 0) > MAX_WIDTH;
  const resized = wide ? img.resize({ width: MAX_WIDTH }) : img;
  const out =
    ext === ".png"
      ? await resized.png({ compressionLevel: 9, palette: true }).toBuffer()
      : await resized.jpeg({ quality: 82 }).toBuffer();

  // A palette PNG can come out bigger than a well packed original, so only keep a win.
  if (out.length >= before) {
    cpSync(from, to);
    return { file, before, after: before, note: "kept original" };
  }
  writeFileSync(to, out);
  return { file, before, after: out.length, note: wide ? `${width}px -> ${MAX_WIDTH}px` : "recompressed" };
}

mkdirSync(DEST, { recursive: true });
const rows = [];
for (const entry of readdirSync(SRC, { withFileTypes: true })) {
  const from = join(SRC, entry.name);
  const to = join(DEST, entry.name);
  if (entry.isDirectory()) {
    cpSync(from, to, { recursive: true });
    continue;
  }
  rows.push(await shrink(entry.name, from, to));
}

const pad = Math.max(...rows.map((r) => r.file.length));
for (const r of rows) {
  const saved = r.before - r.after;
  console.log(
    `${r.file.padEnd(pad)}  ${kb(r.before).padStart(9)} -> ${kb(r.after).padStart(9)}  ${saved > 0 ? `-${kb(saved)}` : ""} ${r.note}`,
  );
}
const before = rows.reduce((n, r) => n + r.before, 0);
const after = rows.reduce((n, r) => n + r.after, 0);
console.log(`media: ${kb(before)} -> ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller)`);
