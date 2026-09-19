import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://awesomejev.vercel.app",
  output: "static",
  adapter: vercel(),
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh", "ja", "ko"],
    routing: { prefixDefaultLocale: false },
  },
  vite: { server: { fs: { allow: [".."] } } },
});
