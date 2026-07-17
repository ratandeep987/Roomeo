import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllHotels } from "../services/api";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await getAllHotels();
        setHotels(data.hotels);
      } catch {
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const featured = useMemo(() => hotels.slice(0, 6), [hotels]);
  const cityCount = useMemo(
    () => new Set(hotels.map((h) => h.city)).size,
    [hotels]
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/hotels?q=${encodeURIComponent(query.trim())}` : "/hotels");
  };

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-ink-100 bg-ink-800">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="key-tag mb-6 inline-flex">
            {loading
              ? "Loading listings"
              : `${hotels.length} hotels · ${cityCount} ${cityCount === 1 ? "city" : "cities"}`}
          </span>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-paper sm:text-5xl lg:text-6xl">
            Book directly with the people who run the place.
          </h1>
          <p className="mt-5 max-w-xl text-ink-200">
            Roomeo connects you straight to independent hotels — no
            middleman markup, real rooms, real owners.
          </p>

          <form onSubmit={handleSearchSubmit} className="mt-8 max-w-lg">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by city — try Jaipur, Goa, Manali…"
            />
          </form>

          <div className="mt-4 flex gap-3">
            <Link
              to="/hotels"
              className="rounded-tag bg-brass-500 px-5 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:bg-brass-400"
            >
              Browse all hotels
            </Link>
            <Link
              to="/register"
              className="rounded-tag border border-ink-600 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-brass-400"
            >
              List your hotel
            </Link>
          </div>
        </div>
      </section>

      {/* Featured hotels */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="key-tag mb-3 inline-flex">Fresh listings</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink-800 sm:text-3xl">
              Featured hotels
            </h2>
          </div>
          {!loading && hotels.length > 6 && (
            <Link
              to="/hotels"
              className="hidden text-sm font-medium text-brass-600 hover:text-brass-700 sm:inline-block"
            >
              View all →
            </Link>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg border border-ink-100 bg-ink-50"
              />
            ))}
          </div>
        )}

        {!loading && featured.length === 0 && (
          <div className="rounded-lg border border-ink-100 bg-white px-5 py-16 text-center shadow-card">
            <span className="key-tag mb-4 inline-flex">Nothing listed yet</span>
            <h3 className="font-display text-xl font-semibold text-ink-800">
              No hotels on Roomeo yet
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              Be the first owner to list a property.
            </p>
            <Link
              to="/register"
              className="mt-5 inline-block rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
            >
              List your hotel
            </Link>
          </div>
        )}

        {!loading && featured.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
