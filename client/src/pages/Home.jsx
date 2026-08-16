import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllHotels } from "../services/api";
import HotelCard from "../components/HotelCard";
import SearchBar from "../components/SearchBar";
import heroImage from "../assets/heroImage.png";
import exclusiveOfferCardImg1 from "../assets/exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "../assets/exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "../assets/exclusiveOfferCardImg3.png";
import arrowIcon from "../assets/arrowIcon.svg";

const perks = [
  {
    image: exclusiveOfferCardImg1,
    title: "Book direct, pay less",
    body: "No booking-platform markup — your payment goes straight to the hotel that runs the place.",
  },
  {
    image: exclusiveOfferCardImg2,
    title: "Real owners, real answers",
    body: "Every listing is managed by the people who actually run it, not a call-center.",
  },
  {
    image: exclusiveOfferCardImg3,
    title: "Cancel with control",
    body: "Manage every booking yourself from My Bookings — no waiting on hold to change plans.",
  },
];

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
  const cityCount = useMemo(() => new Set(hotels.map((h) => h.city)).size, [hotels]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/hotels?q=${encodeURIComponent(query.trim())}` : "/hotels");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40" />
        <div className="absolute inset-0 bg-ink-900/20" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <span className="key-tag mb-6 inline-flex animate-fade-in">
            {loading
              ? "Loading listings"
              : `${hotels.length} hotels · ${cityCount} ${cityCount === 1 ? "city" : "cities"}`}
          </span>
          <h1 className="max-w-2xl animate-fade-up font-display text-4xl font-semibold leading-tight text-paper sm:text-5xl lg:text-6xl">
            Book directly with the people who run the place.
          </h1>
          <p
            className="mt-5 max-w-xl animate-fade-up text-ink-100"
            style={{ animationDelay: "100ms" }}
          >
            Roomeo connects you straight to independent hotels — no
            middleman markup, real rooms, real owners.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="mt-9 max-w-lg animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by city — try Jaipur, Goa, Manali…"
              variant="dark"
            />
          </form>

          <div
            className="mt-5 flex animate-fade-up gap-3"
            style={{ animationDelay: "250ms" }}
          >
            <Link
              to="/hotels"
              className="rounded-tag bg-brass-500 px-5 py-2.5 text-sm font-medium text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brass-400 hover:shadow-glow"
            >
              Browse all hotels
            </Link>
            <Link
              to="/register"
              className="rounded-tag border border-white/30 px-5 py-2.5 text-sm font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-brass-400 hover:bg-white/5"
            >
              List your hotel
            </Link>
          </div>
        </div>
      </section>

      {/* Why Roomeo */}
      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <span className="key-tag mb-3 inline-flex bg-brass-500 text-ink-900">
            Why Roomeo
          </span>
          <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold text-ink-800 sm:text-3xl">
            Booking a room shouldn't feel like a negotiation
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {perks.map((perk, i) => (
              <div
                key={perk.title}
                style={{ animationDelay: `${i * 100}ms` }}
                className="group animate-fade-up overflow-hidden rounded-xl border border-ink-100 shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={perk.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-ink-800">
                    {perk.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">{perk.body}</p>
                </div>
              </div>
            ))}
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
              className="hidden items-center gap-1.5 text-sm font-medium text-brass-600 transition-colors hover:text-brass-700 sm:inline-flex"
            >
              View all
              <img src={arrowIcon} alt="" className="h-3 w-3" />
            </Link>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-xl border border-ink-100 bg-ink-50"
              />
            ))}
          </div>
        )}

        {!loading && featured.length === 0 && (
          <div className="rounded-xl border border-ink-100 bg-white px-5 py-16 text-center shadow-card">
            <span className="key-tag mb-4 inline-flex">Nothing listed yet</span>
            <h3 className="font-display text-xl font-semibold text-ink-800">
              No hotels on Roomeo yet
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              Be the first owner to list a property.
            </p>
            <Link
              to="/register"
              className="mt-5 inline-block rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-ink-700"
            >
              List your hotel
            </Link>
          </div>
        )}

        {!loading && featured.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((hotel, i) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
