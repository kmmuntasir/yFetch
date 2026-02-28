import { useState, useEffect, useCallback, useRef } from 'react';
import type { Movie } from '../../types/movie';
import './hero-slideshow.css';

interface Props {
    movies: Movie[];
}

const AUTOPLAY_INTERVAL_MS = 5000;

export default function HeroSlideshow({ movies }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % movies.length);
        }, AUTOPLAY_INTERVAL_MS);
    }, [movies.length]);

    useEffect(() => {
        if (movies.length === 0) return;
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [movies.length, startTimer]);

    if (movies.length === 0) return null;

    const movie = movies[activeIndex];
    const synopsis =
        movie.summary || movie.synopsis || movie.description_full || '';

    return (
        <section className="hero" aria-label="Featured movies slideshow">
            {/* Backdrop */}
            {movies.map((m, i) => (
                <div
                    key={m.id}
                    className={`hero__backdrop ${i === activeIndex ? 'hero__backdrop--active' : ''}`}
                    style={{ backgroundImage: `url(${m.background_image_original || m.background_image || m.large_cover_image})` }}
                    aria-hidden="true"
                />
            ))}

            {/* Gradient overlay */}
            <div className="hero__gradient" aria-hidden="true" />

            {/* Content */}
            <div className="hero__content">
                {/* Info card — glassmorphism */}
                <div className="hero__card">
                    {/* Genres row */}
                    <div className="hero__meta-row">
                        {movie.genres?.slice(0, 3).map((g) => (
                            <span key={g} className="hero__genre-badge">{g}</span>
                        ))}
                        {movie.year && (
                            <span className="hero__year">{movie.year}</span>
                        )}
                        {movie.rating > 0 && (
                            <span className="hero__rating">⭐ {movie.rating}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="hero__title">{movie.title}</h2>

                    {/* Synopsis */}
                    {synopsis && (
                        <p className="hero__synopsis">
                            {synopsis.length > 200 ? `${synopsis.slice(0, 200)}…` : synopsis}
                        </p>
                    )}

                    {/* CTA buttons */}
                    <div className="hero__actions">
                        <button
                            className="hero__btn hero__btn--primary"
                            aria-label={`View details for ${movie.title}`}
                        >
                            <span aria-hidden="true">▶</span> View Details
                        </button>
                        {movie.yt_trailer_code && (
                            <a
                                className="hero__btn hero__btn--ghost"
                                href={`https://youtube.com/watch?v=${movie.yt_trailer_code}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Watch trailer for ${movie.title}`}
                            >
                                🎬 Trailer
                            </a>
                        )}
                    </div>
                </div>

                {/* Poster */}
                <div className="hero__poster-wrap">
                    <img
                        src={movie.medium_cover_image}
                        alt={`${movie.title} poster`}
                        className="hero__poster"
                    />
                </div>
            </div>

            {/* Slide dots */}
            <div className="hero__dots" role="tablist" aria-label="Slideshow navigation">
                {movies.map((m, i) => (
                    <button
                        key={m.id}
                        role="tab"
                        aria-selected={i === activeIndex}
                        aria-label={`Go to slide ${i + 1}: ${m.title}`}
                        className={`hero__dot ${i === activeIndex ? 'hero__dot--active' : ''}`}
                        onClick={() => {
                            goTo(i);
                            startTimer();
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
