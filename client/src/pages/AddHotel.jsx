import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createHotel } from "../services/api";

const emptyForm = { name: "", description: "", address: "", city: "", country: "" };

const AddHotel = () => {
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
      await createHotel(form);
      toast.success("Hotel listed successfully");
      navigate("/owner/hotels");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't create this hotel.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-semibold text-ink-800">
        List a new hotel
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl rounded-lg border border-ink-100 bg-white p-6 shadow-card sm:p-8"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
              Hotel name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="The Riverside Inn"
              className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
            />
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
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Tell guests what makes this place worth staying at."
              className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-ink-700">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={form.address}
              onChange={handleChange}
              placeholder="12 Marina Road"
              className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-ink-700">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={form.city}
                onChange={handleChange}
                placeholder="Goa"
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
              />
            </div>
            <div>
              <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-ink-700">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                value={form.country}
                onChange={handleChange}
                placeholder="India"
                className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 rounded-tag bg-ink-800 px-6 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Listing…" : "List hotel"}
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
