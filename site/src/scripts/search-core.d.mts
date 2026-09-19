export type Doc = {
  id: string; name: string; description: string; section: string; subsection: string; host: string | null;
  owner: string | null; topics: string; language: string; license: string; stars: number;
  starsBucket: string; hasMedia: boolean; maintainer: boolean; intents: Record<string, number>;
  firstSeen: string; pushedAt: string; useCases: string[]; form: string | null; jevHost: string | null;
};
export type Query = string | { queries: Query[]; combineWith: string };
export function buildIndex(docs: Doc[]): {
  search(q: Query): { id: string; score: number }[];
};
export const SYNONYMS: Record<string, string[]>;
export function expandQuery(q: string): Query;
export function facetValue(doc: Doc, key: string): string | string[] | boolean | null | undefined;
export function applyFacets(docs: Doc[], facets: Record<string, string[]>): Doc[];
export function facetCounts(docs: Doc[], facets: Record<string, string[]>, key: string): Map<string, number>;
export function matchIntent(query: string, intents: string[]): string | null;
export function sortDocs(docs: Doc[], sort: string): Doc[];
