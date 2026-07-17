import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block rounded-tag px-3.5 py-2.5 text-sm font-medium transition-colors ${
    isActive
      ? "bg-ink-800 text-paper"
      : "text-ink-600 hover:bg-ink-50 hover:text-ink-800"
  }`;

/**
 * Shared shell for every /owner/* route: a sidebar (Dashboard, My Hotels,
 * List a hotel) plus an Outlet for the active page. Keeps owner-only
 * navigation in one place instead of repeating it per page.
 */
const OwnerLayout = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <span className="key-tag mb-3 inline-flex">Owner tools</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink-800">
          Manage your properties
        </h1>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-56 lg:shrink-0">
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            <NavLink to="/owner/dashboard" className={linkClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/owner/hotels" className={linkClass}>
              My Hotels
            </NavLink>
            <NavLink to="/owner/hotels/new" className={linkClass}>
              List a hotel
            </NavLink>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OwnerLayout;
