# yFetch Design Starter Kit

This document outlines the core design system for **yFetch**, providing a modern, premium, and distraction-free experience. The design heavily emphasizes a sleek dark mode aesthetic with vibrant accent colors to make movie artwork pop.

---

## 1. Color Palette

The color system is explicitly designed for a deep dark mode that reduces eye strain while providing high contrast for text and vibrant accents for interactive elements.

### Base Colors
*   **Background (App Body):** `#0F0F0F` - Deepest near-black for the main application background.
*   **Surface 1 (Cards/Panels):** `#1A1A1A` - Slightly elevated surface for movie cards and the filter bar.
*   **Surface 2 (Modals/Dropdowns):** `#242424` - Highest elevation for modals and autocomplete dropdowns.
*   **Surface Hover:** `#2A2A2A` - Used for interactive list items or card hover states.

### Text Colors
*   **Text Primary:** `#E8E8E8` - High-contrast off-white for main headings and titles.
*   **Text Secondary:** `#888888` - Muted gray for metadata (year, runtime, genres) and descriptions.
*   **Text Disabled:** `#4A4A4A` - For unavailable options or disabled buttons.

### Accents & Semantic
*   **Primary Accent:** `#6AC045` - YTS-inspired electric green. Used for primary buttons, active links, and focus rings.
*   **Accent Hover:** `#58A638` - Darker shade for hover states on primary buttons.
*   **IMDb Gold:** `#F5C518` - Reserved strictly for IMDb rating badges.
*   **Error / Destructive:** `#EF4444` - Red for error states (e.g., API failures).

---

## 2. Typography

We use **Inter** as the sole typeface to give a clean, geometric, and highly legible appearance across all screen sizes.

*   **Font Family:** `'Inter', sans-serif`
*   **Weights:** Regular (400), Medium (500), Semi-Bold (600), Bold (700).

### Type Scale (Fluid / Responsive)
*   **H1 (App Title/Modal Title):** 
    *   Desktop: `2.5rem` (40px) / Bold
    *   Mobile: `2rem` (32px) / Bold
*   **H2 (Section Headers):** `1.5rem` (24px) / Semi-Bold
*   **H3 (Card Titles):** `1.125rem` (18px) / Medium
*   **Body (Primary):** `1rem` (16px) / Regular
*   **Body (Secondary/Metadata):** `0.875rem` (14px) / Regular
*   **Caption (Tags/Badges):** `0.75rem` (12px) / Medium

---

## 3. Spacing & Layout System

A predictable 8px/4px grid system ensures visual rhythm.

*   **Spacing Units:** `4px`, `8px`, `16px`, `24px`, `32px`, `48px`, `64px`
*   **Border Radius:**
    *   Small (`4px`): Inputs, badges, dropdown menus.
    *   Medium (`8px`): Buttons, Filter panels.
    *   Large (`12px`): Movie Cards, Modals, Images.
*   **Shadows (Depth):**
    *   Level 1 (Cards): `0 4px 12px rgba(0, 0, 0, 0.3)`
    *   Level 2 (Hover): `0 8px 24px rgba(0, 0, 0, 0.5)`
    *   Level 3 (Modals): `0 24px 48px rgba(0, 0, 0, 0.8)`

---

## 4. UI Components

### 4.1. Buttons
*   **Primary Button:** Background `#6AC045`, Text `#000000`, `border-radius: 8px`, `padding: 12px 24px`, `font-weight: 600`. Transition: `background-color 0.2s ease`.
*   **Secondary/Ghost Button:** Background `transparent`, Border `1px solid #4A4A4A`, Text `#E8E8E8`. Hover: Background `#1A1A1A`.
*   **Pagination Button:** Small square buttons (`36x36px`), Background `#1A1A1A`, Text `#888`. Active state uses Primary Background `#6AC045` with `#000` text.

### 4.2. Inputs & Search
*   **Search Bar:** Large, rounded input (`border-radius: 24px`), Background `#1A1A1A`, matching `#E8E8E8` text. Icon integrated on the left.
*   **Focus State:** `outline: 2px solid #6AC045; outline-offset: 2px;`
*   **Autocomplete Dropdown:** Anchored below search. Background `#242424`, Shadow Level 3, `border-radius: 12px`. Items have a `#2A2A2A` hover state.

### 4.3. Movie Card
A visually rich component relying heavily on the poster art.
*   **Container:** `background: #1A1A1A`, `border-radius: 12px`, `overflow: hidden`, Shadow Level 1.
*   **Image Area:** Aspect ratio `2:3`. Fills top width.
*   **Text Area:** `padding: 12px`. Title truncated to 1 line (`text-overflow: ellipsis`). Year in `#888`.
*   **Hover State Setup (The "Glassmorphism" Overlay):** 
    *   On hover, the card scales up slightly (`transform: scale(1.05)`).
    *   A dark semi-transparent overlay (`rgba(0,0,0,0.85)`) appearing over the image.
    *   Overlay reveals a prominent ⭐️ Rating, Genres, and a "View Details" primary button.

### 4.4. Filter Bar
*   **Container:** Horizontal flexbox. `gap: 16px`, `padding: 16px 0`.
*   **Select Dropdowns:** Custom styled `<select>` elements. Background `#1A1A1A`, Border `1px solid #333`, Text `#E8E8E8`. Chevron icon on the right. 

### 4.5. Movie Detail Modal
*   **Overlay:** `backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.7);`
*   **Modal Container:** Maximum width `900px`. Background `#242424`, `border-radius: 12px`, Shadow Level 3.
*   **Layout:** 
    *   Left column (30%): Large poster, Rating badges.
    *   Right column (70%): Title, metatags (Year, Runtime, MPA), Description, Torrent download table, Trailer iframe.
*   **Close Button:** Floating "X" in top-right corner.

---

## 5. Responsive Views & Breakpoints

### 5.1. Desktop (1024px and up)
*   **Grid:** 5 to 6 Movie cards per row (`grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`).
*   **Navigation:** Logo on left, wide Search Bar in center (max-width `600px`), external links/settings on right.
*   **Filters:** Always visible as a horizontal strip above the grid.
*   **Modal:** Large, dual-column layout as described above.

### 5.2. Tablet (768px - 1023px)
*   **Grid:** 3 to 4 Movie cards per row (`minmax(180px, 1fr)`).
*   **Navigation:** Search bar takes up full width below the header, or remains in header but compressed.
*   **Filters:** Still horizontal, potentially allowing horizontal scrolling if elements overflow (`overflow-x: auto`, `white-space: nowrap`).
*   **Modal:** Switches to a single-column stacked layout. Poster centered at the top, details stacked below it.

### 5.3. Mobile (Below 768px)
*   **Grid:** 2 Movie cards per row (`grid-template-columns: repeat(2, 1fr)`), minimizing padding to maximize card size.
*   **Navigation:** Collapsed to Logo and small Search Icon that expands into a full-width search overlay when clicked.
*   **Filters:** Hidden by default behind a "Filters & Sort" button. Clicking opens a full-screen or bottom-sheet overlay to select options.
*   **Movie Card Hover:** Hover states don't exist on touch devices. The overlay info (rating, button) should either be visible by default at the bottom of the card, or the entire card simply acts as a direct link to the Modal.
*   **Modal:** Full-screen (`100vw`, `100vh`, `border-radius: 0`). Sticky close button at the top. Torrent table converts to stacked cards instead of a multi-column table to prevent horizontal scrolling.
