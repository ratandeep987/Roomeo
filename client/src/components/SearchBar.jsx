import searchIcon from "../assets/searchIcon.svg";

/**
 * The backend's GET /api/hotels takes no query params — it always returns
 * every hotel. So this search box filters the already-fetched list on the
 * client rather than hitting the API again per keystroke.
 */
const SearchBar = ({
  value,
  onChange,
  placeholder = "Search by city or hotel name",
  variant = "light",
}) => {
  const isDark = variant === "dark";

  return (
    <div
      className={`relative w-full rounded-full transition-shadow ${
        isDark
          ? "bg-white/10 backdrop-blur-md ring-1 ring-white/20 focus-within:ring-brass-400"
          : "bg-white ring-1 ring-ink-200 focus-within:ring-2 focus-within:ring-brass-500 shadow-card"
      }`}
    >
      <img
        src={searchIcon}
        alt=""
        className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${
          isDark ? "opacity-90" : "[filter:brightness(0)] opacity-40"
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-full bg-transparent py-3.5 pl-12 pr-4 text-sm outline-none ${
          isDark
            ? "text-white placeholder:text-white/60"
            : "text-ink-800 placeholder:text-ink-300"
        }`}
      />
    </div>
  );
};

export default SearchBar;
