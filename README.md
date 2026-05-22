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

### 4. Environment variables (server/.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/orbitra-travel
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

## Getting Your Gemini API Key

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy and paste into your `.env` file

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register |
| POST | /api/auth/login | ❌ | Login |
| GET | /api/auth/me | ✅ | Get current user |
| POST | /api/upload | ✅ | Upload docs + generate itinerary |
| GET | /api/itinerary | ✅ | Get my itineraries |
| GET | /api/itinerary/:id | ✅ | Get single itinerary |
| PATCH | /api/itinerary/:id/share | ✅ | Toggle sharing |
| DELETE | /api/itinerary/:id | ✅ | Delete itinerary |
| GET | /api/itinerary/shared/:token | ❌ | View shared itinerary |

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
