import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createRoom } from "../services/api";

const emptyForm = { roomNumber: "", type: "", price: "", capacity: "", description: "" };

const AddRoom = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Backend's createRoom controller reads `hotelId` off the body.
      await createRoom({
        roomNumber: form.roomNumber,
        type: form.type,
        price: Number(form.price),
        capacity: Number(form.capacity),
        description: form.description,
        hotelId,
      });
      toast.success("Room added");
      navigate(`/owner/hotels/${hotelId}/rooms`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't add this room.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Link
        to={`/owner/hotels/${hotelId}/rooms`}
        className="text-sm font-medium text-ink-500 hover:text-ink-800"
      >
        ← Back to rooms
      </Link>

      <h2 className="mb-6 mt-3 font-display text-2xl font-semibold text-ink-800">
        Add a room
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
                placeholder="204"
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
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
                placeholder="Deluxe Double"
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
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
                placeholder="2500"
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
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
                placeholder="2"
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-medium text-ink-700"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="King bed, balcony, sea view…"
              className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 rounded-tag bg-ink-800 px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Adding…" : "Add room"}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
