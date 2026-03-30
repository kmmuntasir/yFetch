# yFetch `index.html` — UI Redesign Plan

> **Goal:** Transform the current POC page from a flat, developer-tool appearance into a premium, cinematic movie browsing experience — all within the single `index.html` file.

---

## Current State Analysis

````carousel
![Current POC — dull, flat layout with no visual hierarchy](/home/munna/sonic/localhost/yFetch/docs/ai_generated/yfetch_initial_state_1774866655856.png)
<!-- slide -->
![Figma Homepage — cinematic hero + poster grid](/home/munna/sonic/localhost/yFetch/docs/ai_generated/figma_homepage.png)
<!-- slide -->
![Figma Browse — card grid with filter sidebar](/home/munna/sonic/localhost/yFetch/docs/ai_generated/figma_browse.png)
<!-- slide -->
![Figma Modal — immersive movie detail overlay](/home/munna/sonic/localhost/yFetch/docs/ai_generated/figma_modal.png)
````

### Problems with the current page

| Problem | Details |
|---|---|
| **No visual hierarchy** | Everything is left-aligned plain text. No hero, no sections, no depth. |
| **Wrong font** | Uses browser-default `sans-serif` instead of `Inter`. |
| **Flat movie cards** | Horizontal list cards with small 120px posters. No shadows, no hover effects. |
| **Exposed POC controls** | Section labels like "1 · Quick Search" and "2 · Detailed Search" feel like a test harness. |
| **No poster grid** | Movies shown in a single-column list, wasting 70% of horizontal space on desktop. |
| **No modal** | Movie details are inline with no immersive presentation. |
| **No loading states** | Only a text `⏳ Fetching…` status line. |
| **No footer** | Page just ends. |
| **Missing design tokens** | Background is `#111` instead of `#0F0F0F`. Inconsistent color usage throughout. |

---

## Proposed Changes

### 1. Global Foundation — Typography, Colors & Reset

