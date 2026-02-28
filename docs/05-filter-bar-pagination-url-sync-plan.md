# Task 05 Implementation Plan: Filter Bar, Pagination & URL Sync

This document outlines the step-by-step implementation plan for the Filter Bar, Pagination component, and bidirectional URL ↔ State synchronization.

## Objective
Enable users to filter, sort, and paginate through movies. Ensure the state is accurately reflected in the URL parameters for deep linking and sharing.

## Proposed Changes

We will group the changes into sensible, logical steps.

---

### Step 1: Constants & Types
#### [NEW] `src/constants/sort-options.ts`
- Define `SORT_OPTIONS` mapping display labels to API params (`sort_by`, `order_by`).
  - E.g., `value: 'latest-added'`, `label: 'Latest Added'`, `sortBy: 'date_added'`, `orderBy: 'desc'`.

#### [MODIFY] `src/types/movie.ts`
- Update `FilterParams` if necessary to ensure it covers all options smoothly, though the current one (`quality`, `genre`, `minRating`, `sortBy`, `orderBy`) is already well-aligned.

---

### Step 2: URL Synchronization Hook
#### [NEW] `src/hooks/use-url-sync.ts`
- A custom hook that utilizes `useSearchParams` from `react-router-dom`.
- **On Mount / URL changes:** Reads URL query parameters. If any are present (e.g., `?genre=action`), it updates the Zustand `useMovieStore`.
- **On State changes:** Subscribes to `useMovieStore`. If `genre`, `quality`, `minRating`, `sortBy`, `orderBy`, or `page` changes, it updates the URL search params without triggering a page reload (`{ replace: true }`). It cleans up default parameters so the URL remains tidy.

---

### Step 3: Components (Filter Bar & Mobile Overlay)
#### [NEW] `src/components/FilterBar/FilterBar.tsx`
- Implement desktop/tablet filter bar spanning horizontally `gap: 16px` using `<select>` dropdowns for Quality, Genre, Min Rating, and Sort By.
- Include a "Reset Filters" ghost button visible only when filters have non-default values.
- On filter change, triggers store updates and resets page to 1, kicking off a data fetch.

#### [NEW] `src/components/FilterBar/FilterBar.css`
- Apply Vanilla CSS strictly following the design tokens.
- Add `<select>` styling to hide default browser dropdown arrows and implement custom chevrons.

#### [NEW] `src/components/FilterBar/MobileFilterOverlay.tsx`
- Provide a bottom-sheet/full-screen overlay for mobile screens (<768px).
- Display the layout vertically with full-width `<select>` elements and main actions (Apply, Reset).

#### [MODIFY] `src/App.tsx` (or `src/pages/HomePage.tsx`)
- Render the `FilterBar` component between the `Header` and `MovieGrid`.
- Add the `useUrlSync()` hook invocation at the top level of the page/app so it can keep the store and URL in sync.

---

### Step 4: Pagination Component
#### [NEW] `src/components/Pagination/Pagination.tsx`
- Displays `Page X of Y` text.
- Renders "Prev" and "Next" buttons, disabled appropriately at boundaries.
- Renders numbered page buttons (max 7 numbers/ellipses visible, e.g. `1 2 ... 5 6 7`).
- Triggers `fetchMovies` and updates `page` state in the store.

#### [NEW] `src/components/Pagination/Pagination.css`
- Apply styling according to requirements (`36x36px` default, `#6AC045` for active page).

---

## Verification Plan

### Automated Tests
- The components will be visually verified by running the Vite development server `npm run dev`. Since unit tests and component tests aren't present yet, our verification relies heavily on ensuring the strict design implementation.
- We will verify no linting errors occur via `npm run lint` and typescript compiles via `npm run build`.

### Manual Testing
1. **Desktop/Tablet Filter:** Launch app, pick a different genre, verify API request triggers and the URL gets appended with `?genre=...`. The Grid should update.
2. **Deep linking:** Copy the URL (e.g. `http://localhost:5173/?genre=action&quality=1080p&page=2`), open a new tab, paste it. Verify the UI initializes on Page 2 with Action and 1080p selected, fetching exactly those movies.
3. **Pagination boundary:** Next should move to Page 3, Prev back to Page 2. On Page 1, Prev is disabled. At total pages, Next is disabled.
4. **Mobile Overlay:** Resize browser to `<768px`, click "Filters & Sort", change some values, click "Apply", verify Grid updates and URL updates.
5. **Reset functionality:** Ensure default values are restored inside dropdowns and URL parameters are cleanly stripped.
