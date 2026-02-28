# YTS React App — User Journeys

This document outlines the primary ways a user will interact with the application, covering discovery, search, filtering, downloading, and sharing.

---

### 🎬 Journey 1: The Casual Browser (Homepage Discovery)
**Goal:** Find something new or popular to watch without a specific title in mind.
1. **Lands on Homepage:** User opens the site and sees the "Recently Added" movies grid (fetched via `sort_by=date_added`).
2. **Scans Posters:** User scrolls down on their desktop or mobile device.
3. **Quick Hover (Desktop):** User hovers over an interesting poster to reveal its rating (e.g., ⭐ 7.8) and genres (Action, Sci-Fi) without clicking.
4. **Opens Detail:** Intrigued, the user clicks the card, opening the `MovieModal`.
5. **Trailer Preview:** The user clicks the "Watch Trailer" button to watch the embedded YouTube trailer to decide if they want to watch it.
6. **Decides to Watch:** User reads the synopsis and decides to download.
7. **Download Interaction:** Under the `1080p` quality row, the user can choose either:
   - **"🧲 Magnet"** button: Opens their native torrent client (like qBittorrent or Transmission) immediately.
   - **"⬇ .torrent"** button: Downloads the physical `.torrent` file to their computer for manual load.

### 🔍 Journey 2: The Direct Searcher
**Goal:** Find and download a specific movie they already know.
1. **Starts Typing:** User focuses the top `SearchBar` and begins typing "The Matrix".
2. **Autocomplete Triggers:** After 350ms of typing "The Matri", the autocomplete dropdown appears instantly with the top 5 matches.
3. **Instant Selection:** User sees the poster for the 1999 original "The Matrix" in the dropdown and clicks it directly.
4. **Detail View:** The `MovieModal` opens instantly (since the autocomplete API already provided the full movie data, no extra loading is needed).
5. **Download:** User decides they want the highest quality. For the `4K (2160p)` row, they have both options:
   - Click **"⬇ .torrent"** to save the file.
   - Click **"🧲 Magnet"** to let their browser hand off the magnet link to their torrent client.

### 🧭 Journey 3: The Power Filterer
**Goal:** Find highly-rated classic sci-fi movies in 1080p.
1. **Navigates to Browse:** User looks at the `FilterBar` at the top of the grid.
2. **Sets Filters:** The user selects:
   - **Genre:** "Sci-Fi"
   - **Quality:** "1080p"
   - **Min Rating:** "8+"
   - **Sort By:** "Oldest Year" (to find classics)
3. **Result Grid Updates:** The `MovieGrid` updates its skeleton loaders and displays the results (e.g., *2001: A Space Odyssey*, *Alien*).
4. **Pagination:** The user scrolls to the bottom and clicks "Next →" to load Page 2 of these specific results.

### 🔗 Journey 4: The Sharer (URL States)
**Goal:** Share a specific search or filter state with a friend.
1. **Creates a List:** Following Journey 3, the user has filtered down to highly-rated 1080p sci-fi classics on Page 2.
2. **Copies Link:** The user notices the URL has updated to `?genre=sci-fi&quality=1080p&minimum_rating=8&sort_by=year&order_by=asc&page=2`. User copies this link.
3. **Sends to Friend:** User pastes the link in Discord/WhatsApp to a friend.
4. **Friend Opens Link:** The friend clicks the link. The React app reads the URL parameters, instantly sets the global state, and fetches the exact same list of movies. The friend sees the identical Page 2 of 1080p Sci-Fi classics.

### 📱 Journey 5: The Couch Scroller (Mobile Experience)
**Goal:** Browse for a movie on a phone while on the couch.
1. **Mobile Layout:** User opens the site on their phone. The grid is neatly stacked (1 or 2 columns), and the filters are hidden behind a collapsible "Filters" button to save screen real estate.
2. **Search:** User taps the search icon. A full-screen or prominent search overlay appears.
3. **Detail View:** User taps a movie poster. The `MovieModal` slides up, taking 100% of the screen.
4. **Trailer:** User taps "Watch Trailer" and it plays inline perfectly sized for their phone.
5. **Close:** User taps the "X" (or uses native browser swipe-back) to return exactly to where they were scrolled in the `MovieGrid`.

### 🏜️ Journey 6: The Dead-End Explorer (Zero Results)
**Goal:** Look for an obscure movie that isn't on YTS.
1. **Search:** User types "Super Obscure Indie Film 1994" and hits Enter to run a full search.
2. **Empty State:** The API returns `movie_count: 0`. The app beautifully handles this by showing an empty state illustration/icon with the text "No movies found."
3. **Recovery:** The app presents a "Clear Search" or "Reset Filters" button.
4. **Resets:** User clicks the reset button, the state clears, and the user is dropped back into the "Recently Added" homepage to discover something else.
