const express = require("express");
const router = express.Router();
const {
  getMyItineraries,
  getItineraryById,
  toggleShare,
  getSharedItinerary,
  deleteItinerary,
} = require("../controllers/itineraryController");
const { protect } = require("../middleware/authMiddleware");

// Public route - must be defined before /:id to avoid conflict
router.get("/shared/:shareToken", getSharedItinerary);

// Protected routes
router.get("/", protect, getMyItineraries);
router.get("/:id", protect, getItineraryById);
router.patch("/:id/share", protect, toggleShare);
router.delete("/:id", protect, deleteItinerary);

module.exports = router;
