const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const itinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "My Travel Itinerary",
    },
    extractedData: {
      type: String,
    },
    itinerary: {
      type: mongoose.Schema.Types.Mixed
    },
    shareToken: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    isShared: {
      type: Boolean,
      default: false,
    },
    uploadedFiles: [
      {
        originalName: String,
        fileType: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);