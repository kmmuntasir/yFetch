import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useMovieStore from '../store/use-movie-store';

export function useUrlSync() {
    const [searchParams, setSearchParams] = useSearchParams();
    const isInitialized = useRef(false);

    // Store selectors
    const query = useMovieStore((state) => state.query);
    const quality = useMovieStore((state) => state.quality);
    const genre = useMovieStore((state) => state.genre);
    const minRating = useMovieStore((state) => state.minRating);
    const sortBy = useMovieStore((state) => state.sortBy);
    const orderBy = useMovieStore((state) => state.orderBy);
    const page = useMovieStore((state) => state.page);

    const setFilters = useMovieStore((state) => state.setFilters);
    const setQuery = useMovieStore((state) => state.setQuery);
    const setPage = useMovieStore((state) => state.setPage);
    const fetchMovies = useMovieStore((state) => state.fetchMovies);

    // Initial load: URL -> State
    useEffect(() => {
        if (isInitialized.current) return;

        let shouldFetch = false;

        const urlQuery = searchParams.get('query_term') || '';
        const urlQuality = searchParams.get('quality') || '';
        const urlGenre = searchParams.get('genre') || '';
        const urlMinRating = Number(searchParams.get('minimum_rating')) || 0;
        const urlSortBy = searchParams.get('sort_by') || 'date_added';
        const urlOrderBy = searchParams.get('order_by') || 'desc';
        const urlPage = Number(searchParams.get('page')) || 1;

        if (urlQuery) {
            setQuery(urlQuery);
            shouldFetch = true;
        }

        if (urlQuality || urlGenre || urlMinRating || urlSortBy !== 'date_added' || urlOrderBy !== 'desc') {
            setFilters({
                quality: urlQuality,
                genre: urlGenre,
                minRating: urlMinRating,
                sortBy: urlSortBy,
                orderBy: urlOrderBy,
            });
            shouldFetch = true;
        }

        if (urlPage > 1) {
            setPage(urlPage);
            shouldFetch = true;
        }

        if (shouldFetch) {
            // Need a slight delay to ensure state is set before fetch
            setTimeout(() => {
                fetchMovies();
            }, 0);
        } else {
            // Fetch default list
            fetchMovies();
        }

        isInitialized.current = true;
    }, [searchParams, setFilters, setQuery, setPage, fetchMovies]);

    // State changes: State -> URL
    useEffect(() => {
        if (!isInitialized.current) return; // Wait for initial URL parsing

        const params = new URLSearchParams();

        if (query) params.set('query_term', query);
        if (quality) params.set('quality', quality);
        if (genre) params.set('genre', genre);
        if (minRating > 0) params.set('minimum_rating', minRating.toString());

        // Find if this is a default sort
        if (sortBy !== 'date_added' || orderBy !== 'desc') {
            params.set('sort_by', sortBy);
            params.set('order_by', orderBy);
        }

        if (page > 1) params.set('page', page.toString());

        setSearchParams(params, { replace: true });
    }, [query, quality, genre, minRating, sortBy, orderBy, page, setSearchParams]);
}
