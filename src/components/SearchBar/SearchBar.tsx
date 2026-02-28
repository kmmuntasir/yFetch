import { useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useMovieStore from '../../store/use-movie-store';
import { useAutocomplete } from '../../hooks/use-autocomplete';
import type { Movie } from '../../types/movie';
import './search-bar.css';

interface Props {
    /** Called when the user selects a suggestion (opens modal) */
    onMovieSelect: (movie: Movie) => void;
}

export default function SearchBar({ onMovieSelect }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { setQuery, fetchMovies } = useMovieStore();

    const handleMovieSelect = useCallback(
        (movie: Movie) => {
            onMovieSelect(movie);
            setInputValue('');
        },
        [onMovieSelect]
    );

    const { suggestions, isOpen, isLoading, closeSuggestions, selectSuggestion } =
        useAutocomplete(inputValue, handleMovieSelect);

    // Click-outside to close dropdown
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                closeSuggestions();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeSuggestions]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            closeSuggestions();
            const q = inputValue.trim();
            setQuery(q);
            fetchMovies();
        } else if (e.key === 'Escape') {
            closeSuggestions();
            (e.target as HTMLInputElement).blur();
        }
    }

    function handleClear() {
        setInputValue('');
        closeSuggestions();
    }

    function handleShowAll() {
        closeSuggestions();
        const q = inputValue.trim();
        if (q) {
            setQuery(q);
            fetchMovies();
        }
    }

    const dropdownClass = `search-bar__dropdown${isOpen ? ' search-bar__dropdown--open' : ''}`;

    return (
        <>
            <div className="search-bar search-bar--desktop" ref={containerRef} data-testid="search-bar">
                <div className="search-bar__pill">
                    {/* Magnifying glass */}
                    <svg
                        className="search-bar__icon"
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                    <input
                        id="site-search"
                        className="search-bar__input"
                        type="text"
                        placeholder="Search movies..."
                        autoComplete="off"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        aria-label="Search movies"
                        aria-autocomplete="list"
                        aria-expanded={isOpen}
                        aria-controls="search-suggestions"
                    />

                    {/* Clear button */}
                    {inputValue && (
                        <button
                            className="search-bar__clear"
                            onClick={handleClear}
                            aria-label="Clear search"
                            type="button"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Autocomplete Dropdown */}
                <div
                    id="search-suggestions"
                    className={dropdownClass}
                    role="listbox"
                    aria-label="Search suggestions"
                >
                    {isLoading ? (
                        <div className="search-bar__loading">Searching…</div>
                    ) : (
                        <>
                            <ul className="search-bar__suggestion-list">
                                {suggestions.map((movie) => (
                                    <li
                                        key={movie.id}
                                        className="search-bar__suggestion-item"
                                        role="option"
                                        aria-selected="false"
                                        tabIndex={0}
                                        onClick={() => selectSuggestion(movie)}
                                        onKeyDown={(e) => e.key === 'Enter' && selectSuggestion(movie)}
                                    >
                                        {movie.small_cover_image ? (
                                            <img
                                                src={movie.small_cover_image}
                                                alt={`${movie.title} poster`}
                                                className="search-bar__suggestion-poster"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="search-bar__suggestion-poster search-bar__suggestion-poster--placeholder">
                                                🎬
                                            </div>
                                        )}
                                        <div className="search-bar__suggestion-info">
                                            <div className="search-bar__suggestion-title">{movie.title}</div>
                                            <div className="search-bar__suggestion-meta">
                                                <span className="search-bar__suggestion-year">{movie.year}</span>
                                                {movie.rating > 0 && (
                                                    <span className="search-bar__suggestion-rating">
                                                        ★ {movie.rating.toFixed(1)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {inputValue.trim() && (
                                <button
                                    className="search-bar__show-all"
                                    onClick={handleShowAll}
                                    type="button"
                                >
                                    Show all results for "{inputValue.trim()}"
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Mobile search icon button */}
            <button
                className="search-bar__mobile-trigger"
                aria-label="Open search"
                onClick={() => setMobileOpen(true)}
                type="button"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </button>

            {/* Mobile Overlay (portaled) */}
            {mobileOpen &&
                createPortal(
                    <MobileSearchOverlay
                        onClose={() => setMobileOpen(false)}
                        onMovieSelect={(movie) => {
                            setMobileOpen(false);
                            onMovieSelect(movie);
                        }}
                        onFullSearch={(q) => {
                            setMobileOpen(false);
                            setQuery(q);
                            fetchMovies();
                        }}
                    />,
                    document.body
                )}
        </>
    );
}

/* ── Mobile Search Overlay ── */
interface MobileOverlayProps {
    onClose: () => void;
    onMovieSelect: (movie: Movie) => void;
    onFullSearch: (query: string) => void;
}

function MobileSearchOverlay({ onClose, onMovieSelect, onFullSearch }: MobileOverlayProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSelect = useCallback((movie: Movie) => {
        onMovieSelect(movie);
        setInputValue('');
    }, [onMovieSelect]);

    const { suggestions, isOpen, isLoading, closeSuggestions, selectSuggestion } =
        useAutocomplete(inputValue, handleSelect);

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            const q = inputValue.trim();
            if (q) {
                closeSuggestions();
                onFullSearch(q);
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    }

    function handleShowAll() {
        const q = inputValue.trim();
        if (q) onFullSearch(q);
    }

    return (
        <div className="mobile-overlay" role="dialog" aria-label="Mobile search" aria-modal="true">
            <div className="mobile-overlay__bar">
                <button
                    className="mobile-overlay__back"
                    onClick={onClose}
                    aria-label="Close search"
                    type="button"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M19 12H5" />
                        <path d="M12 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="mobile-overlay__pill">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="search-bar__icon">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        className="mobile-overlay__input"
                        type="text"
                        placeholder="Search movies..."
                        autoComplete="off"
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="Search movies"
                    />
                    {inputValue && (
                        <button
                            className="search-bar__clear"
                            onClick={() => setInputValue('')}
                            aria-label="Clear search"
                            type="button"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Results */}
            {isLoading && (
                <div className="mobile-overlay__loading">Searching…</div>
            )}

            {isOpen && !isLoading && (
                <ul className="mobile-overlay__list">
                    {suggestions.map((movie) => (
                        <li
                            key={movie.id}
                            className="mobile-overlay__item"
                            onClick={() => selectSuggestion(movie)}
                            role="option"
                            aria-selected="false"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && selectSuggestion(movie)}
                        >
                            {movie.small_cover_image ? (
                                <img
                                    src={movie.small_cover_image}
                                    alt={`${movie.title} poster`}
                                    className="mobile-overlay__poster"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="mobile-overlay__poster mobile-overlay__poster--placeholder">🎬</div>
                            )}
                            <div className="search-bar__suggestion-info">
                                <div className="search-bar__suggestion-title">{movie.title}</div>
                                <div className="search-bar__suggestion-meta">
                                    <span className="search-bar__suggestion-year">{movie.year}</span>
                                    {movie.rating > 0 && (
                                        <span className="search-bar__suggestion-rating">★ {movie.rating.toFixed(1)}</span>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}

                    {inputValue.trim() && (
                        <li className="mobile-overlay__show-all-item">
                            <button
                                className="search-bar__show-all"
                                onClick={handleShowAll}
                                type="button"
                            >
                                Show all results for "{inputValue.trim()}"
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}
