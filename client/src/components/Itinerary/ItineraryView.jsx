import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MapPin, Calendar, Plane, Hotel, Clock, Globe, Lock,
  Share2, Copy, ArrowLeft, Loader2, Lightbulb, ChevronDown, ChevronUp, Image
} from "lucide-react";
import api from "../../api/axios";
import { fetchPlaceImage } from "../../api/unsplash";

const activityStyles = {
  flight: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", label: "Flight" },
  hotel: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", label: "Hotel" },
  sightseeing: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "Sightseeing" },
  food: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", label: "Dining" },
  transport: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", label: "Transport" },
};

const ActivityBadge = ({ type }) => {
  const style = activityStyles[type] || activityStyles.sightseeing;
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
      {style.label}
    </span>
  );
};

const ItineraryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [expandedDays, setExpandedDays] = useState({});
  const [coverImage, setCoverImage] = useState(null);
  const [dayImages, setDayImages] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/itinerary/${id}`);
        setItinerary(res.data);

        if (res.data.itinerary?.days?.length > 0) {
          setExpandedDays({ 0: true });
        }

        // Fetch cover image for destination
        if (res.data.itinerary?.destination) {
          fetchPlaceImage(res.data.itinerary.destination).then(setCoverImage);
        }

        // Fetch image for each day
        res.data.itinerary?.days?.forEach((day, index) => {
          const query = `${day.title} ${res.data.itinerary.destination}`;
          fetchPlaceImage(query).then((img) => {
            setDayImages((prev) => ({ ...prev, [index]: img }));
          });
        });

      } catch {
        toast.error("Itinerary not found");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleDay = (index) => {
    setExpandedDays((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleToggleShare = async () => {
    setSharing(true);
    try {
      const res = await api.patch(`/itinerary/${id}/share`);
      setItinerary((prev) => ({ ...prev, isShared: res.data.isShared }));
      toast.success(res.data.message);
    } catch {
      toast.error("Failed to update sharing");
    } finally {
      setSharing(false);
    }
  };

  const copyShareLink = () => {
    const link = `${window.location.origin}/shared/${itinerary.shareToken}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard! 🔗");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-gray-500">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  const { itinerary: data } = itinerary;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Cover Image */}
      {coverImage && (
        <div className="mb-4 rounded-2xl overflow-hidden h-52 w-full">
          <img
            src={coverImage}
            alt={data?.destination}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Hero header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{itinerary.title}</h1>
            {data?.destination && (
              <p className="flex items-center gap-1.5 text-blue-200 mb-2">
                <MapPin className="w-4 h-4" /> {data.destination}
              </p>
            )}
            {data?.travelDates && (
              <p className="flex items-center gap-1.5 text-blue-200">
                <Calendar className="w-4 h-4" /> {data.travelDates}
              </p>
            )}
          </div>

          {/* Share controls */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleToggleShare}
              disabled={sharing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                itinerary.isShared
                  ? "bg-white/20 hover:bg-white/30 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-50"
              }`}
            >
              {itinerary.isShared ? (
                <><Lock className="w-4 h-4" /> Make Private</>
              ) : (
                <><Share2 className="w-4 h-4" /> Share Trip</>
              )}
            </button>
            {itinerary.isShared && (
              <button
                onClick={copyShareLink}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-500 hover:bg-green-600 text-white transition-all"
              >
                <Copy className="w-4 h-4" /> Copy Link
              </button>
            )}
          </div>
        </div>

        {data?.summary && (
          <p className="mt-4 text-blue-100 text-sm leading-relaxed border-t border-white/20 pt-4">
            {data.summary}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main: Day-by-day itinerary */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Day-by-Day Plan</h2>

          {data?.days?.map((day, index) => (
            <div key={index} className="card overflow-hidden p-0">

              {/* Day image */}
              {dayImages[index] ? (
                <div className="h-36 w-full overflow-hidden">
                  <img
                    src={dayImages[index]}
                    alt={day.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-36 w-full bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center">
                  <Image className="w-8 h-8 text-blue-200" />
                </div>
              )}

              {/* Day header */}
              <button
                onClick={() => toggleDay(index)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {day.day}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{day.title}</p>
                    <p className="text-xs text-gray-400">{day.date}</p>
                  </div>
                </div>
                {expandedDays[index] ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {/* Activities */}
              {expandedDays[index] && (
                <div className="px-5 pb-4 space-y-3 border-t border-gray-50">
                  {day.activities?.map((act, i) => (
                    <div key={i} className="flex gap-3 pt-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
                        {i < day.activities.length - 1 && (
                          <div className="w-0.5 bg-gray-100 flex-1 mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {act.time && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" /> {act.time}
                            </span>
                          )}
                          <ActivityBadge type={act.type} />
                        </div>
                        <p className="text-sm font-medium text-gray-800">{act.activity}</p>
                        {act.details && (
                          <p className="text-xs text-gray-500 mt-0.5">{act.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar: Flights, Hotels, Tips */}
        <div className="space-y-5">
          {/* Flights */}
          {data?.flights?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Plane className="w-4 h-4 text-blue-500" /> Flights
              </h3>
              <div className="space-y-3">
                {data.flights.map((flight, i) => (
                  <div key={i} className="text-sm bg-blue-50 rounded-xl p-3">
                    <p className="font-semibold text-blue-800">
                      {flight.flightNumber} — {flight.airline}
                    </p>
                    <p className="text-blue-600 mt-1">
                      {flight.from} → {flight.to}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      ✈️ {flight.departure}
                    </p>
                    {flight.pnr && (
                      <p className="text-gray-400 text-xs mt-1">PNR: {flight.pnr}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels */}
          {data?.hotels?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Hotel className="w-4 h-4 text-purple-500" /> Hotels
              </h3>
              <div className="space-y-3">
                {data.hotels.map((hotel, i) => (
                  <div key={i} className="text-sm bg-purple-50 rounded-xl p-3">
                    <p className="font-semibold text-purple-800">{hotel.name}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Check-in: {hotel.checkIn}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Check-out: {hotel.checkOut}
                    </p>
                    {hotel.confirmationNumber && (
                      <p className="text-gray-400 text-xs mt-1">
                        Ref: {hotel.confirmationNumber}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Tips */}
          {data?.tips?.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-yellow-500" /> Travel Tips
              </h3>
              <ul className="space-y-2">
                {data.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600">
                    <span className="text-yellow-400 flex-shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;
