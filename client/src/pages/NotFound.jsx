import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
    <span className="font-mono text-sm text-brass-600">404</span>
    <h1 className="mt-3 font-display text-3xl font-semibold text-ink-800">
      This room doesn't exist
    </h1>
    <p className="mt-2 text-sm text-ink-500">
      The page you're looking for has been moved, cancelled, or never booked.
    </p>
    <Link
      to="/"
      className="mt-6 rounded-tag bg-ink-800 px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-700"
    >
      Back to home
    </Link>
  </div>
);

export default NotFound;
