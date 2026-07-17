import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createBooking, getRoomById } from "../services/api";

const todayISO = () => new Date().toISOString().split("T")[0];

const addDaysISO = (isoDate, days) => {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const BookRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [checkInDate, setCheckInDate] = useState(todayISO());
  const [checkOutDate, setCheckOutDate] = useState(addDaysISO(todayISO(), 1));

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const { data } = await getRoomById(id);
        setRoom(data.room);
      } catch (err) {
        setLoadError(
          err.response?.status === 404
            ? "Room not found."
            : err.response?.data?.message || "Couldn't load this room."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  // Client-side preview only — mirrors the backend's nights * price
  // calculation (Math.ceil((checkOut - checkIn) / 1 day)) so the guest sees
  // an accurate estimate, but the server response's totalPrice is what
  // actually gets stored and is treated as authoritative.
  const nights = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 0;
    const inD = new Date(checkInDate);
    const outD = new Date(checkOutDate);
    const diff = Math.ceil((outD - inD) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkInDate, checkOutDate]);

  const estimatedTotal = room && nights > 0 ? nights * room.price : 0;

  const handleCheckInChange = (value) => {
    setCheckInDate(value);
    // Keep check-out valid (at least 1 night after new check-in)
    if (new Date(checkOutDate) <= new Date(value)) {
      setCheckOutDate(addDaysISO(value, 1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nights <= 0) {
      toast.error("Check-out date must be after check-in date");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await createBooking({
        roomId: id,
        checkInDate,
        checkOutDate,
      });
      toast.success("Booking confirmed");
      navigate("/my-bookings", { state: { newBookingId: data.booking?._id } });
    } catch (err) {
      const message =
        err.response?.data?.message || "Couldn't complete this booking.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <div className="h-72 animate-pulse rounded-lg bg-ink-50" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-800">{loadError}</h1>
        <Link
          to="/hotels"
          className="mt-5 rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
        >
          Back to hotels
        </Link>
      </div>
    );
  }

  if (!room.isAvailable) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink-800">
          This room isn't available right now
        </h1>
        <Link
          to={`/hotels/${room.hotel}`}
          className="mt-5 rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
        >
          Back to hotel
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <Link
        to={`/hotels/${room.hotel}`}
        className="text-sm font-medium text-ink-500 hover:text-ink-800"
      >
        ← Back to hotel
      </Link>

      <div className="mt-4 rounded-lg border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-display text-2xl font-semibold text-ink-800">
            {room.type}
          </h1>
          <span className="key-tag">Room {room.roomNumber}</span>
        </div>
        <p className="mt-1 text-sm text-ink-500">
          Sleeps up to {room.capacity} {room.capacity === 1 ? "guest" : "guests"} ·{" "}
          <span className="font-mono">₹{room.price} / night</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="checkInDate"
                className="mb-1.5 block text-sm font-medium text-ink-700"
              >
                Check-in
              </label>
              <input
                id="checkInDate"
                type="date"
                required
                min={todayISO()}
                value={checkInDate}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-brass-500"
              />
            </div>
            <div>
              <label
                htmlFor="checkOutDate"
                className="mb-1.5 block text-sm font-medium text-ink-700"
              >
                Check-out
              </label>
              <input
                id="checkOutDate"
                type="date"
                required
                min={addDaysISO(checkInDate, 1)}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-brass-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-tag bg-ink-50 px-4 py-3">
            <span className="text-sm text-ink-600">
              {nights > 0 ? `${nights} ${nights === 1 ? "night" : "nights"}` : "Select valid dates"}
            </span>
            <span className="font-mono text-lg font-semibold text-ink-800">
              ₹{estimatedTotal}
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting || nights <= 0}
            className="w-full rounded-tag bg-ink-800 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Confirming…" : "Confirm booking"}
          </button>
          <p className="text-center text-xs text-ink-400">
            The final total is calculated and confirmed by the server.
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookRoom;
