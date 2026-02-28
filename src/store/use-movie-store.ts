import { create } from 'zustand';
import { fetchMovies as fetchMoviesApi } from '../services/api-client';
import { DEFAULT_LIMIT } from '../constants/api-config';
import type { Movie, Torrent, FilterParams, MovieState } from '../types/movie';

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
};

const useMovieStore = create<MovieState>((set, get) => ({
    ...INITIAL_STATE,

    setQuery: (query: string) => set({ query, page: 1 }),

    setFilters: (filters: FilterParams) =>
        set({
            ...filters,
            page: 1,
        }),

    setPage: (page: number) => set({ page }),

    resetFilters: () =>
        set({
            query: '',
            quality: '',
            genre: '',
            minRating: 0,
            sortBy: 'date_added',
            orderBy: 'desc',
            page: 1,
        }),

    fetchMovies: async () => {
        const { query, quality, genre, minRating, sortBy, orderBy, page, limit } =
            get();

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
            });

            set({
                movies: data.movies ?? [],
                movieCount: data.movie_count ?? 0,
                isLoading: false,
            });
        } catch (err) {
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
