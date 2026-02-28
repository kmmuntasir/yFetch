import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useMovieStore from './store/use-movie-store';
import { buildMagnetLink } from './services/api-client';
import HeroSlideshow from './components/HeroSlideshow/HeroSlideshow';

function HomePage() {
  const { movies, movieCount, isLoading, error, fetchMovies } =
    useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const heroMovies = movies.slice(0, 5);
  const gridMovies = movies.slice(5);

  if (isLoading) {
    return (
      <p style={{ padding: '24px', color: 'var(--text-secondary)' }}>
        Loading movies…
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ padding: '24px', color: 'var(--error)' }}>{error}</p>
    );
  }

  return (
    <main>
      {/* Hero Slideshow: top 5 latest movies */}
      <HeroSlideshow movies={heroMovies} />

      {/* Movie Grid */}
      <section style={{ padding: '32px', maxWidth: '1280px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'var(--font-size-h2)',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          Recently Added
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-body-sm)',
            marginBottom: '24px',
          }}
        >
          {movieCount.toLocaleString()} movies found
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {gridMovies.map((movie) => (
            <article
              key={movie.id}
              style={{
                background: 'var(--surface-1)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-1)',
                transition: 'var(--transition-base)',
              }}
            >
              <img
                src={movie.medium_cover_image}
                alt={`${movie.title} poster`}
                loading="lazy"
                style={{
                  width: '100%',
                  aspectRatio: '2/3',
                  objectFit: 'cover',
                }}
              />
              <div style={{ padding: '12px' }}>
                <h3
                  style={{
                    fontSize: 'var(--font-size-h3)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '4px',
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
        </div>
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
