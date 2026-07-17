import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHotelById, getRoomsByHotel } from "../services/api";
import RoomCard from "../components/RoomCard";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [hotelRes, roomsRes] = await Promise.all([
          getHotelById(id),
          getRoomsByHotel(id),
        ]);
        setHotel(hotelRes.data.hotel);
        setRooms(roomsRes.data.rooms);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Hotel not found."
            : err.response?.data?.message || "Couldn't load this hotel."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="h-40 animate-pulse rounded-lg bg-ink-50" />
        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-ink-50" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-800">{error}</h1>
        <Link
          to="/hotels"
          className="mt-5 rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
        >
          Back to hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link to="/hotels" className="text-sm font-medium text-ink-500 hover:text-ink-800">
        ← Back to hotels
      </Link>

      <div className="mt-4 flex flex-col gap-6 rounded-lg border border-ink-100 bg-white p-6 shadow-card sm:flex-row sm:items-start sm:p-8">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-ink-800">
          <span className="font-display text-3xl font-semibold text-brass-300">
            {hotel.name?.charAt(0)?.toUpperCase() || "H"}
          </span>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-brass-600">
            {hotel.city}, {hotel.country}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink-800">
            {hotel.name}
          </h1>
          <p className="mt-3 text-ink-600">{hotel.description}</p>
          <p className="mt-3 text-sm text-ink-400">{hotel.address}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink-800">Rooms</h2>

        {rooms.length === 0 ? (
          <div className="mt-4 rounded-lg border border-ink-100 bg-white px-5 py-12 text-center shadow-card">
            <span className="key-tag mb-4 inline-flex">No rooms yet</span>
            <p className="text-sm text-ink-500">
              This hotel hasn't listed any rooms yet.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
