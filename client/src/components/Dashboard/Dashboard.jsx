import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, MapPin, Calendar, Loader2 } from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import ItineraryCard from "./ItineraryCard";

const Dashboard = () => {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/itinerary");
        setItineraries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = (id) => {
    setItineraries((prev) => prev.filter((it) => it._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Trips
          </h1>
          <p className="text-gray-500 mt-1">
            {itineraries.length > 0
              ? `${itineraries.length} trip${itineraries.length > 1 ? "s" : ""} planned`
              : "Start by uploading your travel documents"}
          </p>
        </div>
        <Link to="/upload" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Trip
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Empty state */}
      {!loading && itineraries.length === 0 && (
        <div className="text-center py-20 card">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">No trips yet</h3>
          <p className="text-gray-500 mt-2 mb-6">
            Upload your travel documents and let AI build your itinerary
          </p>
          <Link to="/upload" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Plan Your First Trip
          </Link>
        </div>
      )}

      {/* Grid */}
      {!loading && itineraries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {itineraries.map((itinerary) => (
            <ItineraryCard
              key={itinerary._id}
              itinerary={itinerary}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
