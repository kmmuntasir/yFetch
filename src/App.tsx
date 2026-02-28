import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useMovieStore from './store/use-movie-store';
import HeroSlideshow from './components/HeroSlideshow/HeroSlideshow';
import Header from './components/Header/Header';
import MovieGrid from './components/MovieGrid/MovieGrid';
import MovieModal from './components/MovieModal/MovieModal';
import FilterBar from './components/FilterBar/FilterBar';
import Pagination from './components/Pagination/Pagination';
import { useUrlSync } from './hooks/use-url-sync';

function HomePage() {
  const { movies, isLoading, error, page } = useMovieStore();

  // Initialize and run URL sync logic
  useUrlSync();

  // For the first page, we show 5 movies in the hero slideshow
  // For subsequent pages, we show all movies in the grid
  const heroMovies = page === 1 ? movies.slice(0, 5) : [];
  const gridMovies = page === 1 ? movies.slice(5) : movies;

  return (
    <main style={{ padding: '0 24px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Hero Slideshow: top 5 latest movies on page 1 */}
      {heroMovies.length > 0 && <HeroSlideshow movies={heroMovies} />}

      {/* Filter Bar */}
      <FilterBar />

      {error ? (
        <p style={{ padding: '24px', color: 'var(--error)' }}>{error}</p>
      ) : isLoading ? (
        <p style={{ padding: '24px', color: 'var(--text-secondary)' }}>Loading movies…</p>
      ) : (
        <>
          {/* Movie Grid */}
          {gridMovies.length > 0 ? (
            <MovieGrid movies={gridMovies} />
          ) : (
            <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No movies found matching your filters.</p>
          )}

          {/* Pagination */}
          <Pagination />
        </>
      )}
    </main>
  );
}

function App() {
  const { query } = useMovieStore();

  React.useEffect(() => {
    if (query) {
      document.title = `yFetch — Search: ${query}`;
    } else {
      document.title = 'yFetch — Browse & Download Movies';
    }
  }, [query]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <MovieModal />
    </>
  );
}

export default App;
