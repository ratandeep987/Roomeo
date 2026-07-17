import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cancelBooking, getHotelById, getMyBookings } from "../services/api";
import { BOOKING_STATUS } from "../utils/constants";

const statusStyles = {
  [BOOKING_STATUS.CONFIRMED]: "bg-sage-100 text-sage-700",
  [BOOKING_STATUS.PENDING]: "bg-brass-100 text-brass-700",
  [BOOKING_STATUS.CANCELLED]: "bg-ink-100 text-ink-500",
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  // room.hotel on a populated booking is only an ObjectId (the backend
  // populates room with "roomNumber type price hotel", not the hotel
  // document itself) — so hotel names are fetched separately and cached
  // by id here rather than invented or omitted.
  const [hotelsById, setHotelsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getMyBookings();
      setBookings(data.bookings);

      const hotelIds = [
        ...new Set(
          data.bookings.map((b) => b.room?.hotel).filter(Boolean)
        ),
      ];
      const results = await Promise.allSettled(
        hotelIds.map((hid) => getHotelById(hid))
      );
      const map = {};
      results.forEach((res, i) => {
        if (res.status === "fulfilled") {
          map[hotelIds[i]] = res.value.data.hotel;
        }
      });
      setHotelsById(map);
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't load your bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    setCancellingId(bookingId);
    try {
      const { data } = await cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? data.booking : b))
      );
      toast.success("Booking cancelled");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't cancel this booking.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <span className="key-tag mb-4 inline-flex">
        {loading ? "Loading" : `${bookings.length} ${bookings.length === 1 ? "booking" : "bookings"}`}
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink-800">
        My bookings
      </h1>

      {loading && (
        <div className="mt-8 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-ink-50" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-8 rounded-lg border border-rust-100 bg-rust-50 px-5 py-8 text-center">
          <p className="text-sm font-medium text-rust-700">{error}</p>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="mt-8 rounded-lg border border-ink-100 bg-white px-5 py-16 text-center shadow-card">
          <span className="key-tag mb-4 inline-flex">Nothing booked yet</span>
          <h3 className="font-display text-xl font-semibold text-ink-800">
            No bookings yet
          </h3>
          <p className="mt-2 text-sm text-ink-500">
            Once you book a room, it'll show up here.
          </p>
          <Link
            to="/hotels"
            className="mt-5 inline-block rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
          >
            Browse hotels
          </Link>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="mt-8 space-y-4">
          {bookings.map((booking) => {
            const hotel = hotelsById[booking.room?.hotel];
            const canCancel =
              booking.status !== BOOKING_STATUS.CANCELLED &&
              new Date() < new Date(booking.checkInDate);

            return (
              <div
                key={booking._id}
                className="flex flex-col justify-between gap-4 rounded-lg border border-ink-100 bg-white p-5 shadow-card sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-ink-800">
                      {hotel ? hotel.name : booking.room?.type || "Room"}
                    </h3>
                    <span
                      className={`rounded-tag px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  {hotel && (
                    <p className="font-mono text-xs uppercase tracking-wide text-ink-400">
                      {hotel.city}, {hotel.country}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-ink-600">
                    {booking.room?.type} · Room {booking.room?.roomNumber}
                  </p>
                  <p className="mt-1 text-sm text-ink-500">
                    {formatDate(booking.checkInDate)} → {formatDate(booking.checkOutDate)}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <p className="font-mono text-lg font-semibold text-ink-800">
                    ₹{booking.totalPrice}
                  </p>
                  {canCancel ? (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancellingId === booking._id}
                      className="rounded-tag border border-rust-500 px-4 py-1.5 text-sm font-medium text-rust-500 transition-colors hover:bg-rust-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {cancellingId === booking._id ? "Cancelling…" : "Cancel"}
                    </button>
                  ) : booking.status !== BOOKING_STATUS.CANCELLED ? (
                    <span className="text-xs text-ink-400">
                      Check-in has passed
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
