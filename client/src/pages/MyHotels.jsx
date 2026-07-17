import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyHotels } from "../services/api";

const MyHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getMyHotels();
        setHotels(data.hotels);
      } catch (err) {
        setError(err.response?.data?.message || "Couldn't load your hotels.");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink-800">My hotels</h2>
        <Link
          to="/owner/hotels/new"
          className="rounded-tag bg-ink-800 px-4 py-2 text-sm font-medium text-paper hover:bg-ink-700"
        >
          + List a hotel
        </Link>
      </div>

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-ink-50" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-rust-100 bg-rust-50 px-5 py-8 text-center">
          <p className="text-sm font-medium text-rust-700">{error}</p>
        </div>
      )}

      {!loading && !error && hotels.length === 0 && (
        <div className="rounded-lg border border-ink-100 bg-white px-5 py-16 text-center shadow-card">
          <span className="key-tag mb-4 inline-flex">No hotels yet</span>
          <h3 className="font-display text-xl font-semibold text-ink-800">
            You haven't listed a hotel yet
          </h3>
          <p className="mt-2 text-sm text-ink-500">
            List your first property to start adding rooms.
          </p>
          <Link
            to="/owner/hotels/new"
            className="mt-5 inline-block rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
          >
            List a hotel
          </Link>
        </div>
      )}

      {!loading && !error && hotels.length > 0 && (
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="flex flex-col justify-between gap-4 rounded-lg border border-ink-100 bg-white p-5 shadow-card sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-800">
                  {hotel.name}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-400">
                  {hotel.city}, {hotel.country}
                </p>
                <p className="mt-1 max-w-md text-sm text-ink-500 line-clamp-1">
                  {hotel.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/hotels/${hotel._id}`}
                  className="rounded-tag border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 hover:border-ink-800"
                >
                  View public page
                </Link>
                <Link
                  to={`/owner/hotels/${hotel._id}/rooms`}
                  className="rounded-tag bg-ink-800 px-4 py-2 text-sm font-medium text-paper hover:bg-ink-700"
                >
                  Manage rooms
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHotels;
