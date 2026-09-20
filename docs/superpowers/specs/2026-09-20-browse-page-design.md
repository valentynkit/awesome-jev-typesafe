# Awesome Jev: a browse page that owns search

Date: 2026-09-20. Status: implemented the same day.

## Problem

The home page is two pages in one. The hero carries the search box and the facet chips, but the grid they filter is the "All projects" section at the bottom, below Trending, Categories, New this week, and Gallery. Typing a query changes the count next to the box and nothing else in view. The reranked result lands three screens down.

## Goal

One place to search and filter, with the results directly under the box. The home page stays a landing page: what this is, what is hot, where to start.

## Non-goals

- A search dropdown or command palette. Facets and rerank bars need the grid.
- Client-side routing. Every state lives in the URL as it does today.
- Changing search-core, the rerank endpoint, or the search index.

## Design

### `/projects/` (and `/zh/projects/`, `/ja/projects/`, `/ko/projects/`)

The directory view. Crumbs, an h1 "All projects" with a one-line lede, then the sticky search bar, then a two-column layout: facets in a sticky sidebar on the left, the card grid on the right. Below 900px the sidebar collapses above the grid and below 700px it becomes the existing filter drawer. The no-results line with its clear button sits under the grid.

URL state is unchanged: `?q=`, `?section=`, `?sort=` and the other facet keys are read on load and written on every change, so a search is a shareable link. The page carries the ItemList JSON-LD for every project.

### Home

The hero replaces its "Search" button with a real form: an input named `q` and a submit button, `action="/projects/"`. Pressing Enter lands on the browse page with the query applied and the reranker already running. The CTA row keeps Submit and Surprise me and gains "Browse all N projects". The Categories rule gets the same link on its right edge. The sticky search panel, the facet chips, the "All projects" grid, and the no-results line leave the home page. Trending, Categories, New this week, Gallery, Learn, and the submit banner stay.

`/` focuses the hero input, as it does on the browse page.

### Header

"Projects" is the first nav link. Surprise me no longer depends on cards being on the page: it fetches the English search index, which every page can reach, and follows a random id.

### Components

- `SearchBox.astro` keeps the bar, the "reranked by Jev" mark, the sort select, the count, and the explainer dialog.
- `Facets.astro` is the filter block split out of SearchBox so the browse page can place it in a sidebar.
- `search.ts` is unchanged. It mounts on the browse page only.

### Copy

New keys in all four languages: `projects` (nav label), `browseAll` ("Browse all {n} projects"), `projectsLede`.

## Verification

`npm test` in `site/`, `astro build`, then read the built HTML: the browse page has the search bar, the facets, and the grid in that order; the home page has the form and no `#results`; the header links to `/projects/` on every page.
