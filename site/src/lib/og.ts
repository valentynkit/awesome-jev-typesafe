import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Astro bundles this module into .vercel/output, so import.meta.url is no guide to the
// project root. The build always runs with site/ as cwd.
const root = existsSync("node_modules/@fontsource/space-grotesk") ? "." : fileURLToPath(new URL("../..", import.meta.url));
const font = (weight: number) =>
  readFileSync(`${root}/node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-${weight}-normal.woff`);
const fonts = [
  { name: "Space Grotesk", data: font(700), weight: 700 as const, style: "normal" as const },
  { name: "Space Grotesk", data: font(400), weight: 400 as const, style: "normal" as const },
];

// Rendering 350 cards costs real seconds, so keep them across builds.
const cacheDir = `${root}/.astro/og/`;

export type CardInput = { title: string; subtitle: string; meta: string; p?: number };

export async function card({ title, subtitle, meta, p }: CardInput) {
  const key = createHash("sha256").update(JSON.stringify([title, subtitle, meta, p])).digest("hex").slice(0, 16);
  const hit = `${cacheDir}${key}.png`;
  if (existsSync(hit)) return readFileSync(hit);

  const div = (style: Record<string, unknown>, children: unknown) => ({ type: "div", props: { style, children } });
  const svg = await satori(
    div(
      { width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#0B0E11", color: "#E8EDF2", fontFamily: "Space Grotesk" },
      [
        div({ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#7C8791" }, [
          div({ display: "flex", width: 14, height: 14, borderRadius: 7, background: "#4CC9F0" }, ""),
          div({ display: "flex" }, "Awesome Jev"),
        ]),
        div({ display: "flex", flexDirection: "column", gap: 16 }, [
          div({ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -2 }, title.slice(0, 42)),
          div({ display: "flex", fontSize: 32, color: "#C5CDD5", lineHeight: 1.3 }, subtitle.slice(0, 140)),
        ]),
        div({ display: "flex", alignItems: "center", gap: 24, fontSize: 24, color: "#7C8791" }, [
          div({ display: "flex" }, meta),
          ...(p == null
            ? []
            : [div({ display: "flex", width: 300, height: 12, background: "#222A33", borderRadius: 6 }, [
                div({ display: "flex", width: Math.round(300 * p), height: 12, background: "#4CC9F0", borderRadius: 6 }, ""),
              ])]),
        ]),
      ],
    ) as any,
    { width: 1200, height: 630, fonts },
  );
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(hit, png);
  return png;
}
