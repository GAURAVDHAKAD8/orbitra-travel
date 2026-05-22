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
    // Raw extracted text from uploaded documents
    extractedData: {
      type: String,
    },
    // AI-generated itinerary stored as structured JSON
    itinerary: {
      summary: String,
      destination: String,
      travelDates: String,
      days: [
        {
          day: Number,
          date: String,
          title: String,
          activities: [
            {
              time: String,
              activity: String,
              details: String,
              type: String, // flight, hotel, sightseeing, food, transport
            },
          ],
        },
      ],
      flights: [
        {
          flightNumber: String,
          airline: String,
          from: String,
          to: String,
          departure: String,
          arrival: String,
          pnr: String,
        },
      ],
      hotels: [
        {
          name: String,
          checkIn: String,
          checkOut: String,
          confirmationNumber: String,
          address: String,
        },
      ],
      tips: [String],
    },
    // Unique share token for public sharing
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
        fileType: String, // pdf or image
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
