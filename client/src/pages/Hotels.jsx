import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllHotels } from "../services/api";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Seed from ?q= so a search on the Home page carries over here.
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getAllHotels();
        setHotels(data.hotels);
      } catch (err) {
        setError(
          err.response?.data?.message || "Couldn't load hotels. Try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const filteredHotels = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hotels;
    return hotels.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q)
    );
  }, [hotels, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <span className="key-tag mb-4 inline-flex">
          {loading ? "Loading" : `${hotels.length} ${hotels.length === 1 ? "hotel" : "hotels"}`}
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink-800 sm:text-4xl">
          Browse hotels
        </h1>
        <p className="mt-2 max-w-xl text-ink-500">
          Every hotel listed directly by its owner. Search by city, country,
          or name.
        </p>
      </div>

      <div className="mb-8 max-w-md">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-lg border border-ink-100 bg-ink-50"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-rust-100 bg-rust-50 px-5 py-8 text-center">
          <p className="text-sm font-medium text-rust-700">{error}</p>
        </div>
      )}

      {!loading && !error && filteredHotels.length === 0 && (
        <div className="rounded-lg border border-ink-100 bg-white px-5 py-16 text-center shadow-card">
          <span className="key-tag mb-4 inline-flex">No results</span>
          <h3 className="font-display text-xl font-semibold text-ink-800">
            {hotels.length === 0 ? "No hotels listed yet" : "No hotels match your search"}
          </h3>
          <p className="mt-2 text-sm text-ink-500">
            {hotels.length === 0
              ? "Check back once an owner lists their first property."
              : "Try a different city or hotel name."}
          </p>
        </div>
      )}

      {!loading && !error && filteredHotels.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;
