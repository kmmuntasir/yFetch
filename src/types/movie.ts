export interface Movie {
    id: number;
    url: string;
    imdb_code: string;
    title: string;
    title_english: string;
    title_long: string;
    slug: string;
    year: number;
    rating: number;
    runtime: number;
    genres: string[];
    summary: string;
    description_full: string;
    synopsis: string;
    yt_trailer_code: string;
    language: string;
    mpa_rating: string;
    background_image: string;
    background_image_original: string;
    small_cover_image: string;
    medium_cover_image: string;
    large_cover_image: string;
    torrents: Torrent[];
    date_uploaded: string;
    date_uploaded_unix: number;
}

export interface Torrent {
    url: string;
    hash: string;
    quality: string;
    type: string;
    is_repack: string;
    video_codec: string;
    bit_depth: string;
    audio_channels: string;
    seeds: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
}

export interface FetchMoviesParams {
    query_term?: string;
    limit?: number;
    page?: number;
    quality?: string;
    minimum_rating?: number;
    genre?: string;
    sort_by?: string;
    order_by?: string;
    with_rt_ratings?: boolean;
}

export interface FetchMoviesResponse {
    movie_count: number;
    limit: number;
    page_number: number;
    movies: Movie[];
}

export interface FilterParams {
    quality?: string;
    genre?: string;
    minRating?: number;
    sortBy?: string;
    orderBy?: string;
}

export interface MovieState {
    query: string;
    quality: string;
    genre: string;
    minRating: number;
    sortBy: string;
    orderBy: string;
    page: number;
    limit: number;
    movies: Movie[];
    movieCount: number;
    isLoading: boolean;
    error: string | null;
    selectedMovie: Movie | null;

    setSelectedMovie: (movie: Movie | null) => void;
    setQuery: (query: string) => void;
    setFilters: (filters: FilterParams) => void;
    setPage: (page: number) => void;
    resetFilters: () => void;
    fetchMovies: () => Promise<void>;
}
