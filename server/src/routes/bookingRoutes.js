const express = require("express");

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new booking
router.post("/", protect, createBooking);

// Get logged-in user's bookings
router.get("/my", protect, getMyBookings);

// Get a booking by ID
router.get("/:id", protect, getBookingById);

// Cancel a booking
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;