# Task 05: Filter Bar, Pagination & URL Sync

## Overview
Build the FilterBar component (dropdown filters + sorting), the Pagination controls, and the bidirectional URL ↔ State synchronization. These features enable user journeys 3 (Power Filterer), 4 (Sharer), and are integral to all browse/search workflows.

**Depends on:** Task 01 (store, API client), Task 03 (MovieGrid re-renders on state change).

---

## Requirements

### Filter Bar
- **Desktop (≥1024px):** Horizontal `flexbox`, `gap: 16px`, positioned between the Header and the MovieGrid. Always visible.
- **Tablet (768px–1023px):** Horizontal, with `overflow-x: auto` if filters overflow. Optionally scrollable.
- **Mobile (<768px):** Hidden by default. Replaced with a "Filters & Sort" ghost button (`border: 1px solid #4A4A4A`) that opens a **full-screen or bottom-sheet overlay** for filter selection.

### Filter Dropdowns
All styled as custom `<select>` elements: bg `#1A1A1A`, border `1px solid #333`, text `#E8E8E8`, chevron icon on the right, focus ring `#6AC045`.

| Filter | Options | API Param |
|---|---|---|
| **Quality** | All, 480p, 720p, 1080p, 1080p.x265, 2160p (4K), 3D | `quality` |
| **Genre** | All, Action, Adventure, Animation, Biography, Comedy, Crime, Documentary, Drama, Family, Fantasy, Film-Noir, History, Horror, Music, Musical, Mystery, Romance, Sci-Fi, Sport, Thriller, War, Western | `genre` |
| **Min Rating** | All (0), 5+, 6+, 7+, 8+, 9+ | `minimum_rating` |
| **Sort By** | Latest Added, Oldest Added, Newest Year, Oldest Year, Rating, Seeds, Peers, Downloads, Likes, Alphabetical | `sort_by` + `order_by` |

> **Sort By mapping:**
> - "Latest Added" → `sort_by=date_added, order_by=desc`
> - "Oldest Added" → `sort_by=date_added, order_by=asc`
> - "Newest Year" → `sort_by=year, order_by=desc`
> - "Oldest Year" → `sort_by=year, order_by=asc`
> - "Rating" → `sort_by=rating, order_by=desc`
> - "Seeds" → `sort_by=seeds, order_by=desc`
> - "Peers" → `sort_by=peers, order_by=desc`
> - "Downloads" → `sort_by=download_count, order_by=desc`
> - "Likes" → `sort_by=like_count, order_by=desc`
> - "Alphabetical" → `sort_by=title, order_by=asc`

### Filter Behavior
- Changing **any** filter immediately triggers a new API call with updated params.
- Pagination resets to page 1 on any filter change.
- A **"Reset Filters" button** clears all active filters and returns to the default view (Recently Added, page 1).
  - Ghost button style. Only visible when at least one filter is non-default.

### Pagination
- Appears below the MovieGrid.
- Horizontally centered, `flexbox` with `gap: 6px`.
- **Elements:**
  - Page info text: "Page X of Y (Z movies)" in `#888`, `13px`.
  - "← Prev" button (disabled on page 1).
  - Numeric page buttons: max **7** visible at once.
    - Always show first and last page.
    - Show current page ± 3.
    - Use "…" ellipsis buttons for gaps.
  - "Next →" button (disabled on last page).
- **Button styling:**
  - Default: `36×36px`, bg `#1A1A1A`, text `#888`, `border-radius: 4px`.
  - Active (current page): bg `#6AC045`, text `#000`, bold.
  - Hover: bg `#2A2A2A`.
  - Disabled: `opacity: 0.4`, `cursor: default`.
- Clicking a page button triggers `fetchMovies` with updated `page` param.

### URL ↔ State Synchronization
- **URL → State (on page load):** On initial load, parse URL search params and populate the Zustand store. If params exist, the app fetches data matching those params instead of showing defaults.
- **State → URL (on state change):** When filters, search term, sort, or page change, update the URL search params using `useSearchParams` from react-router-dom. Do **not** trigger a page reload.
- **Supported URL params:** `query_term`, `quality`, `genre`, `minimum_rating`, `sort_by`, `order_by`, `page`.
- **Example URL:** `?genre=sci-fi&quality=1080p&minimum_rating=8&sort_by=year&order_by=asc&page=2`.
- **Deep linking:** A shared URL must reproduce the exact same view for the recipient.

