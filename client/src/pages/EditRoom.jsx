import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getRoomById, updateRoom } from "../services/api";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [backTo, setBackTo] = useState("/owner/hotels");

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      setLoadError("");
      try {
        const { data } = await getRoomById(id);
        const room = data.room;
        setForm({
          roomNumber: room.roomNumber,
          type: room.type,
          price: room.price,
          capacity: room.capacity,
          description: room.description || "",
          isAvailable: room.isAvailable,
        });
        setBackTo(`/owner/hotels/${room.hotel}/rooms`);
      } catch (err) {
        setLoadError(
          err.response?.data?.message || "Couldn't load this room."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateRoom(id, {
        roomNumber: form.roomNumber,
        type: form.type,
        price: Number(form.price),
        capacity: Number(form.capacity),
        description: form.description,
        isAvailable: form.isAvailable,
      });
      toast.success("Room updated");
      navigate(backTo);
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't update this room.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="h-96 max-w-xl animate-pulse rounded-lg bg-ink-50" />;
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-rust-100 bg-rust-50 px-5 py-8 text-center">
        <p className="text-sm font-medium text-rust-700">{loadError}</p>
      </div>
    );
  }

  return (
    <div>
      <Link to={backTo} className="text-sm font-medium text-ink-500 hover:text-ink-800">
        ← Back to rooms
      </Link>

      <h2 className="mb-6 mt-3 font-display text-2xl font-semibold text-ink-800">
        Edit room
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl rounded-lg border border-ink-100 bg-white p-6 shadow-card sm:p-8"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="roomNumber"
                className="mb-1.5 block text-sm font-medium text-ink-700"
              >
                Room number
              </label>
              <input
                id="roomNumber"
                name="roomNumber"
                type="text"
                required
                value={form.roomNumber}
                onChange={handleChange}
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-brass-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="mb-1.5 block text-sm font-medium text-ink-700">
                Room type
              </label>
              <input
                id="type"
                name="type"
                type="text"
                required
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-brass-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-ink-700">
                Price per night (₹)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                required
                min={0}
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-brass-500"
              />
            </div>
            <div>
              <label
                htmlFor="capacity"
                className="mb-1.5 block text-sm font-medium text-ink-700"
              >
                Capacity (guests)
              </label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                required
                min={1}
                value={form.capacity}
                onChange={handleChange}
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-brass-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-medium text-ink-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-brass-500"
            />
          </div>

          <label className="flex items-center gap-2.5 text-sm text-ink-700">
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              className="h-4 w-4 rounded border-ink-300 text-brass-500 focus:ring-brass-500"
            />
            Room is available for booking
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 rounded-tag bg-ink-800 px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default EditRoom;
