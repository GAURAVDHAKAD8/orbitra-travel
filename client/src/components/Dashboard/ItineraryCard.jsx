import { Link } from "react-router-dom";
import { MapPin, Calendar, Globe, Lock, Trash2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const ItineraryCard = ({ itinerary, onDelete }) => {
  const { _id, title, itinerary: data, isShared, createdAt, uploadedFiles } = itinerary;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Delete this itinerary?")) return;
    try {
      await api.delete(`/itinerary/${_id}`);
      onDelete(_id);
      toast.success("Itinerary deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card hover:shadow-md transition-shadow duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center gap-2">
          {isShared ? (
            <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <Globe className="w-3 h-3" /> Shared
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              <Lock className="w-3 h-3" /> Private
            </span>
          )}
          <button
            onClick={handleDelete}
            className="text-gray-300 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & destination */}
      <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 line-clamp-2">
        {title}
      </h3>
      {data?.destination && (
        <p className="text-sm text-blue-600 font-medium mb-2">{data.destination}</p>
      )}
      {data?.travelDates && (
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          <Calendar className="w-3.5 h-3.5" />
          {data.travelDates}
        </p>
      )}

      {/* Summary */}
      {data?.summary && (
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{data.summary}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className="text-xs text-gray-400">{formattedDate}</span>
        <Link
          to={`/itinerary/${_id}`}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ItineraryCard;
