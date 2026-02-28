# Visual Design: Journey 6 - The Dead-End Explorer (Zero Results)

**Goal:** Look for an obscure movie that isn't on YTS.

## 1. State: Search Input Submission
- **Action:** The user types an obscure title into the main Search Bar in the top navigation and firmly hits `Enter` instead of clicking an autocomplete suggestion.
- **Loading Phase:** The application flips back to the Grid view and immediately flashes the skeleton loading cards as it fires the underlying query down to the API.
- **URL Commitment:** The browser URL confirms the search execution (e.g., `?query_term=Super+Obscure+Indie+Film+1994`).

## 2. State: Zero Results Empty State layout
- **Grid Removal:** Upon receiving `movie_count: 0` back from the `movies-api.accel.li`, all skeleton cards vanish. The CSS grid structure is hidden or removed.
- **Centered Hero Block:** The entire viewport area focuses on a vertically and horizontally centered flex container.
- **Visuals:** 
  - A stylized, muted SVG illustration or icon (e.g., an empty film reel or a broken magnifying glass) rendered in `#4A4A4A`.
  - **Main Heading:** "No movies found" rendered in Inter, `24px`, `#E8E8E8`.
  - **Subtext:** "We couldn't find any results matching your search terms. Try adjusting your filters or checking for typos." rendered in `14px`, `#888`.

## 3. State: Recovery & Reset
- **Action Elements:** Situated immediately below the subtext is a clear Call-To-Action (CTA). 
- **Button Styling:** A primary/secondary hybrid button, perhaps a ghost button (`border: 1px solid #4A4A4A`, background `#1A1A1A`) labeled **"Clear Search & Filters"**.
- **Execution:** Clicking this button forces a global state wipe. The URL query params are stripped down to the root `/`. The search bar empties. 
- **Return to Normalcy:** The skeleton loader instantly kicks in again, pulling down the latest `sort_by=date_added` homepage sequence.
