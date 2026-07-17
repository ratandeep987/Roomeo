import axios from "axios";
import { TOKEN_KEY } from "../utils/constants";

/**
 * Single Axios instance for the whole app.
 * baseURL is "/api" so Vite's dev proxy (see vite.config.js) forwards
 * requests to the Express server — no hardcoded backend URL needed.
 */
const api = axios.create({
  baseURL: "/api",
});

// Attach the JWT to every request, as your authMiddleware expects:
// `Authorization: Bearer <token>`
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever says the token is invalid/expired, clear it so the
// UI doesn't stay stuck in a false "logged in" state.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("roomeo_user");
    }
    return Promise.reject(error);
  }
);

/* ------------------------------------------------------------------ */
/* Auth — POST /api/auth/register, POST /api/auth/login,               */
/* GET /api/auth/profile                                               */
/* ------------------------------------------------------------------ */
export const registerUser = (payload) => api.post("/auth/register", payload);
export const loginUser = (payload) => api.post("/auth/login", payload);
export const getProfile = () => api.get("/auth/profile");

/* ------------------------------------------------------------------ */
/* Hotels — GET /api/hotels, GET /api/hotels/my-hotels,                */
/* GET /api/hotels/:id, POST /api/hotels                               */
/* ------------------------------------------------------------------ */
export const getAllHotels = () => api.get("/hotels");
export const getMyHotels = () => api.get("/hotels/my-hotels");
export const getHotelById = (id) => api.get(`/hotels/${id}`);
export const createHotel = (payload) => api.post("/hotels", payload);

/* ------------------------------------------------------------------ */
/* Rooms — GET /api/rooms/hotel/:hotelId, GET /api/rooms/:id,          */
/* POST /api/rooms, PUT /api/rooms/:id, DELETE /api/rooms/:id          */
/* Note: createRoom expects `hotelId` in the body (not `hotel`).       */
/* ------------------------------------------------------------------ */
export const getRoomsByHotel = (hotelId) => api.get(`/rooms/hotel/${hotelId}`);
export const getRoomById = (id) => api.get(`/rooms/${id}`);
export const createRoom = (payload) => api.post("/rooms", payload);
export const updateRoom = (id, payload) => api.put(`/rooms/${id}`, payload);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);

/* ------------------------------------------------------------------ */
/* Bookings — POST /api/bookings, GET /api/bookings/my,                */
/* GET /api/bookings/:id, PUT /api/bookings/:id/cancel                 */
/* ------------------------------------------------------------------ */
export const createBooking = (payload) => api.post("/bookings", payload);
export const getMyBookings = () => api.get("/bookings/my");
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

/* ------------------------------------------------------------------ */
/* Owner dashboard — GET /api/owners/dashboard                         */
/* (Not /api/auth/owner-dashboard — that route only returns a welcome  */
/* message with no stats.)                                             */
/* ------------------------------------------------------------------ */
export const getOwnerDashboard = () => api.get("/owners/dashboard");

export default api;
