const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Extract text from a PDF file using pdf-parse
 */
const extractTextFromPDF = async (filePath) => {
  const pdfParse = require("pdf-parse");
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

/**
 * Extract text/data from an image using Gemini Vision
 */
const extractTextFromImage = async (filePath, mimeType) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const imageData = fs.readFileSync(filePath);
  const base64Image = imageData.toString("base64");

  const result = await model.generateContent([
    {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    },
    "Extract all text and travel-related information from this image. Include flight numbers, dates, times, booking references, hotel names, and any other relevant travel details.",
  ]);

  return result.response.text();
};

/**
 * Generate a structured travel itinerary from extracted text
 */
const generateItinerary = async (extractedText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a smart travel assistant. Based on the following travel booking information extracted from documents, generate a detailed, structured travel itinerary.

EXTRACTED BOOKING INFORMATION:
${extractedText}

Generate a complete travel itinerary in the following EXACT JSON format. Do not include any markdown, code blocks, or extra text — just pure JSON:

{
  "title": "Trip title based on destination",
  "summary": "A 2-3 sentence overview of the trip",
  "destination": "Main destination city/country",
  "travelDates": "Date range of the trip",
  "days": [
    {
      "day": 1,
      "date": "DD MMM YYYY",
      "title": "Day title (e.g. Arrival in Paris)",
      "activities": [
        {
          "time": "HH:MM",
          "activity": "Activity name",
          "details": "Details about this activity",
          "type": "flight | hotel | sightseeing | food | transport"
        }
      ]
    }
  ],
  "flights": [
    {
      "flightNumber": "AI302",
      "airline": "Air India",
      "from": "Mumbai (BOM)",
      "to": "Delhi (DEL)",
      "departure": "10:00 AM, 25 May 2025",
      "arrival": "12:10 PM, 25 May 2025",
      "pnr": "ABC123"
    }
  ],
  "hotels": [
    {
      "name": "Hotel Name",
      "checkIn": "25 May 2025",
      "checkOut": "28 May 2025",
      "confirmationNumber": "CONF123",
      "address": "Hotel address"
    }
  ],
  "tips": [
    "Useful travel tip 1",
    "Useful travel tip 2",
    "Useful travel tip 3"
  ]
}

Rules:
- Fill in as much detail as possible from the extracted information
- If some data is not available, use reasonable assumptions based on the destination
- Always include at least 3 travel tips relevant to the destination
- Make the itinerary practical and helpful
- If no clear travel info is found, create a sample itinerary and note it's a template
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // Clean up response - remove any markdown code blocks if Gemini adds them
  const cleaned = responseText
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);
  return parsed;
};

/**
 * Main pipeline: file → extract text → generate itinerary
 */
const processDocumentAndGenerateItinerary = async (files) => {
  let allExtractedText = "";

  for (const file of files) {
    const filePath = file.path;
    const mimeType = file.mimetype;

    let extractedText = "";

    if (mimeType === "application/pdf") {
      extractedText = await extractTextFromPDF(filePath);
    } else if (mimeType.startsWith("image/")) {
      extractedText = await extractTextFromImage(filePath, mimeType);
    }

    allExtractedText += `\n--- Document: ${file.originalname} ---\n${extractedText}\n`;
  }

  const itinerary = await generateItinerary(allExtractedText);

  return { extractedText: allExtractedText, itinerary };
};

module.exports = { processDocumentAndGenerateItinerary };
