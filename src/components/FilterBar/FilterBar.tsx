import React from 'react';
import useMovieStore from '../../store/use-movie-store';
import { SORT_OPTIONS } from '../../constants/sort-options';
import MobileFilterOverlay from './MobileFilterOverlay';
import './FilterBar.css';

const QUALITIES = ['All', '480p', '720p', '1080p', '1080p.x265', '2160p', '3D'];
const GENRES = ['All', 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];
const RATINGS = [
    { label: 'All (0)', value: 0 },
    { label: '5+', value: 5 },
    { label: '6+', value: 6 },
    { label: '7+', value: 7 },
    { label: '8+', value: 8 },
    { label: '9+', value: 9 },
];

const FilterBar: React.FC = () => {
    const { quality, genre, minRating, sortBy, orderBy, setFilters, resetFilters } = useMovieStore();
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    const hasActiveFilters = quality !== '' || genre !== '' || minRating > 0 || sortBy !== 'date_added' || orderBy !== 'desc';

    const currentSortOption = SORT_OPTIONS.find(opt => opt.value === sortBy)?.value || 'date_added';

    const handleFilterChange = (key: keyof import('../../types/movie').FilterParams, value: string | number) => {
        setFilters({
            quality,
            genre,
            minRating,
            sortBy,
            orderBy,
            [key]: value === 'All' ? '' : value // map "All" to empty string for API
        });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ quality, genre, minRating, sortBy: e.target.value, orderBy });
    };

    const toggleOrder = () => {
        setFilters({ quality, genre, minRating, sortBy, orderBy: orderBy === 'desc' ? 'asc' : 'desc' });
    };

    return (
        <section className="filter-bar-container">
            {/* Desktop / Tablet View */}
            <div className="filter-bar-desktop">
                <div className="filter-group">
                    <label htmlFor="quality-filter" className="sr-only">Quality</label>
                    <select
                        id="quality-filter"
                        value={quality || 'All'}
                        onChange={(e) => handleFilterChange('quality', e.target.value)}
                        className="filter-select"
                        aria-label="Filter by quality"
                    >
                        <option value="" disabled hidden>Quality</option>
                        {QUALITIES.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="genre-filter" className="sr-only">Genre</label>
                    <select
                        id="genre-filter"
                        value={genre || 'All'}
                        onChange={(e) => handleFilterChange('genre', e.target.value)}
                        className="filter-select"
                        aria-label="Filter by genre"
                    >
                        <option value="" disabled hidden>Genre</option>
                        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="rating-filter" className="sr-only">Min Rating</label>
                    <select
                        id="rating-filter"
                        value={minRating}
                        onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                        className="filter-select"
                        aria-label="Filter by minimum rating"
                    >
                        <option value="" disabled hidden>Rating</option>
                        {RATINGS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sort-filter" className="sr-only">Sort By</label>
                    <div className="filter-sort-controls">
                        <select
                            id="sort-filter"
                            value={currentSortOption}
                            onChange={handleSortChange}
                            className="filter-select"
                            aria-label="Sort movies by"
                            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 'none' }}
                        >
                            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <button
                            className="filter-order-toggle"
                            onClick={toggleOrder}
                            aria-label={`Toggle sort order. Current: ${orderBy}`}
                            title={orderBy === 'desc' ? 'Descending' : 'Ascending'}
                        >
                            {orderBy === 'desc' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <polyline points="19 12 12 19 5 12"></polyline>
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="19" x2="12" y2="5"></line>
                                    <polyline points="5 12 12 5 19 12"></polyline>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {hasActiveFilters && (
                    <button
                        className="btn-ghost filter-reset-btn"
                        onClick={resetFilters}
                        aria-label="Reset all filters"
                    >
                        Reset Filters
                    </button>
                )}
            </div>

            {/* Mobile View Toggle */}
            <button
                className="btn-ghost filter-mobile-toggle"
                onClick={() => setIsMobileOpen(true)}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-filter-overlay"
            >
                <span className="filter-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                </span>
                Filters & Sort
                {hasActiveFilters && <span className="filter-active-dot" aria-label="Filters active"></span>}
            </button>

            {/* Mobile Overlay */}
            <MobileFilterOverlay
                isOpen={isMobileOpen}
                onClose={() => setIsMobileOpen(false)}
                qualities={QUALITIES}
                genres={GENRES}
                ratings={RATINGS}
                sortOptions={SORT_OPTIONS}
            />
        </section>
    );
};

export default FilterBar;
