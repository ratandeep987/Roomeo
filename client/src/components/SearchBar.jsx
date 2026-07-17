/**
 * The backend's GET /api/hotels takes no query params — it always returns
 * every hotel. So this search box filters the already-fetched list on the
 * client rather than hitting the API again per keystroke.
 */
const SearchBar = ({ value, onChange, placeholder = "Search by city or hotel name" }) => {
  return (
    <div className="relative w-full">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6-10.6 7.5 7.5 0 0010.6 10.6z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-tag border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
      />
    </div>
  );
};

export default SearchBar;
