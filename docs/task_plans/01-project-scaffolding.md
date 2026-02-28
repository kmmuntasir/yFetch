# Task 01: Project Scaffolding & Foundation

## Overview
Initialize the React + Vite project, install dependencies, set up the design system (CSS tokens), configure routing, and establish the project's folder structure. This is the prerequisite for all other tasks.

---

## Requirements

- **Framework:** React 19 with Vite 5 (zero-config, no proxy).
- **Routing:** `react-router-dom` v6 for URL query parameter sync.
- **State Management:** Zustand for global search/filter state.
- **Styling:** Plain CSS (or CSS Modules). No Tailwind.
- **Font:** `Inter` from Google Fonts (`400, 500, 600, 700`).
- **API Client:** Native `fetch` API (no Axios).
- **No backend, no proxy, no database.**

---

## TODO

### 1.1 — Initialize Vite + React Project
- [ ] Run `npx -y create-vite@latest ./ --template react` (or `react-ts` for TypeScript) in the project root.
- [ ] Verify dev server runs with `npm run dev`.

### 1.2 — Install Dependencies
- [ ] `react-router-dom` (v6)
- [ ] `zustand`
- [ ] No other runtime deps. Dev deps only as needed (e.g., `@types/*` if TypeScript).

### 1.3 — Project Folder Structure
Create the following directory layout under `src/`:

```
src/
├── assets/               # Static assets (SVGs, images)
├── components/           # Reusable UI components
│   ├── Header/
│   ├── SearchBar/
│   ├── MovieCard/
│   ├── MovieGrid/
│   ├── MovieModal/
│   ├── FilterBar/
│   ├── Pagination/
│   ├── SkeletonCard/
│   └── EmptyState/
├── hooks/                # Custom React hooks
│   ├── use-movie-search.ts
│   └── use-url-sync.ts
├── store/                # Zustand store(s)
│   └── use-movie-store.ts
├── services/             # API client
│   └── api-client.ts
├── constants/            # App-wide constants
│   ├── api-config.ts
│   ├── design-tokens.ts
│   └── trackers.ts
├── styles/               # Global styles
│   └── index.css
├── App.tsx
└── main.tsx
```

### 1.4 — Design Token Constants
Create `src/constants/design-tokens.ts` exporting all tokens from `DESIGN_STARTER_KIT.md`:

| Token Category | Values |
|---|---|
| **Colors — Base** | `BG_BODY: '#0F0F0F'`, `SURFACE_1: '#1A1A1A'`, `SURFACE_2: '#242424'`, `SURFACE_HOVER: '#2A2A2A'` |
| **Colors — Text** | `TEXT_PRIMARY: '#E8E8E8'`, `TEXT_SECONDARY: '#888888'`, `TEXT_DISABLED: '#4A4A4A'` |
| **Colors — Accent** | `ACCENT_PRIMARY: '#6AC045'`, `ACCENT_HOVER: '#58A638'`, `IMDB_GOLD: '#F5C518'`, `ERROR: '#EF4444'` |
| **Spacing** | `4, 8, 16, 24, 32, 48, 64` (px) |
| **Radius** | `SM: '4px'`, `MD: '8px'`, `LG: '12px'`, `PILL: '24px'` |
| **Shadows** | Level 1, Level 2, Level 3 as per design kit |

### 1.5 — Global CSS (`index.css`)
- [ ] CSS reset (`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`)
- [ ] Import Inter from Google Fonts.
- [ ] Set `body` background to `#0F0F0F`, color to `#E8E8E8`, font-family to `'Inter', sans-serif`.
- [ ] Define CSS custom properties (`:root { --bg-body: ...; }`) mirroring design tokens.
- [ ] Base transition utility: `transition: all 200ms ease;`

### 1.6 — API Config Constants
Create `src/constants/api-config.ts`:
- [ ] `API_BASE_URL = 'https://movies-api.accel.li/api/v2/list_movies.json'`
- [ ] `DEFAULT_LIMIT = 20`
- [ ] `AUTOCOMPLETE_LIMIT = 5`
- [ ] `AUTOCOMPLETE_DEBOUNCE_MS = 350`

### 1.7 — Tracker Constants
Create `src/constants/trackers.ts`:
- [ ] Export the array of 8 UDP tracker URLs (copied from `poc.html`).

### 1.8 — Zustand Store Skeleton
Create `src/store/use-movie-store.ts`:
- [ ] State shape: `query`, `quality`, `genre`, `minRating`, `sortBy`, `orderBy`, `page`, `limit`, `movies`, `movieCount`, `isLoading`, `error`.
- [ ] Actions: `setQuery`, `setFilters`, `setPage`, `resetFilters`, `fetchMovies`.
- [ ] Initial default values matching PRD defaults (`sortBy: 'date_added'`, `orderBy: 'desc'`, `page: 1`, `limit: 20`).

### 1.9 — API Client Service
Create `src/services/api-client.ts`:
- [ ] `fetchMovies(params)` — constructs URL with query params, calls `fetch`, returns parsed JSON.
- [ ] `buildMagnetLink(hash, title)` — constructs magnet URI with trackers (logic from `poc.html` lines 536–540).
- [ ] Proper error handling; throw on non-ok responses.

### 1.10 — React Router Setup
- [ ] Wrap `<App />` in `<BrowserRouter>` in `main.tsx`.
- [ ] Single route `/` rendering the main page.
- [ ] Prepare `use-url-sync.ts` hook for bidirectional URL ↔ Zustand sync (implementation in Task 05).

---

## Acceptance Criteria

- [ ] `npm run dev` starts successfully with no errors.
- [ ] `npm run build` produces a production bundle with no errors.
- [ ] All design token CSS custom properties are defined in `:root`.
- [ ] The page renders with the correct dark background (`#0F0F0F`) and Inter font.
- [ ] Zustand store is importable and returns correct default state shape.
- [ ] `api-client.ts` `fetchMovies()` successfully calls the live API and returns movie data when tested with a simple component.
- [ ] `buildMagnetLink()` produces a valid magnet URI string.
- [ ] Folder structure matches the plan.
