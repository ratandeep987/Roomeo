const Hotel = require("../models/hotel");

const createHotel = async (req, res) => {
  try {
    const { name, description, address, city, country } = req.body;

    const hotel = await Hotel.create({
      name,
      description,
      address,
      city,
      country,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json({
      success: true,
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({
      owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: hotels.length,
      hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  getMyHotels,
};