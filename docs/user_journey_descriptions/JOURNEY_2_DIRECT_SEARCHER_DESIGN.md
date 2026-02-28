# Visual Design: Journey 2 - The Direct Searcher

**Goal:** Find and download a specific movie they already know.

## 1. State: Search Bar Input
- **Header Structure:** The navigation bar is minimal. The search input is prominent, max width `600px`, centered in the header.
- **Input Styling:** Rounded pill shape with `24px` border-radius. Background is `#1A1A1A` providing subtle contrast against the `#0F0F0F` app body background. Text typed by the user is high-contrast `#E8E8E8`.
- **Focus State:** Once focused, the input gains a sharp, electric green focus ring (`outline: 2px solid #6AC045; outline-offset: 2px`).

## 2. State: Autocomplete Dropdown
- **Dropdown Container:** Emerges anchored immediately below the search bar after a 350ms typing delay. Background is `#242424` with a deep `Level 3` shadow (`0 24px 48px rgba(0, 0, 0, 0.8)`) to float visually above the app body. Rounded corners follow `12px`.
- **Suggestions List:** Maximum of 5 items listed vertically. `0px` gap between list items to maintain cohesiveness.
- **List Item Details:** 
  - **Thumbnail:** A small, vertically-oriented movie poster (`small_cover_image`) aligned to the left.
  - **Text:** Movie Title (Inter, `16px`, `#E8E8E8`), followed by the Release Year (`14px`, `#888`).
- **Hover/Selection State:** As the user moves the mouse over an item, its background color changes instantly to `#2A2A2A` providing clear interactive feedback.

## 3. State: Instant Selection (MovieModal)
- **Transition:** Upon clicking a dropdown item, the autocomplete menu vanishes immediately. The screen dims instantly over the grid view (`backdrop-filter: blur(8px)`).
- **Loaded Setup:** Because the API already fetched the core data, the `MovieModal` instantly scales into view (no loaders). The modal sits precisely in the middle of the screen (`#242424` surface). 
- **Content Focus:** The user's eye is drawn to the high-res poster on the left and the large titles and available download buttons on the right.

## 4. State: Download Link Interaction
- **Quality Segregation:** Multiple download options (e.g., *720p, 1080p, 2160p (4K)*) are listed sequentially.
- **Hover Action:** Hovering over the **"🧲 Magnet"** button (`#6AC045`) changes its background to a deeper green (`#58A638`). 
- **Feedback:** Upon clicking, the native OS application picker appears because of the constructed `magnet:?xt=...` URI. The application state remains unchanged (no page reloads, no new tabs, maintaining total context).
