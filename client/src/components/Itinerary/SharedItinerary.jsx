import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, Calendar, Plane, Hotel, Clock, Lightbulb,
  ChevronDown, ChevronUp, Globe, Loader2
} from "lucide-react";
import api from "../../api/axios";

const SharedItinerary = () => {
  const { shareToken } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedDays, setExpandedDays] = useState({ 0: true });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/itinerary/shared/${shareToken}`);
        setItinerary(res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [shareToken]);

  const toggleDay = (index) => {
    setExpandedDays((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center card max-w-md">
          <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Trip not found</h2>
          <p className="text-gray-500 mb-6">
            This itinerary is no longer shared or the link may be invalid.
          </p>
          <Link to="/login" className="btn-primary">
            Create Your Own Trip
          </Link>
        </div>
      </div>
    );
  }

  const { itinerary: data, user } = itinerary;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple public header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
            <Plane className="w-5 h-5" />
            Orbitra
          </div>
          <Link to="/register" className="btn-primary text-sm py-1.5 px-4">
            Plan My Trip Free
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Shared by banner */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Globe className="w-4 h-4 text-green-500" />
          Shared by <span className="font-medium text-gray-700">{user?.name}</span>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white mb-6">
          <h1 className="text-2xl font-bold mb-2">{itinerary.title}</h1>
          {data?.destination && (
            <p className="flex items-center gap-1.5 text-blue-200 mb-1">
              <MapPin className="w-4 h-4" /> {data.destination}
            </p>
          )}
          {data?.travelDates && (
            <p className="flex items-center gap-1.5 text-blue-200">
              <Calendar className="w-4 h-4" /> {data.travelDates}
            </p>
          )}
          {data?.summary && (
            <p className="mt-4 text-blue-100 text-sm border-t border-white/20 pt-4">
              {data.summary}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Days */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Day-by-Day</h2>
            {data?.days?.map((day, index) => (
              <div key={index} className="card p-0 overflow-hidden">
                <button
                  onClick={() => toggleDay(index)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
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
                {expandedDays[index] && (
                  <div className="px-5 pb-4 space-y-3 border-t border-gray-50">
                    {day.activities?.map((act, i) => (
                      <div key={i} className="flex gap-3 pt-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                        <div>
                          {act.time && (
                            <p className="text-xs text-gray-400 flex items-center gap-1 mb-0.5">
                              <Clock className="w-3 h-3" /> {act.time}
                            </p>
                          )}
                          <p className="text-sm font-medium text-gray-800">{act.activity}</p>
                          {act.details && (
                            <p className="text-xs text-gray-500">{act.details}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {data?.flights?.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <Plane className="w-4 h-4 text-blue-500" /> Flights
                </h3>
                {data.flights.map((f, i) => (
                  <div key={i} className="text-sm bg-blue-50 rounded-xl p-3 mb-2">
                    <p className="font-semibold text-blue-800">{f.flightNumber}</p>
                    <p className="text-blue-600 text-xs">{f.from} → {f.to}</p>
                    <p className="text-gray-400 text-xs">{f.departure}</p>
                  </div>
                ))}
              </div>
            )}
            {data?.hotels?.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <Hotel className="w-4 h-4 text-purple-500" /> Hotels
                </h3>
                {data.hotels.map((h, i) => (
                  <div key={i} className="text-sm bg-purple-50 rounded-xl p-3 mb-2">
                    <p className="font-semibold text-purple-800">{h.name}</p>
                    <p className="text-gray-500 text-xs">{h.checkIn} – {h.checkOut}</p>
                  </div>
                ))}
              </div>
            )}
            {data?.tips?.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-yellow-500" /> Tips
                </h3>
                <ul className="space-y-1.5">
                  {data.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-2">
                      <span className="text-yellow-400">•</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="card bg-blue-600 border-0 text-center">
              <p className="text-white font-semibold mb-1">Plan your own trip!</p>
              <p className="text-blue-200 text-xs mb-4">Upload your bookings and get an AI itinerary in seconds</p>
              <Link to="/register" className="block bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-50 transition">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedItinerary;