### Mobile Filters Overlay
- Full-screen or bottom-sheet modal, bg `#0F0F0F`.
- Render all filter dropdowns vertically stacked, each full-width.
- "Apply Filters" primary button (bg `#6AC045`) at the bottom.
- "Reset" ghost button alongside.
- Close on apply or on explicit close action.

---

## TODO

### 5.1 — Filter Bar Component
- [ ] Create `src/components/FilterBar/FilterBar.tsx` and `FilterBar.css`.
- [ ] Render Quality, Genre, Min Rating, Sort By dropdowns.
- [ ] Each dropdown reads its value from Zustand store and dispatches changes.
- [ ] Style custom `<select>` dropdowns matching the design spec.
- [ ] "Reset Filters" button — conditionally visible.
- [ ] Focus ring on dropdowns.

### 5.2 — Sort Mapping Logic
- [ ] Create a mapping array/object in `src/constants/sort-options.ts`:
  - Maps display labels (e.g., "Newest Year") → API params (`sort_by`, `order_by`).
- [ ] The Sort By dropdown uses the display label, and the store converts it to API params when fetching.

### 5.3 — Filter Change Handler
- [ ] On any dropdown change: update Zustand store, reset page to 1, trigger `fetchMovies`.
- [ ] "Reset Filters" clears all to defaults and re-fetches.

### 5.4 — Pagination Component
- [ ] Create `src/components/Pagination/Pagination.tsx` and `Pagination.css`.
- [ ] Props (from store): `movieCount`, `limit`, `currentPage`.
- [ ] Calculate total pages: `Math.ceil(movieCount / limit)`.
- [ ] Render page info, Prev, numbered buttons (max 7 with ellipsis), Next.
- [ ] Active page styling.
- [ ] Disabled states for Prev/Next at boundaries.
- [ ] Click handler: update `page` in store, trigger `fetchMovies`.

### 5.5 — URL Sync Hook
- [ ] Create `src/hooks/use-url-sync.ts`.
- [ ] **Read on mount:** Use `useSearchParams()` to read URL params. If any exist, populate the Zustand store and trigger initial fetch with those params.
- [ ] **Write on state change:** Subscribe to Zustand store changes and update `searchParams` accordingly.
- [ ] Handle edge case: avoid infinite loops (URL update → state change → URL update).
- [ ] Handle edge case: only write non-default values to URL (keep URL clean).

### 5.6 — Mobile Filters Overlay
- [ ] Create `src/components/FilterBar/MobileFilterOverlay.tsx` and styles.
- [ ] Full-screen overlay with stacked dropdowns.
- [ ] "Apply Filters" and "Reset" buttons.
- [ ] Triggered by the "Filters & Sort" button visible on mobile.

---

## Acceptance Criteria

- [ ] Filter bar is visible on desktop/tablet, hidden behind a button on mobile.
- [ ] All filter dropdowns render with correct options matching the API.
- [ ] Changing a filter instantly updates the movie grid and resets to page 1.
- [ ] Sort By dropdown correctly maps compound sort options (e.g., "Newest Year" → `sort_by=year&order_by=desc`).
- [ ] "Reset Filters" clears all filters and returns to default Recently Added view.
- [ ] Reset button is only visible when at least one filter is non-default.
- [ ] Pagination renders correctly with max 7 buttons + ellipsis.
- [ ] Current page button is highlighted in `#6AC045`.
- [ ] Prev/Next buttons are disabled at boundaries.
- [ ] Clicking a page button loads the correct page of results.
- [ ] URL updates when filters/sort/page change (no page reload).
- [ ] Loading the app with a pre-set URL (e.g., `?genre=action&page=2`) correctly initializes filters and fetches matching data.
- [ ] A shared URL produces the identical view for another user (deep linking works).
- [ ] Mobile: "Filters & Sort" button opens the overlay with all controls.
