import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useMovieStore from './store/use-movie-store';
import { buildMagnetLink } from './services/api-client';

function HomePage() {
  const { movies, movieCount, isLoading, error, fetchMovies } =
    useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (isLoading) {
    return <p style={{ padding: '24px' }}>Loading movies…</p>;
  }

  if (error) {
    return <p style={{ padding: '24px', color: 'var(--error)' }}>{error}</p>;
  }

  return (
    <main style={{ padding: '24px' }}>
      <h1 style={{ fontSize: 'var(--font-size-h1)', marginBottom: '16px' }}>
        yFetch
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        {movieCount} movies found
      </p>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {movies.map((movie) => (
          <article
            key={movie.id}
            style={{
              background: 'var(--surface-1)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-1)',
            }}
          >
            <img
              src={movie.small_cover_image}
              alt={movie.title}
              style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover' }}
            />
            <div style={{ padding: '12px' }}>
              <h3
                style={{
                  fontSize: 'var(--font-size-h3)',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {movie.title}
              </h3>
              <span
                style={{
                  fontSize: 'var(--font-size-body-sm)',
                  color: 'var(--text-secondary)',
                }}
              >
                {movie.year}
              </span>

              {/* Magnet link test — renders first torrent's magnet */}
              {movie.torrents?.[0] && (
                <a
                  href={buildMagnetLink(
                    movie.torrents[0].hash,
                    movie.title_long || movie.title
                  )}
                  style={{
                    display: 'block',
                    marginTop: '8px',
                    fontSize: 'var(--font-size-caption)',
                    color: 'var(--accent-primary)',
                  }}
                >
                  🧲 Magnet
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
