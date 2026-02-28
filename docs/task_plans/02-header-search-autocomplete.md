# Task 02: Header, Search Bar & Autocomplete

## Overview
Build the top navigation header containing the app logo/title and the search bar with autocomplete dropdown. This component is visible on every page and is the primary entry point for user journeys 2 (Direct Searcher) and 5 (Mobile).

**Depends on:** Task 01 (scaffolding complete, Zustand store, API client).

---

## Requirements

### Header
- Sticky top header bar spanning full viewport width.
- **Desktop (≥1024px):** Logo/title on the left, centered search bar (`max-width: 600px`), and empty right section (reserved for future).
- **Tablet (768px–1023px):** Search bar takes full width below the logo row, or compressed in the header.
- **Mobile (<768px):** Logo on the left, tappable magnifying glass icon on the right. Tapping the icon opens a **full-screen search overlay** (solid `#0F0F0F` background, input takes 100% width).
- Background: `#0F0F0F` or slightly distinct from body (subtle border-bottom `1px solid #1A1A1A`).

### Search Bar
- Rounded pill shape: `border-radius: 24px`.
- Background: `#1A1A1A`, text: `#E8E8E8`.
- A search icon (magnifying glass SVG) integrated on the left inside the input.
- **Focus state:** `outline: 2px solid #6AC045; outline-offset: 2px`.
- Placeholder text: "Search movies..." in `#888`.

### Autocomplete Dropdown
- Triggers after **350ms debounce** once the user has typed ≥2 characters.
- API call: `?query_term={term}&limit=5&sort_by=date_added&order_by=desc`.
- Dropdown anchored directly below the search bar.
- **Styling:** Background `#242424`, shadow Level 3, `border-radius: 12px`.
- Max 5 suggestion items displayed vertically with zero gap.
- Each item shows:
  - Movie poster thumbnail (`small_cover_image`) — `36px × 54px`, rounded `3px`.
  - Title in `16px` `#E8E8E8`.
  - Year in `14px` `#888`.
  - Optional: rating badge.
- Hover state: item background changes to `#2A2A2A`.
- **"Show all results for {query}"** link at the bottom (accent `#6AC045` text).
- Clicking a suggestion → opens MovieModal with that movie data (no extra API call).
- Pressing **Enter** → executes full search, updates MovieGrid.
- Pressing **Escape** or clicking outside → closes dropdown.
- Dropdown transitions: fade-in/out `150ms`.

### Mobile Search Overlay
- Full viewport overlay (`100vw × 100vh`, `z-index: 999`), background `#0F0F0F`.
- Large input auto-focused, spanning full width.
- Autocomplete results render as full-width, touch-friendly stacked list items (large tap target: min `48px` row height).
- A close/back button to dismiss the overlay.

---

## TODO

### 2.1 — Header Component
- [ ] Create `src/components/Header/Header.tsx` and `Header.css`.
- [ ] Responsive layout with flexbox:
  - Desktop: 3-column (logo | search | spacer).
  - Mobile: 2-column (logo | search icon button).
- [ ] Sticky positioning: `position: sticky; top: 0; z-index: 100;`.
- [ ] Logo/title: "yFetch" text in `#6AC045`, bold, `1.5rem`.

### 2.2 — SearchBar Component
- [ ] Create `src/components/SearchBar/SearchBar.tsx` and `SearchBar.css`.
- [ ] Controlled input tied to local state (NOT directly to Zustand — local for debounce).
- [ ] Magnifying glass icon SVG embedded inside the input (via `padding-left`).
- [ ] Pill-shaped styling as specified.
- [ ] Focus ring styling.
- [ ] `onInput` → start 350ms debounce timer → call `fetchAutocomplete()`.
- [ ] `onKeyDown(Enter)` → clear dropdown, dispatch full search to Zustand.
- [ ] `onKeyDown(Escape)` → close dropdown.
- [ ] Click-outside detection to close dropdown (use `useEffect` with `document.addEventListener`).

### 2.3 — Autocomplete Hook
- [ ] Create `src/hooks/use-autocomplete.ts`.
- [ ] Manages: `suggestions[]`, `isOpen`, `isLoading`.
- [ ] Accepts a `query` string, performs debounced fetch.
- [ ] Returns `{ suggestions, isOpen, closeSuggestions, selectSuggestion }`.
- [ ] Uses `AbortController` to cancel inflight requests when a new query arrives.

### 2.4 — Autocomplete Dropdown UI
- [ ] Render inside `SearchBar` component, positioned absolutely below.
- [ ] Map `suggestions` to list items with poster, title, year.
- [ ] "Show all results" footer link.
- [ ] Click handlers: suggestion click → open modal (emit event / set store), footer click → full search.
- [ ] Keyboard navigation (stretch): arrow keys to navigate suggestions.

### 2.5 — Mobile Search Overlay
- [ ] Create `src/components/SearchBar/MobileSearchOverlay.tsx` and styles.
- [ ] Triggered by magnifying glass icon tap in mobile header.
- [ ] Portal-mounted (`ReactDOM.createPortal`) to avoid z-index issues.
- [ ] Auto-focus on the input.
- [ ] Reuses `use-autocomplete` hook.
- [ ] Back/close button.

---

## Acceptance Criteria

- [ ] Header renders on all screen sizes with correct responsive behavior.
- [ ] Search bar is visually pill-shaped with search icon and green focus ring.
- [ ] Typing "inception" shows ≤5 autocomplete suggestions after 350ms delay.
- [ ] Each suggestion displays a poster thumbnail, title, and year.
- [ ] Clicking a suggestion opens the movie detail modal (or dispatches the correct event).
- [ ] Pressing Enter triggers a full-page search.
- [ ] Pressing Escape and clicking outside closes the dropdown.
- [ ] On mobile, tapping the search icon opens a full-screen search overlay.
- [ ] The overlay autocomplete results are touch-friendly (large tap targets).
- [ ] No CORS errors when calling the API.
- [ ] Debouncing works correctly — rapid typing does not fire excessive API calls.
