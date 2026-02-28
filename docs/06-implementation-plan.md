# Implementation Plan: Task 06 (Error Handling, Empty States & Final Polish)

## Goal Description
Implement the zero-results empty state, the API error state, and perform final UX polish including transitions, accessibility (a11y), responsive design QA, and performance optimizations.

## Proposed Changes

### Global Types & API Client
---
#### [MODIFY] `src/types/movie.ts`
- Add `signal?: AbortSignal` to `FetchMoviesParams`.

#### [MODIFY] `src/services/api-client.ts`
- Update `fetchMovies` signature to pass `params.signal` into the native `fetch` call to support request abortion.

### State Management
---
#### [MODIFY] `src/store/use-movie-store.ts`
- Add an internal tracking variable (outside state or within) to hold `AbortController` instances.
- In `fetchMovies`, abort any in-flight request before initiating a new one to prevent race conditions.
- Ignore `AbortError` in the `catch` block so it doesn't trigger the Error UI.

### New Components
---
#### [NEW] `src/components/EmptyState/EmptyState.tsx` & `EmptyState.css`
- Triggered on zero results. Display an illustration, "No movies found" heading, and descriptive subtext.
- Include a "Clear Search & Filters" ghost button that invokes `resetFilters()`.
- Uses muted colors (`#4A4A4A` icon/borders).

#### [NEW] `src/components/ErrorState/ErrorState.tsx` & `ErrorState.css`
- Triggered on API failures. Display an error icon, "Failed to load movies" heading, and the error message as subtext.
- Include a "Retry" primary button that re-runs `fetchMovies()`.
- Uses danger colors (`#EF4444` icon).

### Component Integration & Polish
---
#### [MODIFY] `src/components/MovieGrid/MovieGrid.tsx` & `MovieGrid.css`
- Render `ErrorState` if the `error` state is populated.
- Render `EmptyState` if `movies.length === 0 && !isLoading && !error`.
- Add an `aria-live="polite"` region to the results count for screen readers.

#### [MODIFY] `src/components/MovieCard/MovieCard.tsx`
- Wrap export with `React.memo` to prevent unnecessary re-renders.
- Ensure the `<img>` tag has `loading="lazy"` and a descriptive `alt` attribute.
- Add CSS transitions for hover scale and shadow.

#### [MODIFY] `src/components/MovieModal/MovieModal.tsx`
- Implement a focus trap so the `Tab` key cycles inside the modal and doesn't escape to the background list.
- Enhance open/close animations (scale + fade).
- Add `aria-label` to the close icon button.

#### [MODIFY] `src/hooks/use-autocomplete.ts`
- Implement a 350ms debounce mechanism so it doesn't instantly ping the API on every keystroke.

#### [MODIFY] `src/App.tsx`
- Add an effect to manage `<title>` dynamically ("yFetch — Browse & Download Movies" OR "yFetch — Search: {query}").

#### [MODIFY] `index.html`
- Add `<meta name="description">` providing a summary of the site.

## Verification Plan

### Automated Checks
- Run `npm run build` to verify there are zero TypeScript, linting, or Vite build errors.
- Run `npm run preview` to verify production behavior.

### Manual Verification
- **Empty State:** Enter gibberish in search, observe EmptyState. Click "Clear Search & Filters" and verify it navigates to `/` and loads recent movies.
- **Error State:** In Chrome Dev Tools, restrict network to "Offline", refresh/search, observe ErrorState correctly reads the error. Turn network on, click "Retry", verify fetch succeeds.
- **Accessibility:** 
  - Verify images have `alt` tags.
  - Test `Tab` trap (focus doesn't leave modal).
- **Performance:** Ensure no redundant API calls per keystroke by monitoring network tab for autocomplete debounce.
- **End-to-End Journeys:** Run through all 6 User Journeys defined in task 6.8 to ensure full UX compliance.