Apply design tokens from [DESIGN_STARTER_KIT.md](file:///home/munna/sonic/localhost/yFetch/docs/DESIGN_STARTER_KIT.md) as CSS custom properties.

```css
:root {
  /* Backgrounds */
  --bg-body: #0F0F0F;
  --bg-surface-1: #1A1A1A;
  --bg-surface-2: #242424;
  --bg-surface-hover: #2A2A2A;

  /* Text */
  --text-primary: #E8E8E8;
  --text-secondary: #888888;
  --text-disabled: #4A4A4A;

  /* Accents */
  --accent-primary: #6AC045;
  --accent-hover: #58A638;
  --imdb-gold: #F5C518;
  --error: #EF4444;

  /* Shadows */
  --shadow-1: 0 4px 12px rgba(0,0,0,0.3);
  --shadow-2: 0 8px 24px rgba(0,0,0,0.5);
  --shadow-3: 0 24px 48px rgba(0,0,0,0.8);

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 24px;
}
```

- Import **Google Fonts Inter** (weights 400, 500, 600, 700).
- Set `body` to `background: var(--bg-body); font-family: 'Inter', sans-serif; color: var(--text-primary);`.
- Replace all hardcoded hex values with CSS variables.

---

### 2. Premium Navbar

Replace the current raw `<h1>` title with a proper horizontal navbar.

**Layout:** Logo (left) · Pill search bar (center) · Filter toggle button (right).

```
┌──────────────────────────────────────────────────┐
│  ▶ yFetch    [ 🔍 Search for movies... ]    ⚙ Filters │
└──────────────────────────────────────────────────┘
```

**Specifics:**
- **Logo:** `▶ yFetch` in green accent, `font-weight: 700`, `font-size: 1.25rem`.
- **Search bar:** `border-radius: var(--radius-pill)`, `background: var(--bg-surface-1)`, `padding: 10px 20px`, `max-width: 500px`, centered with flex. Search icon (🔍) inside using `::before` or inline SVG.
- **Filter toggle:** Ghost button with a filter icon. When clicked, opens filter sidebar (see §5).
- **Autocomplete dropdown:** Now renders below the pill bar with `border-radius: var(--radius-lg)`, `background: var(--bg-surface-2)`, and `box-shadow: var(--shadow-3)`.
- Navbar stays fixed to top with `position: sticky; top: 0; z-index: 50;` and a subtle bottom border `1px solid var(--bg-surface-1)`.

---

### 3. Movie Poster Grid (replaces flat list)

> [!IMPORTANT]
> This is the single highest-impact change. The current vertical card list must be completely replaced with a responsive poster grid.

**Grid layout:**
```css
#results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 24px;
  padding: 0 32px;
}
```

**Each movie card:**
- **Poster-first design:** Tall card (`aspect-ratio: 2/3`) with only the poster image filling the card.
- **Text overlay below poster:** Title (1 line, truncated with ellipsis), Year, and a small quality badge (e.g., `4K`).
- **Hover effect (desktop):**
  - Card scales up slightly: `transform: scale(1.03)`.
  - Shadow deepens to `var(--shadow-2)`.
  - A dark semi-transparent overlay fades in over the poster.
  - Overlay reveals: ⭐ Rating, Genre tags, and "View Details" text.
  - Smooth transition: `transition: transform 0.3s ease, box-shadow 0.3s ease;`.
- **Click behavior:** Instead of rendering movie details inline, clicking a card opens the **Movie Detail Modal** (see §4).

**Card CSS highlights:**
```css
.movie-card {
  background: var(--bg-surface-1);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.03);
  box-shadow: var(--shadow-2);
}
```

---

### 4. Movie Detail Modal (new)

> [!IMPORTANT]
> Currently there is no modal. Movie details/torrents are shown inline. This introduces a proper full-screen overlay modal inspired by the Figma design.

**Trigger:** Clicking any movie card or autocomplete suggestion.

**Visual structure:**
```
┌──────────────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────────────┐ │
│ │                                             [X]  │ │
│ │     ┌─────────┐                                  │ │
│ │     │         │   Inception                      │ │
│ │     │ POSTER  │   2010 · 2h 28m · ⭐ 8.8 IMDb   │ │
│ │     │         │   [4K] [PG-13] [Sci-Fi] [Action] │ │
│ │     │         │                                  │ │
│ │     └─────────┘   A thief who steals corporate   │ │
│ │                   secrets through the use of...  │ │
│ │                                                  │ │
│ │     [▶ Watch Trailer]  [⬇ Download]              │ │
│ │                                                  │ │
│ │  ── Available Torrents ────────────────────────  │ │
│ │  720p  | x264 · 8bit · 2.0 · 950MB | 🌱120 👥30 │ │
│ │  1080p | x265 · 10bit · 5.1 · 2.1GB| 🌱350 👥80 │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

**Specifics:**
- **Overlay backdrop:** `background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);`.
- **Modal container:** `max-width: 900px`, centered, `background: var(--bg-surface-2)`, `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-3)`.
- **Background image:** The movie's `background_image` or poster stretched behind the top half of the modal with a heavy gradient overlay, for a cinematic feel matching the Figma modal.
- **Two-column layout:** Left 30% = poster, Right 70% = metadata + synopsis + actions + torrent table.
- **Close button:** Floating `X` in top-right corner. Also closes on clicking the backdrop or pressing `Escape`.
- **Torrent table:** Retains the existing torrent row structure but styled to fit within the modal. Each row gets `background: var(--bg-body)`, `border-radius: var(--radius-sm)`.
- **Entry animation:** Modal fades + slides in from bottom:
  ```css
  @keyframes modalIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  ```

---

### 5. Horizontal Filter Bar (restyled)

Keep the existing horizontal filter bar layout but restyle it to match the design system.

**Changes:**
- Wrap all filters in a `background: var(--bg-surface-1)` container with `border-radius: var(--radius-md)` and `padding: 16px 24px`.
- Custom-style all `<select>` dropdowns: `background: var(--bg-surface-2)`, `border: 1px solid #333`, `color: var(--text-primary)`, `border-radius: var(--radius-sm)`, `padding: 8px 12px`.
- Labels use `color: var(--text-secondary)`, `font-size: 0.75rem`, `text-transform: uppercase`, `letter-spacing: 0.5px`.
- Search button uses primary button styling: `background: var(--accent-primary)`, `color: #000`, `font-weight: 600`, `border-radius: var(--radius-md)`.
- Add a "Reset" ghost button next to Search.
- `gap: 16px` between fields, `flex-wrap: wrap` for responsiveness.
- Remove the ugly section headers ("1 · Quick Search", "2 · Detailed Search").

