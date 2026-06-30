const express = require("express");

const {
  createHotel,
  getAllHotels,
  getHotelById,
  getMyHotels,
} = require("../controllers/hotelController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getAllHotels);

router.get(
  "/my-hotels",
  protect,
  authorize("owner"),
  getMyHotels
);

router.get("/:id", getHotelById);

router.post(
  "/",
  protect,
  authorize("owner"),
  createHotel
);

module.exports = router;