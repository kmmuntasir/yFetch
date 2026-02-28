import React from 'react';
import useMovieStore from '../../store/use-movie-store';
import './Pagination.css';

const Pagination: React.FC = () => {
    const { movieCount, limit, page, setPage, fetchMovies } = useMovieStore();

    const totalPages = Math.ceil(movieCount / limit);

    if (totalPages <= 1) return null;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            // Scroll to top of grid
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // max 7 visible at once
            // e.g. 1 2 3 4 5 ... 10
            // e.g. 1 ... 4 5 6 ... 10
            // e.g. 1 ... 6 7 8 9 10

            if (page <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (page >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }

        return pages;
    };

    return (
        <section className="pagination-container" aria-label="Movie pagination">
            <div className="pagination-info">
                Page {page} of {totalPages} ({movieCount.toLocaleString()} movies)
            </div>

            <div className="pagination-controls">
                <button
                    className="pagination-btn pagination-prev-next"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                >
                    &larr; Prev
                </button>

                {getPageNumbers().map((p, i) => (
                    <button
                        key={i}
                        className={`pagination-btn ${p === page ? 'active' : ''} ${p === '...' ? 'ellipsis' : ''}`}
                        onClick={() => typeof p === 'number' && handlePageChange(p)}
                        disabled={p === '...'}
                        aria-current={p === page ? 'page' : undefined}
                    >
                        {p}
                    </button>
                ))}

                <button
                    className="pagination-btn pagination-prev-next"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Next page"
                >
                    Next &rarr;
                </button>
            </div>
        </section>
    );
};

export default Pagination;
