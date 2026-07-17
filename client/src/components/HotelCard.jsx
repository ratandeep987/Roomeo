import { Link } from "react-router-dom";

/**
 * Displays one hotel from GET /api/hotels or /api/hotels/my-hotels.
 * Fields used (name, city, country, address, description) all come
 * straight off the Hotel model — nothing invented.
 */
const HotelCard = ({ hotel }) => {
  return (
    <Link
      to={`/hotels/${hotel._id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-lift"
    >
      {/* No hotel images exist in the backend model, so instead of faking a
          photo we use a typographic header that leans into the "key tag"
          motif — the hotel's initial on a brass plate. */}
      <div className="flex h-32 items-center justify-center bg-ink-800">
        <span className="font-display text-3xl font-semibold text-brass-300">
          {hotel.name?.charAt(0)?.toUpperCase() || "H"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink-800 group-hover:text-brass-700">
            {hotel.name}
          </h3>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-400">
          {hotel.city}, {hotel.country}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-ink-500">
          {hotel.description}
        </p>
        <p className="mt-3 truncate text-xs text-ink-400">{hotel.address}</p>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brass-600 group-hover:text-brass-700">
          View rooms
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
};

export default HotelCard;
