import useMovieStore from '../../store/use-movie-store';
import { useNavigate } from 'react-router-dom';
import './EmptyState.css';

export default function EmptyState() {
    const { resetFilters } = useMovieStore();
    const navigate = useNavigate();

    const handleClear = () => {
        resetFilters();
        navigate('/');
    };

    return (
        <div className="empty-state">
            <svg
                className="empty-state-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                {/* Broken magnifying glass / empty film reel hybrid */}
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <h2 className="empty-state-title">No movies found</h2>
            <p className="empty-state-subtitle">
                We couldn't find any results matching your search terms. Try adjusting your filters or checking for typos.
            </p>
            <button className="empty-state-btn ghost-btn" onClick={handleClear}>
                Clear Search &amp; Filters
            </button>
        </div>
    );
}
