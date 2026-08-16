import { Link } from "react-router-dom";
import { getImageForId } from "../utils/getImageForId";
import guestsIcon from "../assets/guestsIcon.svg";

const RoomCard = ({ room, style }) => {
  return (
    <div
      style={style}
      className="group flex animate-fade-up flex-col gap-5 overflow-hidden rounded-xl border border-ink-100 bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-lift sm:flex-row sm:items-center"
    >
      <div className="h-36 w-full shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-36">
        <img
          src={getImageForId(room._id, 7)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
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
          <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-400">
            <img
              src={guestsIcon}
              alt=""
              className="h-3.5 w-3.5 [filter:brightness(0)] opacity-50"
            />
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
            className={`rounded-tag px-5 py-2 text-sm font-medium transition-all duration-200 ${
              room.isAvailable
                ? "bg-ink-800 text-paper hover:-translate-y-0.5 hover:bg-ink-700 hover:shadow-lift"
                : "pointer-events-none bg-ink-100 text-ink-300"
            }`}
          >
            Book this room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
