import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOwnerDashboard } from "../services/api";
import dashboardIcon from "../assets/dashboardIcon.svg";
import listIcon from "../assets/listIcon.svg";
import guestsIcon from "../assets/guestsIcon.svg";
import totalBookingIcon from "../assets/totalBookingIcon.svg";
import totalRevenueIcon from "../assets/totalRevenueIcon.svg";
import badgeIcon from "../assets/badgeIcon.svg";

const StatCard = ({ label, value, icon, accent = false, style }) => (
  <div
    style={style}
    className="flex animate-fade-up items-start gap-4 rounded-xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
  >
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
        accent ? "bg-brass-500" : "bg-ink-50"
      }`}
    >
      <img
        src={icon}
        alt=""
        className={`h-5 w-5 ${
          accent
            ? "[filter:brightness(0)_invert(1)]"
            : "[filter:brightness(0)] opacity-60"
        }`}
      />
    </span>
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-ink-400">{label}</p>
      <p
        className={`mt-1 font-display text-2xl font-semibold ${
          accent ? "text-brass-600" : "text-ink-800"
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

const OwnerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getOwnerDashboard();
        setDashboard(data.dashboard);
      } catch (err) {
        setError(
          err.response?.data?.message || "Couldn't load your dashboard."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-ink-50" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rust-100 bg-rust-50 px-5 py-8 text-center">
        <p className="text-sm font-medium text-rust-700">{error}</p>
      </div>
    );
  }

  if (dashboard.totalHotels === 0) {
    return (
      <div className="rounded-xl border border-ink-100 bg-white px-5 py-16 text-center shadow-card">
        <span className="key-tag mb-4 inline-flex">Get started</span>
        <h3 className="font-display text-xl font-semibold text-ink-800">
          List your first hotel
        </h3>
        <p className="mt-2 text-sm text-ink-500">
          Your dashboard fills in once you have a hotel with rooms.
        </p>
        <Link
          to="/owner/hotels/new"
          className="mt-5 inline-block rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-ink-700"
        >
          List a hotel
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <StatCard label="Hotels" value={dashboard.totalHotels} icon={badgeIcon} style={{ animationDelay: "0ms" }} />
      <StatCard label="Total rooms" value={dashboard.totalRooms} icon={listIcon} style={{ animationDelay: "60ms" }} />
      <StatCard label="Available rooms" value={dashboard.availableRooms} icon={dashboardIcon} style={{ animationDelay: "120ms" }} />
      <StatCard label="Booked rooms" value={dashboard.bookedRooms} icon={guestsIcon} style={{ animationDelay: "180ms" }} />
      <StatCard label="Active bookings" value={dashboard.totalBookings} icon={totalBookingIcon} style={{ animationDelay: "240ms" }} />
      <StatCard
        label="Revenue"
        value={`₹${dashboard.totalRevenue}`}
        icon={totalRevenueIcon}
        accent
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
};

export default OwnerDashboard;
