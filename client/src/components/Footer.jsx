import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-ink-100 bg-ink-800 text-ink-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-tag bg-brass-500 font-mono text-xs font-semibold text-ink-900">
                R
              </span>
              <span className="font-display text-xl font-semibold text-paper">
                Roomeo
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-300">
              Book rooms directly from the hotels that run them. No middleman
              markup, no fine print.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wide text-brass-300">
                Explore
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/hotels" className="text-ink-200 hover:text-paper">
                    All hotels
                  </Link>
                </li>
                <li>
                  <Link to="/my-bookings" className="text-ink-200 hover:text-paper">
                    My bookings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wide text-brass-300">
                Owners
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/register" className="text-ink-200 hover:text-paper">
                    List your hotel
                  </Link>
                </li>
                <li>
                  <Link
                    to="/owner/dashboard"
                    className="text-ink-200 hover:text-paper"
                  >
                    Owner dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wide text-brass-300">
                Account
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="/login" className="text-ink-200 hover:text-paper">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-ink-200 hover:text-paper">
                    Create account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-700 pt-6 text-xs text-ink-400">
          © {new Date().getFullYear()} Roomeo. Built for travelers and hosts.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
