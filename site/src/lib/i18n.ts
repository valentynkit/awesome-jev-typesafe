import en from "../i18n/en.json";
import zh from "../i18n/zh.json";
import ja from "../i18n/ja.json";
import ko from "../i18n/ko.json";
import sectionsZh from "../i18n/sections.zh.json";
import sectionsJa from "../i18n/sections.ja.json";
import sectionsKo from "../i18n/sections.ko.json";

export const locales = ["en", "zh", "ja", "ko"] as const;
export type Locale = (typeof locales)[number];
export const names: Record<Locale, string> = { en: "English", zh: "中文", ja: "日本語", ko: "한국어" };
export const htmlLang = (l: string) => (l === "zh" ? "zh-CN" : l);

const dict: Record<string, typeof en> = { en, zh, ja, ko };
const sectionDict: Record<string, Record<string, string>> = { zh: sectionsZh, ja: sectionsJa, ko: sectionsKo };

export const t = (lang: string, key: string, vars: Record<string, string | number> = {}) => {
  const d = dict[lang] ?? en;
  const pick = (o: any) => key.split(".").reduce((x: any, k) => x?.[k], o);
  let s: any = pick(d) ?? pick(en) ?? key;
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s as string;
};

/** Section and subsection headings, translated by hand in src/i18n/sections.<lang>.json. */
export const sect = (lang: string, name: string) => sectionDict[lang]?.[name] ?? name;

export const localePath = (lang: string, path: string) => (lang === "en" ? path : `/${lang}${path}`);
export const langFromParams = (p: Record<string, string | undefined>) =>
  p.lang && (locales as readonly string[]).includes(p.lang) ? (p.lang as Locale) : "en";
export const staticLangs = () => [
  { params: { lang: undefined } },
  ...locales.filter((l) => l !== "en").map((lang) => ({ params: { lang } })),
];
