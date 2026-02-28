# movies-api.accel.li API Documentation

## Overview
This document provides complete and comprehensive API documentation for the `movies-api.accel.li` endpoints used in the YTS Search Engine project. The project acts as a read-only client interfacing directly with this API from the browser, requiring no backend or proxy server thanks to fully open CORS policies.

**Base URL:** `https://movies-api.accel.li/api/v2/`

> **Note:** This API replaces the deprecated `https://yts.bz/api/v2/` endpoints.

---

## Single Endpoint Architecture
The entire application is powered by a single endpoint that serves multiple purposes (autocomplete, full search, browsing, and movie details) based on the query parameters provided.

### List Movies Endpoint
```http
GET /list_movies.json
```
*(Also available as `/list_movies.jsonp` and `/list_movies.xml` but JSON is recommended and used in this project)*

#### Parameters

| Parameter | Type | Default | Allowed Values | Description |
| :--- | :--- | :--- | :--- | :--- |
| `query_term` | String | `0` (none) | Any text, IMDb ID, actor, director name | Full-text search across movie title, IMDb code, actor name, or director name. |
| `limit` | Integer | `20` | `1` - `50` | The limit of results per page that has been set. |
| `page` | Integer | `1` | Any positive integer | Used to see the next page of movies. |
| `quality` | String | `All` | `All`, `720p`, `1080p`, `1080p.x265`, `2160p`, `3D`, `480p` | Used to filter by a given quality. |
| `minimum_rating` | Integer| `0` | `0` - `9` | Used to filter movie by a given minimum IMDb rating. |
| `genre` | String | `All` | `All`, `action`, `adventure`, `animation`, `biography`, `comedy`, `crime`, `documentary`, `drama`, `family`, `fantasy`, `film-noir`, `history`, `horror`, `music`, `musical`, `mystery`, `romance`, `sci-fi`, `sport`, `thriller`, `war`, `western` | Used to filter by a given genre. |
| `sort_by` | String | `date_added`| `title`, `year`, `rating`, `peers`, `seeds`, `download_count`, `like_count`, `date_added` | Sorts the results by chosen value. |
| `order_by` | String | `desc` | `desc`, `asc` | Orders the results by either Ascending or Descending order. |
| `with_rt_ratings`| Boolean| `false` | `true`, `false` | Returns the list with the Rotten Tomatoes rating included. |

> **Crucial Missing Filters Warning:** 
> - **Year Filter:** There is no explicit `year` filter parameter. Year-based browsing is implemented via `sort_by=year` and `order_by=desc/asc` (Newest Year / Oldest Year).
> - **Language Filter:** There is no `language` parameter. It is omitted from the UI to maintain result accuracy.

#### Response Structure

```json
{
  "status": "ok",
  "status_message": "Query was successful.",
  "data": {
    "movie_count": 47,
    "limit": 20,
    "page_number": 1,
    "movies": [
      {
        "id": 1606,
        "url": "https://yts.bz/movies/inception-2010",
        "imdb_code": "tt1375666",
        "title": "Inception",
        "title_english": "Inception",
        "title_long": "Inception (2010)",
        "slug": "inception-2010",
        "year": 2010,
        "rating": 8.8,
        "runtime": 148,
        "genres": ["Action", "Adventure", "Sci-Fi", "Thriller"],
        "summary": "...",
        "description_full": "...",
        "synopsis": "...",
        "yt_trailer_code": "cdx31ak4KbQ",
        "language": "en",
        "mpa_rating": "PG-13",
        "background_image": "https://yts.bz/assets/images/movies/Inception_2010/background.jpg",
        "background_image_original": "https://yts.bz/assets/images/movies/Inception_2010/background.jpg",
        "small_cover_image": "https://yts.bz/assets/images/movies/Inception_2010/small-cover.jpg",
        "medium_cover_image": "https://yts.bz/assets/images/movies/Inception_2010/medium-cover.jpg",
        "large_cover_image": "https://yts.bz/assets/images/movies/Inception_2010/large-cover.jpg",
        "torrents": [
          {
            "url": "https://yts.bz/torrent/download/<HASH>",
            "hash": "CE9156EB497762F8B7577B71C0647A4B0C3423E1",
            "quality": "1080p",
            "type": "bluray",
            "is_repack": "0",
            "video_codec": "x264",
            "bit_depth": "8",
            "audio_channels": "2.0",
            "seeds": 100,
            "peers": 78,
            "size": "1.85 GB",
            "size_bytes": 1986422374,
            "date_uploaded": "2015-11-01 00:14:39",
            "date_uploaded_unix": 1446333279
          }
        ],
        "date_uploaded": "2015-11-01 00:14:37",
        "date_uploaded_unix": 1446333277
      }
    ]
  },
  "@meta": {
    "migration": {
      "message": "API base is moving; update your client.",
      "old_base": "https://yts.bz/api/v2/",
      "new_base": "https://movies-api.accel.li/api/v2/",
      "sunset": "2026-03-10T00:00:00Z"
    },
    "api_version": 2,
    "execution_time": "0 ms"
  }
}
```

---

## Application Usage Patterns

### 1. Homepage (Recently Added)
Loaded by default to show the most recent torrent additions.
- **Request:** `GET /list_movies.json?limit=20&sort_by=date_added`

### 2. Autocomplete Quick Search
Replaces the old `ajax/search` endpoint. Used for fast dropdown suggestions.
- **Request:** `GET /list_movies.json?query_term={term}&limit=5&sort_by=date_added&order_by=desc`
- **Behavior:** Debounced in the browser, extracting `small_cover_image`, `title`, and `year` for the dropdown.

### 3. Full Search & Browse
Triggered on form submission or filter changes.
- **Request Example:**
  ```http
  GET /list_movies.json?query_term=inception&quality=1080p&genre=action&minimum_rating=7&sort_by=rating&order_by=desc&page=1&limit=20&with_rt_ratings=true
  ```

### 4. Pagination
Pagination is calculated client-side based on the `movie_count` and `limit`.
- **Formula:** `Total Pages = Math.ceil(data.movie_count / data.limit)`
- Changing the page increments the `page` parameter in the API call.

### 5. Magnet Links Construction
The API provides the direct `.torrent` file download via `torrents[].url`, but magnet links are constructed client-side using the `torrents[].hash`.
- **Base structure:** `magnet:?xt=urn:btih:<HASH>&dn=<URL-encoded movie name>`
- Additional tracker URLs are appended as `&tr=<tracker_url>`.

### 6. Media and Image Assets
Image URLs are returned inside the movie objects and can be hotlinked directly (no proxy required).
- `small_cover_image` (~210x315px): Used for grid card thumbnails.
- `medium_cover_image` (~600x900px): Used for modal / detail view.
- `large_cover_image` (~1200x1800px): Used for full-size hero headers.
- `background_image`: Full-width landscape image used as a hero/banner background in the movie modal.
- `yt_trailer_code`: Youtube ID to embed trailers via `https://youtube.com/embed/{code}`.
