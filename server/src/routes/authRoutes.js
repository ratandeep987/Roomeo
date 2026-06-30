const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
  ownerDashboard,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get(
  "/owner-dashboard",
  protect,
  authorize("owner"),
  ownerDashboard
);

module.exports = router;