import type { APIRoute } from "astro";
import { projects, entries } from "../../lib/data";
import { card } from "../../lib/og";
import { t } from "../../lib/i18n";

export const GET: APIRoute = async () => {
  const png = await card({
    title: "Awesome Jev",
    subtitle: t("en", "lede"),
    meta: `${projects.length} projects  ·  ${entries.length} entries`,
  });
  return new Response(new Uint8Array(png), { headers: { "content-type": "image/png" } });
};
