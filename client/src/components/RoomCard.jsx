import { Link } from "react-router-dom";

/**
 * Displays one room from GET /api/rooms/hotel/:hotelId. The "Book this
 * room" link points at /rooms/:id/book, which is wired up to
 * POST /api/bookings in Feature 3.
 */
const RoomCard = ({ room }) => {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg border border-ink-100 bg-white p-5 shadow-card sm:flex-row sm:items-center">
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
        {room.description && (
          <p className="mt-2 max-w-md text-sm text-ink-500">{room.description}</p>
        )}
        <p className="mt-2 text-xs text-ink-400">
          Sleeps up to {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
        </p>
      </div>

      <div className="flex flex-col items-start gap-2 sm:items-end">
        <p className="font-mono text-xl font-semibold text-ink-800">
          ₹{room.price}
          <span className="text-sm font-normal text-ink-400"> / night</span>
        </p>
        <Link
          to={room.isAvailable ? `/rooms/${room._id}/book` : "#"}
          aria-disabled={!room.isAvailable}
          className={`rounded-tag px-5 py-2 text-sm font-medium transition-colors ${
            room.isAvailable
              ? "bg-ink-800 text-paper hover:bg-ink-700"
              : "pointer-events-none bg-ink-100 text-ink-300"
          }`}
        >
          Book this room
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
