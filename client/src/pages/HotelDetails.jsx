import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHotelById, getRoomsByHotel } from "../services/api";
import { getImageForId } from "../utils/getImageForId";
import RoomCard from "../components/RoomCard";
import locationIcon from "../assets/locationFilledIcon.svg";
import arrowIcon from "../assets/arrowIcon.svg";

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
        <div className="h-64 animate-pulse rounded-xl bg-ink-50" />
        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-ink-50" />
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
          className="mt-5 rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-ink-700"
        >
          Back to hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link
        to="/hotels"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-800"
      >
        <img src={arrowIcon} alt="" className="h-3 w-3 rotate-180" />
        Back to hotels
      </Link>

      <div className="mt-4 animate-fade-up overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card">
        <div className="relative h-56 sm:h-72">
          <img
            src={getImageForId(hotel._id)}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6 text-paper">
            <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-brass-300">
              <img
                src={locationIcon}
                alt=""
                className="h-3.5 w-3.5 [filter:brightness(0)_invert(1)]"
              />
              {hotel.city}, {hotel.country}
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold sm:text-4xl">
              {hotel.name}
            </h1>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-ink-600">{hotel.description}</p>
          <p className="mt-3 text-sm text-ink-400">{hotel.address}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink-800">Rooms</h2>

        {rooms.length === 0 ? (
          <div className="mt-4 rounded-xl border border-ink-100 bg-white px-5 py-12 text-center shadow-card">
            <span className="key-tag mb-4 inline-flex">No rooms yet</span>
            <p className="text-sm text-ink-500">
              This hotel hasn't listed any rooms yet.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {rooms.map((room, i) => (
              <RoomCard
                key={room._id}
                room={room}
                style={{ animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
