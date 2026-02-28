import { create } from 'zustand';
import { fetchMovies as fetchMoviesApi } from '../services/api-client';
import { DEFAULT_LIMIT } from '../constants/api-config';
import type { Movie, Torrent, FilterParams, MovieState } from '../types/movie';

// Module-level variable to store the current AbortController
let currentAbortController: AbortController | null = null;

const INITIAL_STATE = {
    query: '',
    quality: '',
    genre: '',
    minRating: 0,
    sortBy: 'date_added',
    orderBy: 'desc',
    page: 1,
    limit: DEFAULT_LIMIT,
    movies: [] as Movie[],
    movieCount: 0,
    isLoading: false,
    error: null as string | null,
    selectedMovie: null as Movie | null,
    isModalOpen: false,
};

const useMovieStore = create<MovieState>((set, get) => ({
    ...INITIAL_STATE,

    setSelectedMovie: (movie: Movie | null) => set({ selectedMovie: movie, isModalOpen: !!movie }),
    openModal: (movie: Movie) => set({ selectedMovie: movie, isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false, selectedMovie: null }),

    setQuery: (query: string) => {
        set({ query, page: 1 });
        get().fetchMovies();
    },

    setFilters: (filters: FilterParams) => {
        set({
            ...filters,
            page: 1,
        });
        get().fetchMovies();
    },

    setPage: (page: number) => {
        set({ page });
        get().fetchMovies();
    },

    resetFilters: () => {
        set({
            ...INITIAL_STATE,
            // Keep modal and movies state initially until fetch completes
            movies: get().movies,
            movieCount: get().movieCount,
            isLoading: get().isLoading,
            error: get().error,
            selectedMovie: get().selectedMovie,
            isModalOpen: get().isModalOpen,
        });
        get().fetchMovies();
    },

    fetchMovies: async () => {
        const { query, quality, genre, minRating, sortBy, orderBy, page, limit } =
            get();

        // Abort previous request if it exists
        if (currentAbortController) {
            currentAbortController.abort('New request initiated');
        }

        // Create new AbortController for this request
        currentAbortController = new AbortController();

        set({ isLoading: true, error: null });

        try {
            const data = await fetchMoviesApi({
                query_term: query || undefined,
                quality: quality || undefined,
                genre: genre || undefined,
                minimum_rating: minRating || undefined,
                sort_by: sortBy,
                order_by: orderBy,
                page,
                limit,
                with_rt_ratings: true,
                signal: currentAbortController.signal,
            });

            set({
                movies: data.movies ?? [],
                movieCount: data.movie_count ?? 0,
                isLoading: false,
            });
        } catch (err) {
            // Ignore AbortError, as it means a new request is taking over
            if (err instanceof DOMException && err.name === 'AbortError') {
                return;
            }
            // Also check for the custom reason we passed
            if (err instanceof Error && err.message === 'New request initiated') {
                return;
            }

            set({
                movies: [],
                movieCount: 0,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch movies.',
            });
        }
    },
}));

export type { Movie, Torrent, MovieState };
export default useMovieStore;
