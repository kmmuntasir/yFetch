# Task 04: Movie Detail Modal

## Overview
Build the full Movie Detail Modal that appears when a user clicks a Movie Card or selects an autocomplete suggestion. This is the primary conversion surface for the app — where users see full movie info, watch trailers, and access download links.

**Depends on:** Task 01 (scaffolding, API client, magnet link builder), Task 03 (MovieCard click handler).

---

## Requirements

### Modal Overlay & Container
- **Overlay:** `backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.7);`. Covers entire viewport. `z-index: 1000`.
- **Modal container:** Centered, `max-width: 900px`, `background: #242424`, `border-radius: 12px`, shadow Level 3.
- **Scrollable:** Modal content scrolls vertically if it exceeds viewport height (`max-height: 90vh; overflow-y: auto`).
- **Close:** Floating "X" button in top-right corner. Also close on `Escape` key and on overlay click (outside modal).
- **Animation:** Scale-in from `0.95` to `1.0` + fade-in on open, reverse on close. Duration `200ms ease`.
- **Body scroll lock:** When modal is open, prevent background page from scrolling (`overflow: hidden` on `body`).

### Desktop Layout (≥768px) — Dual Column
- **Left column (30%):**
  - Large poster (`medium_cover_image`), `border-radius: 8px`.
  - Below poster: Rating badges.
    - IMDb rating: gold star `#F5C518` + bold number.
    - Rotten Tomatoes ratings (if `with_rt_ratings=true` data exists).
  - External IMDb link: `https://www.imdb.com/title/{imdb_code}`, opens in new tab.
- **Right column (70%):**
  - Movie title: `40px` (Bold, `#E8E8E8`). On mobile: `32px`.
  - Metadata row: Year, Runtime (formatted as `Xh Ym`), MPA Rating, Language — all in `#888`.
  - Genre tags: horizontal wrap of badge chips.
  - Full synopsis: `description_full` or `summary` or `synopsis`. Color `#888`, `line-height: 1.6`.
  - **Trailer button:** "▶ Watch Trailer" — opens embedded YouTube iframe.
  - **Torrent downloads table.**

### Mobile Layout (<768px) — Full Screen Stacked
- Modal takes up `100vw × 100vh`, `border-radius: 0`.
- Single-column stacked layout:
  1. Poster centered at top.
  2. Title, metadata, genres.
  3. Synopsis.
  4. Trailer.
  5. Torrent downloads.
- Sticky close "X" button: top-right, `z-index: 9999`, dark translucent circle background.

### Trailer Embed
- Clicking "Watch Trailer" inserts a responsive YouTube `<iframe>` into the modal.
- `src="https://www.youtube.com/embed/{yt_trailer_code}"`.
- 16:9 aspect ratio container.
- If `yt_trailer_code` is null/empty, hide the trailer button entirely.

### Torrent Downloads Section
- **Section label:** "Available Torrents" — `12px`, uppercase, `#888`, letter-spacing `1px`.
- Each torrent row:
  - **Quality badge:** e.g. "1080p" in `#6AC045`, bold.
  - **Type:** e.g. "bluray" or "web" in `#666`.
  - **Metadata:** video_codec, bit_depth, audio_channels, size — in `12px` `#888`.
  - **Seeds:** green `#5a9`, prefixed with 🌱.
  - **Peers:** grey `#99a`, prefixed with 👥.
  - **Download .torrent button:** Ghost style (`border: 1px solid #4A4A4A`, transparent bg, `#E8E8E8` text). Hover: bg `#1A1A1A`. Links to `torrents[].url`.
  - **Magnet button:** Primary accent (`#6AC045` bg, `#000` text, `8px` radius). Hover: `#58A638`. Constructs magnet link using `buildMagnetLink(hash, title)`.
- **Mobile torrent layout:** Each quality is a stacked card (not a table row). .torrent and Magnet buttons are full-width, stacked vertically.

---

## TODO

### 4.1 — Modal State Management
- [ ] Add to Zustand store: `selectedMovie` (movie object | null), `isModalOpen` boolean.
- [ ] Actions: `openModal(movie)`, `closeModal()`.

### 4.2 — MovieModal Component
- [ ] Create `src/components/MovieModal/MovieModal.tsx` and `MovieModal.css`.
- [ ] Portal-mounted via `ReactDOM.createPortal(...)` to `document.body`.
- [ ] Read `selectedMovie` and `isModalOpen` from store.
- [ ] Render overlay + modal container.
- [ ] Close on: X button click, Escape keypress, overlay click.
- [ ] Body scroll lock (`useEffect` toggling `document.body.style.overflow`).
- [ ] Scale + fade animation via CSS class toggle.

### 4.3 — Modal Content — Info Panel
- [ ] Poster image (`medium_cover_image`) with fallback.
- [ ] Rating badges (IMDb, RT if available).
- [ ] IMDb external link.
- [ ] Title, Year, Runtime (formatted), MPA Rating, Language.
- [ ] Genres as badge chips.
- [ ] Full synopsis text.

### 4.4 — Trailer Embed
- [ ] Conditional "Watch Trailer" button (only if `yt_trailer_code` exists).
- [ ] Clicking toggles a responsive iframe.
- [ ] 16:9 aspect ratio wrapper (`padding-bottom: 56.25%`).
- [ ] The iframe auto-plays or displays a YouTube embed.

### 4.5 — Torrent Table
- [ ] Map through `movie.torrents[]`.
- [ ] Render each torrent with quality, type, metadata, seeds, peers.
- [ ] `.torrent` download button: `<a href={url} download>`.
- [ ] Magnet button: `<a href={magnetUri}>` using `buildMagnetLink()`.
- [ ] Desktop: horizontal row layout.
- [ ] Mobile: stacked card layout with full-width buttons.

### 4.6 — Handle Edge Cases
- [ ] Movie with no torrents → show "No torrents available for this movie." message.
- [ ] Movie with no synopsis → show "No synopsis available." fallback.
- [ ] Movie with no trailer code → hide trailer button entirely.
- [ ] Handle missing `medium_cover_image` → fallback to `small_cover_image` or a placeholder.

---

## Acceptance Criteria

- [ ] Clicking a Movie Card opens the modal with correct movie data.
- [ ] Modal has backdrop blur and dark overlay.
- [ ] Desktop: dual-column layout (poster left, details right).
- [ ] Mobile: full-screen, single-column stacked layout.
- [ ] Close button, Escape key, and overlay click all dismiss the modal.
- [ ] Background does not scroll when modal is open.
- [ ] IMDb link opens correctly in a new tab.
- [ ] "Watch Trailer" embeds a YouTube iframe that plays the correct video.
- [ ] Trailer button is hidden when movie has no trailer code.
- [ ] Torrent rows display all metadata (quality, type, codec, size, seeds, peers).
- [ ] `.torrent` button initiates a file download.
- [ ] Magnet button constructs a valid `magnet:?` URI and opens the user's torrent client.
- [ ] Mobile: torrent buttons are full-width and vertically stacked.
- [ ] Modal animates in/out smoothly (scale + fade).
