import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useMovieStore from '../../store/use-movie-store';
import { buildMagnetLink } from '../../services/api-client';
import './MovieModal.css';

export default function MovieModal() {
    const { selectedMovie, isModalOpen, closeModal } = useMovieStore();
    const [isMounted, setIsMounted] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);

    // Fade/scale animation states
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
            setShowTrailer(false);
        } else {
            setIsVisible(false);
            // Slight delay before unlocking body and unmounting for exit animation
            const timer = setTimeout(() => {
                document.body.style.overflow = '';
            }, 200);
            return () => clearTimeout(timer);
        }

        // Cleanup function for unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, closeModal]);

    if (!isMounted || !selectedMovie) return null;

    const formatRuntime = (minutes: number) => {
        if (!minutes) return 'Unknown';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleTrailerClick = () => {
        setShowTrailer(true);
    };

    const modalContent = (
        <div
            className={`movie-modal-overlay ${isVisible ? 'is-open' : ''}`}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
        >
            <div className="movie-modal-container">
                <button className="movie-modal-close-btn" onClick={closeModal} aria-label="Close modal">
                    ×
                </button>

                <div className="movie-modal-content">
                    {/* Left Column */}
                    <div className="movie-modal-left">
                        <img
                            src={selectedMovie.medium_cover_image || selectedMovie.small_cover_image}
                            alt={selectedMovie.title}
                            className="movie-modal-poster"
                        />

                        <div className="movie-modal-badges">
                            <span className="movie-modal-rating">
                                <span className="star">★</span> {selectedMovie.rating}
                            </span>
                        </div>

                        {selectedMovie.imdb_code && (
                            <a
                                href={`https://www.imdb.com/title/${selectedMovie.imdb_code}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="movie-modal-imdb-btn"
                            >
                                IMDb Page ↗
                            </a>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="movie-modal-right">
                        <h2 className="movie-modal-title">{selectedMovie.title}</h2>

                        <div className="movie-modal-meta">
                            <span>{selectedMovie.year}</span>
                            <span>•</span>
                            <span>{formatRuntime(selectedMovie.runtime)}</span>
                            {selectedMovie.mpa_rating && (
                                <>
                                    <span>•</span>
                                    <span>{selectedMovie.mpa_rating}</span>
                                </>
                            )}
                            {selectedMovie.language && (
                                <>
                                    <span>•</span>
                                    <span>{selectedMovie.language.toUpperCase()}</span>
                                </>
                            )}
                        </div>

                        {selectedMovie.genres && selectedMovie.genres.length > 0 && (
                            <div className="movie-modal-genres">
                                {selectedMovie.genres.map(genre => (
                                    <span key={genre} className="movie-modal-genre-badge">{genre}</span>
                                ))}
                            </div>
                        )}

                        <p className="movie-modal-synopsis">
                            {selectedMovie.description_full || selectedMovie.summary || selectedMovie.synopsis || (
                                <span className="movie-modal-fallback">No synopsis available.</span>
                            )}
                        </p>

                        {!showTrailer && selectedMovie.yt_trailer_code ? (
                            <button className="movie-modal-trailer-btn" onClick={handleTrailerClick}>
                                ▶ Watch Trailer
                            </button>
                        ) : showTrailer && selectedMovie.yt_trailer_code ? (
                            <div className="movie-modal-trailer-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${selectedMovie.yt_trailer_code}?autoplay=1`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : null}

                        <div className="movie-modal-torrents-section">
                            <div className="movie-modal-section-label">Available Torrents</div>

                            {selectedMovie.torrents && selectedMovie.torrents.length > 0 ? (
                                <div className="movie-modal-torrents">
                                    {selectedMovie.torrents.map((torrent, idx) => (
                                        <div key={torrent.hash || idx} className="movie-modal-torrent-row">
                                            <div className="movie-torrent-quality">{torrent.quality}</div>
                                            <div className="movie-torrent-type">{torrent.type}</div>

                                            <div className="movie-torrent-meta">
                                                <span>{torrent.video_codec}</span>
                                                <span>{torrent.size}</span>
                                            </div>

                                            <div className="movie-torrent-peers">
                                                <span className="movie-torrent-seeds">🌱 {torrent.seeds}</span>
                                                <span className="movie-torrent-leechs">👥 {torrent.peers}</span>
                                            </div>

                                            <div className="movie-modal-torrent-actions">
                                                <a href={torrent.url} className="movie-torrent-btn download" title="Download .torrent">
                                                    .torrent
                                                </a>
                                                <a
                                                    href={buildMagnetLink(torrent.hash, selectedMovie.title)}
                                                    className="movie-torrent-btn magnet"
                                                    title="Magnet Link"
                                                >
                                                    Magnet
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="movie-modal-fallback">No torrents available for this movie.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

    // Only render portal when isModalOpen is true, or during the brief fade-out transition.
    // If it's not open and not visible, don't render anything in the DOM.
    if (!isModalOpen && !isVisible) return null;

    return createPortal(modalContent, document.body);
}
