import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useApp } from "../context/AppContext";
import { ROLES } from "../utils/constants";

const Register = () => {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ROLES.USER,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(form);
      toast.success("Account created — sign in to continue");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <span className="key-tag mb-4 inline-flex">New here</span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink-800">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Book stays, or list a hotel of your own.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-ink-100 bg-white p-6 shadow-card sm:p-8"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-700">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Jordan Lee"
              className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-ink-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full rounded-tag border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
            />
          </div>

          <div>
            <span className="mb-1.5 block text-sm font-medium text-ink-700">
              I'm signing up as
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: ROLES.USER, label: "A guest", hint: "Book stays" },
                { value: ROLES.OWNER, label: "A hotel owner", hint: "List rooms" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-tag border px-3.5 py-2.5 text-sm transition-colors ${
                    form.role === option.value
                      ? "border-brass-500 bg-brass-50 text-ink-800"
                      : "border-ink-200 text-ink-600 hover:border-ink-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={form.role === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="block font-medium">{option.label}</span>
                  <span className="block text-xs text-ink-400">{option.hint}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-tag bg-ink-800 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>

        <p className="mt-5 text-center text-sm text-ink-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brass-600 hover:text-brass-700">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
