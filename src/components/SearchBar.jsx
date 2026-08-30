const SearchBar = ({ value, onChange, onSubmit, loading }) => {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm phim theo tên..."
        aria-label="Tìm kiếm phim"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Đang tìm...' : 'Tìm kiếm'}
      </button>
    </form>
  );
};

export default SearchBar;
