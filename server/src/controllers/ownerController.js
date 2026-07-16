const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Booking = require("../models/booking");

const getDashboard = async (req, res) => {
  try {
    // 1. Find owner's hotels
    const hotels = await Hotel.find({
      owner: req.user.id,
    });

    // 2. Extract hotel IDs
    const hotelIds = hotels.map((hotel) => hotel._id);

    // 3. Find all rooms of owner's hotels
    const rooms = await Room.find({
      hotel: {
        $in: hotelIds,
      },
    });
    // 4. Extract room IDs
    const roomIds = rooms.map((room) => room._id);
    // 5. Find all bookings of owner's rooms
    const bookings = await Booking.find({
      room: {
        $in: roomIds,
      },
      status: {
        $ne: "cancelled",
      },
    });
    // 6. Dashboard statistics
    const totalHotels = hotels.length;
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(
      (room) => room.isAvailable
    ).length;
    const bookedRooms = totalRooms - availableRooms;

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0
    );
    // 7. Send response
    res.status(200).json({
      success: true,
      dashboard: {
        totalHotels,
        totalRooms,
        availableRooms,
        bookedRooms,
        totalBookings,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};