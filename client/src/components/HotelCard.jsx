import { Link } from "react-router-dom";
import { getImageForId } from "../utils/getImageForId";
import locationIcon from "../assets/locationFilledIcon.svg";
import arrowIcon from "../assets/arrowIcon.svg";

const HotelCard = ({ hotel, style }) => {
  return (
    <Link
      to={`/hotels/${hotel._id}`}
      style={style}
      className="group flex animate-fade-up flex-col overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageForId(hotel._id)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/0 to-transparent" />
        <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 font-display text-sm font-semibold text-ink-800 shadow-card backdrop-blur">
          {hotel.name?.charAt(0)?.toUpperCase() || "H"}
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs font-medium text-white">
          <img
            src={locationIcon}
            alt=""
            className="h-3.5 w-3.5 [filter:brightness(0)_invert(1)]"
          />
          {hotel.city}, {hotel.country}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink-800 transition-colors group-hover:text-brass-700">
          {hotel.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-500">{hotel.description}</p>
        <p className="mt-3 truncate text-xs text-ink-400">{hotel.address}</p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brass-600 transition-colors group-hover:text-brass-700">
          View rooms
          <img
            src={arrowIcon}
            alt=""
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
};

export default HotelCard;
