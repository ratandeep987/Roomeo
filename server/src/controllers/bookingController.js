const Booking = require("../models/Booking");
const Room = require("../models/Room");

const createBooking = async (req, res) => {
  try {
    // 1. Read request data
    const { roomId, checkInDate, checkOutDate } = req.body;
    // 2. Validate required fields
    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    // 3. Find room
    const room = await Room.findById(roomId);
    // 4. Check if room exists
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    // 5. Convert dates into JavaScript Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    // 6. Validate dates
    if (checkOut <= checkIn) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }
    // 7. Check for overlapping bookings
    const existingBooking = await Booking.findOne({
      room: roomId,
      status: {
        $ne: "cancelled",
      },
      checkInDate: {
        $lt: checkOut,
      },
      checkOutDate: {
        $gt: checkIn,
      },
    });
    // 8. If overlapping booking exists
    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "Room is already booked for the selected dates",
      });
    }
    // 9. Calculate number of nights
    const nights =
      Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    // 10. Calculate total price
    const totalPrice = nights * room.price;
    // 11. Create booking
    const booking = await Booking.create({
      user: req.user.id,
      room: roomId,
      checkInDate,
      checkOutDate,
      totalPrice,
      status: "confirmed",
    });
    // 12. Return success response
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyBookings = async (req, res) => {
  try {
    // Write the logic here
    const bookings = await Booking.find({ user: req.user.id }).populate("room","roomNumber type price hotel");
   
   res.status(200).json({
    success: true,
    count: bookings.length,
    bookings,
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const cancelBooking = async (req, res) => {
  try {
    // 1. Find booking
    const booking = await Booking.findById(req.params.id);
    // 2. Check if booking exists
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    // 3. Check ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    // 4. Check if booking is already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }
    // 5. Check if check-in has already started
    if (new Date() >= booking.checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel booking after check-in",
      });
    }
    // 6. Update booking status
    booking.status = "cancelled";
    // 7. Save changes
    await booking.save();
    // 8. Return success
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("room", "roomNumber type price hotel")
      .populate("user", "name email");
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    if (booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getBookingById,
};