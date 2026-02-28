# Task 06: Error Handling, Empty States & Final Polish

## Overview
Build the error state UI, the zero-results empty state, and perform final polish including transitions, accessibility, responsiveness QA, and performance checks. This task wraps up all remaining UX details.

**Depends on:** Tasks 01–05 (all prior components and features complete).

---

## Requirements

### Empty State (Zero Results)
- Triggered when `movie_count === 0` and `isLoading === false`.
- **Layout:** Centered vertically and horizontally in the viewport area normally occupied by the MovieGrid.
- **Content:**
  - Muted SVG illustration or icon (empty film reel / broken magnifying glass) in `#4A4A4A`.
  - Heading: "No movies found" — `24px`, Inter, `#E8E8E8`.
  - Subtext: "We couldn't find any results matching your search terms. Try adjusting your filters or checking for typos." — `14px`, `#888`.
  - **"Clear Search & Filters" button:** Ghost style (`border: 1px solid #4A4A4A`, bg `#1A1A1A`). On click: wipe all store state, clear URL params, navigate to `/`, fetch default Recently Added.

### API Error State
- Triggered when API call fails (network error, HTTP 4xx/5xx).
- **Layout:** Same centered placement as Empty State.
- **Content:**
  - Error icon (e.g., warning triangle SVG) in `#EF4444`.
  - Heading: "Failed to load movies" — `24px`, `#E8E8E8`.
  - Subtext: error message from the API or a generic "Something went wrong. Please check your connection." — `14px`, `#888`.
  - **"Retry" button:** Primary style (bg `#6AC045`, text `#000`). On click: re-trigger `fetchMovies` with the same current params.

### Accessibility
- All `<img>` tags have meaningful `alt` text (movie title).
- All `<button>` elements have an `aria-label` if icon-only (e.g., close button, search icon button).
- Focus trap in the MovieModal — tab key cycles only within modal when open.
- Semantic HTML: `<header>`, `<main>`, `<nav>` (for pagination), `<article>` (for movie cards).
- `aria-live="polite"` region for search results count updates.

### Page Title & Meta
- Dynamic `<title>`: "yFetch — Browse & Download Movies".
- When a search is active: "yFetch — Search: {query}".
- `<meta name="description">` tag.

### Transitions & Micro-Animations
- All interactive elements: `transition: all 200ms ease`.
- Movie Cards: hover scale + shadow transition.
- Skeleton shimmer animation.
- Modal open/close: scale + fade.
- Autocomplete dropdown: fade in/out.
- Pagination button hover.
- Filter dropdown focus ring.

### Performance
- All poster images use `loading="lazy"`.
- `AbortController` in API client to cancel in-flight requests when new ones start.
- Debounce on autocomplete (350ms).
- No unnecessary re-renders: use `React.memo` on MovieCard, memoize expensive computations with `useMemo`.

---

## TODO

### 6.1 — EmptyState Component
- [ ] Create `src/components/EmptyState/EmptyState.tsx` and `EmptyState.css`.
- [ ] SVG illustration (create or source a simple one, e.g., empty film reel).
- [ ] Heading, subtext, and "Clear Search & Filters" button.
- [ ] Click handler: `resetFilters()` from store, navigate to `/`.

### 6.2 — ErrorState Component
- [ ] Create `src/components/ErrorState/ErrorState.tsx` and `ErrorState.css`.
- [ ] Error icon SVG.
- [ ] Heading, subtext (display error message), and "Retry" button.
- [ ] Click handler: `fetchMovies()` with current params from store.

### 6.3 — Integrate States into MovieGrid
- [ ] In `MovieGrid.tsx`, add conditional rendering:
  - `isLoading` → SkeletonCards.
  - `error` → ErrorState.
  - `movies.length === 0 && !isLoading && !error` → EmptyState.
  - `movies.length > 0` → MovieCards.

### 6.4 — Accessibility Audit
- [ ] Add `alt` attributes to all images.
- [ ] Add `aria-label` to icon-only buttons (close, search, filter toggle).
- [ ] Wrap MovieModal in a focus trap.
- [ ] Use semantic HTML elements throughout.
- [ ] Add `aria-live` region for results count.

### 6.5 — Page Title Management
- [ ] Use `useEffect` to dynamically set `document.title` based on current search/filter state.
- [ ] Add `<meta name="description">` in `index.html`.

### 6.6 — Performance Optimization
- [ ] Wrap `MovieCard` in `React.memo`.
- [ ] Use `AbortController` in `fetchMovies` to cancel stale requests.
- [ ] Verify lazy loading on images.
- [ ] Check for unnecessary re-renders using React DevTools Profiler.

### 6.7 — Cross-Browser & Responsive QA
- [ ] Test on Chrome, Firefox, Safari (desktop).
- [ ] Test on mobile viewport (Chrome DevTools responsive mode).
- [ ] Verify all 3 breakpoints (desktop, tablet, mobile) display correctly.
- [ ] Verify modal behavior on all sizes.
- [ ] Verify filter overlay on mobile.

### 6.8 — Final Build Verification
- [ ] Run `npm run build` — ensure zero errors/warnings.
- [ ] Run `npm run preview` — verify production build works correctly.
- [ ] Test all user journeys end-to-end:
  1. Journey 1: Browse → Hover → Modal → Trailer → Download.
  2. Journey 2: Search → Autocomplete → Select → Modal → Download.
  3. Journey 3: Filter → Skeleton → Results → Paginate.
  4. Journey 4: Set filters → Copy URL → Open in new tab → Identical view.
  5. Journey 5: Mobile → Search overlay → Tap card → Full-screen modal → Download.
  6. Journey 6: Search obscure term → Empty state → Reset → Homepage.

---

## Acceptance Criteria

- [ ] Zero-results search displays the EmptyState with illustration, heading, subtext, and "Clear" button.
- [ ] Clicking "Clear Search & Filters" resets to the homepage with Recently Added movies.
- [ ] API failure displays ErrorState with error message and "Retry" button.
- [ ] Clicking "Retry" re-fetches with the same params.
- [ ] All images have `alt` text.
- [ ] All icon-only buttons have `aria-label`.
- [ ] Modal has focus trap (Tab does not escape to background).
- [ ] Page title updates dynamically.
- [ ] Production build (`npm run build`) completes with no errors.
- [ ] All 6 user journeys work end-to-end as documented.
- [ ] No console errors in production mode.
- [ ] Responsive design is correct at all breakpoints.
