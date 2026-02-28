# Task 03: Movie Grid, Movie Cards & Skeleton Loaders

## Overview
Build the main content area: a responsive CSS grid of Movie Cards that displays search/browse results, plus the Skeleton Card loading state with shimmer animation. This is the core visual surface of the app.

**Depends on:** Task 01 (scaffolding, store, API client), Task 02 (header).

---

## Requirements

### Movie Grid
- CSS grid: `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`.
- Gap: `16px` between cards.
- Container padding: `24px` horizontally.
- **Responsive breakpoints:**
  - Desktop (≥1024px): 5–6 cards per row.
  - Tablet (768px–1023px): 3–4 per row (`minmax(180px, 1fr)`).
  - Mobile (<768px): 2 per row (`repeat(2, 1fr)`), reduced padding.
- Default content on first load: "Recently Added" movies (`sort_by=date_added`).
- Section heading: "Recently Added" when on default view (no active search/filters). Should dynamically change based on context (e.g., "Search Results for 'inception'", "Action Movies").

### Movie Card
- **Container:** `background: #1A1A1A`, `border-radius: 12px`, `overflow: hidden`, shadow Level 1.
- **Poster area:** Aspect ratio `2:3`. Image fills top 100% width. Use `small_cover_image`.
  - `loading="lazy"` on all poster `<img>` tags.
  - `alt` attribute set to movie title.
- **Text area:** Below the poster. `padding: 12px`.
  - Title: `18px` (Inter Medium), truncated to 1 line with `text-overflow: ellipsis; white-space: nowrap; overflow: hidden`.
  - Year: `14px`, `#888`.
- **Desktop Hover State (Glassmorphism Overlay):**
  - Card scales: `transform: scale(1.05)`, transition `200ms ease`.
  - Shadow deepens to Level 2.
  - A dark semi-transparent overlay (`rgba(0,0,0,0.85)`) fades in over the poster.
  - Overlay content:
    - IMDb rating badge: gold star `#F5C518` + bold rating.
    - Genre tags: `12px`, `#888`.
    - "View Details" button: `#6AC045` background, black text, `8px` radius.
  - Transition: overlay `opacity 200ms ease`.
- **Mobile:** No hover. Rating and year are always visible below the poster. Entire card acts as a tap target → opens MovieModal.
- **Click handler:** Opens MovieModal with the selected movie data.

### Skeleton Card (Loading State)
- Matches exact dimensions and aspect ratio of a real Movie Card.
- Background: `#1A1A1A`.
- **Shimmer animation:** A slow, continuous diagonal gradient sweep (`linear-gradient` from `#1A1A1A` through a slightly lighter grey `#2A2A2A` and back).
  - CSS `@keyframes shimmer` animation, ~1.5s duration, infinite loop.
- Skeleton shapes:
  - Poster area: solid `#2A2A2A` rectangle, `2:3` aspect ratio.
  - Title placeholder: rounded rect, `60%` width, `16px` height.
  - Year placeholder: rounded rect, `30%` width, `14px` height.
- Displayed while `isLoading === true` in the Zustand store.
- Number of skeleton cards: match the current `limit` value (default 20).

---

## TODO

### 3.1 — MovieCard Component
- [ ] Create `src/components/MovieCard/MovieCard.tsx` and `MovieCard.css`.
- [ ] Props: `movie` object (matching API response shape).
- [ ] Render poster, title, year.
- [ ] Desktop hover overlay with rating, genres, "View Details" button.
- [ ] Click handler: call a function to open MovieModal (pass movie data).
- [ ] Use CSS `aspect-ratio: 2/3` for the poster container.
- [ ] Lazy-load poster image.

### 3.2 — MovieGrid Component
- [ ] Create `src/components/MovieGrid/MovieGrid.tsx` and `MovieGrid.css`.
- [ ] Reads `movies`, `isLoading`, `movieCount` from Zustand store.
- [ ] Conditional rendering:
  - `isLoading` → render array of `<SkeletonCard />`.
  - `movies.length === 0 && !isLoading` → render `<EmptyState />` (Task 06).
  - `movies.length > 0` → render `<MovieCard />` for each movie.
- [ ] Dynamic section heading based on current state.
- [ ] CSS grid layout with responsive breakpoints.

### 3.3 — SkeletonCard Component
- [ ] Create `src/components/SkeletonCard/SkeletonCard.tsx` and `SkeletonCard.css`.
- [ ] No props needed.
- [ ] Static structure: poster placeholder + text placeholders.
- [ ] `@keyframes shimmer` CSS animation.
- [ ] Match exact visual dimensions of MovieCard.

### 3.4 — Initial Data Fetch
- [ ] In the main `App.tsx` (or the homepage component), trigger `fetchMovies` on mount with default params (`sort_by=date_added`, `limit=20`, `page=1`).
- [ ] Show skeleton cards while loading.
- [ ] On success, grid populates with results.

---

## Acceptance Criteria

- [ ] Movie Grid renders with correct number of columns at each breakpoint (desktop 5–6, tablet 3–4, mobile 2).
- [ ] Movie Cards display poster, title, year with correct styling.
- [ ] Poster images lazy-load and maintain `2:3` aspect ratio.
- [ ] Desktop hover: card scales up, overlay fades in with rating, genres, and "View Details" button.
- [ ] Mobile: no hover effect, card is directly tappable.
- [ ] Clicking a card opens MovieModal (or dispatches the correct action).
- [ ] Skeleton cards appear during loading with animated shimmer effect.
- [ ] Skeleton card dimensions match real MovieCard dimensions.
- [ ] On initial page load, "Recently Added" movies populate the grid.
- [ ] Title truncation works correctly for long movie titles.
