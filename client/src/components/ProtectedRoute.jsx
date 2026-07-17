import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

/**
 * Wraps any route that needs a logged-in user. Pass `ownerOnly` for routes
 * that should 403 non-owners client-side before they even hit the backend's
 * roleMiddleware (which would reject them anyway, but this gives a cleaner
 * UX than a failed API call).
 */
const ProtectedRoute = ({ children, ownerOnly = false }) => {
  const { isAuthenticated, isOwner, authLoading } = useApp();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-brass-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (ownerOnly && !isOwner) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
