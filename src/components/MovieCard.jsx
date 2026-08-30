const MovieCard = ({ movie, onSelect }) => {
  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <img
        src={
          movie.poster && movie.poster !== 'N/A'
            ? movie.poster
            : 'https://via.placeholder.com/300x450?text=No+Image'
        }
        alt={movie.title}
      />
      <div className="movie-card__content">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <span>⭐ {movie.rating}</span>
      </div>
    </div>
  );
};

export default MovieCard;