---

### 6. Skeleton Loading States

Replace the text-only `⏳ Fetching…` with animated skeleton cards.

**Implementation:**
- When fetching, render 10 placeholder cards in the grid.
- Each skeleton card matches the dimensions of a movie card.
- CSS shimmer animation:

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1A1A1A 25%, #2A2A2A 50%, #1A1A1A 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-lg);
  aspect-ratio: 2/3;
}
```

---

### 7. Pagination Upgrade

Restyle the pagination to match the design system.

- Buttons become square `36×36px` with `border-radius: var(--radius-md)`.
- Active page uses `background: var(--accent-primary); color: #000; font-weight: 600`.
- Disabled buttons use `opacity: 0.3`.
- Center the entire pagination bar: `justify-content: center`.
- Add result count text above in `var(--text-secondary)`.

---

### 8. Footer

Add a minimal footer bar at the page bottom.

```html
<footer>
  <span>© 2024 yFetch. All rights reserved.</span>
  <span>Powered by YTS API</span>
</footer>
```

- `background: var(--bg-surface-1)`, `border-top: 1px solid #2A2A2A`.
- Flex row, content centered, `padding: 24px 32px`.
- Text in `var(--text-secondary)`, `font-size: 0.875rem`.

---

### 9. Micro-interactions & Polish

| Element | Animation |
|---|---|
| **All buttons** | `transition: all 0.2s ease` on hover (background, transform) |
| **Movie cards** | `transition: transform 0.3s, box-shadow 0.3s` — scale on hover |
| **Hover overlay** | `opacity: 0 → 1` with `transition: opacity 0.3s ease` |
| **Modal** | Fade-in + slide-up keyframe animation |
| **Filter sidebar** | `translateX` slide from right, `0.3s ease` |
| **Autocomplete dropdown** | `opacity + translateY` fade-drop animation |
| **Focus rings** | `outline: 2px solid var(--accent-primary); outline-offset: 2px;` |
| **Skeleton loaders** | Shimmer gradient sweep animation, `1.5s infinite` |

---

## Implementation Order

> [!TIP]
> Since this is a single `index.html` file, all changes go into one file. The recommended order minimizes rework.

| Phase | Task | Impact |
|---|---|---|
| **1** | CSS custom properties + Inter font + body reset | Foundation for everything |
| **2** | Navbar (logo, pill search) + horizontal filter bar restyle | First visual wow |
| **3** | Auto-load "Recently Added" on page load | Content on first visit |
| **4** | Movie poster grid layout + card redesign | Biggest transformation |
| **5** | Card hover overlay (rating, genres) | Premium feel |
| **6** | Movie detail modal (overlay, two-column, torrents, close logic) | Feature parity for detail view |
| **7** | Skeleton loading states | Professional loading UX |
| **8** | Pagination restyle | Consistent design language |
| **9** | Footer | Completeness |
| **10** | Micro-animations & final polish pass | Cohesion |

---

## Scope & Constraints

- All changes are contained within the **single `index.html` file** (inline `<style>` + `<script>`).
- The API endpoint and all JS fetch logic remain **functionally identical** — only presentation changes.
- No external JS libraries or frameworks are added.
- The page remains a **static HTML file** openable via `file://` or any static host.
- All existing features (autocomplete, search, pagination, magnet links, torrent downloads) are **preserved**.

---

## Decisions (Confirmed)

- ✅ **No hero section** — page focused on search + grid results
- ✅ **Auto-load "Recently Added"** on page load as default view
- ✅ **Horizontal filter bar** (restyled) — no sidebar needed
