# ✈️ Orbitra Travel — AI Itinerary Generator

Upload your travel documents (flight tickets, hotel bookings) and get an AI-powered itinerary generated instantly using Google Gemini.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **AI:** Google Gemini 1.5 Flash
- **Auth:** JWT
- **Upload:** Multer + react-dropzone

## Features

- ✅ JWT Authentication (Register / Login)
- ✅ Drag & drop file upload (PDF + Images)
- ✅ AI-powered data extraction from documents
- ✅ Structured itinerary generation via Gemini
- ✅ Itinerary history per user
- ✅ Public share links (toggle on/off)
- ✅ Responsive UI

## Local Setup

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd orbitra-travel
```

### 2. Backend setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env and add your MONGO_URI and GEMINI_API_KEY
npm run dev
```

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```
## Folder Structure

```
orbitra-travel/
├── client/          # React frontend (Vite + Tailwind)
└── server/          # Express backend
    ├── config/      # DB connection
    ├── controllers/ # Route logic
    ├── middleware/  # JWT auth
    ├── models/      # Mongoose schemas
    ├── routes/      # Express routes
    └── services/    # Gemini AI service
```
