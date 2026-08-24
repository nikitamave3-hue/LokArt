const Artist = require("../models/artistmodels");

// Create Artist
const createArtist = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);

    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Artists
const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find()
      .populate("user", "name email");

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Artist
const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)
      .populate("user", "name email");

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found",
      });
    }

    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Artist
const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found",
      });
    }

    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Artist
const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found",
      });
    }

    await artist.deleteOne();

    res.status(200).json({
      message: "Artist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createArtist,
  getArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};