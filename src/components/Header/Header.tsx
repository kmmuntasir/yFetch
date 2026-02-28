import './header.css';
import SearchBar from '../SearchBar/SearchBar';
import useMovieStore from '../../store/use-movie-store';

export default function Header() {
    const { setSelectedMovie } = useMovieStore();

    return (
        <header className="site-header" role="banner">
            <div className="site-header__inner">

                {/* Logo */}
                <a href="/" className="site-header__logo" aria-label="yFetch home">
                    yFetch
                </a>

                {/* Search bar */}
                <div className="site-header__search-wrap">
                    <SearchBar onMovieSelect={(movie) => setSelectedMovie(movie)} />
                </div>

                {/* Right nav */}
                <nav className="site-header__nav" aria-label="Primary navigation">
                    <a href="/" className="site-header__nav-link site-header__nav-link--active">
                        Home
                    </a>
                    <a href="/browse" className="site-header__nav-link">
                        Browse Movies
                    </a>
                    <button
                        className="site-header__filter-btn"
                        aria-label="Open filters"
                        title="Filters"
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                            <line x1="11" y1="18" x2="13" y2="18" />
                        </svg>
                    </button>
                </nav>

            </div>
        </header>
    );
}
