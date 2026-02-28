import useMovieStore from '../../store/use-movie-store';
import type { Movie } from '../../store/use-movie-store';
import MovieCard from '../MovieCard/MovieCard';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import EmptyState from '../EmptyState/EmptyState';
import ErrorState from '../ErrorState/ErrorState';
import './MovieGrid.css';

interface MovieGridProps {
    movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
    const { isLoading, error, movieCount, query, genre, limit } = useMovieStore();

    const getSectionHeading = () => {
        if (query) return `Search Results for "${query}"`;
        if (genre) return `${genre} Movies`;
        return 'Recently Added';
    };

    if (error) {
        return <ErrorState />;
    }

    if (movies.length === 0 && !isLoading && !error) {
        return <EmptyState />;
    }

    return (
        <section className="movie-grid-section">
            <div className="movie-grid-header">
                <h2 className="movie-grid-title">{getSectionHeading()}</h2>
                {!isLoading && (
                    <p className="movie-grid-count" aria-live="polite">
                        {movieCount.toLocaleString()} movies found
                    </p>
                )}
            </div>

            <div className="movie-grid-container">
                {isLoading
                    ? Array.from({ length: limit }).map((_, i) => <SkeletonCard key={i} />)
                    : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </section>
    );
}
