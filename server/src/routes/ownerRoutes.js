const express = require("express");

const { getDashboard } = require("../controllers/ownerController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("owner"),
  getDashboard
);

module.exports = router;