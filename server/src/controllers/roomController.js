const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const createRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      type,
      price,
      capacity,
      description,
      hotelId,
    } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }
    if (hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    const room = await Room.create({
      roomNumber,
      type,
      price,
      capacity,
      description,
      hotel: hotelId,
    });
    res.status(201).json({
      success: true,
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await Room.find({
      hotel: req.params.hotelId,
    });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateRoom = async (req, res) => {
  try {
    // Find the room
    const room = await Room.findById(req.params.id);
    // Check if room exists
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    // Find the hotel associated with the room
    const hotel = await Hotel.findById(room.hotel);
    // Check if logged-in owner owns this hotel
    if (hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    // Update the room
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    // Return success response
    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    // Find room
        const room = await Room.findById(req.params.id);
    // If room doesn't exist
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    // Find hotel
    const hotel = await Hotel.findById(room.hotel);
    // Check ownership
    if (hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    // Delete room
    await Room.findByIdAndDelete(req.params.id);
    // Return success
    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    // Return 500
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createRoom,
  getRoomsByHotel,
  getRoomById,
  updateRoom, 
  deleteRoom,
};
