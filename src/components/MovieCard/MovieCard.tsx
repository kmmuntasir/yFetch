import type { Movie } from '../../types/movie';
import useMovieStore from '../../store/use-movie-store';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const { openModal } = useMovieStore();

    const handleCardClick = () => {
        openModal(movie);
    };

    return (
        <article className="movie-card" onClick={handleCardClick} role="button" tabIndex={0}>
            <div className="movie-card-poster-wrapper">
                <img
                    src={movie.medium_cover_image || movie.small_cover_image}
                    alt={movie.title}
                    className="movie-card-poster"
                    loading="lazy"
                />
                <div className="movie-card-overlay">
                    <div className="movie-card-rating">
                        <span className="star">★</span> {movie.rating}
                    </div>
                    {movie.genres && movie.genres.length > 0 && (
                        <div className="movie-card-genres">
                            {movie.genres.slice(0, 3).join(', ')}
                        </div>
                    )}
                    <button className="movie-card-btn">View Details</button>
                </div>
            </div>
            <div className="movie-card-info">
                <h3 className="movie-card-title">{movie.title}</h3>
                <div className="movie-card-meta">
                    <span className="movie-card-year">{movie.year}</span>
                    <span className="movie-card-mobile-rating">★ {movie.rating}</span>
                </div>
            </div>
        </article>
    );
}
