# Visual Design: Journey 5 - The Couch Scroller (Mobile Experience)

**Goal:** Browse for a movie on a phone while on the couch.

## 1. State: Mobile Homepage Layout
- **Viewport Adjustments:** The layout is tight and focused. The main heading font shrinks to `32px` (`2rem`). The grid compresses down to two columns: `grid-template-columns: repeat(2, 1fr)`.
- **Navigation Compression:** The top header abandons the wide search bar. Instead, it features just the application logo on the left and a generic, tappable "Magnifying Glass" icon on the far right.
- **Filter Avoidance:** To save vertical screen real estate, the horizontal filter bar is hidden entirely. In its place sits a single, full-width ghost button (`border: 1px solid #4A4A4A`) labeled "Filters & Sort". 

## 2. State: Mobile Search Overlay
- **Trigger:** Tapping the magnifying glass in the top nav.
- **Interface Takeover:** A solid `#0F0F0F` overlay consumes the entire viewport below the header. The header transforms directly into a large text input taking `100%` width.
- **Keyboard Deployment:** The native iOS/Android dark keyboard deploys. As the user types, autocomplete results fill the full height of the device screen as a stacked, touch-friendly list (no small dropdowns). Each list item is large, ensuring a large tap target area.

## 3. State: Mobile Movie Detail Modal
- **Full Screen Shift:** When a user taps a movie card, there is no floating centered modal. Instead, the detail view slides continuously up from the bottom of the screen to take up `100vw, 100vh`. 
- **Layout Shift (Stacked):** The dual-column layout is abandoned.
  - The movie poster takes up the top header block, centered. (Often filling the width).
  - Below it, all text details are linear and stacked downwards: Title, Metatags, Synopsis.
- **Close Functionality:** A sticky "X" lives permanently mapped to the absolute top-right constraint of the screen (`Z-Index: 9999`) with a dark translucent background circle, ensuring the user can swipe or tap out anytime to return to the `MovieGrid`.

## 4. State: Mobile Torrent Downloads
- **Adjusted Touch Targets:** The rigid desktop table layout for Torrents changes. Each download quality (e.g., *1080p*) transforms into an isolated, stacked card or block.
- **Vertical Button Stacking:** The "⬇ .torrent" and "🧲 Magnet" buttons no longer sit side by side horizontally. They are stacked vertically, making them full-width `100%` of their container, minimizing the risk of "fat-finger" mis-taps on small devices.
