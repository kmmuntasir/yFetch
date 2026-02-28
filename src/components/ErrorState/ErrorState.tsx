import useMovieStore from '../../store/use-movie-store';
import './ErrorState.css';

export default function ErrorState() {
    const { error, fetchMovies } = useMovieStore();

    return (
        <div className="error-state">
            <svg
                className="error-state-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <h2 className="error-state-title">Failed to load movies</h2>
            <p className="error-state-subtitle">
                {error || "Something went wrong. Please check your connection."}
            </p>
            <button className="error-state-btn primary-btn" onClick={() => { fetchMovies(); }}>
                Retry
            </button>
        </div>
    );
}
