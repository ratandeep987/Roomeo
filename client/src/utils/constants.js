// LocalStorage keys — centralized so AppContext and api.js never drift apart.
export const TOKEN_KEY = "roomeo_token";
export const USER_KEY = "roomeo_user";

export const ROLES = {
  USER: "user",
  OWNER: "owner",
  ADMIN: "admin",
};

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
};
