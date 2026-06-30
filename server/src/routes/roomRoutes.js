const express = require("express");

const {
  createRoom,
  getRoomsByHotel,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Public Routes
router.get("/hotel/:hotelId", getRoomsByHotel);
router.get("/:id", getRoomById);

// Protected Routes
router.post(
  "/",
  protect,
  authorize("owner"),
  createRoom
);

router.put(
  "/:id",
  protect,
  authorize("owner"),
  updateRoom
);

router.delete(
  "/:id",
  protect,
  authorize("owner"),
  deleteRoom
);

module.exports = router;