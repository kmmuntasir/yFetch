# Visual Design: Journey 1 - The Casual Browser (Homepage Discovery)

**Goal:** Find something new or popular to watch without a specific title in mind.

## 1. State: Lands on Homepage
- **Overall Layout:** A clean, deep dark mode aesthetic with a near-black `#0F0F0F` background. Navigation bar sits at the top (with a max-width centered search bar, and bright `#E8E8E8` text). The "Recently Added" primary view consists of a CSS grid spanning the width of the container.
- **Movie Grid:** `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` on desktop. The cards have an aspect ratio of `2:3` for the posters.
- **Typography:** The main heading "Recently Added" is set in Inter, `2.5rem`, Semi-Bold, in `#E8E8E8`.
- **Spacing:** `16px` gaps between cards, `24px` padding around the main content container.

## 2. State: Quick Hover (Desktop)
- **Visual Changes:** As the user's cursor hovers over a Movie Card, the card scales up slightly (`transform: scale(1.05)`) with a smooth `200ms` CSS transition. The shadow deepens to `Level 2` (`0 8px 24px rgba(0, 0, 0, 0.5)`).
- **Glassmorphism Overlay:** A dark semi-transparent overlay (`rgba(0,0,0,0.85)`) smoothly fades in over the movie poster.
- **Information Revealed:** 
  - A prominent IMDb rating badge combining a solid gold start (`#F5C518`) and bold `#E8E8E8` text (e.g., ⭐ 7.8).
  - Genres listed as small `12px` tags (Text: `#888`).
  - A primary "View Details" button, styled with `#6AC045` background, black text, and an `8px` border-radius positioned at the bottom of the card.

## 3. State: Opens Detail (MovieModal)
- **Backdrop:** A dark overlay with a heavy blur covers the entire screen (`backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.7);`).
- **Modal Container:** Centered, taking up a maximum of `900px` width. The modal itself has a slightly lighter `#242424` background and `12px` rounded corners.
- **Layout (Desktop):** Dual-column. 
  - **Left (30%):** Large high-resolution movie poster.
  - **Right (70%):** Movie title (`40px`, Bold, `#E8E8E8`), Year/Runtime/MPA in muted `#888`, and a full text synopsis.
- **Interactive Elements:** Floating "X" button in the upper right.

## 4. State: Trailer Preview
- **YouTube Embed:** The user clicks "Watch Trailer". If opened directly in the modal, a responsive `iframe` takes over a portion of the right column or expands in place of the poster/details, featuring no borders and playing the YouTube clip directly inside the dark-themed modal window.

## 5. State: Download Interaction
- **Torrent Table:** Structured as a clean list or grid at the bottom of the right column. Each row corresponds to a quality (e.g., *1080p, 4K*).
- **Metadata:** Smaller text (`14px`, `#888`) showing file size, seeds, peers, and codec.
- **Call-to-Action Buttons:** Two explicit buttons per row:
  - **"⬇ .torrent" Button:** Ghost styling (border `#4A4A4A`, transparent background, text `#E8E8E8`). Hover changes background to `#1A1A1A`.
  - **"🧲 Magnet" Button:** Primary accent color `#6AC045`, text `#000`, `8px` border radius. It stands out significantly.
