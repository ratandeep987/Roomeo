import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-brass-600" : "text-ink-500 hover:text-ink-800"
  }`;

const Navbar = () => {
  const { user, isAuthenticated, isOwner, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-tag bg-ink-800 font-mono text-xs font-semibold text-brass-300">
            R
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink-800">
            Roomeo
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/hotels" className={navLinkClass}>
            Hotels
          </NavLink>
          {isAuthenticated && !isOwner && (
            <NavLink to="/my-bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
          )}
          {isOwner && (
            <>
              <NavLink to="/owner/dashboard" className={navLinkClass}>
                Owner Dashboard
              </NavLink>
              <NavLink to="/owner/hotels" className={navLinkClass}>
                My Hotels
              </NavLink>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-ink-500">
                Hi, <span className="font-medium text-ink-800">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="rounded-tag border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-ink-800 hover:text-ink-900"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink-700 hover:text-ink-900"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-tag bg-ink-800 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink-700"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-tag border border-ink-200 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-ink-800" />
            <span className="block h-0.5 w-5 bg-ink-800" />
            <span className="block h-0.5 w-5 bg-ink-800" />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-ink-100 bg-paper px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/hotels" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Hotels
            </NavLink>
            {isAuthenticated && !isOwner && (
              <NavLink
                to="/my-bookings"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                My Bookings
              </NavLink>
            )}
            {isOwner && (
              <>
                <NavLink
                  to="/owner/dashboard"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Owner Dashboard
                </NavLink>
                <NavLink
                  to="/owner/hotels"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  My Hotels
                </NavLink>
              </>
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-ink-100 pt-3">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="rounded-tag border border-ink-200 px-4 py-2 text-left text-sm font-medium text-ink-700"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm font-medium text-ink-700"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-tag bg-ink-800 px-4 py-2 text-center text-sm font-medium text-paper"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
