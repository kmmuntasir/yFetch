import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useMovieStore from './store/use-movie-store';
import HeroSlideshow from './components/HeroSlideshow/HeroSlideshow';
import Header from './components/Header/Header';
import MovieGrid from './components/MovieGrid/MovieGrid';

function HomePage() {
  const { movies, isLoading, error, fetchMovies } =
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
      {heroMovies.length > 0 && <HeroSlideshow movies={heroMovies} />}

      {/* Movie Grid */}
      <MovieGrid movies={gridMovies} />
    </main>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
