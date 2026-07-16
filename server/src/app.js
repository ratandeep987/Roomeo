const express = require("express");

const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log("=================================");
  console.log("METHOD :", req.method);
  console.log("URL    :", req.originalUrl);
  console.log("BODY   :", req.body);
  console.log("=================================");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/owners", ownerRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Roomeo API");
});

module.exports = app;