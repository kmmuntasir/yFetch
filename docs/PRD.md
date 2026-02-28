# Product Requirements Document (PRD): yFetch

## 1. Project Overview

**Project Name:** yFetch
**Description:** A clean, modern, ad-free React Single Page Application (SPA) for browsing and searching a curated movie database. It acts as a read-only client interfacing directly with the `movies-api.accel.li` API, allowing users to discover movies, view details, and access download links (magnet/`.torrent`).
**Target Audience:** The developer (weekend pet project) and potentially public users.
**Deployment:** Public static hosting via Vercel or Netlify.

## 2. Core Objectives

1.  **Ad-Free & Clean UI:** Provide a premium, distraction-free browsing experience. Dark mode by default.
2.  **Performance:** Fast loading times, instant autocomplete, and responsive design for both desktop and mobile.
3.  **Read-Only Scope:** Strictly a search and discovery tool. No user accounts, login, watchlists, or comments.
4.  **Zero-Backend Architecture:** The React app must call the `movies-api.accel.li` API directly from the browser. No proxy server or backend is required or implemented.

## 3. Features & Requirements

### 3.1. Discovery & Browsing (Homepage)
*   **Recently Added:** The default view upon loading the application (`/`) must display a grid of the most recently added movies (`sort_by=date_added`).
*   **Movie Grid:** Display results in a responsive CSS grid of "Movie Cards" (`auto-fill, minmax(180px, 1fr)`).
    *   *Card Elements:* Movie poster (`small_cover_image`), Title, Year, and a hover overlay showing Rating (ex: ⭐ 7.8) and Genres.
*   **Pagination:** Allow users to navigate through pages of results using a bottom pagination control (e.g., `Prev`, `1`, `2`, `...`, `Next`). Max 7 page buttons shown at once. Total pages calculated as `Math.ceil(movie_count / limit)`.

### 3.2. Search
*   **Quick Search (Autocomplete):**
    *   A prominent search bar at the top of the UI.
    *   Typing triggers a debounced (350ms) API call to fetch a maximum of 5 suggestions (`?query_term={term}&limit=5`).
    *   Displays a dropdown with the movie poster thumbnail, title, and year.
    *   Clicking a suggestion immediately opens the Movie Detail Modal with the already fetched data.
    *   Pressing 'ESC' or clicking outside closes the dropdown.
*   **Full Search:**
    *   Pressing 'Enter' in the search bar executes a full search for the query, updating the Movie Grid with paginated results.

### 3.3. Filtering & Sorting
*   **Filter Bar:** A horizontal row of `<select>` dropdowns above the Movie Grid. Hidden behind a toggle on mobile to save space.
*   **Available Filters:**
    *   **Quality:** All, 480p, 720p, 1080p, 1080p.x265, 2160p (4K), 3D.
    *   **Genre:** All, Action, Adventure, Animation, Biography, Comedy, Crime, Documentary, Drama, Family, Fantasy, Film-Noir, History, Horror, Music, Musical, Mystery, Romance, Sci-Fi, Sport, Thriller, War, Western.
    *   **Min Rating:** 0 (All) up to 9+.
*   **Sorting:**
    *   **Sort By:** Latest Added (default), Oldest Added, Newest Year, Oldest Year, Rating, Seeds, Peers, Downloads, Likes, Alphabetical.
    *   *Note:* "Newest Year" (`sort_by=year&order_by=desc`) and "Oldest Year" (`sort_by=year&order_by=asc`) replace a traditional year filter due to API constraints.
*   **Filter Behavior:** Changing any filter instantly updates the results grid and resets pagination to Page 1.
*   **URL Sync:** URL parameters must sync with the active filters (e.g., `?genre=action&page=2`) to allow shareable links.
*   **Reset:** A "Reset Filters" button clears all active filters and returns to the default homepage view.

### 3.4. Movie Detail Modal
*   **Trigger:** Clicking on any Movie Card or an autocomplete suggestion opens a full-screen or centered overlay modal.
*   **Content Panels:**
    *   **Left/Top:** Large poster image (`medium_cover_image`), IMDb Rating (gold star), RT ratings if available (`with_rt_ratings=true`), Runtime, MPA Rating, Language, Genres, and an external IMDb link (`https://www.imdb.com/title/{imdb_code}`).
    *   **Right/Bottom:** Title, Year, Full synopsis (`description_full` or `summary`).
*   **Actions:**
    *   **Watch Trailer:** Opens the YouTube trailer (`yt_trailer_code`) in an embedded iframe.
    *   **Download Options:** A list of available torrents categorized by quality (e.g., 720p, 1080p).
        *   Each row shows metadata: video codec, bit depth, audio channels, size, seeds, peers.
        *   **Download `.torrent` Button:** Initiates a direct file download (`torrents[].url`).
        *   **Magnet Link Button:** Opens the user's default torrent client. The magnet URI must be constructed manually using `torrents[].hash`, the url-encoded movie title, and a predefined list of UDP trackers.
*   **No In-Browser Player:** The application strictly provides download links; it does not stream torrents in the browser.

### 3.5. Error Handling & Edge Cases
*   **No Results:** Display a friendly "No movies found." message with a clear "Reset Filters" action.
*   **API Failure:** If the API is unreachable, display a clear warning/error state (e.g., "Failed to load movies.") and provide a "Retry" button. No backend proxy fallback is implemented.
*   **Loading States:** Use skeleton loaders matching the dimensions of the Movie Cards with a shimmer animation while fetching data.

---

## 4. Technical Architecture

*   **Framework:** React 19.
*   **Build Tool:** Vite 5 (Zero-config dev server, fast HMR). No proxy configuration in `vite.config.js` since CORS is fully open on the API.
*   **Routing:** React Router v6 (`react-router-dom`) for URL query parameter synchronization.
*   **State Management:** Zustand (handle global search/filter states: `query`, `quality`, `genre`, `minRating`, `sortBy`, `orderBy`, `page`).
*   **Styling:** Plain CSS or CSS Modules. No heavy CSS frameworks (like Tailwind).
*   **API Client:** Native `fetch` API.
*   **API Endpoint:** `https://movies-api.accel.li/api/v2/list_movies.json` (Single source of truth for all data).

---

## 5. Design Guidelines

*   **Theme:** Exclusively Dark Mode.
    *   **Background:** `#0f0f0f` (near-black).
    *   **Surface:** `#1a1a1a` for cards, `#242424` for modals.
    *   **Text:** `#e8e8e8` primary, `#888` secondary.
*   **Accent Color:** `#6AC045` (Green) for buttons, active states, and focus rings to maintain a familiar torrent-site aesthetic without explicitly branding as YTS.
*   **Interactions:** Smooth CSS transitions (200ms ease) on hover states, subtle box-shadows (`0 4px 20px rgba(0,0,0,0.5)`).

---

## 6. Out of Scope

*   Backend server, proxy middleware, or database.
*   User authentication, accounts, profiles.
*   Watchlists, favorites, or user comments.
*   In-browser video streaming/playback (WebTorrent).
*   Filtering by exact release year or spoken language (due to API limitations; mitigated via sorting).
*   Use of the "YTS" name or official logo anywhere in the application.
