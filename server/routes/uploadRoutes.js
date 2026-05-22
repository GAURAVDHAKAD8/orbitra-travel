const express = require("express");
const router = express.Router();
const { upload, uploadAndGenerate } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/upload - Upload files and generate itinerary
// "documents" is the field name expected from the frontend FormData
router.post("/", protect, upload.array("documents", 5), uploadAndGenerate);

module.exports = router;
