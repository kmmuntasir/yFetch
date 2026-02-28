import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchMovies } from '../services/api-client';
import type { Movie } from '../types/movie';

interface UseAutocompleteReturn {
    suggestions: Movie[];
    isOpen: boolean;
    isLoading: boolean;
    closeSuggestions: () => void;
    selectSuggestion: (movie: Movie) => void;
}

export function useAutocomplete(
    query: string,
    onSelect: (movie: Movie) => void
): UseAutocompleteReturn {
    const [suggestions, setSuggestions] = useState<Movie[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const abortRef = useRef<AbortController | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const closeSuggestions = useCallback(() => {
        setIsOpen(false);
        setSuggestions([]);
    }, []);

    const selectSuggestion = useCallback(
        (movie: Movie) => {
            onSelect(movie);
            closeSuggestions();
        },
        [onSelect, closeSuggestions]
    );

    useEffect(() => {
        // Clear pending debounce
        if (timerRef.current) clearTimeout(timerRef.current);

        // Abort in-flight request
        if (abortRef.current) abortRef.current.abort();

        if (query.length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        timerRef.current = setTimeout(async () => {
            const controller = new AbortController();
            abortRef.current = controller;
            setIsLoading(true);

            try {
                const data = await fetchMovies({
                    query_term: query,
                    limit: 5,
                    sort_by: 'date_added',
                    order_by: 'desc',
                });

                if (!controller.signal.aborted) {
                    setSuggestions(data.movies ?? []);
                    setIsOpen((data.movies?.length ?? 0) > 0);
                }
            } catch {
                // Silently ignore abort errors
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }, 350);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [query]);

    return { suggestions, isOpen, isLoading, closeSuggestions, selectSuggestion };
}
