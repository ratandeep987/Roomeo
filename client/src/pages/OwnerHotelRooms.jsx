import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteRoom, getHotelById, getRoomsByHotel } from "../services/api";

const OwnerHotelRooms = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [hotelRes, roomsRes] = await Promise.all([
        getHotelById(hotelId),
        getRoomsByHotel(hotelId),
      ]);
      setHotel(hotelRes.data.hotel);
      setRooms(roomsRes.data.rooms);
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't load this hotel's rooms.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelId]);

  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room? This can't be undone.")) return;
    setDeletingId(roomId);
    try {
      await deleteRoom(roomId);
      setRooms((prev) => prev.filter((r) => r._id !== roomId));
      toast.success("Room deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete this room.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-ink-50" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-ink-50" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rust-100 bg-rust-50 px-5 py-8 text-center">
        <p className="text-sm font-medium text-rust-700">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/owner/hotels"
        className="text-sm font-medium text-ink-500 hover:text-ink-800"
      >
        ← My hotels
      </Link>

      <div className="mb-6 mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink-800">
            {hotel.name}
          </h2>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-400">
            {hotel.city}, {hotel.country}
          </p>
        </div>
        <Link
          to={`/owner/hotels/${hotelId}/rooms/new`}
          className="rounded-tag bg-ink-800 px-4 py-2 text-sm font-medium text-paper hover:bg-ink-700"
        >
          + Add room
        </Link>
      </div>

      {rooms.length === 0 ? (
        <div className="rounded-lg border border-ink-100 bg-white px-5 py-16 text-center shadow-card">
          <span className="key-tag mb-4 inline-flex">No rooms yet</span>
          <h3 className="font-display text-xl font-semibold text-ink-800">
            Add your first room
          </h3>
          <p className="mt-2 text-sm text-ink-500">
            Guests can only book rooms you've added here.
          </p>
          <Link
            to={`/owner/hotels/${hotelId}/rooms/new`}
            className="mt-5 inline-block rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
          >
            Add room
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col justify-between gap-4 rounded-lg border border-ink-100 bg-white p-5 shadow-card sm:flex-row sm:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-display text-lg font-semibold text-ink-800">
                    {room.type}
                  </h4>
                  <span className="key-tag">Room {room.roomNumber}</span>
                  {room.isAvailable ? (
                    <span className="rounded-tag bg-sage-100 px-2 py-0.5 text-xs font-medium text-sage-700">
                      Available
                    </span>
                  ) : (
                    <span className="rounded-tag bg-rust-100 px-2 py-0.5 text-xs font-medium text-rust-700">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-500">
                  ₹{room.price} / night · Sleeps {room.capacity}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/owner/rooms/${room._id}/edit`}
                  className="rounded-tag border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 hover:border-ink-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(room._id)}
                  disabled={deletingId === room._id}
                  className="rounded-tag border border-rust-500 px-4 py-2 text-sm font-medium text-rust-500 hover:bg-rust-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === room._id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerHotelRooms;
