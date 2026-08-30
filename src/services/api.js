const API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_OMDB_API_KEY) ||
  (typeof process !== 'undefined' && process.env?.REACT_APP_OMDB_API_KEY) ||
  '';

const OMDB_BASE_URL = 'https://www.omdbapi.com/';

const buildUrl = (params) => {
  const query = new URLSearchParams({
    apikey: API_KEY,
    ...params,
  });

  return `${OMDB_BASE_URL}?${query.toString()}`;
};

const normalizeMovie = (movie) => ({
  id: movie.imdbID,
  title: movie.Title,
  year: movie.Year,
  poster: movie.Poster,
  type: movie.Type,
  rating: 'N/A',
});

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(buildUrl({ s: 'movie', type: 'movie', page: '1' }));
    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Không thể tải danh sách phim');
    }

    return (data.Search || []).slice(0, 10).map(normalizeMovie);
  } catch (error) {
    console.error('fetchPopularMovies error:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  try {
    const response = await fetch(
      buildUrl({
        s: trimmedQuery,
        type: 'movie',
        page: '1',
      })
    );

    const data = await response.json();

    if (data.Response === 'False') {
      return [];
    }

    return (data.Search || []).map(normalizeMovie);
  } catch (error) {
    console.error('searchMovies error:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  if (!movieId) {
    return null;
  }

  try {
    const response = await fetch(
      buildUrl({
        i: movieId,
        plot: 'full',
      })
    );

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Không tìm thấy thông tin phim');
    }

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      poster: data.Poster,
      rating: data.imdbRating || 'N/A',
      plot: data.Plot || 'Chưa có mô tả.',
      genres: data.Genre ? data.Genre.split(', ').filter(Boolean) : [],
      runtime: data.Runtime || 'N/A',
      actors: data.Actors || 'N/A',
      director: data.Director || 'N/A',
      language: data.Language || 'N/A',
      released: data.Released || 'N/A',
    };
  } catch (error) {
    console.error('getMovieDetails error:', error);
    throw error;
  }
};

export default {
  fetchPopularMovies,
  searchMovies,
  getMovieDetails,
};

