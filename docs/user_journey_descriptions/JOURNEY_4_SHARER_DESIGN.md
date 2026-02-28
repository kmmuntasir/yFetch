# Visual Design: Journey 4 - The Sharer (URL States)

**Goal:** Share a specific search or filter state with a friend.

## 1. State: Highly Filtered View (The Sharer's screen)
- **UI State:** The user is currently looking at Page 2 of 1080p Sci-Fi classics.
- **Active Filter Indicators:** The `<select>` dropdowns in the `FilterBar` correctly paint their current selections. "Sci-Fi" is selected in the Genre dropdown, "1080p" is selected in the Quality dropdown.
- **Pagination State:** The "Page 2" numeric block sits prominently highlighted in `#6AC045` green at the bottom of the layout.
- **Address Bar Elements:** The URL visually contains all contextual parameters: `?genre=sci-fi&quality=1080p&minimum_rating=8&sort_by=year&order_by=asc&page=2`. 

## 2. State: App Reloaded State (The Friend's screen)
- **Initial Load Sequence:** The friend pastes the URL into a blank browser tab.
- **Loading Overlay:** The application immediately parses the router and query string. The homepage instantly defaults to the skeleton loading state (rather than displaying default "Recently Added" items) to avoid visual jarring.
- **Interface Alignment:** 
  - The `FilterBar` initializes directly with the matching values ("Sci-Fi", "1080p", "8+").
  - The `MovieGrid` populates with the specifically parameterized data (Page 2 of the specific dataset).
- **End Result:** From a visual composition perspective, the friend's application view is an identical clone of State 1 (The Sharer's screen), ensuring deep linking works immaculately without intermediate steps.
