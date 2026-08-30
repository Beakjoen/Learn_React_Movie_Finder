import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { fetchPopularMovies, searchMovies } from './services/api';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách phim.');
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    const keyword = searchTerm.trim();
    if (!keyword) {
      setMovies([]);
      setError('Vui lòng nhập tên phim để tìm kiếm.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const result = await searchMovies(keyword);
      setMovies(result);

      if (result.length === 0) {
        setError('Không tìm thấy phim phù hợp.');
      }
    } catch (err) {
      setError(err.message || 'Lỗi khi tìm kiếm phim.');
    } finally {
      setLoading(false);
    }
  };

  const handleMovieSelect = (movie) => {
    console.log('Selected movie:', movie);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__content">
          <p className="app-header__label">Movie Finder</p>
          <h1>Khám phá phim yêu thích</h1>
        </div>
      </header>

      <main className="app-main">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={handleSearch}
          loading={loading}
        />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-state">Đang tải dữ liệu...</div>
        ) : (
          <MovieList movies={movies} onSelect={handleMovieSelect} />
        )}
      </main>
    </div>
  );
}

export default App;
