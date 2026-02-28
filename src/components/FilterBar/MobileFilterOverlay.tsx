import React, { useEffect, useState } from 'react';
import useMovieStore from '../../store/use-movie-store';
import type { SortOption } from '../../constants/sort-options';

interface MobileFilterOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    qualities: string[];
    genres: string[];
    ratings: { label: string; value: number }[];
    sortOptions: SortOption[];
}

const MobileFilterOverlay: React.FC<MobileFilterOverlayProps> = ({
    isOpen,
    onClose,
    qualities,
    genres,
    ratings,
    sortOptions
}) => {
    // Local state to hold selections before applying
    const { quality, genre, minRating, sortBy, orderBy, setFilters, resetFilters } = useMovieStore();

    const [localQuality, setLocalQuality] = useState(quality || 'All');
    const [localGenre, setLocalGenre] = useState(genre || 'All');
    const [localMinRating, setLocalMinRating] = useState(minRating);
    const [localSortBy, setLocalSortBy] = useState(sortBy);
    const [localOrderBy, setLocalOrderBy] = useState(orderBy);

    useEffect(() => {
        if (isOpen) {
            // Document body scroll lock
            document.body.style.overflow = 'hidden';

            // Sync local state when modal opens
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocalQuality(quality || 'All');
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocalGenre(genre || 'All');
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocalMinRating(minRating);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocalSortBy(sortOptions.find(opt => opt.value === sortBy)?.value || 'date_added');
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocalOrderBy(orderBy);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, quality, genre, minRating, sortBy, orderBy, sortOptions]);

    if (!isOpen) return null;

    const handleApply = () => {
        setFilters({
            quality: localQuality === 'All' ? '' : localQuality,
            genre: localGenre === 'All' ? '' : localGenre,
            minRating: localMinRating,
            sortBy: localSortBy,
            orderBy: localOrderBy
        });
        onClose();
    };

    const handleReset = () => {
        resetFilters();
        onClose();
    };

    return (
        <div className="mobile-filter-overlay" id="mobile-filter-overlay" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title">
            <div className="mobile-filter-header">
                <h2 id="mobile-filter-title">Filters & Sort</h2>
                <button
                    className="mobile-filter-close"
                    onClick={onClose}
                    aria-label="Close filters"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="mobile-filter-content">
                <div className="mobile-filter-group">
                    <label htmlFor="mobile-quality">Quality</label>
                    <select
                        id="mobile-quality"
                        value={localQuality}
                        onChange={(e) => setLocalQuality(e.target.value)}
                        className="filter-select"
                    >
                        {qualities.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                </div>

                <div className="mobile-filter-group">
                    <label htmlFor="mobile-genre">Genre</label>
                    <select
                        id="mobile-genre"
                        value={localGenre}
                        onChange={(e) => setLocalGenre(e.target.value)}
                        className="filter-select"
                    >
                        {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>

                <div className="mobile-filter-group">
                    <label htmlFor="mobile-rating">Minimum Rating</label>
                    <select
                        id="mobile-rating"
                        value={localMinRating}
                        onChange={(e) => setLocalMinRating(Number(e.target.value))}
                        className="filter-select"
                    >
                        {ratings.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                </div>

                <div className="mobile-filter-group">
                    <label htmlFor="mobile-sort">Sort By</label>
                    <div className="filter-sort-controls">
                        <select
                            id="mobile-sort"
                            value={localSortBy}
                            onChange={(e) => setLocalSortBy(e.target.value)}
                            className="filter-select"
                            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 'none', flex: 1 }}
                        >
                            {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <button
                            className="filter-order-toggle"
                            onClick={() => setLocalOrderBy(prev => prev === 'desc' ? 'asc' : 'desc')}
                            aria-label={`Toggle sort order. Current: ${localOrderBy}`}
                            title={localOrderBy === 'desc' ? 'Descending' : 'Ascending'}
                        >
                            {localOrderBy === 'desc' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <polyline points="19 12 12 19 5 12"></polyline>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="19" x2="12" y2="5"></line>
                                    <polyline points="5 12 12 5 19 12"></polyline>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mobile-filter-footer">
                <button className="btn-ghost filter-reset-btn" onClick={handleReset}>
                    Reset
                </button>
                <button className="btn-primary" onClick={handleApply}>
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default MobileFilterOverlay;
