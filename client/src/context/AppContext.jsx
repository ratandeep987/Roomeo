import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../services/api";
import { TOKEN_KEY, USER_KEY } from "../utils/constants";

const AppContext = createContext(null);

/**
 * Why this exists:
 * Almost every page (Navbar, ProtectedRoute, MyBookings, OwnerDashboard...)
 * needs to know "who is logged in and what's their role". Rather than each
 * page re-reading localStorage and re-implementing login/logout, this
 * context owns that state once and exposes it app-wide.
 *
 * Important backend-shaped detail: GET /api/auth/profile only returns the
 * JWT payload ({id, role, iat, exp}) — it does NOT include name or email.
 * So we can't "refresh" the user's name/email from the server. The full
 * user object (id, name, email, role) is only ever returned by
 * POST /api/auth/login, so that's what we persist and treat as the source
 * of truth for display purposes.
 */
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Hydrate from localStorage on first load so refreshing the page doesn't
  // log the user out.
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    const { data } = await loginUser({ email, password });
    // Backend shape: { success, message, token, user: {id,name,email,role} }
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async ({ name, email, password, role }) => {
    // Backend shape: { success, message, user }. Registration does NOT
    // return a token, so we don't log the user in automatically — they're
    // sent to the login page after registering.
    const { data } = await registerUser({ name, email, password, role });
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    toast.success("Signed out");
  };

  const isAuthenticated = Boolean(user);
  const isOwner = user?.role === "owner";

  return (
    <AppContext.Provider
      value={{
        user,
        authLoading,
        isAuthenticated,
        isOwner,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
};
