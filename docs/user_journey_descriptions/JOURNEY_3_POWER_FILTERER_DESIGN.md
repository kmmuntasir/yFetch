# Visual Design: Journey 3 - The Power Filterer

**Goal:** Find highly-rated classic sci-fi movies in 1080p.

## 1. State: Filter Bar Interaction
- **Container Positioning:** Located squarely between the top navigation bar and the "Recently Added" `MovieGrid`. It defines a slightly elevated surface using `#1A1A1A` with a horizontal `flexbox` layout and a `16px` gap.
- **Form Controls:** A series of `<select>` dropdowns for *Quality*, *Genre*, *Min Rating*, and *Sort By*.
  - **Dropdown Styling:** Custom UI appearance (hiding native OS styling where possible). Dark interior `#1A1A1A`, bordered by subtle `#333`, white text `#E8E8E8`. Each dropdown uses a small chevron icon on the right edge.
- **Focus States:** Applying focus via tab or click wraps the filter select element in the primary `#6AC045` focus ring.

## 2. State: Grid Skeleton Loading State
- **Instant Visual Feedback:** Immediately upon altering a filter dropdown (e.g., selecting "Sci-Fi"), the current movie cards disappear.
- **Skeleton Shapes:** They are replaced by generic grey rectangles matching the exact `2:3` aspect ratio of the movie cards.
- **Shimmer Animation:** A slow, continuous gradient sweeping diagonally across the skeleton cards (`linear-gradient` moving from `#1A1A1A` to slightly lighter grey and back), signaling a loading state without popping up blocking spinners.

## 3. State: Filtered Results Grid Updated
- **Transition In:** Once the API yields the filtered list (e.g., classic Sci-Fi movies in 1080p), the skeleton cards fade out (`200ms`) and the new Movie Cards pop into the grid layout seamlessly.
- **Visual Consistency:** The UI preserves the `#0F0F0F` background while presenting the new content. The URL string visibly updates in the browser's address bar to reflect the constraints (e.g., `?genre=sci-fi&quality=1080p&minimum_rating=8&sort_by=year&order_by=asc`).

## 4. State: Pagination
- **Control Strip:** Anchored below the last row of the `MovieGrid`. It's horizontally centered.
- **Buttons Structure:** Small square buttons (`36x36px` with a `4px` border radius). 
- **Inactive/Default State:** Background `#1A1A1A`, Text `#888`.
- **Active Form:** The button corresponding to the current page (e.g., "Page 1") is highlighted prominently with a `#6AC045` background and `#000000` solid black, bold typographic emphasis indicating active context. 
- **Navigation Controls:** A wider "Next →" ghost button (`border: 1px solid #4A4A4A`) resides at the rightmost flank.
