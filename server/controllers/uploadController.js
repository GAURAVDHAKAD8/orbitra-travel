const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Itinerary = require("../models/Itinerary");
const { processDocumentAndGenerateItinerary } = require("../services/geminiService");

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter - only allow PDFs and images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// @desc    Upload documents and generate itinerary
// @route   POST /api/upload
// @access  Private
const uploadAndGenerate = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one file" });
    }

    // Process documents and generate itinerary via Gemini
    const { extractedText, itinerary } = await processDocumentAndGenerateItinerary(req.files);

    // Save to MongoDB
    const newItinerary = await Itinerary.create({
      user: req.user._id,
      title: itinerary.title || "My Travel Itinerary",
      extractedData: extractedText,
      itinerary,
      uploadedFiles: req.files.map((f) => ({
        originalName: f.originalname,
        fileType: f.mimetype.startsWith("image/") ? "image" : "pdf",
      })),
    });

    // Clean up uploaded files from server after processing
    req.files.forEach((file) => {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    });

    res.status(201).json({
      message: "Itinerary generated successfully!",
      itinerary: newItinerary,
    });
  } catch (error) {
    // Clean up files on error
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to process documents", error: error.message });
  }
};

module.exports = { upload, uploadAndGenerate };
