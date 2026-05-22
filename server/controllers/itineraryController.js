const Itinerary = require("../models/Itinerary");

// @desc    Get all itineraries for logged-in user
// @route   GET /api/itinerary
// @access  Private
const getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("-extractedData"); // Don't send raw extracted text in list

    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single itinerary by ID (owner only)
// @route   GET /api/itinerary/:id
// @access  Private
const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Toggle sharing on/off for an itinerary
// @route   PATCH /api/itinerary/:id/share
// @access  Private
const toggleShare = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    itinerary.isShared = !itinerary.isShared;
    await itinerary.save();

    res.json({
      message: itinerary.isShared ? "Itinerary is now public" : "Itinerary is now private",
      isShared: itinerary.isShared,
      shareToken: itinerary.isShared ? itinerary.shareToken : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    View a shared itinerary via token (public - no auth needed)
// @route   GET /api/itinerary/shared/:shareToken
// @access  Public
const getSharedItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      shareToken: req.params.shareToken,
      isShared: true,
    }).populate("user", "name");

    if (!itinerary) {
      return res.status(404).json({ message: "Shared itinerary not found or no longer public" });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete an itinerary
// @route   DELETE /api/itinerary/:id
// @access  Private
const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getMyItineraries,
  getItineraryById,
  toggleShare,
  getSharedItinerary,
  deleteItinerary,
};
