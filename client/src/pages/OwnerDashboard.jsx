import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOwnerDashboard } from "../services/api";

const StatCard = ({ label, value, accent = false }) => (
  <div className="rounded-lg border border-ink-100 bg-white p-5 shadow-card">
    <p className="font-mono text-xs uppercase tracking-wide text-ink-400">{label}</p>
    <p
      className={`mt-2 font-display text-3xl font-semibold ${
        accent ? "text-brass-600" : "text-ink-800"
      }`}
    >
      {value}
    </p>
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

  if (dashboard.totalHotels === 0) {
    return (
      <div className="rounded-lg border border-ink-100 bg-white px-5 py-16 text-center shadow-card">
        <span className="key-tag mb-4 inline-flex">Get started</span>
        <h3 className="font-display text-xl font-semibold text-ink-800">
          List your first hotel
        </h3>
        <p className="mt-2 text-sm text-ink-500">
          Your dashboard fills in once you have a hotel with rooms.
        </p>
        <Link
          to="/owner/hotels/new"
          className="mt-5 inline-block rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
        >
          List a hotel
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <StatCard label="Hotels" value={dashboard.totalHotels} />
      <StatCard label="Total rooms" value={dashboard.totalRooms} />
      <StatCard label="Available rooms" value={dashboard.availableRooms} />
      <StatCard label="Booked rooms" value={dashboard.bookedRooms} />
      <StatCard label="Active bookings" value={dashboard.totalBookings} />
      <StatCard label="Revenue" value={`₹${dashboard.totalRevenue}`} accent />
    </div>
  );
};

export default OwnerDashboard;
